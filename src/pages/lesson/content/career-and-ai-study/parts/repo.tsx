import { FolderTree, MonitorPlay, RefreshCw } from 'lucide-react'
import {
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

/** 튜터 프롬프트가 만드는 산출물 목록(프롬프트 §5)을 학생이 볼 순서로 정리한 것 */
const TREE = [
  { name: 'README.md', note: '읽는 순서와 실행 명령' },
  { name: 'PROGRESS.md', note: '내 진도·점수·약점', key: true },
  { name: 'CURRICULUM.md', note: '레슨 순서' },
  { name: 'LEDGER.md', note: '지금까지 배운 어휘', key: true },
  { name: 'TUTOR.md', note: '튜터 말투와 규칙' },
  { name: 'RUBRIC.yaml', note: '채점 기준' },
  { name: 'JOURNAL.md', note: '세션 기록' },
  { name: 'lessons/', note: '레슨 본문 + 내가 쓴 코드', key: true },
  { name: 'tools/', note: '검사기 · 상태 스크립트' },
  { name: 'web/', note: '레슨 뷰어', key: true },
]

const TREE_HIGHLIGHT = [
  { head: 'PROGRESS.md', body: '내 상태는 여기 하나예요. 튜터도 스크립트도 뷰어도 이 파일만 봐요' },
  { head: 'LEDGER.md', body: '배운 단어를 전부 적어둬요. 여기 없는 문법은 레슨에 못 나와요' },
  { head: 'web/', body: '레슨을 읽는 화면이에요. 채팅으로 안 읽어요' },
]

/** 2부 · 앞으로 생길 폴더 */
export function RepoMapSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <FolderTree size={44} className="text-accent" />
        <SlideHeadline>지금 이런 폴더가 만들어지고 있어요</SlideHeadline>
      </div>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="lg" className="animate-rise-1 flex flex-col gap-3 lg:col-span-5">
          <PanelLabel>{'<프로젝트 이름>/'}</PanelLabel>
          {TREE.map((item) => (
            <div key={item.name} className="flex items-baseline justify-between gap-4 md:gap-6">
              <span
                className={cx(
                  'font-mono text-deck-caption',
                  item.key ? 'font-bold text-accent' : 'text-content-primary',
                )}
              >
                {item.name}
              </span>
              <span className="text-deck-caption text-content-muted">{item.note}</span>
            </div>
          ))}
        </Panel>

        <div className="flex flex-col gap-4 lg:col-span-4">
          {TREE_HIGHLIGHT.map((item, index) => (
            <Panel
              key={item.head}
              tone="raised"
              pad="md"
              className={cx(
                'flex flex-1 flex-col justify-center gap-2',
                index === 0 && 'animate-rise-2',
                index === 1 && 'animate-rise-3',
                index === 2 && 'animate-rise-4',
              )}
            >
              <p className="font-mono text-deck-caption font-bold text-accent">{item.head}</p>
              <p className="text-deck-caption text-content-secondary">{item.body}</p>
            </Panel>
          ))}
        </div>
      </div>

      <SlideNote tone="quiet">전부 git으로 쌓여요. 이 폴더가 곧 내 공부 기록이에요</SlideNote>
    </SlideLayout>
  )
}

const BLOCKS = [
  { mark: ':::drill', body: '손으로 치는 최소 실습. 판정 명령이 붙어요' },
  { mark: ':::spec', body: '과제 명세 카드. 파일·요구사항·완료 조건' },
  { mark: ':::check', body: '이해도 질문. 힌트는 접혀 있어요' },
  { mark: ':::gotcha', body: '비유가 어긋나는 지점, 함정' },
]

/** 2부 · 레슨은 브라우저에서 읽는다 */
export function ViewerSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <MonitorPlay size={44} className="text-accent" />
        <SlideHeadline>레슨은 채팅 말고 브라우저에서 읽어요</SlideHeadline>
      </div>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="lg" className="animate-rise-1 flex flex-col justify-center gap-4 md:gap-6 lg:col-span-4">
          <PanelLabel>레포 루트에서 한 줄</PanelLabel>
          <p className="font-mono text-deck-lead font-bold text-accent">$ pnpm dev</p>
          <div className="flex items-center gap-3 text-deck-caption text-content-secondary">
            <RefreshCw size={22} />
            레슨 파일을 저장하고 새로고침하면 바로 반영돼요
          </div>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-5">
          <PanelLabel tone="accent">레슨 안에서 만날 블록</PanelLabel>
          {BLOCKS.map((block) => (
            <div key={block.mark} className="flex items-baseline gap-5">
              <span className="w-32 shrink-0 font-mono text-deck-caption font-bold text-accent">{block.mark}</span>
              <span className="text-deck-caption text-content-secondary">{block.body}</span>
            </div>
          ))}
        </Panel>
      </div>

      <SlideBody>
        채팅은 스크롤이 사라져요. 그래서 레슨은 <Mark>파일로 남기고 뷰어로 읽어요.</Mark>
      </SlideBody>
    </SlideLayout>
  )
}

const AGENTS = [
  { name: 'Claude Code', how: '/start-study' },
  { name: 'Cursor', how: '규칙이 자동으로 붙어요' },
  { name: 'Codex CLI', how: 'AGENTS.md 자동 로드' },
  { name: 'Gemini CLI', how: 'GEMINI.md 자동 로드' },
]

const MODES = [
  { tag: 'A', head: '레슨이 없으면', body: '튜터가 오늘 레슨을 써요' },
  { tag: 'B', head: '레슨은 있고 코드가 없으면', body: '내가 짜요. 튜터는 에러만 읽어줘요' },
  { tag: 'C', head: '코드를 냈으면', body: '채점하고 이해도를 물어봐요' },
]

/** 2부 · 다음 세션부터의 사용법 */
export function SessionLoopSlide() {
  return (
    <SlideLayout>
      <SlideKicker>다음 주부터</SlideKicker>
      <SlideHeadline>세션을 여는 방법은 한 가지예요</SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel tone="accent">폴더에서 도구를 열면</PanelLabel>
          {AGENTS.map((agent) => (
            <div key={agent.name} className="flex items-baseline justify-between gap-5">
              <span className="text-deck-caption font-bold text-content-strong">{agent.name}</span>
              <span className="font-mono text-deck-caption text-content-muted">{agent.how}</span>
            </div>
          ))}
          <p className="mt-auto text-deck-caption text-content-secondary">
            내가 쓰는 도구에 맞춰 튜터가 알아서 만들어줘요
          </p>
        </Panel>

        <div className="flex flex-col gap-4 lg:col-span-5">
          {MODES.map((mode, index) => (
            <Panel
              key={mode.tag}
              tone={index === 1 ? 'accentSoft' : 'sunken'}
              pad="md"
              className={cx(
                'flex flex-1 items-center gap-4 md:gap-6',
                index === 0 && 'animate-rise-2',
                index === 1 && 'animate-rise-3',
                index === 2 && 'animate-rise-4',
              )}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-raised text-deck-caption font-bold text-content-primary md:size-14">
                {mode.tag}
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-deck-caption font-bold text-content-strong">{mode.head}</span>
                <span className="text-deck-caption text-content-secondary">{mode.body}</span>
              </span>
            </Panel>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Chip tone="accent">먼저 상태부터 읽어요</Chip>
        <span className="font-mono text-deck-caption text-content-muted">python3 tools/study-status.py</span>
        <span className="text-deck-caption text-content-secondary">
          &ldquo;오늘 뭐 할까요?&rdquo;를 되묻지 않게 만들어둔 장치예요
        </span>
      </div>
    </SlideLayout>
  )
}
