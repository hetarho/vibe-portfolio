/**
 * 2부 · 한글 절차를 코드로 옮기기.
 *
 * 지난 수업(java-thinking-workshop)은 숫자가 바뀌어도 통하는 한글 규칙에서 멈췄다.
 * 이번에는 그 규칙을 한 줄씩 코드로 옮긴다. 같은 문제를 일부러 다시 쓴다.
 * 학생이 이미 한글 규칙을 한 번 만들어 본 문제라서, 이번에는 옮기는 일 하나에만 힘을 쓸 수 있다.
 *
 * 문제마다 도와주는 양을 한 단계씩 줄인다(예제 → 순서 맞추기 → 빈칸 → 절차만 → 백지).
 * 지난 수업의 계단 여섯 칸 중 4 · 5 · 6번 칸을 채우는 구간이다.
 *
 * 코드 줄은 answers/의 정답 파일과 같아야 한다. 함수 안쪽 들여쓰기는 빼고 둔다.
 */

export type TranslateLine = {
  say: string
  cards: number[]
  tag?: string
  code: string[]
}

export type Bowl = {
  name: string
  start: string
  meaning: string
}

export type TranslateMode = '예제' | '순서 맞추기' | '빈칸 채우기' | '절차 보고 쓰기' | '백지에서'

export type TranslateProblem = {
  key: string
  /** 0은 예제 */
  no: number
  mode: TranslateMode
  /** 지난 수업 계단에서 이 연습이 채우는 칸 */
  stair: string
  title: string
  situation: string
  /** 화면에 놓을 칸 */
  screen: string
  related: { label: string; text: string }
  take: string[]
  show: string
  bowls: Bowl[]
  /** 함수 밖에 두는 줄. 버튼을 여러 번 눌러도 남아 있어야 하는 그릇 */
  before?: TranslateLine
  head: string[]
  lines: TranslateLine[]
  checks: Array<{ input: string; expect: string }>
  insight: string
}

export const LATTE: TranslateProblem = {
  key: 'latte',
  no: 0,
  mode: '예제',
  stair: '계단 4 · 5 시범',
  title: '라떼는 몇 잔까지 만들 수 있을까',
  situation: '라떼 한 잔에는 우유 1개와 샷 2개가 필요합니다. 우유와 샷 개수를 넣고 버튼을 누르면 최대 몇 잔인지 보여줍니다.',
  screen: '우유 칸 · 샷 칸 · 계산 버튼 · 결과 네모',
  related: {
    label: '지난 수업에서 만든 한글 규칙',
    text: '우유가 허용하는 잔 수와 샷이 허용하는 잔 수를 각각 구한다. 라떼에는 둘 다 필요하므로 두 수 중 작은 값이 최대 잔 수다.',
  },
  take: ['우유 개수', '샷 개수'],
  show: '최대 잔 수',
  bowls: [
    { name: 'milk · shot', start: '칸에서 꺼낸 숫자', meaning: '가진 재료 개수' },
    { name: 'byMilk', start: '우유 ÷ 1의 몫', meaning: '우유만 보면 만들 수 있는 잔 수' },
    { name: 'byShot', start: '샷 ÷ 2의 몫', meaning: '샷만 보면 만들 수 있는 잔 수' },
    { name: 'cups', start: '둘 중 작은 값', meaning: '최대 잔 수' },
  ],
  head: ['function maxCups() {'],
  lines: [
    {
      say: '우유 개수와 샷 개수를 숫자로 가져온다',
      cards: [1, 5],
      code: [
        "const milk = Number(document.getElementById('milk').value);",
        "const shot = Number(document.getElementById('shot').value);",
      ],
    },
    { say: '우유로 만들 수 있는 잔 수를 구한다', cards: [], tag: '내장함수 Math.floor', code: ['const byMilk = Math.floor(milk / 1);'] },
    { say: '샷으로 만들 수 있는 잔 수를 구한다', cards: [], tag: '내장함수 Math.floor', code: ['const byShot = Math.floor(shot / 2);'] },
    { say: '두 수 중 작은 값을 최대 잔 수로 정한다', cards: [], tag: '내장함수 Math.min', code: ['const cups = Math.min(byMilk, byShot);'] },
    { say: '결과를 보여준다', cards: [2], code: ["document.getElementById('result').innerHTML = '최대 ' + cups + '잔';"] },
  ],
  checks: [
    { input: '우유 3 · 샷 20', expect: '최대 3잔' },
    { input: '우유 10 · 샷 5', expect: '최대 2잔 · 이번엔 샷이 모자람' },
    { input: '우유 0 · 샷 100', expect: '최대 0잔' },
    { input: '우유 5 · 샷 3', expect: '최대 1잔 · 샷 3개로는 한 잔뿐' },
  ],
  insight: '지난번 규칙의 두 문장이 코드 세 줄이 됐습니다. ‘각각 구한다’가 2 · 3번 두 줄, ‘작은 값’이 4번 한 줄입니다.',
}

