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
import { PromptHandoffSlide } from './parts/workflow'
import {
  BlueprintCanvasSlide,
  BlueprintIntroSlide,
  CandidateScoreSlide,
  CodingAgentTeamSlide,
  CodingFlowSlide,
  CodingMaturitySlide,
} from './parts/blueprint'
import {
  MarketingAgentTeamSlide,
  MarketingAutomationGallerySlide,
  MarketingControlLoopSlide,
  UsMarketingChannelsSlide,
} from './parts/growth'
import {
  AutomationLayersSlide,
  AutomationRoadmapSlide,
  AutonomyBoundarySlide,
  HermesFutureSlide,
  RuntimeOptionsSlide,
} from './parts/operations'

const PART = {
  standby: 'PART 0 · 시작 전',
  opening: 'PART 1 · 오늘의 설계',
  foundation: 'PART 1 · Windows 작업실',
  rest: '휴식',
  blueprint: 'PART 2 · 자동화 블루프린트',
}

/**
 * 기존 Git/GitHub 읽기 수업을 마친 비개발자 창업자와 진행하는 후속 1대1 수업.
 * 사람이 VS Code와 Claude Code만 설치한 뒤, 하나의 프롬프트로 나머지 개발 환경을
 * Claude Code가 자동 설치·검증하게 만든다. 2부에서는 구현하지 않고 교수님의 사업을 위한
 * 코딩 에이전트, 미국 마케팅 자동화, 상시 실행 환경의 블루프린트를 함께 설계한다.
 *
 * 오늘은 멀티 에이전트, 마케팅 계정, VPS, Hermes를 설치하거나 연결하지 않는다. 가능성을
 * 넓게 비교하고 사람 승인선과 도입 순서를 정한 뒤, 후속 미팅에서 작은 파일럿부터 시작한다.
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
    { id: 'W15', part: PART.blueprint, title: '2부는 만들지 않고 설계합니다', component: BlueprintIntroSlide },
    { id: 'W16', part: PART.blueprint, title: '자동화 블루프린트 한 장', component: BlueprintCanvasSlide },
    { id: 'W17', part: PART.blueprint, title: '첫 자동화 후보를 고르는 기준', component: CandidateScoreSlide },
    { id: 'W18', part: PART.blueprint, title: 'AI 코딩 직원 구성', component: CodingAgentTeamSlide },
    { id: 'W19', part: PART.blueprint, title: '코딩 에이전트의 작업 흐름', component: CodingFlowSlide },
    { id: 'W20', part: PART.blueprint, title: '코딩 에이전트 성숙도', component: CodingMaturitySlide },
    { id: 'W21', part: PART.blueprint, title: '미국 마케팅 가능성 지도', component: UsMarketingChannelsSlide },
    { id: 'W22', part: PART.blueprint, title: '마케팅 에이전트 조직', component: MarketingAgentTeamSlide },
    { id: 'W23', part: PART.blueprint, title: '마케팅 자동화 후보', component: MarketingAutomationGallerySlide },
    { id: 'W24', part: PART.blueprint, title: '미국 마케팅 자동화 한 바퀴', component: MarketingControlLoopSlide },
    { id: 'W25', part: PART.blueprint, title: '에이전트·워크플로·실행 장소', component: AutomationLayersSlide },
    { id: 'W26', part: PART.blueprint, title: '노트북이 꺼져도 도는 네 가지 길', component: RuntimeOptionsSlide },
    { id: 'W27', part: PART.blueprint, title: 'Hermes라는 미래 후보', component: HermesFutureSlide },
    { id: 'W28', part: PART.blueprint, title: '자동화 권한 신호등', component: AutonomyBoundarySlide },
    { id: 'W29', part: PART.blueprint, title: '앞으로 여섯 번의 미팅', component: AutomationRoadmapSlide },
  ],
  shortcuts: [
    { key: 'i', slideId: 'W10', label: '설치 대시보드' },
    { key: 'p', slideId: 'W8', label: '세팅 프롬프트' },
    { key: 'b', slideId: 'W16', label: '블루프린트' },
    { key: 'c', slideId: 'W18', label: '코딩 조직' },
    { key: 'm', slideId: 'W21', label: '미국 마케팅' },
    { key: 'a', slideId: 'W26', label: '상시 실행' },
    { key: 'r', slideId: 'W29', label: '향후 로드맵' },
  ],
}
