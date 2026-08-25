import type { DeckDef } from '../../deck'
import { JourneySlide, ReadVsTypeSlide, StandbySlide, ThreePlacesSlide, ThreeScenesSlide } from './parts/opening'
import { CommitSaveSlide, SaveVsUploadSlide, TermsSlide } from './parts/concepts'
import {
  AheadBehindSlide,
  BranchBasicsSlide,
  DangerSignsSlide,
  LogReadingSlide,
  RemoteSlide,
  StatusLifecycleSlide,
  TwoComputersSlide,
  WrongBranchSlide,
} from './parts/terminal'
import {
  ActionsLogSlide,
  ActionsOverviewSlide,
  AiPrReviewSlide,
  BreakSlide,
  CommitDiffSlide,
  CommitsPageSlide,
  PrFourPlacesSlide,
  PrWaitingRoomSlide,
  RepoHomeSlide,
  SecretsSlide,
} from './parts/github-web'
import {
  ActionsNotDeploymentSlide,
  ActivitySlide,
  CapstoneSlide,
  DeploymentHistorySlide,
  DeploymentStatesSlide,
  RollbackSlide,
} from './parts/operations'
import { DiagnosisFlowSlide, JudgmentQuizSlide, SyncRoutineSlide, VerifyAiSlide } from './parts/diagnosis'
import { NextSessionSlide, PrepChecklistSlide, SummarySlide } from './parts/wrapup'

const PART = {
  standby: 'PART 0 · 시작 전',
  opening: 'PART 1 · 왜 읽나',
  concepts: 'PART 1 · 개념 최소한',
  terminal: 'PART 1 · 터미널 출력 읽기',
  rest: '휴식',
  github: 'PART 2 · GitHub 웹에서 읽기',
  diagnosis: 'PART 2 · 진단 실습',
  operations: 'PART 2 · 운영과 복구',
  closing: 'PART 2 · 마무리',
  instructor: '강사용',
}

/**
 * 1대1 수업용 덱, 2회 과정의 1회차. AI(Claude Code)로 웹서비스 여러 개를 운영하는
 * 비개발자 창업자가 2시간 40분 안에 ① status·log·remote 출력을 읽고 ② 여러 컴퓨터와
 * 브랜치 중 어디가 최신인지 판단하고 ③ GitHub에서 PR·Actions·Deployments를 읽어서
 * ④ "사이트에 반영이 안 돼요"를 6단계로 진단하고 안전한 복구를 지시하는 것까지 간다.
 *
 * 코딩 수업이 아니라 읽기/판단 수업이다 — 타이핑은 AI가 하고, 판단은 수강생이 한다.
 * 그래서 모든 출력 화면이 "번역 → 판단 → Claude에게 시킬 말" 순서로 끝난다.
 *
 * 예제는 시나리오 하나를 계속 물고 간다(model/git-samples.ts 참고) —
 * "Claude가 푸시했다는데 사이트에 배너가 없다"를 푸시 누락, 새 파일 누락,
 * 잘못된 브랜치, 미병합 PR, production 배포 불일치로 확장해 반복해서 푼다.
 * PART 2 중반부터는 예제를 접고 수강생 본인의 실제 레포를 연다.
 *
 * 2회차(브라우저 F12 — Console·Network·캐시)는 진단 6단계의 마지막 칸에서 예고한다.
 */
