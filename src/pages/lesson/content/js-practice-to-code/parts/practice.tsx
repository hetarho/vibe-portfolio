import { FileCode2, Lightbulb, Link2, TriangleAlert } from 'lucide-react'
import type { ComponentType } from 'react'
import { useState } from 'react'
import type { SlideProps } from '../../../deck'
import { CheckRow, Chip, cx, Mark, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote } from '../../../deck'
import type { Move, PracticeProblem } from '../model/practice'
import { cardsNew, FILE_SKELETON, INDEX_LINKS, PRACTICE, ROUTINE, ZERO_RESULTS } from '../model/practice'
import { CardChip, StepBadge } from '../ui/CardChip'
import { Code } from '../ui/Code'
import { DesignTable } from '../ui/DesignTable'
import { Reveal } from '../ui/Reveal'
import { StepRows } from '../ui/StepRows'

/** P4. 1부 진행 방법 · 쉬운 순서와 문제마다 거치는 네 단계 */
export function PracticeRoutineSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 1 · 실습문제 다섯 개</SlideKicker>
      <SlideHeadline>
        학원 번호 대신 <Mark>쉬운 순서</Mark>로 풉니다
      </SlideHeadline>
      <SlideLead>앞 문제에서 쓴 카드가 뒤 문제에 다시 나오고, 문제마다 새 카드는 한두 장씩만 늘어납니다.</SlideLead>

      <div className="grid items-start gap-4 md:gap-6 lg:grid-cols-9">
        <div className="flex flex-col gap-2 lg:col-span-5">
          {PRACTICE.map((problem, index) => (
            <div
              key={problem.academyNo}
              className={cx(
                'grid items-center gap-2 rounded-card bg-surface-raised px-4 py-3 shadow-raised md:grid-cols-9 md:gap-4',
                `animate-rise-${index + 1}`,
              )}
            >
              <div className="flex items-center gap-3 md:col-span-4">
                <StepBadge no={index + 1} />
                <div className="flex flex-col">
                  <p className="text-deck-body font-bold text-content-strong">{problem.short}</p>
                  <p className="font-mono text-deck-meta text-content-muted">practice{problem.academyNo}.html</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:col-span-5">
                {cardsNew(index).map((card) => (
                  <CardChip key={card} no={card} />
                ))}
              </div>
            </div>
          ))}
          <p className="px-2 text-deck-caption text-content-muted">오른쪽 칩은 그 문제에서 처음 쓰는 카드입니다</p>
        </div>

        <Panel tone="sunken" pad="md" className="flex flex-col gap-4 lg:col-span-4">
          <PanelLabel tone="accent">문제마다 같은 네 단계</PanelLabel>
          {ROUTINE.map((step, index) => (
            <div key={step.no} className={cx('flex items-start gap-3', `animate-rise-${index + 1}`)}>
              <StepBadge no={step.no} />
              <div className="flex flex-col">
                <p className="text-deck-body font-bold text-content-strong">{step.head}</p>
                <p className="text-deck-caption text-content-secondary">{step.detail}</p>
              </div>
            </div>
          ))}
        </Panel>
      </div>
    </SlideLayout>
  )
}

/** P5. 준비 · 파일 여섯 개와 index.html */
export function SetupSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 1 · 준비</SlideKicker>
      <SlideHeadline>
        파일 다섯 개와 <Mark>링크 다섯 개</Mark>
      </SlideHeadline>

      <div className="grid items-start gap-4 md:gap-6 lg:grid-cols-2">
        <Panel tone="raised" pad="md" className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <FileCode2 className="size-6 shrink-0 text-accent md:size-7" />
            <p className="text-deck-caption font-semibold text-content-secondary">practice1.html ~ practice5.html · 모두 이 뼈대로</p>
          </div>
          <Code lines={FILE_SKELETON} size="meta" />
          <p className="text-deck-caption text-content-secondary">제목 두 곳과 가운데만 문제마다 바뀝니다. script는 화면 칸들 아래, body 맨 끝에 둡니다.</p>
        </Panel>
        <Panel tone="raised" pad="md" className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Link2 className="size-6 shrink-0 text-accent md:size-7" />
            <p className="text-deck-caption font-semibold text-content-secondary">index.html · 연습문제 항목에 더하기</p>
          </div>
          <Code lines={INDEX_LINKS} size="meta" />
          <p className="text-deck-caption text-content-secondary">목차의 나머지 항목은 수업 시간에 만든 그대로 둡니다. 파일 이름의 번호는 학원 번호를 따릅니다.</p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

