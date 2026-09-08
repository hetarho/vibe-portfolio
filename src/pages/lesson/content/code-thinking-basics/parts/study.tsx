import { Check, X } from 'lucide-react'
import { CompareGrid, Mark, Panel, PanelLabel, SlideBody, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'
import { DAILY, ERROR_LOG, EXPLAIN_CHECKS, SPACING, STUDY_JUDGE, THREE_ROUNDS } from '../model/study'

/** B15. ⭐ 무엇이 공부이고 무엇이 아닌가 */
export function JudgeSlide() {
  const trains = STUDY_JUDGE.filter((item) => item.trains)
  const notTrains = STUDY_JUDGE.filter((item) => !item.trains)

  return (
    <SlideLayout align="top">
      <SlideKicker>PART 4 · 공부법</SlideKicker>
      <SlideHeadline>
        <Mark>꺼내는 연습</Mark>만 공부로 칩니다
      </SlideHeadline>
      <SlideLead>
        1부에서 두 능력이 따로 자란다고 했습니다. 그러면 공부법을 고르는 기준도 하나로 정해집니다. 꺼내는 쪽을 쓰는지만
        봅니다.
      </SlideLead>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-control bg-surface-raised text-content-muted shadow-raised md:size-12">
              <X className="size-6" strokeWidth={3} />
            </span>
            <PanelLabel>시간은 쓰지만 재생이 안 자란다</PanelLabel>
          </div>
          {notTrains.map((item) => (
            <div key={item.act} className="flex flex-col">
              <p className="text-deck-body font-semibold text-content-muted">{item.act}</p>
              <p className="text-deck-caption text-content-muted">{item.why}</p>
            </div>
          ))}
        </Panel>

        <Panel tone="raised" pad="lg" className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-control bg-surface-sunken text-content-primary inset-shadow-sunken md:size-12">
              <Check className="size-6" strokeWidth={3} />
            </span>
            <PanelLabel>같은 시간에 재생이 자란다</PanelLabel>
          </div>
          {trains.map((item, index) => (
            <div key={item.act} className={cx('flex flex-col', `animate-rise-${index + 1}`)}>
              <p className="text-deck-body font-bold text-content-strong">{item.act}</p>
              <p className="text-deck-caption text-content-secondary">{item.why}</p>
            </div>
          ))}
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        왼쪽이 편하고 오른쪽이 불편합니다 · <Mark>불편한 것이 남습니다</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

/** B16. 같은 문제를 세 번 다르게 */
export function RoundsSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 4 · 공부법</SlideKicker>
      <SlideHeadline>
        새 문제를 늘리지 않고 <Mark>같은 문제를 세 번</Mark>
      </SlideHeadline>
      <SlideLead>2부에서 비어 있던 계단 네 칸을 이 3회전으로 놓습니다.</SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {THREE_ROUNDS.map((round, index) => (
          <Panel
            key={round.no}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <span className="grid size-12 place-items-center rounded-full bg-surface-sunken text-deck-body font-bold text-content-strong inset-shadow-sunken md:size-14">
              {round.no}
            </span>
            <p className="text-deck-lead font-bold text-content-strong">{round.head}</p>
            <p className="text-deck-body text-content-secondary">{round.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        3회전에서 막혀 1회전으로 돌아가는 것은 <Mark>정상 동작</Mark>입니다 · 그때 무엇이 없었는지가 드러납니다
      </SlideNote>
    </SlideLayout>
  )
}

/** B17. 언제 다시 보는가 */
export function SpacingSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 4 · 공부법</SlideKicker>
      <SlideHeadline>잊기 시작할 때 다시 꺼내야 남습니다</SlideHeadline>
      <SlideLead>
        방금 본 것을 다시 보면 이미 알고 있으니 꺼내는 연습이 안 됩니다. 조금 잊었을 때 꺼내는 것이 가장 많이 남습니다.
      </SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {SPACING.map((item, index) => (
          <Panel
            key={item.when}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <p className="text-deck-title font-bold text-content-strong">{item.when}</p>
            <p className="text-deck-body text-content-secondary">{item.what}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>
        일주일 뒤에 백지에서 나오는 것만 진짜로 남은 것입니다. 그날 안 나오면 남지 않은 것이니 다시 3회전을 돕니다.
      </SlideBody>
    </SlideLayout>
  )
}

/** B18. 무엇을 기록하고 무엇으로 확인하는가 */
export function LogSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 4 · 공부법</SlideKicker>
      <SlideHeadline>막힌 지점은 세 줄로 남기고, 설명으로 확인합니다</SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="raised" pad="lg" className="flex flex-col gap-4 lg:col-span-5">
          <PanelLabel>막힌 지점 · 세 줄</PanelLabel>
          {ERROR_LOG.map((item, index) => (
            <div key={item.field} className={cx('flex flex-col gap-1', `animate-rise-${index + 1}`)}>
              <p className="text-deck-body font-bold text-content-strong">{item.field}</p>
              <p className="text-deck-caption text-content-secondary">{item.example}</p>
            </div>
          ))}
          <p className="text-deck-caption text-content-muted">
            틀린 코드는 지우지 않습니다. 같은 곳에서 또 막히는지 보려면 남아 있어야 합니다.
          </p>
        </Panel>

        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>아는지 확인하는 세 질문</PanelLabel>
          {EXPLAIN_CHECKS.map((q, index) => (
            <div key={q} className={cx('flex items-start gap-3', `animate-rise-${index + 1}`)}>
              <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-surface-raised text-deck-meta font-bold text-content-primary shadow-raised md:size-8">
                {index + 1}
              </span>
              <p className="text-deck-body font-semibold text-content-primary">{q}</p>
            </div>
          ))}
          <p className="text-deck-caption text-content-secondary">
            셋 다 소리 내어 답할 수 있으면 그 문제는 끝난 것입니다.
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

/** B19. 하루 30분 */
export function DailySlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 4 · 공부법</SlideKicker>
      <SlideHeadline>
        하루 <Mark>30분</Mark>이고, 새 문제는 하나입니다
      </SlideHeadline>
      <SlideLead>진도를 따라가는 시간이 아닙니다. 꺼내는 연습만 하는 시간입니다.</SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {DAILY.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <span className="w-fit rounded-control bg-surface-sunken px-4 py-2 text-deck-body font-bold text-content-strong inset-shadow-sunken">
              {item.time}
            </span>
            <p className="text-deck-lead font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-body text-content-secondary">{item.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        첫 <Mark>10분</Mark>이 가장 중요합니다 · 새 것에 손대기 전에 어제 것을 꺼냅니다
      </SlideNote>
    </SlideLayout>
  )
}
