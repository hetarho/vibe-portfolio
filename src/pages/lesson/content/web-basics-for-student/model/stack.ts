/**
 * 학원 과정의 기술 스택과 오늘 이야기를 잇는 데이터.
 *
 * 층 순서는 code-thinking-basics의 STACK_PATH(자바 → 데이터베이스 → 웹과 스프링 → 클라우드·배포)를
 * 그대로 잇는다. 같은 학생에게 이미 그 순서로 말했으므로 여기서 다른 이름을 쓰면 안 된다.
 * 데이터베이스는 Oracle, 프레임워크는 Spring을 쓰는 국비 과정의 일반적인 구성을 기준으로 적는다.
 * 과정마다 MySQL이나 Spring Boot로 갈리는 지점은 각 항목의 note에 적어 두고 강사가 말로 조정한다.
 */

export const COURSE_LAYERS = [
  {
    floor: '1층',
    name: '자바',
    learn: '문법 · 객체 · 컬렉션 · IO · 스트림 · DTO',
    today: '서버 코드 칸 안에서 쓰입니다',
    state: '지금 다시 보는 중' as const,
  },
  {
    floor: '2층',
    name: '데이터베이스',
    learn: 'Oracle SQL · 조인 · JDBC',
    today: '껐다 켜니 주문이 사라진 장면부터',
    state: '이미 배운 곳' as const,
  },
  {
    floor: '3층',
    name: '웹과 스프링',
    learn: 'HTML · CSS · JS · JSP · Servlet · Spring MVC',
    today: '주소를 치면 벌어지는 일부터',
    state: '바로 다음' as const,
  },
  {
    floor: '4층',
    name: '배포와 운영',
    learn: '톰캣 · 클라우드 서버 · 설정과 로그',
    today: '드디어 문을 여는 장면',
    state: '과정 마지막' as const,
  },
]

/** 지금 어디쯤인지 · 자바와 Oracle을 지나 다시 자바로 돌아온 시점 기준 */
export const WHERE_NOW = [
  { head: '1층에서 지나온 것', detail: '클래스와 객체, 상속과 오버라이딩, 추상화, 컬렉션, IO, 스트림, DTO' },
  { head: '2층에서 지나온 것', detail: 'Oracle에서 표를 만들고 조건으로 찾고 두 표를 조인해 본 경험' },
  { head: '다시 자바로 돌아온 이유', detail: '3층에서 Oracle의 결과를 담아 화면까지 넘기는 그릇이 전부 자바 객체이기 때문입니다' },
]

/** 요청 하나가 스프링 안을 지나는 길 — 오늘 이야기의 어느 장면인지 함께 적는다 */
export const SPRING_FLOW = [
  {
    step: 'DispatcherServlet',
    detail: '들어온 요청을 받아 어느 Controller로 보낼지 정합니다',
    today: '주소를 치면 오가는 편지 한 통',
  },
  {
    step: 'Controller',
    detail: '@GetMapping으로 주소를 잡고, 파라미터를 받아 형식을 확인합니다',
    today: '카운터',
  },
  {
    step: 'Service',
    detail: '재고 확인, 할인 계산처럼 이 서비스의 규칙을 실행합니다. @Transactional이 붙는 자리입니다',
    today: '주방',
  },
  {
    step: 'DAO · Mapper',
    detail: 'SQL을 실행해 Oracle에서 값을 꺼내 오고 결과를 기록합니다',
    today: '창고',
  },
]

/** 화면으로 돌아가는 두 가지 방식 */
export const SPRING_VIEW = [
  { head: 'JSP로 화면을 만들어 보내기', detail: '서버가 HTML을 완성해서 내려줍니다. 국비 과정에서 먼저 배우는 방식입니다' },
  { head: 'JSON만 내려주기', detail: '@RestController로 데이터만 보내고 화면은 브라우저가 그립니다. 앱과 함께 쓸 때 필요합니다' },
]

/** Oracle에 말을 거는 세 가지 방법 */
export const DB_ACCESS = [
  {
    name: 'JDBC',
    detail: 'Connection을 열고 PreparedStatement로 SQL을 보내고 ResultSet을 한 줄씩 읽습니다',
    feel: '가장 밑바닥 · 실습에서 이미 해 본 방식',
  },
  {
    name: 'MyBatis',
    detail: 'SQL은 XML에 적어 두고 자바에서는 메서드로 부릅니다. 결과를 DTO에 담아 줍니다',
    feel: '3층에서 만나게 될 방식 · 팀 프로젝트에서 가장 많이 씁니다',
  },
  {
    name: 'JPA',
    detail: '표 한 줄을 객체 하나로 다룹니다. SQL을 직접 쓰는 일이 줄어듭니다',
    feel: '요즘 채용 공고에 자주 보이는 방식 · 과정에서는 맛만 보는 경우가 많습니다',
  },
]

/** Oracle을 쓸 때 화면의 설명과 달라지는 표기 */
export const ORACLE_NOTES = [
  { head: '번호를 자동으로 매기기', detail: 'Oracle은 시퀀스(SEQUENCE)를 만들어 씁니다. MySQL의 AUTO_INCREMENT와 같은 일을 합니다' },
  { head: '숫자와 글자 타입', detail: 'NUMBER와 VARCHAR2를 씁니다. 다른 데이터베이스의 INT, VARCHAR에 해당합니다' },
  { head: '몇 건만 잘라 가져오기', detail: 'ROWNUM이나 OFFSET FETCH를 씁니다. 목록을 20건씩 끊어 보여줄 때 쓰는 문법입니다' },
]
