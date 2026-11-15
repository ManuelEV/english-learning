import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Wrench, X } from 'lucide-react'
import type { Step, Tone } from '../../content/types'
import { TONE } from '../../lib/tone'
import { sfx } from '../../lib/sound'
import { Rich } from '../Rich'
import { ExampleCard } from '../ExampleCard'
import { SpeakButton } from '../SpeakButton'
import { Timeline } from './Timeline'

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 24 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }

const KIND_LABEL: Record<Step['kind'], string> = {
  hook: 'Situación',
  timeline: 'Línea de tiempo',
  formula: 'Estructura',
  examples: 'Ejemplos',
  compare: 'Comparación',
  trap: 'Trampa',
  tips: 'Claves',
  check: 'Comprueba',
}

function Heading({ kind, title, tone }: { kind: Step['kind']; title: string; tone: Tone }) {
  return (
    <motion.div variants={rise}>
      <span className={`eyebrow ${TONE[tone].text}`}>{KIND_LABEL[kind]}</span>
      <h2 className="mt-1 text-3xl leading-tight font-extrabold sm:text-4xl">{title}</h2>
    </motion.div>
  )
}

function Body({ text, tone }: { text?: string; tone: Tone }) {
  if (!text) return null
  return (
    <motion.p variants={rise} className="text-lg leading-relaxed text-ink/85">
      <Rich text={text} tone={tone} bold />
    </motion.p>
  )
}

