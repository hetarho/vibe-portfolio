import { RotateCcw, Undo2 } from 'lucide-react'
import { useEffect, useState } from 'react'
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
} from '@/features/slide-deck'
import { QUESTIONS, TENDENCY_COUNT, TRACK_INFO, useAptitude, type Choice } from '../model/aptitude'

function firstUnanswered(answers: Array<Choice | null>) {
  const index = answers.findIndex((answer) => answer === null)
  return index === -1 ? QUESTIONS.length : index
}

/** C4. ⭐ 개발 성향 체크 — 13문항 A/B */
export function AptitudeTestSlide() {
  const { answers, answer, reset, result } = useAptitude()
  const [current, setCurrent] = useState(() => firstUnanswered(answers))

  const question = QUESTIONS[Math.min(current, QUESTIONS.length - 1)]
  const done = current >= QUESTIONS.length && result !== null

  const choose = (choice: Choice) => {
    if (current >= QUESTIONS.length) return
    answer(current, choice)
    setCurrent((value) => value + 1)
  }

  useEffect(() => {
    // 1 / 2 로도 고를 수 있게. 덱의 방향키와 겹치지 않는 키만 쓴다.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === '1') choose('A')
      else if (event.key === '2') choose('B')
      else if (event.key === 'Backspace') {
        event.preventDefault()
        setCurrent((value) => Math.max(value - 1, 0))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  if (done && result) {
    const info = TRACK_INFO[result.track]
    const bCount = TENDENCY_COUNT - result.aCount

    return (
      <SlideLayout>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <SlideKicker>내 결과</SlideKicker>
          <button
            type="button"
            onClick={() => {
              reset()
              setCurrent(0)
            }}
            className="flex items-center gap-3 rounded-full bg-surface-raised px-7 py-3 text-deck-caption font-semibold text-content-secondary shadow-raised transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary"
          >
            <RotateCcw size={24} />
            다시 하기
          </button>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-9">
          <Panel tone="accent" pad="lg" className="animate-pop flex flex-col gap-5 lg:col-span-5">
            <PanelLabel tone="inverse">{info.label}</PanelLabel>
            <p className="text-deck-title font-bold">{info.line}</p>
            <p className="text-deck-body font-semibold opacity-80">{info.detail}</p>
          </Panel>

          <Panel tone="raised" pad="lg" className="flex flex-col justify-center gap-6 lg:col-span-4">
            <div className="flex items-baseline justify-between">
              <p className="text-deck-body font-bold text-content-strong">A(화면) {result.aCount}</p>
              <p className="text-deck-body font-bold text-content-secondary">{bCount} B(구조)</p>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: TENDENCY_COUNT }).map((_, index) => (
                <span
                  key={index}
                  className={cx(
                    'h-4 flex-1 rounded-full',
                    index < result.aCount ? 'bg-accent' : 'bg-surface-highlight',
                  )}
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Chip tone={result.platform === 'web' ? 'accent' : 'quiet'}>웹 {result.wCount}</Chip>
              <Chip tone={result.platform === 'app' ? 'accent' : 'quiet'}>
                앱 {QUESTIONS.length - TENDENCY_COUNT - result.wCount}
              </Chip>
              <span className="text-deck-caption text-content-muted">플랫폼은 참고만</span>
            </div>
          </Panel>
        </div>

        {result.track === 'frontend' && result.platform === 'app' ? (
          <SlideNote>FE 성향 + 앱 선호 → 모바일 앱 개발도 후보에 넣어보세요</SlideNote>
        ) : (
          <SlideNote tone="quiet">
            3번(뿌듯함)과 6번(파고들고 싶은 문제)에 뭐라고 답했는지 다시 보세요 — 거기가 제일 중요해요
          </SlideNote>
        )}
      </SlideLayout>
    )
  }

  const label = question.axis === 'tendency' ? { a: 'A', b: 'B' } : { a: 'W', b: 'P' }

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <SlideKicker>
          {question.axis === 'tendency' ? '1부 · 성향 축 (화면 vs 구조)' : '2부 · 플랫폼 축 (웹 vs 앱)'}
        </SlideKicker>
        <div className="flex items-center gap-4">
          <span className="text-deck-caption font-semibold tabular-nums text-content-muted">
            {current + 1} / {QUESTIONS.length}
          </span>
          <button
            type="button"
            onClick={() => setCurrent((value) => Math.max(value - 1, 0))}
            disabled={current === 0}
            aria-label="이전 문항"
            className="grid size-14 place-items-center rounded-full bg-surface-raised text-content-secondary shadow-raised transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary disabled:opacity-30"
          >
            <Undo2 size={24} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {QUESTIONS.map((item, index) => (
          <span
            key={item.no}
            className={cx(
              'h-3 flex-1 rounded-full transition duration-300 ease-deck',
              index === current ? 'bg-accent' : answers[index] ? 'bg-surface-highlight' : 'bg-surface-sunken',
            )}
          />
        ))}
      </div>

      <p className="text-deck-caption font-semibold tracking-widest text-content-muted uppercase">
        {question.no}번 · 더 가까운 쪽을 고르세요
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {(['A', 'B'] as const).map((choice) => {
          const picked = answers[current] === choice
          return (
            <button
              key={choice}
              type="button"
              onClick={() => choose(choice)}
              className={cx(
                'flex min-h-64 flex-col gap-6 rounded-panel p-10 text-left transition duration-300 ease-deck hover:-translate-y-2',
                picked
                  ? 'bg-accent text-accent-contrast shadow-lifted'
                  : 'bg-surface-raised text-content-primary shadow-raised hover:bg-surface-overlay',
              )}
            >
              <span
                className={cx(
                  'grid size-16 place-items-center rounded-full text-deck-body font-bold',
                  picked ? 'bg-accent-contrast/15 text-accent-contrast' : 'bg-surface-sunken text-content-secondary',
                )}
              >
                {choice === 'A' ? label.a : label.b}
              </span>
              <span className="text-deck-body font-semibold">{choice === 'A' ? question.a : question.b}</span>
            </button>
          )
        })}
      </div>

      <p className="text-deck-caption text-content-muted">
        키보드 <Mark>1</Mark> / <Mark>2</Mark> 로도 고를 수 있어요 · Backspace 이전 문항
      </p>
    </SlideLayout>
  )
}

const SCORING = [
  { range: 'A 7개 이상', verdict: 'FE 성향 뚜렷', tone: 'accent' as const },
  { range: 'B 7개 이상', verdict: 'BE 성향 뚜렷', tone: 'raised' as const },
  { range: '5 ± 1개', verdict: '데이터 부족 → 풀스택형 출발', tone: 'raised' as const },
]

/** C5. 채점 · 해석 가이드 */
export function AptitudeGuideSlide() {
  const { result } = useAptitude()

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <SlideHeadline>이렇게 읽으면 돼요</SlideHeadline>
        {result ? <Chip tone="accent">내 결과 · {TRACK_INFO[result.track].label}</Chip> : null}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {SCORING.map((item, index) => (
          <Panel
            key={item.range}
            tone={item.tone}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <PanelLabel tone={item.tone === 'accent' ? 'inverse' : 'muted'}>{item.range}</PanelLabel>
            <p className={cx('text-deck-body font-bold', item.tone === 'accent' ? '' : 'text-content-strong')}>
              {item.verdict}
            </p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="lg" className="flex flex-col gap-3">
        <PanelLabel>플랫폼(W/P)은 참고만</PanelLabel>
        <p className="text-deck-body text-content-secondary">
          FE 성향 + P가 나왔다면 모바일 앱 개발도 후보에 넣으세요.
        </p>
      </Panel>

      <SlideNote>
        3번과 6번을 다시 보세요 — 뭘 고칠 때 시간 가는 줄 몰랐는지
      </SlideNote>

      <SlideBody>풀스택형이 나왔다고 실패한 게 아니에요. 처음 6개월 기초는 어차피 겹쳐요.</SlideBody>
    </SlideLayout>
  )
}
