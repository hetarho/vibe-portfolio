/**
 * 포트폴리오 사이트 3종의 공통 설정.
 * 여러 라우트(app 라우터, 플로팅 스위처, 목록 화면, 레거시 주소 변환)가 함께 쓰는
 * 식별자와 경로만 둔다. 특정 화면에서만 쓰는 문구·색은 그 화면 슬라이스가 소유한다.
 */
export type PortfolioPageId = 'studio' | 'shop' | 'stay'

/** 포트폴리오 3종이 모여 있는 상위 경로 */
export const portfolioRootPath = '/vibe-portfolio'

type PageInfo = { label: string; brand: string; number: string; path: string; tone: 'dark' | 'light' }

/* as const: 경로가 리터럴 타입으로 남아야 TanStack Router의 `to` 검사를 통과한다 */
export const pageInfo = {
  studio: {
    label: '브랜드 스튜디오',
    brand: 'MORROW',
    number: '01',
    path: `${portfolioRootPath}/studio`,
    tone: 'dark',
  },
  shop: {
    label: '오브제 숍',
    brand: 'OHAU',
    number: '02',
    path: `${portfolioRootPath}/shop`,
    tone: 'light',
  },
  stay: {
    label: '스테이',
    brand: 'HAVN',
    number: '03',
    path: `${portfolioRootPath}/stay`,
    tone: 'light',
  },
} as const satisfies Record<PortfolioPageId, PageInfo>

export const pageOrder = ['studio', 'shop', 'stay'] as const satisfies readonly PortfolioPageId[]

export function getPageFromPath(pathname: string): PortfolioPageId {
  if (pathname.startsWith(pageInfo.shop.path)) return 'shop'
  if (pathname.startsWith(pageInfo.stay.path)) return 'stay'
  return 'studio'
}