type Demo = ComponentType

/** 문제 화면 · 원문과 완성본을 나란히 놓는다. 학생이 먼저 눌러 보고 동작을 말로 정리한다 */
export function makeProblemSlide(problem: PracticeProblem, index: number, Demo: Demo): ComponentType<SlideProps> {
  return function ProblemSlide() {
    const fresh = cardsNew(index)
    return (
      <SlideLayout align="top">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>
            문제 {index + 1} / {PRACTICE.length} · Practice{problem.academyNo}
          </SlideKicker>
          <Chip>{problem.source}</Chip>
        </div>
        <SlideHeadline>{problem.title}</SlideHeadline>

        <div className="grid items-start gap-4 md:gap-6 lg:grid-cols-9">
          <div className="flex flex-col gap-3 lg:col-span-4">
            {/* 회원가입 원문은 열일곱 줄이라 칸 안에서 스크롤한다. 나머지 문제는 이 높이에 다 들어간다 */}
            <Panel tone="sunken" pad="sm" className="flex max-h-96 flex-col gap-2 overflow-y-auto">
              <PanelLabel>학원 문제 원문</PanelLabel>
              {problem.quote.map((line) => (
                <p key={line} className="text-deck-caption text-content-primary">
                  {line}
                </p>
              ))}
            </Panel>
            <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
              <PanelLabel tone="accent">이 문제에서 처음 쓰는 카드</PanelLabel>
              <div className="flex flex-wrap gap-2">
                {fresh.map((card) => (
                  <CardChip key={card} no={card} />
                ))}
              </div>
            </Panel>
            <p className="px-2 text-deck-caption text-content-secondary">
              먼저 눌러 보고, <Mark>무엇을 하면 무엇이 바뀌는지</Mark> 말로 정리합니다.
            </p>
          </div>
          <div className="lg:col-span-5">
            <Demo />
          </div>
        </div>
      </SlideLayout>
    )
  }
}

/** 화면 설계표 · 칸마다 태그와 id */
export function makeDesignSlide(problem: PracticeProblem, index: number): ComponentType<SlideProps> {
  return function DesignSlide() {
    return (
      <SlideLayout align="top">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>
            문제 {index + 1} · {problem.short} · 화면 설계표
          </SlideKicker>
          <Chip>2단계 · HTML</Chip>
        </div>
        <SlideHeadline>
          칸마다 <Mark>태그와 id</Mark>부터 정합니다
        </SlideHeadline>

        <DesignTable rows={problem.design} />

        <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
          {problem.designNotes.map((note, noteIndex) => (
            <Panel key={note} tone="sunken" pad="sm" className={cx('flex items-start gap-3', `animate-rise-${noteIndex + 1}`)}>
              <Lightbulb className="mt-1 size-5 shrink-0 text-accent md:size-6" />
              <p className="text-deck-caption font-semibold text-content-primary">{note}</p>
            </Panel>
          ))}
        </div>
      </SlideLayout>
    )
  }
}

/** 동작 화면 · 이벤트 하나에 함수 하나. 한글 순서를 보고 쳐 본 뒤에 단계마다 코드를 연다 */
export function makeMoveSlide(problem: PracticeProblem, index: number, move: Move, moveIndex: number): ComponentType<SlideProps> {
  return function MoveSlide() {
    return (
      <SlideLayout align="top">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>
            문제 {index + 1} · {problem.short} · 동작 {moveIndex + 1} / {problem.moves.length}
          </SlideKicker>
          <span className="max-w-full overflow-x-auto rounded-full bg-surface-sunken px-4 py-2 font-mono text-deck-meta whitespace-nowrap text-content-secondary inset-shadow-sunken">
            {move.wire}
          </span>
        </div>
        <SlideHeadline>{move.when}</SlideHeadline>

        <StepRows head={move.head} rows={move.steps} tail={move.tail} startAt={move.startAt} dense={move.dense} hidden />

        <Panel tone="accentSoft" pad="sm" className="flex items-start gap-3">
          <Lightbulb className="mt-1 size-6 shrink-0 text-accent md:size-7" />
          <p className="text-deck-caption font-semibold text-content-strong">{move.point}</p>
        </Panel>
      </SlideLayout>
    )
  }
}

