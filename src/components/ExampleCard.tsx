import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Languages } from 'lucide-react'
import type { Example, Tone } from '../content/types'
import { Rich } from './Rich'
import { SpeakButton } from './SpeakButton'

/** English example with audio and a tap-to-reveal Spanish translation. */
export function ExampleCard({ example, tone = 'violet' }: { example: Example; tone?: Tone }) {
  const [show, setShow] = useState(false)
  return (
    <div className="card flex items-start gap-3 p-4">
      <SpeakButton text={example.en} />
      <div className="min-w-0 flex-1">
        <p className="text-lg leading-snug font-semibold">
          <Rich text={example.en} tone={tone} />
        </p>
        <AnimatePresence initial={false} mode="wait">
          {show ? (
            <motion.div
              key="es"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="overflow-hidden"
            >
              <p className="mt-1 text-muted">{example.es}</p>
              {example.note && <p className="mt-1 text-sm font-semibold text-ink/80">💡 {example.note}</p>}
            </motion.div>
          ) : (
            <motion.button
              key="btn"
              type="button"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              onClick={() => setShow(true)}
              className="mt-1 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-muted underline decoration-dotted underline-offset-4 hover:text-ink"
            >
              <Languages size={14} /> Ver traducción
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
