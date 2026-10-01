import { ArrowRight } from 'lucide-react'
import { Chip, cx, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote } from '../../../deck'
import { JOIN_KEYS } from '../model/units'
import { CodeBlock } from '../ui/CodeBlock'
import { Caption, ConceptHead, MiniTable, Rules } from '../ui/Concept'
import { RichText } from '../ui/RichText'

const STAGES = [
  { label: '기초', title: '데이터베이스와 SQL', units: 'A', line: 'SQL 네 묶음과 기본키·외래키' },
  { label: '꺼내기', title: 'SELECT와 함수', units: 'B · C', line: '조건 검색과 NULL, 문자·숫자·날짜 함수' },
  { label: '묶고 잇기', title: '그룹·조인·서브쿼리', units: 'D · E · F', line: '실행 순서, GROUP BY, JOIN, ROWNUM' },
  { label: '만들고 바꾸기', title: 'DDL·DML·시퀀스', units: 'G · H · I', line: '제약 조건, 트랜잭션, NEXTVAL' },
  { label: '자바에서 부르기', title: 'JDBC', units: 'J', line: '여섯 단계와 PreparedStatement' },
]

/** P1. 개념 파트의 목차. 시험 범위를 한 줄의 흐름으로 보여 준다. */
export function ConceptMapSlide() {
  return (
    <SlideLayout>
      <SlideKicker>개념 한 바퀴 · 문제를 풀기 전에</SlideKicker>
      <SlideHeadline>시험 범위는 한 줄로 이어집니다</SlideHeadline>
      <SlideLead>SELECT로 꺼내 보는 데서 시작해 JDBC로 부르는 데까지, 단원 순서대로 갑니다.</SlideLead>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-5">
        {STAGES.map((stage, index) => (
          <Panel
            key={stage.label}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="sm"
            className="relative flex flex-col gap-2"
          >
            <div className="flex items-center justify-between gap-2">
              <PanelLabel tone="accent">
                {index + 1} · {stage.label}
              </PanelLabel>
              {index < STAGES.length - 1 ? (
                <ArrowRight className="hidden size-5 shrink-0 text-content-muted lg:block" />
              ) : null}
            </div>
            <p className="text-deck-body font-bold text-content-strong">{stage.title}</p>
            <p className="text-deck-caption font-semibold text-content-secondary">{stage.line}</p>
            <p className="text-deck-meta font-semibold tabular-nums text-content-muted">단원 {stage.units}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        K 워크북과 L 남은 유형은 같은 문법을 다른 테이블로 다시 묻습니다. 오른쪽 위 번호는 그 내용을 묻는 문제입니다
      </SlideNote>
    </SlideLayout>
  )
}

const SQL_GROUPS = [
  { name: 'DQL', role: '조회', words: ['SELECT'], line: '표에서 행을 꺼내 본다' },
  { name: 'DML', role: '조작', words: ['INSERT', 'UPDATE', 'DELETE'], line: '행을 넣고 고치고 지운다' },
  { name: 'DDL', role: '정의', words: ['CREATE', 'ALTER', 'DROP'], line: '테이블 같은 객체의 구조를 만든다' },
  { name: 'TCL', role: '트랜잭션', words: ['COMMIT', 'ROLLBACK'], line: '바꾼 내용을 확정하거나 되돌린다' },
]

/** P2. A단원: 용어와 SQL 분류 */
export function ConceptBasicsSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead
        step={2}
        area="A단원"
        refs="1~10"
        title="SQL은 하는 일에 따라 네 묶음으로 나뉩니다"
        lead="용어 문제는 정의 한 문장이 답입니다. 묶음 이름과 명령어를 짝지어 외웁니다."
      />

      <div className="grid gap-3 md:gap-4 lg:grid-cols-4">
        {SQL_GROUPS.map((group) => (
          <Panel key={group.name} tone="raised" pad="sm" className="flex flex-col gap-2">
            <PanelLabel tone="accent">
              {group.name} · {group.role}
            </PanelLabel>
            <p className="font-mono text-deck-caption font-bold text-content-strong">{group.words.join(' ')}</p>
            <p className="text-deck-caption font-semibold text-content-secondary">{group.line}</p>
          </Panel>
        ))}
      </div>

      <Rules
        items={[
          { label: '기본키', text: '행 하나를 특정하는 열. 여러 열을 묶을 수도 있고, NULL과 중복이 모두 안 된다' },
          { label: '외래키', text: '다른 테이블의 키를 참조해서, 부모에 없는 값이 들어오지 못하게 막는다' },
          { label: '데이터와 정보', text: '데이터는 관찰·측정한 값, 정보는 거기에 의미를 붙인 결과' },
          { label: 'DBMS', text: '데이터를 추출·조작·정의·제어하는 프로그램. Oracle 18c XE가 DBMS이고 SQL Developer와 SQL*Plus는 접속 도구' },
        ]}
      />
    </SlideLayout>
  )
}

/** P3. B단원 앞부분: 열 고르기 */
export function ConceptSelectSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead step={3} area="B단원" refs="10~14 · 24" title="SELECT는 보여 줄 열을, FROM은 꺼낼 표를 정합니다" />

      <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-4">
          <CodeBlock
            tone="given"
            lines={['SELECT EMP_NAME,', '       SALARY * 12 AS 연봉,', "       EMP_NAME || '님' AS 호칭", 'FROM EMPLOYEE;']}
          />
          <CodeBlock tone="given" lines={['SELECT DISTINCT DEPT_CODE', 'FROM EMPLOYEE;']} />
        </div>
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
          <Rules
            items={[
              { label: '*', text: '모든 열을 정의된 순서대로 가져온다' },
              { label: '별칭', text: '계산한 열 뒤에 `AS 별칭`. 공백이 들어가면 `"연 봉"`처럼 큰따옴표로 감싼다' },
              { label: '따옴표', text: "문자열 값은 작은따옴표 `'님'`, 별칭과 열 이름 쪽이 큰따옴표" },
              { label: 'DISTINCT', text: 'SELECT 바로 뒤에 한 번 쓰고, 뒤에 오는 열 조합의 중복을 없앤다. NULL도 한 행으로 남는다' },
              { label: '연결', text: '문자열은 `||`로 잇는다. `+`로는 이어지지 않는다' },
            ]}
          />
        </div>
      </div>
    </SlideLayout>
  )
}

