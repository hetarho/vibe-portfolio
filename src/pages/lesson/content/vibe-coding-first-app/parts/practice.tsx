import { Copy, Hand, MessageSquareWarning, Star, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  CheckRow,
  Chip,
  CountdownTimer,
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
import { useIdeas } from '../model/ideas'

/** S15. 실습 준비 체크리스트 */
export function PracticeReadySlide() {
  const [checks, setChecks] = useState([false, false, false])
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <SlideKicker>PART 2 시작</SlideKicker>
      <SlideHeadline>이제 내 컴퓨터에서 직접 만들어봅니다</SlideHeadline>

      <div className="flex flex-col gap-4">
        <CheckRow checked={checks[0]} onToggle={() => toggle(0)} hint="검은 창이 열려 있으면 됩니다">
          터미널 열기
        </CheckRow>
        <CheckRow checked={checks[1]} onToggle={() => toggle(1)} hint="브라우저는 옆에 나란히 두세요">
          브라우저 창 하나 비워두기
        </CheckRow>
        <CheckRow checked={checks[2]} onToggle={() => toggle(2)} hint="같이 보면서 진행할게요">
          화면 공유 켜기
        </CheckRow>
      </div>

      <SlideNote>
        <span className="inline-flex items-center gap-3">
          <Hand size={30} />
          안 되는 게 있으면 그 자리에서 바로 말해주세요
        </span>
      </SlideNote>
    </SlideLayout>
  )
}

const TOPICS = [
  {
    emoji: '🙋',
    name: '자기소개 페이지',
    summary: '나를 소개하는 한 장짜리 페이지',
    level: 1,
    prompt:
      '자기소개 웹 페이지 만들어줘. 이름과 한 줄 소개, 좋아하는 것 3가지, 연락처 버튼이 있고, 스크롤하면 부드럽게 나타나는 미니멀한 디자인으로. 다 만들면 내 컴퓨터에서 열어볼 수 있게 띄우고 주소를 알려줘.',
  },
  {
    emoji: '✅',
    name: '투두리스트',
    summary: '할 일을 적고 지우는 앱',
    level: 2,
    prompt:
      '할 일 목록 웹 앱 만들어줘. 추가·완료 체크·삭제가 되고, 남은 개수가 위에 보여. 파스텔 톤의 둥근 디자인으로. 다 만들면 내 컴퓨터에서 열어볼 수 있게 띄우고 주소를 알려줘.',
  },
  {
    emoji: '🎡',
    name: '점심 메뉴 룰렛',
    summary: '오늘 뭐 먹지를 끝내주는 앱',
    level: 2,
    prompt:
      '점심 메뉴 룰렛 만들어줘. 메뉴를 추가할 수 있고, 돌리면 두구두구 애니메이션 후 하나가 뽑혀. 귀엽고 알록달록하게. 다 만들면 내 컴퓨터에서 열어볼 수 있게 띄우고 주소를 알려줘.',
  },
  {
    emoji: '📅',
    name: '디데이 카운터',
    summary: '그날까지 며칠 남았는지',
    level: 2,
    prompt:
      '디데이 카운터 웹 앱 만들어줘. 날짜와 이름을 등록하면 남은 날짜가 큰 숫자로 보이고, 여러 개를 등록할 수 있어. 차분한 다크 톤으로. 다 만들면 내 컴퓨터에서 열어볼 수 있게 띄우고 주소를 알려줘.',
  },
  {
    emoji: '⚖️',
    name: '밸런스 게임',
    summary: '둘 중 하나 고르기',
    level: 3,
    prompt:
      '밸런스 게임 웹 앱 만들어줘. 질문 10개가 하나씩 나오고, 둘 중 하나를 고르면 다음 질문으로 넘어가. 마지막에 내 선택을 정리해서 보여줘. 대비가 강한 팝한 디자인으로. 다 만들면 내 컴퓨터에서 열어볼 수 있게 띄우고 주소를 알려줘.',
  },
]

