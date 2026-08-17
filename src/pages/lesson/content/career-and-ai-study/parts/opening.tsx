import { ArrowRight, Compass } from 'lucide-react'
import { useState } from 'react'
import {
  CheckRow,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideBody,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
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
          <SlideBody>2부는 같이 손을 씁니다. 시작 전에 옆의 세 가지만 확인할게요.</SlideBody>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>설치 확인</PanelLabel>
          <CheckRow checked={checks[0]} onToggle={() => toggle(0)} hint="로그인까지 되어 있어야 해요">
            Claude 계정
          </CheckRow>
          <CheckRow checked={checks[1]} onToggle={() => toggle(1)} hint="터미널에 claude 명령이 뜨는지">
            Claude Code 설치
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
    quote: 'AI가 코드를 다 써주는데, 내가 문법을 외울 필요가 있나',
    tail: '생산은 싸졌는데 학습 목표가 그대로예요',
  },
  {
    quote: '신입은 이제 어디서 시작하지',
    tail: '진입로가 흐려졌다는 말이 계속 들려요',
  },
  {
    quote: 'FE냐 BE냐, 정하지도 못했는데 학기가 갑니다',
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

const CHAIN = ['성향에 맞는다', '오래 한다', '실력이 쌓인다', '어느 시장에서든 뽑힌다']

/** C2. 오늘의 프레임 — 시장은 참고자료, 성향은 엔진 */
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
          지금 좋다는 시장은 졸업할 <span className="text-content-strong">2~4년 뒤</span>에 다른 얼굴을 하고 있어요.
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

      <SlideBody>그래서 오늘은 시장 얘기 말고 성향부터 봅니다.</SlideBody>
    </SlideLayout>
  )
}
