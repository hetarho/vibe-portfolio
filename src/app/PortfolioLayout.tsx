import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { getPageFromPath, pageInfo, portfolioRootPath, type Page } from '@/shared/model/navigation'
import { PortfolioHeader } from '@/widgets/portfolio-header'

/** 포트폴리오 사이트 3종의 공통 레이아웃 (헤더 + 페이지) */
export function PortfolioLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const navigate = useNavigate()
  const page = getPageFromPath(pathname)

  const changePage = (nextPage: Page) => {
    void navigate({ to: pageInfo[nextPage].path })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`app app-${page}`}>
      <PortfolioHeader page={page} onChange={changePage} onHome={() => void navigate({ to: portfolioRootPath })} />
      <Outlet />
    </div>
  )
}
