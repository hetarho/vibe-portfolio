import type { DeckDef } from '../../deck'
import {
  AgentInPracticeSlide,
  AgentLoopSlide,
  AgentWhatSlide,
  AiHumanRoleSlide,
  AiInPracticeSlide,
  AiWhatSlide,
} from '../shared'
import { AgendaSlide } from './parts/agenda'
import {
  CollectPromptSlide,
  DeckPromptSlide,
  EvidenceTableSlide,
  OutputsSlide,
  RegionSlide,
  ReviewSlide,
  WatchSlide,
} from './parts/build'
import { ScheduleSlide, SummarySlide, WorkspacesSlide } from './parts/closing'
import {
  BreakSlide,
  ChromeSetupSlide,
  CoworkSetupSlide,
  PrepCheckSlide,
  SafetySlide,
  WorkshopMapSlide,
} from './parts/setup'
import { BriefSlide, LoginWallSlide, ToolChoiceSlide, VideoRecapSlide, WishlistSlide } from './parts/want'

const PART = {
  agenda: '목차',
  ai: 'PART 1 · AI란',
  agent: 'PART 2 · 에이전트란',
  want: 'PART 3 · 원하는 것을 얻는 법',
  setup: 'PART 4 · 작업실 세팅',
  rest: '휴식',
  build: 'PART 5 · Zonta 한 바퀴',
  closing: 'PART 6 · 앞으로',
}

/**
 * personal-ai-agents(1회차)를 들은 같은 수강생의 2회차. UN 고문기관 NGO의 새 회기
 * 오리엔테이션을 10월 초에 세 지역에서 진행해야 하고, 자료 수집과 PPT 작성이 급하다.
 * 1회차에서 개념과 프롬프트는 받았지만 실제로 손대지 못한 상태로 온다.
 *
 * 구성: 목차 → AI 개념 3장 + 에이전트 개념 3장(content/shared 공통 화면으로 다시 정확히) →
 * 수강생이 말한 다섯 가지 요구와 요청을 결과로 바꾸는 여섯 칸, 도구 셋을 고르는 기준 →
 * 작업실을 실제로 세팅(Cowork · 크롬 확장 · 안전장치) → 로그인해 둔 Zonta 화면을 읽혀
 * 근거표와 조사보고를 만들고 pptx까지 뽑는 한 바퀴 → 네 작업실과 10월까지 3주 계획.
 *
 * 터미널은 쓰지 않는다. 비개발자가 앱 안에서 클릭으로 끝낼 수 있는 경로만 가르친다.
 * 강사는 Zonta의 내용을 대신 결정하지 않는다. 사실·해석·질문을 가르고 발표자가 승인하게 한다.
 */
export const aiWorkspaceForNgoDeck: DeckDef = {
  slides: [
    { id: 'C1', part: PART.agenda, title: '오늘 수업 목차', component: AgendaSlide },
    { id: 'C2', part: PART.ai, title: '⭐ AI란 무엇인가', component: AiWhatSlide },
    { id: 'C3', part: PART.ai, title: '⭐ AI와 사람의 자리', component: AiHumanRoleSlide },
    { id: 'C4', part: PART.ai, title: 'AI의 실무 사용', component: AiInPracticeSlide },
    { id: 'C5', part: PART.agent, title: '⭐ 에이전트란 무엇인가', component: AgentWhatSlide },
    { id: 'C6', part: PART.agent, title: '에이전트가 일하는 방식', component: AgentLoopSlide },
    { id: 'C7', part: PART.agent, title: '에이전트의 실무 사용', component: AgentInPracticeSlide },
    { id: 'C8', part: PART.want, title: '⭐ 원하는 것 다섯 가지', component: WishlistSlide },
    { id: 'C9', part: PART.want, title: '⭐ 요청을 결과로 바꾸는 여섯 칸', component: BriefSlide },
    { id: 'C10', part: PART.want, title: '⭐ 영상에서 본 일곱 가지', component: VideoRecapSlide },
    { id: 'C11', part: PART.want, title: '도구 셋과 고르는 기준', component: ToolChoiceSlide },
    { id: 'C12', part: PART.want, title: '⭐ 로그인이 필요한 자료', component: LoginWallSlide },
    { id: 'C13', part: PART.setup, title: '오늘 만들 작업실', component: WorkshopMapSlide },
    { id: 'C14', part: PART.setup, title: '준비물 다섯 가지', component: PrepCheckSlide },
    { id: 'C15', part: PART.setup, title: 'Cowork 열고 폴더 물려주기', component: CoworkSetupSlide },
    { id: 'C16', part: PART.setup, title: '⭐ 크롬 옆창 붙이기', component: ChromeSetupSlide },
    { id: 'C17', part: PART.setup, title: '안전장치 세 가지', component: SafetySlide },
    { id: 'C18', part: PART.rest, title: '휴식 5분', component: BreakSlide },
    { id: 'C19', part: PART.build, title: '오늘 나갈 파일 세 개', component: OutputsSlide },
    { id: 'C20', part: PART.build, title: '⭐ 자료 수집 프롬프트', component: CollectPromptSlide },
    { id: 'C21', part: PART.build, title: '기다리는 동안 볼 것', component: WatchSlide },
    { id: 'C22', part: PART.build, title: '⭐ 근거표로 모으기', component: EvidenceTableSlide },
    { id: 'C23', part: PART.build, title: '⭐ PPT 제작 프롬프트', component: DeckPromptSlide },
    { id: 'C24', part: PART.build, title: 'PPT 열어서 검수', component: ReviewSlide },
    { id: 'C25', part: PART.build, title: '세 지역용으로 갈라 쓰기', component: RegionSlide },
    { id: 'C26', part: PART.closing, title: '네 개의 작업실', component: WorkspacesSlide },
    { id: 'C27', part: PART.closing, title: '10월까지 3주 계획', component: ScheduleSlide },
    { id: 'C28', part: PART.closing, title: '오늘 배운 동작 세 개', component: SummarySlide },
  ],
  shortcuts: [
    { key: 'e', slideId: 'C5', label: '에이전트란' },
    { key: 'v', slideId: 'C10', label: '영상 일곱 가지' },
    { key: 'l', slideId: 'C12', label: '로그인 자료' },
    { key: 'r', slideId: 'C20', label: '수집 프롬프트' },
    { key: 'p', slideId: 'C23', label: 'PPT 프롬프트' },
    { key: 'w', slideId: 'C26', label: '네 작업실' },
  ],
}
