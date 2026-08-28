/**
 * PART 1의 예제는 강사가 Claude Code로 약 15분 만에 만든 `map-demo` 하나다 —
 * "좋아하는 장소를 지도에 저장하면, 나를 팔로우한 친구가 볼 수 있다".
 * React + Vite 프론트, Supabase(Postgres·Auth·RLS)가 백엔드 전부, Google Maps, Netlify 배포.
 *
 * 이 레포는 **결과물 예시**다. 수강생은 이걸 클론하지 않는다 — 자기 아이디어로 0부터
 * 같은 수준의 결과물을 혼자 만드는 것이 목표라서, PART 3의 8단계는 map-demo와 무관하게
 * 어느 아이디어에도 적용되는 순서로 쓴다. 슬라이드에 나오는 폴더·에러 문구는 실제 것만 쓴다.
 */
export const REPO = {
  owner: 'hetarho',
  name: 'map-demo',
  url: 'https://github.com/hetarho/map-demo',
  oneLiner: '좋아하는 장소를 지도에 저장하면, 나를 팔로우한 친구가 그 핀을 본다',
  /** 강사가 Claude Code와 대화하며 이 레포를 만든 데 걸린 시간 */
  builtIn: '약 15분',
}

/** M2 · 생명주기 7단계 — 각 단계가 map-demo 어디에 살아 있는지까지 */
export const LIFECYCLE = [
  { label: '기획', question: '누구의 어떤 문제를 푸나', where: 'spec/00.overview.md §1 · 한 문단' },
  { label: 'UX', question: '어떤 화면을 어떤 순서로 지나나', where: 'apps/web/src/pages/ · 화면 8개' },
  { label: '설계', question: '무엇으로, 어디에 만드나', where: 'spec/ARCHITECTURE.md · 헌법 I1~I13' },
  { label: '구현', question: '실제로 코드를 쓴다', where: 'spec/plan → spec/jobs → apps/web' },
  { label: '검증', question: '제대로 되는지 기계가 확인', where: 'lint · typecheck · RLS 테스트 84개' },
  { label: '배포', question: '남이 열 수 있게 올린다', where: 'netlify.toml · GitHub → Netlify' },
  { label: '운영', question: '계속 살아 있게 지킨다', where: 'keepalive · backup · 할당량 · 예산' },
] as const

/** 기획 · 문제 문장 — 기능이 아니라 문제로 시작한다 */
export const PROBLEM = {
  template: '[누가] [어떤 상황]에서 [무엇]을 하려는데, [왜] 못 하고 있다',
  bad: ['지도 기반 맛집 공유 앱을 만든다', '친구 기능과 별점 기능이 있다', '나중에 커뮤니티로 확장'],
  good: {
    who: '친한 친구 5~10명과 맛집을 주고받는 20~30대',
    when: '"거기 어디였지?" 하고 카톡을 위로 한참 올릴 때',
    want: '친구가 좋다고 한 곳을 지도 위에서 한눈에 보고 싶은데',
    why: '링크는 카톡에 흩어지고, 네이버 저장은 나만 보인다',
  },
  test: '이 문장을 그 사람에게 읽어줬을 때 "맞아, 그거!"가 나오면 기획이 있는 거예요',
}

/** 기획 · 기능 자르기 — 넣은 것과 뺀 것, 그리고 이유 */
export const FEATURE_CUT = {
  rule: ['첫 화면 하나로 통하는가', '없으면 앱을 못 쓰는가', '가설을 검증하는 데 필요한가'],
  kept: [
    { f: 'Google 로그인', why: '누가 저장했는지 알아야 친구 개념이 성립' },
    { f: '장소 검색 → 핀 저장', why: '앱의 본체 — 없으면 앱이 없다' },
    { f: '팔로우 → 친구 핀 겹쳐 보기', why: '이게 가설 — "친구 핀을 보고 싶어 한다"' },
  ],
  cut: [
    { f: '비공개 핀', why: '가설과 무관 · 규칙 6개가 늘어남' },
    { f: '팔로우 승인', why: '표 하나 · 화면 둘 · 대기 상태 추가' },
    { f: '댓글 · 좋아요', why: '100명 전에는 조용한 기능' },
    { f: '계정 삭제', why: '알면서 뺀 것 — 문서에 "known gap"으로 적어둠' },
  ],
}

