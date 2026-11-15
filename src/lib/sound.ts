import { useStore } from '../store'

let ctx: AudioContext | null = null

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', gain = 0.12) {
  if (!ctx) return
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  const t = ctx.currentTime + start
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(gain, t + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(g).connect(ctx.destination)
  osc.start(t)
  osc.stop(t + dur + 0.02)
}

function ready(): boolean {
  if (!useStore.getState().settings.sound) return false
  try {
    ctx ??= new AudioContext()
    if (ctx.state === 'suspended') void ctx.resume()
    return true
  } catch {
    return false
  }
}

export const sfx = {
  good() {
    if (!ready()) return
    tone(660, 0, 0.12)
    tone(990, 0.09, 0.22)
  },
  bad() {
    if (!ready()) return
    tone(220, 0, 0.16, 'triangle', 0.16)
    tone(175, 0.12, 0.26, 'triangle', 0.16)
  },
  tap() {
    if (!ready()) return
    tone(520, 0, 0.05, 'sine', 0.05)
  },
  /** Two-note station chime. */
  arrive() {
    if (!ready()) return
    tone(523, 0, 0.25)
    tone(659, 0.18, 0.25)
    tone(784, 0.36, 0.5)
  },
}
