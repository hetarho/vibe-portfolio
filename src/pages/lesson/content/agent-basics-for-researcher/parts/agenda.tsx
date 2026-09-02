import { Mark, Panel, PanelLabel, SlideBody, SlideKicker, SlideLayout, SlideNote, cx } from '../../../deck'

const AGENDA = [
  { no: '1', head: 'AI란 무엇인가', detail: '개념부터 실무 사용까지 · 3화면' },
  { no: '2', head: '에이전트란 무엇인가', detail: '챗봇과의 차이 · 일하는 방식 · 실무 · 3화면' },
  { no: '3', head: '원하는 것 확인', detail: '보내주신 메시지 속 여섯 가지 · 1화면' },
  { no: '4', head: '하나씩 구현 방법', detail: '이론적인 방법 + AI만으로 되는지, 에이전트가 필요한지 · 6화면' },
  { no: '5', head: '따라 하는 실습', detail: '주소 · 프롬프트 · 확인법까지 그대로 + 작업별 유리한 서비스 · 9화면' },
]

/** B1. 오늘 수업 목차 */
export function AgendaSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-4">
          <SlideKicker>에이전트 기초 · 1대1 · 2시간</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            오늘은 <Mark>개념</Mark>부터
            <br />
            정확히 잡습니다
          </h1>
          <SlideBody>
            보내주신 메시지의 “하고 싶은 것들”을 그대로 목표로 씁니다. 그것들이 무엇으로 가능한지 지도를 그린 다음,
            마지막에 아주 간단한 실습으로 직접 확인합니다.
          </SlideBody>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-5">
          <PanelLabel>오늘의 목차</PanelLabel>
          {AGENDA.map((item, index) => (
            <div
              key={item.no}
              className={cx('flex items-center gap-4 rounded-card bg-surface-sunken p-4 inset-shadow-sunken', `animate-rise-${index + 1}`)}
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
        두 개념만 잡히면 <Mark>나머지는 전부 응용</Mark>입니다 · 모르는 말이 나오면 바로 멈추고 물어봐 주세요
      </SlideNote>
    </SlideLayout>
  )
}
