/**
 * 이 덱은 처음부터 끝까지 같은 코드 한 덩어리를 읽는다.
 * 배송비 계산 함수 → 그 함수를 고친 PR diff → 그 함수에서 터진 에러까지 이어져야
 * “읽는 법”이 화면마다 처음부터 다시 시작되지 않는다.
 * 실제 커머스 스펙에서 흔한 규칙(무료배송 기준·대형 상품 추가비)을 골랐다.
 */

export type CodeLine = {
  /** 화면에 그대로 보이는 코드 한 줄 — 들여쓰기 포함 */
  code: string
  /** 이 줄을 한국어로 옮기면. 비어 있으면 읽을 게 없는 줄(닫는 괄호)이라 클릭되지 않는다 */
  plain?: string
  /** PM이 이 줄에서 물어야 하는 것 */
  ask?: string
  /** 강사가 반드시 짚고 가는 줄 */
  pivotal?: boolean
}

/** R7. 한 줄씩 읽는 첫 함수 — 조건만 들어 있다 */
export const SHIPPING_FN: CodeLine[] = [
  {
    code: 'function getShippingFee(cart, user) {',
    plain: '배송비를 계산하는 일에 getShippingFee라는 이름을 붙였어요. 재료는 cart(장바구니)와 user(사용자) 둘.',
    ask: '재료에 없는 건 이 함수가 모릅니다. 배송 지역은 여기서 정해지지 않아요.',
  },
  {
    code: '  if (user.isMember && cart.total >= 50000) {',
    plain: '회원이고(&&) 장바구니 합계가 50,000원 이상이면.',
    ask: '&&는 “둘 다”. 비회원의 50,000원은 이 조건에 안 걸려서 아래로 내려가요.',
  },
  {
    code: '    return 0',
    plain: '배송비 0원으로 끝. return은 “여기서 끝”이라 아래 줄은 아예 실행되지 않아요.',
    ask: '조건이 적힌 순서가 곧 정책의 우선순위예요.',
    pivotal: true,
  },
  { code: '  }' },
  {
    code: '  if (cart.hasOversizedItem) {',
    plain: '대형 상품이 하나라도 담겨 있으면.',
    ask: '이 조건이 위 조건보다 아래에 있어요. 회원이 50,000원 넘게 담으면 대형 상품이어도 무료입니다 — 스펙에 있었나요?',
    pivotal: true,
  },
  {
    code: '    return 8000',
    plain: '배송비 8,000원.',
    ask: '숫자가 코드에 그대로 박혀 있으면, 바꿀 때마다 개발자를 불러야 해요.',
  },
  { code: '  }' },
  {
    code: '  return cart.total >= 30000 ? 0 : 3000',
    plain: '30,000원 이상이면 0원, 아니면 3,000원. “조건 ? 맞을 때 : 아닐 때” 형태예요.',
    ask: '위 두 조건에 안 걸린 모든 경우가 여기로 와요 — 사실상 비회원 기본 규칙이에요.',
  },
  { code: '}' },
]

/**
 * R8. 앞 함수가 쓰던 cart.total이 만들어지는 곳.
 * 조건만 있는 R7 다음에 반복문을 붙여, 같은 장바구니를 계속 읽게 한다.
 */
export const CART_TOTAL_FN: CodeLine[] = [
  {
    code: 'function getCartTotal(items) {',
    plain: '장바구니 합계를 구하는 일. 재료는 담긴 상품 목록(items) 하나예요.',
    ask: '아까 함수가 쓰던 cart.total이 여기서 만들어져요. 두 함수가 이렇게 이어져요.',
  },
  {
    code: '  let total = 0',
    plain: '합계를 담을 상자를 0으로 시작해요.',
    ask: 'let은 앞으로 바뀔 값, const는 안 바뀌는 값이에요.',
  },
  {
    code: '  for (const item of items) {',
    plain: '담긴 상품을 하나씩 꺼내서 아래 줄을 반복해요.',
    ask: '상품이 30개면 아래 두 줄이 30번 돌아요. 목록이 커지면 느려지는 자리가 여기예요.',
    pivotal: true,
  },
  {
    code: '    if (item.isGift) continue',
    plain: '사은품이면 건너뛰어요. continue는 "이번 것은 그만두고 다음 상품으로".',
    ask: '사은품 가격은 합계에 안 들어가요 → 무료배송 50,000원 기준에도 안 들어갑니다. 스펙에 있었나요?',
    pivotal: true,
  },
  {
    code: '    total += item.price * item.quantity',
    plain: '가격 × 수량을 합계에 더해요. +=는 "기존 값에 더하기".',
    ask: '수량(quantity)을 빼먹고 짜면 몇 개를 담아도 한 개 값만 더해져요.',
  },
  { code: '  }' },
  {
    code: '  return total',
    plain: '다 더한 합계를 돌려줘요. 이 값이 앞 함수의 cart.total이에요.',
  },
  { code: '}' },
]

/** R9. 스펙에 있던 숫자 — 두 함수에 박혀 있는 값 */
export const SPEC_VALUES = [
  { value: '50,000', label: '회원 무료배송 기준' },
  { value: '8,000', label: '대형 상품 배송비' },
  { value: '30,000', label: '비회원 무료배송 기준' },
]

