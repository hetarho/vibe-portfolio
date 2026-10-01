import { BookOpen, Flame, MessageSquareText, RotateCcw, Timer } from 'lucide-react'
import {
  Chip,
  cx,
  Panel,
  PanelLabel,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideLead,
} from '../../../deck'
import { PromptCopyButton } from '../../shared'
import { useSummary } from '../model/progress'
import { buildRetryPrompt } from '../model/retry-prompt'

/** R1. 단원별 채점 결과와 다시 볼 문제 번호 */
export function ReviewBoardSlide() {
  const { summary, reset } = useSummary()

  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>정리 · 단원별 채점 결과</SlideKicker>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 rounded-full bg-surface-raised px-4 py-2.5 text-deck-caption font-semibold text-content-secondary shadow-raised transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary"
        >
          <RotateCcw className="size-5 md:size-6" />
          기록 지우고 다시
        </button>
      </div>

      <SlideHeadline>여기 남은 번호만 다시 풉니다</SlideHeadline>

      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        <Panel tone="accent" pad="sm" className="flex flex-col gap-1">
          <PanelLabel tone="inverse">채점한 문제</PanelLabel>
          <p className="text-deck-lead font-bold tabular-nums">
            {summary.graded} / {summary.total}
          </p>
        </Panel>
        <Panel tone="raised" pad="sm" className="flex flex-col gap-1">
          <PanelLabel tone="accent">맞혔다</PanelLabel>
          <p className="text-deck-lead font-bold tabular-nums text-positive">{summary.got}</p>
        </Panel>
        {/* 아래 번호 칩과 같은 색 점을 붙여 둔다. 칩 색이 무엇을 뜻하는지 따로 설명하지 않아도 되게 */}
        <Panel tone="raised" pad="sm" className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="size-3 shrink-0 rounded-full bg-caution" aria-hidden />
            <PanelLabel tone="accent">애매하다</PanelLabel>
          </div>
          <p className="text-deck-lead font-bold tabular-nums text-caution">{summary.unsure}</p>
        </Panel>
        <Panel tone="raised" pad="sm" className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="size-3 shrink-0 rounded-full bg-accent" aria-hidden />
            <PanelLabel tone="accent">못 썼다</PanelLabel>
          </div>
          <p className="text-deck-lead font-bold tabular-nums text-content-strong">{summary.missed}</p>
        </Panel>
      </div>

      <ul className="grid gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
        {summary.units.map((unit) => {
          const graded = unit.got.length + unit.unsure.length + unit.missed.length
          const again = [...unit.missed, ...unit.unsure].sort((a, b) => a - b)
          return (
            <li key={unit.key}>
              <Panel tone="raised" pad="sm" className="flex h-full flex-col gap-2">
                <p className="truncate text-deck-caption font-bold text-content-strong">
                  <span className="text-accent">{unit.key}</span> · {unit.title}
                </p>
                <p className="text-deck-meta tabular-nums text-content-muted">
                  채점 {graded} / {unit.total}
                </p>
                {again.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {again.map((no) => (
                      <span
                        key={no}
                        className={cx(
                          'rounded-full px-2.5 py-1 text-deck-meta font-bold tabular-nums',
                          unit.missed.includes(no) ? 'bg-accent text-accent-contrast' : 'bg-caution-soft text-caution',
                        )}
                      >
                        {no}
                      </span>
                    ))}
                  </div>
                ) : graded > 0 ? (
                  <p className="text-deck-meta font-semibold text-positive">다시 볼 문제가 없습니다</p>
                ) : null}
              </Panel>
            </li>
          )
        })}
      </ul>
    </SlideLayout>
  )
}

