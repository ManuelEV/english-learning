import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Play, Snail } from 'lucide-react'
import type {
  ChoiceExercise,
  ErrorExercise,
  Exercise,
  GapExercise,
  ListenExercise,
  MatchExercise,
  OrderExercise,
  RewriteExercise,
  SortExercise,
} from '../../content/types'
import { distance, matches, norm, scramble, shuffle } from '../../lib/text'
import { canSpeak, speak, stopSpeaking } from '../../lib/speech'
import { sfx } from '../../lib/sound'
import { SpeakButton } from '../SpeakButton'

export interface ExProps<T extends Exercise> {
  ex: T
  /** True once the learner has answered; the view becomes read-only. */
  done: boolean
  onDone: (correct: boolean) => void
  /** Leave the exercise without scoring it (e.g. no audio available). */
  onSkip: () => void
}

/* ───────────────────────── Shared bits ───────────────────────── */

export function BottomBar({ children, tint = '' }: { children: React.ReactNode; tint?: string }) {
  return (
    <div className={`fixed inset-x-0 bottom-0 z-30 border-t-2 border-rule backdrop-blur ${tint || 'bg-paper/95'}`}>
      <div className="mx-auto max-w-2xl px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">{children}</div>
    </div>
  )
}

function CheckBar({ disabled, onCheck }: { disabled: boolean; onCheck: () => void }) {
  const cb = useRef(onCheck)
  cb.current = onCheck
  useEffect(() => {
    if (disabled) return
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.repeat) {
        e.preventDefault()
        cb.current()
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [disabled])
  return (
    <BottomBar>
      <div className="flex justify-end">
        <button type="button" className="btn btn-violet w-full sm:w-auto sm:min-w-52" disabled={disabled} onClick={onCheck}>
          Comprobar
        </button>
      </div>
    </BottomBar>
  )
}

function Prompt({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl leading-tight font-extrabold sm:text-[1.7rem]">{children}</h2>
}

/** Sentence with a `___` slot rendered by the caller. */
function Gapped({ sentence, slot }: { sentence: string; slot: React.ReactNode }) {
  const [before, after = ''] = sentence.split('___')
  return (
    <p className="card p-5 text-xl leading-loose font-semibold sm:text-2xl sm:leading-loose">
      {before}
      {slot}
      {after}
    </p>
  )
}

/* ───────────────────────── Choice ───────────────────────── */

export function ChoiceView({ ex, done, onDone }: ExProps<ChoiceExercise>) {
  const [sel, setSel] = useState<number | null>(null)
  const order = useMemo(() => shuffle(ex.options.map((_, i) => i)), [ex])

  useEffect(() => {
    if (done) return
    const h = (e: KeyboardEvent) => {
      const n = Number(e.key)
      if (n >= 1 && n <= order.length) setSel(order[n - 1])
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [done, order])

  const shown = done ? ex.answer : sel
  return (
    <>
      <Prompt>{ex.prompt}</Prompt>
      {ex.sentence && (
        <Gapped
          sentence={ex.sentence}
          slot={
            <span
              className={`mx-1 inline-block min-w-20 border-b-[3px] border-dashed px-2 text-center align-baseline transition-colors ${
                done ? 'border-good text-good' : shown !== null ? 'border-violet text-violet' : 'border-muted'
              }`}
            >
              {shown !== null ? ex.options[shown] : ' '}
            </span>
          }
        />
      )}
      <div className="grid gap-3">
        {order.map((optIdx, pos) => {
          let state = ''
          if (done) state = optIdx === ex.answer ? 'tile-good' : optIdx === sel ? 'tile-bad' : 'opacity-50'
          else if (optIdx === sel) state = 'tile-selected'
          return (
            <motion.button
              key={optIdx}
              type="button"
              disabled={done}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pos * 0.06 }}
              onClick={() => {
                sfx.tap()
                setSel(optIdx)
              }}
              className={`tile flex items-center gap-3 px-4 py-3.5 text-left text-lg ${state}`}
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 border-current/25 text-sm font-bold opacity-60">{pos + 1}</span>
              {ex.options[optIdx]}
            </motion.button>
          )
        })}
      </div>
      {!done && <CheckBar disabled={sel === null} onCheck={() => onDone(sel === ex.answer)} />}
    </>
  )
}

/* ───────────────────────── Gap ───────────────────────── */

export function GapView({ ex, done, onDone }: ExProps<GapExercise>) {
  const [value, setValue] = useState('')
  const ok = matches(value, ex.answers)
  const width = Math.max(7, ...ex.answers.map((a) => a.length + 2), value.length + 1)
  return (
    <>
      <Prompt>{ex.prompt ?? 'Completa el espacio.'}</Prompt>
      <Gapped
        sentence={ex.sentence}
        slot={
          <input
            autoFocus
            value={value}
            disabled={done}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Tu respuesta"
            style={{ width: `${width}ch` }}
            className={`field mx-1.5 max-w-full px-3 py-1 text-center text-xl sm:text-2xl ${
              done ? (ok ? 'border-good bg-good-soft text-good' : 'border-bad bg-bad-soft text-bad line-through') : ''
            }`}
          />
        }
      />
      {ex.hint && (
        <p className="text-lg font-semibold text-muted">
          Pista: <span className="text-ink">{ex.hint}</span>
        </p>
      )}
      {!done && <CheckBar disabled={!value.trim()} onCheck={() => onDone(ok)} />}
    </>
  )
}

/* ───────────────────────── Order ───────────────────────── */

export function OrderView({ ex, done, onDone }: ExProps<OrderExercise>) {
  const bank = useMemo(
    () => scramble([...ex.words, ...(ex.distractors ?? [])]).map((text, id) => ({ id, text })),
    [ex],
  )
  const [picked, setPicked] = useState<number[]>([])
  const target = ex.words.join(' ')
  const built = picked.map((id) => bank[id].text).join(' ')
  const ok = built === target

  const chip = (id: number, inAnswer: boolean) => (
    <motion.button
      key={id}
      layoutId={`chip-${ex.id}-${id}`}
      type="button"
      disabled={done}
      transition={{ type: 'spring', stiffness: 500, damping: 34 }}
      onClick={() => {
        sfx.tap()
        setPicked((p) => (inAnswer ? p.filter((x) => x !== id) : [...p, id]))
      }}
      className={`tile px-3.5 py-2 text-lg ${done && inAnswer ? (ok ? 'tile-good' : 'tile-bad') : ''}`}
    >
      {bank[id].text}
    </motion.button>
  )

  return (
    <>
      <Prompt>Ordena las palabras para decirlo en inglés.</Prompt>
      <p className="card border-dashed p-4 text-lg font-semibold text-ink/85"><span className="mr-2 rounded-md bg-ink px-1.5 py-0.5 align-middle text-xs font-bold text-paper">ES</span>{ex.es}</p>
      <LayoutGroup>
        <div className="flex min-h-[7.5rem] flex-wrap content-start items-start gap-2 rounded-2xl border-2 border-rule bg-sunk p-3">
          {picked.length === 0 && <span className="p-2 font-semibold text-muted">Toca las palabras en orden…</span>}
          {picked.map((id) => chip(id, true))}
        </div>
        <div className="flex min-h-14 flex-wrap justify-center gap-2">
          {bank.filter((b) => !picked.includes(b.id)).map((b) => chip(b.id, false))}
        </div>
      </LayoutGroup>
      {!done && <CheckBar disabled={picked.length === 0} onCheck={() => onDone(ok)} />}
    </>
  )
}

/* ───────────────────────── Error ───────────────────────── */

interface Tok {
  text: string
  wrong: boolean
}

function parseError(sentence: string): { tokens: Tok[]; tail: string } {
  const m = sentence.match(/^(.*?)\[([^\]]*)\](\S*)(.*)$/s)
  if (!m) return { tokens: sentence.split(/\s+/).map((text) => ({ text, wrong: false })), tail: '' }
  const [, before, wrong, glue, after] = m
  const words = (s: string) => s.split(/\s+/).filter(Boolean)
  const wrongToks = words(wrong).map((text) => ({ text, wrong: true }))
  // Punctuation glued to the bracket stays attached to the last wrong word.
  if (glue && wrongToks.length) wrongToks[wrongToks.length - 1].text += glue
  return {
    tokens: [...words(before).map((text) => ({ text, wrong: false })), ...wrongToks, ...words(after).map((text) => ({ text, wrong: false }))],
    tail: glue,
  }
}

export function ErrorView({ ex, done, onDone }: ExProps<ErrorExercise>) {
  const { tokens, tail } = useMemo(() => parseError(ex.sentence), [ex])
  const [sel, setSel] = useState<number | null>(null)
  const lastWrong = tokens.findLastIndex((t) => t.wrong)
  const ok = sel !== null && tokens[sel].wrong

  return (
    <>
      <Prompt>Hay un error en esta frase. Toca la palabra que está mal.</Prompt>
      <div className="card flex flex-wrap items-center gap-x-1.5 gap-y-3 p-5">
        {tokens.map((tok, i) => {
          let state = ''
          if (done) state = tok.wrong ? 'tile-bad line-through decoration-2' : i === sel ? 'tile-bad' : 'border-transparent shadow-none'
          else if (i === sel) state = 'tile-selected'
          return (
            <span key={i} className="inline-flex items-center gap-1.5">
              <button
                type="button"
                disabled={done}
                onClick={() => {
                  sfx.tap()
                  setSel(i)
                }}
                className={`tile px-2.5 py-1.5 text-xl ${state}`}
              >
                {tok.text}
              </button>
              {done && i === lastWrong && (
                <motion.span
                  initial={{ scale: 0, rotate: -8 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 14, delay: 0.2 }}
                  className="rounded-xl border-2 border-good bg-good-soft px-2.5 py-1.5 text-xl font-bold text-good"
                >
                  {ex.fix ? ex.fix + tail : '∅ (sobra)'}
                </motion.span>
              )}
            </span>
          )
        })}
      </div>
      {!done && <CheckBar disabled={sel === null} onCheck={() => onDone(ok)} />}
    </>
  )
}

/* ───────────────────────── Match ───────────────────────── */

export function MatchView({ ex, done, onDone }: ExProps<MatchExercise>) {
  const rights = useMemo(() => scramble(ex.pairs.map((_, i) => i)), [ex])
  const [left, setLeft] = useState<number | null>(null)
  const [matched, setMatched] = useState<number[]>([])
  const [miss, setMiss] = useState<{ l: number; r: number } | null>(null)
  const mistakes = useRef(0)

  const tryPair = (l: number, r: number) => {
    if (l === r) {
      sfx.good()
      const next = [...matched, l]
      setMatched(next)
      setLeft(null)
      if (next.length === ex.pairs.length) setTimeout(() => onDone(mistakes.current === 0), 450)
    } else {
      sfx.bad()
      mistakes.current++
      setMiss({ l, r })
      setTimeout(() => {
        setMiss(null)
        setLeft(null)
      }, 450)
    }
  }

  return (
    <>
      <Prompt>{ex.prompt}</Prompt>
      <p className="-mt-2 font-semibold text-muted">Toca un elemento de la izquierda y luego su pareja.</p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:gap-x-6">
        {ex.pairs.map((pair, row) => {
          const r = rights[row]
          const lDone = matched.includes(row)
          const rDone = matched.includes(r)
          return (
            <div key={row} className="contents">
              <button
                type="button"
                disabled={done || lDone}
                onClick={() => {
                  sfx.tap()
                  setLeft(row)
                }}
                className={`tile px-3 py-3 text-left leading-snug sm:text-lg ${
                  lDone ? 'tile-good opacity-70' : miss?.l === row ? 'tile-bad animate-shake' : left === row ? 'tile-selected' : ''
                }`}
              >
                {pair[0]}
              </button>
              <button
                type="button"
                disabled={done || rDone || left === null}
                onClick={() => left !== null && tryPair(left, r)}
                className={`tile px-3 py-3 text-left leading-snug sm:text-lg ${
                  rDone ? 'tile-good opacity-70' : miss?.r === r ? 'tile-bad animate-shake' : left === null ? 'opacity-70' : ''
                }`}
              >
                {ex.pairs[r][1]}
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}

/* ───────────────────────── Sort ───────────────────────── */

export function SortView({ ex, done, onDone }: ExProps<SortExercise>) {
  const items = useMemo(() => shuffle(ex.items), [ex])
  const [placed, setPlaced] = useState<{ ok: boolean }[]>([])
  const [flash, setFlash] = useState<{ cat: number; ok: boolean } | null>(null)
  const idx = placed.length
  const current = items[idx]
  const busy = useRef(false)

  const place = (cat: 0 | 1) => {
    if (done || !current || busy.current) return
    busy.current = true
    const ok = current.cat === cat
    if (ok) sfx.good()
    else sfx.bad()
    setFlash({ cat: current.cat, ok })
    setTimeout(
      () => {
        const next = [...placed, { ok }]
        setPlaced(next)
        setFlash(null)
        busy.current = false
        if (next.length === items.length) onDone(next.filter((p) => !p.ok).length <= 1)
      },
      ok ? 380 : 900,
    )
  }
  const placeRef = useRef(place)
  placeRef.current = place

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') placeRef.current(0)
      if (e.key === 'ArrowRight') placeRef.current(1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  return (
    <>
      <Prompt>{ex.prompt}</Prompt>
      <div className="flex items-center justify-center gap-1.5">
        {items.map((_, i) => (
          <span
            key={i}
            className={`h-2.5 w-6 rounded-full transition-colors ${
              i < placed.length ? (placed[i].ok ? 'bg-good' : 'bg-bad') : i === idx ? 'bg-ink' : 'bg-rule'
            }`}
          />
        ))}
      </div>

      <div className="grid h-36 place-items-center">
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.6, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 60, x: flash ? (flash.cat === 0 ? -120 : 120) : 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              className={`card max-w-full px-7 py-5 text-center text-2xl font-extrabold shadow-[0_6px_0_var(--color-rule)] ${
                flash ? (flash.ok ? 'tile-good' : 'tile-bad animate-shake') : ''
              }`}
            >
              {current.text}
            </motion.div>
          ) : (
            <motion.p key="end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-bold text-muted">
              ¡Todo clasificado!
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {ex.categories.map((cat, c) => {
          const hit = flash?.cat === c
          return (
            <motion.button
              key={c}
              type="button"
              disabled={done || !current}
              animate={hit ? { scale: [1, 1.06, 1] } : {}}
              onClick={() => place(c as 0 | 1)}
              className={`tile flex min-h-24 flex-col items-center justify-center gap-1 px-3 py-4 text-center text-lg leading-tight ${
                hit ? (flash!.ok ? 'tile-good' : 'tile-selected') : ''
              }`}
            >
              <span className="flex items-center gap-2 font-display font-extrabold">
                {c === 0 && <ArrowLeft size={18} className="hidden opacity-50 sm:block" />}
                {cat}
                {c === 1 && <ArrowRight size={18} className="hidden opacity-50 sm:block" />}
              </span>
              {hit && !flash!.ok && <span className="text-sm font-bold text-violet">↑ iba aquí</span>}
            </motion.button>
          )
        })}
      </div>
    </>
  )
}

/* ───────────────────────── Listen ───────────────────────── */

export function ListenView({ ex, done, onDone, onSkip }: ExProps<ListenExercise>) {
  const [value, setValue] = useState('')
  const [playing, setPlaying] = useState(false)
  const play = (slow = false) => {
    setPlaying(true)
    speak(ex.text, { slow, onEnd: () => setPlaying(false) })
  }
  useEffect(() => {
    const t = setTimeout(() => play(), 450)
    return () => {
      clearTimeout(t)
      stopSpeaking()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ex])

  const a = norm(value)
  const b = norm(ex.text)
  const ok = a === b || (b.length >= 12 && distance(a, b) <= 1)

  return (
    <>
      <Prompt>Escucha y escribe lo que oyes.</Prompt>
      <div className="card flex flex-col items-center gap-4 p-6">
        <div className="flex items-end gap-4">
          <button
            type="button"
            aria-label="Reproducir"
            onClick={() => play()}
            className="relative grid h-20 w-20 cursor-pointer place-items-center rounded-full bg-violet text-white shadow-[0_5px_0_color-mix(in_srgb,var(--color-violet)_70%,black)] transition-transform active:translate-y-1 active:shadow-none"
          >
            {playing && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-violet" />}
            <Play size={32} fill="currentColor" className="relative ml-1" />
          </button>
          <button
            type="button"
            aria-label="Reproducir lento"
            title="Más lento"
            onClick={() => play(true)}
            className="tile grid h-12 w-12 place-items-center rounded-full"
          >
            <Snail size={22} />
          </button>
        </div>
        <div className="flex h-8 items-center gap-1">
          {Array.from({ length: 18 }, (_, i) => (
            <motion.span
              key={i}
              className="w-1.5 rounded-full bg-violet"
              animate={playing ? { height: [6, 10 + ((i * 7) % 20), 6] } : { height: 6 }}
              transition={playing ? { duration: 0.5 + (i % 4) * 0.1, repeat: Infinity, delay: i * 0.04 } : { duration: 0.2 }}
            />
          ))}
        </div>
        {!canSpeak && <p className="text-center font-semibold text-bad">Tu navegador no tiene síntesis de voz.</p>}
      </div>
      <input
        autoFocus
        value={value}
        disabled={done}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Escribe la frase en inglés…"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        className={`field w-full text-xl ${done ? (ok ? 'border-good bg-good-soft' : 'border-bad bg-bad-soft') : ''}`}
      />
      {done && <p className="font-semibold text-muted">En español: {ex.es}</p>}
      {!done && (
        <>
          <button type="button" onClick={onSkip} className="cursor-pointer self-start text-sm font-semibold text-muted underline decoration-dotted underline-offset-4 hover:text-ink">
            No puedo escuchar ahora · saltar
          </button>
          <CheckBar disabled={!value.trim()} onCheck={() => onDone(ok)} />
        </>
      )}
    </>
  )
}

/* ───────────────────────── Rewrite ───────────────────────── */

export function RewriteView({ ex, done, onDone }: ExProps<RewriteExercise>) {
  const [value, setValue] = useState(ex.start ? ex.start + ' ' : '')
  const ok = matches(value, ex.answers)
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    const el = ref.current
    if (el) {
      el.focus()
      el.setSelectionRange(el.value.length, el.value.length)
    }
  }, [])
  const dirty = value.trim().length > (ex.start?.length ?? 0)
  return (
    <>
      <Prompt>{ex.prompt}</Prompt>
      <div className="card flex items-start gap-3 p-4">
        <SpeakButton text={ex.source} size="sm" />
        <p className="text-xl leading-snug font-semibold">{ex.source}</p>
      </div>
      <textarea
        ref={ref}
        rows={2}
        value={value}
        disabled={done}
        onChange={(e) => setValue(e.target.value.replace(/\n/g, ''))}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        aria-label="Tu frase"
        className={`field w-full resize-none text-xl ${done ? (ok ? 'border-good bg-good-soft' : 'border-bad bg-bad-soft') : ''}`}
      />
      {ex.start && !done && (
        <p className="-mt-2 text-sm font-semibold text-muted">
          Tu frase debe empezar con «{ex.start}».
        </p>
      )}
      {!done && <CheckBar disabled={!dirty} onCheck={() => onDone(ok)} />}
    </>
  )
}

/* ───────────────────────── Dispatcher ───────────────────────── */

export function ExerciseView(props: ExProps<Exercise>) {
  const { ex, ...rest } = props
  switch (ex.type) {
    case 'choice': return <ChoiceView ex={ex} {...rest} />
    case 'gap': return <GapView ex={ex} {...rest} />
    case 'order': return <OrderView ex={ex} {...rest} />
    case 'error': return <ErrorView ex={ex} {...rest} />
    case 'match': return <MatchView ex={ex} {...rest} />
    case 'sort': return <SortView ex={ex} {...rest} />
    case 'listen': return <ListenView ex={ex} {...rest} />
    case 'rewrite': return <RewriteView ex={ex} {...rest} />
  }
}

/** The model answer shown in the feedback panel (null when the view already shows it). */
export function solution(ex: Exercise): string | null {
  switch (ex.type) {
    case 'choice': return ex.sentence ? ex.sentence.replace('___', ex.options[ex.answer]) : ex.options[ex.answer]
    case 'gap': return ex.sentence.replace('___', ex.answers[0])
    case 'order': return ex.words.join(' ')
    case 'error': return ex.sentence.replace(/\[[^\]]*\]/, ex.fix).replace(/\s+([.,!?;:])/g, '$1').replace(/\s{2,}/g, ' ').trim()
    case 'listen': return ex.text
    case 'rewrite': return ex.answers[0]
    case 'match':
    case 'sort': return null
  }
}
