/**
 * 이 덱은 시나리오 하나를 처음부터 끝까지 굴린다.
 * 원데이 클래스 예약 사이트(class-web)를 노트북과 집 데스크톱 두 대로 운영하는 창업자가
 * "Claude가 푸시했다는데 사이트에 배너가 없다"는 미스터리를 두 번 푼다 —
 * 1부 터미널에서 한 번(범인: 푸시 안 됨), 2부 GitHub 웹에서 한 번(범인: 커밋에서 빠진
 * 새 파일 EventBanner.tsx → 빌드 실패). 화면마다 새 레포를 꺼내면 읽는 연습이 쌓이지
 * 않아서, 예제는 전부 이 레포 하나다. code-reading-for-pm이 배송비 함수 하나를 물고
 * 가는 것과 같은 원칙.
 */

/** 예제 서비스 — 모든 화면이 이 레포 하나를 물고 간다 */
export const REPO = {
  owner: 'bloomstudio',
  name: 'class-web',
  service: '원데이 클래스 예약 사이트',
}

export type TermLine = {
  /** 화면에 그대로 보이는 출력 한 줄 — 들여쓰기 포함 */
  text: string
  /**
   * key: 판단 근거가 되는 문장 · bad: git이 빨갛게 보여주는 줄 ·
   * good: 안심해도 되는 줄 · muted: 안내문(읽지 않고 넘어가도 되는 줄)
   */
  tone?: 'muted' | 'key' | 'bad' | 'good'
}

export type StatusStage = {
  /** 단계 버튼 라벨 */
  label: string
  /** 이 시점에 무슨 일이 있었나 */
  action: string
  lines: TermLine[]
  /** 출력을 한국어로 옮기면 */
  verdict: string
  /** 읽고 나서 Claude에게 시킬 말 — 없으면 안심하고 끝나는 단계 */
  order?: string
}

/**
 * G8. 같은 작업이 status를 어떻게 바꾸는지 — 고침 → 커밋 → 푸시.
 * 2단계에 남는 Untracked 한 줄이 2부 미스터리(빌드 실패)의 복선이다.
 */
export const STATUS_STAGES: StatusStage[] = [
  {
    label: '① 고친 직후',
    action: 'Claude Code가 홈 화면을 고치고, 배너 파일을 새로 만들었어요',
    lines: [
      { text: 'On branch main' },
      { text: "Your branch is up to date with 'origin/main'." },
      { text: '' },
      { text: 'Changes not staged for commit:', tone: 'key' },
      { text: '  (use "git add <file>..." to update what will be committed)', tone: 'muted' },
      { text: '\tmodified:   src/pages/home.tsx', tone: 'bad' },
      { text: '' },
      { text: 'Untracked files:', tone: 'key' },
      { text: '  (use "git add <file>..." to include in what will be committed)', tone: 'muted' },
      { text: '\tsrc/pages/EventBanner.tsx', tone: 'bad' },
    ],
    verdict:
      'modified는 "아는 파일을 고쳤다", Untracked는 "git이 처음 보는 새 파일". 둘 다 아직 저장(커밋) 전이에요 — 세이브 안 된 게임 진행 상황이에요.',
    order: '"방금 작업, 새 파일까지 전부 커밋해줘"',
  },
  {
    label: '② "커밋했습니다" 직후',
    action: 'Claude가 커밋을 마쳤다고 보고했어요. 그런데 —',
    lines: [
      { text: 'On branch main' },
      { text: "Your branch is ahead of 'origin/main' by 1 commit.", tone: 'key' },
      { text: '  (use "git push" to publish your local commits)', tone: 'muted' },
      { text: '' },
      { text: 'Untracked files:', tone: 'bad' },
      { text: '  (use "git add <file>..." to include in what will be committed)', tone: 'muted' },
      { text: '\tsrc/pages/EventBanner.tsx', tone: 'bad' },
    ],
    verdict:
      '저장은 됐고(ahead by 1 = GitHub보다 1커밋 앞섬) 아직 올리진 않았어요. 그런데 새 파일이 Untracked로 그대로 남았죠 — 커밋에서 빠졌다는 뜻이에요. 이 한 줄이 2부에서 다시 나옵니다.',
    order: '"EventBanner.tsx가 커밋에 빠졌어. 마저 담고 푸시해줘"',
  },
  {
    label: '③ 다 담아 푸시한 뒤',
    action: '빠진 파일까지 커밋해서 GitHub로 올렸어요',
    lines: [
      { text: 'On branch main' },
      { text: "Your branch is up to date with 'origin/main'.", tone: 'key' },
      { text: '' },
      { text: 'nothing to commit, working tree clean', tone: 'good' },
    ],
    verdict:
      '"clean = 저장 안 된 게 없다", "up to date = GitHub와 같다". 이 두 줄이 함께 보여야 끝난 거예요. 이제 배포와 다른 컴퓨터가 이 코드를 볼 수 있어요.',
  },
]

