import { Bot, CalendarCheck, FileSearch, MessageCircle, Terminal } from 'lucide-react'
import {
  CompareGrid,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideNote,
} from '../../../deck'

/**
 * 에이전트 개념 공통 화면 3장. V2 체계의 모든 덱이 재사용한다.
 * 특정 수강생·직군 이야기는 넣지 않는다. 맞춤 이야기는 각 덱의 화면에서 한다.
 */

const CHATBOT_SIDE = [
  '질문 하나 → 답 하나 → 끝',
  '결과는 채팅창 속의 글',
  '다음 행동을 정하는 건 항상 사람',
]

const AGENT_SIDE = [
  '목표 하나 → 여러 단계를 스스로 진행',
  '도구를 쓴다: 검색 · 파일 · 프로그램 실행',
  '결과는 파일: 문서 · 표 · 그림 · 코드',
]

/** 공통 Agent-1. 에이전트란 무엇인가 */
export function AgentWhatSlide() {
  return (
    <SlideLayout>
      <SlideKicker>개념 · 에이전트란</SlideKicker>
      <SlideHeadline>묻고 답하는 AI에서, 일을 맡는 AI로</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <MessageCircle className="size-8 text-content-muted md:size-10" />
            <PanelLabel>챗봇</PanelLabel>
          </div>
          <p className="text-deck-lead font-bold text-content-strong">질문에 답하고 멈춘다</p>
          <ul className="flex flex-col gap-3">
            {CHATBOT_SIDE.map((item) => (
              <li key={item} className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-secondary inset-shadow-sunken md:p-4">
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-2 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <Bot className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">에이전트</PanelLabel>
          </div>
          <p className="text-deck-lead font-bold text-content-strong">목표를 받아 일을 끝낸다</p>
          <ul className="flex flex-col gap-3">
            {AGENT_SIDE.map((item) => (
              <li key={item} className="rounded-card bg-surface-raised p-3 text-deck-caption font-semibold text-content-primary shadow-raised md:p-4">
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        공식 하나면 됩니다 · 에이전트 = <Mark>AI 두뇌 + 도구 + 반복</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const LOOP = [
  { head: '목표 확인', body: '무엇이 완료인지부터 정한다' },
  { head: '계획', body: '일을 작은 단계로 나눈다' },
  { head: '도구 실행', body: '검색하고 파일을 만들고 프로그램을 돌린다' },
  { head: '검사', body: '기준에 못 미치면 앞 단계로 되돌아간다' },
  { head: '보고', body: '결과와 남은 문제를 알려온다' },
]

/** 공통 Agent-2. 에이전트가 일하는 방식 */
export function AgentLoopSlide() {
  return (
    <SlideLayout>
      <SlideKicker>개념 · 에이전트란</SlideKicker>
      <SlideHeadline>목표를 받으면 다섯 단계를 반복합니다</SlideHeadline>

      <ol className="grid gap-4 lg:grid-cols-5">
        {LOOP.map((step, index) => (
          <li key={step.head} className="contents">
            <Panel
              tone={index === 3 ? 'accentSoft' : 'raised'}
              pad="md"
              className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
            >
              <span className="grid size-10 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-12">
                {index + 1}
              </span>
              <p className="text-deck-body font-bold text-content-strong">{step.head}</p>
              <p className="mt-auto text-deck-caption text-content-secondary">{step.body}</p>
            </Panel>
          </li>
        ))}
      </ol>

      <Panel tone="sunken" pad="md" className="animate-rise-5 flex items-center gap-4">
        <p className="text-deck-body font-semibold text-content-primary">
          사람의 일은 두 가지 · 목표와 <Mark>완료 조건</Mark>을 주고, 되돌리기 어려운 일은 승인으로 막는다
        </p>
      </Panel>
    </SlideLayout>
  )
}

const AGENT_USES = [
  {
    icon: Terminal,
    head: '코딩 에이전트',
    body: 'Claude Code · Codex. 내 컴퓨터에서 파일을 만들고 프로그램을 실행한다. 말로 시켜 결과물을 만드는 “바이브코딩”',
  },
  {
    icon: FileSearch,
    head: '리서치 에이전트',
    body: '수십 개 자료를 읽고 출처가 달린 보고서를 쓰는 Deep Research류',
  },
  {
    icon: CalendarCheck,
    head: '업무 자동화',
    body: '메일 분류 · 일정 · 반복 업무를 규칙과 함께 맡김',
  },
]

/** 공통 Agent-3. 실무에서는 */
export function AgentInPracticeSlide() {
  return (
    <SlideLayout>
      <SlideKicker>실무에서는</SlideKicker>
      <SlideHeadline>실무 에이전트는 세 갈래로 자리 잡았습니다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {AGENT_USES.map((use, index) => (
          <Panel
            key={use.head}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}
          >
            <use.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-lead font-bold text-content-strong">{use.head}</p>
            <p className="mt-auto text-deck-body text-content-secondary">{use.body}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        갈래가 달라도 사람의 일은 같습니다 · <Mark>시키고 · 확인하고 · 책임진다</Mark>
      </SlideNote>
    </SlideLayout>
  )
}
