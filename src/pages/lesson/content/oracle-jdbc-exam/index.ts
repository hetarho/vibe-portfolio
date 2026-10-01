import type { DeckDef, SlideDef } from '../../deck'
import { PROBLEMS } from './model/problems'
import { UNITS } from './model/units'
import { RetrySlide, ReviewBoardSlide, RoutineSlide } from './parts/closing'
import {
  ConceptAlterSlide,
  ConceptConstraintSlide,
  ConceptDmlSlide,
  ConceptJdbcFlowSlide,
  ConceptPreparedSlide,
  ConceptSequenceSlide,
} from './parts/concept-build'
import {
  ConceptBasicsSlide,
  ConceptConvertSlide,
  ConceptGroupSlide,
  ConceptJoinKindsSlide,
  ConceptJoinSlide,
  ConceptMapSlide,
  ConceptNullSlide,
  ConceptNumberDateSlide,
  ConceptOrderSlide,
  ConceptOuterSlide,
  ConceptSelectSlide,
  ConceptSetSlide,
  ConceptStringSlide,
  ConceptSubquerySlide,
  ConceptTopNSlide,
  ConceptWhereSlide,
} from './parts/concept-query'
import { CheatSheetSlide, CoverSlide, HowToSlide, MapSlide, TablesSlide } from './parts/opening'
import { makeProblemSlide } from './parts/problem'
import { makeUnitSlide } from './parts/unit'

const PART = {
  opening: '시작 · 문제집 사용법',
  concept: '개념 한 바퀴 · 시험 범위 22화면',
  closing: '마무리 · 다시 볼 문제',
}

/**
 * 문제를 풀기 전에 시험 범위 전체를 단원 순서대로 짚는 설명 파트.
 * 화면마다 오른쪽 위에 그 내용을 묻는 문제 번호를 붙여, 설명을 듣다가 바로 해당 문제로 갈 수 있게 했다.
 */
const conceptSlides: SlideDef[] = [
  { title: '시험 범위 한 장', component: ConceptMapSlide },
  { title: 'SQL 네 묶음과 기본키·외래키', component: ConceptBasicsSlide },
  { title: 'SELECT와 FROM, 별칭과 DISTINCT', component: ConceptSelectSlide },
  { title: 'WHERE 조건과 AND·OR 우선순위', component: ConceptWhereSlide },
  { title: 'NULL의 세 가지 규칙', component: ConceptNullSlide },
  { title: '문자 함수', component: ConceptStringSlide },
  { title: '숫자와 날짜 함수', component: ConceptNumberDateSlide },
  { title: '형변환과 NVL·DECODE·CASE', component: ConceptConvertSlide },
  { title: 'SQL 실행 순서', component: ConceptOrderSlide },
  { title: 'GROUP BY와 집계 함수', component: ConceptGroupSlide },
  { title: '집합 연산자', component: ConceptSetSlide },
  { title: 'JOIN의 기본, ON과 USING', component: ConceptJoinSlide },
  { title: 'OUTER JOIN과 0명 표시', component: ConceptOuterSlide },
  { title: 'SELF · NON-EQUI · CROSS JOIN', component: ConceptJoinKindsSlide },
  { title: '서브쿼리의 세 가지 종류', component: ConceptSubquerySlide },
  { title: '인라인 뷰와 ROWNUM, 순위 함수', component: ConceptTopNSlide },
  { title: '테이블 만들기와 제약 조건', component: ConceptConstraintSlide },
  { title: 'ALTER, 테이블 복사, 뷰', component: ConceptAlterSlide },
  { title: 'DML과 트랜잭션', component: ConceptDmlSlide },
  { title: '시퀀스', component: ConceptSequenceSlide },
  { title: 'JDBC 여섯 단계', component: ConceptJdbcFlowSlide },
  { title: 'PreparedStatement와 ResultSet', component: ConceptPreparedSlide },
].map((slide, index) => ({ id: `P${index + 1}`, part: PART.concept, ...slide }))

/**
 * 단원 첫 화면 하나 뒤에 그 단원의 문제가 한 화면씩 이어진다.
 * 단원 화면의 코드는 {단원}0, 문제 화면의 코드는 Q{문제집 번호}라서
 * 전체 목록(O 키)에서 문제집 번호로 바로 찾아갈 수 있다.
 */
const unitSlides: SlideDef[] = UNITS.flatMap((unit) => {
  const part = `${unit.key} · ${unit.title} (${unit.start}~${unit.end})`
  return [
    { id: `${unit.key}0`, part, title: `핵심 정리 · ${unit.title}`, component: makeUnitSlide(unit) },
    ...PROBLEMS.filter((problem) => problem.unit === unit.key).map((problem) => ({
      id: `Q${problem.no}`,
      part,
      title: `${problem.no}번 · ${problem.title}`,
      component: makeProblemSlide(problem),
    })),
  ]
})

/**
 * Oracle SQL부터 JDBC까지 배운 코딩학원 수강생이 혼자 쓰는 시험 대비 덱.
 * 앞부분에서 시험 범위 전체를 22화면으로 한 번 짚고, 이어서 study/oracle-jdbc-exam의 200문제를
 * 문제집 순서 그대로 한 화면에 하나씩 놓았다. 화면마다 직접 답을 쓴 뒤 정답을 열어 스스로 채점하고,
 * 못 썼거나 애매한 문제는 정리 화면에 단원별로 모여 AI에게 비슷한 문제를 받는 프롬프트로 이어진다.
 */
export const oracleJdbcExamDeck: DeckDef = {
  slides: [
    { id: 'S1', part: PART.opening, title: '200문제의 범위와 배점', component: CoverSlide },
    ...conceptSlides,
    { id: 'S2', part: PART.opening, title: '한 화면에서 하는 일 세 가지', component: HowToSlide },
    { id: 'S3', part: PART.opening, title: '열두 단원 지도', component: MapSlide },
    { id: 'S4', part: PART.opening, title: '문제에 나오는 테이블과 표본', component: TablesSlide },
    { id: 'S5', part: PART.opening, title: '시험 직전에 읽을 함정 열 줄', component: CheatSheetSlide },
    ...unitSlides,
    { id: 'R1', part: PART.closing, title: '단원별 채점 결과와 다시 볼 문제', component: ReviewBoardSlide },
    { id: 'R2', part: PART.closing, title: 'AI에게 비슷한 문제 받기', component: RetrySlide },
    { id: 'R3', part: PART.closing, title: '시험까지 하루 루틴', component: RoutineSlide },
  ],
  shortcuts: [
    { key: 'k', slideId: 'P1', label: '개념' },
    { key: 'c', slideId: 'S5', label: '함정 열 줄' },
    { key: 't', slideId: 'S4', label: '테이블' },
    { key: 'q', slideId: 'Q1', label: '1번 문제' },
    { key: 'r', slideId: 'R1', label: '정리' },
  ],
}