/** 확인 화면 · 작은 경우를 하나씩 넣어 보며 체크하고, 자주 하는 실수를 점검한다 */
export function makeCheckSlide(problem: PracticeProblem, index: number, answerFile: string): ComponentType<SlideProps> {
  return function CheckSlide() {
    const [done, setDone] = useState<number[]>([])
    const toggle = (at: number) => setDone((list) => (list.includes(at) ? list.filter((item) => item !== at) : [...list, at]))

    return (
      <SlideLayout align="top">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>
            문제 {index + 1} · {problem.short} · 확인
          </SlideKicker>
          <Chip>4단계 · 작은 경우</Chip>
        </div>
        <SlideHeadline>
          내 파일을 열어 <Mark>하나씩 넣어 봅니다</Mark>
        </SlideHeadline>

        <div className="grid items-start gap-4 md:gap-6 lg:grid-cols-9">
          <div className="flex flex-col gap-2 lg:col-span-5">
            {problem.checks.map((check, at) => (
              <CheckRow key={check} checked={done.includes(at)} onToggle={() => toggle(at)}>
                {check}
              </CheckRow>
            ))}
          </div>
          <Panel tone="sunken" pad="md" className="flex flex-col gap-4 lg:col-span-4">
            <div className="flex items-center gap-3">
              <TriangleAlert className="size-6 shrink-0 text-caution md:size-7" />
              <PanelLabel>자주 하는 실수</PanelLabel>
            </div>
            {problem.traps.map((trap) => (
              <div key={trap.wrong} className="flex flex-col gap-1">
                <p className="text-deck-body font-bold text-content-strong">{trap.wrong}</p>
                <p className="text-deck-caption text-content-secondary">{trap.why}</p>
              </div>
            ))}
          </Panel>
        </div>

        <Reveal label={`정답 파일 practice${problem.academyNo}.html 전체 보기`}>
          <Code lines={answerFile.trimEnd().split('\n')} size="meta" className="max-h-96 overflow-y-auto" />
        </Reveal>
      </SlideLayout>
    )
  }
}

/** 계산기 · 0으로 나눈 경우를 알아내는 두 길. 지난 수업의 ‘같은 답을 설명하는 여러 방법’을 코드에서 다시 본다 */
export function ZeroDivisionSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>문제 3 · 계산기 · 0으로 나눈 경우</SlideKicker>
        <Chip>같은 답 · 두 가지 설명</Chip>
      </div>
      <SlideHeadline>
        0 나누기를 알아내는 <Mark>두 길</Mark>
      </SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-2">
        <Panel tone="raised" pad="md" className="flex flex-col gap-4">
          <PanelLabel>결과를 보고 판단 · 학원 힌트</PanelLabel>
          <p className="text-deck-body font-semibold text-content-strong">먼저 계산해 보고, 결과가 숫자가 아니면 연산불가</p>
          <div className="grid grid-cols-2 gap-2">
            {ZERO_RESULTS.map((row) => (
              <div key={row.expr} className="flex items-center justify-between gap-3 rounded-control bg-surface-sunken px-4 py-2 inset-shadow-sunken">
                <span className="font-mono text-deck-caption text-content-secondary">{row.expr}</span>
                <span className="font-mono text-deck-caption font-bold text-content-strong">{row.value}</span>
              </div>
            ))}
          </div>
          <Code lines={['if (isNaN(answer) || answer == Infinity', '    || answer == -Infinity) {']} />
          <p className="text-deck-caption text-content-secondary">세 결과 모두 자료형은 Number라서 값을 하나씩 비교합니다. NaN은 ==로 비교되지 않으니 isNaN을 씁니다.</p>
        </Panel>
        <Panel tone="raised" pad="md" className="flex flex-col gap-4">
          <PanelLabel>원인을 보고 판단 · 문제 문장 그대로</PanelLabel>
          <p className="text-deck-body font-semibold text-content-strong">계산하기 전에, 나누는 계산인데 나누는 수가 0인지 묻기</p>
          <div className="rounded-control bg-surface-sunken px-4 py-3 inset-shadow-sunken">
            <p className="text-deck-caption text-content-primary">“나누는 수가 0일 때 … (위 조건은 / 연산과 % 연산 모두 같음)”</p>
          </div>
          <Code lines={["if ((op == '/' || op == '%') && num2 == 0) {"]} />
          <p className="text-deck-caption text-content-secondary">문장의 ‘~이고’가 &&, ‘/ 또는 %’가 ||가 됐습니다. 이 길을 고르면 계산은 그다음에 합니다.</p>
        </Panel>
      </div>

      <SlideNote tone="quiet">
        둘 다 정답입니다 · <Mark>왜 그 길을 골랐는지</Mark> 말로 설명할 수 있으면 됩니다
      </SlideNote>
    </SlideLayout>
  )
}
