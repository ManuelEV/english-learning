import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowRight, BookOpen, Dumbbell, Wrench } from 'lucide-react'
import { LINES, UNITS, getLine } from '../content'
import { MetroMap } from '../components/MetroMap'
import { isDone, practicedToday, useStore } from '../store'
import { useDueCount } from '../lib/review'
import { useNextStop } from '../lib/next'
import { TONE } from '../lib/tone'

const HOW = [
  { icon: BookOpen, tone: 'coral' as const, title: '1 · Aprende', text: 'Lecciones cortas paso a paso, con líneas de tiempo animadas, estructuras por bloques y audio.' },
  { icon: Dumbbell, tone: 'teal' as const, title: '2 · Practica', text: 'Ocho tipos de ejercicio con corrección inmediata y el porqué de cada respuesta.' },
  { icon: Wrench, tone: 'violet' as const, title: '3 · Repara', text: 'Tus errores van al Taller y vuelven en repasos espaciados hasta que los domines.' },
]

export function Home() {
  const units = useStore((s) => s.units)
  const streak = useStore((s) => s.streak)
  const next = useNextStop()
  const due = useDueCount()
  const doneCount = UNITS.filter((u) => isDone(units[u.id])).length
  const isNew = Object.keys(units).length === 0
  const nextLine = next && getLine(next.line)

  return (
    <div className="flex flex-col gap-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-ink p-6 text-paper sm:p-10">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20 sm:opacity-90" viewBox="0 0 800 320" preserveAspectRatio="xMaxYMid slice" aria-hidden>
          {[
            { d: 'M 420 -20 V 90 a 40 40 0 0 0 40 40 H 640 a 40 40 0 0 1 40 40 V 340', c: 'var(--color-coral)' },
            { d: 'M 820 60 H 600 a 40 40 0 0 0 -40 40 V 200 a 40 40 0 0 1 -40 40 H 380', c: 'var(--color-teal)' },
            { d: 'M 520 340 V 300 a 40 40 0 0 1 40 -40 H 820', c: 'var(--color-amber)' },
            { d: 'M 760 -20 V 340', c: 'var(--color-violet)' },
          ].map((p, i) => (
            <motion.path
              key={i} d={p.d} fill="none" stroke={p.c} strokeWidth={12} strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: i * 0.25, ease: 'easeInOut' }}
            />
          ))}
          {[[560, 130], [680, 250], [760, 60], [760, 260], [560, 200]].map(([x, y], i) => (
            <motion.circle
              key={i} cx={x} cy={y} r={11} fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth={5}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 1.2 + i * 0.12 }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
          ))}
        </svg>
        <div className="relative max-w-md">
          <p className="font-display text-xs font-bold tracking-[0.18em] text-paper/60 uppercase">
            {isNew ? 'Bienvenido a bordo' : practicedToday(streak) ? 'Ya viajaste hoy · ¡sigue así!' : 'Tu tren te espera'}
          </p>
          <h1 className="mt-2 text-4xl leading-[1.05] font-extrabold sm:text-5xl">
            {isNew ? (
              <>Inglés de B1 a C1, <span className="text-coral">estación por estación.</span></>
            ) : (
              <>Llevas {doneCount} de {UNITS.length} <span className="text-coral">estaciones.</span></>
            )}
          </h1>
          <p className="mt-3 text-lg text-paper/75">
            {isNew
              ? 'Cada tema es una estación: primero lo entiendes con una lección animada, luego lo practicas hasta que sale solo. Súbete en la que quieras.'
              : 'Retoma donde quedaste, salta a cualquier estación o pasa por el Taller a reparar tus errores.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {next && nextLine && (
              <Link to={`/u/${next.id}`} className={`btn ${TONE[nextLine.tone].btn}`}>
                {isNew ? 'Empezar el viaje' : `Seguir: ${next.title}`} <ArrowRight size={18} />
              </Link>
            )}
            {due > 0 && (
              <Link to="/taller" className="btn btn-ghost">
                <Wrench size={18} /> {due} por reparar
              </Link>
            )}
          </div>
        </div>
      </section>

      {isNew && (
        <section className="grid gap-4 sm:grid-cols-3">
          {HOW.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12 }}
              className="card p-5"
            >
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${TONE[h.tone].soft} ${TONE[h.tone].text}`}>
                <h.icon size={24} />
              </span>
              <h3 className="mt-3 text-xl font-extrabold">{h.title}</h3>
              <p className="mt-1 leading-snug text-ink/80">{h.text}</p>
            </motion.div>
          ))}
        </section>
      )}

      {/* Lines */}
      {LINES.map((line) => {
        const tone = TONE[line.tone]
        const done = line.unitIds.filter((id) => isDone(units[id])).length
        return (
          <section key={line.id} id={`linea-${line.id}`} className="card overflow-hidden">
            <header className="flex flex-wrap items-center gap-4 border-b-2 border-rule p-5 sm:p-6">
              <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-xl font-extrabold text-white ${tone.bg}`}>
                {line.badge}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl leading-tight font-extrabold">
                  {line.name} <span className="text-base font-bold text-muted">· {line.level}</span>
                </h2>
                <p className="leading-snug text-ink/75">{line.blurb}</p>
              </div>
              <div className="w-full sm:w-36">
                <p className="mb-1 text-right text-sm font-bold text-muted tabular-nums">{done}/{line.unitIds.length} estaciones</p>
                <div className="h-2.5 overflow-hidden rounded-full bg-rule">
                  <motion.div
                    className={`h-full rounded-full ${tone.bg}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(done / line.unitIds.length) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </header>
            <div className="px-2 pt-8 pb-4 sm:px-6">
              <MetroMap line={line} nextId={next?.id} />
            </div>
          </section>
        )
      })}

      <footer className="pb-4 text-center text-sm text-muted">
        Tu progreso se guarda solo en este navegador, pero todas las estaciones están abiertas: en otro dispositivo puedes seguir desde la que quieras. Audio generado con la voz de tu dispositivo.
      </footer>
    </div>
  )
}