export type StatusPhrase = {
  /** status에 실제로 찍히는 문장 */
  phrase: string
  /** 화면에서 화살표 그림으로 그리는 방향 */
  direction: 'same' | 'ahead' | 'behind'
  read: string
  /** 읽고 나서 Claude에게 시킬 말 */
  order: string
}

/** G9. ahead/behind 번역표 — 문장 세 개만 읽으면 된다 */
export const STATUS_PHRASES: StatusPhrase[] = [
  {
    phrase: "Your branch is up to date with 'origin/main'.",
    direction: 'same',
    read: '이 컴퓨터와 GitHub가 같아요.',
    order: '시킬 일 없음 — 안심해도 돼요',
  },
  {
    phrase: "Your branch is ahead of 'origin/main' by 2 commits.",
    direction: 'ahead',
    read: '내가 2커밋 앞서요. GitHub에 아직 없는 작업이 이 컴퓨터에만 있어요.',
    order: '"푸시해줘"',
  },
  {
    phrase: "Your branch is behind 'origin/main' by 3 commits, and can be fast-forwarded.",
    direction: 'behind',
    read: 'GitHub가 3커밋 앞서요. 다른 컴퓨터에서 올린 작업을 아직 안 받았어요.',
    order: '"풀 받아줘"',
  },
]

export type LogLine = {
  hash: string
  /** 'HEAD -> main' 이나 'origin/main' — 괄호는 화면에서 그린다 */
  refs?: string
  message: string
  /** origin/main 위에 있는 줄 — 아직 GitHub에 없는 커밋 */
  unpushed?: boolean
}

/** G10. 미스터리의 아침, 노트북에서 git log --oneline -5 */
export const LOG_SAMPLE: LogLine[] = [
  { hash: 'f3a9c12', refs: 'HEAD -> main', message: 'fix: 이벤트 배너 링크 연결', unpushed: true },
  { hash: '8b21d7e', message: 'feat: 9월 이벤트 배너 추가', unpushed: true },
  { hash: 'c19e5b0', refs: 'origin/main', message: 'feat: 예약 확인 메일 발송' },
  { hash: 'a20f331', message: 'fix: 모바일에서 예약 버튼 겹침 수정' },
  { hash: '9d8e4c2', message: 'chore: 클래스 소개 문구 수정' },
]

/** G10. log에서 눈이 가야 할 3곳 */
export const LOG_READING = [
  {
    look: '(HEAD -> main)',
    read: '내가 지금 서 있는 곳이에요. 맨 윗줄에 붙어 있으니, 이 컴퓨터의 최신이에요.',
  },
  {
    look: '(origin/main)',
    read: 'GitHub가 아는 최신이에요. 세 번째 줄에 붙어 있죠 — GitHub는 여기까지만 알아요.',
  },
  {
    look: '두 표시 사이의 2줄',
    read: '어제의 배너 커밋 2개가 origin/main 위에 있어요. GitHub에 아직 안 갔다는 뜻이에요.',
  },
]

/** G11. git remote -v 출력 */
export const REMOTE_LINES = [
  'origin\thttps://github.com/bloomstudio/class-web.git (fetch)',
  'origin\thttps://github.com/bloomstudio/class-web.git (push)',
]

