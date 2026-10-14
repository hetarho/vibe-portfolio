import { CheckCircle2 } from 'lucide-react'
import { cx, Mark, Panel, PanelLabel, SlideBody, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote } from '../../../deck'
import { PromptCopyButton } from '../../shared'
import studyPrompt from '../model/study-prompt.md?raw'
import { StepBadge } from '../ui/CardChip'

const CHECKS = [
  '카드 여덟 장의 앞면을 보고 뒷면을 빈 종이에 쓸 수 있다',
  '문제를 읽고 화면 설계표(칸 · 태그 · id)를 먼저 쓸 수 있다',
  '한글 절차를 주석으로 쓰고, 줄마다 카드를 붙일 수 있다',
  '그릇마다 처음 값과 뜻을 한 문장으로 말할 수 있다',
]

/** 오늘의 도착점 */
export function RecapSlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘의 도착점</SlideKicker>
      <SlideHeadline>
        오늘 가져가는 것은 <Mark>카드 여덟 장</Mark>과 옮기는 순서 하나입니다
      </SlideHeadline>
      <SlideLead>처음 보는 문제 앞에서 아래 네 가지가 되면, 빈 화면에서도 첫 줄을 쓸 수 있습니다.</SlideLead>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-2">
        {CHECKS.map((item, index) => (
          <Panel key={item} tone={index === 2 ? 'accentSoft' : 'raised'} pad="md" className={cx('flex items-center gap-4', `animate-rise-${index + 1}`)}>
            <CheckCircle2 className="size-7 shrink-0 text-positive md:size-9" />
            <p className="text-deck-body font-bold text-content-strong">{item}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">절차를 주석으로 → 줄마다 카드 → 작은 경우로 확인 · 문제가 바뀌어도 이 순서는 그대로입니다</SlideNote>
    </SlideLayout>
  )
}

const ROUNDS = [
  { day: '오늘 밤', what: '카드 여덟 장을 손으로 씁니다. 앞면만 보고 뒷면을 쓴 다음 맞춰 봅니다' },
  { day: '내일', what: '1부 다섯 문제 중 하나를 골라, 정답을 덮고 주석(한글 절차)부터 다시 씁니다' },
  { day: '남은 요일', what: '복습 프롬프트로 새 문제를 받아 절차 → 카드 → 코드 순서로 풉니다' },
]

/** 집에서 이어가기 · 3회전과 복습 프롬프트 */
export function HomeworkSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-5">
          <SlideKicker>집에서 이어가기</SlideKicker>
          <SlideHeadline>
            새 문제는 AI가 내고, <Mark>절차와 코드는 내가</Mark> 씁니다
          </SlideHeadline>
          <SlideBody>
            AI가 학원 실습과 같은 종류의 문제를 하나 냅니다. 한글 절차를 먼저 보내면 절차만 채점하고, 그다음에 코드를 받습니다.
            정답 코드는 내가 두 번 막혀야 보여줍니다.
          </SlideBody>
          <PromptCopyButton size="md" label="복습 프롬프트 복사" text={studyPrompt} />
        </div>

        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>같은 내용을 세 번 다르게</PanelLabel>
          {ROUNDS.map((round, index) => (
            <div key={round.day} className={cx('flex items-start gap-4', `animate-rise-${index + 1}`)}>
              <StepBadge no={index + 1} />
              <div className="flex flex-col">
                <p className="text-deck-caption font-bold text-content-strong">{round.day}</p>
                <p className="text-deck-caption text-content-secondary">{round.what}</p>
              </div>
            </div>
          ))}
        </Panel>
      </div>
    </SlideLayout>
  )
}
