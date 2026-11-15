import { Fragment } from 'react'
import type { Tone } from '../content/types'
import { TONE } from '../lib/tone'

/** Renders text with **highlight** markers. */
export function Rich({ text, tone = 'violet', bold = false }: { text: string; tone?: Tone; bold?: boolean }) {
  const parts = text.split('**')
  const t = TONE[tone]
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          bold ? (
            <strong key={i} className="font-bold text-ink">
              {part}
            </strong>
          ) : (
            <mark key={i} className={`-mx-0.5 rounded-md box-decoration-clone px-0.5 py-0.5 font-bold ${t.soft} ${t.text}`}>
              {part}
            </mark>
          )
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
