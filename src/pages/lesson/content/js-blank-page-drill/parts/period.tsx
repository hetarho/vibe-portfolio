import { ArrowRight, Clock, ExternalLink, Eye, MessageCircleQuestion, RotateCcw, StepForward } from 'lucide-react'
import type { ComponentType } from 'react'
import { useState } from 'react'
import type { SlideProps } from '../../../deck'
import { Chip, cx, Mark, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout } from '../../../deck'
import type { DrillProblem, Stuck } from '../model/drill'
import { CART, CART_BLANKS, CART_STUCK, caseExpect, CLEAR_CART, drillHref, drillOf, PERIODS, SHELLS } from '../model/drill'
import { DrillCode } from '../ui/DrillCode'
import { StepTabs } from '../ui/StepTabs'

type Period = (typeof PERIODS)[number]

/** 교시 시작 · 손풀기 패턴, 오늘 문제, 시간표 */
export function makePeriodSlide(period: Period): ComponentType<SlideProps> {
  return function PeriodSlide() {
    const shells = SHELLS.filter((shell) => period.shells.includes(shell.key))
    // 껍데기 코드 자체는 '껍데기 네 개' 화면에 있다. 여기서는 몇 번 칠지만 보여 준다
    return (
      <SlideLayout align="top">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>{period.no}교시 시작</SlideKicker>
          <Chip>60분</Chip>
        </div>
        <SlideHeadline>
          {period.no}교시 · <Mark>{period.title}</Mark>
        </SlideHeadline>

        <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-9">
          <Panel tone="raised" pad="sm" className="flex flex-col gap-3 lg:col-span-5">
            <PanelLabel tone="accent">손풀기 · 00-blank.html{period.shells.includes('D') ? '#D' : ''}</PanelLabel>
            {shells.map((shell) => (
              <div key={shell.key} className="flex items-center justify-between gap-3 rounded-control bg-surface-overlay px-4 py-2">
                <p className="text-deck-body font-bold text-content-strong">
                  패턴 {shell.key} · {shell.name}
                </p>
                <span className="shrink-0 text-deck-caption text-content-secondary">다섯 판</span>
              </div>
            ))}
            <p className="text-deck-caption text-content-secondary">1판은 보고, 2판부터는 가리고 · 첫 판과 마지막 판 시간을 비교합니다</p>
          </Panel>

          <Panel tone="sunken" pad="sm" className="flex flex-col gap-2 lg:col-span-4">
            <PanelLabel>시간표</PanelLabel>
            {period.plan.map((row, index) => (
              <div key={row.time} className={cx('flex items-start gap-3', `animate-rise-${index + 1}`)}>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-surface-raised px-3 py-1 text-deck-meta font-semibold text-content-secondary shadow-raised">
                  <Clock className="size-4 shrink-0" />
                  {row.time}
                </span>
                <p className="pt-0.5 text-deck-caption font-semibold text-content-strong">{row.what}</p>
              </div>
            ))}
          </Panel>
        </div>

        {period.problems.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {period.problems.map((id) => {
              const problem = drillOf(id)
              return (
                <Chip key={id}>
                  {problem.no} {problem.title} · {problem.focus}
                </Chip>
              )
            })}
          </div>
        ) : null}
      </SlideLayout>
    )
  }
}

/** 문제 · 설명과 다섯 Step 파일 */
export function makeStepsSlide(problem: DrillProblem): ComponentType<SlideProps> {
  return function StepsSlide() {
    return (
      <SlideLayout align="top">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>
            {problem.period} · {problem.no} {problem.title}
          </SlideKicker>
          <Chip>{problem.focus}</Chip>
        </div>

        <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-9">
          <div className="flex flex-col gap-3 lg:col-span-3">
            <SlideHeadline>{problem.title}</SlideHeadline>
            <Panel tone="sunken" pad="sm" className="flex flex-col gap-2">
              <PanelLabel>문제</PanelLabel>
              {problem.desc.map((line) => (
                <p key={line} className="text-deck-caption text-content-primary">
                  {line}
                </p>
              ))}
            </Panel>
            <a
              href={drillHref(problem)}
              target="_blank"
              rel="noreferrer"
              className="flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-deck-caption font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck hover:opacity-90"
            >
              <ExternalLink className="size-5 shrink-0" />
              Step 1부터 실습 열기
            </a>
          </div>
          <div className="lg:col-span-6">
            <StepTabs problem={problem} />
          </div>
        </div>
      </SlideLayout>
    )
  }
}

function StuckList({ items }: { items: Stuck[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <Panel key={item.mistake} tone="raised" pad="sm" className={cx('flex flex-col gap-2', `animate-rise-${index + 2}`)}>
          <p className="text-deck-body font-bold text-content-strong">{item.mistake}</p>
          <p className="rounded-control bg-surface-sunken px-3 py-1.5 font-mono text-deck-caption text-content-secondary inset-shadow-sunken">{item.seen}</p>
          <p className="flex items-start gap-2 text-deck-caption font-semibold text-content-primary">
            <MessageCircleQuestion className="mt-1 size-5 shrink-0 text-accent md:size-6" />“{item.ask}”
          </p>
        </Panel>
      ))}
    </div>
  )
}

