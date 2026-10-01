import { Check, Eye, PencilLine, TriangleAlert } from 'lucide-react'
import type { ComponentType } from 'react'
import { useState } from 'react'
import type { SlideProps } from '../../../deck'
import { Chip, cx, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout } from '../../../deck'
import type { Grade } from '../model/progress'
import { useNote } from '../model/progress'
import type { AskType, PracticeProblem } from '../model/problems'
import { examHeading, isAcademyProblem } from '../model/problems'
import { unitOf } from '../model/units'
import { CodeBlock } from '../ui/CodeBlock'
import { ExamBlockView } from '../ui/ExamBlock'
import { RichText } from '../ui/RichText'
import { SampleTable } from '../ui/SampleTable'
import { TableList } from '../ui/TableList'

const GRADE_BUTTONS: Array<{ grade: Grade; label: string; tone: string }> = [
  { grade: 'got', label: '맞혔다', tone: 'bg-positive text-content-inverse' },
  { grade: 'unsure', label: '애매하다', tone: 'bg-caution text-content-inverse' },
  { grade: 'missed', label: '못 썼다', tone: 'bg-surface-inverse text-content-inverse' },
]

/** 코드를 써야 하는 문제는 답 칸도 고정폭 글꼴로 맞춘다. 줄을 맞춰 써 봐야 절이 빠진 게 보인다. */
const CODE_TYPES: AskType[] = ['코드 빈칸', '코드 작성', '오류']

/** 답 칸의 안내 문구. 문제 모양마다 써야 하는 분량이 달라서 따로 둔다 */
const PLACEHOLDER: Record<AskType, string> = {
  서술: '아는 만큼 써 보세요. 물은 개수만큼 줄을 나눠 씁니다.',
  용어: '이름만 정확히 씁니다. (a), (b)가 있으면 줄을 나눠 씁니다.',
  빈칸: '빈칸 번호를 붙여 하나씩 씁니다.',
  고르기: '고른 기호를 모두 씁니다.',
  '코드 빈칸': '빈칸에 들어갈 코드만 씁니다. 빈칸이 여러 개면 (a), (b)로 줄을 나눠 씁니다.',
  '코드 작성': '실행할 수 있게 끝까지 써 보세요. 쉼표와 괄호까지 씁니다.',
  '실행 결과': '실행하면 나오는 값을 그대로 씁니다. 이유를 물었으면 이어서 씁니다.',
  오류: '이유를 먼저 쓰고, 고친 코드를 이어서 씁니다.',
}

