import { ArrowRight } from 'lucide-react'
import { Chip, Panel, PanelLabel, SlideLayout } from '../../../deck'
import { CodeBlock } from '../ui/CodeBlock'
import { Caption, ConceptHead, MiniTable, Rules } from '../ui/Concept'

/** P17. G단원: 테이블 만들기와 제약 조건 비교 */
export function ConceptConstraintSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead step={17} area="G단원" refs="107~117" title="제약 조건은 NULL과 중복 두 칸으로 비교합니다" />

      <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
        <div className="flex min-w-0 flex-col gap-3 lg:col-span-4">
          <CodeBlock
            tone="given"
            lines={[
              'CREATE TABLE PLAYER (',
              '  PLAYER_ID NUMBER PRIMARY KEY,',
              '  NAME      VARCHAR2(30) NOT NULL,',
              '  EMAIL     VARCHAR2(50) UNIQUE,',
              '  AGE       NUMBER CHECK (AGE >= 0),',
              '  TEAM_ID   NUMBER',
              '    REFERENCES TEAM (TEAM_ID)',
              ');',
            ]}
          />
          <Caption>자료형은 `CHAR` 고정 길이, `VARCHAR2` 가변 길이, `NUMBER`, 날짜는 `DATE`와 `TIMESTAMP`입니다.</Caption>
        </div>
        <div className="flex min-w-0 flex-col gap-3 lg:col-span-5">
          <MiniTable
            head={['제약', 'NULL', '중복', '기억할 점']}
            mono={[0]}
            rows={[
              ['NOT NULL', '불가', '허용', '값을 반드시 넣게 한다'],
              ['UNIQUE', '허용', '불가', 'NULL이 아닌 값끼리만 중복을 막는다'],
              ['PRIMARY KEY', '불가', '불가', '테이블에 하나. 여러 열을 묶으면 복합 기본키'],
              ['FOREIGN KEY', '허용', '허용', '부모에 없는 값은 거부. `ON DELETE SET NULL` · `CASCADE`'],
              ['CHECK', '허용', '허용', '조건이 FALSE일 때만 막는다'],
            ]}
          />
          <Caption>FOREIGN KEY와 CHECK의 칸은 다른 제약을 함께 걸지 않았을 때 기준입니다.</Caption>
        </div>
      </div>
    </SlideLayout>
  )
}

/** P18. G·L단원: 테이블 고치기, 복사, 뷰, 데이터 사전 */
export function ConceptAlterSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead step={18} area="G·L단원" refs="118~126 · 191~195" title="고칠 때는 ALTER, 복사할 때는 AS SELECT" />

      <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
        <div className="min-w-0 lg:col-span-5">
          <MiniTable
            label="ALTER TABLE MEMBER 뒤에 쓰는 구문"
            head={['뒤에 쓰는 구문', '하는 일']}
            mono={[0]}
            rows={[
              ['ADD (PHONE VARCHAR2(20))', '열 추가'],
              ['MODIFY (NAME VARCHAR2(50))', '자료형·길이 변경'],
              ['DROP COLUMN PHONE', '열 삭제'],
              ['RENAME COLUMN NAME TO MEMBER_NAME', '열 이름 변경'],
              ['RENAME TO MEMBER_OLD', '테이블 이름 변경'],
              ['ADD CONSTRAINT MEMBER_PK PRIMARY KEY (ID)', '제약 조건 추가'],
              ['MODIFY (ID NOT NULL)', 'NOT NULL만은 MODIFY로'],
            ]}
          />
        </div>
        <div className="min-w-0 lg:col-span-4">
          <Rules
            items={[
              { label: '복사', text: '`CREATE TABLE 새이름 AS SELECT …`. 열과 행이 복사되고, 제약은 고른 열에 따로 걸어 둔 NOT NULL만 따라온다' },
              { label: '구조만', text: '`WHERE 1 = 0`을 붙이면 행 없이 열 구조만 만들어진다' },
              { label: '주석', text: "`COMMENT ON COLUMN MEMBER.ID IS '회원번호'`" },
              { label: '뷰', text: 'SELECT에 이름을 붙인 가상 테이블. 데이터를 따로 저장하지 않고, `WITH READ ONLY`면 조회만 된다' },
              { label: '데이터 사전', text: '제약 조건은 `USER_CONSTRAINTS`, 시퀀스는 `USER_SEQUENCES`' },
            ]}
          />
        </div>
      </div>
    </SlideLayout>
  )
}