/** 기획 · 가설과 숫자 — "100명"을 측정 가능하게 */
export const HYPOTHESIS = {
  vague: '주변 100명이 써보면 좋겠다',
  sharp: '주소를 받은 100명 중 30명이 2주 안에 핀 3개 이상 찍고, 그중 10명이 친구 1명 이상 팔로우한다',
  measures: [
    { q: '써봤나', where: 'profiles 행 수 (가입)' },
    { q: '진짜 썼나', where: '한 사람당 places 행 수 ≥ 3' },
    { q: '가설이 맞나', where: 'follows 행 수 — 0이면 "친구 핀" 가설이 틀린 것' },
  ],
  lesson: '숫자가 안 나오면 실패가 아니라 결과예요 — 기획 문단을 고쳐 다음 바퀴로',
}

/** UX · 한 화면이 가지는 4가지 상태 — 비개발자가 가장 자주 빠뜨리는 것 */
export const STATES = [
  { state: '비어 있을 때', q: '첫 사용자는 뭘 보나', demo: '핀 0개 지도 → 그래서 "추천 사람" 띠가 있다' },
  { state: '기다릴 때', q: '데이터 오는 3초 동안', demo: '회색 지도 + 로딩 표시 · 빈 지도로 착각하지 않게' },
  { state: '실패했을 때', q: '키가 틀렸거나 인터넷이 끊기면', demo: '"어떤 변수가 잘못됐다"를 그대로 보여준다 — 빈 화면 금지' },
  { state: '성공했을 때', q: '저장 직후 무엇이 바뀌나', demo: '핀이 지도에 바로 찍히고 시트가 닫힌다' },
] as const

/** 설계 · 창업자의 스택 선택 기준 3개 */
export const STACK_CRITERIA = [
  { rule: '무료 티어로 100명을 버티나', why: '검증 전에 고정비가 생기면 실험이 아니라 사업이 돼요' },
  { rule: 'AI가 잘 아는 것인가', why: '문서와 예제가 많은 도구일수록 Claude가 덜 틀려요 — 유행보다 흔한 것' },
  { rule: '서버를 안 둬도 되나', why: '서버가 있으면 켜두는 비용 · 죽는 일 · 보안이 전부 내 일이 돼요' },
] as const

/** 설계 · 데이터 모델 — 명사는 표, 관계는 선, "누가 볼 수 있나"는 규칙 */
export const DATA_MODEL = {
  tables: [
    { name: 'profiles', korean: '사람', cols: 'id · nickname · avatar', rule: '누구나 읽기 · 본인만 고치기' },
    { name: 'places', korean: '핀', cols: 'owner → profiles · google_place_id · 카테고리 · 메모 · 별점', rule: '주인 + 주인을 팔로우한 사람만 읽기' },
    { name: 'follows', korean: '팔로우', cols: 'follower → profiles · followee → profiles', rule: '내가 건 것만 걸고 풀기' },
  ],
  insight: '기능 하나를 뺐을 때 표·선·규칙 중 몇 개가 사라지는지 세어 보면 그 기능의 진짜 비용이 나와요',
}

/** 구현 · 좋은 코드 — 창업자가 코드를 못 읽어도 볼 수 있는 신호 */
export const GOOD_CODE = {
  good: [
    { sign: '폴더 이름만 봐도 기능이 보인다', how: 'features/save-place · features/follow-user — 기획서의 동사가 그대로' },
    { sign: '파일이 작다', how: '한 파일 = 한 가지 일. 화면 하나가 300줄 넘으면 둘로 나눌 때' },
    { sign: '숫자가 한 곳에 있다', how: '줌 레벨 · 글자 수 제한 · 검색 지연시간 전부 values.yaml 한 파일' },
    { sign: '같은 일이 두 곳에 없다', how: '버튼 하나 고쳤는데 다른 화면은 옛 모양이면 복사본이 있는 것' },
  ],
  bad: ['1,000줄짜리 파일', '코드 속에 박힌 300, 0.35 같은 숫자', 'utils · misc · temp 같은 폴더 이름', '주석으로 지운 코드 덩어리'],
  ask: '"이 프로젝트에서 가장 큰 파일 5개와 줄 수 보여줘. 그리고 하드코딩된 숫자 찾아줘"',
}

