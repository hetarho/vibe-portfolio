export type UnitKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L'

export type TableKey =
  | 'EMPLOYEE'
  | 'DEPARTMENT'
  | 'JOB'
  | 'LOCATION'
  | 'TB_DEPARTMENT'
  | 'TB_STUDENT'
  | 'TB_PROFESSOR'
  | 'TB_CLASS'
  | 'TB_CLASS_PROFESSOR'
  | 'TB_GRADE'

/** 문제집 "사용 기준"에 적힌 테이블과 열. 문제 화면과 T 화면이 함께 쓴다. */
export const TABLES: Record<TableKey, string[]> = {
  EMPLOYEE: [
    'EMP_ID',
    'EMP_NAME',
    'EMP_NO',
    'EMAIL',
    'PHONE',
    'DEPT_CODE',
    'JOB_CODE',
    'SALARY',
    'BONUS',
    'MANAGER_ID',
    'HIRE_DATE',
    'ENT_YN',
  ],
  DEPARTMENT: ['DEPT_ID', 'DEPT_TITLE', 'LOCATION_ID'],
  JOB: ['JOB_CODE', 'JOB_NAME'],
  LOCATION: ['LOCAL_CODE', 'LOCAL_NAME'],
  TB_DEPARTMENT: ['DEPARTMENT_NO', 'DEPARTMENT_NAME', 'CATEGORY', 'CAPACITY'],
  TB_STUDENT: ['STUDENT_NO', 'DEPARTMENT_NO', 'STUDENT_NAME', 'ENTRANCE_DATE', 'ABSENCE_YN', 'COACH_PROFESSOR_NO'],
  TB_PROFESSOR: ['PROFESSOR_NO', 'PROFESSOR_NAME', 'DEPARTMENT_NO'],
  TB_CLASS: ['CLASS_NO', 'DEPARTMENT_NO', 'CLASS_NAME', 'CLASS_TYPE'],
  TB_CLASS_PROFESSOR: ['CLASS_NO', 'PROFESSOR_NO'],
  TB_GRADE: ['TERM_NO', 'CLASS_NO', 'STUDENT_NO', 'POINT'],
}

/** 수업 테이블끼리 잇는 열. 이름이 다른 짝이 많아서 JOIN 문제에서 가장 많이 틀린다. */
export const JOIN_KEYS = [
  'EMPLOYEE.DEPT_CODE = DEPARTMENT.DEPT_ID',
  'DEPARTMENT.LOCATION_ID = LOCATION.LOCAL_CODE',
  'EMPLOYEE.JOB_CODE = JOB.JOB_CODE',
  'E.MANAGER_ID = M.EMP_ID  (EMPLOYEE를 E와 M으로 두 번)',
]

/** 결과 예측용 표본 EXAM_EMP. 실제 KH 데이터가 아니다. null은 SQL의 NULL이다. */
export const EXAM_EMP_ROWS: Array<{ id: number; dept: string | null; salary: number; bonus: number | null }> = [
  { id: 1, dept: 'D1', salary: 100, bonus: 0.1 },
  { id: 2, dept: 'D1', salary: 200, bonus: null },
  { id: 3, dept: 'D2', salary: 300, bonus: 0.2 },
  { id: 4, dept: null, salary: 400, bonus: null },
]

export type Unit = {
  key: UnitKey
  /** 문제집의 단원 제목 그대로 */
  title: string
  start: number
  end: number
  lead: string
  /** 단원 첫 화면의 핵심 정리 */
  points: Array<{ label: string; line: string }>
  /** 핵심 정리 대신 열 이름을 보여 줄 단원 */
  tables?: TableKey[]
  note: string
}

