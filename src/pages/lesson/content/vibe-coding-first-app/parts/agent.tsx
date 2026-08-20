import { ArrowRight, Check, ChefHat, Eye, FilePlus2, MessageCircle, RotateCcw, RefreshCw, ShieldCheck, Terminal } from 'lucide-react'
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
} from '../../../deck'

/** S9. 챗봇 vs 에이전트 */
export function ChatbotVsAgentSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>
        그럼 <Mark>에이전트</Mark>는 뭔가요?
      </SlideHeadline>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 md:gap-7">
          <div className="flex items-center gap-4">
            <MessageCircle size={38} className="text-content-muted" />
            <PanelLabel>챗봇</PanelLabel>
          </div>
          <p className="text-deck-lead font-bold text-content-secondary">
            레시피를 <span className="text-content-primary">알려주는</span> 사람
          </p>
          <p className="text-deck-body text-content-muted">방법은 친절하게 설명해 줍니다. 요리는 내가 합니다.</p>
        </Panel>

        <Panel tone="raised" pad="lg" className="flex flex-col gap-4 md:gap-7">
          <div className="flex items-center gap-4">
            <ChefHat size={38} className="text-accent" />
            <PanelLabel tone="accent">에이전트</PanelLabel>
          </div>
          <p className="text-deck-lead font-bold text-content-strong">
            주방에서 직접 <Mark>요리해주는</Mark> 셰프
          </p>
          <p className="text-deck-body text-content-secondary">내 주문을 듣고 만들고 맛까지 보고 내옵니다.</p>
          <Chip tone="accent">코드 작성 + 실행 + 오류 수정까지 스스로</Chip>
        </Panel>
      </CompareGrid>
    </SlideLayout>
  )
}

const FLOW = [
  { label: '이해', detail: '무엇을 원하는지 파악' },
  { label: '계획', detail: '어떤 순서로 만들지 정리' },
  { label: '작성', detail: '코드를 씀' },
  { label: '실행·확인', detail: '실제로 돌려봄' },
  { label: '수정', detail: '어긋난 부분을 고침' },
]

/** S10. 에이전트의 작업 흐름 */
export function AgentFlowSlide() {
  const [revealed, setRevealed] = useState(1)
  const done = revealed > FLOW.length

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>기다리는 시간에 무슨 일이 일어나나</SlideKicker>
          <SlideHeadline>에이전트는 이 순서로 일합니다</SlideHeadline>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setRevealed((value) => Math.min(value + 1, FLOW.length + 1))}
            disabled={done}
            className="rounded-full bg-accent px-4 py-4 text-deck-caption font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck md:px-8 hover:bg-accent-strong disabled:opacity-40"
          >
            다음 단계
          </button>
          <button
            type="button"
            onClick={() => setRevealed(1)}
            aria-label="처음부터"
            className="grid size-10 place-items-center rounded-full bg-surface-raised text-content-secondary shadow-raised transition duration-200 ease-deck md:size-14 hover:bg-surface-highlight hover:text-content-primary"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>

      <ol className="grid gap-4 lg:grid-cols-5">
        {FLOW.map((step, index) => {
          const on = index < revealed
          return (
            <li
              key={step.label}
              className={cx(
                'flex flex-col gap-4 rounded-panel p-5 transition duration-500 ease-deck md:p-8',
                on ? 'bg-surface-raised shadow-raised' : 'bg-surface-sunken inset-shadow-sunken',
              )}
            >
              <span
                className={cx(
                  'grid size-10 place-items-center rounded-full text-deck-caption font-bold transition duration-300 ease-deck md:size-14',
                  on ? 'bg-accent text-accent-contrast' : 'bg-surface-highlight text-content-muted',
                )}
              >
                {index + 1}
              </span>
              <p className={cx('text-deck-body font-bold', on ? 'text-content-strong' : 'text-content-muted')}>
                {step.label}
              </p>
              <p className={cx('text-deck-caption', on ? 'text-content-secondary' : 'text-content-muted')}>
                {step.detail}
              </p>
            </li>
          )
        })}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <p className="flex items-center gap-4 rounded-panel bg-surface-raised px-4 py-3 text-deck-caption font-semibold text-content-secondary shadow-raised md:px-8 md:py-5">
          <RefreshCw size={28} className="text-accent" />
          4 → 5 반복: 오류가 나면 스스로 되돌아가 고칩니다
        </p>

        <p
          className={cx(
            'flex items-center gap-4 rounded-panel px-4 py-3 text-deck-body font-bold transition duration-500 ease-deck md:px-8 md:py-5',
            done ? 'animate-pop bg-accent text-accent-contrast shadow-lifted' : 'bg-surface-sunken text-content-muted',
          )}
        >
          <Check size={30} strokeWidth={3} />
          완성
        </p>
      </div>
    </SlideLayout>
  )
}

