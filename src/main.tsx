import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from '@/app/router'
import { pageInfo, pageOrder, type PortfolioPageId } from '@/shared/config/portfolio'
import '@/app/styles/index.css'

/** 예전에 짧은 경로(/shop)로도 열렸던 작품 — /studio는 그 형태로 발행한 적이 없다 */
const legacyShortPaths = ['shop', 'quiz'] as const satisfies readonly PortfolioPageId[]

// 예전 주소로 들어온 방문자를 지금 구조(/vibe-portfolio/…)로 옮겨준다.
const legacyPage =
  pageOrder.find((page) => window.location.hash === `#/${page}`) ??
  legacyShortPaths.find((page) => window.location.pathname === `/${page}`)
if (legacyPage) {
  window.history.replaceState(null, '', pageInfo[legacyPage].path)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
