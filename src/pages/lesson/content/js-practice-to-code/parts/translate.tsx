import { ArrowRight, CheckCircle2, Lightbulb, PencilLine, Quote } from 'lucide-react'
import type { ComponentType } from 'react'
import type { SlideProps } from '../../../deck'
import { Chip, CompareGrid, cx, Mark, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideNote } from '../../../deck'
import type { TranslateProblem } from '../model/translate'
import {
  ATTEND,
  ATTEND_HINTS,
  DICTIONARY,
  FIVE_STEPS,
  LATTE,
  MENU,
  MENU_BLANK_CODE,
  MENU_BLANKS,
  MOVIE,
  MOVIE_ORDER,
  MOVIE_PIECES,
  MOVIE_TRAP,
  SHELL_COMMENTS,
  SHELL_FILLED,
  STOCK,
} from '../model/translate'
import { CardChip, StepBadge, TagChip } from '../ui/CardChip'
import { Code } from '../ui/Code'
import { StockDemo } from '../ui/demo/StockDemo'
import { OrderPuzzle } from '../ui/OrderPuzzle'
import { Reveal } from '../ui/Reveal'
import { StepRows } from '../ui/StepRows'

/** 문제 상황. 리드 글자로 쓰면 세 줄을 넘겨 아래 내용을 밀어내서 본문 크기 칸에 담는다 */
function Situation({ text }: { text: string }) {
  return (
    <Panel tone="sunken" pad="sm">
      <p className="text-deck-body text-content-primary">{text}</p>
    </Panel>
  )
}

/** 2부 도입 · 지난번에 멈춘 곳과 그때 빠져 있던 것 */
export function LastStopSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 2 · 한글 절차를 코드로</SlideKicker>
      <SlideHeadline>
        지난번에는 한글 규칙에서 멈췄습니다. 오늘은 <Mark>코드까지</Mark> 갑니다
      </SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>지난 수업의 도착점 · 라떼 문제</PanelLabel>
          <div className="flex items-start gap-3">
            <Quote className="mt-1 size-6 shrink-0 text-content-muted md:size-7" />
            <p className="text-deck-body font-semibold text-content-strong">{LATTE.related.text}</p>
          </div>
          <p className="mt-auto text-deck-caption text-content-secondary">숫자가 바뀌어도 통하는 규칙이었습니다. 여기까지는 이미 할 줄 압니다.</p>
        </Panel>
        <div className="flex items-center justify-center lg:col-span-1">
          <ArrowRight className="size-9 rotate-90 text-accent md:size-12 lg:rotate-0" />
        </div>
        <Panel tone="raised" pad="lg" className="flex flex-col gap-4 lg:col-span-4">
          <PanelLabel tone="accent">그때 빠져 있던 것</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">규칙의 말 하나하나를 어떤 코드로 바꿀지</p>
          <p className="text-deck-body text-content-secondary">‘각각 구한다’, ‘작은 값’ 같은 말을 코드로 바꾸는 사전이 없었습니다. 1부에서 모은 카드가 그 사전입니다.</p>
        </Panel>
      </div>

      <SlideNote tone="quiet">규칙은 이미 만들 줄 압니다 · 오늘은 옮기는 일 하나에만 힘을 씁니다</SlideNote>
    </SlideLayout>
  )
}