/** R2. 다시 볼 문제로 AI에게 비슷한 문제를 받는 프롬프트 */
export function RetrySlide() {
  const { summary } = useSummary()
  const count = summary.again.length

  return (
    <SlideLayout>
      <SlideKicker>집에서 · AI에게 비슷한 문제 받기</SlideKicker>
      <SlideHeadline>틀린 문제는 조건을 바꿔 한 번 더 풉니다</SlideHeadline>
      <SlideLead>
        같은 문제를 다시 풀면 답을 기억해서 맞히게 됩니다. 테이블과 숫자를 바꾼 문제를 맞혀야 아는 것입니다.
      </SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <Panel tone="raised" pad="md" className="flex flex-col gap-2">
          <PanelLabel tone="accent">한 번에 한 문제</PanelLabel>
          <p className="text-deck-caption font-semibold text-content-strong">
            다시 볼 문제를 앞에서부터 하나씩 골라, 같은 개념을 묻는 새 문제를 냅니다.
          </p>
        </Panel>
        <Panel tone="raised" pad="md" className="flex flex-col gap-2">
          <PanelLabel tone="accent">정답은 나중에</PanelLabel>
          <p className="text-deck-caption font-semibold text-content-strong">
            내가 답을 쓰기 전에는 정답이나 힌트를 먼저 말하지 않습니다.
          </p>
        </Panel>
        <Panel tone="raised" pad="md" className="flex flex-col gap-2">
          <PanelLabel tone="accent">문제집 기준으로 채점</PanelLabel>
          <p className="text-deck-caption font-semibold text-content-strong">
            모범 답안을 함께 넘기므로, 틀린 줄만 짚어서 수업에서 쓴 문법으로 고쳐 줍니다.
          </p>
        </Panel>
      </div>

      {count > 0 ? (
        <div className="flex flex-col items-start gap-3">
          <PromptCopyButton size="md" label={`다시 볼 문제 ${count}개로 프롬프트 복사`} text={buildRetryPrompt(summary.again)} />
          <p className="flex items-center gap-2 text-deck-caption text-content-muted">
            <MessageSquareText className="size-5 shrink-0 md:size-6" />
            ChatGPT나 Claude의 새 대화에 붙여 넣으면 바로 첫 문제가 나옵니다.
          </p>
        </div>
      ) : (
        <Panel tone="sunken" pad="md">
          <p className="text-deck-body font-semibold text-content-secondary">
            아직 못 썼다나 애매하다로 채점한 문제가 없습니다. 문제를 풀고 채점한 뒤에 이 화면으로 돌아오면 버튼이 나타납니다.
          </p>
        </Panel>
      )}
    </SlideLayout>
  )
}

/** R3. 시험까지 남은 날을 쓰는 법 */
export function RoutineSlide() {
  return (
    <SlideLayout>
      <SlideKicker>시험까지 · 하루 루틴</SlideKicker>
      <SlideHeadline>새로 배우지 말고, 아는 것을 꺼내는 연습만 합니다</SlideHeadline>
      <SlideLead>읽어서 아는 SQL과 빈 종이에 쓸 수 있는 SQL은 다릅니다. 시험까지는 쓰는 연습만 합니다.</SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <Panel tone="raised" pad="lg" className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <BookOpen className="size-7 shrink-0 text-accent md:size-9" />
            <PanelLabel tone="accent">매일 · 단원 하나</PanelLabel>
          </div>
          <p className="text-deck-body font-bold text-content-strong">핵심 정리를 읽고 그 단원을 끝까지</p>
          <p className="text-deck-caption font-semibold text-content-secondary">
            SQL은 손으로 끝까지 써 봐야 빠진 쉼표와 괄호가 보입니다. 화면을 보지 않고 먼저 씁니다.
          </p>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Flame className="size-7 shrink-0 text-caution md:size-9" />
            <PanelLabel tone="accent">시험 전날</PanelLabel>
          </div>
          <p className="text-deck-body font-bold text-content-strong">정리 화면에 남은 번호만</p>
          <p className="text-deck-caption font-semibold text-content-secondary">
            남은 번호와 AI가 낸 비슷한 문제만 풉니다. 애매한 것을 확실하게 다지는 편이 점수에 더 도움이 됩니다.
          </p>
        </Panel>

        <Panel tone="raised" pad="lg" className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Timer className="size-7 shrink-0 text-accent md:size-9" />
            <PanelLabel tone="accent">시험 직전</PanelLabel>
          </div>
          <p className="text-deck-body font-bold text-content-strong">함정 열 줄만 소리 내서</p>
          <p className="text-deck-caption font-semibold text-content-secondary">
            C 키로 여는 화면입니다. 이 시점에 새 내용을 공부하면 외운 것까지 흔들립니다.
          </p>
        </Panel>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <Chip tone="accent">답안지를 빈칸으로 내지 않기</Chip>
        <Chip>“각각”이면 항목마다 나눠 쓰기</Chip>
        <Chip>NULL은 IS NULL로 비교하기</Chip>
      </div>
    </SlideLayout>
  )
}