/** P4. B단원 뒷부분: WHERE 조건과 우선순위 */
export function ConceptWhereSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead step={4} area="B단원" refs="15~23 · 26~28" title="WHERE는 조건이 TRUE인 행만 남깁니다" />

      <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
        <div className="min-w-0 lg:col-span-5">
          <MiniTable
            head={['조건', '예', '기억할 점']}
            mono={[1]}
            rows={[
              ['비교', 'SALARY >= 3000000', '이상은 `>=`, 초과는 `>`'],
              ['범위', 'BETWEEN 300 AND 500', '양 끝을 포함하고, 작은 값을 먼저'],
              ['목록', "IN ('D1', 'D3')", 'OR를 줄여 쓴 것'],
              ['패턴', "LIKE '김%'", '`%`는 0글자 이상, `_`는 한 글자'],
              ['밑줄', "LIKE '___#_%' ESCAPE '#'", '`#` 바로 뒤의 `_`는 진짜 밑줄'],
              ['NULL', 'BONUS IS NULL', '`= NULL`로 쓰면 0행'],
            ]}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-3 lg:col-span-4">
          <PanelLabel tone="accent">AND가 OR보다 먼저 묶입니다</PanelLabel>
          <CodeBlock tone="given" lines={["WHERE DEPT_CODE = 'D5'", "   OR DEPT_CODE = 'D6'", '  AND SALARY > 3000000']} />
          <Caption>이렇게 쓰면 D5 직원은 급여와 상관없이 다 나옵니다.</Caption>
          <CodeBlock lines={["WHERE (DEPT_CODE = 'D5'", "       OR DEPT_CODE = 'D6')", '  AND SALARY > 3000000']} />
          <Caption>OR 쪽을 괄호로 묶어야 두 부서 모두에 급여 조건이 걸립니다.</Caption>
        </div>
      </div>
    </SlideLayout>
  )
}

