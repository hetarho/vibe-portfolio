import {
  Bot,
  Brain,
  CheckCircle2,
  Database,
  Eye,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  UserRound,
  Wrench,
} from 'lucide-react'
import { useState } from 'react'
import {
  Chip,
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
} from '../../../deck'

/** A3. 챗봇과 에이전트 */
export function ChatbotVsAgentSlide() {
  return (
    <SlideLayout>
      <SlideKicker>에이전트란 무엇인가</SlideKicker>
      <SlideHeadline>챗봇은 답하고, 에이전트는 다음 일까지 이어갑니다</SlideHeadline>

      <CompareGrid>
        <Panel tone="sunken" pad="md" className="animate-rise-1 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <MessageCircle className="size-8 text-content-muted md:size-10" />
            <PanelLabel>챗봇처럼 쓰기</PanelLabel>
          </div>
          <p className="text-deck-lead font-bold text-content-secondary">“Zonta에 대해 알려줘”</p>
          <p className="text-deck-body text-content-muted">그럴듯한 답을 받습니다. 어디까지 조사했고 무엇이 빠졌는지는 내가 다시 챙깁니다.</p>
        </Panel>

        <Panel tone="raised" pad="md" className="animate-rise-2 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Bot className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">에이전트로 쓰기</PanelLabel>
          </div>
          <p className="text-deck-lead font-bold text-content-strong">“공식 자료를 조사해 근거표와 PPT 초안을 완성해줘”</p>
          <p className="text-deck-body text-content-secondary">계획하고, 도구를 쓰고, 결과를 확인하고, 빠진 것을 보고합니다.</p>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        에이전트는 별도 마법 상품의 이름이 아니라 <Mark>목표 + 도구 + 반복 + 완료 조건</Mark>의 조합입니다
      </SlideNote>
    </SlideLayout>
  )
}

const LOOP = [
  { name: '목표 이해', detail: '무엇이 끝인지 묻기' },
  { name: '계획', detail: '작업을 작은 순서로 나누기' },
  { name: '도구 사용', detail: '웹·파일·PPT를 직접 다루기' },
  { name: '검수', detail: '출처와 빠진 내용 확인하기' },
  { name: '보고·수정', detail: '결과와 질문을 함께 내기' },
]

/** A4. 에이전트 루프 */
export function AgentLoopSlide() {
  const [revealed, setRevealed] = useState(1)

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>답을 기다리는 동안 일어나는 일</SlideKicker>
          <SlideHeadline>에이전트는 이 다섯 단계를 반복합니다</SlideHeadline>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setRevealed((value) => Math.min(value + 1, LOOP.length))}
            disabled={revealed === LOOP.length}
            className="rounded-full bg-accent px-4 py-3 text-deck-caption font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck md:px-7 disabled:opacity-40"
          >
            다음 단계
          </button>
          <button
            type="button"
            onClick={() => setRevealed(1)}
            aria-label="처음부터"
            className="grid size-10 place-items-center rounded-full bg-surface-raised text-content-secondary shadow-raised md:size-12"
          >
            <RotateCcw className="size-5 md:size-6" />
          </button>
        </div>
      </div>

      <ol className="grid gap-4 lg:grid-cols-5">
        {LOOP.map((step, index) => {
          const on = index < revealed
          return (
            <li
              key={step.name}
              className={cx(
                'flex flex-col gap-4 rounded-card p-5 transition duration-500 ease-deck md:p-7',
                on ? 'bg-surface-raised shadow-raised' : 'bg-surface-sunken inset-shadow-sunken',
              )}
            >
              <span
                className={cx(
                  'grid size-10 place-items-center rounded-full text-deck-caption font-bold md:size-12',
                  on ? 'bg-accent text-accent-contrast' : 'bg-surface-highlight text-content-muted',
                )}
              >
                {index + 1}
              </span>
              <p className={cx('text-deck-body font-bold', on ? 'text-content-strong' : 'text-content-muted')}>{step.name}</p>
              <p className="mt-auto text-deck-caption text-content-secondary">{step.detail}</p>
            </li>
          )
        })}
      </ol>

      <SlideBody>
        결과가 기준에 못 미치면 4 → 5 → 2로 돌아갑니다. 이 <Mark>되돌아가는 힘</Mark>이 한 번 답하는 챗봇과 다릅니다.
      </SlideBody>
    </SlideLayout>
  )
}

