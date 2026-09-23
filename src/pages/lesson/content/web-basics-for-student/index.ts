import type { DeckDef, SlideDef } from '../../deck'
import { STORY } from './model/story'
import { THINKING_DRILLS } from './model/thinking-drills'
import { HomeworkSlide, RecapMapSlide, RecapRulesSlide } from './parts/closing'
import { DrillIntroSlide, makeDrillAnswerSlide, makeDrillQuestionSlide } from './parts/drill'
import { AgendaSlide, HowToListenSlide } from './parts/opening'
import { CourseMapSlide, OracleAccessSlide, SpringFlowSlide } from './parts/stack'
import { makeStorySlide, StoryMapSlide } from './parts/story'

const PART = {
  opening: '시작 · 오늘 할 일',
  build: 'PART 1 · 화면에서 서버까지',
  data: 'PART 2 · 데이터를 남기는 곳',
  open: 'PART 3 · 서버 안쪽과 문 열기',
  stack: 'PART 4 · 학원 과정과 겹쳐 보기',
  drill: 'PART 5 · 만들기 전에 하는 생각',
  closing: '마무리 · 혼자 이어가기',
}

/**
 * 이야기의 세 구간. 상단 파트명이 열일곱 화면 내내 같으면 어디까지 왔는지 감이 없어서,
 * 화면을 만들며 막히는 지점(저장할 곳이 필요해지는 순간, 남에게 열어 주는 순간)에서 끊는다.
 */
function storyPart(index: number) {
  if (index < 8) return PART.build
  if (index < 13) return PART.data
  return PART.open
}

const storySlides: SlideDef[] = STORY.map((beat, index) => ({
  id: beat.id,
  part: storyPart(index),
  title: beat.navTitle,
  component: makeStorySlide(beat),
}))

const drillSlides: SlideDef[] = THINKING_DRILLS.flatMap((drill) => [
  {
    id: `W${drill.no * 2 + 23}`,
    part: PART.drill,
    title: `사고 연습 ${drill.no} · ${drill.title}`,
    component: makeDrillQuestionSlide(drill),
  },
  {
    id: `W${drill.no * 2 + 24}`,
    part: PART.drill,
    title: `사고 연습 ${drill.no} 함께 보기 · ${drill.skill}`,
    component: makeDrillAnswerSlide(drill),
  },
])

/**
 * 학원에서 문법을 배우는 중이지만 서비스 한 채가 어떻게 굴러가는지는 아직 못 본 학생을 위한 V2 덱.
 * 앞부분은 분식집 주문 사이트를 만들어 가는 이야기 하나로 웹 전반을 훑는다.
 * 개념을 정의하고 예시를 붙이는 순서를 쓰지 않는다 — 막히는 장면이 먼저 오고 이름은 그다음에 붙인다.
 * 뒷부분은 같은 가게에서 생기는 상황으로 만들기 전에 하는 판단 열 가지를 연습한다.
 * 화면에 소스 코드를 싣지 않는다. 코드는 구조를 잡은 다음 회차에서 쓴다.
 */
export const webBasicsForStudentDeck: DeckDef = {
  slides: [
    { id: 'W1', part: PART.opening, title: '오늘 수업 목차', component: AgendaSlide },
    { id: 'W2', part: PART.opening, title: '오늘 수업을 듣는 방법', component: HowToListenSlide },
    ...storySlides,
    { id: 'W20', part: PART.open, title: '여기까지 지나온 길 · 전체 지도', component: StoryMapSlide },
    { id: 'W21', part: PART.stack, title: '과정 4층과 오늘 이야기', component: CourseMapSlide },
    { id: 'W22', part: PART.stack, title: '스프링에서 요청이 지나는 길', component: SpringFlowSlide },
    { id: 'W23', part: PART.stack, title: 'Oracle에 말 거는 세 가지 방법', component: OracleAccessSlide },
    { id: 'W24', part: PART.drill, title: '만들기 전에 하는 생각으로', component: DrillIntroSlide },
    ...drillSlides,
    { id: 'W45', part: PART.closing, title: '오늘의 도착점 · 앞부분', component: RecapMapSlide },
    { id: 'W46', part: PART.closing, title: '오늘의 도착점 · 질문 열 개', component: RecapRulesSlide },
    { id: 'W47', part: PART.closing, title: '집에서 이어가기 · 복습 프롬프트', component: HomeworkSlide },
  ],
  shortcuts: [
    { key: 's', slideId: 'W3', label: '이야기 시작' },
    { key: 'd', slideId: 'W11', label: '데이터베이스' },
    { key: 'm', slideId: 'W20', label: '전체 지도' },
    { key: 'c', slideId: 'W21', label: '과정 4층' },
    { key: 't', slideId: 'W24', label: '사고 연습' },
    { key: 'r', slideId: 'W45', label: '정리' },
  ],
}
