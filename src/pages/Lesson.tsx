import { useCallback, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { getLine, getUnit } from '../content'
import { StepView } from '../components/steps/StepView'
import { BottomBar } from '../components/exercises/views'
import { useStore } from '../store'
import { TONE } from '../lib/tone'
import { sfx } from '../lib/sound'
import { stopSpeaking } from '../lib/speech'

export function Lesson() {
  const { id } = useParams()
  const unit = getUnit(id)
  const navigate = useNavigate()
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const markLearned = useStore((s) => s.markLearned)
  const addKm = useStore((s) => s.addKm)
  const alreadyLearned = useStore((s) => (id ? !!s.units[id]?.learned : false))

  const total = unit?.steps.length ?? 0
  const last = idx === total - 1

  const go = useCallback(
    (delta: number) => {
      if (!unit) return
      const next = idx + delta
      if (next < 0) return
      stopSpeaking()
      if (next >= total) {
        if (!alreadyLearned) addKm(20)
        markLearned(unit.id)
        sfx.arrive()
        navigate(`/u/${unit.id}/practica`)
        return
      }
      sfx.tap()
      setDir(delta)
      setIdx(next)
      window.scrollTo({ top: 0 })
    },
    [idx, total, unit, alreadyLearned, addKm, markLearned, navigate],
  )

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [go])

  if (!unit) return <Navigate to="/" replace />
  const line = getLine(unit.line)
  const tone = TONE[line.tone]

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-4">
      <header className="sticky top-0 z-10 -mx-4 flex items-center gap-3 bg-paper/90 px-4 py-4 backdrop-blur">
        <Link to={`/u/${unit.id}`} aria-label="Salir de la lección" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted hover:bg-sunk hover:text-ink">
          <X size={24} />
        </Link>
        <div className="flex flex-1 gap-1.5">
          {unit.steps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir al paso ${i + 1}`}
              onClick={() => {
                setDir(i > idx ? 1 : -1)
                setIdx(i)
              }}
              className="h-3 flex-1 cursor-pointer overflow-hidden rounded-full bg-rule"
            >
              <motion.span
                className={`block h-full rounded-full ${tone.bg}`}
                initial={false}
                animate={{ width: i <= idx ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>
        <span className="w-10 shrink-0 text-right font-display text-sm font-bold text-muted tabular-nums">
          {idx + 1}/{total}
        </span>
      </header>

      <main className="flex-1 overflow-x-clip pt-4 pb-36">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 60 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -60 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22 }}
          >
            <StepView step={unit.steps[idx]} tone={line.tone} />
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomBar>
        <div className="flex items-center justify-between gap-3">
          <button type="button" className="btn btn-ghost" disabled={idx === 0} onClick={() => go(-1)} aria-label="Paso anterior">
            <ArrowLeft size={18} /> <span className="hidden sm:inline">Atrás</span>
          </button>
          <button type="button" className={`btn flex-1 sm:flex-none sm:min-w-56 ${last ? 'btn-good' : tone.btn}`} onClick={() => go(1)}>
            {last ? '¡A practicar!' : 'Siguiente'} <ArrowRight size={18} />
          </button>
        </div>
      </BottomBar>
    </div>
  )
}