/** 구현 · 좋은 코드가 돈인 이유 */
export const CODE_ECONOMICS = [
  { when: 'AI가 고칠 때', good: '파일이 작고 이름이 맞으면 한 번에 맞는 곳을 고쳐요', bad: '큰 파일에서는 옆 기능을 같이 부숴요' },
  { when: '개발자를 뽑을 때', good: '첫날 폴더 열고 "아, 이렇게 돼 있구나"', bad: '첫 2주가 "이게 왜 이래요?"' },
  { when: '기능을 뺄 때', good: '폴더 하나 지우면 끝', bad: '여기저기 얽혀 못 지우고 죽은 코드가 쌓여요' },
] as const

/** 검증 · 수용 기준 쓰는 법 — "잘 된다"가 아니라 관찰 가능한 문장 */
export const ACCEPTANCE = {
  bad: ['로그인이 잘 된다', '지도가 빠르다', '보안이 튼튼하다'],
  good: [
    '내 Gmail로 로그인 → 내 닉네임이 헤더에 뜬다. localhost에서 하면 localhost로 돌아온다',
    '/u/닉네임 주소를 직접 쳐서 열어도 404가 아니라 그 사람 지도가 뜬다',
    '다른 사이트에서 이 지도 키를 부르면 RefererNotAllowedMapError가 실제로 난다',
    '팔로우하지 않은 사람의 핀은 DB에 직접 물어도 0행이 나온다 (테스트 84개 중 하나)',
  ],
  rule: '누가 · 무엇을 하면 · 무엇이 보인다 — 이 세 칸이 채워지면 AI에게 "이걸 테스트로 만들어줘"가 가능해요',
}

/** 배포 · 올리기 전 확인 — 주소가 바뀌면 콘솔 세 곳이 따라 바뀌어야 한다 */
export const DEPLOY_CHECK = [
  { what: '배포 주소를 세 콘솔에 알린다', where: 'Supabase Site URL · Google OAuth 원본 · 지도 키 리퍼러' },
  { what: '환경변수를 호스팅에도 넣는다', where: '.env.local과 같은 값 — 비밀키는 여전히 없음' },
  { what: '주소를 직접 쳐서 열어본다', where: '/u/닉네임을 링크 클릭이 아니라 타이핑으로 — SPA 리디렉션 확인' },
  { what: '번들에서 비밀 문자열을 찾아본다', where: 'grep "secret" dist/ → 0건' },
] as const

/** 운영 · 유지보수 우선순위 — 들어오는 요청을 표 하나로 판단 */
export const MAINTENANCE = {
  axes: { x: '겪는 사용자 수', y: '못 쓰게 되는 정도' },
  cells: [
    { label: '많이 · 못 쓴다', action: '지금 고친다 — 다른 일 멈추고', tone: 'critical' },
    { label: '적게 · 못 쓴다', action: '이번 주 안에 · 우회법 먼저 알려준다', tone: 'caution' },
    { label: '많이 · 불편하다', action: '다음 바퀴의 기획으로 — changes 문서에', tone: 'info' },
    { label: '적게 · 불편하다', action: '기록만 · 3번 들어오면 올린다', tone: 'quiet' },
  ] as const,
  debt: '"나중에 고치자"는 이자가 붙어요 — 100명 넘기 전에 한 번, 개발자 뽑기 전에 한 번 갚는 날을 정해요',
}

/** M4 · 사용자가 지나는 화면 순서 — pages/ 폴더 그대로 */
export const SCREENS = [
  { name: '로그인', folder: 'login', beat: 'Google 버튼 하나' },
  { name: '닉네임', folder: 'onboarding', beat: '첫 로그인에만' },
  { name: '지도', folder: 'map', beat: '앱의 본체' },
  { name: '장소', folder: 'place', beat: '검색 → 핀 저장' },
  { name: '사람', folder: 'people', beat: '검색 · 추천 · 팔로우' },
  { name: '프로필', folder: 'profile', beat: '/u/닉네임 공유 링크' },
] as const

/** M5 · 스택 — "왜 이걸 골랐나"가 창업자가 읽을 칸 */
export const STACK = [
  { concern: '화면', choice: 'React + Vite', why: '지도가 앱의 전부라 서버 렌더링이 필요 없음' },
  { concern: '데이터 · 로그인', choice: 'Supabase', why: '서버 대신 — 권한은 DB 규칙(RLS)이 대신 봄' },
  { concern: '지도', choice: 'Google Maps', why: '핀 · 장소 검색을 한 회사 키로 해결' },
  { concern: '올리는 곳', choice: 'Netlify', why: '정적 파일 호스팅 · 무료 · push하면 자동 배포' },
] as const