const NULL_RULES = [
  {
    label: '1 · 비교하면',
    head: 'UNKNOWN',
    rows: [
      ['BONUS = NULL', '0행'],
      ['BONUS IS NULL', '보너스 없는 직원'],
    ],
    line: 'WHERE는 TRUE만 통과시킵니다. `NOT IN` 목록에 NULL이 끼어도 0행입니다.',
  },
  {
    label: '2 · 산술 계산하면',
    head: 'NULL',
    rows: [
      ['200 * NULL', 'NULL'],
      ['200 * NVL(NULL, 0)', '0'],
    ],
    line: '`NVL`로 먼저 바꿉니다. 문자열을 잇는 `||`만은 NULL을 건너뜁니다.',
  },
  {
    label: '3 · 집계 함수는',
    head: '건너뜀',
    rows: [
      ['COUNT(*)', '4'],
      ['COUNT(BONUS)', '2'],
      ['AVG(BONUS)', '0.15'],
    ],
    line: '표본 BONUS 0.1, NULL, 0.2, NULL 기준입니다. `AVG`는 분모에서도 NULL을 뺍니다.',
  },
]

/** P5. 단원을 가로질러 나오는 NULL 규칙 */
export function ConceptNullSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead
        step={5}
        area="B·C·D단원"
        refs="22 · 23 · 25 · 49 · 52 · 56 · 62 · 99 · 188"
        title="NULL은 세 곳에서 다르게 움직입니다"
        lead="비교, 산술 계산, 집계 함수 세 경우만 구분하면 대부분의 NULL 문제가 풀립니다."
      />

      <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
        {NULL_RULES.map((rule, index) => (
          <Panel key={rule.label} tone={index === 0 ? 'accentSoft' : 'raised'} pad="md" className="flex flex-col gap-3">
            <PanelLabel tone="accent">{rule.label}</PanelLabel>
            <p className="text-deck-title font-bold text-content-strong">{rule.head}</p>
            <div className="flex flex-col gap-1.5 rounded-card bg-surface-sunken p-4 inset-shadow-sunken">
              {rule.rows.map(([expr, result]) => (
                <p key={expr} className="font-mono text-deck-caption wrap-anywhere text-content-strong">
                  {expr} <span className="text-content-muted">→</span> <span className="text-accent">{result}</span>
                </p>
              ))}
            </div>
            <p className="text-deck-caption font-semibold text-content-secondary">
              <RichText text={rule.line} />
            </p>
          </Panel>
        ))}
      </div>
    </SlideLayout>
  )
}

/** P6. C·L단원: 문자 함수 */
export function ConceptStringSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead step={6} area="C·L단원" refs="30~38 · 181 · 186 · 187" title="위치 번호는 1부터 시작합니다" />

      <MiniTable
        head={['예', '결과', '기억할 점']}
        mono={[0, 1]}
        rows={[
          ["SUBSTR('DATABASE', 5, 4)", 'BASE', '둘째 인자는 시작 위치, 셋째 인자는 가져올 글자 수'],
          ["INSTR('A-B-C', '-', 1, 2)", '4', '셋째 인자는 찾기 시작할 위치, 넷째 인자는 몇 번째로 나온 것인지'],
          ["LENGTH('가') · LENGTHB('가')", '1 · 3', '문자 수와 바이트 수. UTF-8로 설치한 DB 기준'],
          ["TRIM('  SQL  ')", "'SQL'", '양쪽 공백을 지운다. `LTRIM`은 왼쪽만, `RTRIM`은 오른쪽만'],
          ["LTRIM('0001200', '0')", "'1200'", '지정한 문자를 왼쪽 끝에서만 지운다'],
          ["REPLACE('A_B_C', '_', '-')", 'A-B-C', '찾은 문자열을 모두 바꾼다'],
          ["LPAD('7', 3, '0')", "'007'", '둘째 인자는 결과 문자열의 전체 길이'],
          ["INITCAP('hello world')", 'Hello World', '단어마다 첫 글자만 대문자. `UPPER`는 전부, `CONCAT`은 두 개 잇기'],
        ]}
      />

      <Panel tone="sunken" pad="sm" className="flex flex-col gap-1">
        <p className="font-mono text-deck-caption font-semibold wrap-anywhere text-content-strong">
          SUBSTR(EMAIL, 1, INSTR(EMAIL, '@') - 1)
        </p>
        <Caption>두 함수를 겹치면 이메일의 @ 앞부분이 나옵니다. `- 1`을 빼면 @까지 함께 나옵니다.</Caption>
      </Panel>
    </SlideLayout>
  )
}

