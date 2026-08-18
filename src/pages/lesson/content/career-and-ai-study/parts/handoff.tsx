import { MessagesSquare, Terminal } from 'lucide-react'
import {
  Chip,
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
import { PromptCopyButton } from '../../shared'

const RUN_STEPS = [
  { head: '빈 폴더를 하나 만들고', body: '거기서 코딩 CLI를 열어요' },
  { head: '복사한 프롬프트를 붙여넣고', body: '맨 끝에 첫 역할에 필요한 기술을 적어요' },
  { head: '물어보는 것에 답해요', body: '답이 끝나면 알아서 만들기 시작해요' },
]

/** 2부 시작 — 프롬프트를 먼저 돌려놓는다 */
export function RunNowSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-5">
          <SlideKicker>PART 2 시작</SlideKicker>
          <SlideHeadline>
            먼저 <Mark>돌려놓고</Mark> 시작할게요
          </SlideHeadline>
          <SlideBody>선택한 기술의 기본기를 쌓을 학습 프로젝트부터 만들어요.</SlideBody>
          <PromptCopyButton />
        </div>

        <Panel tone="sunken" pad="lg" className="flex flex-col gap-5 lg:col-span-4">
          <div className="flex items-center gap-4">
            <Terminal size={34} className="text-accent" />
            <PanelLabel tone="accent">지금 할 것</PanelLabel>
          </div>
          {RUN_STEPS.map((step, index) => (
            <div
              key={step.head}
              className={cx(
                'flex items-start gap-5',
                index === 0 && 'animate-rise-1',
                index === 1 && 'animate-rise-2',
                index === 2 && 'animate-rise-3',
              )}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-raised text-deck-caption font-bold text-content-primary md:size-12">
                {index + 1}
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-deck-caption font-bold text-content-strong">{step.head}</span>
                <span className="text-deck-caption text-content-secondary">{step.body}</span>
              </span>
            </div>
          ))}
        </Panel>
      </div>

      <SlideNote>붙여넣으면 코드부터 안 짜고 질문부터 올라와요. 그거 답하는 게 첫 일이에요</SlideNote>
    </SlideLayout>
  )
}

const ASKS = [
  { q: '뭘 배우고 싶어요?', a: '첫 지원 직무에 필요한 언어나 프레임워크부터' },
  { q: '어디까지 가고 싶어요?', a: '기능 구현 / 문제 진단·수정 / 설계까지' },
  { q: '한 번에 얼마나 해요?', a: '레슨 하나의 크기가 여기서 정해져요' },
  { q: '편한 언어 있어요?', a: '앞으로 비유를 그 언어로 들어줘요' },
  { q: '어떤 AI 도구 써요?', a: '세션 여는 방법이 도구마다 달라서 물어봐요' },
]

/** 2부 · 튜터가 먼저 물어보는 것 */
export function InterviewSlide() {
  return (
    <SlideLayout>
      <SlideKicker>첫 화면</SlideKicker>
      <SlideHeadline>코드보다 질문이 먼저 와요</SlideHeadline>

      <div className="grid gap-4 lg:grid-cols-2">
        {ASKS.map((ask, index) => (
          <Panel
            key={ask.q}
            tone={index === 4 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx(
              'flex flex-col gap-2',
              index === 4 && 'lg:col-span-2',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index >= 3 && 'animate-rise-4',
            )}
          >
            <p className="flex items-center gap-4 text-deck-body font-bold text-content-strong">
              <MessagesSquare size={26} className={index === 4 ? 'text-accent' : 'text-content-muted'} />
              {ask.q}
            </p>
            <p className="text-deck-caption text-content-secondary">{ask.a}</p>
          </Panel>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Chip tone="accent">모르겠으면 모르겠다고</Chip>
        <span className="text-deck-caption text-content-secondary">
          기본값을 정해서 알려주고 넘어가요. 붙잡고 고민하지 마세요
        </span>
      </div>
    </SlideLayout>
  )
}