/** M6 · 헌법 13개 중 창업자가 알아야 하는 4개 */
export const INVARIANTS = [
  { id: 'I2', rule: 'Supabase가 유일한 백엔드', founder: '서버가 없으니 서버 비용도, 서버 장애도 없어요' },
  { id: 'I8', rule: '지도 키는 공개가 정상', founder: '숨기는 게 아니라 "어느 사이트에서만" 제한하는 게 보안이에요' },
  { id: 'I9', rule: '비밀키는 번들에 절대 없음', founder: 'VITE_로 시작하는 4개만 코드에 실려요 — 다섯 번째가 생기면 설계 오류' },
  { id: 'I11', rule: '스키마 변경은 마이그레이션 파일로만', founder: '대시보드에서 손으로 고치면 레포와 DB가 어긋나요' },
] as const

/** M7 · spec → job → code — 커밋 로그가 그 순서를 그대로 보여준다 */
export const COMMITS = [
  { hash: 'cf1d3d8', msg: 'feat(web): lay the project foundation (job 01)' },
  { hash: '6cf8458', msg: 'feat(db): data model and RLS, the whole authorization layer (job 03)' },
  { hash: '74b2f3b', msg: 'feat(web): Google auth, session state, and route guards (job 02)' },
  { hash: '2a8b78e', msg: 'feat(web): the map, its pins, and one map instance per session (job 04)' },
  { hash: 'dee10f3', msg: 'feat(web): place capture, and a counted Places API budget (job 05)' },
  { hash: 'b4f30a4', msg: 'feat(ops): deploy config, CI policy gate, keep-alive, and backups (job 08)' },
] as const

/** M8 · 검증 — 사람이 보는 것과 기계가 보는 것 */
export const CHECKS = {
  machine: [
    { name: 'typecheck', catches: '타입이 안 맞는 코드' },
    { name: 'lint', catches: '폴더 경계를 넘는 import' },
    { name: 'db:test · 84개', catches: '남의 핀이 보이는 권한 구멍' },
    { name: 'CI (GitHub Actions)', catches: '위 셋 중 하나라도 깨진 PR' },
  ],
  human: ['로그인이 실제로 되나', '검색한 장소가 핀으로 찍히나', '팔로우한 친구 핀이 내 지도에 보이나', '폰에서 열어도 쓸 만한가'],
}

/** M9 · 앱을 켜는 데 필요한 값 4개 — 전부 .env.local 한 파일 */
export const KEYS = [
  { name: 'VITE_SUPABASE_URL', console: 'Supabase', screen: 'Settings → Data API', trap: '/rest/v1/ 붙은 주소 ✗' },
  { name: 'VITE_SUPABASE_PUBLISHABLE_KEY', console: 'Supabase', screen: 'Settings → API Keys', trap: 'eyJ… 옛 키 ✗ · sb_publishable_ ✓' },
  { name: 'VITE_GOOGLE_MAPS_API_KEY', console: 'Google Cloud', screen: 'Credentials → API 키', trap: '리퍼러 · API 제한 2개 필수' },
  { name: 'VITE_GOOGLE_MAPS_MAP_ID', console: 'Google Cloud', screen: 'Maps Management → 지도 ID', trap: '없으면 핀이 안 그려짐' },
] as const

/** M10 · 운영 — 배포하고 끝이 아니라 여기서 다시 기획으로 돌아간다 */
export const OPERATIONS = [
  { risk: 'Supabase 무료 프로젝트는 7일 놀면 잠든다', guard: 'keepalive.yml — 매일 한 번 깨움' },
  { risk: '무료 티어에는 백업이 없다', guard: 'backup.yml — 주기적으로 DB 덤프' },
  { risk: '지도 키가 새면 내 카드로 청구된다', guard: '일일 할당량 상한 + 예산 알림 50/90/100%' },
  { risk: '사용자가 "이거 안 돼요" 한다', guard: 'spec/changes → job → 코드 — 다시 한 바퀴' },
] as const

