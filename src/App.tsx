import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { MotionConfig } from 'motion/react'
import { Shell } from './components/Shell'
import { Home } from './pages/Home'
import { UnitPage } from './pages/UnitPage'
import { Lesson } from './pages/Lesson'
import { Practice } from './pages/Practice'
import { Workshop } from './pages/Workshop'
import { SettingsPage } from './pages/SettingsPage'
import { useStore } from './store'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export function App() {
  const theme = useStore((s) => s.settings.theme)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#131226' : '#FBF6EC')
  }, [theme])

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<Home />} />
            <Route path="u/:id" element={<UnitPage />} />
            <Route path="taller" element={<Workshop />} />
            <Route path="ajustes" element={<SettingsPage />} />
          </Route>
          <Route path="u/:id/leccion" element={<Lesson />} />
          <Route path="u/:id/practica" element={<Practice />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}
