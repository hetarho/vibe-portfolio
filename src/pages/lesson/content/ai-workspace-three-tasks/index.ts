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
  ApartmentIntakeSlide,
  ApartmentScopeSlide,
  ApartmentType1Slide,
  ApartmentType2Slide,
  ApartmentType3Slide,
} from './parts/apartment'
import { ReviewHabitSlide, SummarySlide } from './parts/closing'
import { SkillDemoSlide, SkillWhySlide } from './parts/legal'
import { CompareAnswerSlide, SixBoxAskSlide, VagueAskSlide } from './parts/firsttry'
import {
  CollectType1Slide,
  DeckBuildSlide,
  EvidenceTableSlide,
  ReviewSlide,
} from './parts/orientation'
import {
  BreakSlide,
  ChromeSetupSlide,
  CoworkSetupSlide,
  PrepCheckSlide,
  ProjectSetupSlide,
} from './parts/setup'
import { LoginWallSlide, TaskListSlide, ToolChoiceSlide } from './parts/tools'

const PART = {
  agenda: '목차',
  ai: 'PART 1 · AI란',
  agent: 'PART 2 · 에이전트란',
  first: 'PART 3 · 처음 시켜보기',
  tools: 'PART 4 · 도구 고르기',
  setup: 'PART 5 · 작업실 세팅',
  rest: '휴식',
  apartment: 'PART 6 · 실습 1 · 평형 신청',
  orientation: 'PART 7 · 실습 2 · 오리엔테이션',
  legal: 'PART 8 · 실습 3 · 법무상담',
  closing: 'PART 9 · 집에서',
}

/**
 * personal-ai-agents(1회차)를 들은 수강생의 2회차. 손에 급한 일이 셋이다 —
 * 재건축 평형 신청, 새 회기 오리엔테이션 준비, 법무상담 내용 정리.
 * 도구도 채팅·프로젝트·코워크·스킬까지 "다 알고 자유롭게 쓰고 싶다"고 요청했다.
 *
 * 그래서 도구를 따로 가르치지 않고 일에 하나씩 얹었다. 평형 신청에서 코워크와 크롬 옆창을,
 * 오리엔테이션에서 같은 둘을 더 깊게, 법무상담에서 스킬을 만난다. 프로젝트는 세팅 단계에서
 * 세 개를 한꺼번에 만들며 익힌다. 클로드 코드는 오늘 쓰지 않고 `D9`에서 자리만 짚는다.
 *
 * 2시간이라 셋을 같은 깊이로 다루지 못한다. 평형 신청과 오리엔테이션은 산출물이 파일로
 * 남을 때까지 돌리고, 법무상담은 양식을 한 번 만들어 보는 데까지만 간다.
 *
 * 수강생은 완전한 비개발자이고 컴퓨터 조작 자체가 편하지 않다. 터미널을 열지 않는다.
 * 평형 신청은 돈이 걸린 실제 결정이므로 강사도 에이전트도 어느 평형이 유리한지 말하지 않는다.
 * 숫자를 모아 나란히 놓는 데까지가 도구의 몫이고, 고르는 일은 수강생이 한다.
 */
export const aiWorkspaceThreeTasksDeck: DeckDef = {
  slides: [
    { id: 'D1', part: PART.agenda, title: '오늘 수업 목차', component: AgendaSlide },
    { id: 'D2', part: PART.ai, title: '⭐ AI란 무엇인가', component: AiWhatSlide },
    { id: 'D3', part: PART.ai, title: '⭐ AI와 사람의 자리', component: AiHumanRoleSlide },
    { id: 'D4', part: PART.ai, title: 'AI의 실무 사용', component: AiInPracticeSlide },
    { id: 'D5', part: PART.agent, title: '⭐ 에이전트란 무엇인가', component: AgentWhatSlide },
    { id: 'D6', part: PART.agent, title: '에이전트가 일하는 방식', component: AgentLoopSlide },
    { id: 'D7', part: PART.agent, title: '에이전트의 실무 사용', component: AgentInPracticeSlide },
    { id: 'D8', part: PART.first, title: '⭐ 오늘 할 세 가지', component: TaskListSlide },
    { id: 'D9', part: PART.first, title: '⌨ 대충 물어보기', component: VagueAskSlide },
    { id: 'D10', part: PART.first, title: '⌨ 여섯 가지를 얹어 다시', component: SixBoxAskSlide },
    { id: 'D11', part: PART.first, title: '두 답을 나란히 보기', component: CompareAnswerSlide },
    { id: 'D12', part: PART.tools, title: '⭐ 도구 다섯과 고르는 기준', component: ToolChoiceSlide },
    { id: 'D13', part: PART.tools, title: '⭐ 브라우저가 둘이라는 것', component: LoginWallSlide },
    { id: 'D14', part: PART.setup, title: '준비물 다섯 가지', component: PrepCheckSlide },
    { id: 'D15', part: PART.setup, title: '⭐ 프로젝트 세 개 만들기', component: ProjectSetupSlide },
    { id: 'D16', part: PART.setup, title: 'Cowork에 폴더 알려주기', component: CoworkSetupSlide },
    { id: 'D17', part: PART.setup, title: '⭐ 크롬 옆창 붙이기', component: ChromeSetupSlide },
    { id: 'D18', part: PART.rest, title: '휴식 5분', component: BreakSlide },
    { id: 'D19', part: PART.apartment, title: '⭐ 맡길 일과 내가 정할 일', component: ApartmentScopeSlide },
    { id: 'D20', part: PART.apartment, title: '자료 넣는 세 가지 방법', component: ApartmentIntakeSlide },
    { id: 'D21', part: PART.apartment, title: '⌨ 기한부터 꺼내기', component: ApartmentType1Slide },
    { id: 'D22', part: PART.apartment, title: '⌨ 평형 비교표 만들기', component: ApartmentType2Slide },
    { id: 'D23', part: PART.apartment, title: '⌨ 물어볼 것 추리고 저장', component: ApartmentType3Slide },
    { id: 'D24', part: PART.orientation, title: '⌨ 열어둔 화면 읽히기', component: CollectType1Slide },
    { id: 'D25', part: PART.orientation, title: '⌨ 근거표 만들기', component: EvidenceTableSlide },
    { id: 'D26', part: PART.orientation, title: '⌨ 발표 파일 만들기', component: DeckBuildSlide },
    { id: 'D27', part: PART.orientation, title: 'PPT 열어서 검수', component: ReviewSlide },
    { id: 'D28', part: PART.legal, title: '같은 일이 반복되면 스킬', component: SkillWhySlide },
    { id: 'D29', part: PART.legal, title: '⌨ 스킬 만들고 써보기', component: SkillDemoSlide },
    { id: 'D30', part: PART.closing, title: '⭐ 복습하고 질문하는 법', component: ReviewHabitSlide },
    { id: 'D31', part: PART.closing, title: '오늘 배운 동작 세 개', component: SummarySlide },
  ],
  shortcuts: [
    { key: 'f', slideId: 'D9', label: '처음 시켜보기' },
    { key: 't', slideId: 'D12', label: '도구 다섯' },
    { key: 'l', slideId: 'D13', label: '브라우저 둘' },
    { key: 'a', slideId: 'D21', label: '평형 타자' },
    { key: 'r', slideId: 'D24', label: '오리엔테이션 타자' },
    { key: 's', slideId: 'D29', label: '스킬 타자' },
  ],
}
