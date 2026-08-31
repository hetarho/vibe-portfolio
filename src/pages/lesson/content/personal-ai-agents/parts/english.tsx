import {
  BookOpenCheck,
  Brain,
  Check,
  Headphones,
  HelpCircle,
  History,
  Languages,
  MessageCircle,
  Mic2,
  RefreshCw,
  Route,
  Speech,
  Target,
} from 'lucide-react'
import {
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
} from '../../../deck'
import { PromptCopyButton } from '../../shared'
import englishCoachPrompt from '../model/english-coach-agent-prompt.md?raw'

/** A18. 휴식 */
export function BreakSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col items-center gap-5 text-center md:gap-9">
        <SlideKicker>휴식 5분</SlideKicker>
        <CountdownTimer seconds={300} autoStart caption="다시 모이기까지" />
        <p className="text-deck-lead font-semibold text-content-primary">PPT 파일을 저장하고, 영어 코치용 새 대화를 열어주세요</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Chip>영어를 쓸 장면 하나</Chip>
          <Chip>하루에 가능한 시간</Chip>
          <Chip tone="accent">목표 날짜</Chip>
        </div>
      </div>

      <SlideNote tone="quiet">
        다음은 “영어를 공부해줘”가 아니라 <Mark>매일 입을 열게 하는 에이전트</Mark>를 만듭니다
      </SlideNote>
    </SlideLayout>
  )
}

const ENGLISH_GOALS = [
  { icon: MessageCircle, scene: '처음 만남', output: '30초 자기소개와 자연스러운 후속 질문' },
  { icon: Speech, scene: '오리엔테이션', output: 'Zonta와 내 활동을 60초로 설명' },
  { icon: HelpCircle, scene: '질의응답', output: '예상 질문과 뜻밖의 질문에 짧게 답하기' },
]

/** A19. 영어 목표 */
export function EnglishGoalSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 2 · 영어공부 에이전트</SlideKicker>
          <SlideHeadline>영어 목표는 실제로 말할 장면으로 정합니다</SlideHeadline>
        </div>
        <Languages className="size-9 text-accent md:size-12" />
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {ENGLISH_GOALS.map((goal, index) => (
          <Panel
            key={goal.scene}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}
          >
            <goal.icon className="size-8 text-accent md:size-10" />
            <PanelLabel tone={index === 1 ? 'accent' : 'muted'}>{goal.scene}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">{goal.output}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-col gap-3">
        <PanelLabel>오늘 정할 한 문장</PanelLabel>
        <p className="text-deck-lead font-bold text-content-strong">
          <Mark>[목표 날짜]</Mark>까지 <Mark>[상황]</Mark>에서 <Mark>[몇 분]</Mark> 동안 내 말로 대화한다
        </p>
      </Panel>
    </SlideLayout>
  )
}

const COACH_PARTS = [
  { icon: Target, head: '목표', body: '날짜 · 실제 장면 · 말할 시간' },
  { icon: Brain, head: '진단', body: '현재 답을 먼저 듣고 난이도 정하기' },
  { icon: Route, head: '수업 루프', body: '복습 → 표현 → 역할극 → 다시 말하기' },
  { icon: History, head: '학습 기록', body: '막힌 문장 · 다음 복습 · 반복 오류' },
]

/** A20. 영어 코치 구조 */
export function CoachBlueprintSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PPT 에이전트와 같은 네 부품</SlideKicker>
      <SlideHeadline>영어 코치에는 이 네 가지가 필요합니다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {COACH_PARTS.map((part, index) => (
          <Panel
            key={part.head}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}
          >
            <part.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-lead font-bold text-content-strong">{part.head}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{part.body}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        내 원고를 대신 써주는 것이 아니라 <Mark>내가 먼저 말하고, 다시 말하게</Mark> 만드는 것이 핵심입니다
      </SlideNote>
    </SlideLayout>
  )
}

/** A21. 영어 코치 프롬프트 */
export function EnglishPromptSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>복사해서 새 대화 또는 프로젝트 지침에</SlideKicker>
          <SlideHeadline>매일 15분 수업을 진행할 코치를 만듭니다</SlideHeadline>
          <SlideBody>
            첫날은 목표와 현재 수준을 진단하고, 매일 복습·표현·역할극·다시 말하기·학습 기록의 같은 순서로 수업합니다.
          </SlideBody>

          <div className="grid gap-3 md:grid-cols-2">
            {['중간에 자주 끊지 않기', '힌트는 한 단계씩', '오류는 중요한 세 개만', '다음 복습을 기록'].map((item, index) => (
              <Panel key={item} tone="sunken" pad="sm" className="flex items-center gap-3">
                <Check className="size-5 shrink-0 text-positive md:size-6" />
                <p className="text-deck-caption font-semibold text-content-secondary">{item}</p>
              </Panel>
            ))}
          </div>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-6 lg:col-span-4">
          <Mic2 className="size-10 text-accent md:size-14" />
          <PanelLabel tone="accent">나의 영어 연습 에이전트</PanelLabel>
          <p className="text-deck-body text-content-secondary">실제 상황 중심 · 매일 15분 · 역할극 · 피드백 · 누적 기록</p>
          <PromptCopyButton size="md" label="영어 코치 프롬프트 복사" text={englishCoachPrompt} />
        </Panel>
      </div>

      <SlideNote tone="quiet">
        음성 대화가 가능하면 음성으로, 아니면 <Mark>내가 먼저 소리 내 말한 뒤</Mark> 텍스트로 입력합니다
      </SlideNote>
    </SlideLayout>
  )
}

