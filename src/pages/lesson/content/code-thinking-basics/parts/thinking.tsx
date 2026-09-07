import { CompareGrid, Mark, Panel, PanelLabel, SlideBody, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'
import { CASES, CASES_DEMO, DECOMPOSE, DECOMPOSE_DEMO, INVARIANT, INVARIANT_DEMO, SMALL_CASES, STATE_CORE, UNIFIED } from '../model/concepts'

/** B9. ⭐ 개념 하나 · 프로그램은 상태를 바꾸는 절차다 */
export function StateSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 3 · 사고방식 · 오늘의 뼈대</SlideKicker>
      <SlideHeadline size="hero">
        프로그램은 <Mark>상태를 바꾸는 절차</Mark>입니다
      </SlideHeadline>
      <SlideLead>오늘 외울 것은 이 한 문장뿐입니다. 나머지는 전부 여기서 나옵니다.</SlideLead>

      <CompareGrid>
        {STATE_CORE.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 0 ? 'raised' : 'sunken'}
            pad="lg"
            className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}
          >
            <p className="text-deck-title font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-lead font-semibold text-content-primary">{item.detail}</p>
            <Panel tone="overlay" pad="sm" className="flex flex-col gap-1">
              <PanelLabel>예를 들면</PanelLabel>
              <p className="text-deck-caption text-content-secondary">{item.example}</p>
            </Panel>
          </Panel>
        ))}
      </CompareGrid>

      <SlideNote tone="quiet">
        문제를 볼 때 물을 것도 두 개뿐입니다 · <Mark>무엇을 기억하고, 그것을 어떻게 바꾸는가</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

/** B10. ⭐ 배운 문법 전부가 이 하나에서 나온다 */
export function UnifiedSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 3 · 사고방식</SlideKicker>
      <SlideHeadline>
        스물네 개가 <Mark>한 개</Mark>로 묶입니다
      </SlideHeadline>
      <SlideLead>지금까지 배운 문법은 전부 상태를 담거나 바꾸는 방법입니다. 그것 말고 하는 일이 없습니다.</SlideLead>

      <Panel tone="raised" pad="md" className="flex flex-col gap-2 overflow-x-auto">
        {UNIFIED.map((row, index) => (
          <div
            key={row.term}
            className={cx(
              'grid w-fit min-w-full grid-cols-9 items-center gap-4 rounded-card bg-surface-sunken px-4 py-3 inset-shadow-sunken',
              `animate-rise-${Math.min(index + 1, 5)}`,
            )}
          >
            <p className="col-span-2 text-deck-body font-bold text-content-strong">{row.term}</p>
            <p className="col-span-7 text-deck-caption font-semibold text-content-primary">{row.role}</p>
          </div>
        ))}
      </Panel>

      <SlideNote tone="quiet">
        앞으로 나올 <Mark>상속과 다형성도</Mark> 이 표의 아래에 붙습니다 · 새 칸이 생기는 게 아닙니다
      </SlideNote>
    </SlideLayout>
  )
}

/** B11. ⭐ 도구 1 · 분해 */
export function DecomposeSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 3 · 도구 1 · 분해</SlideKicker>
      <SlideHeadline>
        지문에서 <Mark>명사와 동사</Mark>만 뽑습니다
      </SlideHeadline>
      <SlideLead>
        상태는 명사로 쓰여 있고 변화는 동사로 쓰여 있습니다. 그래서 지문을 두 번 읽으면 절차가 거의 나옵니다.
      </SlideLead>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="raised" pad="lg" className="flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>순서</PanelLabel>
          {DECOMPOSE.map((step, index) => (
            <div key={step.no} className={cx('flex items-start gap-4', `animate-rise-${index + 1}`)}>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary inset-shadow-sunken md:size-10">
                {step.no}
              </span>
              <div className="flex flex-col">
                <p className="text-deck-body font-bold text-content-strong">{step.head}</p>
                <p className="text-deck-caption text-content-secondary">{step.detail}</p>
              </div>
            </div>
          ))}
        </Panel>

        <div className="flex flex-col gap-3 lg:col-span-5">
          <Panel tone="sunken" pad="md" className="flex flex-col gap-2">
            <PanelLabel>해보기</PanelLabel>
            <p className="text-deck-caption text-content-secondary">{DECOMPOSE_DEMO.problem}</p>
          </Panel>
          <div className="grid gap-3 md:grid-cols-2">
            <Panel tone="raised" pad="md" className="flex flex-col gap-2">
              <PanelLabel>명사 · 상태</PanelLabel>
              {DECOMPOSE_DEMO.nouns.map((n) => (
                <p key={n} className="text-deck-caption font-semibold text-content-strong">
                  {n}
                </p>
              ))}
            </Panel>
            <Panel tone="raised" pad="md" className="flex flex-col gap-2">
              <PanelLabel>동사 · 변화</PanelLabel>
              {DECOMPOSE_DEMO.verbs.map((v) => (
                <p key={v} className="text-deck-caption font-semibold text-content-strong">
                  {v}
                </p>
              ))}
            </Panel>
          </div>
          <Panel tone="accentSoft" pad="md">
            <p className="text-deck-caption font-semibold text-content-strong">{DECOMPOSE_DEMO.note}</p>
          </Panel>
        </div>
      </div>
    </SlideLayout>
  )
}