/** M13 · 연동이 어려운 이유 — 콘솔 4개를 사람이 클릭해야 한다 */
export const CONSOLES = [
  { name: 'Google Cloud', makes: '결제 · Maps API 2개 · API 키 · Map ID · OAuth 클라이언트' },
  { name: 'Supabase', makes: '프로젝트 · Publishable 키 · Google 로그인 연결 · Redirect URL' },
  { name: 'Netlify', makes: '사이트 · 환경변수 4개 · 프로덕션 주소' },
  { name: 'GitHub', makes: '레포 · Actions(CI · keepalive · backup)' },
] as const

/** M14 · 강사가 실제로 했던 대화 패턴 — GCP를 몰라도 이렇게 물으면 된다 */
export const CHAT = [
  {
    who: 'me',
    text: '지도 키 발급 중이야. Google Cloud에서 API 키 만들었는데 "애플리케이션 제한사항" 화면이 떴어. 뭘 골라?',
  },
  {
    who: 'ai',
    text: '「HTTP 리퍼러(웹사이트)」를 고르고 항목 추가에 http://localhost:5173/* 를 넣어요. 저장 전에 아래 「API 제한사항」도 열어서 Maps JavaScript API와 Places API (New) 두 개만 체크하세요.',
  },
  { who: 'me', text: '[캡처] 저장했는데 지도 자리에 회색 화면만 나와.' },
  {
    who: 'ai',
    text: 'F12 콘솔에 RefererNotAllowedMapError가 있으면 리퍼러 주소 끝에 /* 가 빠진 거예요. 콘솔 메시지를 그대로 붙여 주세요.',
  },
] as const

/** M15 · 막혔을 때 4단계 */
export const ASK_STEPS = [
  { step: '위치', say: '"4단계 · Supabase Google 로그인 연결 중이야"', why: 'AI가 어느 문서·어느 콘솔인지 같은 페이지를 봐요' },
  { step: '화면 그대로', say: '캡처 붙이기 · 에러 문구 복사 붙이기', why: '요약하면 단서가 사라져요' },
  { step: '한 클릭만', say: '"다음에 뭘 누르면 돼?"', why: '10단계 설명은 3단계에서 어긋나요' },
  { step: '검증 시키기', say: '"됐는지 확인하는 명령 알려줘"', why: '"완료했습니다"는 확인이 아니에요' },
] as const

/** M16 · 지도+로그인 앱에서 강사가 실제로 만난 에러 4개 — 문구 그대로 붙이면 AI가 찾는다 */
export const ERRORS = [
  { text: 'RefererNotAllowedMapError', means: '이 사이트에서 이 지도 키를 못 쓴다', fix: '키의 리퍼러 목록에 지금 주소 + /* 추가' },
  { text: 'PGRST125', means: 'Supabase 주소 뒤에 /rest/v1/ 이 붙었다', fix: 'URL을 https://<ref>.supabase.co 로' },
  { text: 'redirect_uri_mismatch', means: 'Google에 등록한 돌아올 주소가 다르다', fix: 'Supabase 콜백 주소를 Google OAuth에 등록' },
  { text: '로그인 후 다시 로그인 화면', means: '테스트 사용자 목록에 내 계정이 없다', fix: 'OAuth 동의 화면 → 테스트 사용자 추가' },
] as const

/** M17 · 절대 붙이면 안 되는 값 — AI 채팅창에도 */
export const SECRETS = [
  { looks: 'sb_secret_…', is: 'Supabase 비밀키 — DB 전체 권한' },
  { looks: 'GOCSPX-…', is: 'Google OAuth 클라이언트 보안 비밀번호' },
  { looks: 'eyJ… (service_role)', is: 'Supabase 옛 관리자 토큰' },
] as const

/** M18 · "됐다"를 확인하는 명령 — 에이전트에게 실행시키고 결과를 같이 읽는다 (어느 프로젝트든 같다) */
export const VERIFY = [
  { when: '환경변수 채운 뒤', cmd: 'pnpm dev', pass: '에러 없이 localhost 주소가 열림' },
  { when: '기능 하나 만든 뒤', cmd: 'pnpm typecheck && pnpm lint', pass: '빨간 줄 0개' },
  { when: 'DB 규칙 만든 뒤', cmd: 'pnpm db:test', pass: 'N passed, 0 failed' },
  { when: '배포한 뒤', cmd: 'grep -r "secret" dist/', pass: '아무것도 안 나옴' },
] as const

