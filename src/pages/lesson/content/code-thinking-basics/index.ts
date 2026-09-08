import type { DeckDef } from '../../deck'
import { AiGuardSlide, AiJudgeSlide, AiPromptSlide } from './parts/aitool'
import { AiShiftSlide, NeedsSlide, PathSlide } from './parts/career'
import { ApplySlide, ClosingSlide } from './parts/closing'
import { HaveSlide, MathSlide, StairsSlide } from './parts/confidence'
import { AgendaSlide, DemandSlide, NamedSlide, PiecesSlide, PositionSlide } from './parts/opening'
import { DailySlide, JudgeSlide, LogSlide, RoundsSlide, SpacingSlide } from './parts/study'
import { CasesSlide, DecomposeSlide, InvariantSlide, SmallCaseSlide, StateSlide, UnifiedSlide } from './parts/thinking'

const PART = {
  agenda: '목차',
  why: 'PART 1 · 어려웠던 이유',
  have: 'PART 2 · 이미 갖고 있는 것',
  think: 'PART 3 · 사고방식',
  study: 'PART 4 · 공부법',
  career: 'PART 5 · 앞으로의 길',
  apply: 'PART 6 · 남는 시간 실습',
  tool: 'PART 7 · 집에서 쓰는 도구',
}

/**
 * 자바 기초 과정을 듣는 중인 수강생의 1회차.
 *
 * 문법 진도를 따라가지 않는다. 진도는 본 수업에서 이미 나가고, 여기서 얕게
 * 반복하면 남는 것이 없다. 그래서 이 덱은 **문법을 묶는 개념과 공부법**만 다룬다.
 *
 * 뼈대는 PART 3이고, 개념 하나가 축이다 — "프로그램은 상태를 바꾸는 절차다".
 * 이 문장 아래로 변수·조건문·반복문·배열·메소드·객체가 전부 묶인다(B10). 그러면
 * 외울 것이 스물네 개에서 한 개가 되고, 앞으로 나올 상속·다형성도 같은 자리에 붙는다.
 * 그 아래에 사고 도구 넷을 둔다 — 분해(B11) · 경우 나누기(B12) · 불변식(B13) ·
 * 작은 경우로 확인(B14). 구조화된 사고와 수학적 사고를 이 넷으로 구체화한 것이다.
 *
 * 나열을 피하려고 파트 사이에 도출 관계를 걸었다.
 *  - PART 1의 재인·재생 격차에서 PART 4의 공부법 판정 기준이 나온다.
 *    두 능력이 따로 자란다면 재생을 쓰는 것만 공부로 치는 것이 논리적 결론이다(B15).
 *  - PART 2에서 비어 있다고 짚은 계단 네 칸(B8)을 PART 4의 3회전이 메운다(B16).
 *  - PART 3의 도구 넷을 PART 6에서 문제 하나에 그대로 적용한다(B23).
 *  - PART 5는 그 도구가 실제 직무에서 쓰이는 자리를 보여준다(B21).
 *  - PART 4의 판정 기준을 PART 7에서 AI에도 그대로 적용한다(B25).
 *
 * 실습은 PART 6에만 있고, 문법 풀이가 아니라 도구 적용 연습이다. 시간이
 * 모자라면 B23의 세 줄까지만 채우고 끝낸다 — 코드까지 가지 않아도 목표는 이룬 셈이다.
 *
 * PART 7이 이 회차에서 AI를 다루는 유일한 자리이고, 판단을 넘기는 자리가 아니다.
 * 순서가 중요하다. B25에서 판정 기준을 먼저 세우고, 그 기준을 통과하는 도구로서
 * B26의 프롬프트를 준다. 프롬프트를 먼저 주면 수강생은 요약을 받아 읽는 쪽으로
 * 기울고, 그것이 정확히 B15에서 공부가 아니라고 판정한 행동이다.
 * 프롬프트 본문은 model/study-prompt.md 한 곳에만 있다. AI가 요약하지 않고 문제를
 * 내고 채점하도록 짜여 있어서, 이 덱의 장치(상태와 변화 · 도구 넷 · 3회전 ·
 * 막힌 지점 세 줄 · 하루 30분)를 수강생이 집에서 혼자 돌리는 형태가 된다.
 * AI를 개인교사로 쓰는 법 전반은 2회차에서 다룬다.
 *
 * 두 가지를 화면에서 지킨다.
 *  - 수강생 개인의 이력·학력·전 직업을 넣지 않는다. 일상 예시는 누구에게나 통하는
 *    것으로만 쓰고, 맞춤 이야기는 강사가 말로 한다.
 *  - 결함을 서술하지 않는다. "안 되는 것"이 아니라 "다음에 될 것"으로, 원인은
 *    사람이 아니라 구조와 방법에 둔다.
 */