/** P7. C·L단원: 숫자와 날짜 함수 */
export function ConceptNumberDateSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead
        step={7}
        area="C·L단원"
        refs="39~45 · 182~184"
        title="숫자는 자르는 방향을, 날짜는 더하는 단위를 봅니다"
      />

      <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
        <div className="min-w-0 lg:col-span-4">
          <MiniTable
            label="숫자"
            head={['예', '결과', '뜻']}
            mono={[0, 1]}
            rows={[
              ['ROUND(125.678, 1)', '125.7', '반올림'],
              ['TRUNC(125.678, 1)', '125.6', '0 쪽으로 버림'],
              ['CEIL(125.1)', '126', '올림'],
              ['FLOOR(-2.1)', '-3', '내림'],
              ['TRUNC(-2.1)', '-2', '음수에서 FLOOR와 갈린다'],
              ['MOD(17, 5)', '2', '나머지'],
              ['ABS(-12)', '12', '절댓값'],
            ]}
          />
        </div>
        <div className="min-w-0 lg:col-span-5">
          <MiniTable
            label="날짜"
            head={['예', '뜻']}
            mono={[0]}
            rows={[
              ['SYSDATE', '지금 날짜와 시각. 괄호를 붙이지 않는다'],
              ['HIRE_DATE + 6', '6일 뒤. 숫자를 더하면 일 단위'],
              ['ADD_MONTHS(HIRE_DATE, 6)', '6개월 뒤'],
              ['LAST_DAY(HIRE_DATE)', '그 달의 마지막 날'],
              ['MONTHS_BETWEEN(SYSDATE, HIRE_DATE)', '지난 개월 수. 나중 날짜를 앞에'],
              ["NEXT_DAY(SYSDATE, '월요일')", '다음에 오는 월요일'],
              ['EXTRACT(YEAR FROM HIRE_DATE)', '연도만 숫자로'],
            ]}
          />
        </div>
      </div>
    </SlideLayout>
  )
}

/** P8. C단원: 형변환과 값 고르기 */
export function ConceptConvertSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead step={8} area="C단원" refs="46~51 · 185" title="형을 바꾸는 함수 셋, 값을 고르는 함수 셋" />

      <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
          <MiniTable
            label="형 바꾸기"
            head={['예', '뜻']}
            mono={[0]}
            rows={[
              ["TO_CHAR(HIRE_DATE, 'YYYY-MM-DD')", '날짜를 문자로'],
              ["TO_DATE('2024-03-15', 'YYYY-MM-DD')", '문자를 날짜로'],
              ["TO_NUMBER('1,250', '9,999')", '문자를 숫자로'],
            ]}
          />
          <Rules
            items={[
              { label: '형식 문자', text: '`YYYY` 연 · `MM` 월 · `DD` 일 · `HH24` 시 · `MI` 분 · `SS` 초' },
              { label: 'NVL', text: '`NVL(BONUS, 0)`은 BONUS가 NULL이면 0, 아니면 BONUS 그대로' },
            ]}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-3 lg:col-span-4">
          <CodeBlock tone="given" lines={["DECODE(DEPT_CODE, 'D1', '본부',", "                  'D2', '지사',", "                  '기타')"]} />
          <Caption>비교값과 결과가 짝으로 이어지고, 마지막 하나가 기본값입니다.</Caption>
          <CodeBlock
            tone="given"
            lines={['CASE', "  WHEN SALARY >= 5000000 THEN '상'", "  WHEN SALARY >= 3000000 THEN '중'", "  ELSE '하'", 'END']}
          />
          <Caption>위에서부터 검사하고 처음 맞은 곳에서 멈춥니다. 큰 기준을 먼저 씁니다.</Caption>
        </div>
      </div>
    </SlideLayout>
  )
}

const RUN_ORDER = [
  { clause: 'FROM', line: '표를 가져온다' },
  { clause: 'WHERE', line: '행을 거른다' },
  { clause: 'GROUP BY', line: '그룹으로 묶는다' },
  { clause: 'HAVING', line: '그룹을 거른다' },
  { clause: 'SELECT', line: '열을 고르고 별칭을 붙인다' },
  { clause: 'ORDER BY', line: '정렬한다' },
]

