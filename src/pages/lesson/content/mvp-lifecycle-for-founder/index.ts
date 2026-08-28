import type { DeckDef } from '../../deck'
import { GoalSlide, StandbySlide } from './parts/opening'
import {
  AcceptanceSlide,
  BreakSlide,
  BuildFlowSlide,
  CodeEconomicsSlide,
  DataModelSlide,
  DeployCheckSlide,
  DeploySlide,
  FeatureCutSlide,
  GoodCodeSlide,
  HypothesisSlide,
  InvariantsSlide,
  LifecycleLoopSlide,
  MaintenanceSlide,
  MvpLoopSlide,
  OperateSlide,
  ProblemStatementSlide,
  ScreenStatesSlide,
  StackSlide,
  UserFlowSlide,
  VerifySlide,
} from './parts/lifecycle'
import {
  AskStepsSlide,
  ErrorTableSlide,
  RealChatSlide,
  SecretsSlide,
  VerifyCommandsSlide,
  WhyHardSlide,
} from './parts/agent'
import {
  CoachPromptSlide,
  HomeworkMapSlide,
  StepsFiveSixSlide,
  StepsOneTwoSlide,
  StepsSevenEightSlide,
  StepsThreeFourSlide,
} from './parts/homework'
import { NextSessionSlide, PrepChecklistSlide, SummarySlide } from './parts/wrapup'

const PART = {
  standby: 'PART 0 · 시작 전',
  intro: 'PART 1 · 개발 생명주기',
  plan: 'PART 1 · ① 기획',
  ux: 'PART 1 · ② UX',
  design: 'PART 1 · ③ 설계',
  build: 'PART 1 · ④ 구현',
  verify: 'PART 1 · ⑤ 검증',
  deploy: 'PART 1 · ⑥ 배포',
  operate: 'PART 1 · ⑦ 운영',
  rest: '휴식',
  agent: 'PART 2 · 에이전트에게 시키기',
  homework: 'PART 3 · 혼자 할 8단계',
  closing: 'PART 3 · 마무리',
  instructor: '강사용',
}

/**
 * 1대1 수업용 덱, 2회 과정의 1회차. 자기 아이디어로 MVP를 만들어 100명이 써보게 하려는
 * 비개발자 창업자에게 ① 개발이 기획→UX→설계→구현→검증→배포→운영으로 한 바퀴 돈다는 지도를
 * 단계마다 2~3화면씩 깊게(문제 문장 쓰는 법 · 기능 자르기 · 가설과 숫자 · 화면의 4가지 상태 ·
 * 스택 선택 기준 · 데이터 모델 · 헌법 · 좋은 코드란 · 기술부채 · 수용 기준 쓰는 법 · 배포 주소가
 * 바뀌면 따라 바뀌는 콘솔 · 유지보수 우선순위 표) 그리고 ② 콘솔 연동처럼 어려운 일을
 * Claude Code에게 시키고 검증하는 법을 빠르게 훑고 ③ 수업 후 혼자 할 8단계를 성공 기준과 함께 넘긴다.
 *
 * 예시는 강사가 Claude Code로 약 15분에 만든 `map-demo`(React + Supabase + Google Maps + Netlify)
 * 하나를 PART 1 내내 물고 간다 — 단, 이 레포는 **결과물 예시**다. 수강생은 이걸 클론하지 않고
 * 자기 아이디어로 빈 폴더에서 같은 수준까지 간다. 그래서 PART 3의 8단계는 어느 아이디어에도
 * 적용되는 순서(한 문단 기획 → 설계 문서 → 가짜 데이터 첫 화면 → 로그인·DB → 외부 API → 배포 →
 * 지키기 → 5명 반응 + BLOCKERS.md)이고, 마지막이 숙제가 아니라 MVP 코치 프롬프트
 * (model/setup-coach-prompt.md)다. 2회차는 결과물과 BLOCKERS.md를 같이 열어 막힌 곳을 푼다.
 *
 * 슬라이드의 폴더명·에러 문구·명령·수용 기준 문장은 map-demo에 실제로 있는 것만 쓴다(model/mvp-samples.ts).
 */
