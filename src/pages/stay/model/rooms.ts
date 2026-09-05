export type Room = {
  slug: string
  name: string
  english: string
  kind: '룸' | '스위트' | '캐빈'
  size: number
  guests: number
  bed: string
  view: string
  price: number
  images: string[]
  summary: string
  description: string[]
  amenities: string[]
  highlight: string
  featured?: boolean
}

const img = (name: string) => `/images/stay/${name}.jpg`

export const rooms: Room[] = [
  {
    slug: 'ember',
    name: '엠버',
    english: 'Ember',
    kind: '룸',
    size: 34,
    guests: 2,
    bed: '킹 1',
    view: '숲',
    price: 320000,
    images: [img('room-ember'), img('bath-brass'), img('breakfast-bed')],
    summary: '난로 불빛 색의 벽, 숲을 향한 창',
    description: [
      '해가 지면 벽이 난로 불빛 색으로 물듭니다. 엠버는 저녁이 가장 아름다운 방입니다. 침대 머리맡의 창은 숲의 첫 줄을 액자처럼 담고, 아침에는 안개가 그 안으로 천천히 들어옵니다.',
      '욕실은 콘크리트 벽에 황동 수전. 욕조에 몸을 담그면 창밖 자작나무가 눈높이에 옵니다.',
    ],
    amenities: ['킹 베드', '독립 욕조', '숲 전망 창', '레코드 플레이어', '미니바', '리넨 가운', '난방 바닥', '와이파이'],
    highlight: '저녁 6시, 벽이 물드는 시간',
    featured: true,
  },
  {
    slug: 'arc',
    name: '아크',
    english: 'Arc',
    kind: '스위트',
    size: 58,
    guests: 3,
    bed: '킹 1 + 데이베드',
    view: '능선',
    price: 540000,
    images: [img('room-arc'), img('bath-marble'), img('terrace-sunset')],
    summary: '나무 천장이 물결처럼 덮는 스위트',
    description: [
      '천장은 얇은 나무 살을 겹쳐 만든 곡선입니다. 누우면 파도 아래에 있는 것 같고, 앉으면 큰 나무의 그늘에 있는 것 같습니다. 아크는 하븐에서 가장 넓은 방입니다.',
      '서쪽 테라스는 능선 위로 지는 해를 정면으로 봅니다. 저녁 시간 테라스에 와인과 치즈를 준비해 드립니다.',
    ],
    amenities: ['킹 베드 + 데이베드', '대리석 욕조', '프라이빗 테라스', '리빙룸', '에스프레소 머신', '미니바', '난방 바닥', '와이파이'],
    highlight: '테라스에서 보는 능선의 일몰',
    featured: true,
  },
  {
    slug: 'linen',
    name: '리넨',
    english: 'Linen',
    kind: '룸',
    size: 30,
    guests: 2,
    bed: '퀸 1',
    view: '정원',
    price: 280000,
    images: [img('room-linen'), img('bath-white'), img('breakfast-window')],
    summary: '흰 벽과 아침 빛, 가장 밝은 방',
    description: [
      '리넨은 하븐에서 아침이 가장 먼저 오는 방입니다. 흰 벽, 자작나무 스툴, 창가의 작은 그림. 필요한 것 이외에는 두지 않았습니다.',
      '창 아래 정원에는 계절마다 다른 풀이 자랍니다. 봄에는 조팝나무, 여름에는 수국, 가을에는 억새.',
    ],
    amenities: ['퀸 베드', '샤워 부스', '정원 전망', '리딩 라이트', '미니바', '리넨 가운', '난방 바닥', '와이파이'],
    highlight: '아침 7시, 가장 먼저 밝아지는 방',
    featured: true,
  },
  {
    slug: 'indigo',
    name: '인디고',
    english: 'Indigo',
    kind: '룸',
    size: 32,
    guests: 2,
    bed: '킹 1',
    view: '계곡',
    price: 340000,
    images: [img('room-indigo'), img('bath-plant'), img('lounge-fire')],
    summary: '남색 벽, 밤이 깊어지는 방',
    description: [
      '인디고는 밤을 위한 방입니다. 남색 벽은 조명을 낮출수록 깊어지고, 펜던트 하나가 침대 옆에 작은 달처럼 떠 있습니다.',
      '창은 계곡 쪽으로 열려 물소리가 들립니다. 잠이 잘 오지 않는 분께 가장 먼저 권하는 방입니다.',
    ],
    amenities: ['킹 베드', '식물 욕실', '계곡 전망', '사운드 시스템', '미니바', '리넨 가운', '난방 바닥', '와이파이'],
    highlight: '계곡 물소리와 함께 잠드는 밤',
  },
  {
    slug: 'velvet',
    name: '벨벳',
    english: 'Velvet',
    kind: '스위트',
    size: 46,
    guests: 2,
    bed: '킹 1',
    view: '숲',
    price: 460000,
    images: [img('room-velvet'), img('bath-marble'), img('room-reading')],
    summary: '베이지 벨벳과 커튼, 가장 조용한 방',
    description: [
      '벨벳 헤드보드와 두 겹의 커튼. 소리와 빛을 가장 잘 걸러내는 방입니다. 늦잠을 자기 위해 오는 분들이 많습니다.',
      '창가 의자에 앉아 책을 읽다 잠드는 것이 이 방의 정석입니다. 아침 식사는 원하시는 시간에 방으로 올려드립니다.',
    ],
    amenities: ['킹 베드', '대리석 욕조', '암막 커튼 2중', '리딩 체어', '에스프레소 머신', '미니바', '난방 바닥', '와이파이'],
    highlight: '늦잠을 위한 두 겹의 커튼',
  },
  {
    slug: 'cabin',
    name: '캐빈',
    english: 'The Cabin',
    kind: '캐빈',
    size: 64,
    guests: 4,
    bed: '킹 1 + 트윈 2',
    view: '숲 속',
    price: 680000,
    images: [img('cabin-aframe'), img('cabin-dusk'), img('sauna-window')],
    summary: '본관에서 200m, 숲 속 독채',
    description: [
      '본관에서 숲길로 200미터. 세모 지붕의 독채입니다. 아래층은 거실과 부엌, 위층은 침실. 뒤편 데크에 숲을 향한 사우나가 붙어 있습니다.',
      '밤에는 조명을 끄고 창 앞에 앉아 보세요. 하븐에서 별이 가장 많이 보이는 자리입니다.',
    ],
    amenities: ['침실 2', '프라이빗 사우나', '부엌', '장작 난로', '숲 데크', '레코드 플레이어', '난방 바닥', '와이파이'],
    highlight: '별이 가장 많이 보이는 자리',
    featured: true,
  },
]

export const findRoom = (slug: string) => rooms.find((room) => room.slug === slug)

export const TAX_RATE = 0.1

export const extras = [
  { id: 'breakfast', name: '조식 (1인)', detail: '07:30~10:00, 다이닝 소목', price: 28000, perGuest: true },
  { id: 'sauna', name: '프라이빗 사우나 90분', detail: '숲 사우나 단독 이용', price: 60000, perGuest: false },
  { id: 'dinner', name: '계절 코스 디너 (1인)', detail: '18:30 / 20:00, 5코스', price: 95000, perGuest: true },
] as const

export type ExtraId = (typeof extras)[number]['id']