/** 2부 · 옮기는 다섯 단계 */
export function FiveStepsSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 2 · 옮기는 순서</SlideKicker>
      <SlideHeadline>
        옮기는 순서 <Mark>다섯 단계</Mark>
      </SlideHeadline>

      <div className="flex flex-col gap-3">
        {FIVE_STEPS.map((step, index) => (
          <Panel
            key={step.no}
            tone={index === 3 ? 'accentSoft' : 'raised'}
            pad="sm"
            className={cx('grid items-center gap-3 md:grid-cols-9 md:gap-5', `animate-rise-${index + 1}`)}
          >
            <div className="flex items-center gap-3 md:col-span-3">
              <StepBadge no={step.no} />
              <p className="text-deck-body font-bold text-content-strong">{step.head}</p>
            </div>
            <p className="text-deck-caption text-content-primary md:col-span-4">{step.detail}</p>
            <div className="flex md:col-span-2 md:justify-end">
              <Chip>{step.tool}</Chip>
            </div>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        지난 수업의 도구 넷이 그대로 들어 있습니다 · 새로 더한 것은 <Mark>4단계 하나</Mark>입니다
      </SlideNote>
    </SlideLayout>
  )
}

/** 2부 · 주석으로 먼저 쓰는 함수 껍데기 */
export function ShellSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 2 · 4단계를 손으로 하는 법</SlideKicker>
      <SlideHeadline>
        한글 절차를 <Mark>주석으로 먼저</Mark> 쓰고, 그 아래를 채웁니다
      </SlideHeadline>
      <CompareGrid>
        <Panel tone="sunken" pad="md" className="flex flex-col gap-3">
          <PanelLabel>먼저 · 주석만 쓴다</PanelLabel>
          <Code lines={SHELL_COMMENTS} tone="overlay" />
          <p className="text-deck-caption text-content-secondary">맨 위는 가져오기, 맨 아래는 보여주기로 매번 같습니다. 생각할 곳은 가운데뿐입니다.</p>
        </Panel>
        <Panel tone="raised" pad="md" className="flex flex-col gap-3">
          <PanelLabel tone="accent">다음 · 주석 아래에 카드를 붙인다</PanelLabel>
          <Code lines={SHELL_FILLED} />
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">1부 정답 파일도 전부 이 형태입니다 · 주석만 읽어도 무슨 일을 하는 함수인지 알 수 있습니다</SlideNote>
    </SlideLayout>
  )
}

/** 2부 · 절차에 나오는 말과 코드 사전 */
export function DictionarySlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 2 · 말 → 코드 사전</SlideKicker>
      <SlideHeadline>
        말 → <Mark>코드</Mark> 사전
      </SlideHeadline>
      <p className="text-deck-body text-content-secondary">카드 앞면을 한곳에 모았습니다. 절차를 쓰다 막히면 왼쪽 열에서 비슷한 말을 찾습니다.</p>

      <Panel tone="raised" pad="sm" className="flex flex-col gap-1.5">
        {DICTIONARY.map((row, index) => (
          <div
            key={row.say}
            className={cx(
              'grid gap-1 rounded-control px-4 py-1.5 md:grid-cols-9 md:items-center md:gap-4',
              index % 2 === 0 ? 'bg-surface-overlay' : 'bg-surface-raised',
            )}
          >
            <p className="text-deck-caption font-bold text-content-strong md:col-span-3">{row.say}</p>
            <p className="font-mono text-deck-caption break-words text-content-primary md:col-span-4">{row.code}</p>
            <div className="flex md:col-span-2 md:justify-end">
              <span className="rounded-full bg-surface-sunken px-3 py-1 text-deck-meta font-semibold whitespace-nowrap text-content-secondary inset-shadow-sunken">
                {row.from}
              </span>
            </div>
          </div>
        ))}
      </Panel>
    </SlideLayout>
  )
}

/** 1 · 2 · 3단계를 코드 없이 정리한 판. 예제와 백지 문제의 풀이 앞에서 쓴다 */
function PlanBoard({ problem }: { problem: TranslateProblem }) {
  return (
    <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-9">
      <div className="flex flex-col gap-3 lg:col-span-4">
        <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <StepBadge no={1} />
            <PanelLabel>꺼낼 것과 보여줄 것</PanelLabel>
          </div>
          <p className="text-deck-body font-semibold text-content-strong">
            {problem.take.join(' · ')} <ArrowRight className="inline size-6 text-accent" /> {problem.show}
          </p>
        </Panel>
        <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <StepBadge no={2} />
            <PanelLabel>기억할 그릇 · 이름 · 처음 값 · 뜻</PanelLabel>
          </div>
          {problem.bowls.map((bowl) => (
            <div key={bowl.name} className="flex flex-col rounded-control bg-surface-sunken px-3 py-1.5 inset-shadow-sunken">
              <p className="text-deck-caption text-content-primary">
                <span className="mr-2 font-mono font-bold text-content-strong">{bowl.name}</span>
                {bowl.meaning}
              </p>
              <p className="text-deck-meta text-content-muted">처음 · {bowl.start}</p>
            </div>
          ))}
        </Panel>
      </div>
      <Panel tone="raised" pad="sm" className="flex flex-col gap-3 lg:col-span-5">
        <div className="flex items-center gap-3">
          <StepBadge no={3} />
          <PanelLabel>한글 절차 · 한 줄에 동작 하나</PanelLabel>
        </div>
        {problem.before ? (
          <p className="rounded-control bg-surface-sunken px-3 py-2 text-deck-body font-semibold text-content-strong inset-shadow-sunken">
            0. {problem.before.say}
          </p>
        ) : null}
        {problem.lines.map((line, index) => (
          <p key={line.say} className={cx('text-deck-body font-semibold text-content-strong', `animate-rise-${Math.min(index + 1, 5)}`)}>
            {index + 1}. {line.say}
          </p>
        ))}
      </Panel>
    </div>
  )
}

