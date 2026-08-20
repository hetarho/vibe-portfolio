import { Bot, Check, Copy, Globe, Power, Presentation, RotateCcw, Terminal } from 'lucide-react'
import { useState } from 'react'
import {
  CheckRow,
  Chip,
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

const TERMINAL_DEMOS = [
  {
    command: 'pwd',
    means: '나 지금 어느 폴더에 있어?',
    output: ['/Users/me'],
  },
  {
    command: 'ls',
    means: '이 폴더에 뭐가 있어?',
    output: ['Desktop   Documents   Downloads'],
  },
  {
    command: 'mkdir my-first-app',
    means: '폴더 하나 만들어줘',
    output: ['(아무 말 없으면 성공했다는 뜻이에요)'],
  },
]

const TERMINAL_FACTS = [
  { head: '마우스 대신 글자로 시키는 창', body: '폴더 만들기, 파일 열기 — 클릭으로 하던 걸 글자로 합니다' },
  { head: '엔터를 누르기 전엔 아무 일도 안 생겨요', body: '쓰다 지우는 건 얼마든지 해도 됩니다' },
  { head: '오타는 한 줄 잔소리로 끝나요', body: '"command not found" — 컴퓨터가 망가지지 않습니다' },
]

/** V12. 터미널이 뭔가 — 눌러보면서 익히는 화면 */
export function TerminalSlide() {
  const [ran, setRan] = useState<number[]>([])

  const run = (index: number) => setRan((list) => (list.includes(index) ? list : [...list, index]))

  return (
    <SlideLayout>
      <div className="flex flex-col gap-4 md:gap-6">
        <SlideKicker>오늘 처음 열어볼 창</SlideKicker>
        <SlideHeadline>
          터미널은 <Mark>글자로 시키는 창</Mark>이에요
        </SlideHeadline>
      </div>

      <div className="grid items-stretch gap-5 md:gap-8 lg:grid-cols-9">
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 lg:col-span-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Terminal className="size-6 text-accent md:size-8" />
              <PanelLabel tone="accent">터미널</PanelLabel>
            </div>
            <button
              type="button"
              onClick={() => setRan([])}
              aria-label="처음부터"
              className="grid size-10 place-items-center rounded-full bg-surface-raised text-content-secondary shadow-raised transition duration-200 ease-deck md:size-12 hover:bg-surface-highlight hover:text-content-primary"
            >
              <RotateCcw className="size-5 md:size-6" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-3 rounded-card bg-surface-base p-4 md:p-7">
            {ran.length === 0 ? (
              <p className="font-mono text-deck-caption text-content-muted">$ 아래 버튼을 눌러보세요</p>
            ) : null}
            {ran.map((index) => (
              <div key={TERMINAL_DEMOS[index].command} className="animate-pop flex flex-col gap-1">
                <p className="font-mono text-deck-caption font-bold text-accent">$ {TERMINAL_DEMOS[index].command}</p>
                {TERMINAL_DEMOS[index].output.map((line) => (
                  <p key={line} className="font-mono text-deck-caption text-content-primary">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {TERMINAL_DEMOS.map((demo, index) => (
              <button
                key={demo.command}
                type="button"
                onClick={() => run(index)}
                className={cx(
                  'rounded-control px-4 py-2 font-mono text-deck-caption font-bold transition duration-200 ease-deck md:px-6 md:py-3',
                  ran.includes(index)
                    ? 'bg-surface-highlight text-content-muted'
                    : 'bg-accent text-accent-contrast shadow-lifted hover:bg-accent-strong',
                )}
              >
                {demo.command}
              </button>
            ))}
          </div>
        </Panel>

        <div className="flex flex-col gap-4 lg:col-span-4">
          {TERMINAL_FACTS.map((fact, index) => (
            <Panel
              key={fact.head}
              tone="raised"
              pad="md"
              className={cx(
                'flex flex-col gap-2',
                index === 0 && 'animate-rise-1',
                index === 1 && 'animate-rise-2',
                index === 2 && 'animate-rise-3',
              )}
            >
              <p className="text-deck-body font-bold text-content-strong">{fact.head}</p>
              <p className="text-deck-caption text-content-secondary">{fact.body}</p>
            </Panel>
          ))}
        </div>
      </div>

      <SlideBody>
        오늘 여기에 직접 칠 명령은 <Mark>세 줄</Mark>뿐이에요. 나머지는 AI가 칩니다.
      </SlideBody>
    </SlideLayout>
  )
}

const ADDRESS_PARTS = [
  { text: 'localhost', label: '지금 이 컴퓨터', accent: true },
  { text: ':3000', label: '몇 번 문으로 들어갈지', accent: false },
]

/** V13. localhost와 포트 — 켜고 끄는 걸 눌러보는 화면 */
export function LocalhostSlide() {
  const [on, setOn] = useState(true)

  return (
    <SlideLayout>
      <div className="flex flex-col gap-4 md:gap-6">
        <SlideKicker>&ldquo;로컬에서 띄운다&rdquo;는 말</SlideKicker>
        <SlideHeadline>
          내 컴퓨터가 <Mark>나한테만</Mark> 보여주는 상태예요
        </SlideHeadline>
      </div>

      <div className="grid items-stretch gap-5 md:gap-8 lg:grid-cols-9">
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-5 lg:col-span-4">
          <PanelLabel>주소를 뜯어보면</PanelLabel>
          <p className="font-mono text-deck-lead font-bold text-content-strong">http://localhost:3000</p>
          <div className="flex flex-col gap-3">
            {ADDRESS_PARTS.map((part) => (
              <div key={part.text} className="flex items-center gap-4 rounded-card bg-surface-base p-4 md:p-6">
                <span
                  className={cx(
                    'font-mono text-deck-body font-bold',
                    part.accent ? 'text-accent' : 'text-content-primary',
                  )}
                >
                  {part.text}
                </span>
                <span className="text-deck-caption text-content-secondary">{part.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-auto text-deck-caption text-content-muted">
            인터넷에 올라간 게 아니라, 내 컴퓨터 안에서만 열리는 주소예요
          </p>
        </Panel>

        <Panel tone="raised" pad="lg" className="flex flex-col gap-5 lg:col-span-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <PanelLabel tone={on ? 'accent' : 'muted'}>{on ? '서버 켜짐' : '서버 꺼짐'}</PanelLabel>
            <button
              type="button"
              onClick={() => setOn((value) => !value)}
              className={cx(
                'flex items-center gap-3 rounded-full px-4 py-2 text-deck-caption font-bold transition duration-200 ease-deck md:px-7 md:py-3',
                on
                  ? 'bg-surface-highlight text-content-primary hover:bg-surface-overlay'
                  : 'bg-accent text-accent-contrast shadow-lifted hover:bg-accent-strong',
              )}
            >
              <Power className="size-5 md:size-6" />
              {on ? '터미널 끄기' : '다시 띄우기'}
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-3 rounded-card bg-surface-sunken p-4 inset-shadow-sunken md:p-7">
            <p className="rounded-control bg-surface-base px-4 py-2 font-mono text-deck-caption text-content-secondary md:px-6 md:py-3">
              localhost:3000
            </p>
            {on ? (
              <div className="animate-pop grid flex-1 place-items-center rounded-card bg-surface-overlay p-5 text-center md:p-8">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-deck-lead font-bold text-content-strong">내가 만든 앱 🎉</span>
                  <span className="text-deck-caption text-content-secondary">터미널이 계속 켜져 있어야 열립니다</span>
                </div>
              </div>
            ) : (
              <div className="grid flex-1 place-items-center rounded-card bg-surface-base p-5 text-center md:p-8">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-deck-lead font-bold text-content-muted">이 사이트에 연결할 수 없음</span>
                  <span className="text-deck-caption text-content-muted">앱이 사라진 게 아니라 서버가 꺼진 거예요</span>
                </div>
              </div>
            )}
          </div>
        </Panel>
      </div>

      <SlideNote tone="quiet">
        파일은 그대로 남아 있어요. 다시 띄우면 다시 열립니다 — 그러니 마음껏 껐다 켜도 돼요
      </SlideNote>
    </SlideLayout>
  )
}

const TOOLS = [
  { icon: Terminal, name: '터미널', role: 'AI가 일하는 자리', detail: '여기서 명령을 주고, 여기서 결과가 올라옵니다' },
  { icon: Globe, name: '브라우저', role: '결과를 보는 자리', detail: 'localhost 주소를 열어 만든 앱을 봅니다' },
  { icon: Presentation, name: '이 화면', role: '길잡이', detail: '지금 뭘 할 차례인지 여기서 봅니다' },
]

/** V14. 오늘 쓰는 창 3개 */
export function ThreeToolsSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col gap-4 md:gap-6">
        <SlideKicker>화면 배치</SlideKicker>
        <SlideHeadline>창 세 개만 왔다 갔다 합니다</SlideHeadline>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {TOOLS.map((tool, index) => (
          <Panel
            key={tool.name}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <tool.icon className={cx('size-8 md:size-11', index === 0 ? 'text-accent' : 'text-content-muted')} />
            <p className="text-deck-lead font-bold text-content-strong">{tool.name}</p>
            <p className="text-deck-body font-semibold text-content-primary">{tool.role}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{tool.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>터미널은 왼쪽, 브라우저는 오른쪽에 나란히 두면 편해요.</SlideBody>
    </SlideLayout>
  )
}

const COMMANDS = [
  { command: 'mkdir my-first-app', means: '작업할 폴더를 만든다' },
  { command: 'cd my-first-app', means: '그 폴더 안으로 들어간다' },
  { command: 'claude', means: '그 폴더에서 AI 에이전트를 켠다' },
]

function CommandRow({ command, means, index }: { command: string; means: string; index: number }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    void navigator.clipboard?.writeText(command)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div
      className={cx(
        'flex items-center gap-4 rounded-card bg-surface-raised p-4 shadow-raised md:gap-6 md:p-6',
        index === 0 && 'animate-rise-1',
        index === 1 && 'animate-rise-2',
        index === 2 && 'animate-rise-3',
      )}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-secondary inset-shadow-sunken md:size-12">
        {index + 1}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate font-mono text-deck-body font-bold text-content-strong">$ {command}</span>
        <span className="text-deck-caption text-content-secondary">{means}</span>
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={`${command} 복사`}
        className={cx(
          'grid size-10 shrink-0 place-items-center rounded-control transition duration-200 ease-deck md:size-12',
          copied ? 'bg-accent text-accent-contrast' : 'bg-surface-highlight text-content-secondary hover:text-content-primary',
        )}
      >
        {copied ? <Check className="size-5 md:size-6" strokeWidth={3} /> : <Copy className="size-5 md:size-6" />}
      </button>
    </div>
  )
}

/** V23. 폴더 만들고 에이전트 켜기 — 직접 치는 세 줄 */
export function FirstCommandsSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col gap-4 md:gap-6">
        <SlideKicker>직접 치는 건 여기까지</SlideKicker>
        <SlideHeadline>이 세 줄만 한 줄씩 엔터</SlideHeadline>
      </div>

      <div className="flex flex-col gap-4">
        {COMMANDS.map((item, index) => (
          <CommandRow key={item.command} command={item.command} means={item.means} index={index} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Chip tone="accent">한 줄 치고 엔터, 또 한 줄</Chip>
        <span className="text-deck-caption text-content-secondary">
          세 줄을 한꺼번에 붙여넣지 마세요. 하나씩 확인하면서 갑니다
        </span>
      </div>

      <SlideNote>
        <span className="inline-flex items-center gap-3">
          <Bot className="size-6 md:size-8" />
          세 번째 줄이 끝나면, 이제 말로 시키기 시작합니다
        </span>
      </SlideNote>
    </SlideLayout>
  )
}

const RUN_CHECKS = [
  { head: '브라우저에 앱이 보이나요', hint: 'AI가 알려준 localhost 주소를 열어보세요' },
  { head: '버튼이 눌리나요', hint: '눌러보고 반응이 없으면 그대로 말하면 됩니다' },
  { head: '새로고침해도 그대로 있나요', hint: '서버가 켜져 있으면 계속 열립니다' },
]

/** V26. 떴다 — 확인하고 넘어가는 화면 */
export function ItRunsSlide() {
  const [checks, setChecks] = useState(() => RUN_CHECKS.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="flex flex-col gap-4 md:gap-6">
        <SlideKicker>여기가 오늘의 목표</SlideKicker>
        <SlideHeadline>
          이 주소는 지금 <Mark>내 컴퓨터가</Mark> 만들고 있어요
        </SlideHeadline>
      </div>

      <div className="flex flex-col gap-4">
        {RUN_CHECKS.map((item, index) => (
          <CheckRow key={item.head} checked={checks[index]} onToggle={() => toggle(index)} hint={item.hint}>
            {item.head}
          </CheckRow>
        ))}
      </div>

      <SlideNote tone="quiet">
        터미널에서 <Mark>Ctrl + C</Mark>를 누르면 꺼집니다. 파일은 남아 있으니 겁내지 마세요
      </SlideNote>
    </SlideLayout>
  )
}
