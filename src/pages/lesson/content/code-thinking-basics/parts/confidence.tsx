import { CompareGrid, Mark, Panel, PanelLabel, SlideBody, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'

const HAVE = [
  {
    head: '순서 정하기',
    daily: '먼저 물을 올리고, 끓는 동안 재료를 썬다',
    code: '절차 · 프로그램의 기본 골격',
  },
  {
    head: '경우 나누기',
    daily: '포장이면 봉투, 매장이면 접시',
    code: '조건문 · if와 else',
  },
  {
    head: '되풀이 알아채기',
    daily: '주문표가 남아 있는 동안 같은 일을 반복한다',
    code: '반복문 · for와 while',
  },
]

/** B6. ⭐ 이미 갖고 있는 세 가지 */
export function HaveSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 2 · 이미 갖고 있는 것</SlideKicker>
      <SlideHeadline>
        프로그래밍에 필요한 사고는 <Mark>세 가지</Mark>뿐입니다
      </SlideHeadline>
      <SlideLead>그리고 이 세 가지는 이미 매일 하고 있습니다. 이름만 붙이지 않았을 뿐입니다.</SlideLead>

      <div className="flex flex-col gap-4">
        {HAVE.map((item, index) => (
          <Panel
            key={item.head}
            tone={index % 2 === 0 ? 'raised' : 'sunken'}
            pad="md"
            className={cx('grid items-center gap-4 md:gap-6 lg:grid-cols-9', `animate-rise-${index + 1}`)}
          >
            <p className="text-deck-lead font-bold text-content-strong lg:col-span-2">{item.head}</p>
            <p className="text-deck-body text-content-secondary lg:col-span-4">{item.daily}</p>
            <p className="text-deck-caption font-semibold text-content-primary lg:col-span-3">{item.code}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        새로 배울 사고는 없습니다 · <Mark>이 세 가지를 코드로 옮기는 방법</Mark>만 배우면 됩니다
      </SlideNote>
    </SlideLayout>
  )
}

const NOT_NEEDED = ['암산과 빠른 계산', '공식 암기', '증명 쓰기', '도형과 함수 그래프']

const NEEDED = [
  { head: '정의를 정확히 읽기', detail: '“이상”과 “초과”를 구분하는 그 정도' },
  { head: '이름을 붙여 다루기', detail: '모르는 값에 이름을 주고 그 이름으로 말하기' },
  { head: '경우를 빠뜨리지 않기', detail: '갈래를 다 세었는지 확인하기' },
  { head: '항상 참인 것 찾기', detail: '무엇이 변하지 않는지 아는 것' },
  { head: '작은 경우로 확인하기', detail: '하나일 때, 없을 때 넣어 보기' },
]

/** B7. 학교 수학 점수와 상관없는 이유 */
export function MathSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 2 · 이미 갖고 있는 것</SlideKicker>
      <SlideHeadline>여기서 말하는 수학적 사고는 계산이 아닙니다</SlideHeadline>
      <SlideLead>
        학교 수학에서 점수를 가르던 능력과, 프로그래밍에서 쓰는 능력이 서로 다릅니다. 그래서 예전 성적으로 예측되지 않습니다.
      </SlideLead>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4">
          <PanelLabel>여기서는 쓰지 않는 것</PanelLabel>
          {NOT_NEEDED.map((item) => (
            <p key={item} className="text-deck-body text-content-muted">
              · {item}
            </p>
          ))}
          <SlideBody>계산은 컴퓨터가 합니다. 사람은 무엇을 계산할지만 정합니다.</SlideBody>
        </Panel>

        <Panel tone="raised" pad="lg" className="flex flex-col gap-3">
          <PanelLabel>실제로 쓰는 다섯 가지</PanelLabel>
          {NEEDED.map((item, index) => (
            <div key={item.head} className={cx('flex flex-col', `animate-rise-${Math.min(index + 1, 5)}`)}>
              <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
              <p className="text-deck-caption text-content-secondary">{item.detail}</p>
            </div>
          ))}
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        다섯 개 중 셋을 <Mark>3부에서 도구로</Mark> 만듭니다 · 나머지 둘은 오늘 실습에서 씁니다
      </SlideNote>
    </SlideLayout>
  )
}

const STAIRS = [
  { no: '1', head: '완성된 코드를 읽는다', have: true },
  { no: '2', head: '그대로 따라 친다', have: false },
  { no: '3', head: '빈칸을 채운다', have: false },
  { no: '4', head: '절차를 한국어로 쓴다', have: false },
  { no: '5', head: '한 단계를 한 줄로', have: false },
  { no: '6', head: '빈 화면에서 짠다', have: true },
]

/** B8. 필요한 것은 계단이고, 계단은 놓을 수 있다 */
export function StairsSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 2 · 이미 갖고 있는 것</SlideKicker>
      <SlideHeadline>
        1번 다음이 곧바로 6번이면 <Mark>계단이 없습니다</Mark>
      </SlideHeadline>
      <SlideLead>수업은 1번을 보여준 다음 6번을 요구합니다. 사이의 네 칸은 혼자 놓아야 합니다.</SlideLead>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-6">
        {STAIRS.map((step, index) => (
          <Panel
            key={step.no}
            tone={step.have ? 'raised' : 'sunken'}
            pad="sm"
            className={cx('flex flex-col gap-3', `animate-rise-${Math.min(index + 1, 5)}`)}
          >
            <span
              className={cx(
                'grid size-9 place-items-center rounded-full text-deck-caption font-bold md:size-11',
                step.have
                  ? 'bg-surface-sunken text-content-primary inset-shadow-sunken'
                  : 'bg-surface-raised text-content-muted shadow-raised',
              )}
            >
              {step.no}
            </span>
            <p className={cx('text-deck-caption font-semibold', step.have ? 'text-content-strong' : 'text-content-muted')}>
              {step.head}
            </p>
            <p className="text-deck-meta font-semibold tracking-wider text-content-muted uppercase">
              {step.have ? '수업에 있다' : '내가 놓는다'}
            </p>
          </Panel>
        ))}
      </div>

      <SlideNote>네 칸을 놓는 방법이 4부의 공부법입니다 · 혼자 할 수 있는 크기입니다</SlideNote>
    </SlideLayout>
  )
}