/** P9. D단원의 뼈대: 실행 순서와 거기서 나오는 규칙 셋 */
export function ConceptOrderSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead
        step={9}
        area="D·F단원"
        refs="54 · 60 · 67 · 100 · 101 · 171"
        title="SQL은 쓴 순서와 다른 순서로 실행됩니다"
        lead="쓸 때는 SELECT가 맨 앞이지만, 실행할 때는 다섯 번째입니다."
      />

      <ol className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-6">
        {RUN_ORDER.map((step, index) => (
          <li key={step.clause}>
            <Panel tone={step.clause === 'SELECT' ? 'accentSoft' : 'raised'} pad="sm" className="flex h-full flex-col gap-1">
              <p className="text-deck-meta font-bold tabular-nums text-content-muted">{index + 1}</p>
              <p className="font-mono text-deck-caption font-bold text-content-strong">{step.clause}</p>
              <p className="text-deck-meta font-semibold text-content-secondary">{step.line}</p>
            </Panel>
          </li>
        ))}
      </ol>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
        <Rules
          items={[
            { label: 'WHERE에 그룹 함수 금지', text: '2번 단계에는 그룹이 아직 없다. 평균과 비교하려면 서브쿼리로 먼저 구한다' },
          ]}
        />
        <Rules
          items={[
            { label: '별칭은 ORDER BY에서만', text: '별칭은 5번에서 생긴다. GROUP BY와 HAVING에는 식을 한 번 더 쓴다' },
          ]}
        />
        <Rules
          items={[
            { label: 'ROWNUM은 정렬 전에', text: 'ROWNUM은 2번에서 붙는다. 정렬한 뒤 고르려면 인라인 뷰로 감싼다' },
          ]}
        />
      </div>
    </SlideLayout>
  )
}

/** P10. D·L단원: GROUP BY와 집계 */
export function ConceptGroupSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead
        step={10}
        area="D·L단원"
        refs="55~64 · 67 · 68 · 188 · 189"
        title="GROUP BY로 묶으면 그룹마다 한 행이 나옵니다"
      />

      <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
        <div className="flex min-w-0 flex-col gap-3 lg:col-span-4">
          <CodeBlock
            tone="given"
            lines={['SELECT DEPT, COUNT(*), COUNT(BONUS),', '       SUM(SALARY)', 'FROM EXAM_EMP', 'GROUP BY DEPT;']}
          />
          <MiniTable
            head={['DEPT', 'COUNT(*)', 'COUNT(BONUS)', 'SUM']}
            mono={[0, 1, 2, 3]}
            rows={[
              ['D1', '2', '1', '300'],
              ['D2', '1', '1', '300'],
              [null, '1', '0', '400'],
            ]}
          />
          <Caption>NULL끼리도 한 그룹이 됩니다. ORDER BY가 없으면 행 순서는 정해지지 않습니다.</Caption>
        </div>
        <div className="min-w-0 lg:col-span-5">
          <Rules
            items={[
              { label: 'GROUP BY', text: '집계하지 않은 열을 SELECT에 쓰면 GROUP BY에도 쓴다. 빠지면 `ORA-00937`' },
              { label: '거르기', text: '행 조건은 `WHERE`, `COUNT(*) >= 2` 같은 그룹 조건은 `HAVING`' },
              { label: 'COUNT', text: '`COUNT(*)`는 모든 행, `COUNT(열)`은 NULL을 뺀 행, `COUNT(DISTINCT 열)`은 서로 다른 값의 수' },
              { label: 'ROLLUP', text: '`ROLLUP(DEPT_CODE, JOB_CODE)`는 조합별 결과에 부서별 소계와 총계를 더한다' },
              { label: 'GROUPING SETS', text: '`GROUPING SETS ((A, B), (A))`는 적어 준 묶음만 만든다' },
            ]}
          />
        </div>
      </div>
    </SlideLayout>
  )
}

const SET_OPS = [
  { op: 'UNION', result: '1 · 2 · 3 · 4', line: '합치고 중복을 없앤다' },
  { op: 'UNION ALL', result: '1 · 2 · 3 · 2 · 3 · 4', line: '중복까지 그대로 합친다' },
  { op: 'INTERSECT', result: '2 · 3', line: '양쪽에 다 있는 것만' },
  { op: 'MINUS', result: '1', line: '앞 결과에서 뒤 결과를 뺀다' },
]

