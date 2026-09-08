import { Check, X } from 'lucide-react'
import { CompareGrid, Mark, Panel, PanelLabel, SlideBody, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'
import { PromptCopyButton } from '../../shared'
import { AI_IS_STUDY, AI_NOT_STUDY, GUARDRAILS, PROMPT_OUTPUT, PROMPT_STEPS, THIRTY_MAP } from '../model/aitool'
import studyPrompt from '../model/study-prompt.md?raw'

/** B25. ⭐ 같은 기준을 AI에도 그대로 쓴다 */
export function AiJudgeSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 7 · 집에서 쓰는 도구</SlideKicker>
      <SlideHeadline>
        AI에게 요약을 받으면 <Mark>강의 다시 보기</Mark>입니다
      </SlideHeadline>
      <SlideLead>
        4부에서 세운 기준을 그대로 씁니다. 꺼내는 쪽을 쓰는지만 봅니다. AI를 쓴다고 기준이 바뀌지 않습니다.
      </SlideLead>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-control bg-surface-raised text-content-muted shadow-raised md:size-12">
              <X className="size-6" strokeWidth={3} />
            </span>
            <PanelLabel>AI가 대신하면 재생이 안 자란다</PanelLabel>
          </div>
          {AI_NOT_STUDY.map((item) => (
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
            <PanelLabel>내가 꺼내게 시키면 재생이 자란다</PanelLabel>
          </div>
          {AI_IS_STUDY.map((item, index) => (
            <div key={item.act} className={cx('flex flex-col', `animate-rise-${index + 1}`)}>
              <p className="text-deck-body font-bold text-content-strong">{item.act}</p>
              <p className="text-deck-caption text-content-secondary">{item.why}</p>
            </div>
          ))}
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        AI는 <Mark>채점하는 사람</Mark>이고 설명하는 사람이 아닙니다 · 이 한 줄이 프롬프트 전체의 뼈대입니다
      </SlideNote>
    </SlideLayout>
  )
}

/** B26. ⭐ 프롬프트 복사 · PPT를 올리고 붙여넣는다 */
export function AiPromptSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-5">
          <SlideKicker>PART 7 · 집에서 쓰는 도구</SlideKicker>
          <SlideHeadline>
            오늘 PPT를 올리고 <Mark>이 프롬프트</Mark>를 붙여넣습니다
          </SlideHeadline>
          <SlideBody>
            강사님이 매주 주시는 PPT가 그대로 문제집이 됩니다. 무엇을 공부할지 AI가 정하지 않습니다.
          </SlideBody>
          <PromptCopyButton size="md" label="복습 프롬프트 복사" text={studyPrompt} />
        </div>

        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>오늘 밤에 하는 순서</PanelLabel>
          {PROMPT_STEPS.map((step, index) => (
            <div key={step.head} className={cx('flex items-start gap-4', `animate-rise-${index + 1}`)}>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-raised text-deck-caption font-bold text-content-primary shadow-raised md:size-10">
                {index + 1}
              </span>
              <div className="flex flex-col">
                <p className="text-deck-caption font-bold text-content-strong">{step.head}</p>
                <p className="text-deck-caption text-content-secondary">{step.detail}</p>
              </div>
            </div>
          ))}
        </Panel>
      </div>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
        {PROMPT_OUTPUT.map((item, index) => (
          <Panel
            key={item.label}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex flex-col gap-2', `animate-rise-${index + 1}`)}
          >
            <PanelLabel>{item.label}</PanelLabel>
            <p className="text-deck-caption text-content-secondary">{item.text}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        오늘 배운 <Mark>배열 PPT</Mark>로 지금 한 번 돌려 봅니다 · 첫날만 같이 해 보면 그다음은 혼자 할 수 있습니다
      </SlideNote>
    </SlideLayout>
  )
}

/** B27. 하루 30분에 넣는 자리와 멈춰야 할 신호 */
export function AiGuardSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 7 · 집에서 쓰는 도구</SlideKicker>
      <SlideHeadline>
        4부에서 정한 <Mark>하루 30분</Mark>에 그대로 들어갑니다
      </SlideHeadline>
      <SlideLead>새로 늘어나는 시간이 없습니다. 어제 것 꺼내기와 오늘 문제 하나를 프롬프트가 대신 차려 줍니다.</SlideLead>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
        {THIRTY_MAP.map((item, index) => (
          <Panel
            key={item.time}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <span className="w-fit rounded-control bg-surface-sunken px-4 py-2 text-deck-body font-bold text-content-strong inset-shadow-sunken">
              {item.time}
            </span>
            <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-caption text-content-secondary">{item.detail}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="flex flex-col gap-4">
        <PanelLabel>이 셋 중 하나가 보이면 멈추고 다시 시킵니다</PanelLabel>
        <div className="grid gap-4 md:grid-cols-3">
          {GUARDRAILS.map((item) => (
            <div key={item.head} className="flex flex-col gap-1">
              <p className="text-deck-caption font-bold text-content-strong">{item.head}</p>
              <p className="text-deck-caption text-content-secondary">{item.detail}</p>
            </div>
          ))}
        </div>
      </Panel>

      <SlideNote>
        다음 회차에서 AI를 <Mark>더 깊이</Mark> 다룹니다 · 오늘 잡은 판단을 대신 맡기지 않는 선에서
      </SlideNote>
    </SlideLayout>
  )
}