/** 문제 · 「채점하기」가 넣어 보는 작은 경우와 자주 막히는 곳 */
export function makeCheckSlide(problem: DrillProblem): ComponentType<SlideProps> {
  return function CheckSlide() {
    return (
      <SlideLayout align="top">
        <SlideKicker>
          {problem.no} {problem.title} · 확인과 막히는 곳
        </SlideKicker>
        <SlideHeadline>
          답을 말하기 전에 <Mark>질문</Mark>을 하나 던집니다
        </SlideHeadline>

        <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-9">
          <Panel tone="sunken" pad="sm" className="animate-rise-1 flex flex-col gap-2 lg:col-span-4">
            <PanelLabel>「채점하기」가 넣어 보는 작은 경우</PanelLabel>
            {problem.cases.map((item) => (
              <p key={item.label} className="flex flex-wrap items-center gap-x-2 text-deck-caption text-content-secondary">
                {item.label}
                <ArrowRight className="size-4 shrink-0 text-content-muted" />
                <span className="font-bold text-content-strong">{caseExpect(item)}</span>
              </p>
            ))}
          </Panel>
          <div className="lg:col-span-5">
            <StuckList items={problem.stuck} />
          </div>
        </div>
      </SlideLayout>
    )
  }
}

/** for 한 바퀴씩 · 사탕 쏙쏙을 손으로 돌려 본다 */
const TRACE_COUNT = 3

export function LoopTraceSlide() {
  // -1은 for에 들어가기 전, 0~2는 그 바퀴를 막 끝낸 때
  const [lap, setLap] = useState(-1)
  const done = lap >= TRACE_COUNT - 1
  const candies = lap + 1

  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>3교시 · for를 손으로 돌려 보기</SlideKicker>
        <Chip>count = {TRACE_COUNT}</Chip>
      </div>
      <SlideHeadline>
        한 바퀴마다 <Mark>그릇이 한 줄씩</Mark> 길어집니다
      </SlideHeadline>

      <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-9">
        <div className="flex flex-col gap-3 lg:col-span-5">
          <DrillCode
            lines={["let html = '';", `for (let i = 0; i < count; i++) {`, "  html += '<li>사탕</li>';", '}', "document.getElementById('result').innerHTML = html;"]}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setLap(lap + 1)}
              disabled={done}
              className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-deck-caption font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck disabled:opacity-40"
            >
              <StepForward className="size-5 shrink-0" />한 바퀴 돌리기
            </button>
            <button
              type="button"
              onClick={() => setLap(-1)}
              className="flex items-center gap-2 rounded-full bg-surface-raised px-5 py-2.5 text-deck-caption font-semibold text-content-primary shadow-raised transition duration-200 ease-deck hover:bg-surface-highlight"
            >
              <RotateCcw className="size-5 shrink-0" />
              처음부터
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-4">
          <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
            <PanelLabel>그릇 종이</PanelLabel>
            <div className="grid grid-cols-9 gap-2 rounded-control bg-surface-sunken px-3 py-1.5 text-deck-meta font-semibold text-content-muted inset-shadow-sunken">
              <span className="col-span-2">i</span>
              <span className="col-span-2">i &lt; {TRACE_COUNT} ?</span>
              <span className="col-span-5">html</span>
            </div>
            {Array.from({ length: candies }, (_, index) => (
              <div key={index} className="animate-rise grid grid-cols-9 gap-2 px-3 font-mono text-deck-caption text-content-strong">
                <span className="col-span-2">{index}</span>
                <span className="col-span-2 text-positive">예</span>
                <span className="col-span-5 truncate">{"'" + '<li>사탕</li>'.repeat(index + 1) + "'"}</span>
              </div>
            ))}
            {done ? (
              <div className="animate-rise grid grid-cols-9 gap-2 px-3 font-mono text-deck-caption text-content-strong">
                <span className="col-span-2">{TRACE_COUNT}</span>
                <span className="col-span-2 text-critical">아니오</span>
                <span className="col-span-5 font-sans text-content-secondary">멈추고 아래 줄로</span>
              </div>
            ) : null}
            {lap === -1 ? <p className="px-3 font-mono text-deck-caption text-content-secondary">html = '' · 아직 한 바퀴도 안 돌았다</p> : null}
          </Panel>

          <Panel tone="sunken" pad="sm" className="flex min-h-24 flex-wrap items-center gap-2">
            {done ? (
              Array.from({ length: TRACE_COUNT }, (_, index) => (
                <span
                  key={index}
                  className={cx('rounded-full bg-surface-overlay px-4 py-1.5 text-deck-caption font-bold text-content-strong shadow-overlay', `animate-rise-${index + 1}`)}
                >
                  🍬 사탕
                </span>
              ))
            ) : (
              <p className="text-deck-caption text-content-muted">화면은 반복이 다 끝난 다음 한 번에 바뀝니다</p>
            )}
          </Panel>
        </div>
      </div>
    </SlideLayout>
  )
}

