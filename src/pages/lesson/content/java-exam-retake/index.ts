import type { DeckDef, SlideDef } from '../../deck'
import { QUIZ_PROBLEMS } from './model/problems'
import { LastWordSlide, ReviewBoardSlide, RoutineSlide } from './parts/closing'
import { CheatSheetSlide, HowToUseSlide, OpeningSlide, StartSlide, WritingRuleSlide } from './parts/opening'
import { makeAnswerSlide, makeQuestionSlide } from './parts/problem'

const PART = {
  opening: '시작 · 재시험 전략',
  quiz: 'PART 1 · 예상문제 50',
  closing: '마무리 · 남은 시간 쓰기',
}

/**
 * 문제 한 장, 풀이 한 장이 한 세트.
 * 예상문제 N번의 문제 화면은 R(2N+4), 풀이 화면은 R(2N+5)에 온다.
 */
const quizSlides: SlideDef[] = QUIZ_PROBLEMS.flatMap((problem) => [
  {
    id: `R${problem.no * 2 + 4}`,
    part: PART.quiz,
    title: `${problem.no}번 문제 · ${problem.title}`,
    component: makeQuestionSlide(problem),
  },
  {
    id: `R${problem.no * 2 + 5}`,
    part: PART.quiz,
    title: `${problem.no}번 풀이 · ${problem.title}`,
    component: makeAnswerSlide(problem),
  },
])

/**
 * 지난 Java 시험에서 15점을 받은 비전공 초급 학습자의 재시험 대비 덱.
 * 같은 출제 범위 안에서 예상문제 50개를 중요도 순으로 늘어놓고,
 * 문제 화면에서 직접 답을 쓴 뒤 다음 화면에서 모범 답안과 비교해 스스로 채점한다.
 * 이 시점에 필요한 것은 이해보다 정확히 외운 문장이라 풀이마다 외울 한 줄을 먼저 보여 준다.
 */
export const javaExamRetakeDeck: DeckDef = {
  slides: [
    { id: 'R1', part: PART.opening, title: '예상문제 50개를 뽑은 기준', component: OpeningSlide },
    { id: 'R2', part: PART.opening, title: '두 화면이 한 세트 · 사용법', component: HowToUseSlide },
    { id: 'R3', part: PART.opening, title: '서술형에서 점수를 받는 문장', component: WritingRuleSlide },
    { id: 'R4', part: PART.opening, title: '무조건 외울 열 줄', component: CheatSheetSlide },
    { id: 'R5', part: PART.opening, title: '문제는 바뀌어도 개념은 그대로', component: StartSlide },
    ...quizSlides,
    { id: 'R106', part: PART.closing, title: '내가 매긴 점수와 다시 볼 문제', component: ReviewBoardSlide },
    { id: 'R107', part: PART.closing, title: '시험까지 하루 루틴', component: RoutineSlide },
    { id: 'R108', part: PART.closing, title: '마지막 한마디', component: LastWordSlide },
  ],
  shortcuts: [
    { key: 'c', slideId: 'R4', label: '외울 열 줄' },
    { key: 'q', slideId: 'R6', label: '1번 문제' },
    { key: 'r', slideId: 'R106', label: '정리' },
  ],
}