/** 예제 라떼 · 1~3단계 */
export function ExamplePlanSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>예제 · {LATTE.title}</SlideKicker>
        <Chip>{LATTE.stair}</Chip>
      </div>
      <SlideHeadline>
        1~3단계는 <Mark>코드 없이</Mark>
      </SlideHeadline>
      <Situation text={LATTE.situation} />

      <PlanBoard problem={LATTE} />
    </SlideLayout>
  )
}

/** 작은 경우와 이 문제에서 짚을 한 가지. 코드 아래에 한 띠로 붙인다 */
function CheckAndInsight({ problem, insight = true }: { problem: TranslateProblem; insight?: boolean }) {
  return (
    <div className="grid items-stretch gap-3 md:gap-4 lg:grid-cols-9">
      <Panel tone="sunken" pad="sm" className={cx('flex flex-col gap-2', insight ? 'lg:col-span-5' : 'lg:col-span-9')}>
        <PanelLabel>5 · 작은 경우로 확인</PanelLabel>
        <div className="flex flex-wrap gap-2">
          {problem.checks.map((check) => (
            <span key={check.input} className="rounded-control bg-surface-raised px-3 py-1 text-deck-meta text-content-secondary shadow-raised">
              {check.input} <ArrowRight className="inline size-4 text-content-muted" />{' '}
              <span className="font-bold text-content-strong">{check.expect}</span>
            </span>
          ))}
        </div>
      </Panel>
      {insight ? (
        <Panel tone="accentSoft" pad="sm" className="flex items-start gap-3 lg:col-span-4">
          <Lightbulb className="mt-1 size-6 shrink-0 text-accent md:size-7" />
          <p className="text-deck-caption font-semibold text-content-strong">{problem.insight}</p>
        </Panel>
      ) : null}
    </div>
  )
}

/** 풀이 화면 · 절차 한 줄과 코드를 나란히 놓고 작은 경우로 확인한다. 예제의 4~5단계도 이 화면이다 */
type AnswerOptions = {
  dense?: boolean
  /** 다음 화면이 같은 이야기를 이어서 하면 이 화면에서는 짚을 점 칸을 뺀다 */
  insight?: boolean
}

export function makeAnswerSlide(
  problem: TranslateProblem,
  kicker: string,
  headline: string,
  { dense = false, insight = true }: AnswerOptions = {},
): ComponentType<SlideProps> {
  return function AnswerSlide() {
    return (
      <SlideLayout align="top">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>{kicker}</SlideKicker>
          <Chip>4단계 · 줄마다 카드</Chip>
        </div>
        <SlideHeadline>{headline}</SlideHeadline>

        <StepRows head={problem.head} rows={problem.lines} before={problem.before} dense={dense} />

        <CheckAndInsight problem={problem} insight={insight} />
      </SlideLayout>
    )
  }
}

/** 한글 절차를 카드 칩과 함께 번호 붙여 보여 준다. 연습 문제 화면에서 쓴다 */
function ProcedureList({ problem, withCards }: { problem: TranslateProblem; withCards: boolean }) {
  const rows = [...(problem.before ? [{ no: 0, line: problem.before }] : []), ...problem.lines.map((line, index) => ({ no: index + 1, line }))]
  return (
    <Panel tone="raised" pad="sm" className="flex flex-col gap-3">
      <PanelLabel>한글 절차</PanelLabel>
      {rows.map(({ no, line }) => (
        <div key={line.say} className="flex items-start gap-3">
          <StepBadge no={no} />
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-1">
            <p className="mr-1 text-deck-caption font-bold text-content-strong">{line.say}</p>
            {withCards ? line.cards.map((card) => <CardChip key={card} no={card} />) : null}
            {withCards && line.tag ? <TagChip>{line.tag}</TagChip> : null}
          </div>
        </div>
      ))}
    </Panel>
  )
}

