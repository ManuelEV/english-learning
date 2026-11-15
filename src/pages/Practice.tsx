import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { getLine, getUnit, nextUnit } from '../content'
import { Session, type SessionResult } from '../components/Session'
import { Results } from '../components/Results'
import { useStore } from '../store'
import { TONE } from '../lib/tone'

export function Practice() {
  const { id } = useParams()
  const unit = getUnit(id)
  const finishPractice = useStore((s) => s.finishPractice)
  const [run, setRun] = useState(0)
  const [outcome, setOutcome] = useState<{ result: SessionResult; stars: number } | null>(null)
  const items = useMemo(() => (unit ? unit.exercises.map((exercise) => ({ exercise, unitId: unit.id })) : []), [unit])

  if (!unit) return <Navigate to="/" replace />
  const tone = TONE[getLine(unit.line).tone]
  const next = nextUnit(unit)

  if (outcome) {
    const passed = outcome.stars > 0
    return (
      <Results result={outcome.result} stars={outcome.stars}>
        {passed && next ? (
          <Link to={`/u/${next.id}`} className={`btn ${tone.btn}`}>
            Próxima estación: {next.title} <ArrowRight size={18} />
          </Link>
        ) : (
          !passed && (
            <Link to={`/u/${unit.id}/leccion`} className={`btn ${tone.btn}`}>
              Repasar la lección
            </Link>
          )
        )}
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            setOutcome(null)
            setRun((r) => r + 1)
          }}
        >
          <RotateCcw size={18} /> Repetir
        </button>
        <Link to="/" className="btn btn-ghost">Volver al mapa</Link>
      </Results>
    )
  }

  return (
    <Session
      key={run}
      items={items}
      exitTo={`/u/${unit.id}`}
      onFinish={(result) => setOutcome({ result, stars: finishPractice(unit.id, result.correct, result.total) })}
    />
  )
}