/** M19~M23 · 다음 시간까지 혼자 하는 8단계 — 내 아이디어로 0부터. 순서가 곧 의존 관계다 */
export const HOMEWORK = [
  {
    n: 1,
    title: '한 문단 기획',
    doc: '① 기획',
    do: '누가 · 무엇을 못 해서 · 첫 화면이 무엇인지 — 딱 한 문단. 기능은 3개까지',
    success: '남에게 읽혀서 "아, 그 앱" 소리가 나온다',
    ask: '"이 문단 읽고 빠진 질문 3개만 해줘. 답 말고 질문만"',
  },
  {
    n: 2,
    title: '빈 폴더에서 설계 문서',
    doc: '② UX · ③ 설계',
    do: '새 폴더 → Claude Code → 화면 목록 · 스택 · 규칙(헌법) 5개를 문서로 먼저',
    success: 'docs/ 아래 기획 · 화면 · 설계 문서 3개, 코드 0줄',
    ask: '"코드 쓰기 전에 화면 순서와 스택을 문서로 써줘. 서버 없는 구성으로"',
  },
  {
    n: 3,
    title: '첫 화면 · 가짜 데이터로',
    doc: '④ 구현',
    do: '핵심 화면 1개를 로컬(localhost)에서 — 로그인·DB 없이 하드코딩 데이터로',
    success: 'pnpm dev로 열어서 손으로 눌러볼 수 있다',
    ask: '"로그인이랑 DB는 아직. 가짜 데이터로 이 화면만 먼저 띄워줘"',
  },
  {
    n: 4,
    title: '로그인 + DB 연동',
    doc: '④ 구현 · 콘솔 ①②',
    do: 'Supabase 프로젝트 · Google 로그인 · 표와 권한 규칙 · 마이그레이션 파일로',
    success: '내 Gmail로 로그인 → 저장한 게 새로고침해도 남는다',
    ask: '"Supabase 대시보드 이 화면인데 [캡처] 다음에 뭘 눌러?"',
  },
  {
    n: 5,
    title: '외부 API 연동',
    doc: '④ 구현 · 콘솔 ③',
    do: '지도 · 결제 · 알림 등 아이디어에 필요한 외부 서비스 1개 — 키 발급 · 제한 걸기',
    success: '그 기능이 실제 데이터로 동작한다 (지도면 진짜 지도)',
    ask: '"이 API 키 화면에서 [캡처] 어떤 제한을 걸어야 해?"',
  },
  {
    n: 6,
    title: '배포',
    doc: '⑥ 배포',
    do: 'GitHub push → Netlify(또는 Vercel) · 환경변수 · 로그인 주소 · 키 리퍼러에 배포 주소 추가',
    success: '친구 폰에서 주소 열고 로그인까지',
    ask: '"배포 주소가 생겼어. 이제 어느 콘솔에서 뭘 바꿔야 해? 목록으로"',
  },
  {
    n: 7,
    title: '지키기',
    doc: '⑦ 운영',
    do: 'API 일일 할당량 상한 · 예산 알림 · 무료 DB 잠들지 않게 · 백업',
    success: '예산 알림 이메일이 설정돼 있다',
    ask: '"이 앱이 갑자기 유명해지면 내 카드에 얼마 찍혀? 막는 법 순서대로"',
  },
  {
    n: 8,
    title: '5명에게 열어보게 + 기록',
    doc: '⑦ 운영 → ① 기획',
    do: '주변 5명에게 주소 보내고 반응 3줄 · 막힌 곳마다 BLOCKERS.md에 기록',
    success: '다음 시간 교재 = BLOCKERS.md + 반응 메모',
    ask: '"지금까지 막힌 것 정리해서 BLOCKERS.md에 써줘"',
  },
] as const

/** M26 · 2회차에 가져올 것 */
export const BRING = [
  { what: '배포 주소', detail: '친구 폰에서 열리는 https://… — 8단계 중 어디까지 갔든' },
  { what: 'BLOCKERS.md', detail: '막힌 지점 기록 — 어느 단계 · 무슨 화면 · 뭐라 물었나 · 어떻게 풀렸나' },
  { what: '5명의 반응 메모', detail: '"누가 · 뭐라 했나" 3줄씩 — 다음 기획 문단은 여기서 나와요' },
] as const
