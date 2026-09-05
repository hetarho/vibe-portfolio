export type Discipline = 'Identity' | 'Digital' | 'Campaign' | 'Spatial' | 'Packaging'

export type Project = {
  slug: string
  title: string
  client: string
  year: number
  disciplines: Discipline[]
  /** 목록·카드에 쓰는 한 줄 */
  tagline: string
  /** 상세의 첫 문단 */
  intro: string
  /** 상세 본문 (문단 배열) */
  body: string[]
  services: string[]
  /** 성과 숫자 3개 */
  outcomes: { value: string; label: string }[]
  quote?: { text: string; by: string }
  cover: string
  /** 상세 갤러리. 첫 장이 히어로 */
  gallery: string[]
  /** 카드 배경에 비치는 색 (사진이 뜨기 전) */
  tint: string
  featured?: boolean
}

const img = (name: string) => `/images/studio/${name}.jpg`

export const projects: Project[] = [
  {
    slug: 'halde',
    title: 'Halde',
    client: 'Halde Architects',
    year: 2026,
    disciplines: ['Identity', 'Digital'],
    tagline: '콘크리트의 무게를 그대로 옮긴 건축 사무소 아이덴티티',
    intro:
      '할데는 브루탈리즘을 현대적으로 해석하는 건축 사무소입니다. 우리는 그들의 건물이 가진 반복과 대칭, 그리고 그림자의 깊이를 하나의 시각 체계로 옮겼습니다.',
    body: [
      '워드마크는 콘크리트 거푸집의 모듈에서 출발했습니다. 글자 사이 간격은 실제 건물의 기둥 간격 비율을 따르고, 모든 인쇄물은 같은 그리드 위에서 조판됩니다.',
      '웹사이트는 사진이 말하게 두었습니다. 텍스트는 최소한으로, 프로젝트는 스크롤에 따라 층층이 쌓이며 건물을 걸어 오르는 감각을 재현합니다.',
      '흑백 사진을 기본으로 하되, 실제 방문 시간대의 햇빛만 색으로 남겼습니다. 차가운 재료에 온도를 더하는 방식이었습니다.',
    ],
    services: ['브랜드 전략', '워드마크·타이포그래피', '웹사이트', '사이니지'],
    outcomes: [
      { value: '3×', label: '문의 증가 (런칭 후 6개월)' },
      { value: '02', label: '국제 디자인 어워드' },
      { value: '48p', label: '브랜드 가이드라인' },
    ],
    quote: {
      text: '우리가 짓는 방식과 이들이 그리는 방식이 같았습니다. 덜어내서 무겁게 만드는 일.',
      by: '박서준, Halde Architects 대표',
    },
    cover: img('halde-1'),
    gallery: [img('halde-1'), img('halde-2'), img('halde-3'), img('halde-4')],
    tint: '#2a2a2a',
    featured: true,
  },
  {
    slug: 'aura',
    title: 'Aura OS',
    client: 'Aura Labs',
    year: 2026,
    disciplines: ['Digital', 'Identity'],
    tagline: '빛이 움직이는 방식으로 설계한 운영체제 브랜드',
    intro:
      '아우라는 AI 기반의 개인 운영체제입니다. 인터페이스가 없는 제품을 어떻게 보이게 할까. 우리는 "빛의 상태"를 브랜드의 언어로 삼았습니다.',
    body: [
      '로고는 고정된 형태가 없습니다. 대신 색과 흐림의 규칙이 있습니다. 대기 중일 때, 듣고 있을 때, 답할 때 각각 다른 그라디언트 상태를 가집니다.',
      '모든 모션은 실제 빛의 확산 곡선을 참고해 이징을 설계했습니다. 화면 어디에서도 같은 호흡으로 움직입니다.',
      '런칭 키노트의 무대 연출, 앱 아이콘, 포장 상자의 홀로그램 박까지 하나의 규칙에서 나왔습니다.',
    ],
    services: ['브랜드 시스템', '모션 아이덴티티', '런칭 캠페인', '키노트 비주얼'],
    outcomes: [
      { value: '1.2M', label: '런칭 영상 조회' },
      { value: '#1', label: 'Product Hunt 주간' },
      { value: '14', label: '언어로 배포된 가이드' },
    ],
    cover: img('aura-1'),
    gallery: [img('aura-1'), img('aura-2'), img('aura-3'), img('aura-4'), img('aura-5')],
    tint: '#2b1d5e',
    featured: true,
  },
  {
    slug: 'fold',
    title: 'Fold',
    client: 'Fold Furniture',
    year: 2025,
    disciplines: ['Campaign', 'Digital'],
    tagline: '한 장의 면이 의자가 되는 순간을 담은 런칭 캠페인',
    intro:
      '폴드는 단일 판재를 접어 만드는 가구 시리즈입니다. 우리는 "접힘"이라는 제조 원리를 캠페인의 유일한 모티프로 삼았습니다.',
    body: [
      '스튜디오 촬영은 조명 하나, 배경 하나로 진행했습니다. 그림자가 접힌 면을 설명하도록 했고, 컬러는 제품 세 가지 마감색만 사용했습니다.',
      '웹사이트는 스크롤에 따라 판재가 접혀 의자가 되는 3D 시퀀스를 중심에 두었습니다. 설명 문장은 여덟 개를 넘지 않습니다.',
    ],
    services: ['캠페인 기획', '아트 디렉션', '사진·영상', '런칭 사이트'],
    outcomes: [
      { value: '92%', label: '초도 물량 소진 (3주)' },
      { value: '4.8', label: '평균 세션 시간(분)' },
      { value: '31', label: '매거진 피처' },
    ],
    quote: { text: '우리 제품을 우리보다 더 정확하게 말해주는 사람들.', by: '이도윤, Fold 공동창업자' },
    cover: img('fold-1'),
    gallery: [img('fold-1'), img('fold-2'), img('fold-3'), img('fold-4')],
    tint: '#111',
    featured: true,
  },
  {
    slug: 'nuance',
    title: 'Nuance',
    client: 'Nuance Atelier',
    year: 2025,
    disciplines: ['Campaign'],
    tagline: '말수가 적은 옷을 위한 FW 캠페인',
    intro:
      '뉘앙스는 색과 실루엣만으로 이야기하는 의류 브랜드입니다. 캠페인 역시 카피 없이, 자세와 빛으로만 구성했습니다.',
    body: [
      '모델의 동작은 옷의 구조가 드러나는 순간에만 멈췁니다. 배경은 세 가지 톤의 벽, 조명은 창가의 자연광 시간대에 맞춰 촬영했습니다.',
      '인쇄물은 종이의 결을 살린 무코팅지에 1도 인쇄로 마감했습니다. 화면에서는 사진의 노이즈를 지우지 않았습니다.',
    ],
    services: ['캠페인 컨셉', '아트 디렉션', '룩북', '옥외 광고'],
    outcomes: [
      { value: '2.4×', label: '온라인 매출' },
      { value: '18', label: '도시 옥외 노출' },
      { value: '1', label: '캠페인 카피 (단어 수)' },
    ],
    cover: img('nuance-1'),
    gallery: [img('nuance-1'), img('nuance-2'), img('nuance-3'), img('nuance-4')],
    tint: '#6b5a4a',
    featured: true,
  },
  {
    slug: 'tomate',
    title: 'Tomate',
    client: 'Tomate Foods',
    year: 2025,
    disciplines: ['Packaging', 'Identity'],
    tagline: '식탁 위에서 가장 먼저 눈에 들어오는 소스 패키지',
    intro:
      '토마테는 재료 세 가지만으로 만드는 소스 브랜드입니다. 패키지도 재료 세 가지만 썼습니다. 병의 형태, 한 가지 색, 한 줄의 글자.',
    body: [
      '라벨은 병의 곡률에 맞춰 글자 폭을 미세하게 조정했습니다. 어느 각도에서 보아도 글자가 반듯하게 읽힙니다.',
      '색은 내용물에서 그대로 가져왔습니다. 토마토, 바질, 마늘. 매대에서 세 병이 함께 놓일 때 하나의 그래픽이 됩니다.',
    ],
    services: ['패키지 디자인', '워드마크', '매대 디스플레이', '사진'],
    outcomes: [
      { value: '210', label: '입점 매장' },
      { value: '3', label: '색 (전체 라인업)' },
      { value: '0', label: '플라스틱 부속' },
    ],
    cover: img('sauce-1'),
    gallery: [img('sauce-1'), img('sauce-2'), img('sauce-3'), img('sauce-4')],
    tint: '#c96f4e',
  },
  {
    slug: 'form',
    title: 'FORM 2025',
    client: 'Seoul Design Foundation',
    year: 2025,
    disciplines: ['Identity', 'Spatial'],
    tagline: '전시 포스터부터 공간 그래픽까지, 한 달의 축제를 위한 체계',
    intro:
      '폼은 도시 전체에서 열리는 디자인 축제입니다. 300개가 넘는 프로그램이 한 달 동안 한 이름 아래 모여야 했습니다.',
    body: [
      '아이덴티티는 "형태를 발견하는 손"이라는 개념에서 나왔습니다. 손으로 그린 곡선을 디지털로 옮겨 포스터마다 다른 형태가 생성됩니다.',
      '공간 그래픽은 콘크리트 벽에 직접 부착하는 대형 시트로 제작해, 축제가 끝난 뒤 남는 폐기물을 최소화했습니다.',
    ],
    services: ['축제 아이덴티티', '포스터 시스템', '공간 그래픽', '웹사이트'],
    outcomes: [
      { value: '312', label: '프로그램' },
      { value: '46만', label: '방문객' },
      { value: '1', label: '디자인 시스템' },
    ],
    cover: img('form-1'),
    gallery: [img('form-1'), img('form-2'), img('form-3'), img('form-4')],
    tint: '#3a3a3a',
  },
  {
    slug: 'lumen',
    title: 'Lumen',
    client: 'Lumen Residences',
    year: 2024,
    disciplines: ['Spatial', 'Identity'],
    tagline: '빛이 지나가는 길을 따라 설계한 주거 브랜드',
    intro:
      '루멘은 채광을 설계의 중심에 두는 주거 브랜드입니다. 우리는 하루 동안 빛이 집 안을 어떻게 이동하는지를 브랜드의 시간표로 삼았습니다.',
    body: [
      '워드마크는 아침 7시 창가의 빛 각도를 그대로 기울인 세리프 글자입니다. 사이니지는 벽에서 살짝 떠 있어 실제 그림자를 만듭니다.',
      '분양 안내 공간은 가구 대신 빛으로만 동선을 안내했습니다. 방문객의 평균 체류 시간이 두 배로 늘었습니다.',
    ],
    services: ['브랜드 아이덴티티', '공간 사이니지', '분양 갤러리', '인쇄물'],
    outcomes: [
      { value: '2×', label: '체류 시간' },
      { value: '100%', label: '1차 분양 완료' },
      { value: '7AM', label: '워드마크의 기준 시각' },
    ],
    cover: img('lumen-1'),
    gallery: [img('lumen-1'), img('lumen-2'), img('lumen-3'), img('lumen-4'), img('lumen-5')],
    tint: '#d9cbb8',
  },
  {
    slug: 'marmo',
    title: 'Marmo',
    client: 'Museo Marmo',
    year: 2024,
    disciplines: ['Digital', 'Identity'],
    tagline: '2천 년 된 조각을 위한 가장 새로운 웹사이트',
    intro:
      '마르모는 고대 조각 컬렉션을 가진 사립 미술관입니다. 우리는 대리석의 표면을 확대하는 경험을 디지털로 옮겼습니다.',
    body: [
      '홈 화면은 소장품 한 점의 초고해상도 사진으로 시작합니다. 스크롤은 곧 줌이고, 줌은 곧 설명입니다. 표면의 균열에 닿으면 복원 기록이 열립니다.',
      '타이포그래피는 로마 비문의 비례를 따르되, 화면에서 읽히도록 굵기를 다시 그렸습니다.',
    ],
    services: ['디지털 전략', '웹사이트', '컬렉션 아카이브', '타입 디자인'],
    outcomes: [
      { value: '6.1', label: '평균 세션 시간(분)' },
      { value: '4,200', label: '디지털화된 소장품' },
      { value: '01', label: 'Webby 수상' },
    ],
    cover: img('marmo-1'),
    gallery: [img('marmo-1'), img('marmo-2'), img('marmo-3')],
    tint: '#4a4a48',
  },
]

export const disciplines: Discipline[] = ['Identity', 'Digital', 'Campaign', 'Spatial', 'Packaging']

export const findProject = (slug: string) => projects.find((project) => project.slug === slug)

export const nextProject = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug)
  return projects[(index + 1) % projects.length]
}
