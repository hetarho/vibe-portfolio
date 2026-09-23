import { ArrowRight, Lightbulb, MessageCircleQuestion, Repeat2, TriangleAlert } from 'lucide-react'
import type { ComponentType } from 'react'
import type { SlideProps } from '../../../deck'
import { Chip, Mark, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'
import type { ThinkingDrill } from '../model/thinking-drills'

/** W21. 이야기에서 사고 연습으로 넘어가는 전환 화면. */
export function DrillIntroSlide() {
  return (
    <SlideLayout>
      <SlideKicker>여기서부터 후반부</SlideKicker>
      <SlideHeadline size="hero">이제 같은 가게에서, 만들기 전에 하는 생각을 연습합니다</SlideHeadline>
      <SlideLead>
        앞에서 구조를 봤으니 이번에는 판단입니다. 실력 차이가 갈리는 지점은 문법이 아니라 만들기 전에 떠올리는 경우의 수입니다.
      </SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <Panel tone="raised" pad="lg" className="flex flex-col gap-4">
          <MessageCircleQuestion className="size-8 text-accent md:size-11" />
          <p className="text-deck-lead font-bold text-content-strong">상황을 먼저 봅니다</p>
          <p className="text-deck-body text-content-secondary">분식집 사이트에서 실제로 생길 법한 일이 나옵니다</p>
        </Panel>
        <Panel tone="accentSoft" pad="lg" className="flex flex-col gap-4">
          <Lightbulb className="size-8 text-accent md:size-11" />
          <p className="text-deck-lead font-bold text-content-strong">먼저 답해 봅니다</p>
          <p className="text-deck-body text-content-secondary">처음 떠오르는 답이 어디서 무너지는지 함께 봅니다</p>
        </Panel>
        <Panel tone="raised" pad="lg" className="flex flex-col gap-4">
          <Repeat2 className="size-8 text-accent md:size-11" />
          <p className="text-deck-lead font-bold text-content-strong">규칙 한 줄을 남깁니다</p>
          <p className="text-deck-body text-content-secondary">다른 문제에서도 그대로 꺼내 쓸 수 있는 문장입니다</p>
        </Panel>
      </div>

      <SlideNote tone="quiet">
        열 개를 다 못 해도 괜찮습니다 · <Mark>하나를 끝까지 말로 설명하는 경험</Mark>이 더 중요합니다
      </SlideNote>
    </SlideLayout>
  )
}

/** 학생이 먼저 답하는 화면. 여기서는 정답도 용어도 꺼내지 않는다. */
export function makeDrillQuestionSlide(drill: ThinkingDrill): ComponentType<SlideProps> {
  return function DrillQuestionSlide() {
    return (
      <SlideLayout>
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>사고 연습 {drill.no}</SlideKicker>
          <Chip>{drill.skill}</Chip>
        </div>
        <SlideHeadline>{drill.title}</SlideHeadline>
        <SlideLead>{drill.situation}</SlideLead>

        <Panel tone="accentSoft" pad="lg" className="flex flex-col gap-3">
          <PanelLabel tone="accent">지금 답해 봅니다</PanelLabel>
          <p className="text-deck-title font-bold text-content-strong">{drill.ask}</p>
        </Panel>

        <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
          {drill.firstThoughts.map((thought, index) => (
            <Panel
              key={thought}
              tone={index === 1 ? 'sunken' : 'raised'}
              pad="md"
              className={cx('flex items-start gap-3', `animate-rise-${index + 1}`)}
            >
              <MessageCircleQuestion className="size-6 shrink-0 text-accent md:size-8" />
              <p className="text-deck-caption font-semibold text-content-primary">{thought}</p>
            </Panel>
          ))}
        </div>

        <SlideNote tone="quiet">막히면 이 세 질문에 하나씩 답해 봅니다 · 답이 모이면 그게 곧 설계입니다</SlideNote>
      </SlideLayout>
    )
  }
}

/** 처음 떠오르는 답이 무너지는 지점과, 개발자가 거치는 생각 세 단계. */
export function makeDrillAnswerSlide(drill: ThinkingDrill): ComponentType<SlideProps> {
  return function DrillAnswerSlide() {
    return (
      <SlideLayout align="top">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>사고 연습 {drill.no} · 함께 보기</SlideKicker>
          <Chip tone="accent">{drill.skill}</Chip>
        </div>

        <Panel tone="raised" pad="md" className="grid items-center gap-4 lg:grid-cols-9 lg:gap-6">
          <div className="flex flex-col gap-2 lg:col-span-4">
            <PanelLabel>처음 떠오르는 답</PanelLabel>
            <p className="text-deck-body font-semibold text-content-secondary">{drill.naive.answer}</p>
          </div>
          <div className="flex justify-center lg:col-span-1">
            <ArrowRight className="size-6 text-accent md:size-8" />
          </div>
          <div className="flex flex-col gap-2 rounded-card bg-surface-sunken p-4 inset-shadow-sunken md:p-5 lg:col-span-4">
            <div className="flex items-center gap-3">
              <TriangleAlert className="size-6 shrink-0 text-caution md:size-7" />
              <PanelLabel>무너지는 지점</PanelLabel>
            </div>
            <p className="text-deck-caption font-bold text-content-strong">{drill.naive.breaks}</p>
          </div>
        </Panel>

        <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
          {drill.think.map((item, index) => (
            <Panel
              key={item.head}
              tone={index === 1 ? 'accentSoft' : 'raised'}
              pad="md"
              className={cx('flex flex-col gap-2', `animate-rise-${index + 1}`)}
            >
              <PanelLabel tone={index === 1 ? 'accent' : 'muted'}>{index + 1}단계</PanelLabel>
              <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
              <p className="text-deck-caption text-content-secondary">{item.detail}</p>
            </Panel>
          ))}
        </div>

        <Panel tone="sunken" pad="md" className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
          <Lightbulb className="size-7 shrink-0 text-accent md:size-9" />
          <div className="flex flex-col gap-1">
            <PanelLabel tone="accent">남길 규칙</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">{drill.rule}</p>
          </div>
        </Panel>

        <div className="grid gap-3 md:grid-cols-2 md:gap-5">
          {drill.alsoHere.map((item) => (
            <div key={item.where} className="flex flex-col gap-1 rounded-card bg-surface-raised px-4 py-3 shadow-raised md:px-6 md:py-4">
              <p className="text-deck-caption font-bold text-content-strong">{item.where}</p>
              <p className="text-deck-meta text-content-secondary">{item.same}</p>
            </div>
          ))}
        </div>
      </SlideLayout>
    )
  }
}
