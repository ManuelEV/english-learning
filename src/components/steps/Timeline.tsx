import { useState } from 'react'
import { motion } from 'motion/react'
import { RotateCcw } from 'lucide-react'
import type { TimelineItem } from '../../content/types'
import { TONE } from '../../lib/tone'

const W = 330
const H = 192
const AXIS = 132
const PAD = 22
const TIERS = [30, 56, 82]
const STEP = 0.75

const xOf = (at: number) => PAD + ((Math.max(-100, Math.min(100, at)) + 100) / 200) * (W - PAD * 2)

/** Animated time axis: past ← NOW → future. Items draw themselves one after another. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  const [run, setRun] = useState(0)
  const nowX = xOf(0)

  return (
    <div className="card flex flex-col overflow-hidden p-3 sm:p-5">
      <button
        type="button"
        onClick={() => setRun((r) => r + 1)}
        className="mb-1 ml-auto flex cursor-pointer items-center gap-1.5 rounded-full bg-sunk px-3 py-1.5 text-xs font-bold text-muted hover:text-ink"
      >
        <RotateCcw size={13} /> Repetir
      </button>

      <svg key={run} viewBox={`0 0 ${W} ${H}`} className="mx-auto block w-full max-w-2xl" role="img" aria-label="Línea de tiempo">
        {/* now marker */}
        <motion.line
          x1={nowX} x2={nowX} y1={16} y2={AXIS + 16}
          stroke="var(--color-ink)" strokeWidth={1.5} strokeDasharray="3 4" opacity={0.35}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
        />
        {/* axis: solid past, dashed future */}
        <motion.line
          x1={PAD - 8} x2={nowX} y1={AXIS} y2={AXIS}
          stroke="var(--color-ink)" strokeWidth={3} strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
        />
        <motion.line
          x1={nowX} x2={W - PAD + 2} y1={AXIS} y2={AXIS}
          stroke="var(--color-ink)" strokeWidth={3} strokeLinecap="round" strokeDasharray="1 7"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        />
        <motion.path
          d={`M ${W - PAD - 2} ${AXIS - 6} L ${W - PAD + 6} ${AXIS} L ${W - PAD - 2} ${AXIS + 6}`}
          fill="none" stroke="var(--color-ink)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        />

        <text x={PAD - 8} y={AXIS + 34} fontSize={10} fontWeight={700} letterSpacing={1.2} fill="var(--color-muted)">PASADO</text>
        <text x={W - PAD + 8} y={AXIS + 34} fontSize={10} fontWeight={700} letterSpacing={1.2} textAnchor="end" fill="var(--color-muted)">FUTURO</text>
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 16 }} style={{ transformOrigin: `${nowX}px ${AXIS + 30}px` }}>
          <rect x={nowX - 26} y={AXIS + 20} width={52} height={20} rx={10} fill="var(--color-ink)" />
          <text x={nowX} y={AXIS + 34} fontSize={10} fontWeight={800} letterSpacing={1.2} textAnchor="middle" fill="var(--color-paper)">AHORA</text>
        </motion.g>
        <circle cx={nowX} cy={AXIS} r={4} fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth={2.5} />

        {items.map((item, i) => {
          const delay = 0.8 + i * STEP
          const color = TONE[item.tone].color
          const x1 = xOf(item.at)
          const x2 = item.to === undefined ? x1 : xOf(item.to)
          const mid = (x1 + x2) / 2
          const tierY = TIERS[i % TIERS.length]
          
          return (
            <g key={i}>
              {item.type === 'point' && (
                <motion.circle
                  cx={x1} cy={AXIS} r={7.5} fill={color} stroke="var(--color-card)" strokeWidth={2.5}
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay, type: 'spring', stiffness: 420, damping: 13 }}
                  style={{ transformOrigin: `${x1}px ${AXIS}px` }}
                />
              )}
              {item.type === 'span' && (
                <motion.line
                  x1={Math.min(x1, x2)} x2={Math.max(x1, x2)} y1={AXIS} y2={AXIS}
                  stroke={color} strokeWidth={11} strokeLinecap="round" opacity={0.85}
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay, duration: 0.7, ease: 'easeInOut' }}
                />
              )}
              {item.type === 'dots' &&
                Array.from({ length: 5 }, (_, k) => {
                  const cx = x1 + ((x2 - x1) * k) / 4
                  return (
                    <motion.circle
                      key={k} cx={cx} cy={AXIS} r={5.5} fill={color} stroke="var(--color-card)" strokeWidth={2}
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: delay + k * 0.12, type: 'spring', stiffness: 420, damping: 13 }}
                      style={{ transformOrigin: `${cx}px ${AXIS}px` }}
                    />
                  )
                })}
              <motion.line
                x1={mid} x2={mid} y1={tierY + 6} y2={AXIS - 11}
                stroke={color} strokeWidth={1.5} opacity={0.5}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: delay + 0.15, duration: 0.3 }}
              />
            </g>
          )
        })}

        {/* Labels go last so no leader line crosses them. */}
        {items.map((item, i) => {
          const delay = 0.8 + i * STEP
          const color = TONE[item.tone].color
          const x1 = xOf(item.at)
          const x2 = item.to === undefined ? x1 : xOf(item.to)
          const mid = (x1 + x2) / 2
          const tierY = TIERS[i % TIERS.length]
          const anchor = mid < 100 ? 'start' : mid > W - 100 ? 'end' : 'middle'
          const labelX = anchor === 'start' ? Math.max(mid - 8, 4) : anchor === 'end' ? Math.min(mid + 8, W - 4) : mid
          return (
              <motion.text key={i}
                x={labelX} y={tierY} fontSize={12.5} fontWeight={800} textAnchor={anchor} fill={color} stroke="var(--color-card)" strokeWidth={5} strokeLinejoin="round" style={{ paintOrder: "stroke" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.2, duration: 0.35 }}
              >
                {item.label}
              </motion.text>
          )
        })}
      </svg>
    </div>
  )
}