const REMOVERS = [
  { name: 'DELETE', kind: 'DML', line: '행만 지운다. 커밋 전이면 되돌린다' },
  { name: 'TRUNCATE', kind: 'DDL', line: '행만 지운다. 되돌릴 수 없다' },
  { name: 'DROP', kind: 'DDL', line: '테이블 구조까지 없앤다' },
]

/** P19. H단원: DML과 트랜잭션 */
export function ConceptDmlSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead step={19} area="H단원" refs="127~138" title="COMMIT 전까지는 되돌릴 수 있습니다" />

      <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
        <div className="flex min-w-0 flex-col gap-3 lg:col-span-4">
          <CodeBlock
            tone="given"
            lines={[
              'INSERT INTO MEMBER (ID, NAME, AGE)',
              "VALUES ('u1', '가람', 20);",
              '',
              'UPDATE MEMBER',
              'SET AGE = 21',
              "WHERE ID = 'u1';",
              '',
              'DELETE FROM MEMBER',
              'WHERE AGE < 18;',
            ]}
          />
          <Caption>UPDATE와 DELETE는 WHERE부터 떠올립니다. 빠지면 모든 행이 대상이 됩니다.</Caption>
        </div>
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
          <Panel tone="accentSoft" pad="sm" className="flex flex-col gap-2">
            <PanelLabel tone="accent">트랜잭션</PanelLabel>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <Chip>DML 실행</Chip>
              <ArrowRight className="size-5 shrink-0 text-content-muted" />
              <Chip tone="accent">COMMIT 확정</Chip>
              <Chip>ROLLBACK 되돌림</Chip>
            </div>
            <p className="text-deck-caption font-semibold text-content-strong">
              CREATE · ALTER · TRUNCATE 같은 DDL을 실행하면 그 앞의 변경까지 자동으로 커밋됩니다.
            </p>
          </Panel>

          <div className="grid gap-3 md:grid-cols-3">
            {REMOVERS.map((item) => (
              <Panel key={item.name} tone="raised" pad="sm" className="flex flex-col gap-1.5">
                <p className="font-mono text-deck-caption font-bold text-accent">{item.name}</p>
                <p className="text-deck-meta font-bold text-content-muted">{item.kind}</p>
                <p className="text-deck-caption font-semibold text-content-strong">{item.line}</p>
              </Panel>
            ))}
          </div>

          <Rules
            items={[
              { label: '조회 결과 넣기', text: '`INSERT INTO 표 (열, …) SELECT …`. VALUES를 쓰지 않는다' },
              { label: '나눠 넣기', text: '`INSERT ALL WHEN 조건 THEN INTO … ELSE INTO … SELECT …`' },
            ]}
          />
        </div>
      </div>
    </SlideLayout>
  )
}

/** P20. I단원: 시퀀스 */
export function ConceptSequenceSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead step={20} area="I단원" refs="139~146 · 195" title="시퀀스는 번호를 하나씩 내주는 객체입니다" />

      <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
        <div className="flex min-w-0 flex-col gap-3 lg:col-span-4">
          <CodeBlock
            tone="given"
            lines={['CREATE SEQUENCE SEQ_TEST', 'START WITH 100', 'INCREMENT BY 5', 'MAXVALUE 110', 'NOCYCLE;']}
          />
          <PanelLabel tone="accent">NEXTVAL을 호출할 때마다</PanelLabel>
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="accent">100</Chip>
            <ArrowRight className="size-5 shrink-0 text-content-muted" />
            <Chip>105</Chip>
            <ArrowRight className="size-5 shrink-0 text-content-muted" />
            <Chip>110</Chip>
            <ArrowRight className="size-5 shrink-0 text-content-muted" />
            <Chip>오류</Chip>
          </div>
          <Caption>NOCYCLE이라 110 다음에는 더 내주지 못합니다. 옵션 사이에는 쉼표를 넣지 않습니다.</Caption>
        </div>
        <div className="min-w-0 lg:col-span-5">
          <Rules
            items={[
              { label: 'NEXTVAL', text: '시퀀스를 증가시켜 다음 값을 발급한다. 첫 값은 시작값 그대로' },
              { label: 'CURRVAL', text: '같은 세션에서 마지막으로 받은 값. `NEXTVAL`보다 먼저 조회하면 `ORA-08002`' },
              { label: '쓰는 곳', text: "`INSERT INTO MEMBER (ID, NAME) VALUES (SEQ_MEMBER.NEXTVAL, '가람')`" },
              { label: '변경', text: '`ALTER SEQUENCE`로 증가값은 바꾼다. 시작값은 수업 기준으로 삭제한 뒤 다시 생성' },
              { label: '빈 번호', text: '롤백해도 이미 발급한 번호는 돌아오지 않는다' },
            ]}
          />
        </div>
      </div>
    </SlideLayout>
  )
}

