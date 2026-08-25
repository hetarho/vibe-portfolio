import { ArrowDown, ArrowRight, Bot, Check, Moon, Sunrise, X } from 'lucide-react'
import { Fragment, useState } from 'react'
import {
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
import { AI_REPORTS, DIAGNOSIS_STEPS, QUIZ, ROUTINE_END, ROUTINE_START } from '../model/git-samples'

/** G29. ⭐ "반영이 안 돼요" 진단 6단계 */
export function DiagnosisFlowSlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘 배운 걸 전부 접으면</SlideKicker>
      <SlideHeadline>&ldquo;반영이 안 돼요&rdquo;는 6단계로 짚어요</SlideHeadline>

      {/* 모바일에선 세로 흐름을 화살표로 잇고, 데스크톱 3x2에서는 ①~⑥ 번호가 순서를 말한다 */}
      <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
        {DIAGNOSIS_STEPS.map((step, index) => (
          <Fragment key={step.q}>
            <Panel
              tone={index === 5 ? 'accentSoft' : 'raised'}
              pad="sm"
              className={cx(
                'flex flex-col gap-2 p-4 md:gap-3 md:p-5',
                index === 0 && 'animate-rise-1',
                index === 1 && 'animate-rise-2',
                index === 2 && 'animate-rise-3',
                index === 3 && 'animate-rise-4',
                index === 4 && 'animate-rise-5',
                index === 5 && 'animate-rise-5',
              )}
            >
              {index === 5 ? <PanelLabel tone="accent">여기부터가 2회차</PanelLabel> : null}
              <p className="text-deck-body font-bold text-content-strong">{step.q}</p>
              <div className="flex">
                <Chip>{step.where}</Chip>
              </div>
              <p className="flex items-start gap-2 text-deck-caption font-semibold text-positive">
                <Check className="size-5 shrink-0 md:size-6" aria-hidden />
                통과: {step.ok}
              </p>
              <p className="mt-auto rounded-card bg-surface-sunken p-3 text-deck-caption text-content-secondary inset-shadow-sunken md:p-4">
                아니면 → {step.fix}
              </p>
            </Panel>
            {index < DIAGNOSIS_STEPS.length - 1 ? (
              <ArrowDown className="mx-auto size-6 text-content-muted lg:hidden" aria-hidden />
            ) : null}
          </Fragment>
        ))}
      </div>

      <SlideNote>
        순서가 생명이에요 —{' '}
        <span className="underline decoration-4 underline-offset-8">커밋 → 푸시 → 브랜치 → PR → 배포 → 브라우저</span>
      </SlideNote>
    </SlideLayout>
  )
}

/** G30. ⭐ 상황 판단 퀴즈 3문제 */
export function JudgmentQuizSlide() {
  const [quizIndex, setQuizIndex] = useState(0)
  // 문제마다 고른 보기를 따로 기억한다 — 문제를 오가도 채점 결과가 남는다
  const [picks, setPicks] = useState<Array<number | null>>(() => QUIZ.map(() => null))

  const question = QUIZ[quizIndex]
  const picked = picks[quizIndex]
  const choose = (optionIndex: number) =>
    setPicks((list) => list.map((value, itemIndex) => (itemIndex === quizIndex ? optionIndex : value)))

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <SlideHeadline>이번엔 내가 판단할 차례예요</SlideHeadline>
        <Chip tone="accent">
          {quizIndex + 1} / {QUIZ.length}
        </Chip>
      </div>

      <div className="flex flex-wrap gap-2">
        {QUIZ.map((item, index) => (
          <button
            key={item.situation}
            type="button"
            onClick={() => setQuizIndex(index)}
            className={cx(
              'rounded-full px-4 py-2 text-deck-caption font-semibold transition duration-200 ease-deck md:px-5 md:py-3',
              quizIndex === index
                ? 'bg-accent text-accent-contrast shadow-lifted'
                : 'bg-surface-raised text-content-secondary shadow-raised hover:bg-surface-highlight hover:text-content-primary',
            )}
          >
            문제 {index + 1}
          </button>
        ))}
      </div>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="raised" pad="lg" className="flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>상황</PanelLabel>
          <p className="text-deck-body text-content-primary">{question.situation}</p>
          {/* key: 문제를 바꿀 때마다 출력 상자의 등장 모션을 다시 돌린다 */}
          <div
            key={quizIndex}
            className="mt-auto animate-pop overflow-x-auto rounded-card bg-surface-sunken p-4 inset-shadow-sunken md:p-5"
          >
            <p className="font-mono text-deck-caption whitespace-pre text-content-strong">{question.output}</p>
          </div>
        </Panel>

        <div className="flex flex-col gap-3 lg:col-span-5">
          {question.options.map((option, index) => {
            const isPicked = picked === index
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => choose(index)}
                className={cx(
                  'flex flex-1 flex-col gap-2 rounded-card p-4 text-left transition duration-200 ease-deck md:p-6',
                  !isPicked && 'bg-surface-raised shadow-raised hover:bg-surface-highlight',
                  isPicked && (option.correct ? 'bg-positive-soft shadow-raised' : 'bg-critical-soft shadow-raised'),
                )}
              >
                <span className="flex items-start gap-3">
                  {isPicked ? (
                    option.correct ? (
                      <Check className="size-6 shrink-0 text-positive md:size-7" aria-hidden />
                    ) : (
                      <X className="size-6 shrink-0 text-critical md:size-7" aria-hidden />
                    )
                  ) : (
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-secondary md:size-8">
                      {index + 1}
                    </span>
                  )}
                  <span
                    className={cx(
                      'text-deck-body font-semibold',
                      !isPicked && 'text-content-primary',
                      isPicked && (option.correct ? 'text-positive' : 'text-critical'),
                    )}
                  >
                    {option.label}
                  </span>
                </span>
                {isPicked ? <span className="text-deck-caption text-content-secondary">{option.why}</span> : null}
              </button>
            )
          })}
        </div>
      </div>

      <SlideNote tone="quiet">
        셋 다 오늘 화면에서 봤던 판단이에요 — <Mark>출력 → 번역 → 시킬 말</Mark> 순서만 지키면 돼요
      </SlideNote>
    </SlideLayout>
  )
}

