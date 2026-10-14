import type { ComponentType } from 'react'
import type { DeckDef, SlideDef, SlideProps } from '../../deck'
import practice1 from './answers/practice1.html?raw'
import practice2 from './answers/practice2.html?raw'
import practice3 from './answers/practice3.html?raw'
import practice4 from './answers/practice4.html?raw'
import practice5 from './answers/practice5.html?raw'
import { PRACTICE } from './model/practice'
import { ATTEND, LATTE, MENU, STOCK } from './model/translate'
import { CardDeckSlide, CardMatrixSlide } from './parts/cards'
import { HomeworkSlide, RecapSlide } from './parts/closing'
import { AgendaSlide, CardAnatomySlide, SizeSlide } from './parts/opening'
import {
  makeCheckSlide,
  makeDesignSlide,
  makeMoveSlide,
  makeProblemSlide,
  PracticeRoutineSlide,
  SetupSlide,
  ZeroDivisionSlide,
} from './parts/practice'
import {
  AttendPlanSlide,
  AttendQuestionSlide,
  DictionarySlide,
  ExamplePlanSlide,
  FiveStepsSlide,
  LastStopSlide,
  makeAnswerSlide,
  MenuQuestionSlide,
  MovieAnswerSlide,
  MovieQuestionSlide,
  ShellSlide,
  StockPlaceSlide,
  StockQuestionSlide,
} from './parts/translate'
import { CalcDemo } from './ui/demo/CalcDemo'
import { CategoryDemo } from './ui/demo/CategoryDemo'
import { JoinDemo } from './ui/demo/JoinDemo'
import { PurchaseDemo } from './ui/demo/PurchaseDemo'
import { SearchDemo } from './ui/demo/SearchDemo'

const PART = {
  opening: '시작 · 코드는 외워야 하나',
  practice: 'PART 1 · 실습문제 다섯 개',
  translate: 'PART 2 · 한글 절차를 코드로',
  closing: '마무리 · 혼자 이어가기',
}

type Slide = { part: string; title: string; component: ComponentType<SlideProps> }

/** 학원 번호로 완성본과 정답 파일을 찾는다. PRACTICE는 쉬운 순서라 번호 순서와 다르다 */
const DEMOS: Record<number, ComponentType> = { 1: CategoryDemo, 2: CalcDemo, 3: JoinDemo, 4: PurchaseDemo, 5: SearchDemo }
const ANSWERS: Record<number, string> = { 1: practice1, 2: practice2, 3: practice3, 4: practice4, 5: practice5 }

/** 문제 하나 = 원문과 완성본 → 화면 설계표 → 이벤트마다 동작 → 확인. 계산기만 0 나누기 화면이 하나 더 붙는다 */
const practiceSlides: Slide[] = PRACTICE.flatMap((problem, index) => {
  const part = `PART 1 · ${index + 1}. ${problem.short}`
  return [
    { part, title: `문제 ${index + 1} · ${problem.short} · 원문과 완성본`, component: makeProblemSlide(problem, index, DEMOS[problem.academyNo]) },
    { part, title: `문제 ${index + 1} · ${problem.short} · 화면 설계표`, component: makeDesignSlide(problem, index) },
    ...problem.moves.map((move, moveIndex) => ({
      part,
      title: `문제 ${index + 1} · ${problem.short} · 동작 · ${move.navTitle}`,
      component: makeMoveSlide(problem, index, move, moveIndex),
    })),
    ...(problem.academyNo === 2 ? [{ part, title: `문제 ${index + 1} · 계산기 · 0으로 나눈 경우 두 길`, component: ZeroDivisionSlide }] : []),
    { part, title: `문제 ${index + 1} · ${problem.short} · 작은 경우로 확인`, component: makeCheckSlide(problem, index, ANSWERS[problem.academyNo]) },
  ]
})

