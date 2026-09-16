import { ArrowRight, MessageCircleQuestion, Sparkles } from 'lucide-react'
import type { ComponentType } from 'react'
import type { SlideProps } from '../../../deck'
import { Chip, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'
import type { ThinkingExample } from '../model/thinking-examples'

/** 학생이 먼저 답하고 이유를 말하는 화면. 아직 풀이 방식도 코드도 보여주지 않는다. */
export function makeChallengeSlide(example: ThinkingExample): ComponentType<SlideProps> {
  return function ChallengeSlide() {
    return (
      <SlideLayout>
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>사고 연습 {example.no} · {example.level}</SlideKicker>
          <Chip>{example.pattern}</Chip>
        </div>
        <SlideHeadline>{example.title}</SlideHeadline>
        <SlideLead>{example.situation}</SlideLead>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-2 flex flex-col gap-3">
          <PanelLabel tone="accent">주어진 것</PanelLabel>
          <p className="text-deck-title font-bold text-content-strong">{example.given}</p>
          <p className="text-deck-body font-semibold text-content-primary">{example.ask}</p>
        </Panel>

        <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
          {example.firstQuestions.map((question, index) => (
            <Panel key={question} tone={index === 1 ? 'sunken' : 'raised'} pad="md" className={cx('flex items-start gap-3', `animate-rise-${index + 1}`)}>
              <MessageCircleQuestion className="size-6 shrink-0 text-accent md:size-8" />
              <p className="text-deck-caption font-semibold text-content-primary">{question}</p>
            </Panel>
          ))}
        </div>

        <SlideNote tone="quiet">“그냥 당연해요”에서 멈추지 말고, 다른 사람이 같은 답을 낼 수 있게 이유를 말해봅니다</SlideNote>
      </SlideLayout>
    )
  }
}

/** 하나의 정답에 도달하는 여러 사고 경로와, 그 경로들이 공유하는 일반 규칙. */
export function makeSolutionSlide(example: ThinkingExample): ComponentType<SlideProps> {
  return function SolutionSlide() {
    return (
      <SlideLayout align="top">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>사고 연습 {example.no} · 설명 비교</SlideKicker>
          <Chip tone="accent">정답 · {example.answer}</Chip>
        </div>
        <SlideHeadline>같은 답을 설명하는 방법은 하나가 아닙니다</SlideHeadline>

        <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
          {example.paths.map((path, index) => (
            <Panel key={path.name} tone={index === 1 ? 'accentSoft' : 'raised'} pad="md" className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}>
              <PanelLabel tone={index === 1 ? 'accent' : 'muted'}>{index + 1}번째 설명</PanelLabel>
              <p className="text-deck-body font-bold text-content-strong">{path.name}</p>
              <p className="text-deck-caption text-content-secondary">{path.idea}</p>
              <div className="mt-auto flex flex-col gap-2 rounded-control bg-surface-sunken p-3 inset-shadow-sunken md:p-4">
                {path.steps.map((step) => (
                  <p key={step} className="text-deck-caption font-semibold text-content-primary">· {step}</p>
                ))}
              </div>
            </Panel>
          ))}
        </div>

        <Panel tone="raised" pad="md" className="grid gap-3 lg:grid-cols-9 lg:gap-6">
          <div className="flex flex-col gap-2 lg:col-span-5">
            <div className="flex items-center gap-3">
              <Sparkles className="size-6 shrink-0 text-accent md:size-8" />
              <PanelLabel tone="accent">세 방법이 공유하는 한글 논리</PanelLabel>
            </div>
            <p className="text-deck-body font-bold text-content-strong">{example.sharedLogic}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-card bg-surface-sunken p-4 inset-shadow-sunken md:p-5 lg:col-span-4">
            <PanelLabel>이렇게 소리 내어 말하기</PanelLabel>
            {example.sayIt.map((line) => (
              <p key={line} className="text-deck-caption font-semibold text-content-primary">{line}</p>
            ))}
          </div>
        </Panel>

        <div className="grid gap-3 md:grid-cols-2 md:gap-5">
          {example.nextCases.map((item) => (
            <div key={item.given} className="flex items-center gap-3 rounded-card bg-surface-sunken px-4 py-3 inset-shadow-sunken md:px-6 md:py-4">
              <p className="text-deck-meta font-semibold text-content-secondary">{item.given}</p>
              <ArrowRight className="size-5 shrink-0 text-accent" />
              <p className="text-deck-meta font-bold text-content-strong">{item.answer}</p>
            </div>
          ))}
        </div>
      </SlideLayout>
    )
  }
}
