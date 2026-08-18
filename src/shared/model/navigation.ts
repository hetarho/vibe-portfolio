export type Page = 'studio' | 'shop' | 'quiz'

/** 포트폴리오 3종이 모여 있는 상위 경로 */
export const portfolioRootPath = '/vibe-portfolio'

export const pageInfo: Record<
  Page,
  {
    label: string
    number: string
    path: string
    /** 포트폴리오 목록 카드에 쓰는 한 줄 소개 */
    summary: string
    /** 목록 카드 썸네일 색 — 각 사이트의 배경색을 그대로 가져온다 */
    swatch: string
    stack: string[]
  }
> = {
  studio: {
    label: '브랜드 스튜디오',
    number: '01',
    path: `${portfolioRootPath}/studio`,
    summary: '스크롤을 따라 인상이 쌓이는 브랜드 에이전시 사이트',
    swatch: '#11120f',
    stack: ['모션', '타이포그래피', '다크 테마'],
  },
  shop: {
    label: '라이프 숍',
    number: '02',
    path: `${portfolioRootPath}/shop`,
    summary: '장바구니까지 이어지는 리빙 제품 커머스',
    swatch: '#f3eee4',
    stack: ['상품 목록', '장바구니', '상태 관리'],
  },
  quiz: {
    label: '취향 퀴즈',
    number: '03',
    path: `${portfolioRootPath}/quiz`,
    summary: '답을 고르면 결과가 달라지는 인터랙티브 진단',
    swatch: '#d9caff',
    stack: ['분기 로직', '결과 화면', '인터랙션'],
  },
}

export const pageOrder = ['studio', 'shop', 'quiz'] as const satisfies readonly Page[]

export function getPageFromPath(pathname: string): Page {
  if (pathname.startsWith(`${portfolioRootPath}/shop`)) return 'shop'
  if (pathname.startsWith(`${portfolioRootPath}/quiz`)) return 'quiz'
  return 'studio'
}
