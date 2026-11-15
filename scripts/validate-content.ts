/**
 * Sanity-checks every unit. Run with: npm run validate
 */
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { Unit } from '../src/content/types'

const dir = join(import.meta.dirname, '../src/content/units')
const problems: string[] = []
const ids = new Set<string>()
let exercises = 0

const count = (s: string, sub: string) => s.split(sub).length - 1

for (const file of readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
  const unit: Unit = (await import(pathToFileURL(join(dir, file)).href)).default
  const bad = (where: string, msg: string) => problems.push(`${unit.id} ${where}: ${msg}`)

  if (`${unit.id}.ts` !== file) bad('unit', `id does not match file name ${file}`)
  if (!unit.id.startsWith(unit.line + '-')) bad('unit', 'id is not prefixed with its line')
  if (unit.steps.length < 6) bad('unit', `only ${unit.steps.length} steps`)
  if (unit.exercises.length !== 12) bad('unit', `${unit.exercises.length} exercises`)

  unit.steps.forEach((step, i) => {
    const w = `step ${i + 1} (${step.kind})`
    const strings = JSON.stringify(step)
    if (count(strings, '**') % 2) bad(w, 'unbalanced ** markers')
    if (step.kind === 'timeline') {
      for (const it of step.items) {
        if (it.type !== 'point' && it.to === undefined) bad(w, `"${it.label}" needs "to"`)
        if (it.label.length > 30) bad(w, `label too long: "${it.label}"`)
        if (Math.abs(it.at) > 100 || Math.abs(it.to ?? 0) > 100) bad(w, 'position out of range')
      }
    }
    if (step.kind === 'check') {
      if (step.answer < 0 || step.answer >= step.options.length) bad(w, 'answer index out of range')
      if (step.sentence && count(step.sentence, '___') !== 1) bad(w, 'sentence needs exactly one ___')
    }
  })

  unit.exercises.forEach((ex, i) => {
    exercises++
    const w = ex.id
    if (ex.id !== `${unit.id}-${i + 1}`) bad(w, `expected id ${unit.id}-${i + 1}`)
    if (ids.has(ex.id)) bad(w, 'duplicate id')
    ids.add(ex.id)
    if (!ex.explain?.trim()) bad(w, 'missing explain')
    switch (ex.type) {
      case 'choice':
        if (ex.answer < 0 || ex.answer >= ex.options.length) bad(w, 'answer index out of range')
        if (ex.sentence && count(ex.sentence, '___') !== 1) bad(w, 'sentence needs exactly one ___')
        if (new Set(ex.options).size !== ex.options.length) bad(w, 'duplicate options')
        break
      case 'gap':
        if (count(ex.sentence, '___') !== 1) bad(w, 'sentence needs exactly one ___')
        if (!ex.answers.length) bad(w, 'no answers')
        break
      case 'order':
        if (ex.words.length < 4 || ex.words.length > 10) bad(w, `${ex.words.length} chunks`)
        for (const d of ex.distractors ?? []) if (ex.words.includes(d)) bad(w, `distractor "${d}" is also a correct chunk`)
        break
      case 'error':
        if (count(ex.sentence, '[') !== 1 || count(ex.sentence, ']') !== 1) bad(w, 'needs exactly one [bracket]')
        break
      case 'match':
        if (ex.pairs.length < 3 || ex.pairs.length > 6) bad(w, `${ex.pairs.length} pairs`)
        if (new Set(ex.pairs.map((p) => p[1])).size !== ex.pairs.length) bad(w, 'duplicate right side')
        break
      case 'sort':
        if (ex.items.length < 5) bad(w, `${ex.items.length} items`)
        if (!ex.items.some((x) => x.cat === 0) || !ex.items.some((x) => x.cat === 1)) bad(w, 'a category is empty')
        break
      case 'listen':
        if (ex.text.split(' ').length > 14) bad(w, 'dictation too long')
        break
      case 'rewrite':
        if (!ex.answers.length) bad(w, 'no answers')
        if (ex.start) for (const a of ex.answers) if (!a.toLowerCase().startsWith(ex.start.toLowerCase())) bad(w, `answer does not begin with start: "${a}"`)
        break
    }
  })
}

console.log(`${ids.size ? readdirSync(dir).length : 0} units, ${exercises} exercises checked`)
if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log('Content OK')
