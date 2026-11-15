import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UnitProgress {
  learned: boolean
  /** Best first-try accuracy in practice, 0–1. */
  best: number
  stars: 0 | 1 | 2 | 3
  attempts: number
}

/** A mistake waiting in the workshop (Leitner box + due date). */
export interface ReviewCard {
  unitId: string
  box: number
  due: number
}

export interface Settings {
  theme: 'light' | 'dark'
  sound: boolean
  accent: 'US' | 'GB'
  rate: number
  /** Free mode: every station is open. */
  free: boolean
}

interface State {
  units: Record<string, UnitProgress>
  review: Record<string, ReviewCard>
  km: number
  streak: { count: number; last: string }
  settings: Settings

  markLearned: (unitId: string) => void
  finishPractice: (unitId: string, correct: number, total: number) => 0 | 1 | 2 | 3
  recordAnswer: (exerciseId: string, unitId: string, correct: boolean) => void
  addKm: (n: number) => void
  touchStreak: () => void
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
  reset: () => void
}

const DAY = 24 * 60 * 60 * 1000
/** Days until a repaired mistake comes back, per box. After the last one it is mastered. */
export const INTERVALS = [1, 3, 7, 16]

const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export function starsFor(accuracy: number): 0 | 1 | 2 | 3 {
  if (accuracy >= 0.95) return 3
  if (accuracy >= 0.8) return 2
  if (accuracy >= 0.6) return 1
  return 0
}

const emptyUnit: UnitProgress = { learned: false, best: 0, stars: 0, attempts: 0 }

const defaults = {
  units: {} as Record<string, UnitProgress>,
  review: {} as Record<string, ReviewCard>,
  km: 0,
  streak: { count: 0, last: '' },
  settings: { theme: 'light', sound: true, accent: 'US', rate: 0.95, free: false } as Settings,
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      ...defaults,

      markLearned: (unitId) =>
        set((s) => ({
          units: { ...s.units, [unitId]: { ...(s.units[unitId] ?? emptyUnit), learned: true } },
        })),

      finishPractice: (unitId, correct, total) => {
        const accuracy = total ? correct / total : 0
        const stars = starsFor(accuracy)
        set((s) => {
          const prev = s.units[unitId] ?? emptyUnit
          return {
            units: {
              ...s.units,
              [unitId]: {
                ...prev,
                best: Math.max(prev.best, accuracy),
                stars: Math.max(prev.stars, stars) as 0 | 1 | 2 | 3,
                attempts: prev.attempts + 1,
              },
            },
          }
        })
        get().touchStreak()
        return stars
      },

      recordAnswer: (exerciseId, unitId, correct) =>
        set((s) => {
          const review = { ...s.review }
          const card = review[exerciseId]
          if (!correct) {
            review[exerciseId] = { unitId, box: 0, due: Date.now() }
          } else if (card) {
            if (card.box >= INTERVALS.length - 1) delete review[exerciseId]
            else review[exerciseId] = { unitId, box: card.box + 1, due: Date.now() + INTERVALS[card.box] * DAY }
          }
          return { review }
        }),

      addKm: (n) => set((s) => ({ km: s.km + n })),

      touchStreak: () =>
        set((s) => {
          const today = dayKey()
          if (s.streak.last === today) return {}
          const yesterday = dayKey(new Date(Date.now() - DAY))
          return { streak: { count: s.streak.last === yesterday ? s.streak.count + 1 : 1, last: today } }
        }),

      setSetting: (key, value) => set((s) => ({ settings: { ...s.settings, [key]: value } })),

      reset: () => set((s) => ({ ...defaults, settings: s.settings })),
    }),
    {
      name: 'nextstop-v1',
      version: 1,
      partialize: ({ units, review, km, streak, settings }) => ({ units, review, km, streak, settings }),
    },
  ),
)

/** The streak only counts if the last session was today or yesterday. */
export function liveStreak(streak: { count: number; last: string }): number {
  const today = dayKey()
  const yesterday = dayKey(new Date(Date.now() - DAY))
  return streak.last === today || streak.last === yesterday ? streak.count : 0
}

export function practicedToday(streak: { last: string }): boolean {
  return streak.last === dayKey()
}

export function isDone(p: UnitProgress | undefined): boolean {
  return !!p && p.stars > 0
}
