import { LINES, UNITS, getUnit } from '../content'
import { isDone, useStore } from '../store'

/**
 * The suggested next station. Every station is open, so this is only a hint:
 * a started-but-unfinished one, else the first pending one on a line already in use.
 */
export function useNextStop() {
  const units = useStore((s) => s.units)
  const started = UNITS.find((u) => (units[u.id]?.learned || units[u.id]?.attempts) && !isDone(units[u.id]))
  if (started) return started
  for (const line of LINES.filter((l) => l.id !== 'es')) {
    const anyDone = line.unitIds.some((id) => isDone(units[id]))
    const next = line.unitIds.find((id) => !isDone(units[id]))
    if (anyDone && next) return getUnit(next)
  }
  return UNITS.find((u) => !isDone(units[u.id]))
}
