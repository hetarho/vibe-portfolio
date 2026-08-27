import {
  Bot,
  Boxes,
  CircleCheck,
  ClipboardList,
  Code2,
  Gauge,
  GitBranch,
  GitPullRequest,
  Goal,
  Hand,
  ListChecks,
  Megaphone,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  TestTube2,
  Timer,
  Users,
} from 'lucide-react'
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
import { PromptCopyButton } from '../../shared'
import blueprintTemplate from '../model/automation-blueprint-template.md?raw'

const TRACKS = [
  {
    icon: Code2,
    name: 'AI 코딩 조직',
    detail: '기획·구현·테스트·리뷰 에이전트가 어떤 순서로 일할지',
  },
  {
    icon: Megaphone,
    name: '미국 마케팅',
    detail: '고객 조사부터 콘텐츠·리드·성과 분석까지 어디를 자동화할지',
  },
  {
    icon: Network,
    name: '상시 실행',
    detail: '관리형 서비스·클라우드 작업·VPS·Hermes를 언제 검토할지',
  },
]

/** W15. 2부는 실행하지 않고 설계한다 */
export function BlueprintIntroSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>PART 2 · 65분</SlideKicker>
          <SlideHeadline>지금 만들지 않고, 앞으로의 판을 그립니다</SlideHeadline>
        </div>
        <Chip tone="accent">오늘은 계획만</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {TRACKS.map((track, index) => (
          <Panel
            key={track.name}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}
          >
            <track.icon className="size-9 text-accent md:size-12" />
            <p className="text-deck-lead font-bold text-content-strong">{track.name}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{track.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        계정 연결 · 자동 게시 · VPS 개통 · Hermes 설치는 하지 않습니다 · <Mark>가능성과 순서만 합의</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const BLUEPRINT_CELLS = [
  ['1', '사업 목표', '어떤 숫자를 바꿀까'],
  ['2', '반복 업무', '사람이 지금 무엇을 반복하나'],
  ['3', '시작 신호', '요청·시간·문의·코드 변경'],
  ['4', '입력 자료', '파일·웹·데이터·계정'],
  ['5', '에이전트 역할', '누가 무엇을 책임지나'],
  ['6', '작업 흐름', '조사·생성·검증·보고'],
  ['7', '사람 승인선', '무엇에서 반드시 멈추나'],
  ['8', '실행 장소', 'PC·클라우드·VPS'],
  ['9', '완료·중지', 'KPI·비용·실패·킬 스위치'],
]

/** W16. 자동화 블루프린트 한 장 */
export function BlueprintCanvasSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-3">
          <SlideKicker>우리의 공통 설계도</SlideKicker>
          <SlideHeadline>어떤 자동화도 이 아홉 칸부터</SlideHeadline>
        </div>
        <PromptCopyButton size="md" label="블루프린트 복사" text={blueprintTemplate} />
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {BLUEPRINT_CELLS.map(([number, title, detail], index) => (
          <Panel
            key={number}
            tone={index === 6 ? 'accentSoft' : 'raised'}
            pad="sm"
            className={cx('flex items-center gap-4', `animate-rise-${Math.min(index + 1, 5)}`)}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-11">
              {number}
            </span>
            <div className="min-w-0">
              <p className="text-deck-body font-bold text-content-strong">{title}</p>
              <p className="text-deck-caption text-content-secondary">{detail}</p>
            </div>
          </Panel>
        ))}
      </div>
    </SlideLayout>
  )
}

const SCORE_LENSES = [
  { icon: Goal, name: '가치', question: '매출·시간·품질 중 무엇이 좋아지나?' },
  { icon: Timer, name: '반복', question: '주 1회 이상 같은 입력과 결과가 생기나?' },
  { icon: ShieldCheck, name: '위험', question: '틀려도 사람이 되돌릴 수 있나?' },
]

/** W17. 첫 자동화 후보를 고르는 기준 */
export function CandidateScoreSlide() {
  return (
    <SlideLayout>
      <SlideKicker>할 수 있는 것과 먼저 할 것은 다릅니다</SlideKicker>
      <SlideHeadline>가치 × 반복 × 낮은 위험</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {SCORE_LENSES.map((lens, index) => (
          <Panel key={lens.name} tone="raised" pad="lg" className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}>
            <lens.icon className="size-9 text-accent md:size-12" />
            <p className="text-deck-lead font-bold text-content-strong">{lens.name}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{lens.question}</p>
          </Panel>
        ))}
      </div>

      <CompareGrid>
        <Panel tone="accentSoft" pad="md" className="flex items-center gap-5">
          <CircleCheck className="size-9 shrink-0 text-positive md:size-12" />
          <div>
            <PanelLabel tone="accent">첫 후보</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">조사 · 초안 · 테스트 · 주간 보고</p>
          </div>
        </Panel>
        <Panel tone="sunken" pad="md" className="flex items-center gap-5">
          <Hand className="size-9 shrink-0 text-content-muted md:size-12" />
          <div>
            <PanelLabel>항상 사람 승인</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">외부 발송 · 광고비 · 운영 배포 · 삭제</p>
          </div>
        </Panel>
      </CompareGrid>
    </SlideLayout>
  )
}

