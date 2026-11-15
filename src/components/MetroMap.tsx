import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { Check, Lock, Star } from 'lucide-react'
import type { Line } from '../content'
import { getUnit } from '../content'
import { isDone, useStore } from '../store'
import { TONE } from '../lib/tone'

const ROW_H = 176
const TOP = 46

interface Pt {
  x: number
  y: number
}

/** Snake path through the stations: straight runs joined by rounded U-turns. */
function pathThrough(pts: Pt[], BULGE: number): string {
  if (!pts.length) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]
    const b = pts[i]
    if (a.y === b.y) d += ` L ${b.x} ${b.y}`
    else {
      // Turn outwards, on the side the row was heading to.
      const prev = pts[i - 2]
      const dir = prev ? Math.sign(a.x - prev.x) || 1 : 1
      d += ` C ${a.x + dir * BULGE} ${a.y}, ${b.x + dir * BULGE} ${b.y}, ${b.x} ${b.y}`
    }
  }
  return d
}

export function MetroMap({ line }: { line: Line }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const units = useStore((s) => s.units)
  const free = useStore((s) => s.settings.free)
  const tone = TONE[line.tone]

  useLayoutEffect(() => {
    const el = wrap.current
    if (!el) return
    const ro = new ResizeObserver(() => setWidth(el.clientWidth))
    ro.observe(el)
    setWidth(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  const n = line.unitIds.length
  const cols = Math.min(n, width < 520 ? 2 : width < 820 ? 3 : 4)
  const BULGE = width < 520 ? 40 : 62
  const side = BULGE * 0.75 + (width < 520 ? 6 : 14)
  const cellW = cols ? (width - side * 2) / cols : 0
  const rows = Math.ceil(n / Math.max(cols, 1))
  const pts: Pt[] = line.unitIds.map((_, i) => {
    const row = Math.floor(i / cols)
    const col = row % 2 === 0 ? i % cols : cols - 1 - (i % cols)
    return { x: side + cellW * (col + 0.5), y: TOP + row * ROW_H }
  })

  const done = line.unitIds.map((id) => isDone(units[id]))
  // The "current" station: first one not yet done.
  const current = done.indexOf(false)
  const reached = current === -1 ? n - 1 : current
  const open = (i: number) => free || line.id === 'es' || i === 0 || done[i] || done[i - 1]

  return (
    <div ref={wrap} className="relative" style={{ height: TOP + (rows - 1) * ROW_H + 132 }}>
      {width > 0 && (
        <>
          <svg className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <path d={pathThrough(pts, BULGE)} fill="none" stroke={tone.softColor} strokeWidth={16} strokeLinecap="round" />
            <path d={pathThrough(pts, BULGE)} fill="none" stroke={tone.color} strokeWidth={3} strokeLinecap="round" strokeDasharray="2 10" opacity={0.55} />
            {reached > 0 && (
              <motion.path
                key={`${width}-${reached}`}
                d={pathThrough(pts.slice(0, reached + 1), BULGE)}
                fill="none"
                stroke={tone.color}
                strokeWidth={16}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            )}
          </svg>

          {line.unitIds.map((id, i) => {
            const unit = getUnit(id)!
            const p = units[id]
            const isOpen = open(i)
            const isCurrent = i === current && isOpen
            const station = (
              <>
                <span className="relative grid h-[4.25rem] w-[4.25rem] place-items-center">
                  {isCurrent && <span className={`absolute inset-1 animate-pulse-ring rounded-full ${tone.bg}`} />}
                  <span
                    className={`relative grid h-full w-full place-items-center rounded-full border-[5px] text-3xl transition-transform group-hover:scale-110 group-active:scale-95 ${
                      done[i]
                        ? `${tone.bg} ${tone.border}`
                        : isOpen
                          ? `bg-card ${tone.border}`
                          : 'border-rule bg-sunk'
                    }`}
                  >
                    {isOpen ? (
                      <span className={done[i] ? 'drop-shadow-sm' : ''}>{unit.emoji}</span>
                    ) : (
                      <Lock size={22} className="text-muted" />
                    )}
                  </span>
                  {done[i] && (
                    <span className="absolute -right-1 -bottom-1 grid h-6 w-6 place-items-center rounded-full border-2 border-card bg-good text-white">
                      <Check size={13} strokeWidth={4} />
                    </span>
                  )}
                  {isCurrent && (
                    <motion.span
                      className="absolute -top-7 text-2xl"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                      aria-hidden
                    >
                      🚇
                    </motion.span>
                  )}
                </span>
                <span className={`mt-2 line-clamp-3 px-0.5 text-center font-display text-[0.92rem] leading-tight font-bold ${isOpen ? '' : 'text-muted'}`}>
                  {unit.title}
                </span>
                <span className="mt-1 flex h-4 gap-0.5">
                  {p && p.stars > 0
                    ? [1, 2, 3].map((s) => (
                        <Star key={s} size={14} className={s <= p.stars ? 'fill-amber text-amber' : 'text-rule'} />
                      ))
                    : p?.learned && <span className="text-[0.7rem] font-bold text-muted">lección vista</span>}
                </span>
              </>
            )
            const cls = 'group absolute flex -translate-x-1/2 flex-col items-center'
            const style = { left: pts[i].x, top: pts[i].y - 34, width: Math.min(cellW - 6, 180) }
            return (
              <motion.div
                key={id}
                className={cls}
                style={style}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: i * 0.06 }}
              >
                {isOpen ? (
                  <Link to={`/u/${id}`} className="flex flex-col items-center rounded-2xl">
                    {station}
                  </Link>
                ) : (
                  <div className="flex cursor-not-allowed flex-col items-center" title="Completa la estación anterior para abrirla">
                    {station}
                  </div>
                )}
              </motion.div>
            )
          })}
        </>
      )}
    </div>
  )
}
