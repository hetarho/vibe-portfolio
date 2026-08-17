import { createRootRoute, createRoute, createRouter, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { LessonDeckPage, LessonSelectPage } from '@/pages/lesson'
import { QuizPage } from '@/pages/quiz'
import { ShopPage } from '@/pages/shop'
import { StudioPage } from '@/pages/studio'
import { pageInfo, type Page } from '@/shared/model/navigation'
import { PortfolioLayout } from './PortfolioLayout'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
})

function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-5 text-center font-sans text-ink">
      <div className="flex flex-col items-center gap-6">
        <p className="text-5xl font-black tracking-tight">404</p>
        <p className="text-sm opacity-60">주소를 다시 확인해 주세요.</p>
        <button
          type="button"
          onClick={() => void navigate({ to: '/' })}
          className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white"
        >
          포트폴리오로 돌아가기
        </button>
      </div>
    </div>
  )
}

/* ── 외부 공개용 포트폴리오 ───────────────────────────────── */

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'portfolio',
  component: PortfolioLayout,
})

function StudioRoute() {
  const navigate = useNavigate()
  const onNavigate = (page: Page) => {
    void navigate({ to: pageInfo[page].path })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return <StudioPage onNavigate={onNavigate} />
}

const studioRoute = createRoute({
  getParentRoute: () => portfolioRoute,
  path: '/',
  component: StudioRoute,
})

const shopRoute = createRoute({
  getParentRoute: () => portfolioRoute,
  path: 'shop',
  component: ShopPage,
})

const quizRoute = createRoute({
  getParentRoute: () => portfolioRoute,
  path: 'quiz',
  component: QuizPage,
})

/* ── 강의: 어디에서도 링크하지 않는다. 주소를 직접 입력해야 들어온다 ── */

function LessonLayout() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  return <Outlet />
}

const lessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'lesson',
  component: LessonLayout,
})

function LessonSelectRoute() {
  const navigate = useNavigate()
  return (
    <LessonSelectPage
      onOpen={(lessonId) => void navigate({ to: '/lesson/$lessonId', params: { lessonId }, search: { s: 1 } })}
    />
  )
}

const lessonIndexRoute = createRoute({
  getParentRoute: () => lessonRoute,
  path: '/',
  component: LessonSelectRoute,
})

function LessonDeckRoute() {
  const { lessonId } = lessonDeckRoute.useParams()
  const { s } = lessonDeckRoute.useSearch()
  const navigate = useNavigate()

  return (
    <LessonDeckPage
      lessonId={lessonId}
      slideNumber={s}
      onSlideChange={(slideNumber) =>
        void navigate({ to: '/lesson/$lessonId', params: { lessonId }, search: { s: slideNumber }, replace: true })
      }
      onExit={() => void navigate({ to: '/lesson' })}
    />
  )
}

const lessonDeckRoute = createRoute({
  getParentRoute: () => lessonRoute,
  path: '$lessonId',
  component: LessonDeckRoute,
  /** ?s=6 처럼 현재 화면 번호를 주소에 남겨, 새로고침해도 진행 위치를 잃지 않는다 */
  validateSearch: (search: Record<string, unknown>): { s: number } => {
    const raw = Number(search.s)
    return { s: Number.isFinite(raw) && raw >= 1 ? Math.floor(raw) : 1 }
  },
})

const routeTree = rootRoute.addChildren([
  portfolioRoute.addChildren([studioRoute, shopRoute, quizRoute]),
  lessonRoute.addChildren([lessonIndexRoute, lessonDeckRoute]),
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
