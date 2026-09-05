const img = (name: string) => `/images/shop/${name}.jpg`

export const heroImages = { main: img('hero-vase'), alt: img('hero-linen') }

export const categoryTiles = [
  { category: '세라믹', title: '세라믹', detail: '흙과 불이 남긴 것', image: img('vase-set-2') },
  { category: '우드', title: '우드', detail: '쓸수록 깊어지는 결', image: img('stool-oak') },
  { category: '패브릭', title: '패브릭', detail: '빛을 반쯤 들이는 천', image: img('curtain-linen') },
  { category: '바스', title: '바스', detail: '하루의 끝을 씻는 일', image: img('soap-2') },
] as const

export const editorial = {
  image: img('bedding-room'),
  eyebrow: 'Soft Objects · 2026 AW',
  title: '천천히 골라, 오래 쓰는 마음.',
  body: '유행보다 쓰임을, 화려함보다 손에 닿는 감각을 생각합니다. 오하우는 시간이 지날수록 더 좋아지는 물건만 골라 둡니다.',
}

export const promises = [
  { title: '만든 사람의 이름', detail: '모든 물건에는 만든 공방과 사람의 이름이 붙어 있습니다.' },
  { title: '한 번 더 고른 물건', detail: '입점 전 석 달을 직접 써 봅니다. 그래도 좋으면 올립니다.' },
  { title: '고쳐 쓰는 서비스', detail: '깨지고 닳은 물건은 만든 공방으로 보내 고쳐 드립니다.' },
]

export type Story = {
  slug: string
  title: string
  date: string
  category: string
  cover: string
  lead: string
  body: string[]
}

export const stories: Story[] = [
  {
    slug: 'kitchen-morning',
    title: '아침 부엌을 정돈하는 다섯 가지',
    date: '2026.08.30',
    category: 'Living',
    cover: img('kitchen'),
    lead: '커피를 내리기 전 3분. 부엌이 하루의 첫 얼굴이 되는 시간입니다.',
    body: [
      '조리도구를 한 자리에 세워 두는 일부터 시작합니다. 서랍에 눕혀 두면 찾느라 하루가 시작되기도 전에 지칩니다. 우드 홀더에 자주 쓰는 것 다섯 개만 세워 두세요.',
      '물은 병에 담아 식탁에 둡니다. 냉장고를 여는 횟수가 줄고, 물을 더 자주 마시게 됩니다. 이상하게도 유리병에 든 물은 더 맑아 보입니다.',
      '마지막은 빛입니다. 아침 창의 빛을 커튼 한 장으로 걸러 부엌으로 들이면, 같은 공간이 다른 온도가 됩니다.',
    ],
  },
  {
    slug: 'meet-torim',
    title: '토림 공방, 여주의 흙을 빚는 두 사람',
    date: '2026.07.18',
    category: 'Makers',
    cover: img('vase-set-3'),
    lead: '스무 해 동안 같은 흙을 쓰는 부부 도예가를 만났습니다.',
    body: [
      '여주 외곽의 작은 가마. 부부는 하루에 딱 열두 점만 빚습니다. "더 만들 수도 있지만, 그러면 손이 급해져요." 급한 손으로 빚은 그릇은 쓰는 사람도 알아본다고 합니다.',
      '오하우의 소일 화병은 이곳에서 나옵니다. 유약을 얇게 올려 흙이 숨을 쉬게 두는 것이 이들의 방식입니다. 그래서 물을 담으면 표면이 조금 짙어지고, 마르면 다시 돌아옵니다.',
    ],
  },
  {
    slug: 'linen-care',
    title: '린넨은 구겨진 채로 아름답습니다',
    date: '2026.06.02',
    category: 'Care',
    cover: img('linen-stack'),
    lead: '다림질하지 마세요. 린넨을 오래 쓰는 유일한 비결입니다.',
    body: [
      '린넨은 세탁할 때마다 부드러워집니다. 30도 물에 단독으로 빨고, 널어 말리세요. 건조기는 섬유를 짧게 끊습니다.',
      '구김은 결점이 아니라 이 천의 표정입니다. 다림질을 하면 표면이 눌려 광택이 생기고, 그 광택은 린넨의 숨결을 막습니다. 접어 두지 말고 걸어 두면 자연스럽게 펴집니다.',
    ],
  },
]

export const findStory = (slug: string) => stories.find((story) => story.slug === slug)

export const makers = [
  { name: '토림 공방', place: '여주', craft: '석기 도예' },
  { name: '이도 세라믹', place: '이천 · 문경', craft: '생활 자기' },
  { name: '나무결 공방', place: '괴산', craft: '목공' },
  { name: '스튜디오 결', place: '파주', craft: '가구' },
  { name: 'Linas', place: '리투아니아', craft: '린넨' },
  { name: '고요 바스', place: '제주 · 서울', craft: '비누 · 캔들' },
  { name: 'Sklo', place: '체코', craft: '수제 유리' },
  { name: '들꽃 작업실', place: '양평', craft: '드라이 플라워' },
]