/** P11. D·L단원: 집합 연산자 */
export function ConceptSetSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead
        step={11}
        area="D·L단원"
        refs="65 · 66 · 190"
        title="집합 연산자는 두 SELECT의 결과를 위아래로 합칩니다"
      />

      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <Chip tone="accent">A의 결과 1 · 2 · 3</Chip>
        <Chip>B의 결과 2 · 3 · 4</Chip>
      </div>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-4">
        {SET_OPS.map((item) => (
          <Panel key={item.op} tone="raised" pad="sm" className="flex flex-col gap-2">
            <p className="font-mono text-deck-caption font-bold text-accent">A {item.op} B</p>
            <p className="font-mono text-deck-body font-bold tabular-nums text-content-strong">{item.result}</p>
            <p className="text-deck-caption font-semibold text-content-secondary">{item.line}</p>
          </Panel>
        ))}
      </div>

      <Rules
        items={[
          { label: '합치는 조건', text: '두 SELECT의 열 개수가 같고, 같은 순번의 열끼리 자료형이 맞아야 한다' },
          { label: '열 이름', text: '결과의 열 이름은 첫 번째 SELECT를 따른다. `ORDER BY`는 맨 끝에 한 번만 쓴다' },
          { label: '66번', text: '`SELECT 1 FROM DUAL`을 두 번 합치면 UNION은 1행, UNION ALL은 2행' },
        ]}
      />
    </SlideLayout>
  )
}

/** P12. E단원: JOIN의 기본 모양 */
export function ConceptJoinSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead step={12} area="E단원" refs="69 · 71 · 73 · 74 · 77 · 80 · 81" title="JOIN은 두 표를 같은 값으로 잇습니다" />

      <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
        <div className="flex min-w-0 flex-col gap-3 lg:col-span-4">
          <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
            <PanelLabel tone="accent">수업 테이블을 잇는 열</PanelLabel>
            {JOIN_KEYS.map((line) => (
              <p key={line} className="font-mono text-deck-caption wrap-anywhere text-content-strong">
                {line}
              </p>
            ))}
          </Panel>
          <Caption>부서와 지역은 양쪽 열 이름이 다릅니다. 이름이 같은 JOB_CODE만 USING으로 이을 수 있습니다.</Caption>
        </div>
        <div className="flex min-w-0 flex-col gap-3 lg:col-span-5">
          <CodeBlock
            tone="given"
            lines={['SELECT E.EMP_NAME, D.DEPT_TITLE', 'FROM EMPLOYEE E', 'JOIN DEPARTMENT D ON E.DEPT_CODE = D.DEPT_ID;']}
          />
          <CodeBlock tone="given" lines={['SELECT E.EMP_NAME, J.JOB_NAME', 'FROM EMPLOYEE E', 'JOIN JOB J USING (JOB_CODE);']} />
        </div>
      </div>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
        <Rules
          items={[
            { label: 'ON', text: '조인 조건을 직접 쓴다. 양쪽 열 이름이 달라도 된다' },
            { label: 'USING', text: '이름이 같은 열로 이을 때만. USING에 쓴 열에는 별칭을 붙이지 않는다' },
          ]}
        />
        <Rules
          items={[
            { label: '별칭', text: '양쪽에 다 있는 열은 `E.JOB_CODE`처럼 쓴다. 빠지면 `ORA-00918`' },
            { label: '세 표', text: '`JOIN`을 이어 붙인다. 지역은 직원 → 부서 → 지역 순서로 닿는다' },
          ]}
        />
      </div>
    </SlideLayout>
  )
}

const OUTER_CASES: Array<{ code: string; line: string; rows: Array<[string | null, string | null]> }> = [
  {
    code: 'E JOIN D',
    line: '짝이 있는 행만',
    rows: [
      ['가람', '인사부'],
      ['나래', '회계부'],
    ],
  },
  {
    code: 'E LEFT JOIN D',
    line: '직원을 빠짐없이',
    rows: [
      ['가람', '인사부'],
      ['나래', '회계부'],
      ['다온', null],
    ],
  },
  {
    code: 'E RIGHT JOIN D',
    line: '부서를 빠짐없이',
    rows: [
      ['가람', '인사부'],
      ['나래', '회계부'],
      [null, '영업부'],
    ],
  },
  {
    code: 'E FULL JOIN D',
    line: '양쪽 모두',
    rows: [
      ['가람', '인사부'],
      ['나래', '회계부'],
      ['다온', null],
      [null, '영업부'],
    ],
  },
]

