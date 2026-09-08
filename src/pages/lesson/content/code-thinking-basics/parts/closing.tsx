import { CountdownTimer, Mark, Panel, PanelLabel, SlideBody, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'
import { APPLY, SKELETON, SMALL_CHECK, SOLO_PROBLEM, WEEK } from '../model/practice'

/** B23. ⭐ 남는 시간 실습 · 도구를 문제 하나에 적용 */
export function ApplySlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 6 · 남는 시간 실습</SlideKicker>
      <SlideHeadline>
        문법을 푸는 게 아니라 <Mark>도구를 써 봅니다</Mark>
      </SlideHeadline>

      <Panel tone="sunken" pad="md" className="flex flex-col gap-1">
        <PanelLabel>배열 실습문제 8</PanelLabel>
        {SOLO_PROBLEM.map((line) => (
          <p key={line} className="text-deck-caption text-content-secondary">
            {line}
          </p>
        ))}
      </Panel>

      <div className="flex flex-col gap-3">
        {APPLY.map((item, index) => (
          <Panel
            key={item.tool}
            tone={index % 2 === 0 ? 'raised' : 'sunken'}
            pad="md"
            className={cx('grid items-center gap-3 md:gap-5 lg:grid-cols-9', `animate-rise-${index + 1}`)}
          >
            <p className="text-deck-body font-bold text-content-strong lg:col-span-2">{item.tool}</p>
            <p className="text-deck-caption font-semibold text-content-primary lg:col-span-3">{item.ask}</p>
            <p className="text-deck-caption text-content-secondary lg:col-span-4">{item.answer}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        세 줄을 채우고 나면 <Mark>코드는 옮기는 일</Mark>만 남습니다 · 시간이 모자라면 여기까지만 합니다
      </SlideNote>
    </SlideLayout>
  )
}

/** B24. 오늘 정리 · 이번 주 */
export function ClosingSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 6 · 오늘 정리</SlideKicker>
      <SlideHeadline>
        오늘 가져가는 것은 <Mark>문장 하나와 도구 넷</Mark>입니다
      </SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <div className="flex flex-col gap-3 lg:col-span-5">
          <Panel tone="accentSoft" pad="md" className="flex flex-col gap-2">
            <PanelLabel>외울 문장</PanelLabel>
            <p className="text-deck-lead font-bold text-content-strong">프로그램은 상태를 바꾸는 절차다</p>
          </Panel>
          <Panel tone="raised" pad="md" className="flex flex-col gap-2">
            <PanelLabel>도구 넷</PanelLabel>
            <p className="text-deck-body font-semibold text-content-primary">
              분해 · 경우 나누기 · 그릇의 뜻 · 작은 경우로 확인
            </p>
          </Panel>
          <Panel tone="sunken" pad="md" className="flex flex-col gap-2 overflow-x-auto">
            <PanelLabel>껍데기는 적어 두고 베낀다</PanelLabel>
            {SKELETON.map((line, index) => (
              <p key={index} className="font-mono text-deck-meta whitespace-pre text-content-secondary">
                {line || ' '}
              </p>
            ))}
          </Panel>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-4">
          <Panel tone="raised" pad="md" className="flex flex-col gap-3">
            <PanelLabel>이번 주</PanelLabel>
            {WEEK.map((item, index) => (
              <div key={item.day} className={cx('flex flex-col', `animate-rise-${index + 1}`)}>
                <p className="text-deck-caption font-bold text-content-strong">{item.day}</p>
                <p className="text-deck-caption text-content-secondary">{item.what}</p>
              </div>
            ))}
          </Panel>
          <Panel tone="sunken" pad="md" className="flex flex-col gap-2">
            <PanelLabel>돌려볼 때 작은 경우로</PanelLabel>
            {SMALL_CHECK.map((c) => (
              <p key={c} className="text-deck-caption text-content-secondary">
                · {c}
              </p>
            ))}
          </Panel>
        </div>
      </div>

      <SlideBody>
        이 세 가지를 혼자 하기 어려우면 다음 파트에서 도구를 하나 드립니다. 오늘 받은 PPT를 그대로 문제집으로 바꿔
        주는 프롬프트입니다.
      </SlideBody>
    </SlideLayout>
  )
}