/** G11. remote 출력에서 확인할 것 */
export const REMOTE_CHECKS = [
  {
    look: 'bloomstudio/class-web',
    read: '주소 끝의 계정/레포 이름이 지금 만지려는 그 서비스인지부터 봐요. 서비스가 여럿이면 폴더도 여럿이라, 엉뚱한 폴더에서 시키는 사고가 가장 흔해요.',
  },
  {
    look: '(fetch) · (push)',
    read: '받아오는 주소와 보내는 주소예요. 거의 항상 같아서, 다를 때만 물어보면 돼요.',
  },
  {
    look: '출력이 비어 있다면',
    read: '이 폴더는 GitHub와 연결이 없다는 뜻 — 백업이 한 곳도 없는 상태예요. Claude에게 "GitHub 레포 만들어서 연결해줘"라고 시켜요.',
  },
]

export type BranchRow = {
  name: string
  hash: string
  message: string
  when: string
  role: string
  current?: boolean
}

/** G12~G13. 푸시는 됐지만 배포 브랜치가 아닌 feature/banner에 올라간 세 번째 미스터리 */
export const BRANCHES_PAGE: BranchRow[] = [
  {
    name: 'main',
    hash: 'c19e5b0',
    message: 'feat: 예약 확인 메일 발송',
    when: '3 days ago',
    role: '기본 · production 배포 브랜치',
  },
  {
    name: 'feature/banner',
    hash: 'f3a9c12',
    message: 'fix: 이벤트 배너 링크 연결',
    when: '10 minutes ago',
    role: 'main보다 2커밋 앞섬',
    current: true,
  },
]

export const BRANCH_RULES = [
  {
    head: '브랜치는 같은 레포 안의 별도 작업 줄기',
    read: '푸시는 “GitHub에 도착했다”는 뜻이지, main에 들어갔다는 뜻은 아니에요.',
  },
  {
    head: '배포는 보통 정해진 브랜치만 본다',
    read: 'production이 main만 본다면 feature/banner에 아무리 푸시해도 사이트는 그대로예요.',
  },
  {
    head: '합치는 문이 Pull request',
    read: '작업 브랜치를 검토하고 main으로 합쳐야 다음 배포가 시작돼요.',
  },
]

export type ComputerCard = {
  name: string
  sub: string
  lines: TermLine[]
  read: string
}

/**
 * G14. 두 컴퓨터 중 어디가 최신인가 — fetch 전/후 토글.
 * 핵심: status의 ahead/behind는 "마지막으로 소식 들은 시점" 기준이라,
 * fetch 전의 데스크톱은 "up to date"라고 낡은 정보를 말한다.
 */
export const TWO_COMPUTERS: { before: ComputerCard[]; after: ComputerCard[] } = {
  before: [
    {
      name: '노트북',
      sub: '어제 배너 작업을 한 컴퓨터',
      lines: [{ text: "Your branch is ahead of 'origin/main' by 2 commits.", tone: 'key' }],
      read: '안 올린 작업이 2커밋 있다 — 이 말은 그대로 믿어도 돼요.',
    },
    {
      name: '집 데스크톱',
      sub: '5일 만에 켠 컴퓨터',
      lines: [{ text: "Your branch is up to date with 'origin/main'.", tone: 'bad' }],
      read: '"최신"처럼 보이죠. 그런데 이 컴퓨터는 5일 동안 GitHub 소식을 못 들었어요.',
    },
  ],
  after: [
    {
      name: '노트북',
      sub: 'fetch 후에도 그대로',
      lines: [{ text: "Your branch is ahead of 'origin/main' by 2 commits.", tone: 'key' }],
      read: 'GitHub에 새 소식이 없었으니 그대로예요. 여전히 노트북이 최신.',
    },
    {
      name: '집 데스크톱',
      sub: 'fetch 하고 다시 status',
      lines: [
        {
          text: "Your branch is behind 'origin/main' by 3 commits, and can be fast-forwarded.",
          tone: 'key',
        },
      ],
      read: '사실은 3커밋 뒤처져 있었어요. fetch 전의 "up to date"는 낡은 정보였던 거예요.',
    },
  ],
}