/** P13. E단원: OUTER JOIN과 0명 세기 */
export function ConceptOuterSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead
        step={13}
        area="E·K단원"
        refs="70 · 72 · 76 · 82 · 83 · 87 · 88 · 166 · 167 · 179"
        title="짝이 없는 행을 남기려면 OUTER JOIN을 씁니다"
      />

      <p className="text-deck-caption font-semibold text-content-secondary">
        예시 데이터 · 직원 가람(D1), 나래(D2), 다온(부서 없음) · 부서 D1 인사부, D2 회계부, D3 영업부(직원 없음)
      </p>

      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {OUTER_CASES.map((item) => (
          <Panel key={item.code} tone="raised" pad="sm" className="flex flex-col gap-2">
            <p className="font-mono text-deck-caption font-bold text-accent">{item.code}</p>
            <p className="text-deck-meta font-semibold text-content-muted">{item.line}</p>
            <div className="flex flex-col gap-1">
              {item.rows.map(([emp, dept], index) => (
                <p key={index} className="text-deck-caption font-semibold">
                  <span className={cx(emp === null ? 'text-content-muted' : 'text-content-strong')}>{emp ?? 'NULL'}</span>
                  <span className="text-content-muted"> · </span>
                  <span className={cx(dept === null ? 'text-content-muted' : 'text-content-strong')}>{dept ?? 'NULL'}</span>
                </p>
              ))}
            </div>
          </Panel>
        ))}
      </div>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
        <Rules
          items={[
            { label: '방향', text: '빠짐없이 남길 표를 `FROM` 바로 뒤에 두고 `LEFT JOIN`. Oracle의 `(+)`는 NULL로 채워질 쪽에 붙인다' },
            { label: '이어 붙이기', text: 'LEFT로 살린 행은 뒤에 붙는 조인도 LEFT여야 끝까지 남는다' },
          ]}
        />
        <Rules
          items={[
            { label: '0명 세기', text: '`COUNT(*)` 대신 `COUNT(E.EMP_ID)`. 짝 없는 부서도 한 행으로 남기 때문이다' },
            { label: '없는 것 찾기', text: 'LEFT JOIN 다음 `WHERE 오른쪽.키 IS NULL`' },
          ]}
        />
      </div>
    </SlideLayout>
  )
}

const JOIN_KINDS = [
  {
    name: 'SELF JOIN',
    lines: ['FROM EMPLOYEE E', 'LEFT JOIN EMPLOYEE M', '  ON E.MANAGER_ID = M.EMP_ID'],
    line: '같은 표를 두 번 쓰고 별칭으로 역할을 나눈다. 직원의 MANAGER_ID가 관리자의 EMP_ID다',
  },
  {
    name: 'NON-EQUI JOIN',
    lines: ['FROM EMPLOYEE E', 'JOIN SAL_GRADE G', '  ON E.SALARY BETWEEN G.MIN_SAL', '                  AND G.MAX_SAL'],
    line: '`=` 대신 범위로 잇는다',
  },
  {
    name: 'CROSS JOIN',
    lines: ['FROM A CROSS JOIN B'],
    line: '조건 없이 모든 조합을 만든다. 3행 × 4행 = 12행. 조인 조건을 빠뜨려도 같은 일이 생긴다',
  },
]

