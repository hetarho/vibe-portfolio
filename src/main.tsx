import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from '@/app/router'
import { portfolioRootPath } from '@/shared/model/navigation'
import '@/app/styles/index.css'

// 예전 주소로 들어온 방문자를 지금 구조(/vibe-portfolio/…)로 옮겨준다.
const legacy: Record<string, string> = {
  '#/studio': `${portfolioRootPath}/studio`,
  '#/shop': `${portfolioRootPath}/shop`,
  '#/quiz': `${portfolioRootPath}/quiz`,
}
const hashTarget = legacy[window.location.hash]
if (hashTarget) {
  window.history.replaceState(null, '', hashTarget)
} else if (window.location.pathname === '/shop' || window.location.pathname === '/quiz') {
  window.history.replaceState(null, '', `${portfolioRootPath}${window.location.pathname}`)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