const AGENT_ACTIONS = [
  { icon: FilePlus2, head: '파일을 만들고 고쳐요', body: '내가 만든 폴더 안에 index.html 같은 파일이 실제로 생깁니다' },
  { icon: Terminal, head: '터미널 명령을 실행해요', body: '설치하고, 앱을 띄우고, 안 되면 다시 실행해 봅니다' },
  { icon: Eye, head: '결과를 읽고 판단해요', body: '오류 메시지를 보고 어디가 틀렸는지 스스로 찾습니다' },
]

/** V17. 에이전트가 내 컴퓨터에서 실제로 하는 일 — 승인 규칙까지 */
export function AgentOnMyComputerSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col gap-4 md:gap-6">
        <SlideKicker>남의 서버가 아니라 내 컴퓨터</SlideKicker>
        <SlideHeadline>
          에이전트는 <Mark>내 폴더 안에서</Mark> 손을 씁니다
        </SlideHeadline>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {AGENT_ACTIONS.map((action, index) => (
          <Panel
            key={action.head}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <action.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-body font-bold text-content-strong">{action.head}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{action.body}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="accentSoft" pad="lg" className="animate-rise-4 flex flex-col gap-4 md:gap-5">
        <div className="flex items-center gap-4">
          <ShieldCheck className="size-6 text-accent md:size-8" />
          <PanelLabel tone="accent">&ldquo;이거 해도 돼요?&rdquo; 하고 물어볼 때</PanelLabel>
        </div>
        <div className="flex flex-wrap gap-3">
          <Chip tone="accent">만들기 · 고치기 · 띄우기 → 허용</Chip>
          <Chip>지우기 · 내 폴더 밖 건드리기 → 잠깐, 무슨 소린지 물어보기</Chip>
        </div>
        <p className="text-deck-caption text-content-secondary">
          오늘 만든 폴더 안에서만 움직이니까, 잘못돼도 그 폴더만 다시 만들면 됩니다.
        </p>
      </Panel>
    </SlideLayout>
  )
}

const LIMITS = [
  {
    title: '한 번에 완벽 ❌',
    line: '수정 요청이 곧 개발입니다',
    detail: '처음 결과는 초안입니다. 두세 번 고쳐야 내 것이 됩니다.',
  },
  {
    title: '애매하게 말하면',
    line: '애매하게 나옴',
    detail: '"예쁘게"보다 "파스텔 톤에 둥근 모서리로"가 훨씬 잘 통합니다.',
  },
  {
    title: 'AI는 독심술사가 아님',
    line: '머릿속 그림을 말로 꺼내는 게 오늘 배울 기술',
    detail: '오늘 배우는 건 결국 이 한 가지입니다.',
  },
]

/** S11. AI의 한계 — 기대치 설정 */
export function LimitsSlide() {
  return (
    <SlideLayout>
      <SlideKicker>미리 맞는 예방주사</SlideKicker>
      <SlideHeadline>이건 알고 시작합시다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {LIMITS.map((limit, index) => (
          <Panel
            key={limit.title}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-5',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <span className="grid size-10 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-secondary inset-shadow-sunken md:size-14">
              {index + 1}
            </span>
            <p className="text-deck-body font-semibold text-content-secondary">{limit.title}</p>
            <p className="text-deck-lead font-bold text-content-strong">
              <ArrowRight size={30} className="mr-2 inline text-accent" />
              {limit.line}
            </p>
            <p className="mt-auto text-deck-caption text-content-secondary">{limit.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>그래서 오늘은 &ldquo;한 번에 잘 시키기&rdquo;가 아니라 &ldquo;고쳐 가며 만들기&rdquo;를 연습합니다.</SlideBody>
    </SlideLayout>
  )
}
