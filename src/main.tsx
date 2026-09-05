import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 전역 스타일을 라우터보다 먼저 불러온다. 슬라이스별 styles.css가 번들에서
// 전역 CSS 뒤에 오도록 고정해, cascade 순서가 import 그래프에 따라 흔들리지 않게 한다.
import '@/app/styles/index.css'
import { router } from '@/app/router'
import { pageInfo, pageOrder, portfolioRootPath } from '@/shared/config/portfolio'

// 예전 주소로 들어온 방문자를 지금 구조(/vibe-portfolio/…)로 옮겨준다.
// 예전 3번째 작품(퀴즈)은 내려갔으므로 목록으로 보낸다.
const { hash, pathname } = window.location
const legacyPage = pageOrder.find((page) => hash === `#/${page}` || pathname === `/${page}`)
if (legacyPage) {
  window.history.replaceState(null, '', pageInfo[legacyPage].path)
} else if (hash === '#/quiz' || pathname === '/quiz' || pathname.startsWith(`${portfolioRootPath}/quiz`)) {
  window.history.replaceState(null, '', portfolioRootPath)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
