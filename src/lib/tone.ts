import type { Tone } from '../content/types'

interface ToneClasses {
  text: string
  bg: string
  soft: string
  border: string
  btn: string
  color: string
  softColor: string
}

/** Static class names per tone so Tailwind can see them. */
export const TONE: Record<Tone, ToneClasses> = {
  coral: { text: 'text-coral', bg: 'bg-coral', soft: 'bg-coral-soft', border: 'border-coral', btn: 'btn-coral', color: 'var(--color-coral)', softColor: 'var(--color-coral-soft)' },
  teal: { text: 'text-teal', bg: 'bg-teal', soft: 'bg-teal-soft', border: 'border-teal', btn: 'btn-teal', color: 'var(--color-teal)', softColor: 'var(--color-teal-soft)' },
  violet: { text: 'text-violet', bg: 'bg-violet', soft: 'bg-violet-soft', border: 'border-violet', btn: 'btn-violet', color: 'var(--color-violet)', softColor: 'var(--color-violet-soft)' },
  amber: { text: 'text-amber', bg: 'bg-amber', soft: 'bg-amber-soft', border: 'border-amber', btn: 'btn-amber', color: 'var(--color-amber)', softColor: 'var(--color-amber-soft)' },
  ink: { text: 'text-ink', bg: 'bg-ink', soft: 'bg-sunk', border: 'border-ink', btn: '', color: 'var(--color-ink)', softColor: 'var(--color-sunk)' },
}
