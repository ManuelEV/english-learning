import type { Exercise, LineId, Tone, Unit } from './types'

export interface Line {
  id: LineId
  badge: string
  name: string
  level: string
  blurb: string
  tone: Exclude<Tone, 'ink'>
  /** Stations in travel order. */
  unitIds: string[]
}

export const LINES: Line[] = [
  {
    id: 'b1',
    badge: 'B1',
    name: 'Línea Coral',
    level: 'Intermedio',
    blurb: 'Los cimientos: tiempos verbales, condicionales, modales y pasiva para desenvolverte con soltura.',
    tone: 'coral',
    unitIds: [
      'b1-present-perfect',
      'b1-past-continuous',
      'b1-future-forms',
      'b1-conditionals',
      'b1-modals',
      'b1-passive',
      'b1-comparisons',
      'b1-phrasal-verbs',
    ],
  },
  {
    id: 'b2',
    badge: 'B2',
    name: 'Línea Turquesa',
    level: 'Intermedio alto',
    blurb: 'Cuenta historias, especula, lamenta y reporta lo que otros dijeron con precisión.',
    tone: 'teal',
    unitIds: [
      'b2-perfect-continuous',
      'b2-narrative-tenses',
      'b2-used-to',
      'b2-third-conditional',
      'b2-wish',
      'b2-past-modals',
      'b2-reported-speech',
      'b2-relative-clauses',
      'b2-gerund-infinitive',
    ],
  },
  {
    id: 'c1',
    badge: 'C1',
    name: 'Línea Violeta',
    level: 'Avanzado',
    blurb: 'Énfasis, elegancia y matices: las estructuras que distinguen a quien domina el idioma.',
    tone: 'violet',
    unitIds: ['c1-inversion', 'c1-cleft-sentences', 'c1-participle-clauses', 'c1-advanced-passive', 'c1-nuance'],
  },
  {
    id: 'es',
    badge: 'Ñ',
    name: 'Línea Ñ',
    level: 'Trampas para hispanohablantes',
    blurb: 'Los errores que el español nos empuja a cometer. Todas sus estaciones están abiertas desde el inicio.',
    tone: 'amber',
    unitIds: ['es-false-friends', 'es-prepositions', 'es-classic-errors'],
  },
]

const modules = import.meta.glob<{ default: Unit }>('./units/*.ts', { eager: true })
const byId = new Map<string, Unit>()
for (const mod of Object.values(modules)) byId.set(mod.default.id, mod.default)

// Only keep stations whose content exists.
for (const line of LINES) line.unitIds = line.unitIds.filter((id) => byId.has(id))

export const UNITS: Unit[] = LINES.flatMap((l) => l.unitIds.map((id) => byId.get(id)!))

export const getUnit = (id: string | undefined) => (id ? byId.get(id) : undefined)
export const getLine = (id: LineId) => LINES.find((l) => l.id === id)!

const exerciseIndex = new Map<string, { exercise: Exercise; unit: Unit }>()
for (const unit of UNITS) for (const exercise of unit.exercises) exerciseIndex.set(exercise.id, { exercise, unit })
export const getExercise = (id: string) => exerciseIndex.get(id)

/** The station after this one on the same line, if any. */
export function nextUnit(unit: Unit): Unit | undefined {
  const ids = getLine(unit.line).unitIds
  return getUnit(ids[ids.indexOf(unit.id) + 1])
}
