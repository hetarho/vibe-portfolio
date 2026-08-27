import type { DeckDef } from '../../deck'
import { FinishLineSlide, JourneySlide, StandbySlide, SystemMapSlide, WhySetupSlide } from './parts/opening'
import {
  BreakSlide,
  BootstrapSlide,
  InstallDashboardSlide,
  NativeWindowsSlide,
  PathSlide,
  SetupGuardrailSlide,
  TerminalModelSlide,
  ToolScopeSlide,
  VscodeMapSlide,
} from './parts/foundation'
import {
  AccountLayersSlide,
  ClaudeFirstRunSlide,
  ErrorLoopSlide,
  FolderRuleSlide,
  PromptHandoffSlide,
  RemoteSupportSlide,
  SecretBoundarySlide,
  SmokeTestSlide,
  VerificationSlide,
} from './parts/workflow'
import { AgentLadderSlide, FactoryRailsSlide, LaterToolsSlide, MeetingRoadmapSlide } from './parts/roadmap'
import { HomeworkSlide, InstructorPrepSlide, SummarySlide } from './parts/wrapup'

const PART = {
  standby: 'PART 0 · 시작 전',
  opening: 'PART 1 · 오늘의 설계',
  foundation: 'PART 1 · Windows 작업실',
  rest: '휴식',
  workflow: 'PART 2 · 실제 서비스 연결',
  handoff: 'PART 2 · 재현과 원격 지원',
  roadmap: 'PART 2 · 에이전트 조직 로드맵',
  closing: 'PART 2 · 마무리',
  instructor: '강사용',
}

/**
 * 기존 Git/GitHub 읽기 수업을 마친 비개발자 창업자와 진행하는 후속 1대1 수업.
 * 사람이 VS Code와 Claude Code만 설치한 뒤, 하나의 프롬프트로 나머지 개발 환경을
 * Claude Code가 자동 설치·검증하게 만든다. 이후 실제 서비스 실행과 원격 지원까지 연결한다.
 *
 * 오늘은 멀티 에이전트를 켜는 날이 아니다. 단일 에이전트가 안정적으로 일할 레포 규칙,
 * 테스트, Git 격리를 먼저 만든 뒤 전문 역할과 병렬 작업으로 확장한다는 로드맵까지 합의한다.
 */
export const founderAiDevSetupDeck: DeckDef = {
  slides: [
    { id: 'W0', part: PART.standby, title: '시작 전 · 준비 확인', component: StandbySlide },
    { id: 'W1', part: PART.opening, title: '오늘은 작업실을 만드는 날', component: WhySetupSlide },
    { id: 'W2', part: PART.opening, title: '오늘의 완료 조건', component: FinishLineSlide },
    { id: 'W3', part: PART.opening, title: '개발 환경의 다섯 층', component: SystemMapSlide },
    { id: 'W4', part: PART.opening, title: '120분 여정', component: JourneySlide },
    { id: 'W5', part: PART.foundation, title: '설치 전에 멈춰서 볼 것', component: SetupGuardrailSlide },
    { id: 'W6', part: PART.foundation, title: '오늘은 네이티브 Windows 하나', component: NativeWindowsSlide },
    { id: 'W7', part: PART.foundation, title: '사람이 설치할 것은 딱 두 개', component: BootstrapSlide },
    { id: 'W8', part: PART.foundation, title: '나머지를 맡기는 한 프롬프트', component: PromptHandoffSlide },
    { id: 'W9', part: PART.foundation, title: 'Claude가 설치할 것과 미룰 것', component: ToolScopeSlide },
    { id: 'W10', part: PART.foundation, title: 'Claude 자동 설치 대시보드', component: InstallDashboardSlide },
    { id: 'W11', part: PART.foundation, title: '설치했는데 못 찾는 이유 · PATH', component: PathSlide },
    { id: 'W12', part: PART.foundation, title: 'VS Code에서 보는 네 구역', component: VscodeMapSlide },
    { id: 'W13', part: PART.foundation, title: '터미널·셸·폴더 구분', component: TerminalModelSlide },
    { id: 'W14', part: PART.rest, title: '휴식 5분', component: BreakSlide },
    { id: 'W15', part: PART.workflow, title: '이름과 로그인은 서로 다르다', component: AccountLayersSlide },
    { id: 'W16', part: PART.workflow, title: '프로젝트는 C:\\dev 아래에', component: FolderRuleSlide },
    { id: 'W17', part: PART.workflow, title: '비밀 정보의 경계', component: SecretBoundarySlide },
    { id: 'W18', part: PART.workflow, title: '실제 서비스 스모크 테스트', component: SmokeTestSlide },
    { id: 'W19', part: PART.workflow, title: 'Claude Code 첫 실행 원칙', component: ClaudeFirstRunSlide },
    { id: 'W20', part: PART.handoff, title: '최종 검수표', component: VerificationSlide },
    { id: 'W21', part: PART.handoff, title: '에러가 났을 때의 네 박자', component: ErrorLoopSlide },
    { id: 'W22', part: PART.handoff, title: '원격으로 만나는 두 가지 방법', component: RemoteSupportSlide },
    { id: 'W23', part: PART.roadmap, title: '직원 같은 에이전트로 가는 사다리', component: AgentLadderSlide },
    { id: 'W24', part: PART.roadmap, title: '여럿이 일하려면 먼저 필요한 레일', component: FactoryRailsSlide },
    { id: 'W25', part: PART.roadmap, title: '앞으로 여섯 번의 미팅', component: MeetingRoadmapSlide },
    { id: 'W26', part: PART.roadmap, title: '오늘 설치하지 않는 것도 결정', component: LaterToolsSlide },
    { id: 'W27', part: PART.closing, title: '다음 시간까지 가져올 것', component: HomeworkSlide },
    { id: 'W28', part: PART.closing, title: '오늘 남길 세 문장', component: SummarySlide },
    { id: 'W29', part: PART.instructor, title: '강사용 수업 전 체크리스트', component: InstructorPrepSlide },
  ],
  shortcuts: [
    { key: 'i', slideId: 'W10', label: '설치 대시보드' },
    { key: 'p', slideId: 'W8', label: '세팅 프롬프트' },
    { key: 'v', slideId: 'W20', label: '최종 검수' },
    { key: 'r', slideId: 'W25', label: '향후 로드맵' },
  ],
}
