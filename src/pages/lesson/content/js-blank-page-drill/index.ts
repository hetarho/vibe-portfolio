import type { ComponentType } from 'react'
import type { DeckDef, SlideDef, SlideProps } from '../../deck'
import { drillOf, PERIODS } from './model/drill'
import { HomeworkSlide, RecapSlide, StuckLadderSlide } from './parts/closing'
import { AgendaSlide, FrameworkSlide, SetupSlide, ShellsSlide, StepLadderSlide, WhyFreezeSlide } from './parts/opening'
import { CartBlanksSlide, CartCheckSlide, LoopTraceSlide, makeCheckSlide, makePeriodSlide, makeStepsSlide } from './parts/period'

type Slide = { part: string; title: string; component: ComponentType<SlideProps> }

/** 교시 하나 = 시작 화면 → 문제마다 (다섯 Step → 확인과 막히는 곳). 3교시는 for를 손으로 돌려 보는 화면이 먼저, 4교시는 장바구니 조립 */
const periodSlides: Slide[] = PERIODS.flatMap((period) => {
  const part = `${period.no}교시 · ${period.title}`
  const intro: Slide = { part, title: `${period.no}교시 시작 · 손풀기와 시간표`, component: makePeriodSlide(period) }
  const trace: Slide[] = period.no === 3 ? [{ part, title: '3교시 · for를 손으로 돌려 보기', component: LoopTraceSlide }] : []
  const cart: Slide[] =
    period.no === 4
      ? [
          { part, title: '⭐ 4교시 · 장바구니 빈칸 여덟 개', component: CartBlanksSlide },
          { part, title: '4교시 · clearCart와 확인', component: CartCheckSlide },
        ]
      : []
  const problems = period.problems.flatMap((id) => {
    const problem = drillOf(id)
    return [
      { part, title: `${problem.no} ${problem.title} · 다섯 Step`, component: makeStepsSlide(problem) },
      { part, title: `${problem.no} ${problem.title} · 확인과 막히는 곳`, component: makeCheckSlide(problem) },
    ]
  })
  return [intro, ...trace, ...problems, ...cart]
})

const sequence: Slide[] = [
  { part: '시작 · 왜 하얘지나', title: '오늘 지도 · 1~4교시', component: AgendaSlide },
  { part: '시작 · 왜 하얘지나', title: '⭐ 두 가지 일을 한꺼번에', component: WhyFreezeSlide },
  { part: '시작 · 왜 하얘지나', title: '⭐ 다섯 Step · 힌트를 한 겹씩', component: StepLadderSlide },
  { part: '시작 · 왜 하얘지나', title: '껍데기 네 개 · 타자 연습장', component: ShellsSlide },
  { part: '시작 · 왜 하얘지나', title: '3단계 · 재료 → 껍데기 → 빈칸', component: FrameworkSlide },
  { part: '시작 · 왜 하얘지나', title: '준비 · 화면 나누기와 연습장 읽기', component: SetupSlide },
  ...periodSlides,
  { part: '마무리 · 혼자 이어가기', title: '막혔을 때 · 사다리 다섯 칸', component: StuckLadderSlide },
  { part: '마무리 · 혼자 이어가기', title: '오늘의 도착점', component: RecapSlide },
  { part: '마무리 · 혼자 이어가기', title: '집에서 이어가기 · 복습 프롬프트', component: HomeworkSlide },
]

const slides: SlideDef[] = sequence.map((slide, index) => ({ ...slide, id: `D${index + 1}` }))

const idOf = (title: string) => {
  const slide = slides.find((item) => item.title === title)
  if (!slide) throw new Error(`화면을 찾지 못했습니다: ${title}`)
  return slide.id
}

/**
 * 예시가 있으면 값을 바꿔 응용하지만 빈 화면에서는 첫 줄을 못 떼는 수강생과 하는 1대1 수업. 1~4시간으로 늘였다 줄였다 한다.
 *
 * 멈추는 까닭을 '문제 쪼개기'와 '문법 떠올리기'를 한꺼번에 하려는 과부하로 보고 둘을 떼어 놓는다.
 * 문법은 타자 연습장(껍데기 다섯 판)과 Step 1(보고 치기)로 손에 붙이고, 쪼개기는 Step 3~5에서 한국어 주석으로 먼저 한다.
 * 문제마다 같은 코드를 Step 1 → 5로 다섯 번 치며 힌트를 한 겹씩 지운다.
 *
 * 학생이 실제로 여는 파일은 html-practice/drill/이고, 이 덱은 그 파일을 그대로 읽어서 보여 준다(model/drill.ts).
 * 시간 배분과 발문, 멈췄을 때 대처는 html-practice/TEACHING_GUIDE_4HOURS.md에 있다.
 */
export const jsBlankPageDrillDeck: DeckDef = {
  slides,
  shortcuts: [
    { key: 's', slideId: idOf('⭐ 다섯 Step · 힌트를 한 겹씩'), label: '다섯 Step' },
    { key: '1', slideId: idOf('1교시 시작 · 손풀기와 시간표'), label: '1교시' },
    { key: '2', slideId: idOf('2교시 시작 · 손풀기와 시간표'), label: '2교시' },
    { key: '3', slideId: idOf('3교시 시작 · 손풀기와 시간표'), label: '3교시' },
    { key: '4', slideId: idOf('4교시 시작 · 손풀기와 시간표'), label: '4교시' },
    { key: 'h', slideId: idOf('막혔을 때 · 사다리 다섯 칸'), label: '막혔을 때' },
  ],
}
