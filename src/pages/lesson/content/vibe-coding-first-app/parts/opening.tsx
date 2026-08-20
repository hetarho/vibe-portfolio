import { ArrowRight, Code2, MessageSquare, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  CheckRow,
  Chip,
  CompareGrid,
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
import { useIdeas } from '../model/ideas'
import { MenuRoulette } from '../ui/MenuRoulette'

/** S0. 시작 전 화면 */
export function StandbySlide() {
  const [checks, setChecks] = useState([false, false, false])
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-5">
          <SlideKicker>오늘 수업</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            바이브코딩
            <br />
            말로 만드는 <Mark>나의 첫 웹 앱</Mark>
          </h1>
          <SlideBody>개발을 한 번도 안 해봤다는 걸 전제로 시작합니다.</SlideBody>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>시작 전 확인</PanelLabel>
          <CheckRow checked={checks[0]} onToggle={() => toggle(0)} hint="영상이 끊기면 바로 말해주세요">
            인터넷 연결
          </CheckRow>
          <CheckRow checked={checks[1]} onToggle={() => toggle(1)} hint="설치와 로그인까지 되어 있어야 해요">
            AI 코딩 도구 로그인
          </CheckRow>
          <CheckRow checked={checks[2]} onToggle={() => toggle(2)} hint="검은 창이 열리면 준비 끝이에요">
            터미널 열어보기
          </CheckRow>
        </Panel>
      </div>

      <div className="animate-rise-3 flex flex-col gap-2 rounded-panel bg-surface-raised px-5 py-3 shadow-raised md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-6">
        <p className="text-deck-body text-content-secondary">막히는 지점이 생기면 그때그때 끊고 물어봐도 돼요.</p>
        <p className="text-deck-caption text-content-muted">오늘 2시간, 만드는 데 대부분을 씁니다</p>
      </div>
    </SlideLayout>
  )
}

/** S1. 오프닝 — 오늘의 약속 */
export function PromiseSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-5 md:gap-8 lg:col-span-5">
          <SlideKicker>오늘의 약속</SlideKicker>
          <SlideHeadline size="hero">
            2시간 뒤엔
            <br />
            <Mark>내 컴퓨터에서</Mark> 내 앱이 돌아갑니다
          </SlideHeadline>
          <SlideBody>코드는 한 줄도 직접 쓰지 않습니다.</SlideBody>
          <div className="animate-rise-3 flex flex-wrap gap-3">
            <Chip>오른쪽 룰렛, 지금 한번 눌러보세요</Chip>
            <Chip tone="accent">오늘 만들 결과물 예시</Chip>
          </div>
        </div>

        <div className="animate-rise-2 lg:col-span-4">
          <MenuRoulette />
        </div>
      </div>
    </SlideLayout>
  )
}

