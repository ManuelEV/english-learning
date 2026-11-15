import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Check, RotateCcw, X } from 'lucide-react'
import type { Exercise } from '../content/types'
import { getUnit } from '../content'
import { useStore } from '../store'
import { sfx } from '../lib/sound'
import { BottomBar, ExerciseView, solution } from './exercises/views'
import { Rich } from './Rich'
import { SpeakButton } from './SpeakButton'

export interface SessionItem {
  exercise: Exercise
  unitId: string
}

export interface SessionResult {
  correct: number
  total: number
  /** Exercises missed on the first try (now waiting in the workshop). */
  missed: number
  km: number
}

interface Queued extends SessionItem {
  retry: boolean
}

const PRAISE = ['¡Correcto!', '¡Muy bien!', '¡Exacto!', '¡Así se hace!', '¡Perfecto!', '¡Impecable!']
const TYPE_LABEL: Record<Exercise['type'], string> = {
  choice: 'Elige',
  gap: 'Completa',
  order: 'Ordena',
  error: 'Caza el error',
  match: 'Une',
  sort: 'Clasifica',
  listen: 'Dictado',
  rewrite: 'Transforma',
}

export function Session({
  items,
  exitTo,
  showUnit = false,
  onFinish,
}: {
  items: SessionItem[]
  exitTo: string
  /** Show which station each exercise comes from (mixed sessions). */
  showUnit?: boolean
  onFinish: (result: SessionResult) => void
}) {
  const [queue, setQueue] = useState<Queued[]>(() => items.map((i) => ({ ...i, retry: false })))
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState<boolean | null>(null)
  const stats = useRef({ correct: 0, total: items.length, missed: 0, km: 0 })
  const recordAnswer = useStore((s) => s.recordAnswer)
  const addKm = useStore((s) => s.addKm)

  const item = queue[idx]
  const praise = useMemo(() => PRAISE[Math.floor(Math.random() * PRAISE.length)], [idx])
  const unit = getUnit(item.unitId)

  const advance = (extra: Queued[] = queue) => {
    if (idx + 1 >= extra.length) onFinish({ ...stats.current })
    else {
      setAnswer(null)
      setIdx(idx + 1)
      window.scrollTo({ top: 0 })
    }
  }

  const handleDone = (correct: boolean) => {
    if (answer !== null) return
    setAnswer(correct)
    if (correct) sfx.good()
    else sfx.bad()
    const gain = correct ? (item.retry ? 4 : 10) : 0
    if (gain) {
      addKm(gain)
      stats.current.km += gain
    }
    if (!item.retry) {
      recordAnswer(item.exercise.id, item.unitId, correct)
      if (correct) stats.current.correct++
      else {
        stats.current.missed++
        // Bring it back at the end of the session for a second try.
        setQueue((q) => [...q, { ...item, retry: true }])
      }
    }
  }

  const handleSkip = () => {
    stats.current.total--
    advance()
  }

  // Enter continues once the feedback is on screen.
  const advanceRef = useRef(advance)
  advanceRef.current = advance
  useEffect(() => {
    if (answer === null) return
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.repeat) {
        e.preventDefault()
        advanceRef.current()
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [answer])

  const progress = (idx + (answer !== null ? 1 : 0)) / queue.length
  const model = solution(item.exercise)

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-4">
      <header className="sticky top-0 z-10 -mx-4 flex items-center gap-4 bg-paper/90 px-4 py-4 backdrop-blur">
        <Link to={exitTo} aria-label="Salir" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted hover:bg-sunk hover:text-ink">
          <X size={24} />
        </Link>
        <div className="relative h-4 flex-1 rounded-full bg-rule">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-good"
            initial={false}
            animate={{ width: `${Math.max(progress * 100, 4)}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          >
            <span className="absolute top-1 right-2 left-2 h-1 rounded-full bg-white/35" />
            <span className="absolute -top-2.5 -right-3 text-xl leading-none select-none" aria-hidden>🚇</span>
          </motion.div>
        </div>
        <span className="w-12 shrink-0 text-right font-display text-sm font-bold text-muted tabular-nums">
          {Math.min(idx + 1, queue.length)}/{queue.length}
        </span>
      </header>

      <main className="flex-1 pt-2 pb-56">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-ink px-3 py-1 font-display text-xs font-bold tracking-wide text-paper uppercase">
                {TYPE_LABEL[item.exercise.type]}
              </span>
              {item.retry && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-soft px-3 py-1 text-xs font-bold text-amber">
                  <RotateCcw size={12} /> Segundo intento
                </span>
              )}
              {showUnit && unit && (
                <span className="rounded-full bg-sunk px-3 py-1 text-xs font-bold text-muted">
                  {unit.emoji} {unit.title}
                </span>
              )}
            </div>
            <ExerciseView ex={item.exercise} done={answer !== null} onDone={handleDone} onSkip={handleSkip} />
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {answer !== null && (
          <motion.div
            key={`fb-${idx}`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%', transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-40"
          >
            <BottomBar tint={answer ? 'bg-good-soft' : 'bg-bad-soft'}>
              <div className="flex max-h-[45dvh] flex-col gap-3 overflow-y-auto sm:flex-row sm:items-end sm:gap-6">
                <div className="min-w-0 flex-1">
                  <p className={`flex items-center gap-2 font-display text-xl font-extrabold ${answer ? 'text-good' : 'text-bad'}`}>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.1 }}
                      className={`grid h-8 w-8 place-items-center rounded-full text-white ${answer ? 'bg-good' : 'bg-bad'}`}
                    >
                      {answer ? <Check size={18} strokeWidth={3.5} /> : <X size={18} strokeWidth={3.5} />}
                    </motion.span>
                    {answer ? praise : item.retry ? 'Aún no. Quedará en el Taller.' : 'Casi. Mira la corrección:'}
                  </p>
                  {!answer && model && (
                    <div className="mt-2 flex items-center gap-2">
                      <SpeakButton text={model} size="sm" />
                      <p className="text-lg leading-snug font-bold">{model}</p>
                    </div>
                  )}
                  <p className="mt-1.5 leading-snug text-ink/85">
                    <Rich text={item.exercise.explain} bold />
                  </p>
                </div>
                <button type="button" autoFocus className={`btn shrink-0 sm:min-w-44 ${answer ? 'btn-good' : 'btn-bad'}`} onClick={() => advance()}>
                  Continuar
                </button>
              </div>
            </BottomBar>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
