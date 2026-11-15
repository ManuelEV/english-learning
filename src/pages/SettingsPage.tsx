import { useState } from 'react'
import { Volume2 } from 'lucide-react'
import { useStore } from '../store'
import { canSpeak, speak } from '../lib/speech'

function Row({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-rule py-5 last:border-0">
      <div className="min-w-0 flex-1 basis-56">
        <p className="font-display text-lg font-bold">{title}</p>
        <p className="leading-snug text-ink/75">{text}</p>
      </div>
      {children}
    </div>
  )
}

function Segmented<T extends string>({ value, options, onChange }: { value: T; options: { v: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="flex rounded-full bg-sunk p-1">
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          onClick={() => onChange(o.v)}
          className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${value === o.v ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-8 w-14 shrink-0 cursor-pointer rounded-full transition-colors ${on ? 'bg-good' : 'bg-rule'}`}
    >
      <span className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-6' : ''}`} />
    </button>
  )
}

export function SettingsPage() {
  const settings = useStore((s) => s.settings)
  const set = useStore((s) => s.setSetting)
  const reset = useStore((s) => s.reset)
  const [confirm, setConfirm] = useState(false)

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <h1 className="text-4xl font-extrabold">Ajustes</h1>
      <section className="card px-6">
        <Row title="Tema" text="Claro como un mapa de papel u oscuro como el último tren.">
          <Segmented value={settings.theme} onChange={(v) => set('theme', v)} options={[{ v: 'light', label: 'Claro' }, { v: 'dark', label: 'Oscuro' }]} />
        </Row>
        <Row title="Acento del audio" text={canSpeak ? 'Usa las voces instaladas en tu dispositivo.' : 'Tu navegador no tiene síntesis de voz.'}>
          <div className="flex items-center gap-2">
            <Segmented value={settings.accent} onChange={(v) => set('accent', v)} options={[{ v: 'US', label: 'Americano' }, { v: 'GB', label: 'Británico' }]} />
            <button type="button" aria-label="Probar voz" onClick={() => speak('Mind the gap between the train and the platform.')} className="tile grid h-10 w-10 place-items-center rounded-full">
              <Volume2 size={18} />
            </button>
          </div>
        </Row>
        <Row title="Velocidad de la voz" text="Más lenta para entender, normal para entrenar el oído.">
          <Segmented
            value={String(settings.rate)}
            onChange={(v) => set('rate', Number(v))}
            options={[{ v: '0.8', label: 'Lenta' }, { v: '0.95', label: 'Normal' }, { v: '1.1', label: 'Rápida' }]}
          />
        </Row>
        <Row title="Efectos de sonido" text="Sonidos al acertar, fallar y llegar a una estación.">
          <Toggle on={settings.sound} onChange={(v) => set('sound', v)} label="Efectos de sonido" />
        </Row>
        <Row title="Modo libre" text="Abre todas las estaciones sin tener que completar las anteriores.">
          <Toggle on={settings.free} onChange={(v) => set('free', v)} label="Modo libre" />
        </Row>
        <Row title="Reiniciar progreso" text="Borra estaciones completadas, kilómetros, racha y el Taller. No se puede deshacer.">
          {confirm ? (
            <div className="flex gap-2">
              <button type="button" className="btn btn-bad" onClick={() => { reset(); setConfirm(false) }}>Sí, borrar todo</button>
              <button type="button" className="btn btn-ghost" onClick={() => setConfirm(false)}>Cancelar</button>
            </div>
          ) : (
            <button type="button" className="btn btn-ghost" onClick={() => setConfirm(true)}>Reiniciar…</button>
          )}
        </Row>
      </section>
    </div>
  )
}