const sequence: Slide[] = [
  { part: PART.opening, title: '오늘 수업 목차 · 비어 있던 계단 네 칸', component: AgendaSlide },
  { part: PART.opening, title: '⭐ 코드는 외워야 하나 · 외울 크기', component: SizeSlide },
  { part: PART.opening, title: '카드 한 장의 생김새와 외우는 법', component: CardAnatomySlide },

  { part: PART.practice, title: '1부 진행 방법 · 쉬운 순서와 네 단계', component: PracticeRoutineSlide },
  { part: PART.practice, title: '준비 · 파일 다섯 개와 index.html', component: SetupSlide },
  ...practiceSlides,
  { part: PART.practice, title: '⭐ 1부 정리 · 카드 여덟 장', component: CardDeckSlide },
  { part: PART.practice, title: '1부 정리 · 다섯 문제와 카드 표', component: CardMatrixSlide },

  { part: PART.translate, title: '지난번에 멈춘 곳 · 빠져 있던 사전', component: LastStopSlide },
  { part: PART.translate, title: '⭐ 옮기는 다섯 단계', component: FiveStepsSlide },
  { part: PART.translate, title: '주석으로 먼저 쓰는 함수 껍데기', component: ShellSlide },
  { part: PART.translate, title: '말 → 코드 사전', component: DictionarySlide },
  { part: PART.translate, title: '예제 · 라떼 · 1~3단계', component: ExamplePlanSlide },
  {
    part: PART.translate,
    title: '예제 · 라떼 · 4~5단계',
    component: makeAnswerSlide(LATTE, `예제 · ${LATTE.title}`, '4~5단계 · 줄마다 카드'),
  },
  { part: PART.translate, title: '연습 1 · 영화표 · 순서 맞추기', component: MovieQuestionSlide },
  { part: PART.translate, title: '연습 1 풀이 · 영화표', component: MovieAnswerSlide },
  { part: PART.translate, title: '연습 2 · 메뉴 합계 · 빈칸 채우기', component: MenuQuestionSlide },
  {
    part: PART.translate,
    title: '연습 2 풀이 · 메뉴 합계',
    component: makeAnswerSlide(MENU, `연습 2 풀이 · ${MENU.title}`, '카테고리와 같은 카드 세 장'),
  },
  { part: PART.translate, title: '연습 3 · 재고 · 절차 보고 쓰기', component: StockQuestionSlide },
  {
    part: PART.translate,
    title: '연습 3 풀이 · 재고',
    component: makeAnswerSlide(STOCK, `연습 3 풀이 · ${STOCK.title}`, '0번 줄만 함수 밖에', { dense: true, insight: false }),
  },
  { part: PART.translate, title: '연습 3 · 그릇을 함수 밖에 둔 이유', component: StockPlaceSlide },
  { part: PART.translate, title: '⭐ 연습 4 · 출석 · 백지에서', component: AttendQuestionSlide },
  { part: PART.translate, title: '연습 4 풀이 · 1~3단계', component: AttendPlanSlide },
  {
    part: PART.translate,
    title: '연습 4 풀이 · 4~5단계',
    component: makeAnswerSlide(ATTEND, `연습 4 풀이 · ${ATTEND.title}`, '그릇에 목록을 담았습니다'),
  },

  { part: PART.closing, title: '오늘의 도착점', component: RecapSlide },
  { part: PART.closing, title: '집에서 이어가기 · 복습 프롬프트', component: HomeworkSlide },
]

/** 화면 번호는 순서대로 매긴다. 문제마다 동작 화면 수가 달라서 번호를 손으로 적으면 하나 끼울 때마다 다 밀린다 */
const slides: SlideDef[] = sequence.map((slide, index) => ({ ...slide, id: `P${index + 1}` }))

const idOf = (title: string) => {
  const slide = slides.find((item) => item.title === title)
  if (!slide) throw new Error(`화면을 찾지 못했습니다: ${title}`)
  return slide.id
}

/**
 * 코딩학원 수강생 1대1 수업. JavaScript 함수까지 배웠지만 빈 화면에서 혼자 코드를 쓰지는 못하는 단계다.
 *
 * 시작에서 "코드는 외워야 하나"에 답한다. 외워도 되고, 외울 크기는 패턴 카드(일 하나를 하는 두세 줄)다.
 * 1부는 학원 실습문제 다섯 개를 쉬운 순서로 직접 만들며 카드 여덟 장을 모은다. 문제마다 원문과 완성본 →
 * 화면 설계표 → 이벤트마다 동작(코드는 가려 두고 단계마다 연다) → 작은 경우로 확인을 거친다.
 * 2부는 지난 수업(java-thinking-workshop)이 한글 규칙에서 멈춘 문제를 다시 가져와 코드까지 옮긴다.
 * 예제 하나를 끝까지 보여준 뒤 순서 맞추기 → 빈칸 → 절차만 → 백지로 도와주는 양을 줄인다.
 * 지난 수업(code-thinking-basics)의 계단 여섯 칸 중 비어 있던 2~5번과 6번을 이 순서로 채운다.
 *
 * 화면에 실린 정답 코드는 answers/의 HTML 파일과 같은 줄이다. 정답 파일이 원본이다.
 */
export const jsPracticeToCodeDeck: DeckDef = {
  slides,
  shortcuts: [
    { key: 'm', slideId: idOf('⭐ 코드는 외워야 하나 · 외울 크기'), label: '외울 크기' },
    { key: 'p', slideId: idOf('1부 진행 방법 · 쉬운 순서와 네 단계'), label: '1부 실습' },
    { key: 'c', slideId: idOf('⭐ 1부 정리 · 카드 여덟 장'), label: '카드' },
    { key: 't', slideId: idOf('지난번에 멈춘 곳 · 빠져 있던 사전'), label: '2부 옮기기' },
    { key: 'd', slideId: idOf('말 → 코드 사전'), label: '사전' },
    { key: 'r', slideId: idOf('오늘의 도착점'), label: '정리' },
  ],
}
