import { Check, PenLine, RotateCcw, Volume2 } from 'lucide-react'
import { Chip, cx, Mark, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote } from '../../../deck'
import { cardOf } from '../model/cards'
import { Code } from '../ui/Code'

/** 지난 수업(code-thinking-basics B8)의 계단 여섯 칸. 오늘 어느 칸을 채우는지만 붙였다 */
const STAIRS = [
  { no: '1', head: '완성된 코드를 읽는다', today: '이미 됨' },
  { no: '2', head: '그대로 따라 친다', today: '1부' },
  { no: '3', head: '빈칸을 채운다', today: '1부' },
  { no: '4', head: '절차를 한국어로 쓴다', today: '2부' },
  { no: '5', head: '한 단계를 한 줄로', today: '2부' },
  { no: '6', head: '빈 화면에서 짠다', today: '2부 마지막' },
]

/** P1. 오늘 수업 목차 · 비어 있던 계단 네 칸 */
export function AgendaSlide() {
  return (
    <SlideLayout>
      <SlideKicker>JavaScript · 실습과 옮기기</SlideKicker>
      <SlideHeadline size="hero">
        지난번에 비어 있던 <Mark>계단 네 칸</Mark>을 오늘 채웁니다
      </SlideHeadline>
      <SlideLead>1부에서는 학원 실습문제 다섯 개를 직접 만들고, 2부에서는 한글 절차를 코드로 옮깁니다.</SlideLead>

      <div className="grid gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
        {STAIRS.map((step, index) => (
          <Panel
            key={step.no}
            tone={step.today === '이미 됨' ? 'sunken' : 'raised'}
            pad="sm"
            className={cx('flex flex-col gap-3', `animate-rise-${Math.min(index + 1, 5)}`)}
          >
            <span className="grid size-9 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary inset-shadow-sunken md:size-11">
              {step.no}
            </span>
            <p className="text-deck-caption font-bold text-content-strong">{step.head}</p>
            <div className="mt-auto flex">
              <Chip tone={step.today === '2부 마지막' ? 'accent' : 'quiet'}>{step.today}</Chip>
            </div>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        1부 · 실습문제 다섯 개로 <Mark>카드 여덟 장</Mark>을 모읍니다 · 2부 · 그 카드로 한글 절차를 코드까지 옮깁니다
      </SlideNote>
    </SlideLayout>
  )
}

const SIZES = [
  {
    label: '너무 작다',
    head: '문법 한 조각',
    example: 'if · for · getElementById',
    result: '이미 외웠는데도 빈 화면에서 무엇부터 쓸지는 떠오르지 않습니다',
  },
  {
    label: '너무 크다',
    head: '문제 정답 통째로',
    example: '회원가입 정답 70줄',
    result: '그 문제만 풀립니다. 조건 하나가 바뀌면 다시 막힙니다',
  },
  {
    label: '오늘 외울 크기',
    head: '패턴 카드',
    example: '목록 하나씩 돌기 · 4줄',
    result: '여러 문제에 다시 나옵니다. 다섯 문제가 카드 여덟 장으로 풀립니다',
  },
]

/** P2. ⭐ 코드를 외워야 하나 · 외울 크기 */
export function SizeSlide() {
  return (
    <SlideLayout>
      <SlideKicker>먼저 짚을 질문 · 코드는 외워야 하나요</SlideKicker>
      <SlideHeadline>
        외워도 됩니다. <Mark>외울 크기</Mark>만 정하면 됩니다
      </SlideHeadline>
      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {SIZES.map((size, index) => (
          <Panel
            key={size.head}
            tone={index === 2 ? 'accentSoft' : 'sunken'}
            pad="md"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <PanelLabel tone={index === 2 ? 'accent' : 'muted'}>{size.label}</PanelLabel>
            <p className="text-deck-lead font-bold text-content-strong">{size.head}</p>
            <div className="flex">
              <Chip>{size.example}</Chip>
            </div>
            <p className={cx('text-deck-body', index === 2 ? 'font-semibold text-content-strong' : 'text-content-secondary')}>{size.result}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        외운 것이 있어야 옮길 수 있습니다 · 카드를 <Mark>어떤 순서로 놓을지</Mark> 정하는 일이 구조화된 사고입니다
      </SlideNote>
    </SlideLayout>
  )
}

const MEMORIZE = [
  { icon: PenLine, head: '앞면을 보고 뒷면을 빈 종이에 씁니다', detail: '보고 알아보는 것으로는 늘지 않습니다. 꺼내 써야 늡니다' },
  { icon: Volume2, head: '뒷면을 보고 앞면의 말을 소리 내어 말합니다', detail: '코드를 보고 무슨 일을 하는지 한국어로 말할 수 있어야 합니다' },
  { icon: RotateCcw, head: '틀린 카드만 다음 날 다시 꺼냅니다', detail: '맞힌 카드는 사흘 뒤에 한 번만 더 봅니다' },
]

/** P3. 카드 한 장의 생김새와 외우는 법 */
export function CardAnatomySlide() {
  const card = cardOf(6)
  return (
    <SlideLayout>
      <SlideKicker>패턴 카드 · 한 장의 생김새</SlideKicker>
      <SlideHeadline>
        카드 한 장은 <Mark>앞면이 말, 뒷면이 코드</Mark>입니다
      </SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <div className="flex flex-col gap-3 lg:col-span-5">
          <Panel tone="raised" pad="md" className="animate-rise-1 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <PanelLabel>앞면 · 한글 절차에 나오는 말</PanelLabel>
              <Chip>
                카드 {card.no} · {card.name}
              </Chip>
            </div>
            {card.front.map((line) => (
              <p key={line} className="text-deck-lead font-bold text-content-strong">
                “{line}”
              </p>
            ))}
          </Panel>
          <Panel tone="sunken" pad="md" className="animate-rise-2 flex flex-col gap-3">
            <PanelLabel>뒷면 · 외워 둘 코드</PanelLabel>
            <Code lines={card.back} tone="overlay" />
            <p className="text-deck-caption text-content-secondary">{card.note}</p>
          </Panel>
        </div>

        <Panel tone="raised" pad="lg" className="flex flex-col gap-5 lg:col-span-4">
          <PanelLabel tone="accent">외우는 법</PanelLabel>
          {MEMORIZE.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={item.head} className={cx('flex items-start gap-4', `animate-rise-${index + 1}`)}>
                <Icon className="mt-1 size-7 shrink-0 text-accent md:size-8" />
                <div className="flex flex-col gap-1">
                  <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
                  <p className="text-deck-caption text-content-secondary">{item.detail}</p>
                </div>
              </div>
            )
          })}
          <div className="mt-auto flex items-center gap-3 rounded-card bg-surface-sunken px-4 py-3 inset-shadow-sunken">
            <Check className="size-6 shrink-0 text-positive" strokeWidth={3} />
            <p className="text-deck-caption font-semibold text-content-primary">1부가 끝나면 이런 카드가 여덟 장 모입니다</p>
          </div>
        </Panel>
      </div>
    </SlideLayout>
  )
}