export type DangerSign = {
  name: string
  when: string
  lines: string[]
  read: string
  /** 멈추고 Claude에게 시킬 말 */
  order: string
}

/** G15. 멈추고 읽어야 할 신호 3개 — 셋 다 "사라짐"이 아니라 "git이 안전하게 멈춤" */
export const DANGER_SIGNS: DangerSign[] = [
  {
    name: 'diverged',
    when: '두 컴퓨터에서 각자 작업한 뒤 만나면',
    lines: [
      "Your branch and 'origin/main' have diverged,",
      'and have 1 and 2 different commits each, respectively.',
    ],
    read: '내 컴퓨터와 GitHub가 서로 모르는 커밋을 따로 들고 있어요. 어느 쪽도 최신이 아니라서, 합치는 작업이 필요해요.',
    order: '"diverged 상태야. 뭘 할 건지 먼저 설명한 다음, 안전하게 합쳐줘"',
  },
  {
    name: 'CONFLICT',
    when: '합치다가 같은 줄이 부딪히면',
    lines: [
      'Auto-merging src/pages/home.tsx',
      'CONFLICT (content): Merge conflict in src/pages/home.tsx',
    ],
    read: '두 버전이 같은 파일의 같은 부분을 다르게 고쳤어요. 어느 쪽을 살릴지는 기계가 못 정해요 — 서비스 주인의 결정이 필요한 순간이에요.',
    order: '"충돌 났어. 두 버전이 어떻게 다른지 보여주고, 어느 쪽을 살릴지 나한테 물어봐 줘"',
  },
  {
    name: 'would be overwritten',
    when: '저장 안 한 수정이 있는 채로 받아오면',
    lines: [
      'error: Your local changes to the following files would be overwritten by merge:',
      '\tsrc/pages/home.tsx',
      'Please commit your changes or stash them before you merge.',
    ],
    read: '받아오면 내 수정이 덮여 사라질까 봐 git이 멈춰 준 거예요. 에러처럼 보이지만 사실은 보호예요.',
    order: '"커밋 안 된 수정이 있대. 먼저 커밋하고 나서 받아줘"',
  },
]

/** G17. 레포 첫 화면에서 볼 곳 4군데 */
export const REPO_HOME_SPOTS = [
  {
    spot: '파일 목록 맨 위 · 마지막 커밋',
    find: '커밋 메시지 + "2 hours ago" 같은 시각',
    read: 'GitHub가 아는 최신이 언제 것인지. 방금 푸시한 게 여기 보이면 도착한 거예요.',
  },
  {
    spot: '같은 줄 오른쪽 · 커밋 개수',
    find: '132 Commits',
    read: '이 서비스의 역사 전체예요. 누르면 commits 페이지 — 다음 화면에서 열어요.',
  },
  {
    spot: '커밋 메시지 옆 · ✓ 또는 ✗',
    find: '초록 체크 · 빨간 엑스',
    read: 'Actions 결과예요. 이 커밋이 검사와 배포를 통과했는지 — 잠시 뒤 정면으로 읽어요.',
  },
  {
    spot: '레포 이름 옆 · 공개 범위',
    find: 'Public 또는 Private 뱃지',
    read: '내 코드가 전 세계 공개인지, 나만 보는지. 곧 보안 화면에서 다시 봐요.',
  },
]

export type CommitRow = {
  message: string
  hash: string
  when: string
  check: 'pass' | 'fail'
}

/** G18. 미스터리의 아침, GitHub commits 페이지 — 어제의 배너 커밋이 없다 */
export const COMMITS_PAGE: CommitRow[] = [
  { message: 'feat: 예약 확인 메일 발송', hash: 'c19e5b0', when: '3 days ago', check: 'pass' },
  { message: 'fix: 모바일에서 예약 버튼 겹침 수정', hash: 'a20f331', when: '4 days ago', check: 'pass' },
  { message: 'chore: 클래스 소개 문구 수정', hash: '9d8e4c2', when: '6 days ago', check: 'pass' },
]