export const MOVIE: TranslateProblem = {
  key: 'movie',
  no: 1,
  mode: '순서 맞추기',
  stair: '계단 5 · 한 단계를 한 줄로',
  title: '영화표 가격을 코드로',
  situation: '8세 미만은 무료, 8~18세는 8,000원, 성인은 12,000원입니다. 18시 이후 유료표는 2,000원을 할인합니다.',
  screen: '나이 칸 · 입장 시각 칸 · 가격 보기 버튼 · 결과 네모',
  related: {
    label: '지난 수업에서 만든 한글 규칙',
    text: '먼저 나이로 기본 가격을 하나 결정한다. 그 가격이 0보다 크고 18시 이후라면 2,000원을 뺀다.',
  },
  take: ['나이', '입장 시각(시)'],
  show: '가격',
  bowls: [{ name: 'price', start: '아직 정하지 않음', meaning: '지금까지 정해진 가격' }],
  head: ['function ticketPrice() {'],
  lines: [
    {
      say: '나이와 입장 시각을 숫자로 가져온다',
      cards: [1, 5],
      code: [
        "const age = Number(document.getElementById('age').value);",
        "const hour = Number(document.getElementById('hour').value);",
      ],
    },
    {
      say: '나이로 기본 가격을 하나 정한다',
      cards: [],
      tag: 'if · else if · else',
      code: [
        'let price;',
        'if (age < 8) {',
        '  price = 0;',
        '} else if (age <= 18) {',
        '  price = 8000;',
        '} else {',
        '  price = 12000;',
        '}',
      ],
    },
    {
      say: '18시 이후이고 유료표이면 2,000원을 뺀다',
      cards: [],
      tag: '그리고 &&',
      code: ['if (hour >= 18 && price > 0) {', '  price = price - 2000;', '}'],
    },
    { say: '가격을 보여준다', cards: [2], code: ["document.getElementById('result').innerHTML = price + '원';"] },
  ],
  checks: [
    { input: '16세 · 19시', expect: '6000원' },
    { input: '7세 · 20시', expect: '0원 · 무료표는 할인하지 않음' },
    { input: '19세 · 18시', expect: '10000원 · 18시 정각도 할인' },
    { input: '18세 · 17시', expect: '8000원 · 18세는 청소년' },
  ],
  insight: '순서가 바뀌면 답이 깨집니다. 할인을 기본 가격보다 먼저 두면, 아직 정하지 않은 가격에서 2,000원을 빼서 NaN원이 나옵니다.',
}

/** 영화표 순서 맞추기 조각. 보여주는 순서는 일부러 섞었고, 함정 조각 하나는 쓰지 않는다 */
export const MOVIE_PIECES = [
  { label: 'ㄱ', code: MOVIE.lines[3].code },
  { label: 'ㄴ', code: MOVIE.lines[2].code },
  { label: 'ㄷ', code: MOVIE.lines[0].code },
  { label: 'ㄹ', code: ['if (hour >= 18) {', '  price = price - 2000;', '}'] },
  { label: 'ㅁ', code: MOVIE.lines[1].code },
]
export const MOVIE_ORDER = ['ㄷ', 'ㅁ', 'ㄴ', 'ㄱ']
export const MOVIE_TRAP = {
  label: 'ㄹ',
  why: '유료표인지 묻지 않습니다. 7세가 20시에 오면 0원에서 2,000원을 빼서 -2000원이 됩니다.',
}

