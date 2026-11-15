import { useEffect, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { canSpeak, speak, stopSpeaking } from '../lib/speech'

export function SpeakButton({ text, size = 'md', className = '' }: { text: string; size?: 'sm' | 'md'; className?: string }) {
  const [on, setOn] = useState(false)
  useEffect(() => () => stopSpeaking(), [])
  if (!canSpeak) return null
  const dim = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  return (
    <button
      type="button"
      aria-label="Escuchar"
      title="Escuchar"
      onClick={(e) => {
        e.stopPropagation()
        setOn(true)
        speak(text, { onEnd: () => setOn(false) })
      }}
      className={`relative grid ${dim} shrink-0 cursor-pointer place-items-center rounded-full bg-ink text-paper transition-transform hover:scale-110 active:scale-95 ${className}`}
    >
      {on && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ink" />}
      <Volume2 size={size === 'sm' ? 15 : 18} className="relative" />
    </button>
  )
}
