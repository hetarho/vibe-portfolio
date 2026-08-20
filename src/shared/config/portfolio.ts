/**
 * 포트폴리오 사이트 3종의 공통 설정.
 * 여러 라우트(app 라우터, 공통 헤더, 목록 화면, 레거시 주소 변환)가 함께 쓰는
 * 식별자와 경로만 둔다. 특정 화면에서만 쓰는 문구·색은 그 화면 슬라이스가 소유한다.
 */
export type PortfolioPageId = 'studio' | 'shop' | 'quiz'

/** 포트폴리오 3종이 모여 있는 상위 경로 */
export const portfolioRootPath = '/vibe-portfolio'

export const pageInfo: Record<PortfolioPageId, { label: string; number: string; path: string }> = {
  studio: {
    label: '브랜드 스튜디오',
    number: '01',
    path: `${portfolioRootPath}/studio`,
  },
  shop: {
    label: '라이프 숍',
    number: '02',
    path: `${portfolioRootPath}/shop`,
  },
  quiz: {
    label: '취향 퀴즈',
    number: '03',
    path: `${portfolioRootPath}/quiz`,
  },
}

export const pageOrder = ['studio', 'shop', 'quiz'] as const satisfies readonly PortfolioPageId[]

export function getPageFromPath(pathname: string): PortfolioPageId {
  if (pathname.startsWith(pageInfo.shop.path)) return 'shop'
  if (pathname.startsWith(pageInfo.quiz.path)) return 'quiz'
  return 'studio'
}