export const MENU: TranslateProblem = {
  key: 'menu',
  no: 2,
  mode: '빈칸 채우기',
  stair: '계단 3 · 5',
  title: '체크한 메뉴의 합계',
  situation: '분식 메뉴 네 개에 체크박스가 있습니다. 체크한 메뉴의 가격을 모두 더해 합계를 보여줍니다.',
  screen: '체크박스 네 개(name="menu", value에 가격) · 합계 보기 버튼 · 결과 네모',
  related: {
    label: '1부에서 푼 닮은 문제',
    text: '카테고리 선택 버튼 · 칸을 전부 모으고, 하나씩 보면서 체크된 칸이면 이름을 결과 그릇 뒤에 붙인다.',
  },
  take: ['메뉴 체크박스 네 개'],
  show: '합계',
  bowls: [{ name: 'sum', start: '0', meaning: '지금까지 본 메뉴 중 체크된 것의 가격 합' }],
  head: ['function total() {'],
  lines: [
    { say: '메뉴 칸을 전부 모은다', cards: [6], code: ["const menus = document.getElementsByName('menu');"] },
    { say: '합계 그릇을 0원으로 시작한다', cards: [7], code: ['let sum = 0;'] },
    {
      say: '하나씩 보면서 체크된 메뉴면 가격을 숫자로 바꿔 더한다',
      cards: [6, 7, 5],
      code: [
        'for (let i = 0; i < menus.length; i++) {',
        '  if (menus[i].checked) {',
        '    sum += Number(menus[i].value);',
        '  }',
        '}',
      ],
    },
    { say: '합계를 보여준다', cards: [2], code: ["document.getElementById('result').innerHTML = '합계 ' + sum + '원';"] },
  ],
  checks: [
    { input: '아무것도 안 고름', expect: '합계 0원' },
    { input: '떡볶이 · 김밥', expect: '합계 7500원' },
    { input: '네 개 전부', expect: '합계 15000원' },
  ],
  insight: "(다)에서 Number를 빼면 0 + '4000'이 '04000'이 됩니다. 숫자에 글자를 더하면 이어 붙이기가 됩니다.",
}

/** 빈칸이 뚫린 코드. [[가]]가 빈칸 자리다 */
export const MENU_BLANK_CODE = [
  'function total() {',
  "  const menus = document.getElementsByName('menu');",
  '  let sum = [[가]];',
  '  for (let i = 0; i < menus.length; i++) {',
  '    if ([[나]]) {',
  '      sum += [[다]];',
  '    }',
  '  }',
  "  document.getElementById('result').innerHTML = '합계 ' + sum + '원';",
  '}',
]
export const MENU_BLANKS = [
  { mark: '가', hint: '아무것도 고르지 않았을 때의 합계', answer: '0' },
  { mark: '나', hint: '지금 보는 칸이 체크됐는가', answer: 'menus[i].checked' },
  { mark: '다', hint: '지금 보는 칸의 가격 · 글자일까 숫자일까', answer: 'Number(menus[i].value)' },
]

