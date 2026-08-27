import {
  Bot,
  Boxes,
  CircleAlert,
  CircleCheck,
  Coffee,
  FileCode2,
  FolderOpen,
  GitBranch,
  HardDrive,
  PackageCheck,
  Power,
  RefreshCw,
  Search,
  Settings2,
  Terminal,
  Wrench,
} from 'lucide-react'
import { useState } from 'react'
import {
  CheckRow,
  Chip,
  CompareGrid,
  CountdownTimer,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideBody,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideNote,
} from '../../../deck'

const GUARDRAILS = [
  { icon: Search, head: '먼저 찾기', detail: '무엇이 몇 개 깔렸고 어느 경로에서 실행되는지' },
  { icon: HardDrive, head: '먼저 보존', detail: '현재 프로젝트의 Git 상태와 GitHub 반영 여부' },
  { icon: Power, head: '재시작 예약', detail: '설치 중간이 아니라 검증 직전에 한 번만' },
]

/** W5. 설치 전에 멈춰서 볼 것 */
export function SetupGuardrailSlide() {
  return (
    <SlideLayout>
      <SlideKicker>설치의 첫 단계는 설치가 아닙니다</SlideKicker>
      <SlideHeadline>지우거나 덮기 전에 세 가지부터</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {GUARDRAILS.map((item, index) => (
          <Panel
            key={item.head}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-5',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <item.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-lead font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-caption text-content-secondary">{item.detail}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="lg" className="animate-rise-4 flex items-center gap-5">
        <CircleAlert className="size-8 shrink-0 text-caution md:size-10" />
        <p className="text-deck-body text-content-secondary">
          가장 흔한 설치 문제는 <span className="font-bold text-content-strong">없어서</span>가 아니라, 같은 도구가 두 경로에 있어서 생깁니다.
        </p>
      </Panel>
    </SlideLayout>
  )
}

/** W6. 오늘은 네이티브 Windows 하나 */
export function NativeWindowsSlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘의 가장 큰 결정</SlideKicker>
      <SlideHeadline>지금은 Windows 안에서만 일합니다</SlideHeadline>

      <CompareGrid>
        <Panel tone="accentSoft" pad="lg" className="animate-rise-1 flex flex-col gap-5">
          <div className="flex"><Chip tone="accent">오늘</Chip></div>
          <p className="text-deck-lead font-bold text-content-strong">Native Windows</p>
          <ul className="flex flex-col gap-4 text-deck-body text-content-secondary">
            <li>한 파일 시스템 · 한 PATH</li>
            <li>PowerShell + Git Bash</li>
            <li>VS Code와 Claude를 바로 연결</li>
          </ul>
        </Panel>

        <Panel tone="sunken" pad="lg" className="animate-rise-2 flex flex-col gap-5">
          <div className="flex"><Chip>필요가 생기면</Chip></div>
          <p className="text-deck-lead font-bold text-content-strong">WSL2 · Docker</p>
          <ul className="flex flex-col gap-4 text-deck-body text-content-secondary">
            <li>Linux 전용 도구가 확인될 때</li>
            <li>컨테이너·로컬 DB가 필요할 때</li>
            <li>별도 회차에서 경계를 배우고 추가</li>
          </ul>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        두 환경을 동시에 만들지 않습니다 · <Mark>프로젝트가 요구하면 그때 한 번에 이동</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const BOOTSTRAP = [
  { icon: FileCode2, step: '1', name: 'VS Code User Setup', detail: '파일·터미널·Claude를 한 창에서' },
  { icon: Bot, step: '2', name: 'Claude Code', detail: '공식 설치 · 로그인 · 첫 실행' },
]

/** W7. 사람이 설치할 것은 딱 두 개 */
export function BootstrapSlide() {
  return (
    <SlideLayout>
      <SlideKicker>다른 PC에서도 사람이 직접 하는 전부</SlideKicker>
      <SlideHeadline>딱 두 개만 설치합니다</SlideHeadline>

      <ol className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {BOOTSTRAP.map((item, index) => (
          <Panel
            key={item.name}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-5',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="grid size-10 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-14">
                {item.step}
              </span>
              <item.icon className="size-8 text-accent md:size-10" />
            </div>
            <p className="text-deck-lead font-bold text-content-strong">{item.name}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.detail}</p>
          </Panel>
        ))}
      </ol>

      <SlideNote tone="quiet">
        Git · Node.js · Python은 아직 설치하지 않습니다 · <Mark>다음 화면의 프롬프트가 맡습니다</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const VSCODE_ZONES = [
  { number: '①', name: '탐색기', detail: '내가 연 프로젝트 폴더와 파일' },
  { number: '②', name: '편집기', detail: '코드와 Claude의 변경 비교' },
  { number: '③', name: '터미널', detail: '실행 명령과 오류 원문' },
  { number: '④', name: '소스 제어', detail: '바뀐 파일과 Git 상태' },
]

/** W12. VS Code에서 보는 네 구역 */
export function VscodeMapSlide() {
  return (
    <SlideLayout>
      <SlideKicker>창을 많이 열지 않는 이유</SlideKicker>
      <SlideHeadline>VS Code 한 창에 네 구역만 기억해요</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {VSCODE_ZONES.map((zone, index) => (
          <Panel
            key={zone.name}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx(
              'flex items-center gap-5',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <span className="text-deck-title font-bold text-accent">{zone.number}</span>
            <div className="flex min-w-0 flex-col gap-2">
              <p className="text-deck-body font-bold text-content-strong">{zone.name}</p>
              <p className="text-deck-caption text-content-secondary">{zone.detail}</p>
            </div>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        Claude에게 묻기 전 확인 · <Mark>왼쪽 위 폴더 이름이 지금 고칠 서비스인가?</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const TERMINAL_TERMS = [
  { icon: Terminal, name: '터미널', metaphor: '전화기', detail: '글자로 명령하고 답을 보는 창' },
  { icon: Settings2, name: '셸', metaphor: '통역사', detail: 'PowerShell인지 Git Bash인지' },
  { icon: FolderOpen, name: '현재 폴더', metaphor: '책상', detail: '어느 프로젝트 위에서 일하는지' },
]

/** W13. 터미널·셸·폴더 구분 */
export function TerminalModelSlide() {
  return (
    <SlideLayout>
      <SlideKicker>겉으로는 검은 창 하나지만</SlideKicker>
      <SlideHeadline>전화기 · 통역사 · 책상은 서로 달라요</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {TERMINAL_TERMS.map((term, index) => (
          <Panel
            key={term.name}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <term.icon className="size-8 text-accent md:size-10" />
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-deck-lead font-bold text-content-strong">{term.name}</p>
              <p className="text-deck-caption font-semibold text-content-muted">{term.metaphor}</p>
            </div>
            <p className="text-deck-caption text-content-secondary">{term.detail}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="inverse" pad="md" className="animate-rise-4 overflow-x-auto font-mono text-deck-body whitespace-pre text-content-inverse">
        PS C:\dev\my-service&gt; git status
      </Panel>

      <SlideBody>프롬프트 왼쪽의 경로가 다른 서비스면, 명령이 맞아도 결과는 틀립니다.</SlideBody>
    </SlideLayout>
  )
}

const PATH_STEPS = [
  { command: 'where.exe node', meaning: '실제로 실행되는 파일 위치 확인' },
  { command: '터미널·VS Code 다시 열기', meaning: '새 PATH를 앱이 다시 읽게 하기' },
  { command: 'node --version', meaning: '이름이 버전으로 답하는지 확인' },
]

/** W11. 설치했는데 못 찾는 이유 · PATH */
export function PathSlide() {
  return (
    <SlideLayout>
      <SlideKicker>“설치했는데 명령을 찾을 수 없습니다”</SlideKicker>
      <SlideHeadline>PATH는 프로그램 주소록입니다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="lg" className="animate-rise-1 flex flex-col justify-center gap-4 lg:col-span-4">
          <PanelLabel>Windows의 질문</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">“node라는 파일이 어디 있지?”</p>
          <p className="text-deck-body text-content-secondary">PATH에 적힌 폴더를 위에서부터 찾습니다.</p>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-5">
          <PanelLabel tone="accent">재설치 전 세 순서</PanelLabel>
          {PATH_STEPS.map((step, index) => (
            <div key={step.command} className="flex items-start gap-4 rounded-card bg-surface-sunken p-4 md:p-5">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-10">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="font-mono text-deck-caption font-bold text-content-strong">{step.command}</p>
                <p className="text-deck-caption text-content-secondary">{step.meaning}</p>
              </div>
            </div>
          ))}
        </Panel>
      </div>

      <SlideNote tone="quiet">
        `where.exe`가 두 줄 이상이면 <Mark>중복 설치부터 의심</Mark>합니다
      </SlideNote>
    </SlideLayout>
  )
}

const CORE_TOOLS = [
  'Windows Terminal · PowerShell 7',
  'Git for Windows · GitHub CLI',
  'Node.js LTS · 프로젝트 패키지 관리자',
  'uv · 프로젝트용 Python',
  'Claude Code · VS Code 확장',
  '원격 수업용 Windows 빠른 지원',
]

const LATER_TOOLS = ['WSL2', 'Docker Desktop', '로컬 데이터베이스', 'C/C++ Build Tools', '클라우드·모바일 SDK']

/** W9. Claude가 설치할 것과 미룰 것 */
export function ToolScopeSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>이 목록부터 Claude가 알아서 설치합니다</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-5">
          <PanelLabel tone="accent">프롬프트가 자동 설치</PanelLabel>
          <ul className="flex flex-col gap-4">
            {CORE_TOOLS.map((tool) => (
              <li key={tool} className="flex items-center gap-4 text-deck-body font-semibold text-content-strong">
                <CircleCheck className="size-6 shrink-0 text-positive md:size-8" />
                {tool}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel tone="sunken" pad="lg" className="animate-rise-2 flex flex-col gap-5">
          <PanelLabel>오늘은 자동 설치하지 않음</PanelLabel>
          <ul className="flex flex-col gap-4">
            {LATER_TOOLS.map((tool) => (
              <li key={tool} className="flex items-center gap-4 text-deck-body text-content-secondary">
                <Wrench className="size-6 shrink-0 text-content-muted md:size-8" />
                {tool}
              </li>
            ))}
          </ul>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        설치 수가 적을수록 좋은 게 아니라 · <Mark>설치 이유를 설명할 수 있을수록 좋습니다</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const INSTALLS = [
  { head: 'Git for Windows', hint: 'Claude가 설치하고 `git --version` 확인' },
  { head: 'Windows Terminal · PowerShell 7', hint: 'Claude가 설치하고 새 터미널 예약' },
  { head: 'GitHub CLI', hint: '설치는 자동 · 브라우저 로그인만 교수님이 승인' },
  { head: 'Node.js LTS · npm/pnpm/Yarn', hint: 'lockfile을 보고 필요한 패키지 관리자까지 준비' },
  { head: 'uv · Python 3', hint: 'Python 버전과 가상환경 준비' },
  { head: 'VS Code 확장 · 빠른 지원', hint: '개발 기본 확장과 원격 수업 앱까지 확인' },
  { head: 'C:\\dev · Git 기본 설정', hint: '작업 폴더와 main 브랜치 기준' },
  { head: '전체 검증 · SETUP-REPORT', hint: '버전·경로·남은 문제를 Claude가 기록' },
]

/** W10. Claude 자동 설치 대시보드 */
export function InstallDashboardSlide() {
  const [checks, setChecks] = useState(() => INSTALLS.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))
  const done = checks.filter(Boolean).length

  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>프롬프트를 붙여 넣은 뒤 · 약 30분</SlideKicker>
          <SlideHeadline>Claude 자동 설치 대시보드</SlideHeadline>
        </div>
        <div className="flex items-center gap-3 rounded-panel bg-accent px-5 py-3 text-accent-contrast shadow-lifted md:px-8 md:py-5">
          <PackageCheck className="size-7 md:size-9" />
          <span className="text-deck-body font-bold">{done} / {INSTALLS.length}</span>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {INSTALLS.map((item, index) => (
          <CheckRow key={item.head} checked={checks[index]} onToggle={() => toggle(index)} hint={item.hint}>
            {item.head}
          </CheckRow>
        ))}
      </div>

      <SlideBody>체크는 설치 창이 닫혔을 때가 아니라 새 터미널에서 버전이 답했을 때 합니다.</SlideBody>
    </SlideLayout>
  )
}

/** W14. 휴식 5분 */
export function BreakSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col items-center gap-6 text-center md:gap-10">
        <Coffee className="animate-rise-1 size-16 text-accent md:size-24" />
        <SlideHeadline>5분 쉬고, 전부 다시 엽니다</SlideHeadline>
        <CountdownTimer seconds={300} caption="남은 휴식" size="lg" />
        <Panel tone="sunken" pad="md" className="animate-rise-3 flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <RefreshCw className="size-7 text-content-muted md:size-9" />
          <p className="text-deck-body text-content-secondary">VS Code · Terminal 종료 → Windows 재시작이 필요하면 지금 → 새 창</p>
        </Panel>
      </div>
    </SlideLayout>
  )
}