export const gitReadingForFounderDeck: DeckDef = {
  slides: [
    { id: 'G0', part: PART.standby, title: '시작 전 · 준비 확인', component: StandbySlide },
    { id: 'G1', part: PART.opening, title: '어느 창업자의 세 장면', component: ThreeScenesSlide },
    { id: 'G2', part: PART.opening, title: '타이핑은 AI가, 판단은 내가', component: ReadVsTypeSlide },
    { id: 'G3', part: PART.opening, title: '⭐ 코드가 사는 세 곳', component: ThreePlacesSlide },
    { id: 'G4', part: PART.opening, title: '오늘의 도착점', component: JourneySlide },
    { id: 'G5', part: PART.concepts, title: '용어 4개 · repo부터 pull까지', component: TermsSlide },
    { id: 'G6', part: PART.concepts, title: '커밋은 저장 지점', component: CommitSaveSlide },
    { id: 'G7', part: PART.concepts, title: '⭐ 저장했다 ≠ 올렸다', component: SaveVsUploadSlide },
    { id: 'G8', part: PART.terminal, title: '⭐ git status · 고치고 커밋하고 푸시하면', component: StatusLifecycleSlide },
    { id: 'G9', part: PART.terminal, title: 'ahead/behind 번역표', component: AheadBehindSlide },
    { id: 'G10', part: PART.terminal, title: '⭐ git log · 어디까지 올라갔나', component: LogReadingSlide },
    { id: 'G11', part: PART.terminal, title: 'git remote -v · 이 폴더는 어느 서비스인가', component: RemoteSlide },
    { id: 'G12', part: PART.terminal, title: '지금 어느 브랜치인가', component: BranchBasicsSlide },
    { id: 'G13', part: PART.terminal, title: '⭐ 엉뚱한 브랜치에 푸시한 사례', component: WrongBranchSlide },
    { id: 'G14', part: PART.terminal, title: '⭐ 두 컴퓨터, 어디가 최신인가', component: TwoComputersSlide },
    { id: 'G15', part: PART.terminal, title: '멈추고 읽어야 할 신호 3개', component: DangerSignsSlide },
    { id: 'G16', part: PART.rest, title: '휴식 5분', component: BreakSlide },
    { id: 'G17', part: PART.github, title: '실습 · 내 레포 첫 화면 4군데', component: RepoHomeSlide },
    { id: 'G18', part: PART.github, title: '⭐ push 확인은 commits에서', component: CommitsPageSlide },
    { id: 'G19', part: PART.github, title: '커밋 열어보기 · AI가 뭘 바꿨나', component: CommitDiffSlide },
    { id: 'G20', part: PART.github, title: 'PR은 합치기 전 대기실', component: PrWaitingRoomSlide },
    { id: 'G21', part: PART.github, title: 'PR에서 볼 곳 4개', component: PrFourPlacesSlide },
    { id: 'G22', part: PART.github, title: '⭐ AI가 만든 PR 검토하기', component: AiPrReviewSlide },
    { id: 'G23', part: PART.github, title: 'Actions · 초록 체크와 빨간 ✗', component: ActionsOverviewSlide },
    { id: 'G24', part: PART.github, title: '⭐ 실패 로그에서 원인 찾기', component: ActionsLogSlide },
    { id: 'G25', part: PART.github, title: 'Actions 초록 = 무조건 배포 성공?', component: ActionsNotDeploymentSlide },
    { id: 'G26', part: PART.github, title: '⭐ Deployments에서 실제 배포 확인', component: DeploymentHistorySlide },
    { id: 'G27', part: PART.github, title: '배포 대기·성공·실패·취소', component: DeploymentStatesSlide },
    { id: 'G28', part: PART.github, title: '내 API 키는 안전한가', component: SecretsSlide },
    { id: 'G29', part: PART.diagnosis, title: '⭐ "반영이 안 돼요" 진단 6단계', component: DiagnosisFlowSlide },
    { id: 'G30', part: PART.diagnosis, title: '⭐ 상황 판단 퀴즈 3문제', component: JudgmentQuizSlide },
    { id: 'G31', part: PART.diagnosis, title: 'AI의 보고를 확인하는 법', component: VerifyAiSlide },
    { id: 'G32', part: PART.diagnosis, title: '⭐ 받고 시작, 올리고 끝', component: SyncRoutineSlide },
    { id: 'G33', part: PART.operations, title: 'Activity · 누가 무엇을 바꿨나', component: ActivitySlide },
    { id: 'G34', part: PART.operations, title: '⭐ 마지막 정상 버전으로 복구하기', component: RollbackSlide },
    { id: 'G35', part: PART.operations, title: '⭐ 최종 종합 미스터리', component: CapstoneSlide },
    { id: 'G36', part: PART.closing, title: '오늘 남길 3줄', component: SummarySlide },
    { id: 'G37', part: PART.closing, title: '다음 시간 · F12 예고', component: NextSessionSlide },
    { id: 'G38', part: PART.instructor, title: '수업 전 준비 체크리스트', component: PrepChecklistSlide },
  ],
  shortcuts: [
    { key: 's', slideId: 'G8', label: 'status' },
    { key: 't', slideId: 'G14', label: '두 컴퓨터' },
    { key: 'a', slideId: 'G23', label: 'Actions' },
    { key: 'd', slideId: 'G29', label: '진단' },
  ],
}