/** B12. ⭐ 도구 2 · 경우 나누기 */
export function CasesSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 3 · 도구 2 · 경우 나누기</SlideKicker>
      <SlideHeadline>
        갈래는 <Mark>겹치지 않고 빠짐없이</Mark> 나눕니다
      </SlideHeadline>

      <div className="grid gap-3 md:grid-cols-3">
        {CASES.map((item, index) => (
          <Panel
            key={item.head}
            tone="raised"
            pad="md"
            className={cx('flex flex-col gap-2', `animate-rise-${index + 1}`)}
          >
            <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-caption text-content-secondary">{item.detail}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="flex flex-col gap-2">
        <PanelLabel>같은 문제를 두 가지로 나눠 보면</PanelLabel>
        <p className="text-deck-caption text-content-secondary">{CASES_DEMO.problem}</p>
      </Panel>

      <CompareGrid>
        <Panel tone="sunken" pad="md" className="flex flex-col gap-3">
          <PanelLabel>겹치는 나눔</PanelLabel>
          {CASES_DEMO.wrong.map((c) => (
            <p key={c} className="text-deck-body text-content-muted">
              · {c}
            </p>
          ))}
          <p className="text-deck-caption text-content-muted">기준이 두 개라서 한 상황이 여러 갈래에 들어갑니다.</p>
        </Panel>
        <Panel tone="raised" pad="md" className="flex flex-col gap-3">
          <PanelLabel>겹치지 않는 나눔</PanelLabel>
          {CASES_DEMO.right.map((c) => (
            <p key={c} className="text-deck-body font-semibold text-content-strong">
              · {c}
            </p>
          ))}
          <p className="text-deck-caption text-content-secondary">{CASES_DEMO.note}</p>
        </Panel>
      </CompareGrid>
    </SlideLayout>
  )
}

/** B13. ⭐ 도구 3 · 불변식 */
export function InvariantSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 3 · 도구 3 · 항상 참인 것</SlideKicker>
      <SlideHeadline>
        그릇의 뜻을 <Mark>한 문장</Mark>으로 말할 수 있어야 합니다
      </SlideHeadline>
      <SlideLead>
        반복문에서 막히는 이유는 거의 하나입니다. 밖에 둔 그릇이 무엇을 담고 있는지 정하지 않고 반복을 시작하는 것입니다.
      </SlideLead>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="raised" pad="md" className="flex flex-col gap-3 lg:col-span-4">
          <PanelLabel>세 순간에 참이어야 한다</PanelLabel>
          {INVARIANT.map((item, index) => (
            <div key={item.when} className={cx('flex flex-col', `animate-rise-${index + 1}`)}>
              <p className="text-deck-caption font-bold text-content-strong">{item.when}</p>
              <p className="text-deck-caption text-content-secondary">{item.hold}</p>
            </div>
          ))}
        </Panel>

        <div className="flex flex-col gap-3 lg:col-span-5">
          <Panel tone="sunken" pad="md" className="flex flex-col gap-2">
            <PanelLabel>{INVARIANT_DEMO.problem}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">
              그릇 <span className="font-mono">{INVARIANT_DEMO.bowl}</span> 의 뜻 · {INVARIANT_DEMO.meaning}
            </p>
          </Panel>
          <Panel tone="raised" pad="md" className="flex flex-col gap-2 overflow-x-auto">
            {INVARIANT_DEMO.trace.map((row, index) => (
              <div
                key={row.step}
                className={cx(
                  'grid w-fit min-w-full grid-cols-9 items-center gap-3 rounded-control bg-surface-sunken px-3 py-2 inset-shadow-sunken',
                  `animate-rise-${Math.min(index + 1, 5)}`,
                )}
              >
                <p className="col-span-3 text-deck-caption font-semibold text-content-primary">{row.step}</p>
                <p className="col-span-2 font-mono text-deck-caption font-bold text-content-strong">{row.value}</p>
                <p className="col-span-4 text-deck-caption text-content-secondary">{row.reads}</p>
              </div>
            ))}
          </Panel>
          <Panel tone="accentSoft" pad="md">
            <p className="text-deck-caption font-semibold text-content-strong">{INVARIANT_DEMO.note}</p>
          </Panel>
        </div>
      </div>
    </SlideLayout>
  )
}

/** B14. 작은 경우로 확인하기 */
export function SmallCaseSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 3 · 확인하는 법</SlideKicker>
      <SlideHeadline>맞는지 아는 방법은 돌려보는 것뿐이 아닙니다</SlideHeadline>
      <SlideLead>
        머릿속에서 가장 작은 경우를 넣어 보면 대부분 그 자리에서 걸립니다. 실행하기 전에 하는 확인입니다.
      </SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {SMALL_CASES.map((item, index) => (
          <Panel
            key={item.case}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <p className="text-deck-lead font-bold text-content-strong">{item.case}</p>
            <p className="text-deck-body text-content-secondary">{item.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>
        도구가 넷이 되었습니다. 분해로 시작하고, 경우를 나누고, 그릇의 뜻을 정하고, 작은 경우로 확인합니다. 오늘 이후
        모든 문제에 이 순서를 씁니다.
      </SlideBody>
    </SlideLayout>
  )
}
