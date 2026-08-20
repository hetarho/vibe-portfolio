import { createRootRoute, createRoute, createRouter, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { HomePage } from '@/pages/home'
import { LessonDeckPage, LessonSelectPage } from '@/pages/lesson'
import { PortfolioIndexPage } from '@/pages/portfolio-index'
import { QuizPage } from '@/pages/quiz'
import { ShopPage } from '@/pages/shop'
import { StudioPage } from '@/pages/studio'
import { pageInfo, portfolioRootPath } from '@/shared/config/portfolio'
import { PortfolioLayout } from './PortfolioLayout'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
})

function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="grid min-h-dvh place-items-center bg-surface-base px-5 text-center font-sans text-content-primary">
      <div className="flex flex-col items-center gap-6">
        <p className="text-5xl font-black tracking-tight text-content-strong">404</p>
        <p className="text-sm text-content-muted">주소를 다시 확인해 주세요.</p>
        <button
          type="button"
          onClick={() => void navigate({ to: '/' })}
          className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-contrast"
        >
          첫 화면으로
        </button>
      </div>
    </div>
  )
}

/* ── 첫 화면: 포트폴리오와 강의 중 하나를 고른다 ───────────── */

function HomeRoute() {
  const navigate = useNavigate()
  return (
    <HomePage
      onOpenPortfolio={() => void navigate({ to: portfolioRootPath })}
      onOpenLesson={() => void navigate({ to: '/lesson' })}
    />
  )
}

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomeRoute,
})

/* ── 바이브코딩 포트폴리오: 목록 + 사이트 3종 ──────────────── */

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'vibe-portfolio',
  component: () => <Outlet />,
})

function PortfolioIndexRoute() {
  const navigate = useNavigate()
  return (
    <PortfolioIndexPage
      onOpen={(page) => void navigate({ to: pageInfo[page].path })}
      onBack={() => void navigate({ to: '/' })}
    />
  )
}

const portfolioIndexRoute = createRoute({
  getParentRoute: () => portfolioRoute,
  path: '/',
  component: PortfolioIndexRoute,
})

/** 사이트 3종만 공통 헤더를 쓴다 (목록 화면은 헤더 없이 단독) */
const portfolioSiteRoute = createRoute({
  getParentRoute: () => portfolioRoute,
  id: 'portfolio-site',
  component: PortfolioLayout,
})

function StudioRoute() {
  const navigate = useNavigate()
  const openShop = () => {
    void navigate({ to: pageInfo.shop.path })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return <StudioPage onNext={openShop} />
}

const studioRoute = createRoute({
  getParentRoute: () => portfolioSiteRoute,
  path: 'studio',
  component: StudioRoute,
})

const shopRoute = createRoute({
  getParentRoute: () => portfolioSiteRoute,
  path: 'shop',
  component: ShopPage,
})

const quizRoute = createRoute({
  getParentRoute: () => portfolioSiteRoute,
  path: 'quiz',
  component: QuizPage,
})

/* ── 강의 ─────────────────────────────────────────────────── */

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
      onBack={() => void navigate({ to: '/' })}
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
  homeRoute,
  portfolioRoute.addChildren([
    portfolioIndexRoute,
    portfolioSiteRoute.addChildren([studioRoute, shopRoute, quizRoute]),
  ]),
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