const CODING_ROLES = [
  { icon: ClipboardList, role: '기획자', output: '요구사항 · 완료 조건' },
  { icon: Code2, role: '구현자', output: '격리된 코드 변경' },
  { icon: TestTube2, role: '테스터', output: '재현 · 자동 검사' },
  { icon: Search, role: '리뷰어', output: '위험 · 누락 · 개선안' },
  { icon: GitPullRequest, role: '릴리스 도우미', output: 'PR · 변경 요약 · 복구안' },
]

/** W18. AI 코딩 직원 구성 */
export function CodingAgentTeamSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>교수님이 원하시는 미래의 개발팀</SlideKicker>
          <SlideHeadline>한 모델이 아니라 다섯 책임</SlideHeadline>
        </div>
        <Chip>교수님 = 제품 책임자</Chip>
      </div>

      <div className="grid gap-3 lg:grid-cols-5">
        {CODING_ROLES.map((item, index) => (
          <Panel
            key={item.role}
            tone={index === 3 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <item.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-body font-bold text-content-strong">{item.role}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.output}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        역할은 다섯 개여도 처음부터 에이전트 다섯 명을 켜지는 않습니다 · <Mark>책임부터 분리</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const CODING_FLOW = [
  { icon: Goal, name: '요청', detail: '목표·범위' },
  { icon: ListChecks, name: '계획', detail: '파일·검증' },
  { icon: GitBranch, name: '격리', detail: 'branch·worktree' },
  { icon: Code2, name: '구현', detail: '작은 변경' },
  { icon: TestTube2, name: '검증', detail: 'test·build' },
  { icon: Hand, name: '승인', detail: 'PR 뒤 반영' },
]

/** W19. 코딩 에이전트의 작업 흐름 */
export function CodingFlowSlide() {
  return (
    <SlideLayout>
      <SlideKicker>직원처럼 보이게 만드는 것은 결과 보고</SlideKicker>
      <SlideHeadline>요청부터 반영까지 끊기지 않는 한 줄</SlideHeadline>

      <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
        {CODING_FLOW.map((step, index) => (
          <li key={step.name} className="flex items-stretch gap-3 lg:contents">
            <Panel
              tone={index === CODING_FLOW.length - 1 ? 'accent' : 'raised'}
              pad="md"
              className={cx('flex flex-1 flex-col gap-4', `animate-rise-${Math.min(index + 1, 5)}`)}
            >
              <span className="text-deck-caption font-semibold text-content-muted">0{index + 1}</span>
              <step.icon className={cx('size-8 md:size-10', index === CODING_FLOW.length - 1 ? 'text-accent-contrast' : 'text-accent')} />
              <p className={cx('text-deck-body font-bold', index === CODING_FLOW.length - 1 ? 'text-accent-contrast' : 'text-content-strong')}>
                {step.name}
              </p>
              <p className={cx('mt-auto text-deck-caption', index === CODING_FLOW.length - 1 ? 'text-accent-contrast/80' : 'text-content-secondary')}>
                {step.detail}
              </p>
            </Panel>
          </li>
        ))}
      </ol>

      <SlideNote tone="quiet">
        여러 에이전트가 코딩해도 <Mark>main 반영과 운영 배포는 사람 승인 뒤</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const MATURITY = [
  { icon: Bot, level: '1', name: '주 에이전트 1명', detail: '계획·구현·검증을 한 흐름으로', gate: '기본' },
  { icon: Boxes, level: '2', name: '전문 Subagents', detail: '조사·테스트·리뷰를 따로 위임', gate: '역할 문서 뒤' },
  { icon: GitBranch, level: '3', name: '병렬 Worktrees', detail: '서로 다른 작업장을 동시에 운영', gate: '자동 검사 뒤' },
  { icon: Users, level: '4', name: 'Agent Teams', detail: '리드와 팀원이 작업 목록을 공유', gate: '실험 파일럿' },
]

/** W20. 코딩 에이전트 성숙도 */
export function CodingMaturitySlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>여럿이 코딩하는 목표로 가는 순서</SlideKicker>
          <SlideHeadline>에이전트 수보다 운영 능력을 한 단계씩</SlideHeadline>
        </div>
        <Chip>Agent Teams는 실험 기능</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {MATURITY.map((item, index) => (
          <Panel
            key={item.level}
            tone={index === 0 ? 'accent' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <div className="flex items-center justify-between gap-4">
              <item.icon className={cx('size-8 md:size-10', index === 0 ? 'text-accent-contrast' : 'text-accent')} />
              <span className={cx('text-deck-caption font-bold', index === 0 ? 'text-accent-contrast/70' : 'text-content-muted')}>{item.level}</span>
            </div>
            <p className={cx('text-deck-body font-bold', index === 0 ? 'text-accent-contrast' : 'text-content-strong')}>{item.name}</p>
            <p className={cx('text-deck-caption', index === 0 ? 'text-accent-contrast/80' : 'text-content-secondary')}>{item.detail}</p>
            <p className={cx('mt-auto text-deck-caption font-semibold', index === 0 ? 'text-accent-contrast' : 'text-accent')}>{item.gate}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>병렬 작업은 속도를 높이지만 토큰 비용과 조정·파일 충돌도 함께 늘어납니다.</SlideBody>
    </SlideLayout>
  )
}
