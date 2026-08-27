import {
  Bot,
  CircleCheck,
  CircleX,
  ClipboardCheck,
  Cloud,
  Code2,
  Eye,
  FileKey,
  Folder,
  GitBranch,
  KeyRound,
  Laptop,
  LockKeyhole,
  MonitorCheck,
  PhoneCall,
  Play,
  RotateCcw,
  ScanSearch,
  ShieldCheck,
  Terminal,
  UserCheck,
  Wifi,
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
import { PromptCopyButton } from '../../shared'
import setupPrompt from '../model/windows-setup-prompt.md?raw'

const ACCOUNTS = [
  {
    icon: UserCheck,
    name: 'Git 이름',
    command: 'git config',
    detail: '커밋에 “누가 기록했나” 남기는 서명',
  },
  {
    icon: Cloud,
    name: 'GitHub 로그인',
    command: 'gh auth login',
    detail: '내 저장소를 읽고 올릴 수 있는 권한',
  },
  {
    icon: Bot,
    name: 'Claude 로그인',
    command: '/login',
    detail: 'Claude 구독·사용량과 연결된 별도 계정',
  },
]

/** W15. 이름과 로그인은 서로 다르다 */
export function AccountLayersSlide() {
  return (
    <SlideLayout>
      <SlideKicker>“로그인했는데 push가 안 돼요”를 막는 구분</SlideKicker>
      <SlideHeadline>이름 하나, 로그인 둘</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {ACCOUNTS.map((account, index) => (
          <Panel
            key={account.name}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <account.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-lead font-bold text-content-strong">{account.name}</p>
            <div className="overflow-x-auto rounded-card bg-surface-sunken p-3 font-mono text-deck-caption whitespace-pre text-content-secondary md:p-4">
              {account.command}
            </div>
            <p className="mt-auto text-deck-caption text-content-secondary">{account.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        비밀번호·토큰은 강사나 Claude에게 전달하지 않고 <Mark>브라우저에서 본인이 직접</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const FOLDER_RULES = [
  { good: true, title: 'C:\\dev\\service-name', detail: '짧고 일정한 경로 · 프로젝트마다 폴더 하나' },
  { good: false, title: '바탕 화면 · 다운로드', detail: '임시 파일과 압축 사본이 섞이기 쉬움' },
  { good: false, title: 'OneDrive 동기화 폴더', detail: 'node_modules·Git 파일의 잠금과 동기화 충돌 가능' },
  { good: false, title: 'service-final-final2', detail: 'ZIP 사본 대신 GitHub에서 clone' },
]

/** W16. 프로젝트는 C:\dev 아래에 */
export function FolderRuleSlide() {
  return (
    <SlideLayout>
      <SlideKicker>에러를 줄이는 가장 싼 설정</SlideKicker>
      <SlideHeadline>작업 원본은 한곳에만 둡니다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {FOLDER_RULES.map((rule, index) => (
          <Panel
            key={rule.title}
            tone={rule.good ? 'accentSoft' : 'sunken'}
            pad="md"
            className={cx(
              'flex items-center gap-5',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            {rule.good ? (
              <CircleCheck className="size-8 shrink-0 text-positive md:size-10" />
            ) : (
              <CircleX className="size-8 shrink-0 text-content-muted md:size-10" />
            )}
            <div className="min-w-0">
              <p className="font-mono text-deck-body font-bold text-content-strong">{rule.title}</p>
              <p className="text-deck-caption text-content-secondary">{rule.detail}</p>
            </div>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        코드 원본은 <Mark>GitHub</Mark> · 내 PC의 `C:\dev`는 일하는 사본
      </SlideNote>
    </SlideLayout>
  )
}

const SECRET_RULES = [
  { icon: Eye, head: '값은 직접 입력', detail: '비밀번호·토큰·복구 코드를 채팅에 붙이지 않기' },
  { icon: FileKey, head: '.env는 로컬에', detail: '.gitignore를 확인하고 예시는 .env.example로' },
  { icon: RotateCcw, head: '노출되면 교체', detail: '파일 삭제만으로 끝내지 말고 키를 즉시 폐기·재발급' },
]

/** W17. 비밀 정보의 경계 */
export function SecretBoundarySlide() {
  return (
    <SlideLayout>
      <SlideKicker>원격 지원 전에 합의할 한계</SlideKicker>
      <SlideHeadline>Claude도 강사도 비밀 값은 받지 않습니다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {SECRET_RULES.map((rule, index) => (
          <Panel
            key={rule.head}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-5',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <rule.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-lead font-bold text-content-strong">{rule.head}</p>
            <p className="text-deck-caption text-content-secondary">{rule.detail}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="inverse" pad="md" className="animate-rise-4 flex items-center gap-5">
        <LockKeyhole className="size-8 shrink-0 text-content-inverse md:size-10" />
        <p className="text-deck-body text-content-inverse">
          자동 승인 금지 · 전체 삭제 · 강제 push · DB 초기화 · 운영 배포 · 비밀 키 변경
        </p>
      </Panel>
    </SlideLayout>
  )
}

const SMOKE_STEPS = [
  { label: '열기', detail: '올바른 프로젝트 루트 · `code .`' },
  { label: '읽기', detail: 'README · lockfile · 요구 버전' },
  { label: '설치', detail: '프로젝트가 정한 패키지 관리자' },
  { label: '실행', detail: '공식 script · localhost 확인' },
  { label: '검수', detail: 'test/build · `git status`' },
]

/** W18. 실제 서비스 스모크 테스트 */
export function SmokeTestSlide() {
  const [active, setActive] = useState(0)

  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 · 20분</SlideKicker>
          <SlideHeadline>실제 서비스 하나를 처음부터 띄웁니다</SlideHeadline>
        </div>
        <CountdownTimer seconds={1200} caption="남은 시간" size="md" />
      </div>

      <ol className="grid gap-3 lg:grid-cols-5">
        {SMOKE_STEPS.map((step, index) => (
          <li key={step.label}>
            <button type="button" onClick={() => setActive(index)} className="h-full w-full text-left">
              <Panel
                tone={index === active ? 'accent' : index < active ? 'accentSoft' : 'raised'}
                pad="md"
                className="flex h-full flex-col gap-4 transition duration-200 ease-deck"
              >
                <span
                  className={cx(
                    'grid size-9 place-items-center rounded-full text-deck-caption font-bold md:size-12',
                    index === active
                      ? 'bg-accent-contrast/15 text-accent-contrast'
                      : 'bg-surface-sunken text-content-secondary',
                  )}
                >
                  {index + 1}
                </span>
                <p className={cx('text-deck-body font-bold', index === active ? 'text-accent-contrast' : 'text-content-strong')}>
                  {step.label}
                </p>
                <p className={cx('mt-auto text-deck-caption', index === active ? 'text-accent-contrast/80' : 'text-content-secondary')}>
                  {step.detail}
                </p>
              </Panel>
            </button>
          </li>
        ))}
      </ol>

      <SlideNote tone="quiet">
        실행 뒤 뜻밖의 변경이 생기지 않았는지 <Mark>마지막 `git status`까지가 실습</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const FIRST_REQUEST = `이 프로젝트를 아직 수정하지 마세요.
구조, 실행 방법, 요구 런타임, Git 상태를 먼저 확인하고
작업 계획과 검증 방법만 한국어로 설명해 주세요.`

/** W19. Claude Code 첫 실행 원칙 */
export function ClaudeFirstRunSlide() {
  return (
    <SlideLayout>
      <SlideKicker>새 프로젝트에서 첫 문장</SlideKicker>
      <SlideHeadline>수정 전에 먼저 브리핑을 받습니다</SlideHeadline>

      <div className="grid gap-5 lg:grid-cols-9">
        <Panel tone="inverse" pad="lg" className="animate-rise-1 overflow-x-auto lg:col-span-6">
          <pre className="font-sans text-deck-body whitespace-pre-wrap text-content-inverse">{FIRST_REQUEST}</pre>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-5 lg:col-span-3">
          <PanelLabel tone="accent">처음엔 이 모드</PanelLabel>
          <div className="flex"><Chip tone="accent">Plan 또는 Manual</Chip></div>
          <p className="text-deck-body text-content-secondary">계획을 보고, 바뀔 파일을 알고, 승인한 뒤 실행</p>
        </Panel>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {['현재 폴더가 맞다', 'Git 상태가 깨끗하다', '검증 명령이 있다'].map((item, index) => (
          <Panel key={item} tone="sunken" pad="sm" className={cx('flex items-center gap-4', `animate-rise-${index + 2}`)}>
            <CircleCheck className="size-6 shrink-0 text-positive md:size-8" />
            <p className="text-deck-caption font-semibold text-content-secondary">{item}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        권한 확인을 끄는 대신 · 반복 작업이 생길 때 <Mark>허용 범위를 좁혀서</Mark> 늘립니다
      </SlideNote>
    </SlideLayout>
  )
}

/** W8. Claude Code에 붙여 넣을 자동 세팅 프롬프트 */
export function PromptHandoffSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>두 개를 설치한 다음 바로 할 일</SlideKicker>
          <SlideHeadline>이 프롬프트 하나를 Claude에게 줍니다</SlideHeadline>
          <SlideBody>
            Claude가 현재 상태를 확인하고, 빠진 개발 도구를 직접 설치한 뒤 버전과 경로까지 검증합니다.
            교수님은 UAC·브라우저 로그인·재시작이 필요할 때만 응답합니다.
          </SlideBody>

          <div className="grid gap-3 md:grid-cols-2">
            {[
              ['1', '현재 환경 자동 확인'],
              ['2', '누락 도구 자동 설치'],
              ['3', '버전·경로 자동 검증'],
              ['4', 'SETUP-REPORT 남기기'],
            ].map(([number, label]) => (
              <Panel key={number} tone="sunken" pad="sm" className="flex items-center gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-10">
                  {number}
                </span>
                <p className="text-deck-caption font-semibold text-content-secondary">{label}</p>
              </Panel>
            ))}
          </div>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-6 lg:col-span-4">
          <ClipboardCheck className="size-10 text-accent md:size-14" />
          <PanelLabel tone="accent">Windows 개발 환경 담당자</PanelLabel>
          <p className="text-deck-body text-content-secondary">설치·경로·계정·실행·보고서까지 한 번에 이어지는 전체 프롬프트</p>
          <PromptCopyButton size="md" label="환경 세팅 프롬프트 복사" text={setupPrompt} />
        </Panel>
      </div>

      <SlideNote tone="quiet">
        다른 Windows PC에서도 순서는 같습니다 · <Mark>VS Code → Claude Code → 프롬프트 붙여넣기</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const VERIFY_ITEMS = [
  { head: 'VS Code', hint: '`code --version` · 올바른 프로젝트 폴더' },
  { head: 'Git', hint: '`git --version` · 이름/이메일 · clean status' },
  { head: 'GitHub', hint: '`gh auth status` · 브라우저 로그인' },
  { head: 'Node · npm', hint: '프로젝트 요구 버전과 일치' },
  { head: 'Python · uv', hint: '프로젝트 가상환경에서 실행' },
  { head: 'Claude Code', hint: '`claude --version` · `claude doctor`' },
  { head: '서비스 실행', hint: 'localhost · 터미널 치명 오류 없음' },
  { head: '검증 명령', hint: 'test/build 중 있는 것 실행' },
  { head: '재시작 뒤 재검증', hint: '새 터미널에서도 같은 버전' },
  { head: 'SETUP-REPORT', hint: '버전·경로·실행 명령 · 비밀 값 없음' },
]

/** W20. 최종 검수표 */
export function VerificationSlide() {
  const [checks, setChecks] = useState(() => VERIFY_ITEMS.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))
  const done = checks.filter(Boolean).length

  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-3">
          <SlideKicker>설치 완료가 아니라 인수 테스트</SlideKicker>
          <SlideHeadline>최종 검수표</SlideHeadline>
        </div>
        <Chip tone={done === VERIFY_ITEMS.length ? 'accent' : 'quiet'}>{done} / {VERIFY_ITEMS.length} 통과</Chip>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {VERIFY_ITEMS.map((item, index) => (
          <CheckRow key={item.head} checked={checks[index]} onToggle={() => toggle(index)} hint={item.hint}>
            {item.head}
          </CheckRow>
        ))}
      </div>

      <SlideBody>오늘 해결 못 한 항목은 실패가 아니라 다음 접속 때 바로 시작할 정확한 위치입니다.</SlideBody>
    </SlideLayout>
  )
}

const ERROR_LOOP = [
  { icon: Eye, word: '원문', detail: '잘린 한 줄 말고 처음부터 끝까지' },
  { icon: ScanSearch, word: '위치', detail: '폴더 · 명령 · 셸 · 어느 단계' },
  { icon: KeyRound, word: '한 원인', detail: '가능성 표에서 첫 번째만 확인' },
  { icon: MonitorCheck, word: '재검증', detail: '같은 명령 + test + git status' },
]

/** W21. 에러가 났을 때의 네 박자 */
export function ErrorLoopSlide() {
  return (
    <SlideLayout>
      <SlideKicker>재설치 버튼을 누르기 전</SlideKicker>
      <SlideHeadline>원문 → 위치 → 한 원인 → 재검증</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {ERROR_LOOP.map((step, index) => (
          <Panel
            key={step.word}
            tone={index === 3 ? 'accent' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-5',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <step.icon className={cx('size-8 md:size-10', index === 3 ? 'text-accent-contrast' : 'text-accent')} />
            <p className={cx('text-deck-lead font-bold', index === 3 ? 'text-accent-contrast' : 'text-content-strong')}>
              {step.word}
            </p>
            <p className={cx('text-deck-caption', index === 3 ? 'text-accent-contrast/80' : 'text-content-secondary')}>
              {step.detail}
            </p>
          </Panel>
        ))}
      </div>

      <Panel tone="inverse" pad="md" className="animate-rise-5 overflow-x-auto">
        <p className="font-mono text-deck-caption whitespace-pre-wrap text-content-inverse">
          지금은 수정하지 말고 진단만 해주세요. 현재 폴더·Git 상태·요구 버전·전체 오류를 보고 가장 가능성 높은 원인 하나를 확인할 읽기 전용 명령부터 제안하세요.
        </p>
      </Panel>
    </SlideLayout>
  )
}

/** W22. 원격으로 만나는 두 가지 방법 */
export function RemoteSupportSlide() {
  return (
    <SlideLayout>
      <SlideKicker>‘원격’이라는 말이 가리키는 두 일</SlideKicker>
      <SlideHeadline>사람이 도울 때와 Claude를 이어갈 때</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <PhoneCall className="size-9 text-accent md:size-12" />
            <Chip>강사 ↔ 교수님</Chip>
          </div>
          <p className="text-deck-lead font-bold text-content-strong">Windows 빠른 지원</p>
          <ul className="flex flex-col gap-4 text-deck-body text-content-secondary">
            <li>교수님이 먼저 앱을 연다</li>
            <li>매번 6자리 코드와 화면 공유 승인</li>
            <li>제어 요청도 별도로 승인 · 끝나면 종료</li>
          </ul>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-2 flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <Wifi className="size-9 text-accent md:size-12" />
            <Chip tone="accent">교수님 ↔ Claude</Chip>
          </div>
          <p className="text-deck-lead font-bold text-content-strong">Claude Remote Control</p>
          <ul className="flex flex-col gap-4 text-deck-body text-content-secondary">
            <li>PC에서 세션은 계속 로컬 실행</li>
            <li>웹·휴대폰에서 같은 세션을 이어봄</li>
            <li>PC가 켜져 있고 세션이 살아 있어야 함</li>
          </ul>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        상시 접속 암호·포트 개방은 만들지 않습니다 · <Mark>항상 본인이 시작하고 승인</Mark>
      </SlideNote>
    </SlideLayout>
  )
}