/** G18. commits 페이지 대조법 2가지 */
export const COMMITS_CHECKS = [
  {
    step: '맨 윗줄을 터미널과 대조',
    read: '내 log 맨 위는 f3a9c12인데 이 페이지 맨 위는 c19e5b0 — 어제 커밋이 GitHub에 없다는 확정 증거예요.',
  },
  {
    step: '시각 읽기',
    read: '맨 위가 "3 days ago". 어젯밤에 푸시됐다면 "12 hours ago"쯤이어야죠. 시각만으로도 판단이 서요.',
  },
]

export type DiffLine = {
  kind: 'context' | 'add' | 'remove'
  code: string
}

/** G19. 배너 커밋을 GitHub에서 열면 보이는 diff */
export const BANNER_DIFF: DiffLine[] = [
  { kind: 'context', code: ' export function HomePage() {' },
  { kind: 'context', code: '   return (' },
  { kind: 'context', code: '     <main>' },
  { kind: 'add', code: '+      <EventBanner' },
  { kind: 'add', code: '+        title="9월 원데이 클래스 오픈"' },
  { kind: 'add', code: '+        href="/events/september"' },
  { kind: 'add', code: '+      />' },
  { kind: 'context', code: '       <ClassList />' },
  { kind: 'context', code: '     </main>' },
]

/** G19. AI가 바꾼 커밋을 열어서 볼 것 3가지 */
export const DIFF_CHECKS = [
  {
    step: '① 파일 이름',
    read: '시킨 곳이 맞나요? 홈 화면을 고치라고 했는데 결제 파일이 바뀌어 있으면 그게 첫 질문이에요.',
  },
  {
    step: '② 초록 + 줄',
    read: '새로 들어온 코드예요. 다 이해 못 해도 "배너가 제목·링크와 함께 들어갔구나"까지는 읽혀요.',
  },
  {
    step: '③ 안 시킨 파일',
    read: '시키지 않은 파일이 여럿 바뀌어 있으면 Claude에게 물어요 — "이 파일은 왜 바꿨어?"',
  },
]

export const PR_STATES = [
  { name: 'Draft', read: '아직 작업 중 — 검토나 병합을 기다리지 않아요.' },
  { name: 'Open', read: '검토 대기 중 — GitHub에는 있지만 main에는 아직 없어요.', key: true },
  { name: 'Merged', read: '검토를 마치고 main에 합쳐졌어요. 이제 main 기준 배포가 시작될 수 있어요.' },
  { name: 'Closed', read: '합치지 않고 닫았어요. 변경은 main에 들어가지 않았어요.' },
]

export const PR_SPOTS = [
  { spot: 'Conversation', read: '왜 바꿨는지, 누가 무엇을 요청했는지 읽는 곳' },
  { spot: 'Commits', read: '이 PR에 들어 있는 저장 지점 전체' },
  { spot: 'Checks', read: '검사·빌드가 통과했는지. 초록이어도 아직 Merged는 아닐 수 있어요' },
  { spot: 'Files changed', read: '실제 바뀐 파일과 초록 + · 빨간 -를 검토하는 핵심 화면', key: true },
]

export type PrFileRow = {
  state: 'added' | 'modified'
  path: string
  read: string
  expected: boolean
}

/** G22. AI가 만든 PR — 배너 요청에 결제 파일까지 바뀐 상태 */
export const PR_FILES: PrFileRow[] = [
  { state: 'modified', path: 'src/pages/home.tsx', read: '홈 화면 연결', expected: true },
  { state: 'added', path: 'src/pages/EventBanner.tsx', read: '새 배너 컴포넌트', expected: true },
  { state: 'modified', path: 'src/lib/payments.ts', read: '결제 승인 로직', expected: false },
  { state: 'modified', path: 'package.json', read: '새 패키지 1개 추가', expected: false },
]

export const PR_REVIEW_CHECKS = [
  { head: '시킨 파일이 있나', read: 'home과 EventBanner — 요청한 작업이 실제 diff에 들어왔는지 봐요.' },
  { head: '안 시킨 파일이 있나', read: 'payments와 package.json — 이유를 듣기 전에는 합치지 않아요.' },
  { head: '위험한 영역인가', read: '결제·로그인·권한·환경설정은 코드가 짧아도 반드시 질문해요.' },
]

