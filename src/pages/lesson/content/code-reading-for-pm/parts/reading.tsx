import { Braces, Eye, Play, Repeat, Split, Tag } from 'lucide-react'
import { useState } from 'react'
import {
  Chip,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideBody,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideNote,
} from '../../../deck'
import { CART_TOTAL_FN, CODE_DECISIONS, SHIPPING_FN, SPEC_VALUES } from '../model/code-samples'
import { CodeReader } from '../ui/CodeReader'

const PIECES = [
  {
    icon: Tag,
    name: '값',
    plain: '이름을 붙여 담아둔 것',
    code: 'const freeShippingMin = 50000',
    gain: '이름이 곧 명세예요. 이름만 읽어도 무슨 값인지 알아요',
  },
  {
    icon: Split,
    name: '조건',
    plain: '~라면 이렇게, 아니면 저렇게',
    code: 'if (total >= freeShippingMin)',
    gain: '제품 규칙이 사는 곳이에요. 오늘 가장 오래 볼 문법이에요',
  },
  {
    icon: Repeat,
    name: '반복',
    plain: '목록에 있는 전부에게 같은 일을',
    code: 'for (const item of items)',
    gain: '.map( 이나 .filter( 도 같은 뜻이에요. 목록이 커지면 느려지는 자리예요',
  },
  {
    icon: Play,
    name: '호출',
    plain: '이름 붙은 일을 시키기',
    code: 'getShippingFee(cart, user)',
    gain: '누가 이걸 부르는지가 곧 영향 범위예요',
  },
]

/** R5. ⭐ 코드는 결국 이 4가지 */
export function FourPiecesSlide() {
  const [showCode, setShowCode] = useState(false)

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>문법은 여기까지만</SlideKicker>
          <SlideHeadline>
            제품 로직은 이 <Mark>4가지</Mark>로 거의 다 읽혀요
          </SlideHeadline>
        </div>
        <button
          type="button"
          onClick={() => setShowCode((value) => !value)}
          className="flex items-center gap-3 rounded-full bg-accent px-4 py-3 text-deck-caption font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck md:px-7 hover:bg-accent-strong"
        >
          <Braces className="size-5 md:size-6" />
          {showCode ? '뜻만 보기' : '코드로 보기'}
        </button>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {PIECES.map((piece, index) => (
          <Panel
            key={piece.name}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <div className="flex items-center gap-4">
              <piece.icon className="size-7 text-accent md:size-9" />
              <p className="text-deck-lead font-bold text-content-strong">{piece.name}</p>
            </div>

            {showCode ? (
              <p className="animate-pop overflow-x-auto rounded-card bg-surface-sunken p-4 font-mono text-deck-caption whitespace-pre text-content-strong inset-shadow-sunken md:p-6">
                {piece.code}
              </p>
            ) : (
              <p className="rounded-card bg-surface-overlay p-4 text-deck-body font-semibold text-content-primary md:p-6">
                {piece.plain}
              </p>
            )}

            <p className="mt-auto text-deck-caption text-content-secondary">{piece.gain}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>
        여기 없는 문법이 나오면 <Mark>이름으로 추측하고 넘어가요</Mark>. 그게 읽기의 기술이에요.
      </SlideBody>
    </SlideLayout>
  )
}

const SPOTS = [
  {
    order: '①',
    what: '이름',
    look: 'getShippingFee · freeShippingMin · isMember',
    why: '함수와 변수 이름이 그 코드의 명세예요. 이름이 하는 말과 코드가 하는 일이 다르면 그게 버그예요',
  },
  {
    order: '②',
    what: '조건',
    look: 'if · && · || · >= · !',
    why: '제품 규칙은 전부 여기 있어요. && 는 “둘 다”, || 는 “하나라도”, ! 는 “아닌 경우”',
  },
  {
    order: '③',
    what: '반복',
    look: 'for · .map( · .filter( · continue',
    why: '무엇을 하나씩 도는지, 그중 무엇을 건너뛰는지 봐요. 건너뛰는 것이 있으면 그게 정책이에요',
  },
  {
    order: '④',
    what: '호출',
    look: '이 함수를 누가 부르나',
    why: '부르는 곳이 20군데면 고칠 때 20군데를 확인해야 해요. 그게 일정과 위험의 크기예요',
  },
]

/** R6. 읽을 때 눈이 가야 할 4곳 — 앞 화면의 4가지가 그대로 눈이 갈 곳이 된다 */
export function FourSpotsSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <Eye className="size-8 text-accent md:size-11" />
        <SlideHeadline>눈이 가야 할 곳은 4군데예요</SlideHeadline>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {SPOTS.map((spot, index) => (
          <Panel
            key={spot.what}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <PanelLabel tone={index === 1 ? 'accent' : 'muted'}>
              {spot.order} {spot.what}
            </PanelLabel>
            <p className="overflow-x-auto rounded-card bg-surface-sunken p-4 font-mono text-deck-caption text-content-strong inset-shadow-sunken md:p-6">
              {spot.look}
            </p>
            <p className="mt-auto text-deck-caption text-content-secondary">{spot.why}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        모르는 줄은 <Mark>과감히 넘기세요</Mark>. 다 이해하려다 멈추는 게 제일 흔한 실패예요
      </SlideNote>
    </SlideLayout>
  )
}

/** R7. ⭐ 함수 하나를 한 줄씩 읽기 — 조건만 들어 있는 함수 */
export function ReadLineByLineSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <SlideKicker>줄을 눌러 보세요</SlideKicker>
        <Chip tone="accent">src/checkout/shipping.js</Chip>
      </div>

      <CodeReader
        lines={SHIPPING_FN}
        idle="왼쪽에서 줄 하나를 누르면 뜻과 물어볼 것이 떠요. 위에서 아래로 한 줄씩 가볼게요."
      />

      <p className="text-deck-meta text-content-muted">
        회색 줄(닫는 괄호)은 읽을 게 없어요 — 눈으로 넘어가도 되는 줄이에요
      </p>
    </SlideLayout>
  )
}

/** R8. ⭐ 반복문이 들어 있는 함수 — cart.total이 만들어지는 곳 */
export function ReadLoopSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-4 md:gap-5">
          <Repeat className="size-7 text-accent md:size-9" />
          <SlideKicker>그 cart.total은 어디서 왔나</SlideKicker>
        </div>
        <Chip tone="accent">src/cart/total.js</Chip>
      </div>

      <CodeReader
        lines={CART_TOTAL_FN}
        idle="반복문이 들어간 함수예요. 3번째 줄과 4번째 줄을 꼭 눌러 보세요."
      />

      <SlideBody>
        반복문은 <Mark>같은 일을 목록 전부에게</Mark> 하는 것뿐이에요. 어려운 건 문법이 아니라, 그 안에서 무엇을
        건너뛰는지예요.
      </SlideBody>
    </SlideLayout>
  )
}