/** R9. 스펙에 없었는데 코드가 정해버린 것 */
export const CODE_DECISIONS = [
  {
    where: '조건의 순서',
    line: 'if (user.isMember && cart.total >= 50000)가 먼저',
    result: '회원이 50,000원 넘게 담으면 대형 상품이어도 배송비가 0원이에요.',
  },
  {
    where: 'continue 한 줄',
    line: 'if (item.isGift) continue',
    result: '사은품 가격은 합계에서 빠져서, 무료배송 기준 금액에도 안 들어가요.',
  },
]

export type DiffLine = {
  kind: 'context' | 'add' | 'remove'
  code: string
  /** 3단계(숫자·조건이 바뀐 줄)에서 강조할 줄 */
  policy?: boolean
}

/** R11. 같은 함수를 고친 PR의 diff */
export const SHIPPING_DIFF: DiffLine[] = [
  { kind: 'context', code: ' function getShippingFee(cart, user) {' },
  { kind: 'remove', code: '-  if (user.isMember && cart.total >= 50000) {', policy: true },
  { kind: 'add', code: '+  if (user.isMember && cart.total >= 30000) {', policy: true },
  { kind: 'context', code: '     return 0' },
  { kind: 'context', code: '   }' },
  { kind: 'remove', code: '-  if (cart.hasOversizedItem) {', policy: true },
  { kind: 'add', code: '+  if (cart.hasOversizedItem && !user.isMember) {', policy: true },
  { kind: 'context', code: '     return 8000' },
  { kind: 'context', code: '   }' },
]

/** R11. diff를 읽는 순서 — 단계를 누르면 diff에서 볼 곳이 바뀐다 */
export const DIFF_STEPS = [
  {
    title: '파일 이름',
    look: 'src/checkout/shipping.js',
    read: '배송비 규칙이 사는 파일이에요. 결제 화면 전체가 아니라 계산 한 곳만 바뀌었어요.',
  },
  {
    title: '- 와 + 짝',
    look: '-  ... 50000     +  ... 30000',
    read: '지워진 줄과 새로 들어온 줄을 짝으로 봐요. 같은 줄이 두 번 나오면 그 줄이 고쳐진 거예요.',
  },
  {
    title: '숫자와 조건',
    look: '50000 → 30000  ·  && !user.isMember 추가',
    read: '회원 무료배송 기준이 50,000원에서 30,000원으로 내려갔고, 대형 상품 추가비는 비회원에게만 붙어요.',
  },
  {
    title: '누가 다르게 대우받나',
    look: '회원 · 대형 상품 구매자',
    read: '30,000원대 회원이 새로 무료가 되고, 대형 상품을 사는 회원은 8,000원을 더 안 냅니다. 두 번째가 의도한 변경인지 물어야 해요.',
  },
]

export type TraceLine = {
  code: string
  source: 'error' | 'product' | 'framework' | 'context'
}

export type ErrorReadingGuide = {
  label: string
  read: string
}

/** R13. 같은 함수에서 터진 에러 — 실제 콘솔처럼 제품 코드와 React 내부 호출이 섞여 있다 */
export const STACK_TRACE: TraceLine[] = [
  {
    code: "TypeError: Cannot read properties of undefined (reading 'total')",
    source: 'error',
  },
  {
    code: '    at getShippingFee (src/checkout/shipping.js:4:22)',
    source: 'product',
  },
  {
    code: '    at useShippingFee (src/checkout/useShippingFee.js:12:10)',
    source: 'product',
  },
  {
    code: '    at CheckoutSummary (src/checkout/CheckoutSummary.jsx:41:7)',
    source: 'product',
  },
  {
    code: '    at react-stack-bottom-frame (react-dom-client.js:23863:20)',
    source: 'framework',
  },
  {
    code: '    at renderWithHooks (react-dom-client.js:5529:22)',
    source: 'framework',
  },
  {
    code: 'Component stack:',
    source: 'context',
  },
  {
    code: '    at CheckoutSummary (src/checkout/CheckoutSummary.jsx:38:3)',
    source: 'product',
  },
  {
    code: '    at CheckoutPage (src/pages/CheckoutPage.jsx:88:19)',
    source: 'product',
  },
  {
    code: '    at App (src/App.jsx:17:5)',
    source: 'product',
  },
]

/** R13. 줄 번호가 아니라 역할로 찾는 세 가지 읽기 기준 */
export const ERROR_READING_GUIDE: ErrorReadingGuide[] = [
  {
    label: '① 첫 줄 · 무슨 에러인가',
    read: 'cart가 없는 상태에서 cart.total을 읽으려다 멈췄어요. 먼저 에러의 종류와 대상을 봐요.',
  },
  {
    label: '② 첫 번째 우리 코드 · 어디인가',
    read: 'src/가 처음 나오는 shipping.js 4번째 줄이 실제로 멈춘 곳이에요. 파일과 줄 번호가 보이면 여기부터 찾아가요.',
  },
  {
    label: '③ 다음 우리 코드 · 어떤 경로인가',
    read: 'useShippingFee와 CheckoutSummary를 거쳐 왔어요. 아래 컴포넌트 스택에서는 결제 화면까지 이어지는 경로도 보여요.',
  },
]