export const STOCK: TranslateProblem = {
  key: 'stock',
  no: 3,
  mode: '절차 보고 쓰기',
  stair: '계단 5',
  title: '재고보다 많은 주문은 거절하기',
  situation:
    '떡볶이 재고가 7개 있습니다. 주문 수량을 넣고 버튼을 누를 때마다 재고가 줄어듭니다. 1개보다 적거나 재고보다 많은 주문은 거절하고 재고를 그대로 둡니다.',
  screen: '남은 재고 글자 · 주문 수량 칸 · 주문 버튼',
  related: {
    label: '지난 수업에서 만든 한글 규칙',
    text: '먼저 주문 수량이 1 이상이고 재고 이하인지 확인한다. 유효할 때만 재고에서 빼고, 아니면 기존 재고를 그대로 둔다.',
  },
  take: ['주문 수량'],
  show: '남은 재고',
  bowls: [{ name: 'stock', start: '7', meaning: '지금 남은 재고 · 함수 밖에 둔다' }],
  before: {
    say: '재고를 7개로 기억해 둔다 · 함수 밖에',
    cards: [7],
    code: ['let stock = 7;'],
  },
  head: ['function order() {'],
  lines: [
    { say: '주문 수량을 숫자로 가져온다', cards: [1, 5], code: ["const count = Number(document.getElementById('count').value);"] },
    {
      say: '1개보다 적으면 알리고 멈춘다',
      cards: [8],
      code: ['if (count < 1) {', "  alert('1개 이상 주문해 주세요');", '  return;', '}'],
    },
    {
      say: '재고보다 많으면 알리고 멈춘다',
      cards: [8],
      code: ['if (count > stock) {', "  alert('재고가 부족합니다');", '  return;', '}'],
    },
    { say: '재고에서 주문 수량을 뺀다', cards: [], tag: '그릇 바꾸기', code: ['stock = stock - count;'] },
    { say: '남은 재고를 보여준다', cards: [2], code: ["document.getElementById('stock').innerHTML = '남은 재고 ' + stock + '개';"] },
  ],
  checks: [
    { input: '7개 남았을 때 8개', expect: '재고가 부족합니다 · 그대로 7개' },
    { input: '0개', expect: '1개 이상 주문해 주세요' },
    { input: '3개 → 다시 3개', expect: '4개 → 1개' },
    { input: '1개 남았을 때 3개', expect: '재고가 부족합니다 · 그대로 1개' },
  ],
  insight: 'let stock = 7;을 함수 안에 쓰면 누를 때마다 7개로 돌아갑니다. 그릇을 어디에 두느냐가 그 값을 얼마나 오래 기억하느냐를 정합니다.',
}

export const ATTEND: TranslateProblem = {
  key: 'attend',
  no: 4,
  mode: '백지에서',
  stair: '계단 4 · 5 · 6',
  title: '실제 출석 인원은 몇 명일까',
  situation: 'QR 출석은 한 사람이 여러 번 찍을 수 있습니다. 같은 학번은 한 명으로 칩니다. 버튼을 누르면 실제 출석 인원을 보여줍니다.',
  screen: '인원 세기 버튼 · 결과 네모 · 스캔 기록은 코드 안의 배열',
  related: {
    label: '지난 수업에서 만든 한글 규칙',
    text: '목록을 순서대로 보되 처음 등장한 학번만 새 사람으로 센다. 이미 본 학번은 무시하고 서로 다른 학번의 수를 답한다.',
  },
  take: ['스캔 기록 A01, B02, A01, C03, B02'],
  show: '출석 인원',
  bowls: [{ name: 'seen', start: '[] 빈 목록', meaning: '지금까지 본 스캔 중 서로 다른 학번들' }],
  head: ['function countAttend() {'],
  lines: [
    { say: '스캔 기록을 준비한다', cards: [], tag: '배열', code: ["const scans = ['A01', 'B02', 'A01', 'C03', 'B02'];"] },
    { say: '이미 본 학번을 담을 빈 목록을 만든다', cards: [7], code: ['let seen = [];'] },
    {
      say: '하나씩 보면서 본 목록에 없는 학번이면 본 목록에 넣는다',
      cards: [6, 7],
      tag: 'indexOf · push',
      code: [
        'for (let i = 0; i < scans.length; i++) {',
        '  if (seen.indexOf(scans[i]) == -1) {',
        '    seen.push(scans[i]);',
        '  }',
        '}',
      ],
    },
    { say: '본 목록의 길이를 출석 인원으로 보여준다', cards: [2], code: ["document.getElementById('result').innerHTML = '출석 ' + seen.length + '명';"] },
  ],
  checks: [
    { input: 'A01 B02 A01 C03 B02', expect: '3명' },
    { input: 'A01 A01 A01', expect: '1명' },
    { input: '빈 기록 []', expect: '0명' },
  ],
  insight: '숫자 그릇 하나로는 ‘이미 본 학번인지’를 알 수 없습니다. 그래서 그릇에 숫자 대신 본 학번 목록을 통째로 담습니다.',
}

