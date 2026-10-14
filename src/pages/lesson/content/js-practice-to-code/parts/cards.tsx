import { cx, Mark, Panel, SlideHeadline, SlideKicker, SlideLayout, SlideNote } from '../../../deck'
import { CARDS } from '../model/cards'
import { cardsNew, cardsUsed, PRACTICE } from '../model/practice'
import { Code } from '../ui/Code'

/** 1부 정리 · 모은 카드 여덟 장. 뒷면 코드가 한 줄에 40자를 넘어서 두 줄로 놓고, 카드 안에서 앞면과 뒷면을 좌우로 둔다 */
export function CardDeckSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 1 · 정리</SlideKicker>
      <SlideHeadline>
        모은 카드 <Mark>여덟 장</Mark>
      </SlideHeadline>

      <div className="grid gap-3 lg:grid-cols-2">
        {CARDS.map((card, index) => (
          <Panel
            key={card.no}
            tone="raised"
            pad="sm"
            className={cx('grid items-center gap-3 md:grid-cols-9 md:gap-4', `animate-rise-${Math.min((index % 4) + 1, 5)}`)}
          >
            <div className="flex flex-col gap-1 md:col-span-4">
              <div className="flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-strong inset-shadow-sunken">
                  {card.no}
                </span>
                <p className="text-deck-caption font-bold text-content-strong">{card.name}</p>
              </div>
              {card.front.map((line) => (
                <p key={line} className="pl-11 text-deck-meta font-semibold text-content-secondary">
                  “{line}”
                </p>
              ))}
            </div>
            <Code lines={card.back} size="meta" pad="sm" className="md:col-span-5" />
          </Panel>
        ))}
      </div>
    </SlideLayout>
  )
}

/** 1부 정리 · 다섯 문제가 어느 카드를 썼는지 */
export function CardMatrixSlide() {
  const counts = CARDS.map((card) => PRACTICE.filter((problem) => cardsUsed(problem).includes(card.no)).length)

  return (
    <SlideLayout align="top">
      <SlideKicker>PART 1 · 정리</SlideKicker>
      <SlideHeadline>
        정답 다섯 개 대신 <Mark>카드 여덟 장</Mark>
      </SlideHeadline>

      <Panel tone="raised" pad="sm" className="flex flex-col gap-3 overflow-x-auto">
        <table className="w-full min-w-max text-left">
          <thead>
            <tr className="text-deck-meta text-content-muted">
              <th className="px-3 py-2 font-semibold">문제</th>
              {CARDS.map((card) => (
                <th key={card.no} className="px-2 py-2 text-center font-semibold">
                  <span className="block text-deck-caption font-bold text-content-primary">{card.no}</span>
                  {card.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRACTICE.map((problem, index) => {
              const used = cardsUsed(problem)
              const fresh = cardsNew(index)
              return (
                <tr key={problem.academyNo} className={cx(index % 2 === 0 && 'bg-surface-overlay')}>
                  <td className="rounded-l-control px-3 py-2.5 text-deck-body font-bold whitespace-nowrap text-content-strong">
                    {index + 1}. {problem.short}
                  </td>
                  {CARDS.map((card, at) => (
                    <td key={card.no} className={cx('px-2 py-2.5 text-center', at === CARDS.length - 1 && 'rounded-r-control')}>
                      {used.includes(card.no) ? (
                        <span
                          className={cx(
                            'inline-grid size-8 place-items-center rounded-full text-deck-meta font-bold md:size-9',
                            fresh.includes(card.no) ? 'bg-accent text-accent-contrast' : 'bg-surface-highlight text-content-primary',
                          )}
                        >
                          {fresh.includes(card.no) ? '새' : '●'}
                        </span>
                      ) : null}
                    </td>
                  ))}
                </tr>
              )
            })}
            <tr>
              <td className="px-3 pt-3 text-deck-caption font-semibold text-content-muted">쓴 문제 수</td>
              {counts.map((count, at) => (
                <td key={CARDS[at].no} className="px-2 pt-3 text-center text-deck-body font-bold text-content-strong">
                  {count}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-3">
          <span className="flex items-center gap-2 text-deck-caption text-content-secondary">
            <span className="inline-grid size-7 place-items-center rounded-full bg-accent text-deck-meta font-bold text-accent-contrast">새</span>
            그 문제에서 처음 나온 카드
          </span>
          <span className="flex items-center gap-2 text-deck-caption text-content-secondary">
            <span className="inline-grid size-7 place-items-center rounded-full bg-surface-highlight text-deck-meta font-bold text-content-primary">●</span>
            앞에서 쓴 카드를 다시 꺼냄
          </span>
        </div>
      </Panel>

      <SlideNote tone="quiet">뒤로 갈수록 새 카드는 줄고 다시 꺼내는 카드가 늘어납니다 · 여섯 번째 문제도 이 여덟 장으로 풉니다</SlideNote>
    </SlideLayout>
  )
}