const PARTS = [
  { icon: Brain, name: '두뇌', body: '읽고 판단하고 계획하는 AI 모델' },
  { icon: Wrench, name: '손', body: '검색 · 파일 읽기 · 문서와 PPT 만들기' },
  { icon: Database, name: '기억', body: '목표 · 선호 · 자료 · 지난 작업 기록' },
  { icon: ShieldCheck, name: '승인선', body: '공개 · 결제 · 삭제 전에 사람에게 묻기' },
]

/** A5. 에이전트의 네 부품 */
export function AgentPartsSlide() {
  return (
    <SlideLayout>
      <SlideKicker>에이전트를 만드는 재료</SlideKicker>
      <SlideHeadline>에이전트가 일하려면 네 가지가 필요합니다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {PARTS.map((part, index) => (
          <Panel
            key={part.name}
            tone={index === 3 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}
          >
            <part.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-lead font-bold text-content-strong">{part.name}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{part.body}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        오늘 만드는 영어 코치도 똑같아요 · <Mark>지침 + 내 자료 + 매일 반복 + 학습 기록</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const ROLES = [
  {
    icon: UserRound,
    label: '사람이 결정',
    items: ['왜 하는지', '누구에게 말할지', '민감한 현안', '최종 메시지와 공개'],
  },
  {
    icon: Bot,
    label: '에이전트가 수행',
    items: ['자료 찾기', '비교·정리', '초안과 파일 제작', '반복 검수와 수정'],
  },
  {
    icon: Eye,
    label: '함께 확인',
    items: ['출처와 최신성', '빠진 관점', '청중에게 맞는 말', '완료 조건 통과'],
  },
]

/** A6. 사람과 에이전트의 역할 */
export function HumanAgentRolesSlide() {
  return (
    <SlideLayout>
      <SlideKicker>주도권은 사람에게</SlideKicker>
      <SlideHeadline>내용은 내가 정하고, 시간이 드는 일은 맡깁니다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {ROLES.map((role, index) => (
          <Panel
            key={role.label}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}
          >
            <div className="flex items-center gap-4">
              <role.icon className="size-7 text-accent md:size-9" />
              <p className="text-deck-lead font-bold text-content-strong">{role.label}</p>
            </div>
            <ul className="flex flex-col gap-3">
              {role.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-deck-caption text-content-secondary">
                  <CheckCircle2 className="size-5 shrink-0 text-positive md:size-6" />
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        AI가 내용을 대신 결정하는 게 아니라 <Mark>내 판단에 쓸 근거와 초안을 빠르게 만드는 것</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const BRIEF = [
  ['역할', '누구처럼 일할지'],
  ['상황', '왜 지금 하는지'],
  ['목표', '누구에게 어떤 변화를 줄지'],
  ['입력', '읽어야 할 자료'],
  ['산출물', '표·문서·PPT·대화'],
  ['규칙', '출처·분량·금지선'],
  ['완료 조건', '무엇을 확인하면 끝인지'],
]

/** A7. 에이전트 브리프 공식 */
export function AgentBriefSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>오늘 계속 돌아올 공식</SlideKicker>
          <SlideHeadline>일을 맡길 때는 이 일곱 가지를 말합니다</SlideHeadline>
        </div>
        <Chip tone="accent">브리프 = 업무 위임서</Chip>
      </div>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-7">
        {BRIEF.map(([name, detail], index) => (
          <Panel
            key={name}
            tone={index === BRIEF.length - 1 ? 'accentSoft' : 'raised'}
            pad="sm"
            className={cx('flex flex-col gap-3', index < 4 ? `animate-rise-${index + 1}` : 'animate-rise-5')}
          >
            <span className="grid size-9 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-11">
              {index + 1}
            </span>
            <p className="text-deck-body font-bold text-content-strong">{name}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{detail}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-5">
        <p className="text-deck-body font-semibold text-content-primary">
          예: 공식 자료만 조사해 <Mark>출처가 붙은 10장 오리엔테이션 초안</Mark>을 만들고, 확인 못 한 내용은 질문으로 남겨줘.
        </p>
      </Panel>
    </SlideLayout>
  )
}
