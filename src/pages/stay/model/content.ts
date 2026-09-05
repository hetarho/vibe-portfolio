const img = (name: string) => `/images/stay/${name}.jpg`

export const hero = { image: img('hero-fog'), alt: '구름 위로 솟은 능선과 저녁 빛' }

export const introPhotos = [img('fog-forest'), img('room-reading')]

export type Experience = {
  slug: string
  name: string
  english: string
  time: string
  detail: string
  image: string
}

export const experiences: Experience[] = [
  {
    slug: 'sauna',
    name: '숲 사우나',
    english: 'Forest Sauna',
    time: '07:00 ~ 22:00',
    detail: '창 하나가 숲으로 열린 장작 사우나. 90분 단위로 한 팀만 씁니다. 나오면 계곡물에 발을 담그세요.',
    image: img('sauna-window'),
  },
  {
    slug: 'pool',
    name: '안개 풀',
    english: 'Fog Pool',
    time: '07:00 ~ 21:00',
    detail: '능선을 향해 끝이 사라지는 온수 풀. 아침 안개가 낮게 깔릴 때 수면과 하늘의 경계가 지워집니다.',
    image: img('pool-sunset'),
  },
  {
    slug: 'spa',
    name: '스톤 테라피',
    english: 'Stone Therapy',
    time: '예약제 · 60 / 90분',
    detail: '계곡의 돌을 데워 등에 올리는 테라피. 산행을 다녀온 날 저녁에 가장 좋습니다.',
    image: img('spa-stones'),
  },
  {
    slug: 'trail',
    name: '새벽 능선 산책',
    english: 'Dawn Ridge Walk',
    time: '05:30 출발 · 약 2시간',
    detail: '해 뜨기 전 능선까지 함께 걷습니다. 안개가 발 아래로 내려가는 순간을 보고 내려와 아침을 먹습니다.',
    image: img('fog-valley'),
  },
  {
    slug: 'fire',
    name: '난로 라운지',
    english: 'Fireside Lounge',
    time: '16:00 ~ 24:00',
    detail: '본관 1층. 장작 난로와 낮은 소파, 레코드 300장. 저녁 여섯 시에는 위스키 한 잔을 냅니다.',
    image: img('lounge-fire'),
  },
  {
    slug: 'breakfast',
    name: '방에서 먹는 아침',
    english: 'Breakfast in Bed',
    time: '07:30 ~ 10:30',
    detail: '원하는 시간에 트레이가 방으로 옵니다. 갓 구운 빵, 계절 과일, 근처 농장의 달걀과 커피.',
    image: img('breakfast-bed'),
  },
]

export const dayFlow = [
  { time: '05:30', text: '새벽 능선 산책 출발' },
  { time: '07:30', text: '방으로 오는 아침 식사' },
  { time: '10:00', text: '숲 사우나, 계곡물에 발 담그기' },
  { time: '13:00', text: '다이닝 소목, 계절 점심' },
  { time: '16:00', text: '난로 라운지, 레코드와 책' },
  { time: '18:30', text: '5코스 디너' },
  { time: '21:00', text: '안개 풀에서 보는 별' },
]

export const dining = {
  hero: img('dining-dark'),
  name: '소목',
  english: 'Somok',
  statement: '산에서 20km 안에서 난 것만 씁니다. 그날 아침 밭에서 온 것이 저녁의 코스가 됩니다.',
  chef: '셰프 정하은은 코펜하겐과 서울에서 12년을 보내고 이 산으로 왔습니다. 메뉴는 매주 바뀌고, 코스는 다섯 접시를 넘지 않습니다.',
  photos: [img('dining-plate'), img('dining-line'), img('dining-red')],
  courses: [
    { name: '첫 접시', dish: '고랭지 배추와 산초, 잣 크림' },
    { name: '두 번째', dish: '계곡 송어, 들기름, 산나물' },
    { name: '세 번째', dish: '인제 콩두부, 표고, 다시' },
    { name: '네 번째', dish: '한우 등심 또는 능이버섯 구이' },
    { name: '마지막', dish: '오미자 그라니타, 꿀, 잣' },
  ],
  hours: [
    { name: '아침', time: '07:30 ~ 10:30', note: '방 또는 다이닝' },
    { name: '점심', time: '12:30 ~ 14:00', note: '3코스' },
    { name: '저녁', time: '18:30 / 20:00', note: '5코스, 예약제' },
    { name: '바', time: '16:00 ~ 24:00', note: '난로 라운지' },
  ],
  breakfast: img('breakfast-window'),
}

