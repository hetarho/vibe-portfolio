import { Outlet, useRouterState } from '@tanstack/react-router'
import { getPageFromPath } from '@/shared/config/portfolio'
import { PortfolioDock } from '@/widgets/portfolio-dock'

/** 포트폴리오 사이트 3종의 공통 레이아웃. 사이트 본문 위에 작품 스위처만 얹는다 */
export function PortfolioLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const page = getPageFromPath(pathname)

  return (
    <>
      <Outlet />
      <PortfolioDock page={page} />
    </>
  )
}
