import type { DeckDef } from '../../deck'
import {
  AgentInPracticeSlide,
  AgentLoopSlide,
  AgentWhatSlide,
  AiInPracticeSlide,
  AiProsConsSlide,
  AiWhatSlide,
} from '../shared'
import { AgendaSlide } from './parts/agenda'
import {
  Agent1FetchSlide,
  Agent2AnalyzeSlide,
  Agent3VerifySlide,
  Chat1SetupSlide,
  Chat2PromptSlide,
  Chat3FollowupSlide,
  Figure1RequestSlide,
  Figure2ScaleSlide,
  PracticeMapSlide,
} from './parts/practice'
import {
  ConsultWantSlide,
  DatabaseWantSlide,
  FigureWantSlide,
  RunWantSlide,
  ToolsWantSlide,
  UploadWantSlide,
  WishlistSlide,
} from './parts/wants'

const PART = {
  agenda: '목차',
  ai: 'PART 1 · AI란',
  agent: 'PART 2 · 에이전트란',
  wants: 'PART 3 · 원하는 것 확인',
  build: 'PART 4 · 하나씩 구현 방법',
  practice: 'PART 5 · 간단 실습',
}

/**
 * V2 체계의 첫 수업. 임상미생물학 대학원생(졸업논문용 유전체 분석이 목표, 코딩 경험 없음)의
 * 에이전트 기초 1회차. 강사는 논문을 대신 만들지 않는다. AI 에이전트 활용법을 가르친다.
 *
 * 구성: 목차 → AI 개념 3장 → 에이전트 개념 3장(둘 다 content/shared의 공통 화면) →
 * 수강생이 메시지로 보낸 "원하는 것" 여섯 가지 목록 → 하나마다 한 장씩,
 * 이론적인 구현 방법과 AI만으로 충분한지 / 에이전트가 필요한지 판정 →
 * 판정대로 해보는 간단 실습 3개(채팅은 채팅으로, 에이전트는 에이전트로) + 작업별 유리한 서비스 추천.
 */
export const agentBasicsForResearcherDeck: DeckDef = {
  slides: [
    { id: 'B1', part: PART.agenda, title: '오늘 수업 목차', component: AgendaSlide },
    { id: 'B2', part: PART.ai, title: '⭐ AI란 무엇인가', component: AiWhatSlide },
    { id: 'B3', part: PART.ai, title: 'AI가 잘하는 것 · 조심할 것', component: AiProsConsSlide },
    { id: 'B4', part: PART.ai, title: 'AI의 실무 사용', component: AiInPracticeSlide },
    { id: 'B5', part: PART.agent, title: '⭐ 에이전트란 무엇인가', component: AgentWhatSlide },
    { id: 'B6', part: PART.agent, title: '에이전트가 일하는 방식', component: AgentLoopSlide },
    { id: 'B7', part: PART.agent, title: '에이전트의 실무 사용', component: AgentInPracticeSlide },
    { id: 'B8', part: PART.wants, title: '⭐ 원하는 것 여섯 가지', component: WishlistSlide },
    { id: 'B9', part: PART.build, title: '① 내 자료 업로드·분석', component: UploadWantSlide },
    { id: 'B10', part: PART.build, title: '② 공개 DB에서 불러오기', component: DatabaseWantSlide },
    { id: 'B11', part: PART.build, title: '③ 의미 있는 분석 상의', component: ConsultWantSlide },
    { id: 'B12', part: PART.build, title: '④ 분석 도구 추천', component: ToolsWantSlide },
    { id: 'B13', part: PART.build, title: '⑤ 분석 실행', component: RunWantSlide },
    { id: 'B14', part: PART.build, title: '⑥ 논문 figure 제작', component: FigureWantSlide },
    { id: 'B15', part: PART.practice, title: '⭐ 실습 지도 · 요구 연결', component: PracticeMapSlide },
    { id: 'B16', part: PART.practice, title: '실습 1-① 접속과 준비', component: Chat1SetupSlide },
    { id: 'B17', part: PART.practice, title: '⭐ 실습 1-② 상의 프롬프트', component: Chat2PromptSlide },
    { id: 'B18', part: PART.practice, title: '실습 1-③ 후속 질문·저장', component: Chat3FollowupSlide },
    { id: 'B19', part: PART.practice, title: '⭐ 실습 2-① 유전체 3개 받기', component: Agent1FetchSlide },
    { id: 'B20', part: PART.practice, title: '실습 2-② 첫 분석 시키기', component: Agent2AnalyzeSlide },
    { id: 'B21', part: PART.practice, title: '실습 2-③ 확인·막혔을 때', component: Agent3VerifySlide },
    { id: 'B22', part: PART.practice, title: '⭐ 실습 3-① 논문 규격 figure', component: Figure1RequestSlide },
    { id: 'B23', part: PART.practice, title: '실습 3-② 오늘 만든 것·확장', component: Figure2ScaleSlide },
  ],
  shortcuts: [
    { key: 'a', slideId: 'B2', label: 'AI란' },
    { key: 'e', slideId: 'B5', label: '에이전트란' },
    { key: 'w', slideId: 'B8', label: '원하는 것' },
    { key: 'p', slideId: 'B15', label: '실습' },
  ],
}