export function StepView({ step, tone }: { step: Step; tone: Tone }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-5">
      {step.kind === 'hook' && (
        <>
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 12 }}
            className={`grid h-24 w-24 place-items-center rounded-[2rem] text-5xl ${TONE[tone].soft}`}
          >
            <span className="animate-float">{step.emoji}</span>
          </motion.div>
          <Heading kind="hook" title={step.title} tone={tone} />
          <Body text={step.text} tone={tone} />
          {step.example && (
            <motion.div variants={rise}>
              <ExampleCard example={step.example} tone={tone} />
            </motion.div>
          )}
        </>
      )}

      {step.kind === 'timeline' && (
        <>
          <Heading kind="timeline" title={step.title} tone={tone} />
          <Body text={step.text} tone={tone} />
          <motion.div variants={rise}>
            <Timeline items={step.items} />
          </motion.div>
          {step.example && (
            <motion.div variants={rise}>
              <ExampleCard example={step.example} tone={tone} />
            </motion.div>
          )}
        </>
      )}

      {step.kind === 'formula' && <FormulaStep step={step} tone={tone} />}

      {step.kind === 'examples' && (
        <>
          <Heading kind="examples" title={step.title} tone={tone} />
          <Body text={step.text} tone={tone} />
          {step.items.map((ex, i) => (
            <motion.div key={i} variants={rise}>
              <ExampleCard example={ex} tone={tone} />
            </motion.div>
          ))}
        </>
      )}

      {step.kind === 'compare' && (
        <>
          <Heading kind="compare" title={step.title} tone={tone} />
          <Body text={step.text} tone={tone} />
          <div className="relative grid gap-4 md:grid-cols-2">
            {[step.left, step.right].map((side, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -60 : 60, rotate: i === 0 ? -3 : 3 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.3 + i * 0.15 }}
                className={`card overflow-hidden border-2 ${TONE[side.tone].border}`}
              >
                <div className={`px-5 py-3 font-display text-lg font-extrabold ${TONE[side.tone].soft} ${TONE[side.tone].text}`}>
                  {side.label}
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <ul className="flex flex-col gap-2">
                    {side.points.map((p, k) => (
                      <li key={k} className="flex gap-2 leading-snug">
                        <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${TONE[side.tone].bg}`} />
                        <span><Rich text={p} tone={side.tone} bold /></span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-start gap-3 rounded-2xl bg-sunk p-3">
                    <SpeakButton text={side.example.en} size="sm" />
                    <div>
                      <p className="leading-snug font-semibold"><Rich text={side.example.en} tone={side.tone} /></p>
                      <p className="text-sm text-muted">{side.example.es}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.7 }}
              className="absolute top-1/2 left-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink font-display text-sm font-extrabold text-paper md:grid"
            >
              VS
            </motion.div>
          </div>
        </>
      )}

      {step.kind === 'trap' && <TrapStep step={step} />}

      {step.kind === 'tips' && (
        <>
          <Heading kind="tips" title={step.title} tone={tone} />
          <Body text={step.text} tone={tone} />
          <div className="flex flex-col gap-3">
            {step.items.map((tip, i) => (
              <motion.div key={i} variants={rise} className="card flex items-start gap-4 p-4">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl ${TONE[tone].soft}`}>{tip.emoji}</span>
                <div>
                  <p className="font-display text-lg font-bold"><Rich text={tip.title} tone={tone} bold /></p>
                  <p className="leading-snug text-ink/80"><Rich text={tip.text} tone={tone} bold /></p>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {step.kind === 'check' && <CheckStep step={step} tone={tone} />}
    </motion.div>
  )
}

/* ───────────────────────── Formula ───────────────────────── */

function FormulaStep({ step, tone }: { step: Extract<Step, { kind: 'formula' }>; tone: Tone }) {
  const [row, setRow] = useState(0)
  const current = step.rows[row]
  return (
    <>
      <Heading kind="formula" title={step.title} tone={tone} />
      <Body text={step.text} tone={tone} />
      <motion.div variants={rise} className="card p-4 sm:p-6">
        {step.rows.length > 1 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {step.rows.map((r, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  sfx.tap()
                  setRow(i)
                }}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
                  i === row ? 'bg-ink text-paper' : 'bg-sunk text-muted hover:text-ink'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
        {step.rows.length === 1 && <p className="eyebrow mb-4">{current.label}</p>}
        <div key={row} className="flex flex-wrap items-start gap-x-2 gap-y-4">
          {current.parts.map((part, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -40, rotate: i % 2 ? 8 : -8 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 15, delay: 0.15 + i * 0.22 }}
              className="flex items-start gap-2"
            >
              {i > 0 && <span className="pt-2.5 font-display text-xl font-bold text-muted">+</span>}
              <div className="flex flex-col items-center gap-1">
                <span
                  className={`rounded-xl border-2 px-3.5 py-2 font-display text-lg font-extrabold sm:text-xl ${TONE[part.tone].soft} ${TONE[part.tone].border} ${TONE[part.tone].text}`}
                >
                  {part.text}
                </span>
                {part.caption && <span className="max-w-32 text-center text-xs leading-tight font-semibold text-muted">{part.caption}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {step.examples.map((ex, i) => (
        <motion.div key={i} variants={rise}>
          <ExampleCard example={ex} tone={tone} />
        </motion.div>
      ))}
    </>
  )
}

/* ───────────────────────── Trap ───────────────────────── */

function TrapStep({ step }: { step: Extract<Step, { kind: 'trap' }> }) {
  const [fixed, setFixed] = useState(false)
  return (
    <>
      <motion.div variants={rise}>
        <span className="eyebrow text-bad">⚠️ Trampa para hispanohablantes</span>
        <h2 className="mt-1 text-3xl leading-tight font-extrabold sm:text-4xl">{step.title}</h2>
      </motion.div>

      <motion.div variants={rise} className="card overflow-hidden">
        <motion.div
          animate={fixed ? { opacity: 0.55 } : { opacity: 1 }}
          className="flex items-center gap-3 bg-bad-soft p-5"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-bad text-white"><X size={20} strokeWidth={3} /></span>
          <p className={`text-xl font-bold ${fixed ? 'line-through decoration-bad decoration-2' : ''}`}>{step.wrong}</p>
        </motion.div>
        <AnimatePresence>
          {fixed && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden">
              <div className="flex items-center gap-3 bg-good-soft p-5">
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.15 }}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-good text-white"
                >
                  <Check size={20} strokeWidth={3} />
                </motion.span>
                <p className="flex-1 text-xl font-bold">{step.right}</p>
                <SpeakButton text={step.right} size="sm" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {!fixed ? (
        <motion.div variants={rise} className="flex flex-col items-start gap-2">
          <p className="text-ink/80">¿Ves el error? Piensa cómo la corregirías y luego repárala.</p>
          <button
            type="button"
            className="btn btn-good"
            onClick={() => {
              sfx.good()
              setFixed(true)
            }}
          >
            <Wrench size={18} /> Reparar la frase
          </button>
        </motion.div>
      ) : (
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="text-lg leading-relaxed text-ink/85">
          <Rich text={step.why} bold />
        </motion.p>
      )}
    </>
  )
}

/* ───────────────────────── Check ───────────────────────── */

function CheckStep({ step, tone }: { step: Extract<Step, { kind: 'check' }>; tone: Tone }) {
  const [picked, setPicked] = useState<number | null>(null)
  const solved = picked === step.answer
  return (
    <>
      <motion.div variants={rise}>
        <span className={`eyebrow ${TONE[tone].text}`}>Comprueba antes de practicar</span>
        <h2 className="mt-1 text-2xl leading-tight font-extrabold sm:text-3xl">{step.question}</h2>
      </motion.div>
      {step.sentence && (
        <motion.p variants={rise} className="card p-5 text-xl font-semibold">
          {step.sentence.split('___').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className={`mx-1 inline-block min-w-16 border-b-[3px] border-dashed px-1 text-center ${solved ? 'border-good text-good' : 'border-muted text-transparent'}`}>
                  {solved ? step.options[step.answer] : '·'}
                </span>
              )}
            </span>
          ))}
        </motion.p>
      )}
      <motion.div variants={rise} className="grid gap-3 sm:grid-cols-2">
        {step.options.map((opt, i) => {
          const state = picked === null ? '' : i === step.answer && solved ? 'tile-good' : i === picked ? 'tile-bad animate-shake' : ''
          return (
            <button
              key={i}
              type="button"
              disabled={solved}
              onClick={() => {
                setPicked(i)
                if (i === step.answer) sfx.good()
                else sfx.bad()
              }}
              className={`tile px-4 py-3 text-left text-lg ${state}`}
            >
              {opt}
            </button>
          )
        })}
      </motion.div>
      <AnimatePresence mode="wait">
        {picked !== null && (
          <motion.div
            key={solved ? 'ok' : `no-${picked}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-4 font-semibold ${solved ? 'bg-good-soft text-good' : 'bg-bad-soft text-bad'}`}
          >
            {solved ? <>✅ <Rich text={step.explain} bold /></> : 'Mmm, todavía no. Mira de nuevo las pistas de la frase e inténtalo otra vez.'}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
