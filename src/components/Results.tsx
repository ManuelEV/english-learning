import { useEffect } from 'react'
import { motion } from 'motion/react'
import confetti from 'canvas-confetti'
import { Star } from 'lucide-react'
import type { SessionResult } from './Session'
import { sfx } from '../lib/sound'

export function Results({
  result,
  stars,
  title,
  children,
}: {
  result: SessionResult
  /** Omit for sessions that don't award stars (workshop). */
  stars?: number
  title?: string
  children: React.ReactNode
}) {
  const pct = result.total ? Math.round((result.correct / result.total) * 100) : 0
  const great = pct >= 80
  const R = 62
  const C = 2 * Math.PI * R

  useEffect(() => {
    sfx.arrive()
    if (!great) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const colors = ['#f04e41', '#009b94', '#6a4df0', '#e39b00']
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.55 }, colors })
    const t = setTimeout(() => confetti({ particleCount: 60, spread: 120, origin: { y: 0.5 }, colors }), 350)
    return () => clearTimeout(t)
  }, [great])

  const headline =
    title ?? (pct >= 95 ? '¡Viaje perfecto!' : pct >= 80 ? '¡Gran trayecto!' : pct >= 60 ? '¡Estación alcanzada!' : 'Este tramo necesita otra vuelta')

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-6 px-4 py-10 text-center">
      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
        Próxima parada: resultados
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        className="text-4xl font-extrabold sm:text-5xl"
      >
        {headline}
      </motion.h1>

      {stars !== undefined && (
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <motion.span
              key={s}
              initial={{ scale: 0, rotate: -120 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 11, delay: 0.3 + s * 0.2 }}
            >
              <Star size={52} strokeWidth={1.5} className={s <= stars ? 'fill-amber text-amber' : 'fill-rule text-rule'} />
            </motion.span>
          ))}
        </div>
      )}

      <div className="relative grid place-items-center">
        <svg width={160} height={160} viewBox="0 0 160 160" className="-rotate-90">
          <circle cx={80} cy={80} r={R} fill="none" stroke="var(--color-rule)" strokeWidth={14} />
          <motion.circle
            cx={80} cy={80} r={R} fill="none"
            stroke={pct >= 60 ? 'var(--color-good)' : 'var(--color-amber)'}
            strokeWidth={14} strokeLinecap="round" strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: C * (1 - pct / 100) }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        <div className="absolute">
          <p className="font-display text-4xl font-extrabold tabular-nums">{pct}%</p>
          <p className="text-xs font-bold text-muted">a la primera</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid w-full grid-cols-3 gap-3"
      >
        {[
          { v: `${result.correct}/${result.total}`, l: 'aciertos' },
          { v: `+${result.km}`, l: 'km recorridos' },
          { v: String(result.missed), l: result.missed === 1 ? 'error al Taller' : 'errores al Taller' },
        ].map((s) => (
          <div key={s.l} className="card px-2 py-4">
            <p className="font-display text-2xl font-extrabold tabular-nums">{s.v}</p>
            <p className="text-xs leading-tight font-bold text-muted">{s.l}</p>
          </div>
        ))}
      </motion.div>

      {result.missed > 0 && (
        <p className="text-ink/80">
          🔧 Tus errores quedaron guardados en el <strong>Taller</strong>. Volverán en repasos espaciados hasta que los domines.
        </p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex w-full max-w-sm flex-col gap-3"
      >
        {children}
      </motion.div>
    </div>
  )
}
