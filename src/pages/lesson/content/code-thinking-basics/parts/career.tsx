import { CompareGrid, Mark, Panel, PanelLabel, SlideBody, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'
import { AI_SHIFT, JOB_REALITY, NEEDS, STACK_PATH } from '../model/career'

/** B20. 지금 배우는 것이 어디로 이어지는가 */
export function PathSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 5 · 앞으로의 길</SlideKicker>
      <SlideHeadline>지금 배우는 것이 어느 자리로 이어지는지</SlideHeadline>
      <SlideLead>
        과정의 순서는 임의로 정한 것이 아닙니다. 하나의 서비스가 돌아가려면 필요한 층을 아래에서 위로 쌓는 순서입니다.
      </SlideLead>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-4">
        {STACK_PATH.map((item, index) => (
          <Panel
            key={item.stage}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <p className="text-deck-meta font-semibold tracking-wider text-content-muted uppercase">{item.stage}</p>
            <p className="text-deck-lead font-bold text-content-strong">{item.what}</p>
            <p className="text-deck-caption text-content-secondary">{item.role}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="lg" className="flex flex-col gap-4">
        <PanelLabel>그 자리에서 실제로 보내는 시간</PanelLabel>
        <div className="grid gap-4 md:grid-cols-3">
          {JOB_REALITY.map((item) => (
            <div key={item.head} className="flex flex-col gap-1">
              <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
              <p className="text-deck-caption text-content-secondary">{item.detail}</p>
            </div>
          ))}
        </div>
      </Panel>
    </SlideLayout>
  )
}

/** B21. 앞으로 필요한 것 세 개 */
export function NeedsSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 5 · 앞으로의 길</SlideKicker>
      <SlideHeadline>
        과정이 끝날 때 <Mark>세 가지</Mark>가 있으면 됩니다
      </SlideHeadline>
      <SlideLead>개수가 많지 않습니다. 대신 세 개가 서로 연결되어 있어야 합니다.</SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {NEEDS.map((item, index) => (
          <Panel
            key={item.no}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <span className="grid size-12 place-items-center rounded-full bg-surface-sunken text-deck-body font-bold text-content-strong inset-shadow-sunken md:size-14">
              {item.no}
            </span>
            <p className="text-deck-lead font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-body text-content-secondary">{item.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>
        세 개 모두 오늘 배운 것으로 만들어집니다. 절차를 정해 만들고, 그릇의 뜻을 말로 설명하고, 남의 코드를 상태와
        변화로 읽습니다.
      </SlideBody>
    </SlideLayout>
  )
}

/** B22. AI가 바꾼 것과 바꾸지 못한 것 */
export function AiShiftSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 5 · 앞으로의 길</SlideKicker>
      <SlideHeadline>
        문법은 대신해 주고, <Mark>판단은 대신하지 못합니다</Mark>
      </SlideHeadline>
      <SlideLead>
        그래서 오늘 잡은 것이 남습니다. 무엇을 기억하고 어떻게 바꿀지 정하는 일은 여전히 사람이 합니다.
      </SlideLead>

      <CompareGrid>
        {AI_SHIFT.map((group, index) => (
          <Panel
            key={group.side}
            tone={index === 0 ? 'sunken' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <PanelLabel>{group.side}</PanelLabel>
            {group.items.map((item) => (
              <p
                key={item}
                className={cx(
                  'text-deck-body',
                  index === 0 ? 'text-content-muted' : 'font-bold text-content-strong',
                )}
              >
                · {item}
              </p>
            ))}
          </Panel>
        ))}
      </CompareGrid>

      <SlideNote>다음 회차에서 AI를 쓰는 법을 다룹니다 · 오늘 잡은 판단을 대신 맡기지 않는 선에서</SlideNote>
    </SlideLayout>
  )
}
