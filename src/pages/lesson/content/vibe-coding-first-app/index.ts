import type { DeckDef } from '@/features/slide-deck'
import { DefinitionSlide, IdeaWallSlide, JourneySlide, PromiseSlide, StandbySlide } from './parts/opening'
import { CodeIsTextSlide, LanguagesSlide, WhatIsDevSlide } from './parts/basics'
import { FrontBackSlide, IngredientsSlide, SiteVsAppSlide, ViewSourceSlide } from './parts/webapp'
import { FirstCommandsSlide, ItRunsSlide, LocalhostSlide, TerminalSlide, ThreeToolsSlide } from './parts/local'
import { AgentFlowSlide, AgentOnMyComputerSlide, ChatbotVsAgentSlide, LimitsSlide } from './parts/agent'
import { BreakSlide, LiveDemoSlide, PromptFormulaSlide } from './parts/prompt'
import { PracticeBoardSlide, PracticeReadySlide, TopicPickerSlide, TroubleshootSlide } from './parts/practice'
import { StudyLoopSlide, StudyPromptSlide, WhyStudyAloneSlide } from './parts/study-alone'
import { ClosingSlide, MissionSlide, PrepChecklistSlide, SummarySlide } from './parts/wrapup'

const PART = {
  standby: 'PART 0 · 대기',
  opening: 'PART 1 · 오프닝',
  basics: 'PART 1 · 개발이란',
  webapp: 'PART 1 · 웹 앱이란',
  local: 'PART 1 · 내 컴퓨터에서',
  agent: 'PART 1 · AI 에이전트',
  prompt: 'PART 1 · 프롬프트',
  rest: '휴식',
  ready: 'PART 2 · 실습 준비',
  practice: 'PART 2 · 만들기',
  mission: 'PART 2 · 업그레이드',
  study: 'PART 2 · 혼자 공부하는 법',
  closing: 'PART 2 · 마무리',
  instructor: '강사용',
}

/**
 * 1대1 수업용 덱. 개발을 한 번도 안 해본 사람이 2시간 안에
 * ① 에이전트와 함께 앱을 만들어 로컬에서 띄우고
 * ② 이후 혼자 공부할 프롬프트를 들고 가는 것까지 간다.
 * PART 1은 화면 수가 많지만 강사가 속도로 조절하는 구간이다.
 */
export const vibeCodingFirstAppDeck: DeckDef = {
  slides: [
    { id: 'V0', part: PART.standby, title: '대기 화면', component: StandbySlide },
    { id: 'V1', part: PART.opening, title: '오늘의 약속', component: PromiseSlide },
    { id: 'V2', part: PART.opening, title: '뭘 만들고 싶으세요?', component: IdeaWallSlide },
    { id: 'V3', part: PART.opening, title: '바이브코딩이란?', component: DefinitionSlide },
    { id: 'V4', part: PART.opening, title: '오늘의 여정', component: JourneySlide },
    { id: 'V5', part: PART.basics, title: '개발 = 순서를 적는 일', component: WhatIsDevSlide },
    { id: 'V6', part: PART.basics, title: '코드는 글자 파일', component: CodeIsTextSlide },
    { id: 'V7', part: PART.basics, title: '언어가 여러 개인 이유', component: LanguagesSlide },
    { id: 'V8', part: PART.webapp, title: '웹사이트 vs 웹 앱', component: SiteVsAppSlide },
    { id: 'V9', part: PART.webapp, title: '⭐ 웹 앱의 3가지 재료', component: IngredientsSlide },
    { id: 'V10', part: PART.webapp, title: '페이지 소스 보기', component: ViewSourceSlide },
    { id: 'V11', part: PART.webapp, title: '프론트엔드와 백엔드', component: FrontBackSlide },
    { id: 'V12', part: PART.local, title: '터미널이란', component: TerminalSlide },
    { id: 'V13', part: PART.local, title: '⭐ localhost와 포트', component: LocalhostSlide },
    { id: 'V14', part: PART.local, title: '오늘 쓰는 창 3개', component: ThreeToolsSlide },
    { id: 'V15', part: PART.agent, title: '챗봇 vs 에이전트', component: ChatbotVsAgentSlide },
    { id: 'V16', part: PART.agent, title: '에이전트의 작업 흐름', component: AgentFlowSlide },
    { id: 'V17', part: PART.agent, title: '내 컴퓨터에서 하는 일', component: AgentOnMyComputerSlide },
    { id: 'V18', part: PART.agent, title: 'AI의 한계', component: LimitsSlide },
    { id: 'V19', part: PART.prompt, title: '⭐ 프롬프트 공식', component: PromptFormulaSlide },
    { id: 'V20', part: PART.prompt, title: '라이브 데모', component: LiveDemoSlide },
    { id: 'V21', part: PART.rest, title: '휴식 5분', component: BreakSlide },
    { id: 'V22', part: PART.ready, title: '실습 준비 체크리스트', component: PracticeReadySlide },
    { id: 'V23', part: PART.ready, title: '⭐ 직접 치는 명령 세 줄', component: FirstCommandsSlide },
    { id: 'V24', part: PART.ready, title: '주제 선택', component: TopicPickerSlide },
    { id: 'V25', part: PART.practice, title: '⭐ 실습 진행 대시보드', component: PracticeBoardSlide },
    { id: 'V26', part: PART.practice, title: '떴는지 확인하기', component: ItRunsSlide },
    { id: 'V27', part: PART.practice, title: '트러블슈팅 치트시트', component: TroubleshootSlide },
    { id: 'V28', part: PART.mission, title: '업그레이드 미션', component: MissionSlide },
    { id: 'V29', part: PART.study, title: '두 번 막히는 순간', component: WhyStudyAloneSlide },
    { id: 'V30', part: PART.study, title: '⭐ 공부용 프롬프트 복사', component: StudyPromptSlide },
    { id: 'V31', part: PART.study, title: '프롬프트가 만드는 것', component: StudyLoopSlide },
    { id: 'V32', part: PART.closing, title: '오늘의 3줄', component: SummarySlide },
    { id: 'V33', part: PART.closing, title: '다음 단계 & 마침', component: ClosingSlide },
    { id: 'V34', part: PART.instructor, title: '수업 전 준비 체크리스트', component: PrepChecklistSlide },
  ],
  shortcuts: [
    { key: 'p', slideId: 'V19', label: '프롬프트 공식' },
    { key: 't', slideId: 'V27', label: '트러블슈팅' },
    { key: 's', slideId: 'V30', label: '공부 프롬프트' },
  ],
}
