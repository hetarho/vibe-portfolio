export type Category = '세라믹' | '우드' | '패브릭' | '바스' | '조명' | '글라스' | '플라워'

export type Product = {
  id: string
  name: string
  english: string
  category: Category
  price: number
  /** 정가가 따로 있으면 할인 표시 */
  compareAt?: number
  images: string[]
  summary: string
  description: string
  details: { label: string; value: string }[]
  options?: { label: string; values: string[] }
  maker: string
  isNew?: boolean
  soldOut?: boolean
  /** 홈 '이번 주의 물건'에 노출 */
  featured?: boolean
  /** 카드 배경 톤 (사진 뜨기 전) */
  tone: string
}

const img = (name: string) => `/images/shop/${name}.jpg`

export const products: Product[] = [
  {
    id: 'soil-vase-trio',
    name: '소일 화병 3종',
    english: 'Soil Vase Trio',
    category: '세라믹',
    price: 128000,
    images: [img('vase-set'), img('vase-set-2'), img('vase-set-3')],
    summary: '흙의 결을 그대로 남긴 무광 화병 세 점',
    description:
      '경기 여주의 흙으로 손빚은 화병입니다. 유약을 얇게 올려 흙의 질감이 손끝에 그대로 닿습니다. 셋을 함께 두면 하나의 풍경이 되고, 따로 두어도 각자 충분합니다.',
    details: [
      { label: '소재', value: '석기토, 무광 유약' },
      { label: '크기', value: 'H 18 / 22 / 26cm' },
      { label: '관리', value: '물기는 바로 닦아 보관. 식기세척기 불가' },
      { label: '제작', value: '여주, 대한민국. 수작업' },
    ],
    maker: '토림 공방',
    isNew: true,
    featured: true,
    tone: '#e6dccd',
  },
  {
    id: 'speckle-mug',
    name: '스페클 머그',
    english: 'Speckle Mug',
    category: '세라믹',
    price: 34000,
    images: [img('mug-speckle'), img('mug-speckle-2')],
    summary: '점점이 박힌 철분이 만드는 우연의 무늬',
    description:
      '흙 속 철분이 소성 중에 표면으로 올라와 점무늬가 됩니다. 어느 두 개도 같은 무늬가 없습니다. 손에 잡히는 두께와 입술에 닿는 얇은 테두리를 함께 살렸습니다.',
    details: [
      { label: '소재', value: '석기토, 반광 유약' },
      { label: '용량', value: '320ml' },
      { label: '관리', value: '식기세척기·전자레인지 사용 가능' },
      { label: '제작', value: '문경, 대한민국' },
    ],
    options: { label: '색', values: ['크림', '블루 스페클'] },
    maker: '이도 세라믹',
    featured: true,
    tone: '#ded8cf',
  },
  {
    id: 'terracotta-cup',
    name: '테라코타 컵',
    english: 'Terracotta Cup',
    category: '세라믹',
    price: 28000,
    images: [img('cup-terracotta')],
    summary: '오후의 그림자가 가장 잘 어울리는 컵',
    description:
      '유약 없이 구운 붉은 흙 컵입니다. 손잡이는 검지 하나가 편하게 들어가는 크기로, 창가에 두었을 때 그림자가 가장 예쁘게 떨어지도록 굽을 살짝 높였습니다.',
    details: [
      { label: '소재', value: '테라코타, 내부 투명 유약' },
      { label: '용량', value: '220ml' },
      { label: '관리', value: '손세척 권장' },
      { label: '제작', value: '포르투갈' },
    ],
    maker: 'Casa Barro',
    tone: '#efe5da',
  },
  {
    id: 'stone-mug',
    name: '스톤웨어 머그',
    english: 'Stoneware Mug',
    category: '세라믹',
    price: 38000,
    images: [img('mug-stone'), img('mug-black')],
    summary: '두 손으로 감싸 쥐기 좋은 두께',
    description:
      '아침에 가장 먼저 잡는 잔을 생각했습니다. 손 안에 온기가 오래 머무는 두께, 넘치지 않는 넉넉한 용량. 색은 회청과 흑탄 두 가지입니다.',
    details: [
      { label: '소재', value: '석기토' },
      { label: '용량', value: '400ml' },
      { label: '관리', value: '식기세척기 사용 가능' },
      { label: '제작', value: '이천, 대한민국' },
    ],
    options: { label: '색', values: ['회청', '흑탄'] },
    maker: '토림 공방',
    featured: true,
    tone: '#d8d3ca',
  },
  {
    id: 'wooden-spoons',
    name: '우드 스푼 3종',
    english: 'Wooden Spoon Set',
    category: '우드',
    price: 46000,
    images: [img('spoons'), img('spoons-2')],
    summary: '체리, 월넛, 메이플. 세 가지 나무의 세 가지 크기',
    description:
      '요리할 때, 덜어낼 때, 맛볼 때. 쓰임에 맞춘 세 크기를 각기 다른 나무로 깎았습니다. 쓸수록 손에 맞게 길이 들고, 색이 깊어집니다.',
    details: [
      { label: '소재', value: '체리, 월넛, 메이플 원목' },
      { label: '크기', value: 'L 16 / 22 / 30cm' },
      { label: '관리', value: '손세척 후 건조. 한 달에 한 번 오일링' },
      { label: '제작', value: '괴산, 대한민국' },
    ],
    maker: '나무결 공방',
    featured: true,
    tone: '#d9cbb9',
  },
  {
    id: 'utensil-holder',
    name: '우드 유텐실 홀더',
    english: 'Utensil Holder',
    category: '우드',
    price: 52000,
    images: [img('utensil-holder')],
    summary: '조리도구가 서 있는 자리를 정돈하는 원통',
    description: '오크 원목을 통으로 파낸 홀더입니다. 바닥에 물이 고이지 않도록 미세한 홈을 냈고, 안쪽은 오일 마감으로 위생을 챙겼습니다.',
    details: [
      { label: '소재', value: '오크 원목, 천연 오일 마감' },
      { label: '크기', value: 'Ø 12 × H 16cm' },
      { label: '관리', value: '마른 천으로 닦기' },
      { label: '제작', value: '괴산, 대한민국' },
    ],
    maker: '나무결 공방',
    tone: '#e3d7c6',
  },
  {
    id: 'oak-stool',
    name: '오크 라운드 스툴',
    english: 'Oak Round Stool',
    category: '우드',
    price: 189000,
    images: [img('stool-oak'), img('stool-oak-2')],
    summary: '앉는 자리이자 물건을 올리는 자리',
    description:
      '앉으면 의자가 되고, 옆에 두면 사이드 테이블이 됩니다. 다리 세 개의 각도는 무거운 사람이 앉아도 흔들리지 않는 지점을 여러 번 만들어 찾았습니다.',
    details: [
      { label: '소재', value: '오크 원목' },
      { label: '크기', value: 'Ø 32 × H 45cm' },
      { label: '하중', value: '120kg' },
      { label: '제작', value: '파주, 대한민국' },
    ],
    maker: '스튜디오 결',
    isNew: true,
    featured: true,
    tone: '#e0d9cf',
  },
  {
    id: 'walnut-stool',
    name: '월넛 조인트 스툴',
    english: 'Walnut Joint Stool',
    category: '우드',
    price: 240000,
    images: [img('stool-walnut')],
    summary: '못 없이 맞물린 두 장의 월넛',
    description: '접착제도 못도 없이 짜맞춤으로만 세운 스툴입니다. 결이 서로 다른 두 판이 맞물린 자리가 이 물건의 얼굴입니다.',
    details: [
      { label: '소재', value: '월넛 원목' },
      { label: '크기', value: 'W 36 × D 28 × H 44cm' },
      { label: '관리', value: '직사광선을 피해 보관' },
      { label: '제작', value: '파주, 대한민국' },
    ],
    maker: '스튜디오 결',
    tone: '#e5e0d8',
  },
  {
    id: 'linen-curtain',
    name: '린넨 커튼',
    english: 'Linen Curtain',
    category: '패브릭',
    price: 98000,
    images: [img('curtain-linen'), img('linen-2'), img('linen-3')],
    summary: '빛을 반쯤만 들이는 리투아니아 린넨',
    description:
      '아침 빛을 걸러서 방 안에 부드럽게 퍼뜨리는 두께입니다. 세탁할수록 결이 부드러워지고, 구김이 오히려 자연스러운 옷차림처럼 보입니다.',
    details: [
      { label: '소재', value: '린넨 100% (리투아니아산)' },
      { label: '크기', value: 'W 140 × L 230cm (1장)' },
      { label: '관리', value: '30도 단독 세탁, 자연 건조' },
      { label: '제작', value: '리투아니아' },
    ],
    options: { label: '색', values: ['오트밀', '세이지', '차콜'] },
    maker: 'Linas',
    featured: true,
    tone: '#e9e2d6',
  },
  {
    id: 'linen-bedding',
    name: '린넨 베딩 세트',
    english: 'Linen Bedding Set',
    category: '패브릭',
    price: 268000,
    compareAt: 310000,
    images: [img('bedding'), img('bedding-2'), img('bedding-room')],
    summary: '여름엔 서늘하고 겨울엔 포근한 사계절 이불',
    description:
      '스톤워시로 한 번 길들인 린넨입니다. 첫날부터 오래 쓴 이불처럼 몸에 감기고, 땀을 빨리 말려 계절을 가리지 않습니다. 이불커버와 베개커버 두 장으로 구성됩니다.',
    details: [
      { label: '소재', value: '린넨 100%, 스톤워시' },
      { label: '구성', value: '이불커버 Q + 베개커버 2' },
      { label: '관리', value: '40도 세탁, 저온 건조' },
      { label: '제작', value: '포르투갈' },
    ],
    options: { label: '사이즈', values: ['Q', 'K'] },
    maker: 'Linas',
    featured: true,
    tone: '#e6e0d5',
  },
  {
    id: 'linen-throw',
    name: '린넨 스로우',
    english: 'Linen Throw',
    category: '패브릭',
    price: 74000,
    images: [img('linen-stack')],
    summary: '소파 끝에 무심히 걸쳐두는 한 장',
    description: '가볍고 통기성이 좋아 여름 낮잠에도 덮을 수 있습니다. 색은 세탁을 거친 뒤에도 그대로 남는 천연 염색입니다.',
    details: [
      { label: '소재', value: '린넨 100%' },
      { label: '크기', value: '130 × 180cm' },
      { label: '관리', value: '30도 세탁' },
      { label: '제작', value: '리투아니아' },
    ],
    maker: 'Linas',
    tone: '#ebe4d9',
  },
  {
    id: 'botanical-soap',
    name: '보태니컬 솝 3종',
    english: 'Botanical Soap Set',
    category: '바스',
    price: 36000,
    images: [img('soap'), img('soap-2'), img('soap-3')],
    summary: '올리브, 시어, 라벤더. 손에 남는 세 가지 향',
    description: '저온 숙성으로 여섯 주를 기다려 만든 비누입니다. 향료 대신 식물성 오일과 정유만 썼습니다. 거품은 조용하고, 씻은 뒤 손이 당기지 않습니다.',
    details: [
      { label: '성분', value: '올리브 오일, 시어버터, 라벤더 정유' },
      { label: '무게', value: '110g × 3' },
      { label: '보관', value: '물기 없는 곳에 세워 두기' },
      { label: '제작', value: '제주, 대한민국' },
    ],
    maker: '고요 바스',
    featured: true,
    tone: '#efe9df',
  },
  {
    id: 'soy-candle',
    name: '소이 캔들, 비 오는 숲',
    english: 'Soy Candle: Rain Forest',
    category: '바스',
    price: 42000,
    images: [img('candle'), img('candle-2')],
    summary: '비 그친 뒤 숲의 냄새',
    description: '소이 왁스와 면 심지, 그리고 시더우드와 젖은 이끼의 향. 태우면 45시간, 태우지 않고 두어도 방 안이 조금 달라집니다.',
    details: [
      { label: '성분', value: '소이 왁스, 면 심지, 천연 향료' },
      { label: '연소', value: '약 45시간' },
      { label: '용기', value: '검은 세라믹, 재사용 가능' },
      { label: '제작', value: '서울, 대한민국' },
    ],
    maker: '고요 바스',
    isNew: true,
    tone: '#e9e3d9',
  },
  {
    id: 'glass-carafe',
    name: '글라스 카라페',
    english: 'Glass Carafe',
    category: '글라스',
    price: 58000,
    images: [img('carafe'), img('carafe-2'), img('carafe-3')],
    summary: '식탁 위 물이 가장 맑아 보이는 병',
    description: '입으로 불어 만든 얇은 유리 카라페와 잔 한 개. 병의 어깨를 살짝 좁혀 한 손으로 잡기 좋게 했습니다. 냉장고 문칸에 들어가는 높이입니다.',
    details: [
      { label: '소재', value: '붕규산 유리' },
      { label: '용량', value: '1L + 잔 250ml' },
      { label: '관리', value: '식기세척기 사용 가능' },
      { label: '제작', value: '체코' },
    ],
    maker: 'Sklo',
    tone: '#eceae5',
  },
  {
    id: 'dried-bouquet',
    name: '드라이 부케, 가을 들',
    english: 'Dried Bouquet: Autumn Field',
    category: '플라워',
    price: 48000,
    images: [img('dried'), img('dried-2')],
    summary: '물 없이 한 해를 함께하는 꽃',
    description: '강아지풀, 유칼립투스, 밀 이삭을 묶었습니다. 직사광선만 피하면 색이 천천히 바래며 일 년 넘게 곁에 있습니다.',
    details: [
      { label: '구성', value: '강아지풀, 유칼립투스, 밀, 라군러스' },
      { label: '크기', value: 'H 55cm' },
      { label: '관리', value: '직사광선·습기 피하기' },
      { label: '제작', value: '양평, 대한민국' },
    ],
    maker: '들꽃 작업실',
    tone: '#ede7dc',
  },
  {
    id: 'ceramic-lamp',
    name: '세라믹 테이블 램프',
    english: 'Ceramic Table Lamp',
    category: '조명',
    price: 168000,
    images: [img('lamp'), img('lamp-2')],
    summary: '밤의 방을 낮추는 낮은 빛',
    description: '세라믹 몸통에 린넨 셰이드를 얹었습니다. 전구는 2700K, 디머로 밝기를 조절합니다. 책 읽는 밤과 잠드는 밤 사이의 빛입니다.',
    details: [
      { label: '소재', value: '세라믹, 린넨 셰이드' },
      { label: '크기', value: 'Ø 24 × H 38cm' },
      { label: '전구', value: 'E26 LED 2700K 포함, 디머' },
      { label: '제작', value: '이천, 대한민국' },
    ],
    maker: '이도 세라믹',
    isNew: true,
    tone: '#2c2925',
  },
]

export const categories: Category[] = ['세라믹', '우드', '패브릭', '바스', '조명', '글라스', '플라워']

export const findProduct = (id: string) => products.find((product) => product.id === id)

export const relatedProducts = (product: Product, count = 4) =>
  [
    ...products.filter((item) => item.id !== product.id && item.category === product.category),
    ...products.filter((item) => item.id !== product.id && item.category !== product.category),
  ].slice(0, count)

export const FREE_SHIPPING_FROM = 50000
export const SHIPPING_FEE = 3500
