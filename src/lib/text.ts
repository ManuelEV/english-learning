/** Normalise an answer so that case, punctuation and common contractions don't matter. */
export function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/\bcan't\b/g, 'cannot')
    .replace(/\bcan not\b/g, 'cannot')
    .replace(/\bwon't\b/g, 'will not')
    .replace(/\bshan't\b/g, 'shall not')
    .replace(/n't\b/g, ' not')
    .replace(/'m\b/g, ' am')
    .replace(/'re\b/g, ' are')
    .replace(/'ve\b/g, ' have')
    .replace(/'ll\b/g, ' will')
    .replace(/[^a-z0-9' ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function matches(input: string, answers: string[]): boolean {
  const n = norm(input)
  return n.length > 0 && answers.some((a) => norm(a) === n)
}

/** Levenshtein distance, used to forgive a single typo in dictations. */
export function distance(a: string, b: string): number {
  if (a === b) return 0
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let last = prev[0]
    prev[0] = i
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j]
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, last + (a[i - 1] === b[j - 1] ? 0 : 1))
      last = tmp
    }
  }
  return prev[b.length]
}

/** Remove the **highlight** markers. */
export function plain(s: string): string {
  return s.replace(/\*\*/g, '')
}

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Shuffle, but never return the original order (when avoidable). */
export function scramble<T>(arr: readonly T[]): T[] {
  if (arr.length < 2) return [...arr]
  for (let n = 0; n < 8; n++) {
    const s = shuffle(arr)
    if (s.some((x, i) => x !== arr[i])) return s
  }
  return [...arr].reverse()
}
