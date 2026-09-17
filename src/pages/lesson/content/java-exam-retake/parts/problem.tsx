import { Brain, Check, CircleHelp, Lightbulb, PencilLine, Star, TriangleAlert, X } from 'lucide-react'
import type { ComponentType } from 'react'
import { useState } from 'react'
import type { SlideProps } from '../../../deck'
import { Chip, cx, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout } from '../../../deck'
import type { Grade } from '../model/progress'
import { useNote } from '../model/progress'
import type { QuizProblem } from '../model/problems'

function CodeBlock({ lines, tone = 'dark' }: { lines: string[]; tone?: 'dark' | 'soft' }) {
  return (
    <pre
      className={cx(
        'overflow-x-auto rounded-card p-4 text-deck-caption md:p-6',
        tone === 'dark'
          ? 'bg-surface-inverse text-content-inverse shadow-lifted'
          : 'bg-surface-sunken text-content-primary inset-shadow-sunken',
      )}
    >
      <code>
        {lines.map((line, index) => (
          <span key={`${index}-${line}`} className="block w-fit min-w-full whitespace-pre">
            {line || ' '}
          </span>
        ))}
      </code>
    </pre>
  )
}

/** 중요도 별 3개. 앞 번호일수록 꽉 찬다. */
function Stars({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`중요도 ${count}단계`}>
      {[1, 2, 3].map((step) => (
        <Star
          key={step}
          className={cx('size-5 md:size-6', step <= count ? 'fill-accent text-accent' : 'text-content-muted')}
        />
      ))}
    </span>
  )
}

function ProblemMeta({ problem }: { problem: QuizProblem }) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3">
      <Stars count={problem.stars} />
      <Chip>{problem.askType}</Chip>
      <Chip tone="accent">{problem.points}점</Chip>
    </div>
  )
}

