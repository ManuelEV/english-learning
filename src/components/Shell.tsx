import { Link, NavLink, Outlet } from 'react-router'
import { Flame, Map, Moon, Route, ScrollText, Settings, Sun, Wrench } from 'lucide-react'
import { liveStreak, useStore } from '../store'
import { useDueCount } from '../lib/review'

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden>
        <rect width="64" height="64" rx="16" fill="var(--color-ink)" />
        <path d="M12 44 H28 a10 10 0 0 0 10 -10 V30 a10 10 0 0 1 10 -10 H52" fill="none" stroke="var(--color-coral)" strokeWidth="7" strokeLinecap="round" />
        <circle cx="12" cy="44" r="6" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" />
        <circle cx="52" cy="20" r="6" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" />
      </svg>
      <span className="font-display text-xl leading-none font-extrabold">
        NextStop<span className="block text-xs font-bold tracking-[0.2em] text-muted uppercase">English</span>
      </span>
    </Link>
  )
}

const navCls = ({ isActive }: { isActive: boolean }) =>
  `relative flex items-center gap-1.5 rounded-full px-2.5 py-2 text-sm font-bold transition-colors sm:gap-2 sm:px-3.5 ${
    isActive ? 'bg-ink text-paper' : 'text-muted hover:bg-sunk hover:text-ink'
  }`

export function Shell() {
  const km = useStore((s) => s.km)
  const streak = useStore((s) => liveStreak(s.streak))
  const theme = useStore((s) => s.settings.theme)
  const setSetting = useStore((s) => s.setSetting)
  const due = useDueCount()

  return (
    <div className="mx-auto min-h-dvh max-w-5xl px-4 pb-28 sm:pb-16">
      <header className="flex items-center justify-between gap-3 py-5">
        <Logo />
        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink to="/" end className={navCls}><Map size={16} /> Mapa</NavLink>
          <NavLink to="/resumen" className={navCls}><ScrollText size={16} /> Resúmenes</NavLink>
          <NavLink to="/taller" className={navCls}>
            <Wrench size={16} /> Taller
            {due > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-[0.7rem] text-white">{due}</span>}
          </NavLink>
          <NavLink to="/ajustes" className={navCls}><Settings size={16} /> Ajustes</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-amber-soft px-3 py-1.5 text-sm font-extrabold text-amber" title="Días seguidos practicando">
            <Flame size={16} className={streak ? 'fill-amber' : ''} /> {streak}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-teal-soft px-3 py-1.5 text-sm font-extrabold text-teal tabular-nums" title="Kilómetros recorridos (10 por acierto)">
            <Route size={16} /> {km} km
          </span>
          <button
            type="button"
            aria-label="Cambiar tema"
            onClick={() => setSetting('theme', theme === 'dark' ? 'light' : 'dark')}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-muted hover:bg-sunk hover:text-ink"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <Outlet />

      {/* Mobile tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t-2 border-rule bg-paper/95 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
        <NavLink to="/" end className={navCls}><Map size={18} /> Mapa</NavLink>
        <NavLink to="/resumen" className={navCls}><ScrollText size={18} /> Resumen</NavLink>
        <NavLink to="/taller" className={navCls}>
          <Wrench size={18} /> Taller
          {due > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-[0.7rem] text-white">{due}</span>}
        </NavLink>
        <NavLink to="/ajustes" className={navCls}><Settings size={18} /> Ajustes</NavLink>
      </nav>
    </div>
  )
}