/** 연습 1 · 영화표 · 순서 맞추기 */
export function MovieQuestionSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>연습 1 · {MOVIE.mode}</SlideKicker>
        <Chip>{MOVIE.stair}</Chip>
      </div>
      <SlideHeadline>영화표 · 조각을 순서대로</SlideHeadline>

      <Panel tone="sunken" pad="sm" className="grid gap-2 md:grid-cols-2 md:gap-x-6">
        <p className="text-deck-body text-content-primary md:col-span-2">{MOVIE.situation}</p>
        {MOVIE.lines.map((line, index) => (
          <p key={line.say} className="text-deck-caption font-bold text-content-strong">
            {index + 1}. {line.say}
          </p>
        ))}
      </Panel>

      <OrderPuzzle pieces={MOVIE_PIECES} answer={MOVIE_ORDER} />
    </SlideLayout>
  )
}

/** 연습 1 풀이 · 순서와 함정 조각 */
export function MovieAnswerSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>연습 1 풀이 · {MOVIE.title}</SlideKicker>
        <Chip>순서 · ㄷ → ㅁ → ㄴ → ㄱ</Chip>
      </div>
      <SlideHeadline>
        절차 순서가 곧 <Mark>코드 순서</Mark>
      </SlideHeadline>

      <StepRows head={MOVIE.head} rows={MOVIE.lines} dense />

      <div className="grid items-stretch gap-3 md:gap-4 lg:grid-cols-9">
        <Panel tone="sunken" pad="sm" className="flex flex-col gap-1 lg:col-span-5">
          <PanelLabel>쓰지 않은 조각 {MOVIE_TRAP.label} · if (hour &gt;= 18)</PanelLabel>
          <p className="text-deck-caption font-semibold text-content-strong">{MOVIE_TRAP.why}</p>
        </Panel>
        <Panel tone="accentSoft" pad="sm" className="flex items-start gap-3 lg:col-span-4">
          <Lightbulb className="mt-1 size-6 shrink-0 text-accent md:size-7" />
          <p className="text-deck-caption font-semibold text-content-strong">{MOVIE.insight}</p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

/** 연습 2 · 메뉴 합계 · 빈칸 채우기 */
export function MenuQuestionSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>연습 2 · {MENU.mode}</SlideKicker>
        <Chip>{MENU.stair}</Chip>
      </div>
      <SlideHeadline>메뉴 합계 · 빈칸 세 개</SlideHeadline>
      <Situation text={MENU.situation} />

      <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-9">
        <div className="flex flex-col gap-3 lg:col-span-3">
          <ProcedureList problem={MENU} withCards={false} />
          <Panel tone="sunken" pad="sm" className="flex flex-col gap-1">
            <PanelLabel>{MENU.related.label}</PanelLabel>
            <p className="text-deck-caption text-content-secondary">{MENU.related.text}</p>
          </Panel>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-6">
          <Code lines={MENU_BLANK_CODE} />
          <div className="grid gap-3 md:grid-cols-3">
            {MENU_BLANKS.map((blank) => (
              <div key={blank.mark} className="flex flex-col gap-2 rounded-card bg-surface-raised p-3 shadow-raised">
                <p className="text-deck-caption font-semibold text-content-primary">
                  <span className="mr-2 font-bold text-content-strong">({blank.mark})</span>
                  {blank.hint}
                </p>
                <Reveal label="열기" className="mt-auto py-2 md:py-2">
                  <p className="rounded-control bg-surface-sunken px-3 py-2 font-mono text-deck-caption font-bold break-all text-content-strong inset-shadow-sunken">
                    {blank.answer}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}

/** 연습 3 · 재고 · 절차를 보고 코드 쓰기 */
export function StockQuestionSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>연습 3 · {STOCK.mode}</SlideKicker>
        <Chip>{STOCK.stair}</Chip>
      </div>
      <SlideHeadline>{STOCK.title}</SlideHeadline>
      <Situation text={STOCK.situation} />

      <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-9">
        <div className="lg:col-span-5">
          <ProcedureList problem={STOCK} withCards />
        </div>
        <div className="flex flex-col gap-3 lg:col-span-4">
          <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
            <PanelLabel>화면</PanelLabel>
            <p className="text-deck-caption font-semibold text-content-strong">{STOCK.screen}</p>
          </Panel>
          <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
            <PanelLabel>그릇</PanelLabel>
            {STOCK.bowls.map((bowl) => (
              <p key={bowl.name} className="text-deck-caption text-content-primary">
                <span className="mr-2 font-mono font-bold text-content-strong">{bowl.name}</span>
                {bowl.meaning} · 처음 {bowl.start}
              </p>
            ))}
          </Panel>
          <Panel tone="accentSoft" pad="sm" className="flex items-start gap-3">
            <PencilLine className="mt-1 size-6 shrink-0 text-accent md:size-7" />
            <p className="text-deck-caption font-semibold text-content-strong">
              절차 여섯 줄을 주석으로 먼저 옮겨 적고, 줄마다 옆의 카드를 붙입니다. 다 쓰면 다음 화면에서 맞춰 봅니다.
            </p>
          </Panel>
        </div>
      </div>
    </SlideLayout>
  )
}