/** 백지 문제에서 막힐 때 하나씩 여는 힌트 */
export const ATTEND_HINTS = [
  '그릇부터 정합니다. 사람 수 하나만 기억하면 이미 본 학번인지 알 수 있을까요?',
  '‘목록에 없으면’은 목록.indexOf(값) == -1 입니다.',
  '‘목록에 넣는다’는 목록.push(값) 입니다. 마지막에 목록.length가 인원입니다.',
]

/** 옮기는 다섯 단계. 지난 수업의 도구 넷이 각각 어느 단계에 쓰이는지 붙여 둔다 */
export const FIVE_STEPS = [
  { no: '1', head: '꺼낼 것과 보여줄 것', detail: '화면의 칸을 보고 정합니다. 함수의 맨 위와 맨 아래가 됩니다', tool: '카드 1 · 2' },
  { no: '2', head: '기억할 그릇', detail: '그릇마다 이름, 처음 값, 뜻 한 문장을 적습니다', tool: '도구 3 · 그릇의 뜻' },
  { no: '3', head: '한글 절차', detail: '한 줄에 동작 하나만 두고, 줄마다 동사로 끝냅니다', tool: '도구 1 · 2 · 분해와 경우 나누기' },
  { no: '4', head: '줄마다 카드', detail: '절차를 주석으로 쓰고, 그 아래에 맞는 카드를 붙입니다', tool: '말 → 코드 사전' },
  { no: '5', head: '작은 경우로 확인', detail: '0, 하나, 경계 값을 머릿속으로 넣어 봅니다', tool: '도구 4 · 작은 경우' },
]

/** 한글 절차에 자주 나오는 말과 그 말을 옮긴 코드 */
export const DICTIONARY = [
  { say: '~칸의 값을 가져온다', code: "document.getElementById('id').value", from: '카드 1' },
  { say: '숫자로 계산한다', code: 'Number(값)', from: '카드 5' },
  { say: '처음에는 ~로 둔다', code: 'let 그릇 = 처음값;', from: '카드 7' },
  { say: '만약 ~이면 · 아니고 ~이면 · 나머지는', code: 'if () {} else if () {} else {}', from: '자바와 같음' },
  { say: '~이고 · ~이거나', code: '&&   ||', from: '자바와 같음' },
  { say: '하나씩 전부', code: 'for (let i = 0; i < 목록.length; i++)', from: '카드 6' },
  { say: '~에 더한다 · 뒤에 붙인다', code: '그릇 += 값;', from: '카드 7' },
  { say: '~이면 알리고 멈춘다', code: "if () { alert('…'); return; }", from: '카드 8' },
  { say: '나눈 몫 · 둘 중 작은 값', code: 'Math.floor(a / b)   Math.min(a, b)', from: '내장함수' },
  { say: '목록에 없으면 · 목록에 넣는다', code: '목록.indexOf(값) == -1   목록.push(값)', from: '배열 메소드' },
  { say: '~에 보여준다', code: '네모.innerHTML = 글자;', from: '카드 2' },
]

/** 함수 껍데기. 위아래는 매번 같고 가운데만 생각한다 */
export const SHELL_COMMENTS = [
  'function 이름() {',
  '  // 1. 칸에서 값을 가져온다',
  '  // 2. (여기서부터 생각한다)',
  '  // 3. (한 줄에 동작 하나)',
  '  // 4. 결과를 보여준다',
  '}',
]
export const SHELL_FILLED = [
  'function 이름() {',
  '  // 1. 칸에서 값을 가져온다',
  '  const n = Number(입력칸.value);',
  '  // 2. (여기서부터 생각한다)',
  '  …',
  '  // 3. (한 줄에 동작 하나)',
  '  …',
  '  // 4. 결과를 보여준다',
  '  네모.innerHTML = 답;',
  '}',
]