function TopicModal({ topic, onClose }: { topic: (typeof TOPICS)[number]; onClose: () => void }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // 모달이 열려 있는 동안에는 방향키가 슬라이드를 넘기지 않도록 캡처 단계에서 막는다.
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', ' ', 'Escape'].includes(event.key)) {
        event.stopPropagation()
        if (event.key === 'Escape') onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [onClose])

  const copy = () => {
    void navigator.clipboard?.writeText(topic.prompt)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-surface-sunken/90 p-6 backdrop-blur-sm md:p-12">
      <div className="animate-pop flex w-full max-w-column flex-col gap-4 rounded-stage bg-surface-overlay p-6 shadow-overlay md:gap-7 md:p-12">
        <div className="flex items-start justify-between gap-4 md:gap-6">
          <div className="flex items-center gap-5">
            <span className="text-deck-title">{topic.emoji}</span>
            <div>
              <PanelLabel tone="accent">예시 프롬프트</PanelLabel>
              <p className="text-deck-lead font-bold text-content-strong">{topic.name}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="grid size-10 shrink-0 place-items-center rounded-control bg-surface-highlight text-content-secondary transition duration-200 ease-deck md:size-14 hover:text-content-primary"
          >
            <X size={26} />
          </button>
        </div>

        <p className="rounded-card bg-surface-sunken p-5 text-deck-body text-content-strong inset-shadow-sunken md:p-8">
          {topic.prompt}
        </p>

        <button
          type="button"
          onClick={copy}
          className="flex items-center justify-center gap-3 rounded-control bg-accent px-4 py-3 text-deck-body font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck md:px-8 md:py-5 hover:bg-accent-strong"
        >
          <Copy size={26} />
          {copied ? '복사했습니다' : '프롬프트 복사'}
        </button>
      </div>
    </div>
  )
}