/** 연습 3 다음 · 그릇 위치를 바꿔 보는 화면 */
export function StockPlaceSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>연습 3 · 0번 줄을 함수 밖에 둔 이유</SlideKicker>
        <Chip>도구 3 · 그릇의 뜻</Chip>
      </div>
      <SlideHeadline>
        그릇을 <Mark>어디에 두느냐</Mark>가 얼마나 오래 기억하느냐를 정합니다
      </SlideHeadline>

      <div className="grid items-start gap-4 md:gap-6 lg:grid-cols-9">
        <div className="lg:col-span-5">
          <StockDemo />
        </div>
        <div className="flex flex-col gap-3 lg:col-span-4">
          <Panel tone="raised" pad="md" className="flex flex-col gap-2">
            <PanelLabel>함수 안에 둔 그릇</PanelLabel>
            <p className="text-deck-body text-content-primary">함수가 실행될 때 생기고, 함수가 끝나면 사라집니다. 누를 때마다 새로 7개입니다.</p>
          </Panel>
          <Panel tone="raised" pad="md" className="flex flex-col gap-2">
            <PanelLabel>함수 밖에 둔 그릇</PanelLabel>
            <p className="text-deck-body text-content-primary">페이지가 열려 있는 동안 남아 있습니다. 누를 때마다 줄어든 값에서 이어 갑니다.</p>
          </Panel>
          <Panel tone="sunken" pad="sm">
            <p className="text-deck-caption text-content-secondary">지난 수업의 ‘프로그램은 상태를 바꾸는 절차’에서 상태가 바로 이 그릇입니다.</p>
          </Panel>
        </div>
      </div>
    </SlideLayout>
  )
}

/** 연습 4 · 출석 · 백지에서 */
export function AttendQuestionSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>연습 4 · {ATTEND.mode}</SlideKicker>
        <Chip tone="accent">{ATTEND.stair}</Chip>
      </div>
      <SlideHeadline>{ATTEND.title}</SlideHeadline>
      <Situation text={ATTEND.situation} />

      <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-9">
        <div className="flex flex-col gap-3 lg:col-span-5">
          <Panel tone="sunken" pad="sm" className="flex flex-col gap-1">
            <PanelLabel>{ATTEND.related.label}</PanelLabel>
            <p className="text-deck-caption text-content-secondary">{ATTEND.related.text}</p>
          </Panel>
          <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
            <PanelLabel>화면과 재료</PanelLabel>
            <p className="text-deck-caption font-semibold text-content-strong">{ATTEND.screen}</p>
            <p className="font-mono text-deck-caption text-content-primary">['A01', 'B02', 'A01', 'C03', 'B02']</p>
          </Panel>
          <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
            <PanelLabel>빈 종이에 다섯 단계를 차례로</PanelLabel>
            <div className="flex flex-wrap gap-2">
              {FIVE_STEPS.map((step) => (
                <span key={step.no} className="flex items-center gap-2 rounded-full bg-surface-sunken px-3 py-1 inset-shadow-sunken">
                  <CheckCircle2 className="size-4 shrink-0 text-content-muted md:size-5" />
                  <span className="text-deck-caption font-semibold text-content-primary">
                    {step.no}. {step.head}
                  </span>
                </span>
              ))}
            </div>
          </Panel>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-4">
          <PanelLabel>막히면 하나씩 엽니다</PanelLabel>
          {ATTEND_HINTS.map((hint, index) => (
            <Reveal key={hint} label={`힌트 ${index + 1}`}>
              <Panel tone="raised" pad="sm" className="flex items-start gap-3">
                <StepBadge no={index + 1} />
                <p className="pt-1 text-deck-caption font-semibold text-content-strong">{hint}</p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}

/** 연습 4 풀이 앞 · 1~3단계를 먼저 맞춰 본다 */
export function AttendPlanSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>연습 4 풀이 · 1~3단계</SlideKicker>
        <Chip>코드보다 먼저</Chip>
      </div>
      <SlideHeadline>
        그릇이 숫자 하나로는 모자란 문제입니다
      </SlideHeadline>
      <PlanBoard problem={ATTEND} />
    </SlideLayout>
  )
}