/** 홀수 화면: 문제를 읽고 직접 답을 써 보는 화면 */
export function makeQuestionSlide(problem: QuizProblem): ComponentType<SlideProps> {
  return function QuestionSlide() {
    const { note, setDraft } = useNote(problem.no)
    const [openHints, setOpenHints] = useState(0)

    return (
      <SlideLayout align="top">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>
            예상문제 {problem.no} · {problem.unit}
          </SlideKicker>
          <ProblemMeta problem={problem} />
        </div>

        <SlideHeadline>{problem.title}</SlideHeadline>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <div className="flex flex-col gap-4">
            <Panel tone="accentSoft" pad="md" className="flex flex-col gap-3">
              <PanelLabel tone="accent">문제</PanelLabel>
              <p className="text-deck-body font-bold text-content-strong">{problem.question}</p>
            </Panel>

            {problem.questionCode ? <CodeBlock lines={problem.questionCode} /> : null}

            <div className="flex flex-col gap-2">
              {problem.hints.map((hint, index) =>
                index < openHints ? (
                  <Panel key={hint} tone="sunken" pad="sm" className="flex items-start gap-3">
                    <Lightbulb className="mt-0.5 size-5 shrink-0 text-caution md:size-6" />
                    <p className="text-deck-caption font-semibold text-content-primary">{hint}</p>
                  </Panel>
                ) : null,
              )}
              {openHints < problem.hints.length ? (
                <button
                  type="button"
                  onClick={() => setOpenHints((value) => value + 1)}
                  className="flex items-center justify-center gap-2 rounded-full bg-surface-raised px-4 py-3 text-deck-caption font-semibold text-content-secondary shadow-raised transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary"
                >
                  <CircleHelp className="size-5 md:size-6" />
                  힌트 열기 ({openHints + 1}/{problem.hints.length})
                </button>
              ) : null}
            </div>
          </div>

          <Panel tone="raised" pad="md" className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <PencilLine className="size-6 shrink-0 text-accent md:size-7" />
              <PanelLabel tone="accent">먼저 내 답을 써 보세요</PanelLabel>
            </div>
            <textarea
              value={note.draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="아는 만큼만 써도 됩니다. 한 줄이라도 쓰고 넘어가야 다음 화면에서 비교가 됩니다."
              className="min-h-40 w-full resize-y rounded-card bg-surface-sunken p-4 text-deck-caption leading-relaxed text-content-primary inset-shadow-sunken outline-none placeholder:text-content-muted focus:ring-2 focus:ring-accent md:min-h-56"
            />
            <p className="text-deck-meta text-content-muted">
              쓴 내용은 이 브라우저에 저장됩니다. 다음 화면에서 모범 답안과 나란히 놓고 채점합니다.
            </p>
          </Panel>
        </div>
      </SlideLayout>
    )
  }
}

const GRADE_BUTTONS: Array<{ grade: Grade; label: string; tone: string }> = [
  { grade: 'got', label: '맞혔다', tone: 'bg-positive text-content-inverse' },
  { grade: 'unsure', label: '애매하다', tone: 'bg-caution text-content-inverse' },
  { grade: 'missed', label: '못 썼다', tone: 'bg-surface-inverse text-content-inverse' },
]

/** 짝수 화면: 모범 답안과 내 답을 나란히 놓고 자가 채점하는 화면 */
export function makeAnswerSlide(problem: QuizProblem): ComponentType<SlideProps> {
  return function AnswerSlide() {
    const { note, setGrade } = useNote(problem.no)
    const [checked, setChecked] = useState<string[]>([])

    const toggle = (keyword: string) => {
      setChecked((list) => (list.includes(keyword) ? list.filter((item) => item !== keyword) : [...list, keyword]))
    }

    return (
      <SlideLayout align="top">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>
            {problem.no}번 풀이 · {problem.unit}
          </SlideKicker>
          <ProblemMeta problem={problem} />
        </div>

        <Panel tone="accent" pad="md" className="flex items-start gap-4">
          <Brain className="mt-0.5 size-7 shrink-0 md:size-9" />
          <div className="flex flex-col gap-1">
            <PanelLabel tone="inverse">{problem.rote ? '이해하려 하지 말고 그냥 외우세요' : '이 한 줄만 외우세요'}</PanelLabel>
            <p className="text-deck-lead font-bold">{problem.memorize}</p>
          </div>
        </Panel>

        <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Panel tone="raised" pad="md" className="flex flex-col gap-3">
              <PanelLabel tone="accent">모범 답안</PanelLabel>
              {problem.answer.map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-positive md:size-6" strokeWidth={3} />
                  <p className="text-deck-caption font-semibold text-content-strong">{line}</p>
                </div>
              ))}
            </Panel>

            {problem.answerCode ? <CodeBlock lines={problem.answerCode} /> : null}

            <Panel tone="sunken" pad="sm" className="flex flex-col gap-2">
              <PanelLabel>내가 쓴 답</PanelLabel>
              <p className="text-deck-caption whitespace-pre-wrap text-content-primary">
                {note.draft.trim() || '앞 화면에서 아무것도 쓰지 않았습니다. 돌아가서 한 줄이라도 써 보세요.'}
              </p>
            </Panel>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-4">
            <Panel tone="raised" pad="sm" className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-3">
                <PanelLabel tone="accent">채점 키워드</PanelLabel>
                <span className="text-deck-caption font-bold tabular-nums text-content-strong">
                  {checked.length} / {problem.keywords.length}
                </span>
              </div>
              <p className="text-deck-meta text-content-muted">내 답에 들어간 것만 눌러서 체크해 보세요.</p>
              <div className="flex flex-col gap-2">
                {problem.keywords.map((keyword) => {
                  const on = checked.includes(keyword)
                  return (
                    <button
                      key={keyword}
                      type="button"
                      onClick={() => toggle(keyword)}
                      aria-pressed={on}
                      className={cx(
                        'flex items-center gap-3 rounded-card px-3 py-2.5 text-left transition duration-200 ease-deck',
                        on ? 'bg-accent-soft' : 'bg-surface-sunken hover:bg-surface-highlight',
                      )}
                    >
                      <span
                        className={cx(
                          'grid size-6 shrink-0 place-items-center rounded-control md:size-7',
                          on ? 'bg-accent text-accent-contrast' : 'bg-surface-raised text-content-muted',
                        )}
                      >
                        <Check className="size-4 md:size-5" strokeWidth={3} />
                      </span>
                      <span
                        className={cx(
                          'text-deck-caption font-semibold',
                          on ? 'text-content-strong' : 'text-content-secondary',
                        )}
                      >
                        {keyword}
                      </span>
                    </button>
                  )
                })}
              </div>
            </Panel>

            {problem.trap ? (
              <Panel tone="accentSoft" pad="sm" className="flex items-start gap-3">
                <TriangleAlert className="mt-0.5 size-6 shrink-0 text-caution md:size-7" />
                <div className="flex flex-col gap-1">
                  <PanelLabel tone="accent">자주 틀리는 지점</PanelLabel>
                  <p className="text-deck-caption font-semibold text-content-strong">{problem.trap}</p>
                </div>
              </Panel>
            ) : null}

            <div className="flex flex-col gap-2">
              <PanelLabel>스스로 채점하기</PanelLabel>
              <div className="grid grid-cols-3 gap-2">
                {GRADE_BUTTONS.map((button) => {
                  const on = note.grade === button.grade
                  return (
                    <button
                      key={button.grade}
                      type="button"
                      onClick={() => setGrade(button.grade)}
                      aria-pressed={on}
                      className={cx(
                        'flex items-center justify-center gap-2 rounded-full px-3 py-3 text-deck-caption font-bold transition duration-200 ease-deck',
                        on
                          ? `${button.tone} shadow-lifted`
                          : 'bg-surface-raised text-content-secondary shadow-raised hover:bg-surface-highlight',
                      )}
                    >
                      {on ? <Check className="size-5" strokeWidth={3} /> : null}
                      {button.label}
                    </button>
                  )
                })}
              </div>
              <p className="flex items-center gap-2 text-deck-meta text-content-muted">
                <X className="size-4 shrink-0" />
                못 쓴 문제는 마지막 정리 화면에 모아서 다시 보여 줍니다.
              </p>
            </div>
          </div>
        </div>
      </SlideLayout>
    )
  }
}
