import { ArrowRight, Compass, Search, TrendingDown } from 'lucide-react'
import { useState } from 'react'
import {
  CheckRow,
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
} from '@/features/slide-deck'

/** C0. 시작 전 — 설치 확인 */
export function StandbySlide() {
  const [checks, setChecks] = useState([false, false, false])
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="grid items-center gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-7 lg:col-span-5">
          <SlideKicker>오늘 수업</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            진로 찾기 &amp;
            <br />
            <Mark>AI 시대 개발 공부법</Mark>
          </h1>
          <SlideBody>2부는 같이 손을 써요. 시작 전에 옆의 세 가지만 확인할게요.</SlideBody>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>설치 확인</PanelLabel>
          <CheckRow checked={checks[0]} onToggle={() => toggle(0)} hint="쓰고 있는 LLM 아무거나 · 로그인까지">
            LLM 계정
          </CheckRow>
          <CheckRow checked={checks[1]} onToggle={() => toggle(1)} hint="터미널에서 명령어가 실행되는지">
            코딩 CLI 설치
          </CheckRow>
          <CheckRow checked={checks[2]} onToggle={() => toggle(2)} hint="git --version · python3 --version">
            git &amp; python3
          </CheckRow>
        </Panel>
      </div>

      <div className="animate-rise-3 grid gap-5 lg:grid-cols-2">
        <Panel tone="sunken" pad="md" className="flex items-center gap-5">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary">
            1
          </span>
          <p className="text-deck-caption text-content-secondary">
            오늘 가져갈 것 ① 성향을 근거로 세운 <span className="text-content-strong">방향 가설</span>
          </p>
        </Panel>
        <Panel tone="sunken" pad="md" className="flex items-center gap-5">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary">
            2
          </span>
          <p className="text-deck-caption text-content-secondary">
            오늘 가져갈 것 ② 혼자 굴릴 수 있는 <span className="text-content-strong">학습 레포</span>
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

const WORRIES = [
  {
    quote: 'AI가 코드를 다 써주는데, 내가 문법을 외울 필요가 있을까',
    tail: '생산은 싸졌는데 학습 목표는 그대로예요',
  },
  {
    quote: '요즘 개발자 시장 망했다던데',
    tail: '신입 공고가 줄었다는 얘기가 계속 들려요',
  },
  {
    quote: 'FE냐 BE냐, 정하지도 못했는데 학기가 가요',
    tail: '남의 기준으로 고르니까 계속 흔들려요',
  },
  {
    quote: '강의는 완강했는데 혼자서는 백지예요',
    tail: '읽은 것과 할 수 있는 것 사이의 거리',
  },
]

/** C1. 오프닝 — AI 시대 개발자의 고민 */
export function WorriesSlide() {
  return (
    <SlideLayout>
      <SlideKicker>오프닝</SlideKicker>
      <SlideHeadline>요즘 개발자들이 걸려 있는 자리</SlideHeadline>

      <div className="grid gap-5 lg:grid-cols-2">
        {WORRIES.map((worry, index) => (
          <Panel
            key={worry.quote}
            tone={index === 3 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <p className="text-deck-body font-semibold text-content-strong">&ldquo;{worry.quote}&rdquo;</p>
            <p className="text-deck-caption text-content-secondary">{worry.tail}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>
        고민의 모양은 다른데 뿌리는 하나예요. <Mark>판단 기준이 내 것이 아니라서.</Mark>
      </SlideBody>
    </SlideLayout>
  )
}

const SHIFT = [
  {
    head: '줄어든 건 사실이에요',
    body: '신입 공고가 확 줄었어요. 주니어가 맡던 일 — 디버깅, 테스트 코드, 간단한 기능 — 이 하필 AI가 제일 잘하는 구간이었거든요',
    tone: 'sunken' as const,
  },
  {
    head: '구현 값이 떨어졌어요',
    body: '하루 걸리던 화면 하나가 한 시간이 됐어요. 코드를 치는 속도로는 이제 차별화가 안 돼요',
    tone: 'sunken' as const,
  },
  {
    head: '안 줄어든 자리가 있어요',
    body: '뭘 만들지 정하고, AI가 뱉은 걸 판단하고, 끝까지 책임지는 자리. 여기는 오히려 사람이 모자라요',
    tone: 'accentSoft' as const,
  },
]

/** C2. 시장 얘기 정면 돌파 — 붕괴가 아니라 개편 */
export function MarketShiftSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <TrendingDown size={44} className="text-critical" />
        <SlideKicker>시장 얘기부터 하고 갈게요</SlideKicker>
      </div>
      <SlideHeadline>
        시장이 망한 게 아니라 <Mark>개편</Mark>되는 중이에요
      </SlideHeadline>

      <div className="grid gap-5 lg:grid-cols-3">
        {SHIFT.map((item, index) => (
          <Panel
            key={item.head}
            tone={item.tone}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <PanelLabel tone={item.tone === 'accentSoft' ? 'accent' : 'muted'}>{`0${index + 1}`}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-caption text-content-secondary">{item.body}</p>
          </Panel>
        ))}
      </div>

      <SlideNote>사라진 건 개발자 자리가 아니라, 시키는 대로 코드만 치는 자리예요</SlideNote>
    </SlideLayout>
  )
}

const PE_BEFORE = [
  '받은 명세대로 기능을 구현해요',
  '코드를 잘 치는 사람이 잘하는 사람이에요',
  '기획·디자인·개발이 칸으로 나뉘어요',
]
const PE_AFTER = [
  '문제와 사용자에서 시작해요',
  'AI를 옆에 두고 아이디어부터 배포까지 끌고 가요',
  '기능이 아니라 제품 성과로 평가받아요',
]

/** C3. 개편의 결과 — 프로덕트 엔지니어 */
export function ProductEngineerSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <Search size={44} className="text-accent" />
        <SlideKicker>집에 가서 이 단어로 검색해보세요</SlideKicker>
      </div>
      <SlideHeadline size="hero">프로덕트 엔지니어</SlideHeadline>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-6">
          <PanelLabel>지금까지의 기준</PanelLabel>
          <ul className="flex flex-1 flex-col gap-4">
            {PE_BEFORE.map((item) => (
              <li key={item} className="text-deck-body text-content-secondary line-through decoration-content-muted">
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-6">
          <PanelLabel tone="accent">요즘 뜨는 기준</PanelLabel>
          <ul className="flex flex-1 flex-col gap-4">
            {PE_AFTER.map((item) => (
              <li key={item} className="text-deck-body font-semibold text-content-strong">
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </CompareGrid>

      <SlideBody>
        구현은 자동화되는데 <Mark>문제를 정의하는 일은 자동화가 안 돼요.</Mark> 그래서 뽑는 조건이 그쪽으로 옮겨가는
        중이에요.
      </SlideBody>
    </SlideLayout>
  )
}

const CHAIN = ['성향에 맞아요', '오래 해요', '실력이 쌓여요', '어느 판에서든 뽑혀요']

/** C4. 오늘의 프레임 — 시장은 참고자료, 성향은 엔진 */
export function FrameSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <Compass size={44} className="text-accent" />
        <SlideHeadline size="hero">
          시장은 <span className="text-content-secondary">참고자료</span>, 성향은 <Mark>엔진</Mark>
        </SlideHeadline>
      </div>

      <Panel tone="sunken" pad="lg" className="animate-rise-2">
        <p className="text-deck-body text-content-secondary">
          판은 <span className="text-content-strong">2~4년</span>마다 또 바뀌어요. 그때마다 방향을 갈아엎을 순 없잖아요.
        </p>
      </Panel>

      <ol className="grid gap-4 lg:grid-cols-7">
        {CHAIN.map((step, index) => (
          <li
            key={step}
            className={cx(
              'flex items-center gap-4',
              index === 3 ? 'lg:col-span-1' : 'lg:col-span-2',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <span
              className={cx(
                'flex-1 rounded-card px-7 py-6 text-deck-caption font-bold',
                index === CHAIN.length - 1
                  ? 'bg-accent text-accent-contrast shadow-lifted'
                  : 'bg-surface-raised text-content-primary shadow-raised',
              )}
            >
              {step}
            </span>
            {index < CHAIN.length - 1 ? <ArrowRight size={28} className="shrink-0 text-content-muted" /> : null}
          </li>
        ))}
      </ol>

      <SlideBody>그래서 오늘은 시장 얘기 말고 성향부터 봐요.</SlideBody>
    </SlideLayout>
  )
}