/** G31. AI의 보고를 확인하는 법 */
export function VerifyAiSlide() {
  return (
    <SlideLayout>
      <SlideKicker>의심이 아니라 계기판</SlideKicker>
      <SlideHeadline>AI의 세 마디, 확인은 세 곳</SlideHeadline>

      <div className="flex flex-col gap-4 md:gap-5">
        {AI_REPORTS.map((report, index) => (
          <Panel
            key={report.claim}
            tone="raised"
            pad="md"
            className={cx(
              'flex flex-col gap-3 lg:grid lg:grid-cols-9 lg:items-center lg:gap-6',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <div className="flex items-center gap-3 lg:col-span-3">
              <Bot className="size-6 shrink-0 text-content-muted md:size-8" />
              <p className="text-deck-body font-bold text-content-strong">{report.claim}</p>
            </div>
            <div className="flex items-center gap-3 lg:col-span-3">
              <ArrowRight className="hidden size-5 shrink-0 text-content-muted lg:block" aria-hidden />
              <div className="flex">
                <Chip>{report.verify}</Chip>
              </div>
            </div>
            <p className="text-deck-caption text-content-secondary lg:col-span-3">{report.look}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>파일럿도 자동항법을 믿지만 계기판은 읽어요.</SlideBody>

      <SlideNote tone="quiet">
        AI는 가끔 <Mark>한 일과 하려던 일을 섞어 말해요</Mark> — 출력이 진실이에요
      </SlideNote>
    </SlideLayout>
  )
}

/** 루틴 3단계 목록 — 앉을 때·일어날 때 두 패널이 같은 모양을 쓴다 */
function RoutineList({ items }: { items: typeof ROUTINE_START }) {
  return (
    <ol className="flex flex-1 flex-col gap-4 md:gap-5">
      {items.map((item, index) => (
        <li key={item.step} className="flex items-start gap-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-12">
            {index + 1}
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-deck-body font-bold text-content-strong">{item.step}</span>
            <span className="text-deck-caption text-content-secondary">{item.read}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

/** G32. ⭐ 받고 시작, 올리고 끝 */
export function SyncRoutineSlide() {
  return (
    <SlideLayout>
      <SlideKicker>컴퓨터를 바꿔도 안 꼬이는 습관</SlideKicker>
      <SlideHeadline>받고 시작, 올리고 끝</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-4 md:gap-6">
          <div className="flex items-center justify-between gap-4">
            <PanelLabel>자리에 앉으면</PanelLabel>
            <Sunrise className="size-6 text-content-muted md:size-8" />
          </div>
          <RoutineList items={ROUTINE_START} />
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 md:gap-6">
          <div className="flex items-center justify-between gap-4">
            <PanelLabel>일어나기 전</PanelLabel>
            <Moon className="size-6 text-content-muted md:size-8" />
          </div>
          <RoutineList items={ROUTINE_END} />
        </Panel>
      </CompareGrid>

      <SlideNote>
        <span className="underline decoration-4 underline-offset-8">받고 시작, 올리고 끝</span> — 이 여덟 글자만 지키면
        diverged를 만날 가능성이 크게 줄어요
      </SlideNote>
    </SlideLayout>
  )
}