/** S16. 무엇을 만들까? — 주제 선택 */
export function TopicPickerSlide() {
  const { ideas } = useIdeas()
  const [openTopic, setOpenTopic] = useState<(typeof TOPICS)[number] | null>(null)

  return (
    <SlideLayout align="top">
      <div className="flex flex-col gap-4 pt-6">
        <SlideKicker>5분 안에 정합니다</SlideKicker>
        <SlideHeadline>무엇을 만들까요?</SlideHeadline>
      </div>

      <ul className="grid gap-5 lg:grid-cols-5">
        {TOPICS.map((topic) => (
          <li key={topic.name}>
            <button
              type="button"
              onClick={() => setOpenTopic(topic)}
              className="flex h-full w-full flex-col gap-4 rounded-card bg-surface-raised p-5 text-left shadow-raised transition duration-300 ease-deck md:p-8 hover:-translate-y-2 hover:bg-surface-overlay"
            >
              <span className="text-deck-lead">{topic.emoji}</span>
              <span className="text-deck-body font-bold text-content-strong">{topic.name}</span>
              <span className="text-deck-caption text-content-secondary">{topic.summary}</span>
              <span className="mt-auto flex items-center gap-1 text-accent">
                {Array.from({ length: topic.level }).map((_, index) => (
                  <Star key={index} size={22} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {ideas.length > 0 ? (
        <Panel tone="sunken" pad="md" className="flex flex-wrap items-center gap-3">
          <PanelLabel>아까 적어주신 아이디어</PanelLabel>
          {ideas.map((idea, index) => (
            <Chip key={`${idea}-${index}`}>{idea}</Chip>
          ))}
        </Panel>
      ) : null}

      <SlideBody>
        아까 적어주신 아이디어로 해도 좋아요 — 단, <Mark>로그인·결제</Mark>처럼 주방(서버)이 필요한 건 다음에!
      </SlideBody>

      {openTopic ? <TopicModal topic={openTopic} onClose={() => setOpenTopic(null)} /> : null}
    </SlideLayout>
  )
}

const PRACTICE_STEPS = [
  { label: '프롬프트 쓰기', minutes: 5, seconds: 300 },
  { label: '입력하고 기다리기 · 승인하기', minutes: 5, seconds: 300 },
  { label: '브라우저에서 열어보기', minutes: 5, seconds: 300 },
  { label: '불만 목록 만들기', minutes: 5, seconds: 300 },
  { label: '수정 요청', minutes: 10, seconds: 600 },
]

/** S17. ⭐ 실습 1 진행 대시보드 — 30분간 계속 띄워두는 화면 */
export function PracticeBoardSlide() {
  const [step, setStep] = useState(0)
  const current = PRACTICE_STEPS[step]

  return (
    <SlideLayout>
      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-12">
        <ol className="flex flex-col gap-3 lg:col-span-5">
          {PRACTICE_STEPS.map((item, index) => {
            const active = index === step
            const passed = index < step
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => setStep(index)}
                  className={cx(
                    'flex w-full items-center gap-5 rounded-card p-4 text-left transition duration-300 ease-deck md:p-6',
                    active
                      ? 'bg-accent text-accent-contrast shadow-lifted'
                      : passed
                        ? 'bg-surface-raised text-content-muted shadow-raised'
                        : 'bg-surface-sunken text-content-secondary inset-shadow-sunken',
                  )}
                >
                  <span
                    className={cx(
                      'grid size-9 shrink-0 place-items-center rounded-full text-deck-caption font-bold md:size-12',
                      active ? 'bg-accent-contrast/15 text-accent-contrast' : 'bg-surface-highlight text-content-primary',
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="flex-1 text-deck-body font-semibold">{item.label}</span>
                  <span className="text-deck-caption font-semibold opacity-70">{item.minutes}분</span>
                </button>
              </li>
            )
          })}
        </ol>

        <Panel tone="raised" pad="lg" className="flex flex-col items-center justify-center gap-4 md:gap-6 lg:col-span-4">
          <CountdownTimer key={step} seconds={current.seconds} caption={`${step + 1}단계 남은 시간`} size="md" />
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="flex flex-col gap-5 lg:col-span-3">
          <PanelLabel tone="accent">프롬프트 공식</PanelLabel>
          <p className="text-deck-body font-bold text-content-strong">무엇을</p>
          <p className="text-deck-body font-bold text-content-strong">+ 기능</p>
          <p className="text-deck-body font-bold text-content-strong">+ 느낌</p>
          <p className="text-deck-caption font-semibold text-content-secondary">+ 띄우고 주소 알려줘</p>
          <p className="mt-auto text-deck-caption text-content-secondary">P 키를 누르면 전체 화면으로 봅니다</p>
        </Panel>
      </div>

      <SlideNote>
        막히면 그대로 AI에게 말하세요: &ldquo;이 부분이 이상해, 고쳐줘&rdquo;
      </SlideNote>
    </SlideLayout>
  )
}

const TROUBLES = [
  { situation: '결과가 이상해요', answer: '○○ 부분이 이상해. 다시 만들어줘' },
  { situation: '오류가 떠요', answer: '오류 메시지를 복사해서 그대로 붙여넣기' },
  { situation: '주소가 안 열려요', answer: '주소창이 안 열려. 다시 띄워줘' },
  { situation: '터미널이 멈춘 것 같아요', answer: '띄워둔 상태라 원래 안 끝나요. 그게 정상' },
  { situation: '뭘 시킬지 모르겠어요', answer: '화면에서 제일 마음에 안 드는 것 하나만 말하기' },
  { situation: '기능을 많이 넣고 싶어요', answer: '한 번에 하나씩!' },
]

/** S18. 막혔을 때 — 트러블슈팅 치트시트 */
export function TroubleshootSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <MessageSquareWarning size={40} className="text-accent" />
        <SlideHeadline>막혔을 때, 이렇게 말하세요</SlideHeadline>
      </div>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
        {TROUBLES.map((item, index) => (
          <Panel
            key={item.situation}
            tone="raised"
            pad="md"
            className={cx(
              'flex flex-col gap-3',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
              index >= 4 && 'animate-rise-5',
            )}
          >
            <PanelLabel>{item.situation}</PanelLabel>
            <p className="rounded-card bg-surface-overlay p-4 text-deck-caption font-semibold text-content-strong shadow-overlay md:p-6">
              {item.answer}
            </p>
          </Panel>
        ))}
      </div>

      <SlideBody>혼자 붙잡고 있지 마세요. AI에게 말하는 게 가장 빠릅니다.</SlideBody>
    </SlideLayout>
  )
}