/** 문제집의 A~L 단원. 범위는 문제집의 단원 제목에 적힌 번호를 따른다. */
export const UNITS: Unit[] = [
  {
    key: 'A',
    title: '데이터베이스와 SQL 기초',
    start: 1,
    end: 10,
    lead: '용어의 정의를 그대로 묻는 단원입니다. 서술형은 묻는 용어를 주어로 두고 한 문장으로 끝냅니다.',
    points: [
      { label: '데이터와 정보', line: '데이터는 관찰·측정한 값, 정보는 거기에 의미를 붙인 결과' },
      { label: '데이터베이스', line: '운영·공용·통합·저장 데이터, 네 가지 정의' },
      { label: 'DBMS 기능', line: '추출은 조회, 조작은 삽입·수정·삭제, 정의는 구조, 제어는 권한·회복·동시성' },
      {
        label: 'SQL 분류',
        line: 'DQL `SELECT` · DML `INSERT` `UPDATE` `DELETE` · DDL `CREATE` `ALTER` `DROP` · TCL `COMMIT` `ROLLBACK`',
      },
      { label: '키', line: '기본키는 행 하나를 특정하고, 외래키는 다른 테이블의 키를 참조한다' },
    ],
    note: '“각각”이라고 물으면 덩어리를 나눠 씁니다. 네 가지를 물었으면 답도 네 줄입니다',
  },
  {
    key: 'B',
    title: '기본 SELECT와 조건 검색',
    start: 11,
    end: 28,
    lead: 'WHERE 조건을 정확히 쓰는 단원입니다. 함정은 대부분 NULL과 연산자 우선순위에서 나옵니다.',
    points: [
      { label: '우선순위', line: 'NOT → AND → OR 순서로 평가한다. OR가 섞이면 괄호로 묶는다' },
      { label: '범위와 목록', line: '`BETWEEN A AND B`는 양 끝을 포함하고, `IN (...)`은 OR를 줄여 쓴 것' },
      { label: 'LIKE', line: '`%`는 0글자 이상, `_`는 정확히 한 글자, 진짜 밑줄은 `ESCAPE`' },
      { label: 'NULL 비교', line: '`IS NULL`과 `IS NOT NULL`만 쓴다. `= NULL`은 0행' },
      { label: '연결과 별칭', line: '문자열 연결은 `||`, 별칭은 `AS 별칭`, 공백이 있으면 큰따옴표' },
    ],
    note: 'NULL과 비교한 결과는 UNKNOWN이고, WHERE는 TRUE인 행만 통과시킵니다',
  },
  {
    key: 'C',
    title: '함수',
    start: 29,
    end: 52,
    lead: '함수 이름과 인자 순서, 결과 값을 외우는 단원입니다. 결과 예측은 위치를 짚어 가며 풉니다.',
    points: [
      { label: '문자', line: '`SUBSTR(문자열, 시작, 길이)` · `INSTR(문자열, 찾을 것, 시작, n번째)`' },
      { label: '숫자', line: '`ROUND` 반올림 · `TRUNC` 버림 · `CEIL` 올림 · `FLOOR` 내림, 음수에서 TRUNC와 FLOOR가 갈린다' },
      { label: '날짜', line: '`SYSDATE` · `ADD_MONTHS` · `LAST_DAY` · `EXTRACT(YEAR FROM 날짜)`' },
      { label: '형변환', line: "`TO_CHAR(날짜, 'YYYY-MM-DD')` · `TO_DATE(문자열, 형식)`" },
      { label: 'NULL', line: '`NVL(값, 대체값)`, NULL이 섞인 산술 계산은 결과도 NULL' },
      { label: '분기', line: '`DECODE(값, 비교, 결과, …, 기본값)` · `CASE WHEN … THEN … ELSE … END`' },
    ],
    note: '위치 번호는 1부터 시작합니다. SUBSTR과 INSTR, JDBC의 ? 번호까지 모두 같습니다',
  },
  {
    key: 'D',
    title: '정렬·집계·그룹·집합',
    start: 53,
    end: 68,
    lead: 'SQL이 실행되는 순서를 알면 풀리는 단원입니다. 어느 절에서 무엇을 거르는지가 핵심입니다.',
    points: [
      { label: 'WHERE와 HAVING', line: '행에 거는 조건은 `WHERE`, 그룹 함수로 거는 조건은 `HAVING`' },
      { label: 'GROUP BY', line: '집계하지 않은 열을 SELECT에 쓰면 GROUP BY에도 쓴다' },
      { label: 'COUNT', line: '`COUNT(*)`는 모든 행, `COUNT(열)`은 NULL을 뺀 행' },
      { label: 'NULL과 집계', line: '`SUM`·`AVG`는 NULL을 빼고 계산한다. 평균의 분모도 함께 줄어든다' },
      { label: '별칭', line: '같은 SELECT 안에서는 `ORDER BY`에서만 쓸 수 있다. 인라인 뷰로 감싸면 바깥에서 쓴다' },
      { label: '집합 연산', line: '`UNION` 중복 제거 · `UNION ALL` 유지 · `INTERSECT` 공통 · `MINUS` 차집합' },
    ],
    note: 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. 별칭과 그룹 함수의 규칙이 모두 이 순서에서 나옵니다',
  },
  {
    key: 'E',
    title: 'JOIN',
    start: 69,
    end: 88,
    lead: '어떤 열로 이을지, 짝이 없는 행을 남길지 버릴지 이 두 가지를 정하는 단원입니다.',
    points: [
      { label: '잇는 열', line: '`E.DEPT_CODE = D.DEPT_ID` · `D.LOCATION_ID = L.LOCAL_CODE` · `JOB_CODE`는 이름이 같아 `USING`' },
      { label: 'INNER와 OUTER', line: 'INNER는 짝 없는 행을 버리고, OUTER는 남긴 뒤 빈 칸을 NULL로 채운다' },
      { label: '방향', line: '빠짐없이 남길 테이블을 `FROM` 바로 뒤에 두고 `LEFT JOIN`' },
      { label: '별칭', line: '양쪽에 다 있는 열은 `E.JOB_CODE`처럼 쓰고, `USING`으로 이은 열만 별칭 없이' },
      { label: 'SELF JOIN', line: '같은 테이블에 별칭 두 개, `E.MANAGER_ID = M.EMP_ID`' },
      { label: '0명까지 세기', line: '`LEFT JOIN` 다음에는 `COUNT(*)` 대신 `COUNT(오른쪽 테이블의 키)`' },
    ],
    note: '조인 조건을 빠뜨리면 N×M행의 카테시안 곱이 됩니다',
  },
  {
    key: 'F',
    title: 'SUBQUERY와 순위',
    start: 89,
    end: 106,
    lead: '서브쿼리가 돌려주는 결과의 모양에 맞춰 연산자를 고르는 단원입니다.',
    points: [
      { label: '결과 모양', line: '단일 행은 `=` `>`, 다중 행은 `IN` `ANY` `ALL`, 다중 열은 `(A, B) IN`' },
      { label: '상관 서브쿼리', line: '안쪽에서 바깥 행의 열을 참조한다. `X.DEPT_CODE = E.DEPT_CODE`' },
      { label: 'EXISTS', line: '행이 있는지만 본다. 서브쿼리 SELECT 목록은 관례로 `1`' },
      { label: 'NOT IN과 NULL', line: '목록에 NULL이 하나라도 있으면 0행, `NOT EXISTS`로 바꾼다' },
      { label: 'ROWNUM', line: '정렬보다 먼저 붙는다. 안쪽에서 정렬하고 바깥에서 `ROWNUM`' },
      { label: '순위', line: '`RANK` 1·1·3, `DENSE_RANK` 1·1·2, 그룹마다 매기려면 `PARTITION BY`' },
    ],
    note: '순위 함수와 ROWNUM으로 거르는 조건은 인라인 뷰로 한 번 감싼 바깥에 씁니다',
  },
  {
    key: 'G',
    title: 'DDL과 제약 조건',
    start: 107,
    end: 126,
    lead: '테이블을 만들고 고치는 문법의 단원입니다. 서술형은 제약 조건 비교가 중심입니다.',
    points: [
      { label: '자료형', line: '`CHAR` 고정 길이 · `VARCHAR2` 가변 길이 · `NUMBER` · `DATE` · `TIMESTAMP`' },
      { label: '기본키', line: 'NULL과 중복이 모두 불가, 테이블에 하나. 여러 열을 묶으면 복합 기본키' },
      { label: '외래키', line: '부모에 없는 값은 거부하고 NULL은 받는다. `ON DELETE SET NULL` · `CASCADE`' },
      { label: 'CHECK', line: '조건이 FALSE일 때만 막는다. NULL까지 막으려면 `NOT NULL`을 따로' },
      {
        label: 'ALTER TABLE',
        line: '`ADD` · `MODIFY` · `DROP COLUMN` · `RENAME COLUMN … TO` · `RENAME TO` · `ADD CONSTRAINT`',
      },
      { label: 'CTAS', line: '`CREATE TABLE … AS SELECT`, 고른 열에 따로 걸어 둔 NOT NULL만 따라오고 `WHERE 1 = 0`이면 구조만' },
    ],
    note: '제약 조건 비교는 NULL 허용과 중복 허용 두 칸으로 표를 그려 놓고 채우면 헷갈리지 않습니다',
  },
  {
    key: 'H',
    title: 'DML과 트랜잭션',
    start: 127,
    end: 138,
    lead: '행을 넣고 고치고 지우는 문장과, 그 변경을 확정하거나 되돌리는 방법을 다루는 단원입니다.',
    points: [
      { label: 'INSERT', line: '`INSERT INTO 표 (열, …) VALUES (값, …)`, 조회 결과를 넣을 때는 `INSERT INTO … SELECT`' },
      { label: 'UPDATE · DELETE', line: '`WHERE`가 빠지면 모든 행이 바뀌거나 지워진다' },
      { label: '트랜잭션', line: '`COMMIT` 확정 · `ROLLBACK` 되돌림, DDL을 실행하는 즉시 자동 커밋' },
      { label: 'DELETE와 TRUNCATE', line: 'DELETE는 DML이라 커밋 전에는 롤백할 수 있고, TRUNCATE는 DDL이라 롤백할 수 없다' },
      { label: 'INSERT ALL', line: '`WHEN 조건 THEN INTO …` `ELSE INTO …` 다음에 `SELECT`' },
    ],
    note: 'UPDATE와 DELETE는 WHERE부터 떠올립니다. 빠지면 모든 행이 대상이 됩니다',
  },
  {
    key: 'I',
    title: 'SEQUENCE',
    start: 139,
    end: 146,
    lead: '옵션 이름과 NEXTVAL·CURRVAL의 규칙을 외우는 단원입니다. 여덟 문제로 가장 짧습니다.',
    points: [
      { label: '생성', line: '`CREATE SEQUENCE 이름 START WITH n INCREMENT BY n MAXVALUE n NOCYCLE`' },
      { label: 'NEXTVAL', line: '다음 값을 발급하고 시퀀스를 진행한다. 첫 값은 시작값 그대로' },
      { label: 'CURRVAL', line: '이 세션에서 마지막으로 받은 값, `NEXTVAL`보다 먼저 부르면 오류' },
      { label: '변경', line: '`ALTER SEQUENCE`로 증가값은 바꾸고, `START WITH`는 삭제 후 다시 생성' },
      { label: '빈 번호', line: '롤백해도 이미 발급한 번호는 돌아오지 않는다' },
    ],
    note: '시퀀스 옵션 사이에는 쉼표를 넣지 않습니다',
  },
  {
    key: 'J',
    title: 'JDBC',
    start: 147,
    end: 160,
    lead: '연결부터 자원 닫기까지 여섯 단계와 메서드 이름 몇 개를 정확히 쓰는 단원입니다.',
    points: [
      { label: '순서', line: '드라이버 등록 → 연결 → Statement 생성 → SQL 실행 → 결과 처리 → 닫기' },
      {
        label: '연결',
        line: '`Class.forName("oracle.jdbc.driver.OracleDriver")` 다음 `DriverManager.getConnection(url, user, pw)`',
      },
      { label: '실행', line: '`executeQuery()`는 `ResultSet`, `executeUpdate()`는 영향받은 행 수 `int`' },
      { label: 'PreparedStatement', line: '`?` 자리에 `setString(1, 값)`, 번호는 1부터' },
      { label: 'ResultSet', line: '`while (rs.next())`로 한 행씩 옮기고 `rs.getString("열")`로 값을 꺼낸다' },
      { label: '예외와 닫기', line: '`ClassNotFoundException` · `SQLException`, ResultSet → Statement → Connection 순서로 닫기' },
    ],
    note: 'JDBC로 보내는 SQL 문자열에는 끝에 세미콜론을 붙이지 않습니다',
  },
  {
    key: 'K',
    title: '춘대학교 워크북 응용',
    start: 161,
    end: 180,
    lead: '춘대학교 테이블로 앞 단원의 문법을 다시 씁니다. 열 이름이 길어서 오타를 조심합니다.',
    points: [],
    tables: ['TB_DEPARTMENT', 'TB_STUDENT', 'TB_PROFESSOR', 'TB_CLASS', 'TB_CLASS_PROFESSOR', 'TB_GRADE'],
    note: "휴학 여부 ABSENCE_YN은 'Y'와 'N'이고, 170번은 TB_GRADE의 기본키를 TERM_NO·CLASS_NO·STUDENT_NO의 조합으로 가정합니다",
  },
  {
    key: 'L',
    title: '남은 함수·뷰·JDBC 유형',
    start: 181,
    end: 200,
    lead: '앞 단원에서 빠진 함수와 뷰, 데이터 사전, JDBC 유형을 모았습니다.',
    points: [
      { label: '문자 함수', line: "`LPAD('7', 3, '0')`은 `'007'` · `CONCAT` · `INITCAP`" },
      { label: '숫자·날짜', line: "`ABS` · `MONTHS_BETWEEN(나중, 처음)` · `NEXT_DAY` · `TO_NUMBER('1,250', '9,999')`" },
      { label: '그룹', line: '`ROLLUP`은 소계와 총계를 더하고, `UNION`은 열 개수와 자료형을 맞춘다' },
      { label: '뷰', line: 'SELECT로 정의한 가상 테이블, `WITH READ ONLY`면 조회만' },
      { label: '데이터 사전', line: '`USER_CONSTRAINTS` · `USER_SEQUENCES`' },
      { label: 'JDBC', line: '`executeUpdate()`가 0이면 바뀐 행 없음 · 열 번호는 1부터 · 첫 `rs.next()` 전 커서는 첫 행 앞' },
    ],
    note: '일반 뷰는 데이터를 따로 저장하지 않습니다. 조회할 때마다 정의해 둔 SELECT가 실행됩니다',
  },
]