/** R9. 제품 규칙은 조건과 순서에 산다 */
export function PolicyInCodeSlide() {
  return (
    <SlideLayout>
      <SlideKicker>방금 읽은 두 함수에 들어 있던 것</SlideKicker>
      <SlideHeadline>
        스펙은 결국 <Mark>숫자와 순서</Mark>로 남아요
      </SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {SPEC_VALUES.map((item, index) => (
          <Panel
            key={item.label}
            tone="raised"
            pad="md"
            className={cx(
              'flex items-center justify-between gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <p className="text-deck-lead font-bold tabular-nums text-content-strong">{item.value}</p>
            <p className="text-deck-caption text-content-secondary">{item.label}</p>
          </Panel>
        ))}
      </div>

      <div className="flex">
        <Chip>위 셋은 스펙에 있던 숫자</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {CODE_DECISIONS.map((item, index) => (
          <Panel
            key={item.where}
            tone="accentSoft"
            pad="lg"
            className={cx('flex flex-col gap-3', index === 0 ? 'animate-rise-3' : 'animate-rise-4')}
          >
            <PanelLabel tone="accent">아무도 정하지 않은 것 · {item.where}</PanelLabel>
            <p className="overflow-x-auto rounded-card bg-surface-sunken p-4 font-mono text-deck-caption text-content-strong inset-shadow-sunken md:p-5">
              {item.line}
            </p>
            <p className="text-deck-caption text-content-secondary">{item.result}</p>
          </Panel>
        ))}
      </div>

      <SlideNote>스펙에서 빠뜨린 결정은 사라지지 않아요 — 코드에서 누군가 대신 정합니다</SlideNote>
    </SlideLayout>
  )
}
