import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from '@/app/router'
import '@/app/styles/index.css'

// 예전 해시 주소(#/shop)로 들어온 방문자를 경로 기반 주소로 옮겨준다.
const legacyPage = window.location.hash.replace('#/', '')
if (legacyPage === 'shop' || legacyPage === 'quiz') {
  window.history.replaceState(null, '', `/${legacyPage}`)
} else if (legacyPage === 'studio') {
  window.history.replaceState(null, '', '/')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