export const mvpLifecycleForFounderDeck: DeckDef = {
  slides: [
    { id: 'M0', part: PART.standby, title: '시작 전 · 준비 확인', component: StandbySlide },
    { id: 'M1', part: PART.intro, title: '오늘의 도착점 · 100명이 쓰는 MVP', component: GoalSlide },
    { id: 'M2', part: PART.intro, title: '⭐ 개발은 한 바퀴 · 7단계', component: LifecycleLoopSlide },
    { id: 'M3', part: PART.plan, title: '⭐ 기획 1/3 · 문제 한 문장', component: ProblemStatementSlide },
    { id: 'M4', part: PART.plan, title: '⭐ 기획 2/3 · 기능 자르기', component: FeatureCutSlide },
    { id: 'M5', part: PART.plan, title: '기획 3/3 · 가설과 숫자', component: HypothesisSlide },
    { id: 'M6', part: PART.ux, title: 'UX 1/2 · 해피 패스 한 줄', component: UserFlowSlide },
    { id: 'M7', part: PART.ux, title: '⭐ UX 2/2 · 화면의 4가지 상태', component: ScreenStatesSlide },
    { id: 'M8', part: PART.design, title: '설계 1/3 · 스택 선택 기준 3개', component: StackSlide },
    { id: 'M9', part: PART.design, title: '⭐ 설계 2/3 · 표 · 선 · 규칙', component: DataModelSlide },
    { id: 'M10', part: PART.design, title: '설계 3/3 · 헌법', component: InvariantsSlide },
    { id: 'M11', part: PART.build, title: '구현 1/3 · spec → job → code', component: BuildFlowSlide },
    { id: 'M12', part: PART.build, title: '⭐ 구현 2/3 · 좋은 코드란', component: GoodCodeSlide },
    { id: 'M13', part: PART.build, title: '구현 3/3 · 좋은 코드가 돈인 이유', component: CodeEconomicsSlide },
    { id: 'M14', part: PART.verify, title: '검증 1/2 · 기계와 사람', component: VerifySlide },
    { id: 'M15', part: PART.verify, title: '⭐ 검증 2/2 · 수용 기준 쓰는 법', component: AcceptanceSlide },
    { id: 'M16', part: PART.deploy, title: '배포 1/2 · 열쇠 4개', component: DeploySlide },
    { id: 'M17', part: PART.deploy, title: '배포 2/2 · 주소가 생기면 할 일 4개', component: DeployCheckSlide },
    { id: 'M18', part: PART.operate, title: '운영 1/2 · 리스크와 방어', component: OperateSlide },
    { id: 'M19', part: PART.operate, title: '⭐ 운영 2/2 · 유지보수 우선순위 표', component: MaintenanceSlide },
    { id: 'M20', part: PART.intro, title: '⭐ MVP는 작은 한 바퀴', component: MvpLoopSlide },
    { id: 'M21', part: PART.rest, title: '휴식 5분', component: BreakSlide },
    { id: 'M22', part: PART.agent, title: '연동이 어려운 진짜 이유', component: WhyHardSlide },
    { id: 'M23', part: PART.agent, title: '⭐ 실제 대화 · GCP를 이렇게 물었다', component: RealChatSlide },
    { id: 'M24', part: PART.agent, title: '⭐ 막혔을 때 4단계', component: AskStepsSlide },
    { id: 'M25', part: PART.agent, title: '자주 나는 에러 4개', component: ErrorTableSlide },
    { id: 'M26', part: PART.agent, title: '⭐ 절대 붙이지 말 것', component: SecretsSlide },
    { id: 'M27', part: PART.agent, title: '검증은 명령 결과로', component: VerifyCommandsSlide },
    { id: 'M28', part: PART.homework, title: '⭐ 실습 지도 · 내 아이디어로 8단계', component: HomeworkMapSlide },
    { id: 'M29', part: PART.homework, title: '1~2 · 한 문단 기획 · 설계 문서', component: StepsOneTwoSlide },
    { id: 'M30', part: PART.homework, title: '3~4 · 가짜 데이터 화면 · 로그인+DB', component: StepsThreeFourSlide },
    { id: 'M31', part: PART.homework, title: '5~6 · 외부 API · 배포', component: StepsFiveSixSlide },
    { id: 'M32', part: PART.homework, title: '7~8 · 지키기 · 5명 반응 + BLOCKERS.md', component: StepsSevenEightSlide },
    { id: 'M33', part: PART.homework, title: '⭐ MVP 코치 프롬프트', component: CoachPromptSlide },
    { id: 'M34', part: PART.closing, title: '오늘 남길 3줄', component: SummarySlide },
    { id: 'M35', part: PART.closing, title: '다음 시간 · 결과물 같이 열기', component: NextSessionSlide },
    { id: 'M36', part: PART.instructor, title: '수업 전 준비 체크리스트', component: PrepChecklistSlide },
  ],
  shortcuts: [
    { key: 'l', slideId: 'M2', label: '생명주기' },
    { key: 'g', slideId: 'M12', label: '좋은 코드' },
    { key: 'a', slideId: 'M24', label: '4단계' },
    { key: 'h', slideId: 'M28', label: '8단계' },
    { key: 'p', slideId: 'M33', label: '프롬프트' },
  ],
}
