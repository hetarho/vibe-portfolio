import type { PortfolioPageId } from '@/shared/config/portfolio'

/** 목록 카드에서만 쓰는 표현 정보. 공통 설정(label/brand/number/path)과 분리해서 둔다 */
type ProjectCard = {
  /** 카드에 쓰는 한 줄 소개 */
  summary: string
  /** 카드 커버 사진 (각 사이트의 대표 이미지) */
  cover: string
  /** 사이트 안 페이지 수 */
  pages: number
  stack: string[]
}

export const projectCards: Record<PortfolioPageId, ProjectCard> = {
  studio: {
    summary: '검은 무대 위 대형 타이포그래피와 커서를 따라오는 미리보기. 작업 8건, 저널 4편이 있는 에이전시 사이트',
    cover: '/images/studio/halde-1.jpg',
    pages: 7,
    stack: ['중첩 라우팅', '스크롤 등장', '커서 인터랙션', '다크 테마'],
  },
  shop: {
    summary: '필터·정렬이 되는 컬렉션, 상품 상세, 장바구니 드로어, 3단계 결제까지 이어지는 리빙 오브제 커머스',
    cover: '/images/shop/hero-vase.jpg',
    pages: 7,
    stack: ['상품 16종', '장바구니 상태', '결제 플로우', '위시리스트'],
  },
  stay: {
    summary: '안개 위의 숙소. 객실 6종, 경험·다이닝 소개, 달력으로 날짜를 고르는 예약 플로우가 있는 부티크 스테이',
    cover: '/images/stay/hero-fog.jpg',
    pages: 7,
    stack: ['객실 상세', '달력 예약', '가격 계산', '세리프 타이포'],
  },
}
