import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { Shuffle, Wrench } from 'lucide-react'
import { getExercise } from '../content'
import { Session, type SessionItem, type SessionResult } from '../components/Session'
import { Results } from '../components/Results'
import { INTERVALS, useStore } from '../store'
import { dueIds, expressItems, toItems } from '../lib/review'

const BOX_LABEL = ['Recién averiado', 'Repaso en 1 día', 'Repaso en 3 días', 'Repaso en 7 días']

export function Workshop() {
  const review = useStore((s) => s.review)
  const units = useStore((s) => s.units)
  const touchStreak = useStore((s) => s.touchStreak)
  const [session, setSession] = useState<{ items: SessionItem[]; kind: 'repair' | 'express' } | null>(null)
  const [result, setResult] = useState<SessionResult | null>(null)

  if (result) {
    return (
      <Results result={result} title={session?.kind === 'repair' ? '¡Reparación lista!' : undefined}>
        <button
          type="button"
          className="btn btn-violet"
          onClick={() => {
            setResult(null)
            setSession(null)
          }}
        >
          Volver al Taller
        </button>
        <Link to="/" className="btn btn-ghost">Ir al mapa</Link>
      </Results>
    )
  }

  if (session) {
    return (
      <Session
        items={session.items}
        exitTo="/"
        showUnit
        onFinish={(r) => {
          touchStreak()
          setResult(r)
        }}
      />
    )
  }

  const due = dueIds(review)
  const cards = Object.entries(review).filter(([id]) => getExercise(id))
  const waiting = cards.length - due.length
  const boxes = INTERVALS.map((_, b) => cards.filter(([, c]) => c.box === b).length)
  const express = expressItems(units)
  const maxBox = Math.max(1, ...boxes)

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] bg-violet-soft p-6 sm:p-9">
        <span className="eyebrow text-violet">Repaso espaciado</span>
        <h1 className="mt-1 text-4xl font-extrabold sm:text-5xl">El Taller 🔧</h1>
        <p className="mt-3 max-w-xl text-lg leading-snug text-ink/80">
          Aquí llegan los ejercicios que fallaste. Cada vez que reparas uno, vuelve más tarde (1, 3, 7 y 16 días) hasta que lo dominas. Recordar justo antes de olvidar es lo que más fija el idioma.
        </p>
      </motion.section>

      <div className="grid gap-4 sm:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card flex flex-col gap-3 p-6">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-coral-soft text-coral"><Wrench size={24} /></span>
          <h2 className="text-2xl font-extrabold">Reparar errores</h2>
          <p className="flex-1 leading-snug text-ink/80">
            {due.length > 0 ? (
              <>Tienes <strong>{due.length}</strong> {due.length === 1 ? 'ejercicio listo' : 'ejercicios listos'} para reparar ahora.</>
            ) : waiting > 0 ? (
              <>Nada pendiente por ahora. {waiting} {waiting === 1 ? 'ejercicio volverá' : 'ejercicios volverán'} cuando toque repasarlos.</>
            ) : (
              'El taller está vacío. Cuando falles un ejercicio en una estación, aparecerá aquí.'
            )}
          </p>
          <button
            type="button"
            className="btn btn-coral"
            disabled={due.length === 0}
            onClick={() => setSession({ items: toItems(due.slice(0, 10)), kind: 'repair' })}
          >
            Reparar {due.length > 10 ? '10' : due.length || ''} ahora
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card flex flex-col gap-3 p-6">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-soft text-teal"><Shuffle size={24} /></span>
          <h2 className="text-2xl font-extrabold">Viaje exprés</h2>
          <p className="flex-1 leading-snug text-ink/80">
            8 ejercicios mezclados de las estaciones que ya visitaste. Mezclar temas te obliga a decidir <em>qué</em> estructura usar, igual que en una conversación real.
          </p>
          <button
            type="button"
            className="btn btn-teal"
            disabled={express.length === 0}
            onClick={() => setSession({ items: expressItems(units), kind: 'express' })}
          >
            {express.length === 0 ? 'Visita una estación primero' : 'Salir en viaje exprés'}
          </button>
        </motion.div>
      </div>

      {cards.length > 0 && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="card p-6">
          <p className="eyebrow">Estado de tus reparaciones</p>
          <div className="mt-4 flex flex-col gap-3">
            {boxes.map((count, b) => (
              <div key={b} className="flex items-center gap-3">
                <span className="w-36 shrink-0 text-sm leading-tight font-bold text-muted">{BOX_LABEL[b]}</span>
                <div className="h-5 flex-1 overflow-hidden rounded-full bg-sunk">
                  <motion.div
                    className="h-full rounded-full bg-violet"
                    style={{ opacity: 0.45 + b * 0.18 }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / maxBox) * 100}%` }}
                    transition={{ duration: 0.7, delay: 0.4 + b * 0.1 }}
                  />
                </div>
                <span className="w-6 text-right font-display font-extrabold tabular-nums">{count}</span>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  )
}
