import { CircleDollarSign, MessageSquare, Ruler } from 'lucide-react'
import {
  Chip,
  CompareGrid,
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

const UPGRADES = [
  {
    before: '언제 돼요?',
    after: '대형 상품 케이스까지 포함하면 며칠쯤이에요?',
    en: 'Does that estimate include the oversized-item case?',
  },
  {
    before: '이거 버그예요',
    after: '결제 화면에서 shipping.js 4번 줄이 터져요. 5번 중 3번 재현돼요',
    en: "Repro 3 out of 5 — here's the stack trace.",
  },
  {
    before: '간단한 거 아니에요?',
    after: '이 값 바꾸면 영향받는 파일이 몇 개예요?',
    en: "What's the blast radius of this change?",
  },
]

/** R22. ⭐ 질문 업그레이드 */
export function BetterQuestionsSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <MessageSquare className="size-8 text-accent md:size-11" />
        <SlideHeadline>읽고 나면 질문이 달라져요</SlideHeadline>
      </div>

      <div className="flex flex-col gap-4 md:gap-6">
        {UPGRADES.map((item, index) => (
          <div
            key={item.before}
            className={cx(
              'grid gap-3 md:gap-6 lg:grid-cols-9',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <Panel tone="sunken" pad="md" className="flex flex-col gap-2 lg:col-span-3">
              <PanelLabel>이렇게 묻던 것</PanelLabel>
              <p className="text-deck-body text-content-secondary line-through decoration-content-muted">
                {item.before}
              </p>
            </Panel>

            <Panel tone="raised" pad="md" className="flex flex-col gap-2 lg:col-span-6">
              <PanelLabel tone="accent">이렇게</PanelLabel>
              <p className="text-deck-body font-semibold text-content-strong">{item.after}</p>
              <p className="font-mono text-deck-caption text-content-muted">EN · {item.en}</p>
            </Panel>
          </div>
        ))}
      </div>

      <SlideNote>
        질문 하나에 파일 · 줄 번호 · 조건 중 하나만 들어가도 대화가 달라져요
      </SlideNote>
    </SlideLayout>
  )
}

const VAGUE = ['장바구니 금액이 크면 무료배송', '빠르게 로딩되게', '에러 나면 알려주기']
const EXACT = [
  '회원은 30,000원 이상 무료배송 (>= 30,000)',
  '대형 상품이 있어도 회원이면 무료 — 2025-09-01 결정',
  '조건에 안 걸리면 기본 3,000원',
]
const MISSING = ['경계값 · >= 인가 > 인가', '예외 · 비회원, 대형 상품', '기본값 · 아무 조건도 안 맞을 때']

/** R23. 코드가 될 수 있는 스펙 */
export function SpecWritingSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <Ruler className="size-8 text-accent md:size-11" />
        <SlideHeadline>코드가 될 수 있는 스펙으로</SlideHeadline>
      </div>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 md:gap-6">
          <PanelLabel>개발자가 되물어야 하는 스펙</PanelLabel>
          <ul className="flex flex-1 flex-col gap-4">
            {VAGUE.map((item) => (
              <li key={item} className="text-deck-body text-content-secondary line-through decoration-content-muted">
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 md:gap-6">
          <PanelLabel tone="accent">그대로 코드가 되는 스펙</PanelLabel>
          <ul className="flex flex-1 flex-col gap-4">
            {EXACT.map((item) => (
              <li key={item} className="text-deck-body font-semibold text-content-strong">
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </CompareGrid>

      <div className="flex flex-wrap gap-3">
        {MISSING.map((item) => (
          <Chip key={item}>{item}</Chip>
        ))}
      </div>

      <SlideBody>
        이 <Mark>세 가지</Mark>를 안 적으면 아까 본 조건 순서처럼 개발자가 코드에서 정하게 돼요.
      </SlideBody>
    </SlideLayout>
  )
}

const COSTS = [
  {
    head: '만지는 파일 수',
    body: '한 줄만 바꿔도 그 함수를 부르는 곳이 20군데면 20군데를 확인해요',
    cheap: false,
  },
  {
    head: '데이터 구조 변경 (migration)',
    body: '이미 저장된 데이터를 옮겨야 해요. 되돌리기가 제일 어려운 종류예요',
    cheap: false,
  },
  {
    head: '숫자만 바꾸기',
    body: '설정값 하나면 배포만 하면 끝나요. 여기부터 물어보면 대화가 빨라져요',
    cheap: true,
  },
]

/** R24. "왜 오래 걸려요?"의 답은 코드에 있다 */
export function EstimateSlide() {
  return (
    <SlideLayout>
      <SlideKicker>일정을 들을 때</SlideKicker>
      <SlideHeadline>
        무엇이 <Mark>비싼지</Mark>는 코드에 적혀 있어요
      </SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {COSTS.map((item, index) => (
          <Panel
            key={item.head}
            tone={item.cheap ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <CircleDollarSign
              className={cx('size-8 md:size-10', item.cheap ? 'text-accent' : 'text-content-muted')}
            />
            <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.body}</p>
            {item.cheap ? (
              <div className="flex">
                <Chip tone="accent">가장 싼 변경</Chip>
              </div>
            ) : null}
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="lg" className="flex flex-col gap-3">
        <PanelLabel>여기까지가 &ldquo;완료&rdquo;</PanelLabel>
        <p className="text-deck-body text-content-secondary">
          자동 테스트 통과 · 단계별 배포(staging → production) · 문제가 나면 되돌릴 계획까지가 하나의 작업이에요.
        </p>
      </Panel>

      <SlideBody>
        견적을 대신 내는 게 아니에요. 어느 쪽이 비싼지 알고 <Mark>우선순위를 바꾸는 것</Mark>이 PM의 몫이에요.
      </SlideBody>
    </SlideLayout>
  )
}
