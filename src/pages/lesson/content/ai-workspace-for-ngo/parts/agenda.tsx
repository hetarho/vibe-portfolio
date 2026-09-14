import { Mark, Panel, PanelLabel, SlideBody, SlideKicker, SlideLayout, SlideNote, cx } from '../../../deck'

const AGENDA = [
  { no: '1', head: 'AI란 무엇인가', detail: '개념부터 실무 사용까지 · 3화면' },
  { no: '2', head: '에이전트란 무엇인가', detail: '챗봇과의 차이 · 일하는 방식 · 실무 · 3화면' },
  { no: '3', head: '원하는 것을 얻는 법', detail: '다섯 가지 요구 · 요청을 결과로 바꾸는 여섯 칸 · 도구 고르기 · 4화면' },
  { no: '4', head: '작업실 세팅', detail: 'Cowork · 크롬 확장 · 로그인이 필요한 자료까지 · 5화면' },
  { no: '5', head: 'Zonta 한 바퀴', detail: '자료 수집 → 근거표 → PPT 파일 → 지역별 버전 · 7화면' },
  { no: '6', head: '앞으로', detail: '네 개의 작업실 · 10월 초까지 3주 계획 · 3화면' },
]

/** C1. 오늘 수업 목차 */
export function AgendaSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-4">
          <SlideKicker>2회차 · 1대1 · 2시간</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            오늘은 <Mark>파일이 남습니다</Mark>
          </h1>
          <SlideBody>
            지난 시간에는 에이전트가 무엇인지 이야기했습니다. 오늘은 개념을 다시 한 번 정확히 잡은 다음, 작업실을 실제로
            만들고 10월 오리엔테이션 자료를 끝까지 한 바퀴 돌립니다.
          </SlideBody>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-3 lg:col-span-5">
          <PanelLabel>오늘의 목차</PanelLabel>
          {AGENDA.map((item, index) => (
            <div
              key={item.no}
              className={cx(
                'flex items-center gap-4 rounded-card bg-surface-sunken p-3 inset-shadow-sunken md:p-4',
                index < 5 ? `animate-rise-${index + 1}` : 'animate-rise-5',
              )}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-raised text-deck-caption font-bold text-content-primary shadow-raised md:size-11">
                {item.no}
              </span>
              <div className="flex flex-col">
                <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
                <p className="text-deck-caption text-content-secondary">{item.detail}</p>
              </div>
            </div>
          ))}
        </Panel>
      </div>

      <SlideNote tone="quiet">
        오늘 나가실 때 손에 남는 것 · <Mark>근거표 · PPT 파일 · 다시 쓸 수 있는 프롬프트</Mark>
      </SlideNote>
    </SlideLayout>
  )
}
