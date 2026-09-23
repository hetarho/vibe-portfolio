import { Mark, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'

const AGENDA = [
  {
    no: '앞부분',
    head: '분식집 주문 사이트 만들기',
    detail: '화면 한 장에서 시작해 막힐 때마다 필요한 것이 하나씩 등장합니다. 데이터베이스와 배포까지 이 이야기 안에 들어 있습니다',
    tone: 'accentSoft' as const,
  },
  {
    no: '뒷부분',
    head: '만들기 전에 하는 생각 열 가지',
    detail: '같은 가게에서 생기는 상황으로, 처음 떠오르는 답이 어디서 무너지는지 봅니다',
    tone: 'raised' as const,
  },
  {
    no: '오늘 안 함',
    head: '문법과 코드 외우기',
    detail: '코드는 구조를 알고 나면 찾아서 씁니다. 순서가 반대이면 검색할 말조차 모릅니다',
    tone: 'sunken' as const,
  },
]

/** W1. 오늘 수업의 두 덩어리. */
export function AgendaSlide() {
  return (
    <SlideLayout>
      <SlideKicker>웹개발 한 바퀴 · 개발자처럼 생각하기</SlideKicker>
      <SlideHeadline size="hero">가게 하나를 만들어 보면서 웹 전체를 한 번에 봅니다</SlideHeadline>
      <SlideLead>
        오늘은 개념을 순서대로 외우지 않습니다. 사이트를 만들다 막히는 장면이 먼저 나오고, 필요해진 다음에 이름을 붙입니다.
      </SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {AGENDA.map((item, index) => (
          <Panel key={item.no} tone={item.tone} pad="lg" className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}>
            <PanelLabel tone={index === 0 ? 'accent' : 'muted'}>{item.no}</PanelLabel>
            <p className="text-deck-lead font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-caption text-content-secondary">{item.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        오늘 손에 쥐고 가는 것 · <Mark>지도 한 장과 질문 열 개</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const HABITS = [
  {
    head: '모르는 말이 나오면 바로 끊습니다',
    detail: '오늘 나오는 용어는 현장에서 매일 쓰는 말입니다. 여기서 넘기면 다음 수업부터 대화가 끊깁니다',
  },
  {
    head: '“그게 무엇인지” 이렇게 묻습니다',
    detail: '파일인가요, 프로그램인가요, 약속인가요. 이 셋 중에 고르게 물으면 대부분 정리됩니다',
  },
  {
    head: '답을 듣기 전에 먼저 말해 봅니다',
    detail: '틀린 짐작을 한 번 거친 설명이 오래 남습니다. 뒷부분은 전부 이 방식으로 진행합니다',
  },
]

/** W2. 오늘 수업을 듣는 방법. */
export function HowToListenSlide() {
  return (
    <SlideLayout>
      <SlideKicker>듣는 방법</SlideKicker>
      <SlideHeadline>중간에 막히면 그 자리에서 물어봐야 이야기가 이어집니다</SlideHeadline>
      <SlideLead>앞부분은 이야기라서 한 장면을 놓치면 다음이 안 붙습니다. 진도보다 이해가 우선입니다.</SlideLead>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
        {HABITS.map((habit, index) => (
          <Panel
            key={habit.head}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <PanelLabel tone={index === 1 ? 'accent' : 'muted'}>{index + 1}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">{habit.head}</p>
            <p className="text-deck-caption text-content-secondary">{habit.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">오늘 전부 다 못 돌아도 괜찮습니다 · 끝까지 가는 것보다 중간에 이해하는 쪽이 중요합니다</SlideNote>
    </SlideLayout>
  )
}
