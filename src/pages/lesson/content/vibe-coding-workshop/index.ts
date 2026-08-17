import type { DeckDef } from '@/features/slide-deck'
import { DefinitionSlide, IdeaWallSlide, JourneySlide, PromiseSlide, StandbySlide } from './parts/opening'
import { FrontBackSlide, IngredientsSlide, SiteVsAppSlide, ViewSourceSlide } from './parts/webapp'
import { AgentFlowSlide, ChatbotVsAgentSlide, LimitsSlide } from './parts/agent'
import { BreakSlide, LiveDemoSlide, PromptFormulaSlide } from './parts/prompt'
import { PracticeBoardSlide, PracticeReadySlide, TopicPickerSlide, TroubleshootSlide } from './parts/practice'
import { ClosingSlide, MissionSlide, SummarySlide } from './parts/wrapup'

const PART = {
  standby: 'PART 0 · 대기',
  opening: 'PART 1 · 오프닝',
  webapp: 'PART 1 · 웹 앱이란',
  agent: 'PART 1 · AI 에이전트',
  prompt: 'PART 1 · 프롬프트',
  rest: '휴식',
  ready: 'PART 2 · 실습 준비',
  practice: 'PART 2 · 실습 1',
  mission: 'PART 2 · 실습 2',
  closing: 'PART 2 · 마무리',
}

export const vibeCodingWorkshopDeck: DeckDef = {
  slides: [
    { id: 'S0', part: PART.standby, title: '대기 화면', component: StandbySlide },
    { id: 'S1', part: PART.opening, title: '오늘의 약속', component: PromiseSlide },
    { id: 'S2', part: PART.opening, title: '뭘 만들고 싶으세요?', component: IdeaWallSlide },
    { id: 'S3', part: PART.opening, title: '바이브코딩이란?', component: DefinitionSlide },
    { id: 'S4', part: PART.opening, title: '오늘의 여정', component: JourneySlide },
    { id: 'S5', part: PART.webapp, title: '웹사이트 vs 웹 앱', component: SiteVsAppSlide },
    { id: 'S6', part: PART.webapp, title: '⭐ 웹 앱의 3가지 재료', component: IngredientsSlide },
    { id: 'S7', part: PART.webapp, title: '페이지 소스 보기', component: ViewSourceSlide },
    { id: 'S8', part: PART.webapp, title: '프론트엔드와 백엔드', component: FrontBackSlide },
    { id: 'S9', part: PART.agent, title: '챗봇 vs 에이전트', component: ChatbotVsAgentSlide },
    { id: 'S10', part: PART.agent, title: '에이전트의 작업 흐름', component: AgentFlowSlide },
    { id: 'S11', part: PART.agent, title: 'AI의 한계', component: LimitsSlide },
    { id: 'S12', part: PART.prompt, title: '⭐ 프롬프트 공식', component: PromptFormulaSlide },
    { id: 'S13', part: PART.prompt, title: '라이브 데모', component: LiveDemoSlide },
    { id: 'S14', part: PART.rest, title: '휴식 5분', component: BreakSlide },
    { id: 'S15', part: PART.ready, title: '실습 준비 체크리스트', component: PracticeReadySlide },
    { id: 'S16', part: PART.ready, title: '주제 선택', component: TopicPickerSlide },
    { id: 'S17', part: PART.practice, title: '⭐ 실습 1 진행 대시보드', component: PracticeBoardSlide },
    { id: 'S18', part: PART.practice, title: '트러블슈팅 치트시트', component: TroubleshootSlide },
    { id: 'S19', part: PART.mission, title: '업그레이드 미션', component: MissionSlide },
    { id: 'S20', part: PART.closing, title: '오늘의 3줄', component: SummarySlide },
    { id: 'S21', part: PART.closing, title: '다음 단계 & 마침', component: ClosingSlide },
  ],
  shortcuts: [{ key: 'p', slideId: 'S12', label: '프롬프트 공식' }],
}
