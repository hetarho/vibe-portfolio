import { ArrowRight, CheckCircle2, Clock3, MessageSquareText, Route, Table2 } from 'lucide-react'
import { Chip, Mark, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'

const AGENDA = [
  { no: '먼저', head: 'Java 시험 10문제', detail: '정답 · 문제 해체 · 채점 키워드', tone: 'accentSoft' as const },
  { no: '그다음', head: '남는 시간만큼 사고 연습', detail: '1번부터 순서대로 · 중간에 끝나도 괜찮음', tone: 'raised' as const },
  { no: '오늘 안 함', head: '곧바로 코드로 번역하기', detail: '한글 논리를 설명하는 힘이 먼저', tone: 'sunken' as const },
]

/** J1. 시험을 먼저 끝내고 남는 시간에 사고 훈련을 한다. */
export function AgendaSlide() {
  return (
    <SlideLayout>
      <SlideKicker>Java · 문제풀이 수업</SlideKicker>
      <SlideHeadline size="hero">시험문제부터 풀고, 남는 시간에는 생각을 말로 꺼냅니다</SlideHeadline>
      <SlideLead>사고 연습은 진도를 정하지 않습니다. 한 문제를 오래 이야기해도 괜찮습니다.</SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {AGENDA.map((item, index) => (
          <Panel key={item.no} tone={item.tone} pad="lg" className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}>
            <PanelLabel tone={index === 0 ? 'accent' : 'muted'}>{item.no}</PanelLabel>
            <p className="text-deck-lead font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-caption text-content-secondary">{item.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">오늘의 우선순위 · <Mark>시험 대비를 완료한 뒤</Mark> 사고 연습으로 이동합니다</SlideNote>
    </SlideLayout>
  )
}

/** J13. 시험 파트가 끝난 뒤 선택적으로 시작하는 구간. */
export function RemainingTimeSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 2 · 남는 시간</SlideKicker>
      <SlideHeadline size="hero">여기부터는 끝까지 다 하지 않아도 됩니다</SlideHeadline>
      <SlideLead>문제 수보다 중요한 것은 답이 나온 이유를 자기 문장으로 끝까지 설명해 보는 경험입니다.</SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <Panel tone="raised" pad="lg" className="flex flex-col gap-4">
          <Clock3 className="size-8 text-accent md:size-11" />
          <p className="text-deck-lead font-bold text-content-strong">시간이 15분이면</p>
          <p className="text-deck-body text-content-secondary">라떼 문제 하나를 여러 방식으로</p>
        </Panel>
        <Panel tone="accentSoft" pad="lg" className="flex flex-col gap-4">
          <Clock3 className="size-8 text-accent md:size-11" />
          <p className="text-deck-lead font-bold text-content-strong">시간이 30분이면</p>
          <p className="text-deck-body text-content-secondary">1~3번까지, 설명이 완성될 때까지</p>
        </Panel>
        <Panel tone="raised" pad="lg" className="flex flex-col gap-4">
          <Clock3 className="size-8 text-accent md:size-11" />
          <p className="text-deck-lead font-bold text-content-strong">더 남으면</p>
          <p className="text-deck-body text-content-secondary">다음 문제로 가되 코드는 아직 쓰지 않기</p>
        </Panel>
      </div>

      <SlideNote tone="quiet">한 문제를 깊게 설명했다면 열 문제를 급히 푼 것보다 오늘 목표에 가깝습니다</SlideNote>
    </SlideLayout>
  )
}

/** J14. 학생의 현재 답과 수업에서 만들 답의 차이. */
export function ExplainGoalSlide() {
  return (
    <SlideLayout>
      <SlideKicker>왜 이 연습을 하는가</SlideKicker>
      <SlideHeadline>정답 3잔을 아는 것과, 3잔이 나오는 규칙을 설명하는 것은 다릅니다</SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>지금 나오는 설명</PanelLabel>
          <p className="text-deck-title font-bold text-content-strong">“우유가 3개밖에 없으니까 3잔이죠.”</p>
          <p className="text-deck-body text-content-secondary">이 숫자에서는 맞지만, 왜 우유만 봐도 되는지는 아직 생략되어 있습니다.</p>
        </Panel>
        <div className="flex items-center justify-center lg:col-span-1">
          <ArrowRight className="size-9 text-accent md:size-12" />
        </div>
        <Panel tone="raised" pad="lg" className="flex flex-col gap-4 lg:col-span-4">
          <PanelLabel tone="accent">오늘 만들 설명</PanelLabel>
          <p className="text-deck-body font-bold text-content-strong">“우유로는 3잔, 샷으로는 10잔을 만들 수 있습니다.”</p>
          <p className="text-deck-body font-bold text-content-strong">“둘 다 필요하므로 더 작은 3잔이 최대입니다.”</p>
        </Panel>
      </div>

      <SlideNote tone="quiet">좋은 설명은 <Mark>숫자가 바뀌어도 같은 순서로 다시 쓸 수 있습니다</Mark></SlideNote>
    </SlideLayout>
  )
}

const METHODS = [
  {
    icon: Route,
    head: '하나씩 해보기',
    detail: '실제로 한 단계씩 움직여 어디서 멈추는지 본다',
    example: '라떼를 한 잔씩 만들며 재료를 뺀다',
  },
  {
    icon: Table2,
    head: '그림·표·경우로 나누기',
    detail: '눈에 보이도록 늘어놓고 같은 것끼리 묶는다',
    example: '재료별 가능한 잔 수를 두 칸에 쓴다',
  },
  {
    icon: MessageSquareText,
    head: '일반 규칙으로 말하기',
    detail: '숫자가 바뀌어도 쓸 수 있는 문장으로 정리한다',
    example: '각 재료의 가능 수 중 작은 값',
  },
]

/** J15. 하나의 정답을 설명하는 여러 방식. */
export function ReasoningStylesSlide() {
  return (
    <SlideLayout>
      <SlideKicker>코드보다 먼저</SlideKicker>
      <SlideHeadline>어떤 방식이든 괜찮습니다. 다만 생각의 중간을 생략하지 않습니다</SlideHeadline>
      <SlideLead>효율적인 공식 하나를 맞히는 수업이 아닙니다. 자기 직관을 다른 사람도 따라갈 수 있게 펼치는 수업입니다.</SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {METHODS.map((method, index) => {
          const Icon = method.icon
          return (
            <Panel key={method.head} tone={index === 1 ? 'accentSoft' : 'raised'} pad="lg" className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}>
              <Icon className="size-8 text-accent md:size-11" />
              <p className="text-deck-lead font-bold text-content-strong">{method.head}</p>
              <p className="text-deck-body text-content-secondary">{method.detail}</p>
              <div className="mt-auto flex">
                <Chip>{method.example}</Chip>
              </div>
            </Panel>
          )
        })}
      </div>

      <div className="flex justify-center">
        <Chip tone="accent"><CheckCircle2 className="size-5" />한글 논리가 완성된 뒤에만 수도코드와 Java로 이동</Chip>
      </div>
    </SlideLayout>
  )
}
