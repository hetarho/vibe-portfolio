import { ArrowRight, Compass, Quote, TriangleAlert } from 'lucide-react'
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
  SlideNote,
} from '@/features/slide-deck'

/** C0. 대기 화면 — 사전 설치 확인 */
export function StandbySlide() {
  const [checks, setChecks] = useState([false, false, false])
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="grid items-center gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-7 lg:col-span-5">
          <SlideKicker>곧 시작합니다</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            진로 찾기 &amp;
            <br />
            <Mark>AI 시대 개발 공부법</Mark>
          </h1>
          <SlideBody>2부는 눈으로만 보는 시간이 아닙니다. 오른쪽 세 가지를 지금 확인해 주세요.</SlideBody>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>사전 설치 확인</PanelLabel>
          <CheckRow checked={checks[0]} onToggle={() => toggle(0)} hint="로그인까지 되어 있어야 합니다">
            Claude 계정
          </CheckRow>
          <CheckRow checked={checks[1]} onToggle={() => toggle(1)} hint="터미널에서 claude 명령이 뜨는지">
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
            오늘 나가는 것 ① 내 성향을 근거로 세운 <span className="text-content-strong">방향 가설</span>
          </p>
        </Panel>
        <Panel tone="sunken" pad="md" className="flex items-center gap-5">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary">
            2
          </span>
          <p className="text-deck-caption text-content-secondary">
            오늘 나가는 것 ② 혼자 굴릴 수 있는 <span className="text-content-strong">학습 레포</span>
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

/** C1. 오프닝 — 흔들리는 게 정상이다 */
export function ShakySlide() {
  return (
    <SlideLayout>
      <SlideKicker>오프닝</SlideKicker>

      <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-6">
        <Quote size={44} className="text-accent" />
        <p className="text-deck-lead font-semibold text-content-strong">
          &ldquo;교수님이 BE가 취업 잘 된다고 해서 BE를 골랐는데,
          <br />
          다시 물어보니 FE가 좋은 것 같다고 하시더라고요.&rdquo;
        </p>
        <p className="text-deck-caption text-content-muted">— 얼마 전 상담한 학생</p>
      </Panel>

      <SlideHeadline>
        오늘 이 방에 있는 <Mark>다수의 이야기</Mark>입니다
      </SlideHeadline>
      <SlideBody>흔들리는 게 이상한 게 아니라, 근거가 남의 것이라 흔들리는 겁니다.</SlideBody>
    </SlideLayout>
  )
}

const CHAIN = ['성향에 맞는다', '오래 한다', '실력이 쌓인다', '어떤 시장에서든 뽑힌다']

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
          시장 전망은 여러분 졸업 시점, <span className="text-content-strong">2~4년 뒤</span>에 달라져 있을 수
          있습니다.
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
    </SlideLayout>
  )
}

/** C3. 성향 체크 전 주의 멘트 */
export function DisclaimerSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col items-center gap-10 text-center">
        <TriangleAlert size={56} className="text-caution" />
        <SlideHeadline size="hero">
          이건 심리검사가 아니라
          <br />
          <Mark>대화 시작 도구</Mark>입니다
        </SlideHeadline>
        <p className="text-deck-lead text-content-secondary">결과가 여러분을 규정하지 않습니다.</p>
      </div>

      <SlideNote tone="quiet">13문항 · 답은 저장되고, 다음 화면에서 같이 해석합니다</SlideNote>
    </SlideLayout>
  )
}
