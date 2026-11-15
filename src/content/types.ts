/**
 * Content model for NextStop English.
 *
 * Text conventions (used everywhere a string is shown to the learner):
 *  - `**text**` marks a highlight (the grammar point inside an example).
 *  - `___` (three underscores) marks the gap in `choice` / `gap` sentences.
 *  - Explanations, prompts and notes are written in Spanish (neutral Latin
 *    American). Example sentences are in English.
 */

/** 'es' is the special line about typical mistakes of Spanish speakers. */
export type LineId = 'b1' | 'b2' | 'c1' | 'es'

/* ───────────────────────── Lesson steps ───────────────────────── */

export interface Example {
  /** English sentence. Use **…** to highlight the target structure. */
  en: string
  /** Natural Spanish translation. */
  es: string
  /** Optional short note in Spanish (why this form is used). */
  note?: string
}

export type Tone = 'coral' | 'teal' | 'violet' | 'amber' | 'ink'

export interface TimelineItem {
  /** point = single finished moment · span = period · dots = repeated actions */
  type: 'point' | 'span' | 'dots'
  /** Position on the axis: -100 (far past) … 0 (now) … 100 (far future). */
  at: number
  /** End position for `span` / `dots`. */
  to?: number
  /** Short label drawn next to the item (English or Spanish, max ~28 chars). */
  label: string
  tone: Tone
}

export interface FormulaPart {
  /** What the learner reads on the block, e.g. "have / has". */
  text: string
  /** Small caption under the block, e.g. "auxiliar". */
  caption?: string
  tone: Tone
}

export type Step =
  /** Opening situation that makes the learner feel the need for the grammar. */
  | { kind: 'hook'; emoji: string; title: string; text: string; example?: Example }
  /** Animated time axis. Items appear one by one, in array order. */
  | { kind: 'timeline'; title: string; text: string; items: TimelineItem[]; example?: Example }
  /** Building blocks that snap together, plus examples built with them. */
  | {
      kind: 'formula'
      title: string
      text?: string
      /** One or more rows of blocks (e.g. affirmative / negative / question). */
      rows: { label: string; parts: FormulaPart[] }[]
      examples: Example[]
    }
  /** A set of example sentences with audio and reveal-able translation. */
  | { kind: 'examples'; title: string; text?: string; items: Example[] }
  /** Side-by-side contrast of two forms. */
  | {
      kind: 'compare'
      title: string
      text?: string
      left: { label: string; tone: Tone; points: string[]; example: Example }
      right: { label: string; tone: Tone; points: string[]; example: Example }
    }
  /** Typical mistake of Spanish speakers: wrong → right. */
  | { kind: 'trap'; title: string; wrong: string; right: string; why: string }
  /** Short list of takeaways or signal words. */
  | { kind: 'tips'; title: string; text?: string; items: { emoji: string; title: string; text: string }[] }
  /** Mini question inside the lesson (not scored). */
  | { kind: 'check'; question: string; sentence?: string; options: string[]; answer: number; explain: string }

/* ───────────────────────── Exercises ───────────────────────── */

interface ExerciseBase {
  /** Globally unique: `<unitId>-<n>`, e.g. "b1-present-perfect-3". */
  id: string
  /** Spanish feedback shown after answering: WHY the right answer is right. */
  explain: string
}

/** Pick the option that fills the gap / answers the question. */
export interface ChoiceExercise extends ExerciseBase {
  type: 'choice'
  /** Instruction in Spanish. */
  prompt: string
  /** Optional English sentence containing `___`. */
  sentence?: string
  /** 3–4 options. */
  options: string[]
  /** Index of the correct option. */
  answer: number
}

/** Type the missing word(s). */
export interface GapExercise extends ExerciseBase {
  type: 'gap'
  prompt?: string
  /** English sentence containing exactly one `___`. */
  sentence: string
  /** Cue shown next to the gap, e.g. "(live)". */
  hint?: string
  /** Every accepted answer (case/contraction-insensitive compare). */
  answers: string[]
}

/** Tap the words in the right order. */
export interface OrderExercise extends ExerciseBase {
  type: 'order'
  /** Spanish sentence to translate, shown as the cue. */
  es: string
  /** Correct English sentence split into chunks, in order (5–9 chunks). */
  words: string[]
  /** 0–3 extra wrong chunks to mix in. */
  distractors?: string[]
}

/** Tap the wrong word in a sentence. */
export interface ErrorExercise extends ExerciseBase {
  type: 'error'
  /** Sentence with the wrong part wrapped in [brackets] (exactly one). */
  sentence: string
  /** The corrected text that replaces the bracketed part ("" = delete it). */
  fix: string
}

/** Connect each item on the left with its partner on the right. */
export interface MatchExercise extends ExerciseBase {
  type: 'match'
  prompt: string
  /** 4–5 pairs. */
  pairs: [string, string][]
}

/** Drop every item into one of two buckets. */
export interface SortExercise extends ExerciseBase {
  type: 'sort'
  prompt: string
  categories: [string, string]
  /** 6–8 items; `cat` is the index of the right category. */
  items: { text: string; cat: 0 | 1 }[]
}

/** Listen (text-to-speech) and type the sentence. */
export interface ListenExercise extends ExerciseBase {
  type: 'listen'
  /** The English sentence that is spoken (6–12 words, no rare proper nouns). */
  text: string
  /** Spanish translation shown after answering. */
  es: string
}

/** Rewrite a sentence using a different structure. */
export interface RewriteExercise extends ExerciseBase {
  type: 'rewrite'
  /** Instruction in Spanish. */
  prompt: string
  /** The original English sentence. */
  source: string
  /** Fixed beginning of the answer that the learner continues, e.g. "If I". */
  start?: string
  /**
   * Every accepted FULL sentence (including `start`). List realistic variants.
   * Comparison ignores case, punctuation and n't/'m/'re/'ve/'ll contractions,
   * but NOT 's / 'd — list both forms when those matter.
   */
  answers: string[]
}

export type Exercise =
  | ChoiceExercise
  | GapExercise
  | OrderExercise
  | ErrorExercise
  | MatchExercise
  | SortExercise
  | ListenExercise
  | RewriteExercise

/* ───────────────────────── Units ───────────────────────── */

export interface Unit {
  /** kebab-case, prefixed with the line: "b1-present-perfect". */
  id: string
  line: LineId
  /** Station name, short (max ~26 chars), in English. */
  title: string
  /** One-line Spanish description of what you'll be able to do. */
  subtitle: string
  emoji: string
  /** Estimated minutes for lesson + practice. */
  minutes: number
  /** 6–9 lesson steps. */
  steps: Step[]
  /** 12 exercises, ordered from easiest to hardest. */
  exercises: Exercise[]
}
