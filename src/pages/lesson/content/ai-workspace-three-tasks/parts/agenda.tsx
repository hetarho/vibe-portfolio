import { Mark, Panel, PanelLabel, SlideBody, SlideKicker, SlideLayout, SlideNote, cx } from '../../../deck'

const AGENDA = [
  { no: '1', head: 'AI와 에이전트', detail: '개념을 짧게 다시 · 6화면' },
  { no: '2', head: '처음 시켜보기', detail: '바로 쳐보고 두 답을 비교 · 4화면' },
  { no: '3', head: '도구 고르기', detail: '도구 다섯 · 브라우저 둘 · 2화면' },
  { no: '4', head: '작업실 세팅', detail: '프로젝트 셋 · 코워크 · 크롬 옆창 · 4화면' },
  { no: '5', head: '실습 1 · 평형 신청', detail: '기한표 · 비교표 · 물어볼 것 · 5화면' },
  { no: '6', head: '실습 2 · 오리엔테이션', detail: '자료 수집 · 근거표 · 발표 파일 · 4화면' },
  { no: '7', head: '실습 3 · 상담 정리', detail: '스킬 만들어 써보기 · 2화면' },
  { no: '8', head: '집에서', detail: '복습하는 법과 질문하는 법 · 2화면' },
]

/** D1. 오늘 수업 목차 */
export function AgendaSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-4">
          <SlideKicker>2회차 · 1대1 · 2시간</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            오늘은 <Mark>일을 하면서</Mark>
            배웁니다
          </h1>
          <SlideBody>
            설명을 듣는 시간보다 직접 쳐보는 시간이 깁니다. 개념을 짚고 나면 바로 한 줄씩 쳐보면서 급한 일 셋을
            차례로 끝냅니다. 오늘 치는 문장은 전부 짧아서 집에서도 그대로 다시 하실 수 있습니다.
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
        손에 남는 것 · <Mark>평형 비교표 · 발표 파일 · 상담 정리 양식</Mark> · 그리고 다시 쓸 프롬프트
      </SlideNote>
    </SlideLayout>
  )
}
