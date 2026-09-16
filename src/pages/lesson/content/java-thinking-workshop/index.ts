import type { DeckDef, SlideDef } from '../../deck'
import { EXAM_ANSWERS } from './model/exam-answers'
import { THINKING_EXAMPLES } from './model/thinking-examples'
import { HomeworkSlide, RecapSlide } from './parts/closing'
import { ExamIntroSlide, makeExamAnswerSlide, makeExamQuestionSlide } from './parts/exam'
import { AgendaSlide, ExplainGoalSlide, ReasoningStylesSlide, RemainingTimeSlide } from './parts/opening'
import { makeChallengeSlide, makeSolutionSlide } from './parts/thinking'

const PART = {
  opening: '시작 · 오늘의 순서',
  exam: 'PART 1 · Java 시험 풀이',
  thinking: 'PART 2 · 남는 시간 사고 연습',
  closing: '마무리 · 혼자 반복하기',
}

const thinkingSlides: SlideDef[] = THINKING_EXAMPLES.flatMap((example) => [
  {
    id: `J${example.no * 2 + 24}`,
    part: PART.thinking,
    title: `예시 ${example.no} · ${example.title}`,
    component: makeChallengeSlide(example),
  },
  {
    id: `J${example.no * 2 + 25}`,
    part: PART.thinking,
    title: `예시 ${example.no} 풀이 · ${example.pattern}`,
    component: makeSolutionSlide(example),
  },
])

const examSlides: SlideDef[] = EXAM_ANSWERS.flatMap((problem) => [
  {
    id: `J${problem.no * 2 + 1}`,
    part: PART.exam,
    title: `시험 ${problem.no}번 · ${problem.title}`,
    component: makeExamQuestionSlide(problem),
  },
  {
    id: `J${problem.no * 2 + 2}`,
    part: PART.exam,
    title: `시험 ${problem.no}번 해설 · ${problem.title}`,
    component: makeExamAnswerSlide(problem),
  },
])

/**
 * Java 문법을 이미 한 번 배웠지만 문제를 코드로 옮기는 과정이 약한 학습자를 위한 V2 덱.
 * 먼저 사용자가 제공한 Java 시험 10문제를 문제/해설 화면으로 나누어 모두 푼다.
 * 남는 시간에만 생활 문제로 이동하며, 한 문제를 여러 방법으로 설명한 뒤 숫자가
 * 바뀌어도 통하는 한글 규칙을 만든다. 이 회차에서는 코드를 바로 제시하지 않는다.
 */
export const javaThinkingWorkshopDeck: DeckDef = {
  slides: [
    { id: 'J1', part: PART.opening, title: '오늘 수업 목차', component: AgendaSlide },
    { id: 'J2', part: PART.exam, title: 'Java 시험문제 풀이법', component: ExamIntroSlide },
    ...examSlides,
    { id: 'J23', part: PART.thinking, title: '남는 시간 사고 연습', component: RemainingTimeSlide },
    { id: 'J24', part: PART.thinking, title: '정답과 설명의 차이', component: ExplainGoalSlide },
    { id: 'J25', part: PART.thinking, title: '같은 답을 설명하는 여러 방법', component: ReasoningStylesSlide },
    ...thinkingSlides,
    { id: 'J46', part: PART.closing, title: '오늘의 도착점', component: RecapSlide },
    { id: 'J47', part: PART.closing, title: '집에서 세 번 반복하기', component: HomeworkSlide },
  ],
  shortcuts: [
    { key: 'x', slideId: 'J2', label: '시험 풀이' },
    { key: 't', slideId: 'J23', label: '사고 연습' },
    { key: 'l', slideId: 'J26', label: '라떼 문제' },
    { key: 'r', slideId: 'J46', label: '정리' },
  ],
}
