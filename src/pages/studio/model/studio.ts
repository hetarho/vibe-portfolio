const img = (name: string) => `/images/studio/${name}.jpg`

export const services = [
  {
    title: 'Brand Strategy',
    ko: '브랜드 전략',
    detail: '무엇을 말하지 않을지부터 정합니다. 포지셔닝, 네이밍, 언어 체계.',
  },
  {
    title: 'Visual Identity',
    ko: '비주얼 아이덴티티',
    detail: '워드마크, 타이포그래피, 색, 모션. 열 번 봐도 처음처럼 선명한 체계.',
  },
  {
    title: 'Digital Experience',
    ko: '디지털 경험',
    detail: '웹사이트와 제품 인터페이스. 브랜드가 손끝에서 어떻게 느껴지는지.',
  },
  {
    title: 'Campaign & Content',
    ko: '캠페인·콘텐츠',
    detail: '사진, 영상, 아트 디렉션. 한 장면으로 기억되는 이야기.',
  },
  {
    title: 'Spatial Graphics',
    ko: '공간 그래픽',
    detail: '사이니지, 전시, 팝업. 브랜드가 실제 크기로 서 있는 자리.',
  },
]

export const clients = [
  'Halde', 'Aura Labs', 'Fold', 'Nuance', 'Tomate', 'Seoul Design Foundation', 'Lumen', 'Museo Marmo',
  'Ondo', 'Kinfolk', 'Paper & Salt', 'Studio Nul',
]

export const values = [
  {
    title: '덜어내서 무겁게',
    detail: '요소가 적을수록 남은 것은 커집니다. 우리는 마지막 하나가 남을 때까지 지웁니다.',
  },
  {
    title: '느껴진 다음 설명되게',
    detail: '좋은 브랜드는 첫 3초 안에 감각으로 전달됩니다. 설명은 그 다음의 일입니다.',
  },
  {
    title: '오래 가는 체계',
    detail: '캠페인은 끝나지만 체계는 남습니다. 10년 뒤에도 같은 규칙으로 새 것을 만들 수 있게.',
  },
]

export const team = [
  { name: '한지우', role: 'Founder, Creative Director', photo: img('team-1') },
  { name: 'Mikkel Sørensen', role: 'Design Director', photo: img('team-2') },
  { name: '오세린', role: 'Strategy Lead', photo: img('team-3') },
  { name: '류하람', role: 'Senior Designer', photo: img('team-4') },
  { name: '정민서', role: 'Motion & Interaction', photo: img('team-5') },
  { name: 'Lea Marchetti', role: 'Producer', photo: img('team-6') },
]

export const awards = [
  { year: 2026, title: 'D&AD Yellow Pencil', project: 'Halde' },
  { year: 2026, title: 'Awwwards Site of the Month', project: 'Aura OS' },
  { year: 2025, title: 'Red Dot: Brands & Communication', project: 'Tomate' },
  { year: 2025, title: 'Korea Design Award, Grand Prize', project: 'FORM 2025' },
  { year: 2024, title: 'Webby Award, Cultural Institutions', project: 'Marmo' },
  { year: 2024, title: 'ADC Silver Cube', project: 'Lumen' },
]

export const timeline = [
  { year: '2018', text: '성수동 작은 창고에서 두 사람으로 시작' },
  { year: '2020', text: '첫 국제 어워드. 팀 6명' },
  { year: '2022', text: '디지털 팀 신설, 첫 자체 타입페이스 발표' },
  { year: '2024', text: '한남동으로 이전. 팀 14명' },
  { year: '2026', text: '코펜하겐 위성 스튜디오 오픈' },
]

export const studioPhotos = [img('office-1'), img('office-2')]

export type Article = {
  slug: string
  title: string
  date: string
  category: string
  readMinutes: number
  cover: string
  lead: string
  body: string[]
}