/** P14. E단원: 조건의 모양에 따라 달라지는 조인 이름 */
export function ConceptJoinKindsSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead step={14} area="E단원" refs="75 · 78 · 79 · 84 · 85 · 86" title="조인 조건의 모양에 따라 이름이 달라집니다" />

      <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
        {JOIN_KINDS.map((kind) => (
          <div key={kind.name} className="flex min-w-0 flex-col gap-3">
            <PanelLabel tone="accent">{kind.name}</PanelLabel>
            <CodeBlock tone="given" lines={kind.lines} />
            <Caption>{kind.line}</Caption>
          </div>
        ))}
      </div>

      <Panel tone="raised" pad="sm" className="flex flex-col gap-1">
        <p className="font-mono text-deck-caption font-semibold wrap-anywhere text-content-strong">
          ON A.DEPT_CODE = B.DEPT_CODE AND A.EMP_ID &lt; B.EMP_ID
        </p>
        <Caption>같은 부서 직원 쌍을 한 번씩만 뽑는 조건입니다. `&lt;` 하나가 자기 자신과의 쌍과 순서만 바뀐 쌍을 함께 지웁니다.</Caption>
      </Panel>
    </SlideLayout>
  )
}

/** P15. F단원: 서브쿼리의 모양과 연산자 */
export function ConceptSubquerySlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead step={15} area="F단원" refs="89~99 · 106" title="서브쿼리는 결과 모양이 연산자를 정합니다" />

      <MiniTable
        head={['모양', '연산자', '예']}
        mono={[2]}
        rows={[
          ['단일 행', '`=` `>` `<`', 'SALARY > (SELECT AVG(SALARY) FROM EMPLOYEE)'],
          ['다중 행', '`IN` `ANY` `ALL`', "SALARY IN (SELECT SALARY FROM EMPLOYEE WHERE DEPT_CODE = 'D1')"],
          ['다중 열', '`(A, B) IN`', '(DEPT_CODE, SALARY) IN (SELECT DEPT_CODE, MAX(SALARY) …)'],
        ]}
      />

      <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
        <Rules
          items={[
            { label: '=와 여러 행', text: '단일 행 자리에 여러 행이 오면 `ORA-01427`. `IN`으로 바꾼다' },
          ]}
        />
        <Rules
          items={[
            { label: '상관 서브쿼리', text: '안쪽에서 바깥 행의 열을 참조한다. `X.DEPT_CODE = E.DEPT_CODE`처럼 바깥 행마다 새로 계산된다' },
          ]}
        />
        <Rules
          items={[
            { label: 'EXISTS', text: '행이 있는지만 본다. `NOT IN` 목록에 NULL이 끼면 0행이니 없는 것을 찾을 때는 `NOT EXISTS`' },
          ]}
        />
      </div>
    </SlideLayout>
  )
}

/** P16. F단원: 인라인 뷰와 ROWNUM, 순위 함수 */
export function ConceptTopNSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead step={16} area="F·K단원" refs="100~105 · 174" title="정렬한 결과에서 고를 때는 한 번 감쌉니다" />

      <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
        <div className="flex min-w-0 flex-col gap-3 lg:col-span-5">
          <CodeBlock tone="given" lines={['SELECT EMP_NAME', 'FROM EMPLOYEE', 'WHERE ROWNUM <= 3', 'ORDER BY SALARY DESC;']} />
          <Caption>아무 3행을 먼저 고른 뒤에 정렬합니다. 상위 3명이 나온다는 보장이 없습니다.</Caption>
          <CodeBlock
            lines={['SELECT EMP_NAME', 'FROM (SELECT EMP_NAME', '      FROM EMPLOYEE', '      ORDER BY SALARY DESC)', 'WHERE ROWNUM <= 3;']}
          />
          <Caption>FROM 절에 놓인 서브쿼리가 인라인 뷰입니다. 안에서 정렬하고 바깥에서 고릅니다.</Caption>
        </div>
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-4">
          <MiniTable
            label="급여 500, 500, 400의 순위"
            head={['함수', '500', '500', '400']}
            mono={[0, 1, 2, 3]}
            rows={[
              ['RANK', '1', '1', '3'],
              ['DENSE_RANK', '1', '1', '2'],
              ['ROW_NUMBER', '1', '2', '3'],
            ]}
          />
          <Rules
            items={[
              { label: 'PARTITION BY', text: '그룹마다 순위를 따로 매긴다. NULL 부서도 한 그룹이 된다' },
              { label: '순위로 거르기', text: '순위 함수도 한 번 감싼 바깥에서 `WHERE RN = 1`' },
              { label: 'WITH', text: '`WITH 이름 AS (SELECT …)`로 중간 결과에 이름을 붙여 다시 쓴다' },
            ]}
          />
        </div>
      </div>
    </SlideLayout>
  )
}
