import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { ArrowLeft, ArrowRight, BookOpen, Check, Dumbbell, Search, X } from 'lucide-react'
import { LINES, UNITS, getLine, getUnit } from '../content'
import type { Step, Tone, Unit } from '../content/types'
import { TONE } from '../lib/tone'
import { Rich } from '../components/Rich'
import { SpeakButton } from '../components/SpeakButton'
import { Timeline } from '../components/steps/Timeline'

/* ───────────────────────── Index ───────────────────────── */

const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function SummaryIndex() {
  const [q, setQ] = useState('')
  const needle = fold(q.trim())
  const hit = (u: Unit) => !needle || fold(`${u.title} ${u.subtitle}`).includes(needle)
  const groups = LINES.map((line) => ({ line, units: line.unitIds.map((id) => getUnit(id)!).filter(hit) })).filter((g) => g.units.length)

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <div>
          <p className="eyebrow">Para estudiar sin ejercicios</p>
          <h1 className="mt-1 text-4xl leading-tight font-extrabold">Resúmenes</h1>
          <p className="mt-2 max-w-2xl text-lg text-ink/80">
            El torpedo de cada estación en una sola página: cómo se arma, cuándo se usa, los errores típicos y muchos ejemplos con audio.
          </p>
        </div>
        <label className="relative block max-w-md">
          <Search size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar un tema…"
            aria-label="Buscar un tema"
            className="field w-full pl-11"
          />
        </label>
      </section>

      {groups.length === 0 && <p className="card p-6 text-center font-semibold text-muted">Ningún tema coincide con «{q}».</p>}

      {groups.map(({ line, units }) => {
        const tone = TONE[line.tone]
        return (
          <section key={line.id} className="flex flex-col gap-3">
            <h2 className="flex items-center gap-3 text-2xl font-extrabold">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm font-extrabold text-white ${tone.bg}`}>
                {line.badge}
              </span>
              {line.name} <span className="text-base font-bold text-muted">· {line.level}</span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {units.map((u) => (
                <Link
                  key={u.id}
                  to={`/resumen/${u.id}`}
                  className="card group flex items-center gap-3 p-4 transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl ${tone.soft}`}>{u.emoji}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg leading-tight font-bold">{u.title}</span>
                    <span className="line-clamp-2 text-sm leading-snug text-muted">{u.subtitle}</span>
                  </span>
                  <ArrowRight size={18} className={`shrink-0 text-muted transition-transform group-hover:translate-x-1 ${tone.text}`} />
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

/* ───────────────────────── Building blocks ───────────────────────── */

interface Sample {
  en: string
  es?: string
  note?: string
}

type StepOf<K extends Step['kind']> = Extract<Step, { kind: K }>
const pick = <K extends Step['kind']>(unit: Unit, kind: K) => unit.steps.filter((s): s is StepOf<K> => s.kind === kind)

function Section({ id, emoji, title, children }: { id: string; emoji: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-6 flex-col gap-3">
      <h2 className="flex items-center gap-2.5 text-2xl font-extrabold">
        <span aria-hidden>{emoji}</span> {title}
      </h2>
      {children}
    </section>
  )
}

function SubTitle({ title, text, tone }: { title: string; text?: string; tone: Tone }) {
  return (
    <div>
      <h3 className="text-lg leading-tight font-bold">{title}</h3>
      {text && (
        <p className="mt-1 leading-snug text-ink/80">
          <Rich text={text} tone={tone} bold />
        </p>
      )}
    </div>
  )
}

function Samples({ items, tone }: { items: Sample[]; tone: Tone }) {
  if (!items.length) return null
  return (
    <ul className="card divide-y-2 divide-rule px-4">
      {items.map((s, i) => (
        <li key={i} className="flex items-start gap-3 py-3">
          <SpeakButton text={s.en} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="text-lg leading-snug font-semibold">
              <Rich text={s.en} tone={tone} />
            </p>
            {s.es && <p className="text-muted">{s.es}</p>}
            {s.note && (
              <p className="mt-0.5 text-sm leading-snug font-semibold text-ink/75">
                💡 <Rich text={s.note} tone={tone} bold />
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

function Blocks({ rows }: { rows: StepOf<'formula'>['rows'] }) {
  return (
    <div className="card flex flex-col divide-y-2 divide-rule">
      {rows.map((row, r) => (
        <div key={r} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:gap-5">
          <span className="eyebrow shrink-0 sm:w-32 sm:pt-3">{row.label}</span>
          <div className="flex flex-wrap items-start gap-x-2 gap-y-3">
            {row.parts.map((part, i) => (
              <div key={i} className="flex items-start gap-2">
                {i > 0 && <span className="pt-2 font-display text-lg font-bold text-muted">+</span>}
                <div className="flex flex-col items-center gap-1">
                  <span className={`rounded-xl border-2 px-3 py-1.5 font-display text-base font-extrabold sm:text-lg ${TONE[part.tone].soft} ${TONE[part.tone].border} ${TONE[part.tone].text}`}>
                    {part.text}
                  </span>
                  {part.caption && <span className="max-w-28 text-center text-xs leading-tight font-semibold text-muted">{part.caption}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Versus({ step }: { step: StepOf<'compare'> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {[step.left, step.right].map((side, i) => (
        <div key={i} className={`card flex flex-col overflow-hidden ${TONE[side.tone].border}`}>
          <div className={`px-4 py-2.5 font-display text-lg font-extrabold ${TONE[side.tone].soft} ${TONE[side.tone].text}`}>{side.label}</div>
          <div className="flex flex-1 flex-col gap-3 p-4">
            <ul className="flex flex-col gap-1.5">
              {side.points.map((p, k) => (
                <li key={k} className="flex gap-2 leading-snug">
                  <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${TONE[side.tone].bg}`} />
                  <span>
                    <Rich text={p} tone={side.tone} bold />
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-start gap-3 rounded-2xl bg-sunk p-3">
              <SpeakButton text={side.example.en} size="sm" />
              <div>
                <p className="leading-snug font-semibold">
                  <Rich text={side.example.en} tone={side.tone} />
                </p>
                <p className="text-sm text-muted">{side.example.es}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

interface Mistake {
  wrong: React.ReactNode
  right: React.ReactNode
  rightText: string
  why: string
}

function Mistakes({ items }: { items: Mistake[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((m, i) => (
        <div key={i} className="card overflow-hidden">
          <div className="flex items-start gap-3 bg-bad-soft px-4 py-3">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-bad text-white">
              <X size={14} strokeWidth={3.5} />
            </span>
            <p className="leading-snug font-semibold">{m.wrong}</p>
          </div>
          <div className="flex items-start gap-3 bg-good-soft px-4 py-3">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-good text-white">
              <Check size={14} strokeWidth={3.5} />
            </span>
            <p className="flex-1 leading-snug font-bold">{m.right}</p>
            <SpeakButton text={m.rightText} size="sm" />
          </div>
          <p className="px-4 py-3 text-sm leading-snug text-ink/80">
            <Rich text={m.why} bold />
          </p>
        </div>
      ))}
    </div>
  )
}

/* ───────────────────────── Derived content ───────────────────────── */

const tidy = (s: string) => s.replace(/\s+([.,!?;:])/g, '$1').replace(/\s{2,}/g, ' ').trim()

function mistakesOf(unit: Unit): Mistake[] {
  const out: Mistake[] = pick(unit, 'trap').map((t) => ({ wrong: t.wrong, right: t.right, rightText: t.right, why: t.why }))
  for (const ex of unit.exercises) {
    if (ex.type !== 'error') continue
    const m = ex.sentence.match(/^(.*?)\[([^\]]*)\](.*)$/s)
    if (!m) continue
    const [, before, wrong, after] = m
    out.push({
      wrong: (
        <>
          {before}
          <span className="font-bold text-bad line-through decoration-2">{wrong}</span>
          {after}
        </>
      ),
      right: ex.fix ? (
        <>
          {before}
          <span className="rounded-md bg-good px-1 text-white">{ex.fix}</span>
          {after}
        </>
      ) : (
        tidy(before + after)
      ),
      rightText: tidy(before + ex.fix + after),
      why: ex.explain,
    })
  }
  return out
}

/** Correct sentences taken from the practice exercises, with the reason behind each. */
function modelsOf(unit: Unit): Sample[] {
  return unit.exercises.flatMap((ex): Sample[] => {
    switch (ex.type) {
      case 'gap':
        return [{ en: ex.sentence.replace('___', `**${ex.answers[0]}**`), note: ex.explain }]
      case 'choice':
        return ex.sentence ? [{ en: ex.sentence.replace('___', `**${ex.options[ex.answer]}**`), note: ex.explain }] : []
      case 'order':
        return [{ en: ex.words.join(' '), es: ex.es, note: ex.explain }]
      case 'listen':
        return [{ en: ex.text, es: ex.es, note: ex.explain }]
      default:
        return []
    }
  })
}

/* ───────────────────────── Sheet ───────────────────────── */

export function SummaryPage() {
  const { id } = useParams()
  const unit = getUnit(id)
  if (!unit) return <Navigate to="/resumen" replace />
  const line = getLine(unit.line)
  const t = line.tone
  const tone = TONE[t]

  const formulas = pick(unit, 'formula')
  const timelines = pick(unit, 'timeline')
  const compares = pick(unit, 'compare')
  const exampleSteps = pick(unit, 'examples')
  const hooks = pick(unit, 'hook').filter((h) => h.example)
  const tips = pick(unit, 'tips')
  const mistakes = mistakesOf(unit)
  const models = modelsOf(unit)
  const rewrites = unit.exercises.filter((e) => e.type === 'rewrite')
  const sorts = unit.exercises.filter((e) => e.type === 'sort')
  const matches = unit.exercises.filter((e) => e.type === 'match')

  const toc = [
    formulas.length > 0 && { id: 'estructura', label: '🧱 Estructura' },
    (timelines.length > 0 || compares.length > 0) && { id: 'usos', label: '🧭 Cuándo se usa' },
    (exampleSteps.length > 0 || hooks.length > 0) && { id: 'ejemplos', label: '💬 Ejemplos' },
    mistakes.length > 0 && { id: 'errores', label: '⚠️ Errores típicos' },
    tips.length > 0 && { id: 'claves', label: '💡 Claves' },
    (sorts.length > 0 || matches.length > 0) && { id: 'tablas', label: '🗂️ Tablas' },
    (models.length > 0 || rewrites.length > 0) && { id: 'mas', label: '📚 Más frases' },
  ].filter((x): x is { id: string; label: string } => !!x)

  const i = UNITS.indexOf(unit)
  const prev = UNITS[i - 1]
  const next = UNITS[i + 1]

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <Link to="/resumen" className="-mb-3 inline-flex items-center gap-1.5 self-start text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} /> Todos los resúmenes
      </Link>

      <header className={`relative overflow-hidden rounded-[2rem] p-6 sm:p-8 ${tone.soft}`}>
        <span className="absolute top-3 right-4 text-[5rem] leading-none opacity-90 select-none sm:text-[6.5rem]" aria-hidden>
          {unit.emoji}
        </span>
        <div className="relative max-w-[78%]">
          <span className={`inline-flex rounded-full px-3 py-1 font-display text-xs font-extrabold tracking-wide text-white uppercase ${tone.bg}`}>
            Resumen · {line.badge}
          </span>
          <h1 className="mt-3 text-3xl leading-[1.05] font-extrabold sm:text-4xl">{unit.title}</h1>
          <p className="mt-2 text-lg leading-snug text-ink/80">{unit.subtitle}</p>
        </div>
        <div className="relative mt-5 flex flex-wrap gap-2">
          <Link to={`/u/${unit.id}/leccion`} className="btn btn-ghost">
            <BookOpen size={18} /> Ver la lección
          </Link>
          <Link to={`/u/${unit.id}/practica`} className={`btn ${tone.btn}`}>
            <Dumbbell size={18} /> Practicar
          </Link>
        </div>
      </header>

      {toc.length > 1 && (
        <nav aria-label="Secciones" className="-my-3 flex flex-wrap gap-2">
          {toc.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-full border-2 border-rule bg-card px-3.5 py-1.5 text-sm font-bold hover:border-ink">
              {s.label}
            </a>
          ))}
        </nav>
      )}

      {formulas.length > 0 && (
        <Section id="estructura" emoji="🧱" title="Cómo se arma">
          {formulas.map((f, k) => (
            <div key={k} className="flex flex-col gap-3">
              <SubTitle title={f.title} text={f.text} tone={t} />
              <Blocks rows={f.rows} />
              <Samples items={f.examples} tone={t} />
            </div>
          ))}
        </Section>
      )}

      {(timelines.length > 0 || compares.length > 0) && (
        <Section id="usos" emoji="🧭" title="Cuándo se usa">
          {timelines.map((tl, k) => (
            <div key={`t${k}`} className="flex flex-col gap-3">
              <SubTitle title={tl.title} text={tl.text} tone={t} />
              <Timeline items={tl.items} />
              {tl.example && <Samples items={[tl.example]} tone={t} />}
            </div>
          ))}
          {compares.map((c, k) => (
            <div key={`c${k}`} className="flex flex-col gap-3">
              <SubTitle title={c.title} text={c.text} tone={t} />
              <Versus step={c} />
            </div>
          ))}
        </Section>
      )}

      {(exampleSteps.length > 0 || hooks.length > 0) && (
        <Section id="ejemplos" emoji="💬" title="Ejemplos por caso">
          {hooks.map((h, k) => (
            <div key={`h${k}`} className="flex flex-col gap-3">
              <SubTitle title={h.title} tone={t} />
              <Samples items={[h.example!]} tone={t} />
            </div>
          ))}
          {exampleSteps.map((e, k) => (
            <div key={`e${k}`} className="flex flex-col gap-3">
              <SubTitle title={e.title} text={e.text} tone={t} />
              <Samples items={e.items} tone={t} />
            </div>
          ))}
        </Section>
      )}

      {mistakes.length > 0 && (
        <Section id="errores" emoji="⚠️" title="Errores típicos">
          <Mistakes items={mistakes} />
        </Section>
      )}

      {tips.length > 0 && (
        <Section id="claves" emoji="💡" title="Claves para recordar">
          {tips.map((tp, k) => (
            <div key={k} className="flex flex-col gap-3">
              <SubTitle title={tp.title} text={tp.text} tone={t} />
              <div className="grid gap-3 sm:grid-cols-2">
                {tp.items.map((tip, j) => (
                  <div key={j} className="card flex items-start gap-3 p-4">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xl ${tone.soft}`}>{tip.emoji}</span>
                    <div>
                      <p className="font-display leading-tight font-bold">
                        <Rich text={tip.title} tone={t} bold />
                      </p>
                      <p className="mt-0.5 text-sm leading-snug text-ink/80">
                        <Rich text={tip.text} tone={t} bold />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Section>
      )}

      {(sorts.length > 0 || matches.length > 0) && (
        <Section id="tablas" emoji="🗂️" title="Tablas rápidas">
          {sorts.map((s) => (
            <div key={s.id} className="grid grid-cols-2 gap-3">
              {s.categories.map((cat, c) => (
                <div key={c} className="card overflow-hidden">
                  <p className={`px-4 py-2.5 font-display leading-tight font-extrabold ${c === 0 ? `${tone.soft} ${tone.text}` : 'bg-sunk'}`}>{cat}</p>
                  <ul className="flex flex-col gap-1.5 p-4">
                    {s.items.filter((it) => it.cat === c).map((it, j) => (
                      <li key={j} className="leading-snug font-semibold">{it.text}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
          {matches.map((m) => (
            <div key={m.id} className="card overflow-hidden">
              <p className="border-b-2 border-rule px-4 py-2.5 text-sm font-bold text-muted">{m.prompt}</p>
              <ul className="divide-y-2 divide-rule">
                {m.pairs.map(([a, b], j) => (
                  <li key={j} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-2.5 leading-snug">
                    <span className="font-bold">{a}</span>
                    <ArrowRight size={16} className={tone.text} aria-hidden />
                    <span className="text-ink/85">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {(models.length > 0 || rewrites.length > 0) && (
        <Section id="mas" emoji="📚" title="Más frases modelo">
          <p className="-mt-1 text-sm font-semibold text-muted">
            Son las respuestas correctas de la práctica de esta estación, con el porqué de cada una.
          </p>
          <Samples items={models} tone={t} />
          {rewrites.length > 0 && (
            <>
              <SubTitle title="La misma idea, dicha de otra forma" tone={t} />
              <div className="flex flex-col gap-3">
                {rewrites.map((r) => (
                  <div key={r.id} className="card p-4">
                    <p className="leading-snug text-ink/75">{r.source}</p>
                    <div className="mt-2 flex items-start gap-3">
                      <ArrowRight size={20} className={`mt-1 shrink-0 ${tone.text}`} aria-hidden />
                      <p className="flex-1 text-lg leading-snug font-bold">{r.answers[0]}</p>
                      <SpeakButton text={r.answers[0]} size="sm" />
                    </div>
                    <p className="mt-2 text-sm leading-snug font-semibold text-ink/75">
                      💡 <Rich text={r.explain} tone={t} bold />
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </Section>
      )}

      <nav className="flex flex-wrap justify-between gap-3 border-t-2 border-rule pt-6">
        {prev ? (
          <Link to={`/resumen/${prev.id}`} className="btn btn-ghost">
            <ArrowLeft size={18} /> {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/resumen/${next.id}`} className="btn btn-ghost">
            {next.title} <ArrowRight size={18} />
          </Link>
        )}
      </nav>
    </div>
  )
}
