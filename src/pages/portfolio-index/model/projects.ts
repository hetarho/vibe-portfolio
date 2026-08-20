import type { PortfolioPageId } from '@/shared/config/portfolio'

/** 목록 카드에서만 쓰는 표현 정보 — 공통 설정(label/number/path)과 분리해서 둔다 */
type ProjectCard = {
  /** 카드에 쓰는 한 줄 소개 */
  summary: string
  /** 카드 썸네일 색 — 각 사이트의 배경색을 그대로 가져온다 */
  swatch: string
  stack: string[]
}

export const projectCards: Record<PortfolioPageId, ProjectCard> = {
  studio: {
    summary: '스크롤을 따라 인상이 쌓이는 브랜드 에이전시 사이트',
    swatch: '#11120f',
    stack: ['모션', '타이포그래피', '다크 테마'],
  },
  shop: {
    summary: '장바구니까지 이어지는 리빙 제품 커머스',
    swatch: '#f3eee4',
    stack: ['상품 목록', '장바구니', '상태 관리'],
  },
  quiz: {
    summary: '답을 고르면 결과가 달라지는 인터랙티브 진단',
    swatch: '#d9caff',
    stack: ['분기 로직', '결과 화면', '인터랙션'],
  },
}