/** 4교시 · 장바구니 빈칸 여덟 개와 조립 순서 */
export function CartBlanksSlide() {
  const [open, setOpen] = useState<string[]>([])
  const groups = ['이벤트 연결', '에러 처리', '계산', '출력']

  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>4교시 · 07 장바구니 조립</SlideKicker>
        <a
          href={`/html-practice/drill/${CART.folder}/${CART.page}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-deck-caption font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck hover:opacity-90"
        >
          <ExternalLink className="size-5 shrink-0" />
          장바구니 실습 열기
        </a>
      </div>
      <SlideHeadline>
        빈칸 여덟 개를 <Mark>조립 순서대로</Mark> 하나씩
      </SlideHeadline>

      <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-9">
        <Panel tone="sunken" pad="sm" className="flex flex-col gap-2 lg:col-span-3">
          <PanelLabel>문제</PanelLabel>
          {CART.desc.map((line) => (
            <p key={line} className="text-deck-caption text-content-primary">
              {line}
            </p>
          ))}
          <p className="mt-2 rounded-control bg-surface-raised px-3 py-2 text-deck-caption font-semibold text-content-strong shadow-raised">
            하나 채울 때마다 저장하고 눌러 봅니다
          </p>
        </Panel>

        <div className="grid gap-3 md:grid-cols-2 lg:col-span-6">
          {groups.map((group, groupIndex) => (
            <Panel key={group} tone="raised" pad="sm" className={cx('flex flex-col gap-2', `animate-rise-${groupIndex + 1}`)}>
              <PanelLabel tone="accent">
                {['①', '②', '③', '④'][groupIndex]} {group}
              </PanelLabel>
              {CART_BLANKS.filter((blank) => blank.group === group).map((blank) => {
                const shown = open.includes(blank.mark)
                return (
                  <button
                    key={blank.mark}
                    type="button"
                    onClick={() => setOpen(shown ? open.filter((mark) => mark !== blank.mark) : [...open, blank.mark])}
                    className="flex flex-col gap-1 rounded-control bg-surface-overlay px-3 py-2 text-left transition duration-200 ease-deck hover:bg-surface-highlight"
                  >
                    <span className="flex items-start justify-between gap-2 text-deck-caption font-semibold text-content-strong">
                      <span>
                        <span className="mr-2 rounded-control bg-accent px-1 font-mono font-bold text-accent-contrast">빈칸_{blank.mark}</span>
                        {blank.hint}
                      </span>
                      {shown ? null : <Eye className="mt-1 size-5 shrink-0 text-content-muted" aria-label="눌러서 열기" />}
                    </span>
                    {shown ? <span className="animate-rise font-mono text-deck-caption font-bold text-positive">{blank.answer}</span> : null}
                  </button>
                )
              })}
            </Panel>
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}

/** 4교시 · 직접 쓰는 clearCart와 확인 */
export function CartCheckSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>4교시 · 마지막 조각과 확인</SlideKicker>
      <SlideHeadline>
        ⑤ clearCart는 <Mark>직접</Mark> 씁니다
      </SlideHeadline>

      <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-9">
        <div className="flex flex-col gap-3 lg:col-span-4">
          <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
            <PanelLabel>파일에 있는 것</PanelLabel>
            <DrillCode
              lines={['function clearCart() {', '  // 1. 총액 그릇을 0으로 되돌린다', '', '  // 2. 목록(id: list)을 비운다', '', "  // 3. 결과(id: result)에 '총액 0원'을 보여준다", '', '}']}
              size="meta"
            />
          </Panel>
          <RevealCode lines={CLEAR_CART} />
        </div>
        <div className="lg:col-span-5">
          <StuckList items={CART_STUCK} />
        </div>
      </div>
    </SlideLayout>
  )
}

/** 먼저 써 본 다음에 여는 코드 칸. 화면을 넘겼다 돌아오면 다시 닫힌다 */
function RevealCode({ lines }: { lines: string[] }) {
  const [open, setOpen] = useState(false)
  if (open) return <DrillCode lines={lines} size="meta" tone="overlay" className="animate-rise" />
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="flex w-full items-center justify-center gap-3 rounded-card bg-surface-sunken px-4 py-4 text-deck-caption font-semibold text-content-muted inset-shadow-sunken transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary"
    >
      <Eye className="size-5 shrink-0 md:size-6" />다 쓰고 나서 맞춰 보기
    </button>
  )
}
