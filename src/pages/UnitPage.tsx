import { Link, Navigate, useParams } from 'react-router'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, BookOpen, Check, Clock, Dumbbell, ScrollText, Star } from 'lucide-react'
import { getLine, getUnit } from '../content'
import type { Step } from '../content/types'
import { isDone, useStore } from '../store'
import { TONE } from '../lib/tone'

const KIND_EMOJI: Record<Step['kind'], string> = {
  hook: '🎬', timeline: '⏳', formula: '🧱', examples: '💬', compare: '⚖️', trap: '⚠️', tips: '💡', check: '✅',
}

function stepTitle(step: Step): string {
  return step.kind === 'check' ? 'Comprueba lo aprendido' : step.title
}

export function UnitPage() {
  const { id } = useParams()
  const unit = getUnit(id)
  const progress = useStore((s) => (id ? s.units[id] : undefined))
  if (!unit) return <Navigate to="/" replace />
  const line = getLine(unit.line)
  const tone = TONE[line.tone]
  const station = line.unitIds.indexOf(unit.id) + 1

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link to="/" className="inline-flex items-center gap-1.5 self-start text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} /> Volver al mapa
      </Link>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-[2rem] p-6 sm:p-9 ${tone.soft}`}
      >
        <motion.span
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.15 }}
          className="absolute top-4 right-5 text-[6rem] leading-none opacity-90 select-none sm:text-[8rem]"
          aria-hidden
        >
          {unit.emoji}
        </motion.span>
        <div className="relative max-w-[75%]">
          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-display text-xs font-extrabold tracking-wide text-white uppercase ${tone.bg}`}>
            {line.badge} · Estación {station} de {line.unitIds.length}
          </span>
          <h1 className="mt-3 text-3xl leading-[1.05] font-extrabold sm:text-5xl">{unit.title}</h1>
          <p className="mt-3 text-lg leading-snug text-ink/80">{unit.subtitle}</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-bold text-muted">
            <span className="inline-flex items-center gap-1.5"><Clock size={15} /> {unit.minutes} min</span>
            <span>{unit.steps.length} pasos · {unit.exercises.length} ejercicios</span>
          </p>
        </div>
      </motion.section>

      <div className="grid gap-4 sm:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="card flex flex-col gap-3 p-6">
          <div className="flex items-center justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-coral-soft text-coral"><BookOpen size={24} /></span>
            {progress?.learned && (
              <span className="inline-flex items-center gap-1 rounded-full bg-good-soft px-3 py-1 text-xs font-bold text-good"><Check size={13} strokeWidth={3} /> Vista</span>
            )}
          </div>
          <h2 className="text-2xl font-extrabold">1 · Aprende</h2>
          <p className="flex-1 leading-snug text-ink/80">La explicación paso a paso, con animaciones, ejemplos con audio y la trampa típica del español.</p>
          <Link to={`/u/${unit.id}/leccion`} className={`btn ${progress?.learned ? 'btn-ghost' : tone.btn}`}>
            {progress?.learned ? 'Repasar la lección' : 'Empezar la lección'} <ArrowRight size={18} />
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="card flex flex-col gap-3 p-6">
          <div className="flex items-center justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-soft text-teal"><Dumbbell size={24} /></span>
            {progress && progress.attempts > 0 && (
              <span className="flex items-center gap-0.5" title={`Mejor resultado: ${Math.round(progress.best * 100)}%`}>
                {[1, 2, 3].map((s) => (
                  <Star key={s} size={20} className={s <= progress.stars ? 'fill-amber text-amber' : 'fill-rule text-rule'} />
                ))}
              </span>
            )}
          </div>
          <h2 className="text-2xl font-extrabold">2 · Practica</h2>
          <p className="flex-1 leading-snug text-ink/80">
            {progress && progress.attempts > 0
              ? `Tu mejor resultado: ${Math.round(progress.best * 100)}% a la primera. ${isDone(progress) ? '¿Vas por las tres estrellas?' : 'Necesitas 60% para completar la estación.'}`
              : 'Elegir, completar, ordenar, cazar errores, dictado y más. Con 60% de aciertos completas la estación.'}
          </p>
          <Link to={`/u/${unit.id}/practica`} className={`btn ${progress?.learned && !isDone(progress) ? tone.btn : 'btn-ghost'}`}>
            {progress && progress.attempts > 0 ? 'Practicar otra vez' : 'Ir a practicar'} <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Link to={`/resumen/${unit.id}`} className="card group flex items-center gap-4 p-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-soft text-amber"><ScrollText size={24} /></span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-xl font-extrabold">Resumen de la estación</span>
            <span className="leading-snug text-ink/80">El torpedo: estructura, usos, errores típicos y ejemplos en una sola página.</span>
          </span>
          <ArrowRight size={20} className="shrink-0 text-muted transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="card p-6">
        <p className="eyebrow">Recorrido de la lección</p>
        <ol className="mt-4 flex flex-col">
          {unit.steps.map((step, i) => (
            <li key={i} className="relative flex items-center gap-3 pb-4 last:pb-0">
              {i < unit.steps.length - 1 && <span className={`absolute top-8 left-[1.05rem] h-full w-1 rounded-full ${tone.soft}`} />}
              <span className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full border-[3px] bg-card text-sm ${tone.border}`}>{KIND_EMOJI[step.kind]}</span>
              <span className="leading-tight font-semibold">{stepTitle(step)}</span>
            </li>
          ))}
        </ol>
      </motion.section>
    </div>
  )
}
