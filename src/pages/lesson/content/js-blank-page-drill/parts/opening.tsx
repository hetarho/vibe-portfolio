import { AlertTriangle, ArrowRight, Brain, ClipboardList, ExternalLink, Hand, Keyboard, MonitorCheck, Play } from 'lucide-react'
import { Chip, CompareGrid, cx, Mark, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote } from '../../../deck'
import { DRILL_HOME, drillOf, PERIODS, SHELLS, STEPS } from '../model/drill'
import { DrillCode } from '../ui/DrillCode'

/** 시작 · 오늘 지도 */
export function AgendaSlide() {
  return (
    <SlideLayout>
      <SlideKicker>JavaScript · 백지 공포증 깨기</SlideKicker>
      <SlideHeadline size="hero">
        빈 화면 앞에서 <Mark>손이 먼저</Mark> 움직이게
      </SlideHeadline>
      <SlideLead>같은 문제를 다섯 번, 힌트를 하나씩 지우며 칩니다.</SlideLead>

      <div className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        {PERIODS.map((period, index) => (
          <Panel key={period.no} tone="raised" pad="sm" className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}>
            <PanelLabel tone={index === 0 ? 'accent' : 'muted'}>{period.no}교시</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">{period.title}</p>
            <div className="mt-auto flex flex-wrap gap-2">
              {period.problems.length > 0 ? (
                period.problems.map((id) => <Chip key={id}>{drillOf(id).title}</Chip>)
              ) : (
                <Chip>장바구니</Chip>
              )}
            </div>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        한 시간만 해도 끝맺음이 됩니다 · 시간이 남으면 <Mark>다음 교시</Mark>로 이어 갑니다
      </SlideNote>
    </SlideLayout>
  )
}

/** ⭐ 왜 하얘지나 · 두 일을 한꺼번에 하려다 멈춘다 */
export function WhyFreezeSlide() {
  return (
    <SlideLayout>
      <SlideKicker>먼저 짚을 것 · 왜 머리가 하얘지나</SlideKicker>
      <SlideHeadline>
        머리가 나빠서가 아닙니다. <Mark>두 가지 일</Mark>을 한꺼번에 하고 있어서입니다
      </SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="md" className="animate-rise-1 flex flex-col gap-3 lg:col-span-4">
          <div className="flex items-center gap-3">
            <Brain className="size-7 shrink-0 text-content-muted md:size-8" />
            <PanelLabel>일 1 · 문제 쪼개기</PanelLabel>
          </div>
          <p className="text-deck-body font-semibold text-content-strong">무엇을 꺼내서, 언제 갈라서, 무엇을 보여 줄까</p>
          <p className="text-deck-caption text-content-secondary">한국어로 생각하는 일입니다</p>
        </Panel>
        <div className="flex items-center justify-center lg:col-span-1">
          <AlertTriangle className="size-9 text-critical md:size-11" />
        </div>
        <Panel tone="sunken" pad="md" className="animate-rise-2 flex flex-col gap-3 lg:col-span-4">
          <div className="flex items-center gap-3">
            <Hand className="size-7 shrink-0 text-content-muted md:size-8" />
            <PanelLabel>일 2 · 문법 떠올리기</PanelLabel>
          </div>
          <p className="text-deck-body font-semibold text-content-strong">괄호가 어디서 열리고 닫히더라, 따옴표는 어디에</p>
          <p className="text-deck-caption text-content-secondary">손이 기억해야 하는 일입니다</p>
        </Panel>
      </div>

      <CompareGrid>
        <Panel tone="raised" pad="md" className="animate-rise-3 flex flex-col gap-2">
          <PanelLabel tone="accent">문법은 손에게</PanelLabel>
          <p className="text-deck-body text-content-primary">껍데기를 안 보고 다섯 번 칩니다. 손이 치는 동안 머리는 쉽니다.</p>
        </Panel>
        <Panel tone="raised" pad="md" className="animate-rise-4 flex flex-col gap-2">
          <PanelLabel tone="accent">쪼개기는 한국어로</PanelLabel>
          <p className="text-deck-body text-content-primary">코드 대신 주석부터 씁니다. 한국어로 말할 수 있으면 반은 끝난 것입니다.</p>
        </Panel>
      </CompareGrid>
    </SlideLayout>
  )
}

/** ⭐ 다섯 Step · 힌트를 한 겹씩 지운다 */
export function StepLadderSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>오늘의 방법 · 같은 문제를 다섯 번</SlideKicker>
      <SlideHeadline>
        힌트를 <Mark>한 겹씩</Mark> 지웁니다
      </SlideHeadline>

      <div className="flex flex-col gap-3">
        {STEPS.map((step, index) => (
          <Panel
            key={step.no}
            tone={step.no === 5 ? 'accentSoft' : 'raised'}
            pad="sm"
            className={cx('grid items-center gap-2 md:grid-cols-9 md:gap-5', `animate-rise-${Math.min(index + 1, 5)}`)}
          >
            <div className="flex items-center gap-3 md:col-span-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-strong inset-shadow-sunken md:size-10">
                {step.no}
              </span>
              <p className="text-deck-body font-bold text-content-strong">{step.name}</p>
            </div>
            <p className="text-deck-caption text-content-secondary md:col-span-3">{step.given}</p>
            <div className="flex md:col-span-3 md:justify-end">
              <Chip tone={step.no === 5 ? 'accent' : 'quiet'}>{step.hand}</Chip>
            </div>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        막히면 한 Step 내려갔다가 다시 올라옵니다 · 내려가는 것은 <Mark>실패가 아니라 순서</Mark>입니다
      </SlideNote>
    </SlideLayout>
  )
}

/** 껍데기 네 개 · 타자 연습장 패턴 A~D */
export function ShellsSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>손에 붙일 것 · 타자 연습장 00-blank.html</SlideKicker>
      <SlideHeadline>
        속은 비워 두고 <Mark>껍데기만</Mark> 다섯 번씩
      </SlideHeadline>

      <div className="grid items-start gap-3 md:gap-4 lg:grid-cols-2">
        {[['A', 'B'], ['C', 'D']].map((keys) => (
          <div key={keys.join('')} className="flex flex-col gap-3 md:gap-4">
            {SHELLS.filter((shell) => keys.includes(shell.key)).map((shell) => (
              <ShellCard key={shell.key} shell={shell} index={SHELLS.indexOf(shell)} />
            ))}
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

function ShellCard({ shell, index }: { shell: (typeof SHELLS)[number]; index: number }) {
  return (
    <Panel tone="raised" pad="sm" className={cx('flex flex-col gap-2', `animate-rise-${index + 1}`)}>
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-3">
        <PanelLabel tone={shell.key === 'D' ? 'muted' : 'accent'}>
          패턴 {shell.key} · {shell.name}
        </PanelLabel>
        <span className="text-deck-meta text-content-muted">{shell.when}</span>
      </div>
      <DrillCode lines={shell.lines} size="meta" />
    </Panel>
  )
}

const FRAMEWORK = [
  {
    no: 1,
    name: '재료 준비',
    say: '꺼낼 칸 · 보여줄 칸 · 기억할 그릇을 한국어로',
    span: 'lg:col-span-2',
    lines: ['// 꺼낼 칸 : name', '// 보여줄 칸 : result', '// 그릇 : name'],
  },
  {
    no: 2,
    name: '껍데기 먼저',
    say: 'function과 if / else를 속은 비운 채',
    span: 'lg:col-span-3',
    lines: ['function greet() {', '', '  if () {', '', '  } else {', '', '  }', '}'],
  },
  {
    no: 3,
    name: '빈칸 채우기',
    say: '주석을 껍데기 안으로 옮기고 그 아래를 채운다',
    span: 'lg:col-span-4',
    lines: [
      'function greet() {',
      '  // 이름 칸의 값을 가져온다',
      "  const name = document.getElementById('name').value;",
      "  if (name == '') {",
      '    // 비었으면 안내',
      '  } else {',
      '    // 아니면 인사',
      '  }',
      '}',
    ],
  },
]

/** 3단계 사고 프레임워크 · 인사하기로 한 번 */
export function FrameworkSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>선생님과 함께 채우는 3단계</SlideKicker>
      <SlideHeadline>
        위에서부터 치지 않습니다. <Mark>재료 → 껍데기 → 빈칸</Mark> 순서로
      </SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-5 lg:grid-cols-9">
        {FRAMEWORK.map((step, index) => (
          <Panel
            key={step.no}
            tone={step.no === 2 ? 'accentSoft' : 'raised'}
            pad="sm"
            className={cx('flex flex-col gap-3', step.span, `animate-rise-${index + 1}`)}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-strong inset-shadow-sunken md:size-10">
                {step.no}
              </span>
              <p className="text-deck-body font-bold text-content-strong">{step.name}</p>
            </div>
            <p className="text-deck-caption text-content-secondary">{step.say}</p>
            <DrillCode lines={step.lines} size="meta" className="mt-auto" />
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        lesson/ 폴더의 실습 파일에도 같은 세 칸이 주석으로 들어 있습니다
      </SlideNote>
    </SlideLayout>
  )
}

const SCREEN_PARTS = [
  { icon: ClipboardList, head: '검은 상자', detail: '이번 Step에서 할 일 한 줄. 막히면 소리 내어 읽습니다' },
  { icon: Keyboard, head: '왼쪽 · 내 코드 칸', detail: '여기에 칩니다. 친 코드는 저절로 저장됩니다' },
  { icon: Play, head: '▶ 실행 · Ctrl + Enter', detail: '오른쪽 실행 화면에서 버튼을 직접 눌러 봅니다' },
  { icon: AlertTriangle, head: '빨간 상자', detail: '틀린 줄 번호와 고칠 방법. 누르면 그 줄로 갑니다' },
  { icon: MonitorCheck, head: '채점하기', detail: '다 맞으면 화면이 초록색, 다음 Step 버튼이 나옵니다' },
]

/** 준비 · 노트북 한 대, 브라우저 하나로 쓰는 법 */
export function SetupSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>준비 · 노트북 한 대, 화면 하나</SlideKicker>
        <a
          href={DRILL_HOME}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-deck-caption font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck hover:opacity-90"
        >
          <ExternalLink className="size-5 shrink-0" />
          실습 화면 열기
        </a>
      </div>
      <SlideHeadline>
        <Mark>브라우저 한 화면</Mark>에서 칩니다
      </SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="md" className="flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>탭 두 개만 씁니다</PanelLabel>
          {[
            '탭 1 · 이 강의 화면 · 교시와 문제를 소개할 때',
            '탭 2 · 실습 화면 · 학생이 칠 때',
            'Ctrl + Tab으로 두 탭을 오갑니다',
            '키보드는 학생 앞에, 선생님은 화면만 가리킵니다',
          ].map((line, index) => (
            <p key={line} className="flex items-start gap-3 text-deck-caption font-semibold text-content-strong">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-raised text-deck-meta font-bold shadow-raised md:size-8">
                {index + 1}
              </span>
              {line}
            </p>
          ))}
          <p className="mt-auto flex items-center gap-2 text-deck-caption text-content-secondary">
            <ArrowRight className="size-5 shrink-0" />
            실습 화면 첫 페이지에 사용법이 그림과 함께 있습니다
          </p>
        </Panel>

        <Panel tone="raised" pad="md" className="flex flex-col gap-4 lg:col-span-5">
          <PanelLabel tone="accent">실습 화면에서 볼 곳</PanelLabel>
          {SCREEN_PARTS.map((part, index) => {
            const Icon = part.icon
            return (
              <div key={part.head} className={cx('flex items-start gap-4', `animate-rise-${Math.min(index + 1, 5)}`)}>
                <Icon className="mt-1 size-6 shrink-0 text-accent md:size-7" />
                <div className="flex flex-col">
                  <p className="text-deck-body font-bold text-content-strong">{part.head}</p>
                  <p className="text-deck-caption text-content-secondary">{part.detail}</p>
                </div>
              </div>
            )
          })}
        </Panel>
      </div>
    </SlideLayout>
  )
}