export type ActionStep = {
  name: string
  state: 'pass' | 'fail' | 'skip'
  duration: string
}

/** G24. 푸시했더니 이번엔 빨간 ✗ — Build에서 멈춰 Deploy는 돌지도 않았다 */
export const ACTIONS_STEPS: ActionStep[] = [
  { name: 'Set up job', state: 'pass', duration: '2s' },
  { name: 'Install dependencies', state: 'pass', duration: '41s' },
  { name: 'Build', state: 'fail', duration: '18s' },
  { name: 'Deploy', state: 'skip', duration: '—' },
]

/** G24. 실패한 Build step을 열면 보이는 로그 */
export const ACTIONS_LOG: TermLine[] = [
  { text: 'Run pnpm build', tone: 'muted' },
  { text: '> class-web@0.1.0 build', tone: 'muted' },
  { text: '> tsc -b && vite build', tone: 'muted' },
  { text: '' },
  { text: "src/pages/home.tsx:12:24 - error TS2307: Cannot find module './EventBanner'.", tone: 'bad' },
  { text: '' },
  { text: 'Error: Process completed with exit code 2.', tone: 'key' },
]

/** G24. 실패 로그를 읽는 3단계 */
export const ACTIONS_READING = [
  {
    step: '① 어느 단계에서 죽었나',
    read: '왼쪽 목록에서 빨간 ✗가 붙은 step 이름부터 봐요. Build에서 멈췄고, 그래서 Deploy는 돌지도 않았어요.',
  },
  {
    step: '② error 줄 찾기',
    read: '로그에서 error가 붙은 줄만 찾아요. 홈 화면이 EventBanner를 찾을 수 없대요 — 1부에서 본 그 Untracked 파일이 커밋에서 빠진 채 올라간 거예요.',
  },
  {
    step: '③ 원인 줄을 통째로 복사',
    read: '이해까지 할 필요 없어요. 빨간 줄을 복사해 Claude Code에 붙여넣고 "이 빌드 에러 고쳐서 다시 올려줘".',
  },
]

/** G25. 초록 Actions인데 production은 그대로인 사례 — 설정된 job에는 Deploy가 없다 */
export const GREEN_ACTIONS_STEPS: ActionStep[] = [
  { name: 'Install dependencies', state: 'pass', duration: '39s' },
  { name: 'Test', state: 'pass', duration: '24s' },
  { name: 'Build', state: 'pass', duration: '31s' },
]

export type DeploymentRow = {
  environment: 'Production' | 'Preview'
  hash: string
  message: string
  when: string
  state: 'success' | 'failure'
  current?: boolean
}

/** G26. 최신 커밋은 Preview에만 있고 Production은 3일 전 커밋인 상태 */
export const DEPLOYMENTS_PAGE: DeploymentRow[] = [
  {
    environment: 'Preview',
    hash: 'f3a9c12',
    message: 'fix: 이벤트 배너 링크 연결',
    when: '10 minutes ago',
    state: 'success',
    current: true,
  },
  {
    environment: 'Production',
    hash: 'c19e5b0',
    message: 'feat: 예약 확인 메일 발송',
    when: '3 days ago',
    state: 'success',
  },
]

export const DEPLOYMENT_STATES = [
  { name: 'Pending', tone: 'caution', read: '승인이나 실행 순서를 기다리는 중 — 아직 사이트가 바뀌지 않았어요.' },
  { name: 'Success', tone: 'positive', read: '그 환경에 배포 완료 — 커밋 해시와 실제 URL을 마지막으로 맞대요.' },
  { name: 'Failure', tone: 'critical', read: '배포 단계에서 실패 — View logs에서 첫 error 줄을 복사해요.' },
  { name: 'Canceled', tone: 'muted', read: '실행이 취소됨 — 더 최신 실행이 대신 성공했는지 확인해요.' },
] as const