const DAILY = [
  { time: '2분', head: '복습', body: '지난 표현 3개를 질문으로 꺼내기' },
  { time: '3분', head: '오늘 표현', body: '실제 장면에 쓸 짧은 문장 3개' },
  { time: '6분', head: '역할극', body: '한 번에 질문 하나, 대화는 멈추지 않기' },
  { time: '3분', head: '다시 말하기', body: '고친 문장을 보지 않고 두 번' },
  { time: '1분', head: '기록', body: '잘한 것 · 고칠 것 · 다음 복습' },
]

/** A22. 매일 15분 루프 */
export function DailyLoopSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>길게 한 번보다 짧게 반복</SlideKicker>
          <SlideHeadline>매일 같은 15분, 상황만 바꿉니다</SlideHeadline>
        </div>
        <Chip tone="accent">2 + 3 + 6 + 3 + 1</Chip>
      </div>

      <ol className="grid gap-4 lg:grid-cols-5">
        {DAILY.map((step, index) => (
          <li key={step.head} className="contents">
            <Panel
              tone={index === 2 ? 'accentSoft' : 'raised'}
              pad="md"
              className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
            >
              <PanelLabel tone={index === 2 ? 'accent' : 'muted'}>{step.time}</PanelLabel>
              <p className="text-deck-body font-bold text-content-strong">{step.head}</p>
              <p className="mt-auto text-deck-caption text-content-secondary">{step.body}</p>
            </Panel>
          </li>
        ))}
      </ol>

      <SlideNote tone="quiet">
        완료 조건 · 오늘 표현을 보지 않고 두 번 말하고 <Mark>다음 복습 질문이 저장됨</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const ROLEPLAY = [
  { who: '에이전트', line: 'Hi, I’m visiting from another Zonta district. What brought you here?' },
  { who: '나', line: '막혀도 먼저 한 문장으로 답하기' },
  { who: '나', line: '“도와줘” — 첫 단어 → 문장 뼈대 → 예시 순으로 힌트 받기' },
  { who: '에이전트', line: '끝까지 들은 뒤 의미를 막은 오류만 고치기' },
]

/** A23. 역할극 시연 */
export function RoleplaySlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>라이브 실습 · 국제회의에서 처음 만난 사람</SlideKicker>
          <SlideHeadline>정답을 보기 전에 먼저 입을 엽니다</SlideHeadline>
        </div>
        <Headphones className="size-9 text-accent md:size-12" />
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {ROLEPLAY.map((turn, index) => (
          <Panel
            key={`${turn.who}-${index}`}
            tone={turn.who === '에이전트' ? 'raised' : 'accentSoft'}
            pad="md"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <PanelLabel tone={turn.who === '나' ? 'accent' : 'muted'}>{turn.who}</PanelLabel>
            <p className="text-deck-body font-semibold text-content-strong">{turn.line}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        시작 명령 · “오늘은 국제회의 인사. <Mark>질문을 한 번에 하나씩</Mark> 하고 5분 뒤 피드백해줘.”
      </SlideNote>
    </SlideLayout>
  )
}

const FEEDBACK = [
  { label: '잘한 것 1개', body: '계속 써야 할 내 표현을 남긴다' },
  { label: '막힌 것 1개', body: '의미 전달을 막은 가장 큰 문제만' },
  { label: '다시 쓸 표현 3개', body: '짧고 내가 오늘 다시 말할 수 있게' },
  { label: '다시 말하기 2회', body: '보지 않고 같은 상황에 바로 적용' },
]

/** A24. 피드백 규칙 */
export function FeedbackSlide() {
  return (
    <SlideLayout>
      <SlideKicker>피드백이 많다고 좋은 수업은 아닙니다</SlideKicker>
      <SlideHeadline>말하는 중에는 흐름, 끝난 뒤에는 세 가지만</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {FEEDBACK.map((item, index) => (
          <Panel
            key={item.label}
            tone={index === 3 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}
          >
            <span className="grid size-10 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-12">
              {index + 1}
            </span>
            <p className="text-deck-body font-bold text-content-strong">{item.label}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.body}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-5 flex items-center gap-4">
        <RefreshCw className="size-7 shrink-0 text-accent md:size-9" />
        <p className="text-deck-body font-semibold text-content-primary">
          “더 자연스러운 문장”을 읽고 끝내지 말고 <Mark>같은 질문을 다시 받아 말하기</Mark>
        </p>
      </Panel>
    </SlideLayout>
  )
}

const LOG = [
  '오늘 연습한 실제 상황',
  '내가 막힌 문장',
  '다시 쓸 표현 3개',
  '발음·문법 한 가지',
  '다음 시간 첫 복습 질문 3개',
  '누적해서 자주 틀리는 패턴',
]

/** A25. 학습 기록 */
export function StudyLogSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <SlideKicker>기억을 대화창에만 맡기지 않기</SlideKicker>
          <SlideHeadline>매번 마지막에 한 장의 기록을 남깁니다</SlideHeadline>
          <SlideBody>서비스의 기억 기능은 바뀌거나 빠질 수 있습니다. 중요한 학습 기록은 내가 소유한 문서에도 날짜별로 쌓습니다.</SlideBody>
          <div className="flex flex-wrap gap-3">
            <Chip>영어 학습 기록.md</Chip>
            <Chip tone="accent">날짜별 1페이지</Chip>
          </div>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-3 lg:col-span-5">
          <div className="flex items-center gap-4">
            <BookOpenCheck className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">매회 마지막 기록</PanelLabel>
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            {LOG.map((item) => (
              <li key={item} className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-secondary inset-shadow-sunken md:p-4">
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <SlideNote tone="quiet">
        다음 대화를 시작할 때 · “이 기록을 읽고 <Mark>지난 복습 질문부터</Mark> 시작해줘.”
      </SlideNote>
    </SlideLayout>
  )
}