/** S2. 질문 — 뭘 만들고 싶은지 */
export function IdeaWallSlide() {
  const { ideas, add, remove } = useIdeas()
  const [draft, setDraft] = useState('')

  const submit = () => {
    add(draft)
    setDraft('')
  }

  return (
    <SlideLayout align="top">
      <div className="flex flex-col gap-4 pt-8 md:gap-6">
        <SlideKicker>먼저 물어볼 것</SlideKicker>
        <SlideHeadline>만들고 싶었던 것, 자동화하고 싶었던 일이 있어요?</SlideHeadline>
      </div>

      <div className="animate-rise-2 flex items-center gap-4">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') submit()
          }}
          placeholder="예) 매주 쓰는 회의록 정리를 자동으로"
          className="w-0 flex-1 rounded-panel bg-surface-sunken px-4 py-4 text-deck-body text-content-strong placeholder:text-content-muted inset-shadow-sunken md:px-9 md:py-7 focus:outline-none"
        />
        <button
          type="button"
          onClick={submit}
          className="flex items-center gap-3 rounded-panel bg-accent px-4 py-4 text-deck-body font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck md:px-9 md:py-7 hover:bg-accent-strong"
        >
          <Plus size={30} />
          붙이기
        </button>
      </div>

      {ideas.length === 0 ? (
        <Panel tone="sunken" pad="lg" className="grid place-items-center">
          <p className="text-deck-body text-content-muted">여기에 아이디어가 쌓여요</p>
        </Panel>
      ) : (
        <ul className="grid grid-cols-2 gap-5 xl:grid-cols-3">
          {ideas.map((idea, index) => (
            <li
              key={`${idea}-${index}`}
              className="animate-pop flex items-start justify-between gap-4 rounded-card bg-surface-overlay p-4 shadow-overlay md:p-7"
            >
              <span className="text-deck-caption font-semibold text-content-strong">{idea}</span>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`${idea} 지우기`}
                className="shrink-0 rounded-control p-2 text-content-muted transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary"
              >
                <Trash2 size={22} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </SlideLayout>
  )
}

const CODE_LINES = ['w-5/6', 'w-2/3', 'w-3/4', 'w-1/2', 'w-4/5', 'w-3/5', 'w-2/3', 'w-1/2']

/** S3. 바이브코딩이란? */
export function DefinitionSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>
        바이브코딩 = 한국어로 설명하면, <Mark>AI가 코드를 씁니다</Mark>
      </SlideHeadline>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 md:gap-6">
          <PanelLabel>예전 방식</PanelLabel>
          <div className="flex flex-1 flex-col justify-center gap-3 rounded-card bg-surface-base p-4 md:p-7">
            {CODE_LINES.map((width, index) => (
              <span key={width + index} className={cx('block h-3 rounded-full bg-content-muted/40', width)} />
            ))}
          </div>
          <p className="flex items-center gap-3 text-deck-body font-semibold text-content-secondary">
            <Code2 size={30} />
            사람이 코드를 타이핑
          </p>
        </Panel>

        <Panel tone="raised" pad="lg" className="flex flex-col gap-4 md:gap-6">
          <PanelLabel tone="accent">바이브코딩</PanelLabel>
          <div className="flex flex-1 flex-col justify-center gap-4">
            <p className="w-4/5 rounded-card rounded-bl-control bg-accent px-4 py-3 text-deck-body font-semibold text-accent-contrast md:px-7 md:py-5">
              점심 메뉴 룰렛 만들어줘
            </p>
            <p className="ml-auto w-4/5 rounded-card rounded-br-control bg-surface-overlay px-4 py-3 text-deck-body text-content-primary md:px-7 md:py-5">
              네, 만들어 드릴게요 ✨
            </p>
          </div>
          <p className="flex items-center gap-3 text-deck-body font-semibold text-content-strong">
            <MessageSquare size={30} />
            AI가 코드를 타이핑
          </p>
        </Panel>
      </CompareGrid>

      <SlideNote>오늘 내 역할 = 개발자가 아니라 잘 시키는 클라이언트</SlideNote>
    </SlideLayout>
  )
}

const JOURNEY = [
  {
    label: '기초',
    time: '50분',
    keywords: ['개발이란', '웹 앱', '터미널', 'AI 에이전트'],
    span: 'lg:col-span-3',
    current: true,
  },
  { label: '휴식', time: '5분', keywords: ['숨 고르기'], span: 'lg:col-span-2', current: false },
  { label: '만들기', time: '50분', keywords: ['띄우기', '고치기'], span: 'lg:col-span-2', current: false },
  { label: '공부법', time: '15분', keywords: ['혼자 하는 법'], span: 'lg:col-span-2', current: false },
]

/** S4. 오늘의 여정 */
export function JourneySlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘 순서</SlideKicker>
      <SlideHeadline>두 시간, 이렇게 갑니다</SlideHeadline>

      <ol className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        {JOURNEY.map((step, index) => (
          <li
            key={step.label}
            className={cx(
              'flex flex-col gap-5 rounded-panel p-5 transition duration-300 ease-deck md:p-9',
              step.span,
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
              step.current ? 'bg-accent text-accent-contrast shadow-lifted' : 'bg-surface-raised shadow-raised',
            )}
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-deck-lead font-bold">{step.label}</span>
              <span className={cx('text-deck-body font-semibold', step.current ? 'text-accent-contrast/70' : 'text-content-muted')}>
                {step.time}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {step.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className={cx(
                    'rounded-full px-5 py-2 text-deck-caption font-semibold',
                    step.current ? 'bg-accent-contrast/15 text-accent-contrast' : 'bg-surface-highlight text-content-primary',
                  )}
                >
                  {keyword}
                </span>
              ))}
            </div>
            {step.current ? (
              <p className="mt-auto flex items-center gap-3 text-deck-caption font-bold">
                <span className="size-4 animate-breathe rounded-full bg-accent-contrast" aria-hidden />
                지금 여기
              </p>
            ) : (
              <p className="mt-auto flex items-center gap-3 text-deck-caption text-content-muted">
                <ArrowRight size={24} />
                다음
              </p>
            )}
          </li>
        ))}
      </ol>
    </SlideLayout>
  )
}
