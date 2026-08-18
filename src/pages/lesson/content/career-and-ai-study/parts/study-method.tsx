import { BookX, BrainCircuit, FileQuestion, Hammer, ListOrdered } from 'lucide-react'
import {
  CompareGrid,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideBody,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideNote,
} from '@/features/slide-deck'

/** C14. 문제 제기 1 — 튜토리얼 지옥 */
export function TutorialHellSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <BookX size={44} className="text-critical" />
        <SlideKicker>문제 제기 ①</SlideKicker>
      </div>
      <SlideHeadline size="hero">튜토리얼 지옥</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="flex flex-col items-center justify-center gap-5">
          <p className="text-deck-numeric font-bold tabular-nums text-content-strong">100%</p>
          <p className="text-deck-body font-semibold text-content-secondary">강의 진도율</p>
        </Panel>

        <Panel tone="sunken" pad="lg" className="flex flex-col items-center justify-center gap-5">
          <p className="text-deck-numeric font-bold text-content-muted">?</p>
          <p className="text-deck-body font-semibold text-content-secondary">혼자 켜본 빈 에디터</p>
        </Panel>
      </CompareGrid>

      <SlideNote>읽었지만 못 해요. 손이 기억하지 않았거든요</SlideNote>
    </SlideLayout>
  )
}

/** C15. 문제 제기 2 — AI 시대의 함정 */
export function AiTrapSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <BrainCircuit size={44} className="text-critical" />
        <SlideKicker>문제 제기 ②</SlideKicker>
      </div>
      <SlideHeadline>AI한테 시키면 결과물은 나와요. 그런데</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="lg" className="animate-rise-1 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>남는 것</PanelLabel>
          <p className="text-deck-lead font-bold text-content-secondary">결과물</p>
          <p className="text-deck-body text-content-muted">돌아가는 화면 하나</p>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-5">
          <PanelLabel tone="accent">안 남는 것</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">내 실력</p>
          <p className="text-deck-body text-content-secondary">
            면접이랑 실무 코드리뷰는 <Mark>내가 읽고 설명할 수 있는지</Mark>를 봐요
          </p>
        </Panel>
      </div>

      <SlideBody>결과물은 싸졌고, 판단은 여전히 비싸요.</SlideBody>
    </SlideLayout>
  )
}

const CONDITIONS = [
  { icon: ListOrdered, text: '모르는 게 갑자기 튀어나오지 않는 순서' },
  { icon: Hammer, text: '개념마다 직접 손으로 쳐봐요' },
  { icon: FileQuestion, text: '채점은 근거를 대고, 설명까지 요구해요' },
]

/** C16. 프로덕트 엔지니어로 가기 위한 기본기 전략 */
export function RedefineSlide() {
  return (
    <SlideLayout>
      <SlideKicker>프로덕트 엔지니어로 가는 첫 전략</SlideKicker>

      <div className="animate-rise-1 flex flex-col gap-4">
        <p className="text-deck-lead font-semibold text-content-muted line-through">결과물부터 빠르게 늘리기</p>
        <p className="text-deck-title font-bold text-content-strong">
          코드를 읽고, 직접 구현하고, <Mark>근거를 설명하는 기본기</Mark>
        </p>
      </div>

      <ol className="grid gap-5 lg:grid-cols-3">
        {CONDITIONS.map((condition, index) => (
          <Panel
            key={condition.text}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-5',
              index === 0 && 'animate-rise-2',
              index === 1 && 'animate-rise-3',
              index === 2 && 'animate-rise-4',
            )}
          >
            <div className="flex items-center gap-4">
              <condition.icon size={34} className="text-accent" />
              <span className="grid size-9 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-secondary md:size-12">
                {index + 1}
              </span>
            </div>
            <p className="text-deck-body font-semibold text-content-strong">{condition.text}</p>
          </Panel>
        ))}
      </ol>

      <SlideBody>
        2부의 프롬프트는 제품의 여러 영역을 구현하는 데 필요한 <Mark>기본기를 쌓는 학습 전략</Mark>이에요.
      </SlideBody>
    </SlideLayout>
  )
}