export const story = {
  hero: img('aerial'),
  founder: {
    quote: '아무것도 하지 않아도 괜찮은 곳을 만들고 싶었습니다. 안개가 걷히길 기다리는 일이 하루의 전부여도 되는 곳.',
    name: '김하늬, 하븐을 시작한 사람',
  },
  paragraphs: [
    '하븐은 강원 인제, 해발 780미터 능선 아래에 있습니다. 2021년 여름, 폐교된 분교 자리를 사서 3년 동안 지었습니다. 건물은 능선을 가리지 않도록 낮게, 나무는 한 그루도 베지 않고.',
    '방은 여섯 개뿐입니다. 더 지을 수도 있었지만, 여섯이 넘으면 저녁 라운지에서 서로의 얼굴을 기억하지 못하게 된다는 것을 알았습니다.',
    '이곳의 이름 하븐(HAVN)은 덴마크어로 항구를 뜻합니다. 바다는 없지만, 안개의 바다 위에 잠시 배를 대는 곳이라는 뜻으로 지었습니다.',
  ],
  photos: [img('corridor'), img('cabin-dusk'), img('pool-edge')],
  principles: [
    { title: '낮게, 조용하게', detail: '건물 높이는 주변 나무의 3분의 2를 넘지 않습니다.' },
    { title: '20km의 식탁', detail: '식재료의 90%는 하븐에서 20km 안에서 옵니다.' },
    { title: '여섯 개의 방', detail: '더 짓지 않습니다. 대신 매년 한 곳씩 고칩니다.' },
  ],
  access: [
    { how: '자동차', detail: '서울에서 2시간 30분. 마지막 4km는 비포장 임도, 사륜구동 권장' },
    { how: '기차 + 셔틀', detail: 'KTX 춘천역에서 하븐 셔틀 (예약제, 1일 2회, 90분)' },
    { how: '짐', detail: '도착 전 짐을 보내주시면 방에 미리 놓아 드립니다' },
  ],
  address: '강원특별자치도 인제군 기린면 진동리 산 12',
}

export const reviews = [
  { text: '이틀 동안 시계를 한 번도 안 봤어요. 안개가 걷히면 아침이고, 난로가 켜지면 저녁이었습니다.', by: '지원, 서울 · 2026.05' },
  { text: '사우나에서 나와 계곡물에 발을 담갔던 순간을 아직도 생각합니다. 그게 여행의 전부였어도 좋았을 거예요.', by: 'Mads, Copenhagen · 2026.04' },
  { text: '아이들과 캐빈에 묵었는데, 밤에 별을 보다가 셋이 데크에서 잠들었습니다.', by: '수민, 부산 · 2025.10' },
]

export const seasons = [
  { name: '봄', months: '4~5월', text: '안개가 가장 자주 내려앉는 계절. 조팝나무와 산벚꽃.', image: img('fog-forest') },
  { name: '여름', months: '6~8월', text: '계곡물이 가장 차가운 때. 새벽 산책이 좋습니다.', image: img('pool-edge') },
  { name: '가을', months: '9~11월', text: '능선이 붉어지고 능이버섯이 식탁에 오릅니다.', image: img('cabin-aframe') },
  { name: '겨울', months: '12~3월', text: '눈 속의 사우나. 하룻밤에 40cm가 쌓이는 날도 있습니다.', image: img('sauna-glow') },
]