export const articles: Article[] = [
  {
    slug: 'less-but-heavier',
    title: '덜어내서 무겁게 만드는 법',
    date: '2026.08.12',
    category: 'Process',
    readMinutes: 6,
    cover: img('halde-3'),
    lead: '요소를 지울수록 남은 것이 커진다는 말은 쉽습니다. 어려운 것은 어디서 멈출지 아는 일입니다.',
    body: [
      '스튜디오에서 가장 자주 하는 회의는 "무엇을 더할까"가 아니라 "무엇을 뺄까"입니다. 프로젝트 초반에 우리는 브랜드가 말하고 싶은 모든 것을 벽에 붙입니다. 그리고 하나씩 떼어냅니다.',
      '기준은 하나입니다. 이것이 없어도 브랜드가 브랜드로 남는가. 남는다면 뗍니다. 이 과정을 서너 번 반복하면 벽에는 보통 세 장 정도가 남습니다.',
      '할데 프로젝트에서는 마지막에 두 장이 남았습니다. "반복"과 "그림자". 워드마크, 웹사이트, 사이니지 모두가 이 두 단어에서 나왔습니다. 그래서 그 브랜드는 한 번 보면 잊히지 않습니다. 기억할 것이 두 개밖에 없기 때문입니다.',
    ],
  },
  {
    slug: 'motion-as-identity',
    title: '움직임도 아이덴티티다',
    date: '2026.06.03',
    category: 'Craft',
    readMinutes: 5,
    cover: img('aura-2'),
    lead: '로고가 화면 위에서 어떻게 나타나고 사라지는지는, 로고의 형태만큼 브랜드를 결정합니다.',
    body: [
      '아우라 OS 작업에서 우리는 고정된 로고를 만들지 않았습니다. 대신 빛이 퍼지는 규칙을 만들었습니다. 상태마다 다른 색과 흐림, 그리고 같은 이징 곡선.',
      '모션 아이덴티티의 핵심은 "같은 호흡"입니다. 버튼이 눌리는 속도, 화면이 전환되는 속도, 로고가 떠오르는 속도가 하나의 곡선을 공유하면 사용자는 그것을 성격으로 느낍니다.',
      '우리는 모든 프로젝트에서 이징을 단 하나만 정합니다. 그리고 지속시간은 세 단계로만 씁니다. 이 제약이 브랜드를 하나의 몸처럼 움직이게 합니다.',
    ],
  },
  {
    slug: 'photographing-silence',
    title: '침묵을 촬영하는 방법',
    date: '2026.03.21',
    category: 'Campaign',
    readMinutes: 4,
    cover: img('nuance-3'),
    lead: '카피가 없는 캠페인은 비어 있는 것이 아닙니다. 사진이 문장을 대신 말하는 것입니다.',
    body: [
      '뉘앙스 캠페인에는 단어가 하나뿐입니다. 브랜드 이름. 나머지는 자세와 빛이 말합니다. 그래서 촬영 전 우리는 문장을 먼저 씁니다. 그리고 그 문장이 보이는 순간에만 셔터를 누릅니다.',
      '조명은 창가의 자연광 시간대에 맞췄습니다. 오후 3시에서 5시. 벽은 세 가지 톤. 이 제약 안에서 옷의 구조가 드러나는 자세를 찾는 데 하루에 여섯 컷 정도를 얻었습니다.',
    ],
  },
  {
    slug: 'copenhagen',
    title: '코펜하겐에 두 번째 스튜디오를 열며',
    date: '2026.01.09',
    category: 'Studio',
    readMinutes: 3,
    cover: img('office-2'),
    lead: '여덟 해 동안 서울에서 배운 것을 다른 빛 아래에서 시험해 보려 합니다.',
    body: [
      '코펜하겐 스튜디오는 세 사람으로 시작합니다. 서울과 같은 원칙, 다른 리듬. 유럽 클라이언트와 시차 없이 일하기 위한 결정이지만, 사실은 다른 도시의 빛이 우리 작업을 어떻게 바꾸는지 보고 싶었습니다.',
      '두 스튜디오는 매주 금요일 같은 시간에 리뷰를 합니다. 한쪽은 아침, 한쪽은 저녁. 그 시차가 만드는 거리감이 작업을 더 정확하게 볼 수 있게 해줄 거라 믿습니다.',
    ],
  },
]

export const findArticle = (slug: string) => articles.find((article) => article.slug === slug)
