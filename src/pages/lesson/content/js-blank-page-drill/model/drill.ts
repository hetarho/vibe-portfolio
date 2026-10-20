import problemsSource from '../../../../../../html-practice/drill/problems.js?raw'

/**
 * 학생이 여는 실습 파일(html-practice/drill/)이 원본이다.
 * 덱에 사본을 두면 한쪽만 고쳐지는 순간 수업 화면과 학생 파일이 달라지므로,
 * 문제 설명 · 정답 · 작은 경우는 problems.js를, Step마다의 코드는 step1~5.html을 그대로 읽는다.
 */
const stepFiles = import.meta.glob('../../../../../../html-practice/drill/*/step*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

type DrillCase = {
  label: string
  expect?: string
  expectAlert?: string
  expectLi?: { id: string; n: number }
  attr?: { id: string; name: string; has: string }
}

type DrillSource = {
  no: string
  folder: string
  period: string
  title: string
  fn: string
  desc: string[]
  answer?: string
  cases: DrillCase[]
}

/**
 * problems.js는 브라우저에서 window.DRILL_PROBLEMS를 채우는 스크립트다.
 * 같은 파일을 빈 window 하나에 실행해서 값만 꺼낸다. 우리 저장소의 고정 파일이라 바깥 입력은 들어오지 않는다.
 */
function loadSources() {
  const sandbox: { DRILL_PROBLEMS?: Record<string, DrillSource>; DRILL_ORDER?: string[] } = {}
  new Function('window', problemsSource)(sandbox)
  if (!sandbox.DRILL_PROBLEMS || !sandbox.DRILL_ORDER) throw new Error('html-practice/drill/problems.js를 읽지 못했습니다')
  return { problems: sandbox.DRILL_PROBLEMS, order: sandbox.DRILL_ORDER }
}

const SOURCES = loadSources()

/** step 파일에서 학생이 고치는 script 안쪽만 꺼내 들여쓰기를 걷어 낸다 */
function scriptLines(html: string) {
  const inline = [...html.matchAll(/<script>\n([\s\S]*?)<\/script>/g)]
  const body = inline.length > 0 ? inline[inline.length - 1][1] : ''
  // 파일에는 칠 자리로 빈 줄을 두 줄씩 두었다. 화면에서는 한 줄로 줄여 세로를 아낀다
  const lines = body
    .split('\n')
    .map((line) => line.replace(/^ {4}/, '').trimEnd())
    .filter((line, index, all) => !(line === '' && all[index - 1] === ''))
  while (lines.length > 0 && lines[0] === '') lines.shift()
  while (lines.length > 0 && lines[lines.length - 1] === '') lines.pop()
  return lines
}

function stepsOf(folder: string) {
  return [1, 2, 3, 4, 5].map((step) => {
    const key = Object.keys(stepFiles).find((path) => path.endsWith(`/${folder}/step${step}.html`))
    if (!key) throw new Error(`실습 파일을 찾지 못했습니다: ${folder}/step${step}.html`)
    return scriptLines(stepFiles[key])
  })
}

/** 막히는 곳 하나 · 화면에 보이는 증상과, 답 대신 던질 질문 */
export type Stuck = { mistake: string; seen: string; ask: string }

/** 실습 파일에는 없고 수업에서만 쓰는 것. 문제마다 새로 나오는 문법과 자주 막히는 곳 */
const EXTRA: Record<string, { focus: string; stuck: Stuck[] }> = {
  greeting: {
    focus: 'if / else 한 번',
    stuck: [
      { mistake: '.value를 뺐다', seen: '[object HTMLInputElement]님, 반갑습니다!', ask: '칸을 꺼냈어, 칸에 적힌 글자를 꺼냈어?' },
      { mistake: '== 대신 = 하나', seen: '이름을 비워도 "님, 반갑습니다!"', ask: '같은지 묻는 기호는 몇 개짜리였지?' },
    ],
  },
  candy: {
    focus: '숫자로 바꾸기 · 몫과 나머지',
    stuck: [
      { mistake: '/ 와 % 를 바꿔 썼다', seen: '4명 · 13개에 "1인당 1개, 남은 사탕 3.25개"', ask: '나눈 몫은 어느 기호, 나머지는 어느 기호?' },
      { mistake: '< 대신 >', seen: '제대로 넣어도 "1명 이상 넣어 주세요"', ask: '1보다 적다는 기호는 어느 쪽으로 벌어져?' },
    ],
  },
  login: {
    focus: 'else if 세 번 · 그리고(&&)',
    stuck: [
      { mistake: '&& 대신 ||', seen: 'guest / 1234가 환영받는다', ask: '둘 다 맞아야 해, 하나만 맞아도 돼?' },
      { mistake: 'else if 대신 if를 새로 시작', seen: '둘 다 비웠는데 "비밀번호를 입력해주세요"', ask: '앞에서 걸렸으면 뒤의 확인도 해야 해?' },
    ],
  },
  stock: {
    focus: '함수 밖 그릇 · else if',
    stuck: [
      { mistake: 'let stock = 7을 함수 안에', seen: '3개씩 두 번 주문해도 계속 "남은 재고 4개"', ask: '누를 때마다 처음 값으로 돌아가는 그릇이 어디 있어?' },
      { mistake: 'const stock = 7', seen: '빨간 상자 · const로 만든 그릇은 값을 바꿀 수 없습니다', ask: '이 그릇은 나중에 값이 바뀌어? 그럼 let이야, const야?' },
    ],
  },
  candyRow: {
    focus: 'for로 개수만큼 · 그릇에 붙이기',
    stuck: [
      { mistake: 'i < count 대신 i <= count', seen: '5를 넣었는데 사탕이 6개', ask: '0부터 세면 몇에서 멈춰야 다섯 번이야?' },
      { mistake: 'let html = \'\'을 for 안에', seen: '빨간 상자 · "html"라는 이름을 찾을 수 없습니다', ask: '그릇의 처음 값은 언제 한 번만 정해야 해?' },
    ],
  },
  scan: {
    focus: '목록 돌기 + if + 세기',
    stuck: [
      { mistake: 'html += 대신 html =', seen: '기록이 마지막 B02 하나만 보인다', ask: '뒤에 붙이는 거야, 바꿔 끼우는 거야?' },
      { mistake: '== 대신 = 하나', seen: '기록 다섯 개가 전부 노랗게', ask: '같은지 묻는 기호는 몇 개짜리였지?' },
    ],
  },
}

export type DrillProblem = DrillSource & {
  id: string
  focus: string
  stuck: Stuck[]
  /** 학생 파일의 script 안쪽. 0번이 Step 1 */
  steps: string[][]
  answerLines: string[]
}

/** 다섯 Step으로 푸는 문제들. 4교시 장바구니는 Step 없이 조립 한 번이라 따로 둔다 */
export const DRILLS: DrillProblem[] = SOURCES.order
  .filter((id) => EXTRA[id])
  .map((id) => {
    const source = SOURCES.problems[id]
    return {
      ...source,
      id,
      ...EXTRA[id],
      steps: stepsOf(source.folder),
      answerLines: (source.answer ?? '').split('\n'),
    }
  })

export const CART = SOURCES.problems.cart

export function drillOf(id: string) {
  const problem = DRILLS.find((item) => item.id === id)
  if (!problem) throw new Error(`문제를 찾지 못했습니다: ${id}`)
  return problem
}

/** 「채점하기」가 넣어 보는 값을 화면용 한 줄로 */
export function caseExpect(item: DrillCase) {
  const parts: string[] = []
  if (item.expectAlert) parts.push(`알림 "${item.expectAlert}"`)
  if (item.expect) parts.push(item.expect)
  if (item.expectLi && !item.expect) parts.push(`li ${item.expectLi.n}개`)
  if (item.attr) parts.push(`${item.attr.name}="${item.attr.has}"`)
  return parts.join(' · ')
}

/** Step 이름과 그 Step에서 학생 파일에 남아 있는 것 */
export const STEPS = [
  { no: 1, name: '보고 똑같이 치기', given: '오른쪽 화면에 정답 · 복사는 막혀 있음', hand: '한 글자씩 똑같이 친다' },
  { no: 2, name: '값과 연산자만 바꾸기', given: '완성 코드 · 값과 연산자 자리만 ___', hand: '___만 바꾼다' },
  { no: 3, name: '주석 보고 껍데기 채우기', given: 'if 껍데기 + 한국어 주석', hand: '주석 아래에 코드를 쓴다' },
  { no: 4, name: '주석으로 뼈대 세우기', given: '한국어 주석 3~4줄만', hand: '껍데기부터 치고 주석을 안으로 옮긴다' },
  { no: 5, name: '완전 백지', given: '아무것도 없음', hand: '주석 → 껍데기 → 빈칸 순서로' },
]

/** 타자 연습장(00-blank.html)의 패턴 네 개. 연습장 화면의 본보기와 같은 글자다 */
export const SHELLS = [
  { key: 'A', name: 'if-else 껍데기', when: '모든 조건문의 시작', lines: ['if () {', '', '} else {', '', '}'] },
  {
    key: 'B',
    name: '값 가져오기 + 조건문',
    when: '칸에서 꺼내 그릇에 담고 갈림길',
    lines: ["const value = document.getElementById('').value;", '', 'if () {', '', '} else {', '', '}'],
  },
  {
    key: 'C',
    name: '함수 + 조건문',
    when: '버튼이 부를 함수 안에 B',
    lines: ['function run() {', "  const value = document.getElementById('').value;", '', '  if () {', '', '  } else {', '', '  }', '}'],
  },
  { key: 'D', name: 'for 반복문 껍데기', when: '3교시 · 몇 번 돌지는 i < 뒤에', lines: ['for (let i = 0; i < ; i++) {', '', '}'] },
]

/** 교시마다 손풀기 패턴, 푸는 문제, 시간표. TEACHING_GUIDE_4HOURS.md의 표와 같은 순서다 */
export const PERIODS = [
  {
    no: 1,
    title: 'if / else 껍데기 손에 익히기',
    shells: ['A', 'B', 'C'],
    problems: ['greeting', 'candy'],
    plan: [
      { time: '0~10분', what: '타자 연습장 · 패턴 A, B, C 다섯 판씩' },
      { time: '10~35분', what: '01 인사하기 · Step 1 → 5' },
      { time: '35~55분', what: '02 사탕 나누기 · Step 1 → 5' },
      { time: '55~60분', what: 'Step 5를 몇 분 만에 통과했는지 같이 보기' },
    ],
  },
  {
    no: 2,
    title: 'else if 여러 갈래',
    shells: ['C'],
    problems: ['login', 'stock'],
    plan: [
      { time: '0~5분', what: '타자 연습장 · 패턴 C 다섯 판 (1교시 기록과 비교)' },
      { time: '5~30분', what: '03 로그인 · Step 1 → 5' },
      { time: '30~55분', what: '04 재고 주문 · Step 1 → 5' },
      { time: '55~60분', what: '01 인사하기 Step 5만 다시' },
    ],
  },
  {
    no: 3,
    title: 'for 반복문 공포증 깨기',
    shells: ['D'],
    problems: ['candyRow', 'scan'],
    plan: [
      { time: '0~10분', what: '타자 연습장 · 패턴 D 다섯 판' },
      { time: '10~35분', what: '05 사탕 쏙쏙 · Step 1 → 5' },
      { time: '35~55분', what: '06 스캔 기록 · Step 1 → 4' },
      { time: '55~60분', what: '사탕 쏙쏙 도전 · i를 넣으면 몇부터 나올까' },
    ],
  },
  {
    no: 4,
    title: '미니 프로젝트 조립',
    shells: ['C', 'D'],
    problems: [],
    plan: [
      { time: '0~5분', what: '타자 연습장 · 패턴 C, D 다섯 판씩' },
      { time: '5~15분', what: '장바구니를 눌러 보고 빈칸 개수 세기' },
      { time: '15~45분', what: '조립 순서 ①~④ · 하나 채울 때마다 저장하고 누르기' },
      { time: '45~60분', what: 'clearCart를 직접 쓰고 채점하기' },
    ],
  },
]

/** 4교시 장바구니의 빈칸. cart.html의 빈칸_가~아와 answers/cart.html의 같은 줄이다 */
export const CART_BLANKS = [
  { mark: '가', where: '「담기」 버튼', group: '이벤트 연결', hint: '누르면 어떤 함수가 실행되나요?', answer: 'addItem()' },
  { mark: '나', where: '「비우기」 버튼', group: '이벤트 연결', hint: '누르면 어떤 함수가 실행되나요?', answer: 'clearCart()' },
  { mark: '다', where: 'addItem 2번', group: '에러 처리', hint: '언제 알리고 멈춰야 하나요?', answer: 'qty < 1' },
  { mark: '라', where: 'addItem 3번', group: '계산', hint: '김밥 가격', answer: '3500' },
  { mark: '마', where: 'addItem 3번', group: '계산', hint: '5000원인 메뉴는?', answer: "menu == '라면'" },
  { mark: '바', where: 'addItem 4번', group: '계산', hint: '금액은 가격 × 수량', answer: 'price * qty' },
  { mark: '사', where: 'addItem 4번', group: '계산', hint: '지금 총액에 금액을 더한 값', answer: 'total + amount' },
  { mark: '아', where: 'addItem 6번', group: '출력', hint: '언제 배달비가 무료인가요?', answer: 'total >= 20000' },
]

export const CART_STUCK: Stuck[] = [
  { mistake: '버튼에 onclick을 안 걸었다', seen: '눌러도 아무 일 없음 · 채점 첫 줄 ✘', ask: '버튼을 누르면 어떤 함수가 실행돼?' },
  { mistake: 'return을 뺐다', seen: '0개를 담으면 알림 뒤에 "라면 × 0 = 0원"이 목록에 붙는다', ask: '알림 뒤에 어디까지 실행돼?' },
  { mistake: 'let total = 0을 함수 안에', seen: '담을 때마다 총액이 그 메뉴 값으로 돌아간다', ask: '총액 그릇이 함수 안에 있으면 두 번째 누를 때 어떻게 돼?' },
]

export const CLEAR_CART = ['function clearCart() {', '  total = 0;', "  document.getElementById('list').innerHTML = '';", "  document.getElementById('result').innerHTML = '총액 0원';", '}']