export const ACTIVITY_EVENTS = [
  { icon: 'push', who: 'bloomstudio', action: 'pushed 2 commits to feature/banner', when: '12 minutes ago' },
  { icon: 'merge', who: 'bloomstudio', action: 'merged pull request #41 into main', when: '3 days ago' },
  { icon: 'force', who: 'claude-bot', action: 'force-pushed main from f3a9c12 to c19e5b0', when: '8 minutes ago', danger: true },
  { icon: 'delete', who: 'claude-bot', action: 'deleted branch feature/banner', when: '7 minutes ago' },
]

export const ROLLBACK_POINTS = [
  { hash: 'c19e5b0', label: '마지막 정상 production', state: 'good' },
  { hash: 'f3a9c12', label: '배너 배포 뒤 결제 오류 발생', state: 'bad' },
] as const

export type DiagnosisStep = {
  q: string
  where: string
  /** 통과 기준 — 이게 보이면 다음 단계로 */
  ok: string
  /** 아니라면 시킬 말 */
  fix: string
}

/** G29. "사이트에 반영이 안 돼요" 진단 6단계 — 오늘 수업 전체가 이 표 하나로 접힌다 */
export const DIAGNOSIS_STEPS: DiagnosisStep[] = [
  {
    q: '① 커밋이 됐나',
    where: '터미널 · git status',
    ok: 'clean — modified도 Untracked도 없다',
    fix: '"빠진 파일까지 전부 커밋해줘"',
  },
  {
    q: '② 푸시가 됐나',
    where: 'status의 ahead · GitHub commits 맨 윗줄',
    ok: 'up to date — GitHub 맨 윗줄이 내 최신과 같다',
    fix: '"푸시해줘"',
  },
  {
    q: '③ 올바른 브랜치인가',
    where: 'GitHub · Branches',
    ok: '최신 커밋이 main에 있다',
    fix: '작업 브랜치라면 PR로 main에 합치기',
  },
  {
    q: '④ PR이 합쳐졌나',
    where: 'GitHub · Pull requests',
    ok: '상태가 Merged다',
    fix: 'Files changed 검토 후 main에 병합',
  },
  {
    q: '⑤ 빌드·배포가 성공했나',
    where: 'Actions · Deployments',
    ok: '최신 main 커밋이 Production Success다',
    fix: '실패 로그 첫 error 줄을 복사해 고치기',
  },
  {
    q: '⑥ 그래도 안 보이면',
    where: '브라우저',
    ok: '강력 새로고침(Cmd+Shift+R) 후 보인다',
    fix: '캐시·배포 대기의 영역 — 2회차에 F12로 정면으로 다뤄요',
  },
]

export type QuizOption = {
  label: string
  correct?: boolean
  /** 고르면 보여주는 해설 — 오답에도 이유를 단다 */
  why: string
}

export type QuizItem = {
  situation: string
  /** 그 순간 화면에 떠 있는 출력 */
  output: string
  options: QuizOption[]
}