function AnswerPanel({ problem, grade, onGrade }: { problem: PracticeProblem; grade: Grade | null; onGrade: (grade: Grade) => void }) {
  return (
    <>
      {/* 안쪽 여백을 sm으로 둬야 1080p에서 정답 코드가 한 줄에 50자까지 들어간다 */}
      <Panel tone="raised" pad="sm" className="animate-rise flex flex-col gap-4">
        <PanelLabel tone="accent">정답</PanelLabel>
        {problem.answer.map((line) => (
          <div key={line} className="flex items-start gap-3">
            <Check className="mt-1 size-5 shrink-0 text-positive md:size-6" strokeWidth={3} />
            <p className="text-deck-caption font-semibold text-content-strong">
              <RichText text={line} />
            </p>
          </div>
        ))}
        {problem.answerCode ? <CodeBlock lines={problem.answerCode} /> : null}
        {problem.explain?.map((line) => (
          <p key={line} className="text-deck-caption text-content-secondary">
            <RichText text={line} />
          </p>
        ))}
      </Panel>

      {problem.trap ? (
        <Panel tone="overlay" pad="sm" className="animate-rise-1 flex items-start gap-3">
          <TriangleAlert className="mt-0.5 size-6 shrink-0 text-caution md:size-7" />
          <div className="flex flex-col gap-1">
            <p className="text-deck-caption font-semibold tracking-widest text-caution uppercase">자주 틀리는 지점</p>
            <p className="text-deck-caption font-semibold text-content-strong">
              <RichText text={problem.trap} />
            </p>
          </div>
        </Panel>
      ) : null}

      <div className="animate-rise-2 flex flex-col gap-2">
        <PanelLabel>스스로 채점하기</PanelLabel>
        <div className="grid grid-cols-3 gap-2">
          {GRADE_BUTTONS.map((button) => {
            const on = grade === button.grade
            return (
              <button
                key={button.grade}
                type="button"
                onClick={() => onGrade(button.grade)}
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
        <p className="text-deck-meta text-content-muted">못 썼거나 애매한 문제는 마지막 정리 화면에 단원별로 모입니다.</p>
      </div>
    </>
  )
}

/**
 * 문제 하나가 화면 하나.
 * 왼쪽에 문제와 답 칸, 오른쪽에 정답을 둔다. 정답은 버튼을 눌러야 열리고,
 * 이미 채점한 문제로 돌아오면 열린 채로 보여 준다.
 * 문제 칸은 기출 시험지처럼 "번호. 문장 (배점)" 아래에 대괄호 이름을 단 덩어리를 쌓는다.
 * 표본과 테이블은 정답을 열기 전까지 비어 있는 오른쪽에 둔다. 왼쪽에 함께 쌓으면
 * [코드]가 긴 문제에서 답 칸이 1080p 화면 밖으로 밀려난다.
 */
export function makeProblemSlide(problem: PracticeProblem): ComponentType<SlideProps> {
  const academy = isAcademyProblem(problem)
  const unit = academy ? null : unitOf(problem.unit)

  return function ProblemSlide() {
    const { note, setDraft, setGrade } = useNote(problem.no)
    const [open, setOpen] = useState(note.grade !== null)
    const code = CODE_TYPES.includes(problem.askType)

    return (
      <SlideLayout align="top">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>
            {academy ? `학원 제공 예시 · ${problem.section} ${problem.sourceNo}번` : `${problem.no}번 · ${unit?.key}. ${unit?.title}`}
          </SlideKicker>
          <span className={academy ? 'rounded-full bg-caution-soft px-4 py-2 text-deck-caption font-bold text-caution' : ''}>
            {academy ? '학원에서 직접 제공한 문제' : <Chip tone="accent">{examHeading(problem)}</Chip>}
          </span>
        </div>

        <SlideHeadline>{problem.title}</SlideHeadline>

        {/* min-w-0: 긴 코드 줄이 그리드 칸을 밀어내 모바일에서 화면이 옆으로 넓어지지 않게 */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <div className="flex min-w-0 flex-col gap-4">
            {/* 아래에 [보기]·[코드]가 붙는 문제는 덩어리까지 한 화면에 들어오도록 여백과 문장을 한 단계 작게 둔다 */}
            <Panel tone={academy ? 'raised' : 'accentSoft'} pad={problem.blocks ? 'sm' : 'md'} className={cx('flex min-w-0 flex-col gap-3', academy && 'border-2 border-caution')}>
              <p className={cx('font-bold text-content-strong', problem.blocks ? 'text-deck-caption' : 'text-deck-body')}>
                <span className={academy ? 'text-caution' : 'text-accent'}>{academy ? problem.sourceNo : problem.no}.</span>{' '}
                <RichText text={problem.question} />{' '}
                {!academy ? <span className="font-semibold text-content-secondary">({problem.points}점)</span> : null}
              </p>
              {problem.blocks?.map((block) => (
                <ExamBlockView key={block.label} block={block} />
              ))}
            </Panel>

            <Panel tone="raised" pad="sm" className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <PencilLine className="size-6 shrink-0 text-accent md:size-7" />
                <PanelLabel tone="accent">내 답</PanelLabel>
              </div>
              <textarea
                value={note.draft}
                onChange={(event) => setDraft(event.target.value)}
                spellCheck={false}
                placeholder={PLACEHOLDER[problem.askType]}
                className={cx(
                  'min-h-28 w-full resize-y rounded-card bg-surface-sunken p-4 text-deck-caption leading-relaxed text-content-primary inset-shadow-sunken outline-none placeholder:font-sans placeholder:text-content-muted focus:ring-2 focus:ring-accent',
                  code && 'font-mono',
                )}
              />
            </Panel>
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            {open ? (
              <AnswerPanel problem={problem} grade={note.grade} onGrade={setGrade} />
            ) : (
              <>
                {problem.sample ? <SampleTable /> : null}
                {problem.tables ? <TableList keys={problem.tables} /> : null}
                <Panel
                  tone="sunken"
                  pad={problem.sample || problem.tables ? 'md' : 'lg'}
                  className="flex grow flex-col items-center justify-center gap-5 text-center"
                >
                  <Eye className="size-9 text-content-muted md:size-12" />
                  <p className="text-deck-body font-semibold text-content-secondary">
                    왼쪽에 먼저 써 본 다음에 정답을 엽니다
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-deck-body font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck hover:bg-accent-strong md:px-10 md:py-4"
                  >
                    <Eye className="size-6 md:size-7" />
                    정답 보기
                  </button>
                  <p className="text-deck-meta text-content-muted">
                    정답과 해설{problem.trap ? ', 자주 틀리는 지점' : ''}이 열립니다
                  </p>
                </Panel>
              </>
            )}
          </div>
        </div>
      </SlideLayout>
    )
  }
}
