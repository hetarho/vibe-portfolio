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
import { CurrentWorkSlide, ScopeSplitSlide, TargetShapeSlide, WhyNotExcelSlide } from './parts/task'
import { BriefSlide, DataSafetySlide, DivisionSlide, StuckSlide, UndoSlide, VerifySlide } from './parts/cautions'
import { BreakSlide, FirstCommandsSlide, WorkspaceSlide } from './parts/setup'
import {
  FirstAskSlide,
  ItRunsSlide,
  RoleBranchSlide,
  ScoringSlide,
  SubmitAdminSlide,
  TroubleshootSlide,
} from './parts/build'
import { CoachPromptSlide, MadeAndNotSlide, NextSessionSlide, SummarySlide } from './parts/closing'

const PART = {
  agenda: '목차',
  ai: 'PART 1 · AI란',
  agent: 'PART 2 · 에이전트란',
  task: 'PART 3 · 만들려는 것',
  caution: 'PART 4 · 맡길 때 지킬 것',
  rest: '휴식',
  ready: 'PART 5 · 실습 준비',
  build: 'PART 6 · 만들기',
  closing: 'PART 7 · 마무리',
}

/**
 * 인사평정을 관할하는 HR 담당자의 1회차. 엑셀 평정지 1,000장을 회신받아
 * 함수로 집계하는 일을 웹 시스템으로 옮기고 싶다는 문의에서 출발했다.
 *
 * 문의는 난이도·기간·견적을 물었지만, 덱에서는 금액을 다루지 않는다.
 * 대신 `H11`에서 오늘 만들 범위와 나중에 붙일 것을 갈라 놓는다 —
 * 기간을 늘리는 것은 화면 개수가 아니라 배포·인증·보관·권한이라는 사실을
 * 수강생이 직접 보게 하는 편이 숫자를 말해주는 것보다 오래 남는다.
 * 견적과 기간에 대한 답변은 강사가 말로만 한다.
 *
 * 수강생은 개발 경험이 없고, 다루는 자료가 인사기록이다. 그래서 주의사항 파트(`H12`~`H17`)를
 * 실습보다 먼저, 여섯 장이나 두었다. 특히 `H14`는 이 수업에서 물러설 수 없는 선이다 —
 * 실제 직원 데이터는 오늘 한 줄도 넣지 않고, 양식만 가지고 만든다.
 *
 * 2시간 안에 화면이 실제로 뜨는 데까지 간다. 완성이 아니라 시제품이라는 것을
 * `H27`에서 분명히 긋고, 배포·인증·데이터·내보내기는 2회차로 넘긴다.
 */
export const agentBuildForHrDeck: DeckDef = {
  slides: [
    { id: 'H1', part: PART.agenda, title: '오늘 수업 목차', component: AgendaSlide },
    { id: 'H2', part: PART.ai, title: '⭐ AI란 무엇인가', component: AiWhatSlide },
    { id: 'H3', part: PART.ai, title: '⭐ AI와 사람의 자리', component: AiHumanRoleSlide },
    { id: 'H4', part: PART.ai, title: 'AI의 실무 사용', component: AiInPracticeSlide },
    { id: 'H5', part: PART.agent, title: '⭐ 에이전트란 무엇인가', component: AgentWhatSlide },
    { id: 'H6', part: PART.agent, title: '에이전트가 일하는 방식', component: AgentLoopSlide },
    { id: 'H7', part: PART.agent, title: '에이전트의 실무 사용', component: AgentInPracticeSlide },
    { id: 'H8', part: PART.task, title: '지금 일어나고 있는 일', component: CurrentWorkSlide },
    { id: 'H9', part: PART.task, title: '⭐ 만들려는 것 한 장', component: TargetShapeSlide },
    { id: 'H10', part: PART.task, title: '엑셀과 시스템의 차이', component: WhyNotExcelSlide },
    { id: 'H11', part: PART.task, title: '⭐ 오늘 만들 것과 나중 것', component: ScopeSplitSlide },
    { id: 'H12', part: PART.caution, title: '⭐ 맡길 일과 내가 정할 일', component: DivisionSlide },
    { id: 'H13', part: PART.caution, title: '⭐ 만들 것을 적는 여섯 칸', component: BriefSlide },
    { id: 'H14', part: PART.caution, title: '⭐ 인사 데이터는 넣지 않는다', component: DataSafetySlide },
    { id: 'H15', part: PART.caution, title: '⭐ 되돌릴 수 있게 해 두기', component: UndoSlide },
    { id: 'H16', part: PART.caution, title: '“다 됐습니다”를 확인하는 법', component: VerifySlide },
    { id: 'H17', part: PART.caution, title: '막혔을 때 세 가지 규칙', component: StuckSlide },
    { id: 'H18', part: PART.rest, title: '휴식 5분', component: BreakSlide },
    { id: 'H19', part: PART.ready, title: '창 셋과 준비물 넷', component: WorkspaceSlide },
    { id: 'H20', part: PART.ready, title: '⌨ 폴더 열고 에이전트 켜기', component: FirstCommandsSlide },
    { id: 'H21', part: PART.build, title: '⌨ 첫 문장과 규칙 넘기기', component: FirstAskSlide },
    { id: 'H22', part: PART.build, title: '⌨ 직위를 고르면 항목이 바뀌게', component: RoleBranchSlide },
    { id: 'H23', part: PART.build, title: '⌨ 점수를 넣으면 합계가 나오게', component: ScoringSlide },
    { id: 'H24', part: PART.build, title: '⭐ 떴는지 직접 확인하기', component: ItRunsSlide },
    { id: 'H25', part: PART.build, title: '⌨ 제출과 관리자 현황', component: SubmitAdminSlide },
    { id: 'H26', part: PART.build, title: '트러블슈팅 치트시트', component: TroubleshootSlide },
    { id: 'H27', part: PART.closing, title: '⭐ 만든 것과 아직 아닌 것', component: MadeAndNotSlide },
    { id: 'H28', part: PART.closing, title: '2회차에 할 일', component: NextSessionSlide },
    { id: 'H29', part: PART.closing, title: '⭐ 집에서 쓰는 코치 프롬프트', component: CoachPromptSlide },
    { id: 'H30', part: PART.closing, title: '오늘의 3줄', component: SummarySlide },
  ],
  shortcuts: [
    { key: 'b', slideId: 'H13', label: '여섯 칸' },
    { key: 'd', slideId: 'H14', label: '데이터 원칙' },
    { key: 'v', slideId: 'H16', label: '확인하는 법' },
    { key: 't', slideId: 'H26', label: '트러블슈팅' },
    { key: 's', slideId: 'H29', label: '코치 프롬프트' },
  ],
}