/** G30. 상황 판단 퀴즈 — 오늘 배운 판단 세 가지를 그대로 시험한다 */
export const QUIZ: QuizItem[] = [
  {
    situation: '카페에서 작업을 마치고 노트북을 덮으려는 참, 마지막으로 status를 읽었어요.',
    output: "Your branch is ahead of 'origin/main' by 3 commits.",
    options: [
      {
        label: '커밋은 됐으니 그냥 덮는다',
        why: '커밋은 이 컴퓨터에만 있는 저장이에요. 집 컴퓨터와 배포는 이 3커밋을 몰라요.',
      },
      {
        label: '"푸시해줘" 하고, up to date를 확인한 뒤 덮는다',
        correct: true,
        why: 'ahead = 아직 GitHub에 없는 작업. 올리고 끝내야 어디서든 이어서 일할 수 있어요.',
      },
      {
        label: '덮으면 커밋 3개가 사라지니 계속 켜 둔다',
        why: '커밋은 사라지지 않아요. 문제는 사라짐이 아니라 "다른 곳에서 안 보임"이에요.',
      },
    ],
  },
  {
    situation: '집 데스크톱을 5일 만에 켰어요. 바로 작업을 시작해도 될까요?',
    output: "Your branch is up to date with 'origin/main'.",
    options: [
      {
        label: '최신이라니 바로 시작한다',
        why: '이 문장은 마지막으로 GitHub 소식을 들은 시점 기준이에요. 5일간 소식을 안 들었다면 낡은 정보예요.',
      },
      {
        label: '"소식부터 받아와(fetch)" 시키고 다시 status를 읽는다',
        correct: true,
        why: 'fetch는 소식만 받아오고 코드는 안 건드려요. 받은 뒤에 보이는 behind가 진짜 상태예요.',
      },
      {
        label: '불안하니 GitHub에서 코드를 통째로 다시 내려받는다',
        why: '그럴 필요 없어요. fetch → status → 필요하면 pull. 이 순서면 충분해요.',
      },
    ],
  },
  {
    situation: '푸시 직후 GitHub를 열었더니, 방금 커밋 옆에 빨간 ✗가 떠 있어요.',
    output: '✗ feat: 후기 섹션 추가 · 3 minutes ago',
    options: [
      {
        label: '푸시는 됐으니 사이트에도 반영됐다',
        why: '푸시와 배포는 다른 단계예요. 빨간 ✗면 그다음 단계가 멈춘 것 — 사이트는 아직 옛날 코드예요.',
      },
      {
        label: 'GitHub 서버 오류니까 기다린다',
        why: '✗는 GitHub의 오류가 아니라, 내 커밋이 검사를 통과하지 못했다는 신호예요.',
      },
      {
        label: '실패한 step의 빨간 로그 줄을 복사해 Claude에게 넘긴다',
        correct: true,
        why: '원인 줄만 넘겨도 AI가 고칠 수 있어요. 고쳐서 다시 푸시되면 새 ✓가 떠요.',
      },
    ],
  },
]

/** G31. AI의 보고 → 계기판으로 확인하는 법 */
export const AI_REPORTS = [
  {
    claim: '"커밋했습니다"',
    verify: 'git status',
    look: 'modified·Untracked가 안 남았나 · log 맨 윗줄이 방금 그 작업인가',
  },
  {
    claim: '"푸시까지 완료했습니다"',
    verify: 'git status · commits 페이지',
    look: 'up to date인가 · GitHub 맨 윗줄 해시가 내 log 맨 윗줄과 같은가',
  },
  {
    claim: '"배포까지 됐습니다"',
    verify: 'Actions · 사이트',
    look: '최신 실행이 초록 ✓인가 · 시크릿 창에서 열어도 새 화면인가',
  },
]

/** G32. 자리에 앉으면 — 받고 시작 */
export const ROUTINE_START = [
  { step: '"GitHub 소식 받아와줘"', read: 'fetch — 코드는 안 건드리고 소식만 받아요. 언제든 안전해요.' },
  { step: 'status 읽기', read: 'behind가 보이면 "풀 받아줘"' },
  { step: 'up to date 확인 후 시작', read: '이 컴퓨터가 최신인 걸 확인하고 나서 작업을 시작해요' },
]

/** G32. 일어나기 전 — 올리고 끝 */
export const ROUTINE_END = [
  { step: 'status 읽기', read: 'clean인가 — modified·Untracked가 남지 않았나' },
  { step: 'ahead가 보이면 "푸시해줘"', read: '올릴 게 남은 채로 닫는 게 오늘 미스터리의 시작이었죠' },
  { step: 'up to date + clean 확인 후 닫기', read: '두 줄이 함께 보이면, 내일 어느 컴퓨터에서든 이어서 일할 수 있어요' },
]

/** G35. 최종 종합 미스터리 — 네 화면을 한 번에 대조한다 */
export const CAPSTONE_EVIDENCE = [
  { where: 'Branches', evidence: 'feature/banner f3a9c12 · main c19e5b0', read: '최신 작업은 main 밖에 있다' },
  { where: 'Pull request #42', evidence: 'Open · Checks passed', read: '검사는 통과했지만 아직 병합 전' },
  { where: 'Actions', evidence: 'Test ✓ · Build ✓', read: 'PR의 코드 검사는 성공' },
  { where: 'Deployments', evidence: 'Production c19e5b0 · 3 days ago', read: '운영 사이트는 옛 커밋 그대로' },
]