const JDBC_STEPS = [
  { label: '드라이버 등록', lines: ['Class.forName(DRIVER);'] },
  { label: '연결', lines: ['Connection conn =', '  DriverManager.getConnection(', '    URL, "student", "student");'] },
  { label: 'Statement 생성', lines: ['Statement stmt =', '  conn.createStatement();'] },
  { label: 'SQL 실행', lines: ['ResultSet rs =', '  stmt.executeQuery(sql);'] },
  { label: '결과 처리', lines: ['while (rs.next()) {', '  rs.getString("EMP_NAME");', '}'] },
  { label: '자원 닫기', lines: ['rs.close();', 'stmt.close();', 'conn.close();'] },
]

/** P21. J단원: JDBC 여섯 단계 */
export function ConceptJdbcFlowSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead step={21} area="J단원" refs="147~155 · 159 · 160 · 198" title="JDBC는 여섯 단계를 차례로 거칩니다" />

      <ol className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {JDBC_STEPS.map((step, index) => (
          <li key={step.label} className="flex min-w-0 flex-col gap-2">
            <PanelLabel tone="accent">
              {index + 1} · {step.label}
            </PanelLabel>
            <CodeBlock tone="given" lines={step.lines} />
          </li>
        ))}
      </ol>

      <Rules
        items={[
          { label: 'DRIVER', text: '`"oracle.jdbc.driver.OracleDriver"`. 철자가 하나만 틀려도 1단계에서 예외가 난다' },
          { label: 'URL', text: '`"jdbc:oracle:thin:@127.0.0.1:1521:XE"`' },
          { label: '예외', text: '1단계에서 클래스를 못 찾으면 `ClassNotFoundException`, 2~6단계가 실패하면 `SQLException`. 닫는 순서는 연 순서의 반대' },
        ]}
      />
    </SlideLayout>
  )
}

/** P22. J·L단원: PreparedStatement와 ResultSet의 규칙 */
export function ConceptPreparedSlide() {
  return (
    <SlideLayout align="top">
      <ConceptHead
        step={22}
        area="J·L단원"
        refs="153 · 156~158 · 196~200"
        title="번호는 모두 1부터, SELECT는 executeQuery입니다"
      />

      <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
        <div className="min-w-0 lg:col-span-5">
          <CodeBlock
            tone="given"
            lines={[
              'String sql =',
              '    "SELECT NAME FROM MEMBER WHERE ID = ?";',
              'PreparedStatement ps = conn.prepareStatement(sql);',
              'ps.setString(1, id);',
              'ResultSet rs = ps.executeQuery();',
              'if (rs.next()) {',
              '    System.out.println(rs.getString(1));',
              '}',
              'rs.close();',
              'ps.close();',
            ]}
          />
        </div>
        <div className="min-w-0 lg:col-span-4">
          <Rules
            items={[
              { label: '?', text: '값이 들어갈 자리에 따옴표 없이 둔다. `setString(번호, 값)`으로 채운다' },
              { label: '번호', text: '`?` 번호와 열 번호 모두 1부터 시작한다' },
              { label: '실행', text: 'SELECT는 `executeQuery()`로 `ResultSet`을, 나머지는 `executeUpdate()`로 바뀐 행 수를 받는다' },
              { label: 'rs.next()', text: '다음 행으로 옮기며 true, 더 없으면 false. 처음 커서는 첫 행 앞에 있다' },
              { label: '세미콜론', text: 'JDBC로 보내는 SQL 문자열 끝에는 붙이지 않는다' },
              { label: '장점', text: '값과 SQL 문법을 나눠서 SQL 삽입 위험을 낮춘다' },
            ]}
          />
        </div>
      </div>
    </SlideLayout>
  )
}