export function unitOf(key: UnitKey): Unit {
  const unit = UNITS.find((item) => item.key === key)
  if (!unit) throw new Error(`없는 단원: ${key}`)
  return unit
}

/** C 키로 여는 화면. 200문제에서 되풀이되는 함정을 열 줄로 줄였다. refs는 그 함정을 다루는 문제 번호다. */
export const CHEAT_SHEET: Array<{ label: string; line: string; refs: number[] }> = [
  { label: 'NULL 비교', line: '`= NULL`은 0행이다. `IS NULL`로 쓴다', refs: [22, 28] },
  { label: 'NULL 계산', line: 'NULL이 섞인 산술 계산은 NULL이다. `NVL`로 먼저 바꾼다', refs: [49, 52] },
  { label: 'COUNT와 AVG', line: '`COUNT(열)`과 `AVG(열)`은 NULL인 행을 빼고 계산한다', refs: [56, 62] },
  { label: '우선순위', line: 'AND가 OR보다 먼저다. OR는 괄호로 묶는다', refs: [17] },
  { label: 'WHERE와 HAVING', line: '그룹 함수 조건은 `HAVING`, 집계하지 않은 열은 `GROUP BY`에', refs: [59, 60] },
  { label: 'NOT IN', line: '목록에 NULL이 끼면 0행이다. `NOT EXISTS`를 쓴다', refs: [98, 99] },
  { label: 'ROWNUM', line: '`ORDER BY`보다 먼저 붙는다. 정렬은 인라인 뷰 안에서 한다', refs: [100, 101] },
  { label: '0명 세기', line: '`LEFT JOIN` 다음에는 `COUNT(*)` 대신 `COUNT(오른쪽.키)`', refs: [88, 166] },
  { label: 'CURRVAL', line: '같은 세션에서 `NEXTVAL`을 한 번 부른 뒤에만 쓸 수 있다', refs: [143] },
  { label: 'JDBC 번호', line: '`?`와 열 번호는 1부터, SELECT는 `executeQuery()`', refs: [158, 197] },
]
