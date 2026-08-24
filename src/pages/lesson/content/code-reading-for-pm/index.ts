import type { DeckDef } from '../../deck'
import { JobDescriptionSlide, JourneySlide, ReadVsWriteSlide, StandbySlide, WhyReadSlide } from './parts/opening'
import {
  FourPiecesSlide,
  FourSpotsSlide,
  PolicyInCodeSlide,
  ReadLineByLineSlide,
  ReadLoopSlide,
} from './parts/reading'
import {
  BreakSlide,
  DiffSlide,
  ErrorLogSlide,
  PullRequestSlide,
  RepoTermsSlide,
  ThreeLayersSlide,
} from './parts/repo'
import {
  AskAiSlide,
  BoundariesSlide,
  CoachPromptSlide,
  PracticeReposSlide,
  ReadingOrderSlide,
  SummaryDrillSlide,
} from './parts/practice'
import { BetterQuestionsSlide, EstimateSlide, SpecWritingSlide } from './parts/conversation'
import { CurriculumSlide, HandoffSlide, PrepChecklistSlide, SummarySlide } from './parts/wrapup'

const PART = {
  standby: 'PART 0 · 시작 전',
  opening: 'PART 1 · 왜 읽나',
  syntax: 'PART 1 · 문법 최소한',
  read: 'PART 1 · 한 줄씩 읽기',
  repo: 'PART 1 · 코드가 사는 집',
  rest: '휴식',
  practice: 'PART 2 · 직접 읽기',
  talk: 'PART 2 · 개발자와 대화',
  closing: 'PART 2 · 마무리',
  instructor: '강사용',
}

/**
 * 1대1 수업용 덱. PM 지망 대학생이 2시간 안에
 * ① 함수 두 개(조건·반복)를 한 줄씩 읽고 ② PR diff 하나를 세 문장으로 요약하고
 * ③ 수업 후 1주차부터 혼자 돌릴 커리큘럼과 코치 프롬프트를 들고 가는 것까지 간다.
 *
 * 강사가 함께하는 건 오늘 2시간뿐이다. 그래서 마지막 두 화면이 숙제가 아니라 혼자 돌릴 커리큘럼이고,
 * 같은 주차 계획이 model/curriculum.ts와 coach-prompt.md 양쪽에 들어 있다.
 *
 * PART 1은 배송비 계산 함수 하나를 계속 물고 간다 — 조건 읽기 → 그 함수가 쓰는 합계 함수의
 * 반복문 → 같은 함수의 diff → 같은 함수에서 터진 에러. 화면마다 새 예제를 꺼내면 읽는 연습이 안 쌓인다.
 * PART 2는 예제를 버리고 실제 레포 링크를 열어 같은 순서로 읽는다 — 읽을 파일 세 개는
 * 모두 Cal.com packages/lib에 두어 같은 폴더를 세 번 보게 하고, diff는 Cal.com PR이나
 * pretty-bytes 커밋에서 고른다(작은 레포라 커밋 하나가 곧 diff 하나다).
 */
export const codeReadingForPmDeck: DeckDef = {
  slides: [
    { id: 'R0', part: PART.standby, title: '시작 전 · 준비 확인', component: StandbySlide },
    { id: 'R1', part: PART.opening, title: '그 피드백을 번역하면', component: WhyReadSlide },
    { id: 'R2', part: PART.opening, title: '읽기와 쓰기는 다른 능력', component: ReadVsWriteSlide },
    { id: 'R3', part: PART.opening, title: 'APM 공고의 문구 + 공고 링크', component: JobDescriptionSlide },
    { id: 'R4', part: PART.opening, title: '오늘의 도착점', component: JourneySlide },
    { id: 'R5', part: PART.syntax, title: '⭐ 코드는 결국 4가지', component: FourPiecesSlide },
    { id: 'R6', part: PART.syntax, title: '눈이 가야 할 4곳', component: FourSpotsSlide },
    { id: 'R7', part: PART.read, title: '⭐ 함수 ① 조건 읽기', component: ReadLineByLineSlide },
    { id: 'R8', part: PART.read, title: '⭐ 함수 ② 반복문 읽기', component: ReadLoopSlide },
    { id: 'R9', part: PART.read, title: '제품 규칙은 조건과 순서에 산다', component: PolicyInCodeSlide },
    { id: 'R10', part: PART.repo, title: '용어 4개 · repo부터 PR까지', component: RepoTermsSlide },
    { id: 'R11', part: PART.repo, title: '⭐ diff 읽는 순서 4단계', component: DiffSlide },
    { id: 'R12', part: PART.repo, title: 'PR 화면에서 볼 곳', component: PullRequestSlide },
    { id: 'R13', part: PART.repo, title: '화면 · 서버 · 데이터 3층', component: ThreeLayersSlide },
    { id: 'R14', part: PART.repo, title: '에러에서 먼저 볼 세 가지', component: ErrorLogSlide },
    { id: 'R15', part: PART.rest, title: '휴식 5분', component: BreakSlide },
    { id: 'R16', part: PART.practice, title: '⭐ 실제 레포 링크 열기', component: PracticeReposSlide },
    { id: 'R17', part: PART.practice, title: '⭐ 읽는 순서 5단계 · 15분', component: ReadingOrderSlide },
    { id: 'R18', part: PART.practice, title: 'AI에게 물을 질문 4개', component: AskAiSlide },
    { id: 'R19', part: PART.practice, title: '⭐ 코치 프롬프트 복사', component: CoachPromptSlide },
    { id: 'R20', part: PART.practice, title: '⭐ 세 문장으로 말하기 · 10분', component: SummaryDrillSlide },
    { id: 'R21', part: PART.practice, title: 'PM이 하지 않는 것', component: BoundariesSlide },
    { id: 'R22', part: PART.talk, title: '⭐ 질문 업그레이드', component: BetterQuestionsSlide },
    { id: 'R23', part: PART.talk, title: '코드가 될 수 있는 스펙', component: SpecWritingSlide },
    { id: 'R24', part: PART.talk, title: '무엇이 비싼가', component: EstimateSlide },
    { id: 'R25', part: PART.closing, title: '오늘 남길 3줄', component: SummarySlide },
    { id: 'R26', part: PART.closing, title: '⭐ 오늘 2시간, 그다음은 혼자', component: HandoffSlide },
    { id: 'R27', part: PART.closing, title: '⭐ 혼자 돌릴 6주 커리큘럼', component: CurriculumSlide },
    { id: 'R28', part: PART.instructor, title: '수업 전 준비 체크리스트', component: PrepChecklistSlide },
  ],
  shortcuts: [
    { key: 'l', slideId: 'R7', label: '함수' },
    { key: 'd', slideId: 'R11', label: 'diff' },
    { key: 'r', slideId: 'R16', label: '레포' },
    { key: 'c', slideId: 'R19', label: '프롬프트' },
  ],
}
