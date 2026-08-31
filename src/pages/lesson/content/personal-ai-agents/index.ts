import type { DeckDef } from '../../deck'
import {
  AgentBriefSlide,
  AgentLoopSlide,
  AgentPartsSlide,
  ChatbotVsAgentSlide,
  HumanAgentRolesSlide,
} from './parts/concepts'
import {
  BreakSlide,
  CoachBlueprintSlide,
  DailyLoopSlide,
  EnglishGoalSlide,
  EnglishPromptSlide,
  FeedbackSlide,
  RoleplaySlide,
  StudyLogSlide,
} from './parts/english'
import { FinishLineSlide, JourneySlide, StandbySlide } from './parts/opening'
import {
  DeckStorySlide,
  EvidenceTableSlide,
  FactInterpretationSlide,
  LiveBuildSlide,
  PptMissionSlide,
  PptPracticeSlide,
  PptPromptSlide,
  PptReviewSlide,
  ResearchPromptSlide,
  SourceMapSlide,
} from './parts/ppt'
import { NextActionsSlide, SummarySlide, WorkspacesSlide } from './parts/wrapup'

const PART = {
  standby: 'PART 0 · 시작 전',
  concept: 'PART 1 · 에이전트란',
  ppt: 'PART 2 · Zonta PPT',
  rest: '휴식',
  english: 'PART 3 · 영어 코치',
  closing: 'PART 4 · 내 프로젝트',
}

/**
 * AI 경험이 많지 않지만 10월 Zonta 오리엔테이션 PPT라는 급한 산출물이 있고,
 * 장기적으로 Zonta·영어·투자·전시기획을 위한 AI 프로젝트 관리 체계를 만들고 싶은
 * 1대1 학습자용 첫 수업. 앞 20분에 에이전트를 목표→계획→도구→검수→보고의 반복으로
 * 설명하고, Zonta 공식 자료를 조사해 근거표와 PPT 초안을 만드는 한 바퀴를 시연·실습한다.
 * 후반에는 같은 구조를 매일 15분 영어 역할극 코치로 옮겨 직접 만든다.
 *
 * 강사는 Zonta의 내용을 대신 결정하지 않는다. 공식 출처·날짜·불확실성을 남기는 조사 구조와
 * 파일 제작 방법을 보여주고, 국제/한국의 해석·현안·동기부여 메시지는 학습자가 승인하게 한다.
 */
export const personalAiAgentsDeck: DeckDef = {
  slides: [
    { id: 'A0', part: PART.standby, title: '시작 전 · 준비 확인', component: StandbySlide },
    { id: 'A1', part: PART.concept, title: '오늘 남길 세 가지', component: FinishLineSlide },
    { id: 'A2', part: PART.concept, title: '120분 여정', component: JourneySlide },
    { id: 'A3', part: PART.concept, title: '⭐ 챗봇과 에이전트', component: ChatbotVsAgentSlide },
    { id: 'A4', part: PART.concept, title: '⭐ 에이전트의 다섯 단계', component: AgentLoopSlide },
    { id: 'A5', part: PART.concept, title: '에이전트의 네 부품', component: AgentPartsSlide },
    { id: 'A6', part: PART.concept, title: '⭐ 사람과 에이전트의 역할', component: HumanAgentRolesSlide },
    { id: 'A7', part: PART.concept, title: '⭐ 에이전트 브리프 일곱 칸', component: AgentBriefSlide },
    { id: 'A8', part: PART.ppt, title: 'PPT 목표부터 정하기', component: PptMissionSlide },
    { id: 'A9', part: PART.ppt, title: '공식 원문부터 보는 출처 지도', component: SourceMapSlide },
    { id: 'A10', part: PART.ppt, title: '⭐ Zonta 조사 에이전트 프롬프트', component: ResearchPromptSlide },
    { id: 'A11', part: PART.ppt, title: '⭐ 조사 내용을 근거표에 모으기', component: EvidenceTableSlide },
    { id: 'A12', part: PART.ppt, title: '사실 · 해석 · 질문 분리', component: FactInterpretationSlide },
    { id: 'A13', part: PART.ppt, title: '10장 이야기 구조', component: DeckStorySlide },
    { id: 'A14', part: PART.ppt, title: '⭐ Zonta PPT 제작 프롬프트', component: PptPromptSlide },
    { id: 'A15', part: PART.ppt, title: '라이브 PPT 제작 흐름', component: LiveBuildSlide },
    { id: 'A16', part: PART.ppt, title: '직접 한 장 수정하기', component: PptPracticeSlide },
    { id: 'A17', part: PART.ppt, title: '⭐ PPT 최종 점검', component: PptReviewSlide },
    { id: 'A18', part: PART.rest, title: '휴식 5분', component: BreakSlide },
    { id: 'A19', part: PART.english, title: '영어 목표를 실제 장면으로', component: EnglishGoalSlide },
    { id: 'A20', part: PART.english, title: '영어 코치의 네 부품', component: CoachBlueprintSlide },
    { id: 'A21', part: PART.english, title: '⭐ 영어 코치 프롬프트', component: EnglishPromptSlide },
    { id: 'A22', part: PART.english, title: '⭐ 매일 15분 학습 루프', component: DailyLoopSlide },
    { id: 'A23', part: PART.english, title: '국제회의 역할극 시연', component: RoleplaySlide },
    { id: 'A24', part: PART.english, title: '말하기 피드백 규칙', component: FeedbackSlide },
    { id: 'A25', part: PART.english, title: '학습 기록 남기기', component: StudyLogSlide },
    { id: 'A26', part: PART.closing, title: '네 개의 AI 작업실', component: WorkspacesSlide },
    { id: 'A27', part: PART.closing, title: '오늘의 세 동사', component: SummarySlide },
    { id: 'A28', part: PART.closing, title: '첫 주에 할 일', component: NextActionsSlide },
  ],
  shortcuts: [
    { key: 'a', slideId: 'A3', label: '에이전트란' },
    { key: 'b', slideId: 'A7', label: '브리프 공식' },
    { key: 'r', slideId: 'A10', label: '조사 프롬프트' },
    { key: 'p', slideId: 'A14', label: 'PPT 프롬프트' },
    { key: 'e', slideId: 'A21', label: '영어 코치' },
    { key: 'w', slideId: 'A26', label: '네 작업실' },
  ],
}
