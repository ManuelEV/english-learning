import { useStore } from '../store'
import { plain } from './text'

export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window

let voices: SpeechSynthesisVoice[] = []
function loadVoices() {
  voices = window.speechSynthesis.getVoices()
}
if (canSpeak) {
  loadVoices()
  window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices)
}

function pickVoice(accent: 'US' | 'GB'): SpeechSynthesisVoice | undefined {
  if (!voices.length) loadVoices()
  const lang = accent === 'US' ? 'en-US' : 'en-GB'
  const sameLang = voices.filter((v) => v.lang.replace('_', '-') === lang)
  const pool = sameLang.length ? sameLang : voices.filter((v) => v.lang.startsWith('en'))
  // Prefer the higher-quality network / "natural" voices when the browser has them.
  return (
    pool.find((v) => /natural|online/i.test(v.name)) ??
    pool.find((v) => /google/i.test(v.name)) ??
    pool[0]
  )
}

export function speak(text: string, opts: { slow?: boolean; onEnd?: () => void } = {}) {
  if (!canSpeak) {
    opts.onEnd?.()
    return
  }
  const { accent, rate } = useStore.getState().settings
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(plain(text).replace(/___/g, 'blank'))
  const voice = pickVoice(accent)
  if (voice) u.voice = voice
  u.lang = voice?.lang ?? (accent === 'US' ? 'en-US' : 'en-GB')
  u.rate = opts.slow ? Math.min(rate, 1) * 0.65 : rate
  u.onend = () => opts.onEnd?.()
  u.onerror = () => opts.onEnd?.()
  synth.speak(u)
}

export function stopSpeaking() {
  if (canSpeak) window.speechSynthesis.cancel()
}
