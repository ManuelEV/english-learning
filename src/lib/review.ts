import { useEffect, useState } from 'react'
import { getExercise, UNITS } from '../content'
import type { SessionItem } from '../components/Session'
import { isDone, useStore, type ReviewCard, type UnitProgress } from '../store'
import { shuffle } from './text'

/** Re-render once a minute so due counts stay fresh. */
function useNow(): number {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60_000)
    return () => clearInterval(t)
  }, [])
  return now
}

export function dueIds(review: Record<string, ReviewCard>, now = Date.now()): string[] {
  return Object.entries(review)
    .filter(([id, c]) => c.due <= now && getExercise(id))
    .sort((a, b) => a[1].due - b[1].due)
    .map(([id]) => id)
}

export function useDueCount(): number {
  const review = useStore((s) => s.review)
  const now = useNow()
  return dueIds(review, now).length
}

export function toItems(ids: string[]): SessionItem[] {
  return ids.flatMap((id) => {
    const found = getExercise(id)
    return found ? [{ exercise: found.exercise, unitId: found.unit.id }] : []
  })
}

/** Interleaved mix from every station already visited. */
export function expressItems(units: Record<string, UnitProgress>, count = 8): SessionItem[] {
  const visited = UNITS.filter((u) => isDone(units[u.id]) || units[u.id]?.learned)
  const pool = visited.flatMap((u) => u.exercises.map((exercise) => ({ exercise, unitId: u.id })))
  // Spread across stations: never two from the same one in a row when avoidable.
  const picked = shuffle(pool).slice(0, count * 2)
  const out: SessionItem[] = []
  while (picked.length && out.length < count) {
    const last = out[out.length - 1]?.unitId
    const i = picked.findIndex((p) => p.unitId !== last)
    out.push(...picked.splice(i === -1 ? 0 : i, 1))
  }
  return out
}
