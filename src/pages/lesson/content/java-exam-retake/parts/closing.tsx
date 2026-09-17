import { BookOpen, Flame, RotateCcw, Timer, Trophy } from 'lucide-react'
import {
  Chip,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideLead,
  SlideNote,
} from '../../../deck'
import { useSummary } from '../model/progress'
import { QUIZ_PROBLEMS } from '../model/problems'

function titleOf(no: number) {
  return QUIZ_PROBLEMS.find((problem) => problem.no === no)?.title ?? ''
}

/** R106. 자가 채점 결과와 다시 볼 문제 목록 */
export function ReviewBoardSlide() {
  const { summary, reset } = useSummary()
  const again = [...summary.missed, ...summary.unsure].sort((a, b) => a - b)

  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>정리 · 내가 매긴 점수</SlideKicker>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 rounded-full bg-surface-raised px-4 py-2.5 text-deck-caption font-semibold text-content-secondary shadow-raised transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary"
        >
          <RotateCcw className="size-5 md:size-6" />
          기록 지우고 다시
        </button>
      </div>

      <SlideHeadline>다시 볼 문제만 남겨 둡니다</SlideHeadline>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-4">
        <Panel tone="accent" pad="md" className="flex flex-col gap-1">
          <PanelLabel tone="inverse">채점한 문제</PanelLabel>
          <p className="text-deck-title font-bold tabular-nums">
            {summary.graded} / {summary.total}
          </p>
        </Panel>
        <Panel tone="raised" pad="md" className="flex flex-col gap-1">
          <PanelLabel tone="accent">맞혔다</PanelLabel>
          <p className="text-deck-title font-bold tabular-nums text-positive">{summary.got.length}</p>
        </Panel>
        <Panel tone="raised" pad="md" className="flex flex-col gap-1">
          <PanelLabel tone="accent">애매하다</PanelLabel>
          <p className="text-deck-title font-bold tabular-nums text-caution">{summary.unsure.length}</p>
        </Panel>
        <Panel tone="raised" pad="md" className="flex flex-col gap-1">
          <PanelLabel tone="accent">못 썼다</PanelLabel>
          <p className="text-deck-title font-bold tabular-nums text-content-strong">{summary.missed.length}</p>
        </Panel>
      </div>

      <Panel tone="sunken" pad="md" className="flex flex-col gap-3">
        <PanelLabel>다시 볼 문제 · 못 썼다 + 애매하다</PanelLabel>
        {again.length === 0 ? (
          <p className="text-deck-body font-semibold text-content-primary">
            아직 채점한 문제가 없거나 전부 맞혔습니다. 앞으로 돌아가 문제를 풀고 채점해 보세요.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {again.map((no) => (
              <span
                key={no}
                className={cx(
                  'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-deck-caption font-semibold md:px-4 md:py-2',
                  summary.missed.includes(no)
                    ? 'bg-accent text-accent-contrast'
                    : 'bg-surface-highlight text-content-primary',
                )}
              >
                <span className="tabular-nums">{no}번</span>
                {titleOf(no)}
              </span>
            ))}
          </div>
        )}
        <p className="text-deck-meta text-content-muted">
          O 키를 누르면 전체 목록이 열립니다. 위 번호를 목록에서 찾아 바로 그 문제로 갈 수 있습니다.
        </p>
      </Panel>

      <SlideNote tone="quiet">
        전부 다시 보지 마세요. <Mark>여기 남은 번호만</Mark> 다시 보는 것이 남은 시간을 쓰는 가장 빠른 방법입니다
      </SlideNote>
    </SlideLayout>
  )
}

/** R107. 시험까지 남은 시간 쓰는 법 */
export function RoutineSlide() {
  return (
    <SlideLayout>
      <SlideKicker>시험까지 · 하루 루틴</SlideKicker>
      <SlideHeadline>새로 배우지 말고, 외운 것을 꺼내는 연습만 하세요</SlideHeadline>
      <SlideLead>읽어서 아는 것과 백지에 쓸 수 있는 것은 다릅니다. 지금부터는 쓰는 연습만 합니다.</SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <Panel tone="raised" pad="lg" className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <BookOpen className="size-7 shrink-0 text-accent md:size-9" />
            <PanelLabel tone="accent">매일 · 30분</PanelLabel>
          </div>
          <p className="text-deck-body font-bold text-content-strong">앞에서부터 열 문제씩 백지에 쓰기</p>
          <p className="text-deck-caption font-semibold text-content-secondary">
            화면을 보지 않고 먼저 씁니다. 다 쓴 뒤에 열어서 빠진 단어에 동그라미를 칩니다.
          </p>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Flame className="size-7 shrink-0 text-caution md:size-9" />
            <PanelLabel tone="accent">시험 전날</PanelLabel>
          </div>
          <p className="text-deck-body font-bold text-content-strong">다시 볼 문제로 표시된 번호만</p>
          <p className="text-deck-caption font-semibold text-content-secondary">
            새로운 문제를 더 보지 않습니다. 이미 애매한 것을 확실하게 만드는 편이 점수가 큽니다.
          </p>
        </Panel>

        <Panel tone="raised" pad="lg" className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Timer className="size-7 shrink-0 text-accent md:size-9" />
            <PanelLabel tone="accent">시험 직전 30분</PanelLabel>
          </div>
          <p className="text-deck-body font-bold text-content-strong">외울 열 줄만 소리 내서 읽기</p>
          <p className="text-deck-caption font-semibold text-content-secondary">
            C 키로 여는 화면입니다. 이 시점에 새 내용을 넣으면 외운 것까지 흔들립니다.
          </p>
        </Panel>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <Chip tone="accent">답안지를 빈칸으로 내지 않기</Chip>
        <Chip>개수를 물으면 그 개수만큼 줄 바꾸기</Chip>
        <Chip>용어는 영어 그대로 쓰기</Chip>
      </div>
    </SlideLayout>
  )
}

/** R108. 마지막 한마디 */
export function LastWordSlide() {
  return (
    <SlideLayout>
      <SlideKicker>마지막</SlideKicker>
      <SlideHeadline size="hero">15점은 실력이 아니라 준비의 문제였습니다</SlideHeadline>
      <SlideLead>
        처음 배우는 사람에게 이 범위는 원래 어렵습니다. 지금 필요한 것은 이해가 아니라 정확히 외운 문장 스무 개입니다.
      </SlideLead>

      <Panel tone="accent" pad="lg" className="flex items-center gap-4">
        <Trophy className="size-8 shrink-0 md:size-12" />
        <div className="flex flex-col gap-1">
          <PanelLabel tone="inverse">합격선까지</PanelLabel>
          <p className="text-deck-title font-bold">앞에서부터 차례대로, 그리고 외울 열 줄</p>
        </div>
      </Panel>

      <SlideNote tone="quiet">
        이해는 나중에 따라옵니다. 지금은 <Mark>쓸 수 있게</Mark> 만드는 것이 먼저입니다
      </SlideNote>
    </SlideLayout>
  )
}
