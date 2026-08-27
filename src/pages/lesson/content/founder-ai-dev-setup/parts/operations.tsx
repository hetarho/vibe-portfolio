import {
  BellRing,
  Bot,
  BrainCircuit,
  CircleCheck,
  Cloud,
  CloudCog,
  Container,
  Database,
  FileCheck2,
  Gauge,
  Hand,
  KeyRound,
  Laptop,
  MessagesSquare,
  Network,
  PauseCircle,
  Repeat2,
  ScrollText,
  Server,
  ShieldCheck,
  Sparkles,
  Timer,
  Workflow,
} from 'lucide-react'
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
} from '../../../deck'

const THREE_LAYERS = [
  {
    icon: BrainCircuit,
    label: '판단',
    name: '에이전트',
    examples: 'Claude Code · Hermes',
    detail: '맥락을 읽고 계획·생성·검증',
  },
  {
    icon: Workflow,
    label: '전달',
    name: '워크플로',
    examples: 'n8n · HubSpot · API',
    detail: '트리거와 데이터·도구를 연결',
  },
  {
    icon: CloudCog,
    label: '지속',
    name: '실행 환경',
    examples: '관리형 Cloud · Serverless · VPS',
    detail: '노트북이 꺼져도 계속 실행',
  },
]

/** W25. 에이전트·워크플로·실행 장소 구분 */
export function AutomationLayersSlide() {
  return (
    <SlideLayout>
      <SlideKicker>도구 이름보다 먼저 구분할 것</SlideKicker>
      <SlideHeadline>판단하고 · 전달하고 · 계속 돌립니다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {THREE_LAYERS.map((layer, index) => (
          <Panel
            key={layer.name}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}
          >
            <div className="flex items-center justify-between gap-4">
              <layer.icon className="size-9 text-accent md:size-12" />
              <Chip>{layer.label}</Chip>
            </div>
            <p className="text-deck-lead font-bold text-content-strong">{layer.name}</p>
            <p className="font-mono text-deck-caption font-semibold text-content-primary">{layer.examples}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{layer.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        <Mark>VPS는 에이전트가 아니라 에이전트가 머무를 수 있는 한 장소</Mark>입니다
      </SlideNote>
    </SlideLayout>
  )
}

const RUNTIMES = [
  {
    icon: Sparkles,
    name: 'Claude Cloud Routines',
    badge: 'VPS 없음',
    fit: '코드·PR·커넥터 작업',
    detail: '시간·API·GitHub 이벤트로 실행 · 노트북이 꺼져도 동작',
    caution: 'Research preview · 실행 중 승인창 없음',
  },
  {
    icon: Cloud,
    name: '관리형 자동화',
    badge: 'VPS 없음',
    fit: 'CRM·마케팅 흐름',
    detail: 'HubSpot·n8n Cloud 등이 트리거와 연결을 관리',
    caution: '요금제·연결 권한·서비스 종속 확인',
  },
  {
    icon: Timer,
    name: '서버리스 · 예약 작업',
    badge: '필요할 때만',
    fit: '짧은 정기 작업',
    detail: 'GitHub Actions·Cloud jobs가 실행 뒤 종료',
    caution: '장기 메모리·지속 프로세스에는 부적합',
  },
  {
    icon: Server,
    name: 'VPS · 컨테이너',
    badge: '직접 운영',
    fit: '24시간·상태·자체 통제',
    detail: 'Hermes·self-hosted n8n 같은 프로세스를 상주시킴',
    caution: '보안·업데이트·백업·모니터링 책임',
  },
]

/** W26. 노트북이 꺼져도 도는 네 가지 길 */
export function RuntimeOptionsSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>VPS가 유일한 답은 아닙니다</SlideKicker>
          <SlideHeadline>지속 시간과 통제 수준에 맞춰 고릅니다</SlideHeadline>
        </div>
        <Chip>오늘 개통 0개</Chip>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {RUNTIMES.map((runtime, index) => (
          <Panel
            key={runtime.name}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <div className="flex items-center justify-between gap-3">
              <runtime.icon className="size-8 text-accent md:size-10" />
              <Chip>{runtime.badge}</Chip>
            </div>
            <p className="text-deck-body font-bold text-content-strong">{runtime.name}</p>
            <p className="text-deck-caption font-semibold text-content-primary">{runtime.fit}</p>
            <p className="text-deck-caption text-content-secondary">{runtime.detail}</p>
            <p className="mt-auto border-t border-line-subtle pt-3 text-deck-caption text-content-muted">{runtime.caution}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>관리형 선택지로 먼저 가치를 확인하고, 지속 프로세스와 자체 통제가 필요할 때 VPS를 검토합니다.</SlideBody>
    </SlideLayout>
  )
}

const HERMES_CAPABILITIES = [
  { icon: Database, name: '기억', detail: '세션을 넘어 기억과 스킬을 축적' },
  { icon: Repeat2, name: '루틴', detail: '정해진 시간에 작업하고 결과 전달' },
  { icon: Bot, name: 'Bot 역할', detail: '전문 Bot과 subagent를 나눠 운영' },
  { icon: MessagesSquare, name: '접점', detail: 'Telegram·Slack 등에서 지시·보고' },
]

/** W27. Hermes라는 미래 후보 */
export function HermesFutureSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>알아서 돌아가는 상주 에이전트의 예</SlideKicker>
          <SlideHeadline>Hermes도 미래 후보로 열어둡니다</SlideHeadline>
        </div>
        <Chip tone="accent">오늘 설치하지 않음</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {HERMES_CAPABILITIES.map((item, index) => (
          <Panel key={item.name} tone="raised" pad="lg" className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}>
            <item.icon className="size-9 text-accent md:size-12" />
            <p className="text-deck-lead font-bold text-content-strong">{item.name}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.detail}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="inverse" pad="md" className="animate-rise-5 grid items-center gap-4 md:grid-cols-4 md:gap-6">
        <PanelLabel tone="inverse">도입 신호</PanelLabel>
        <p className="text-deck-caption text-content-inverse">검증된 반복 업무가 2–3개</p>
        <p className="text-deck-caption text-content-inverse">24시간 실행 이유가 분명함</p>
        <p className="text-deck-caption text-content-inverse">권한·비용·로그·중지 기준이 있음</p>
      </Panel>

      <SlideNote tone="quiet">
        필요가 확인되면 <Mark>읽기 전용 · 격리된 데이터 · 짧은 기간</Mark>으로 비교 파일럿
      </SlideNote>
    </SlideLayout>
  )
}

const AUTONOMY_LIGHTS = [
  {
    tone: 'accentSoft' as const,
    label: '자동 가능',
    icon: CircleCheck,
    items: ['공개 자료 조사', '초안·요약·테스트', '주간 성과 보고'],
  },
  {
    tone: 'raised' as const,
    label: '검토 뒤 실행',
    icon: Hand,
    items: ['CRM 필드 갱신', '콘텐츠 예약', '코드 PR 생성'],
  },
  {
    tone: 'sunken' as const,
    label: '매번 직접 승인',
    icon: PauseCircle,
    items: ['공개 게시·대량 발송', '광고비·결제', '운영 배포·삭제'],
  },
]

/** W28. 자동화 권한 신호등 */
export function AutonomyBoundarySlide() {
  return (
    <SlideLayout>
      <SlideKicker>24시간 운영 전에 정할 가장 중요한 것</SlideKicker>
      <SlideHeadline>무엇을 할지보다 어디서 멈출지</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {AUTONOMY_LIGHTS.map((light, index) => (
          <Panel key={light.label} tone={light.tone} pad="lg" className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}>
            <div className="flex items-center gap-4">
              <light.icon className="size-9 text-accent md:size-12" />
              <p className="text-deck-lead font-bold text-content-strong">{light.label}</p>
            </div>
            <ul className="flex flex-col gap-3 text-deck-caption text-content-secondary">
              {light.items.map((item) => <li key={item}>· {item}</li>)}
            </ul>
          </Panel>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        {[
          [KeyRound, '최소 권한'],
          [Gauge, '비용·횟수 한도'],
          [ScrollText, '실행 로그'],
          [BellRing, '실패 알림'],
          [PauseCircle, '즉시 중지'],
        ].map(([Icon, label]) => {
          const SafetyIcon = Icon as typeof ShieldCheck
          return (
            <Panel key={label as string} tone="sunken" pad="sm" className="flex items-center gap-3">
              <SafetyIcon className="size-6 shrink-0 text-content-muted md:size-8" />
              <p className="text-deck-caption font-semibold text-content-secondary">{label as string}</p>
            </Panel>
          )
        })}
      </div>
    </SlideLayout>
  )
}

const MEETINGS = [
  { number: '1', name: '사업과 미국 고객 정의', output: '고객상 · 문제 · 성과 지표 · 자동화 후보' },
  { number: '2', name: '코딩 업무 표준', output: 'CLAUDE.md · 완료 조건 · 테스트 · 승인선' },
  { number: '3', name: '개발 에이전트 파일럿', output: 'Planner · Builder · Reviewer가 PR 하나 완성' },
  { number: '4', name: '미국 채널과 메시지', output: '채널 1개 · 영문 메시지 · 원자료 · 전환 정의' },
  { number: '5', name: '마케팅 자동화 파일럿', output: '조사·콘텐츠·리드·보고 중 한 흐름과 측정' },
  { number: '6', name: '상시 운영 판단', output: 'Cloud Routine·관리형·VPS·Hermes 비교 결정' },
]

/** W29. 앞으로 여섯 번의 미팅 */
export function AutomationRoadmapSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>오늘은 방향, 다음부터 한 흐름씩</SlideKicker>
          <SlideHeadline>여섯 번의 미팅으로 작은 AI 조직까지</SlideHeadline>
        </div>
        <Chip tone="accent">매번 작동하는 결과물 1개</Chip>
      </div>

      <ol className="grid gap-3 lg:grid-cols-2">
        {MEETINGS.map((meeting, index) => (
          <li key={meeting.number}>
            <Panel
              tone={index === MEETINGS.length - 1 ? 'accentSoft' : 'raised'}
              pad="sm"
              className={cx('grid items-center gap-3 md:grid-cols-9 md:gap-5', `animate-rise-${Math.min(index + 1, 5)}`)}
            >
              <span className="grid size-9 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:col-span-1 md:size-11">
                {meeting.number}
              </span>
              <p className="text-deck-body font-bold text-content-strong md:col-span-3">{meeting.name}</p>
              <p className="text-deck-caption text-content-secondary md:col-span-5">{meeting.output}</p>
            </Panel>
          </li>
        ))}
      </ol>

      <SlideNote tone="quiet">
        오늘 남길 것 · <Mark>블루프린트 한 장 + 가능성 후보 + 다음 미팅의 첫 질문</Mark>
      </SlideNote>
    </SlideLayout>
  )
}
