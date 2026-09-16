import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react'
import { Mark, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'

const CHECKS = [
  '문제에서 주어진 조건을 빠뜨리지 않고 말할 수 있다',
  '“당연해요” 대신 답이 나온 중간 과정을 설명할 수 있다',
  '같은 답을 그림·표·하나씩 해보기 등 다른 방식으로도 설명할 수 있다',
  '숫자가 바뀌어도 다시 쓸 수 있는 한글 규칙을 만들 수 있다',
]

/** 마지막 점검 */
export function RecapSlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘의 도착점</SlideKicker>
      <SlideHeadline>빠른 정답보다, 다른 사람이 따라갈 수 있는 설명을 남깁니다</SlideHeadline>
      <SlideLead>처음 보는 문제에서도 아래 네 가지가 되면 생각을 구조화하기 시작한 것입니다.</SlideLead>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-2">
        {CHECKS.map((item, index) => (
          <Panel key={item} tone={index === 2 ? 'accentSoft' : 'raised'} pad="md" className={cx('flex items-center gap-4', `animate-rise-${index + 1}`)}>
            <CheckCircle2 className="size-7 shrink-0 text-positive md:size-9" />
            <p className="text-deck-body font-bold text-content-strong">{item}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet"><Mark>주어진 것 → 한 단계씩 설명 → 다른 방법 비교 → 일반 규칙</Mark> · 오늘은 여기까지입니다</SlideNote>
    </SlideLayout>
  )
}

const HOMEWORK = [
  { day: '1회전 · 내 답', do: '정답 뒤에 “왜냐하면”을 붙여 중간 과정을 세 문장으로 말하기' },
  { day: '2회전 · 다른 답', do: '그림·표·하나씩 해보기 중 다른 방식으로 같은 답 설명하기' },
  { day: '3회전 · 바꾼 문제', do: '숫자나 조건을 하나 바꾸고도 같은 한글 규칙이 통하는지 확인하기' },
]

/** 집에서 이어갈 3회전 */
export function HomeworkSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <RotateCcw className="size-8 text-accent md:size-11" />
        <SlideHeadline>같은 문제를 세 번 다르게 풉니다</SlideHeadline>
      </div>
      <SlideLead>답을 베껴 쓰는 반복이 아니라, 같은 생각을 다른 형태로 꺼내는 반복입니다.</SlideLead>

      <div className="flex flex-col gap-4">
        {HOMEWORK.map((item, index) => (
          <Panel key={item.day} tone={index === 2 ? 'accentSoft' : 'raised'} pad="md" className={cx('grid items-center gap-3 md:grid-cols-9 md:gap-6', `animate-rise-${index + 1}`)}>
            <PanelLabel tone={index === 2 ? 'accent' : 'muted'}>{item.day}</PanelLabel>
            <ArrowRight className="size-6 text-accent md:mx-auto md:size-8" />
            <p className="text-deck-body font-semibold text-content-strong md:col-span-7">{item.do}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="flex flex-col gap-2">
        <PanelLabel>코드로 옮기는 시점</PanelLabel>
        <p className="text-deck-body text-content-secondary">숫자가 바뀌어도 통하는 한글 규칙을 혼자 설명할 수 있게 된 다음입니다.</p>
      </Panel>
    </SlideLayout>
  )
}