export const codeThinkingBasicsDeck: DeckDef = {
  slides: [
    { id: 'B1', part: PART.agenda, title: '오늘 수업 목차', component: AgendaSlide },
    { id: 'B2', part: PART.why, title: '⭐ 지금 어디까지 왔는지', component: PositionSlide },
    { id: 'B3', part: PART.why, title: '재인과 재생 · 이름이 있는 현상', component: NamedSlide },
    { id: 'B4', part: PART.why, title: '⭐ 조각은 쌓였는데 묶는 것이 없다', component: PiecesSlide },
    { id: 'B5', part: PART.why, title: '문제가 동시에 요구한 두 가지', component: DemandSlide },
    { id: 'B6', part: PART.have, title: '⭐ 필요한 사고는 세 가지뿐', component: HaveSlide },
    { id: 'B7', part: PART.have, title: '수학적 사고는 계산이 아니다', component: MathSlide },
    { id: 'B8', part: PART.have, title: '비어 있는 계단 네 칸', component: StairsSlide },
    { id: 'B9', part: PART.think, title: '⭐ 개념 하나 · 상태를 바꾸는 절차', component: StateSlide },
    { id: 'B10', part: PART.think, title: '⭐ 스물네 개가 한 개로 묶인다', component: UnifiedSlide },
    { id: 'B11', part: PART.think, title: '⭐ 도구 1 · 분해 · 명사와 동사', component: DecomposeSlide },
    { id: 'B12', part: PART.think, title: '⭐ 도구 2 · 경우 나누기', component: CasesSlide },
    { id: 'B13', part: PART.think, title: '⭐ 도구 3 · 그릇의 뜻', component: InvariantSlide },
    { id: 'B14', part: PART.think, title: '도구 4 · 작은 경우로 확인', component: SmallCaseSlide },
    { id: 'B15', part: PART.study, title: '⭐ 꺼내는 연습만 공부로 친다', component: JudgeSlide },
    { id: 'B16', part: PART.study, title: '같은 문제를 세 번 다르게', component: RoundsSlide },
    { id: 'B17', part: PART.study, title: '언제 다시 꺼내는가', component: SpacingSlide },
    { id: 'B18', part: PART.study, title: '막힌 지점 세 줄 · 설명 점검', component: LogSlide },
    { id: 'B19', part: PART.study, title: '하루 30분 배분', component: DailySlide },
    { id: 'B20', part: PART.career, title: '지금 배우는 것이 이어지는 자리', component: PathSlide },
    { id: 'B21', part: PART.career, title: '과정이 끝날 때 있어야 할 세 가지', component: NeedsSlide },
    { id: 'B22', part: PART.career, title: 'AI가 바꾼 것과 바꾸지 못한 것', component: AiShiftSlide },
    { id: 'B23', part: PART.apply, title: '⭐ 실습 · 도구를 문제 하나에', component: ApplySlide },
    { id: 'B24', part: PART.apply, title: '오늘 정리 · 이번 주', component: ClosingSlide },
    { id: 'B25', part: PART.tool, title: '⭐ 같은 기준을 AI에도 그대로', component: AiJudgeSlide },
    { id: 'B26', part: PART.tool, title: '⭐ 복습 프롬프트 · PPT를 올린다', component: AiPromptSlide },
    { id: 'B27', part: PART.tool, title: '하루 30분에 넣는 자리 · 멈출 신호', component: AiGuardSlide },
  ],
  shortcuts: [
    { key: 'c', slideId: 'B9', label: '핵심 개념' },
    { key: 't', slideId: 'B11', label: '도구' },
    { key: 'h', slideId: 'B15', label: '공부법' },
    { key: 'j', slideId: 'B20', label: '앞으로' },
    { key: 'p', slideId: 'B26', label: '프롬프트' },
  ],
}
