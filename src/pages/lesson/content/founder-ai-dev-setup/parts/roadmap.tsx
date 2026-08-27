import {
  Bot,
  Boxes,
  Braces,
  CircleCheck,
  CloudCog,
  Database,
  FileCheck2,
  FileText,
  GitBranch,
  GitPullRequest,
  Layers3,
  ListChecks,
  Network,
  Package,
  Rocket,
  ShieldCheck,
  TestTube2,
  Users,
  Waypoints,
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

const AGENT_LEVELS = [
  {
    icon: Bot,
    level: '1 · 한 명',
    name: '주 에이전트',
    detail: '계획 → 구현 → 테스트를 한 흐름으로',
    gate: '오늘부터',
  },
  {
    icon: Boxes,
    level: '2 · 전문가',
    name: 'Subagents',
    detail: '조사·테스트·리뷰처럼 곁가지 업무를 위임',
    gate: '역할 문서 뒤',
  },
  {
    icon: GitBranch,
    level: '3 · 병렬',
    name: 'Sessions + worktrees',
    detail: '서로 다른 작업장을 만들어 충돌 없이 동시 진행',
    gate: '자동 테스트 뒤',
  },
  {
    icon: Users,
    level: '4 · 팀',
    name: 'Agent Teams',
    detail: '리드와 팀원이 작업 목록·메시지를 공유',
    gate: '마지막 파일럿',
  },
]

/** W23. 직원 같은 에이전트로 가는 사다리 */
export function AgentLadderSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>최종 목표 · 여러 에이전트가 직원처럼</SlideKicker>
          <SlideHeadline>수보다 운영 능력을 한 단계씩</SlideHeadline>
        </div>
        <Chip>팀 기능은 아직 실험 단계</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {AGENT_LEVELS.map((level, index) => (
          <Panel
            key={level.level}
            tone={index === 0 ? 'accent' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <level.icon className={cx('size-8 md:size-10', index === 0 ? 'text-accent-contrast' : 'text-accent')} />
            <p className={cx('text-deck-caption font-semibold', index === 0 ? 'text-accent-contrast/70' : 'text-content-muted')}>
              {level.level}
            </p>
            <p className={cx('text-deck-body font-bold', index === 0 ? 'text-accent-contrast' : 'text-content-strong')}>
              {level.name}
            </p>
            <p className={cx('text-deck-caption', index === 0 ? 'text-accent-contrast/80' : 'text-content-secondary')}>
              {level.detail}
            </p>
            <p className={cx('mt-auto text-deck-caption font-semibold', index === 0 ? 'text-accent-contrast' : 'text-accent')}>
              {level.gate}
            </p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        에이전트를 먼저 늘리면 오류도 병렬로 납니다 · <Mark>한 명이 안정적으로 끝내는 법부터</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const RAILS = [
  { icon: FileText, name: '업무 설명서', file: 'CLAUDE.md', detail: '제품·폴더·금지·명령' },
  { icon: ListChecks, name: '작업 표준', file: 'Issue / DoD', detail: '입력과 완료 조건' },
  { icon: GitBranch, name: '작업장 분리', file: 'branch / worktree', detail: '서로 파일 충돌 방지' },
  { icon: TestTube2, name: '자동 검사', file: 'test / build / CI', detail: '완료를 기계가 확인' },
  { icon: GitPullRequest, name: '승인 창구', file: 'PR / review', detail: '사람이 합치기 전 검토' },
]

/** W24. 여럿이 일하려면 먼저 필요한 레일 */
export function FactoryRailsSlide() {
  return (
    <SlideLayout>
      <SlideKicker>사람 직원에게도 책상만 주진 않죠</SlideKicker>
      <SlideHeadline>에이전트 팀이 달릴 다섯 개의 레일</SlideHeadline>

      <div className="grid gap-3 lg:grid-cols-5">
        {RAILS.map((rail, index) => (
          <Panel
            key={rail.name}
            tone={index === 3 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
              index === 4 && 'animate-rise-5',
            )}
          >
            <rail.icon className="size-7 text-accent md:size-9" />
            <p className="text-deck-body font-bold text-content-strong">{rail.name}</p>
            <p className="font-mono text-deck-caption font-semibold text-content-primary">{rail.file}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{rail.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        직원처럼 일한다는 뜻 · <Mark>스스로 시작</Mark>보다 <Mark>완료를 증명하고 보고</Mark>하는 것
      </SlideNote>
    </SlideLayout>
  )
}

const MEETINGS = [
  { week: '다음 1회', name: '서비스 건강검진', output: '실행·빌드·배포 명령과 버전 고정' },
  { week: '다음 2회', name: '프로젝트 업무 설명서', output: 'CLAUDE.md · 요청서 · 완료 조건' },
  { week: '다음 3회', name: '자동 검수 만들기', output: 'lint · typecheck · test · CI' },
  { week: '다음 4회', name: '안전한 운영', output: '환경 변수 · 로그 · preview · rollback' },
  { week: '다음 5회', name: '전문 에이전트 3명', output: '기획 · 구현 · 리뷰 역할 파일' },
  { week: '다음 6회', name: '병렬 팀 파일럿', output: 'worktree · PR · 비용·권한 기준' },
]

/** W25. 앞으로 여섯 번의 미팅 */
export function MeetingRoadmapSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>주기적인 미팅의 결과물</SlideKicker>
          <SlideHeadline>매번 문서나 자동 검사를 하나씩 남깁니다</SlideHeadline>
        </div>
        <Chip tone="accent">6회 뒤 · 작은 에이전트 조직</Chip>
      </div>

      <ol className="grid gap-3 lg:grid-cols-2">
        {MEETINGS.map((meeting, index) => (
          <li key={meeting.week}>
            <Panel
              tone={index === MEETINGS.length - 1 ? 'accentSoft' : 'raised'}
              pad="sm"
              className={cx(
                'grid items-center gap-3 md:grid-cols-9 md:gap-5',
                index === 0 && 'animate-rise-1',
                index === 1 && 'animate-rise-2',
                index === 2 && 'animate-rise-3',
                index === 3 && 'animate-rise-4',
                index >= 4 && 'animate-rise-5',
              )}
            >
              <span className="grid size-9 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:col-span-1 md:size-11">
                {index + 1}
              </span>
              <div className="flex flex-col gap-1 md:col-span-3">
                <p className="text-deck-caption font-semibold text-content-muted">{meeting.week}</p>
                <p className="text-deck-body font-bold text-content-strong">{meeting.name}</p>
              </div>
              <p className="text-deck-caption text-content-secondary md:col-span-5">{meeting.output}</p>
            </Panel>
          </li>
        ))}
      </ol>

      <SlideBody>순서는 실제 서비스의 상태에 따라 바꾸되, 자동 검수보다 멀티 에이전트를 앞당기지는 않습니다.</SlideBody>
    </SlideLayout>
  )
}

const LATER = [
  { icon: Layers3, name: 'WSL2', when: 'Linux 전용 스크립트·샌드박스가 필요할 때' },
  { icon: Package, name: 'Docker Desktop', when: 'DB·컨테이너로 재현해야 할 때' },
  { icon: Database, name: '로컬 DB', when: '개발 데이터가 실제로 로컬에 필요할 때' },
  { icon: Braces, name: 'Build Tools · SDK', when: '의존성 오류가 정확히 요구할 때' },
  { icon: Network, name: 'MCP · 클라우드 CLI', when: '업무 흐름과 권한 범위가 정해졌을 때' },
]

/** W26. 오늘 설치하지 않는 것도 결정 */
export function LaterToolsSlide() {
  return (
    <SlideLayout>
      <SlideKicker>미루는 것은 빠뜨리는 게 아닙니다</SlideKicker>
      <SlideHeadline>필요 신호가 오면 여는 도구들</SlideHeadline>

      <div className="grid gap-3 lg:grid-cols-5">
        {LATER.map((item, index) => (
          <Panel
            key={item.name}
            tone="sunken"
            pad="md"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
              index === 4 && 'animate-rise-5',
            )}
          >
            <item.icon className="size-7 text-content-muted md:size-9" />
            <p className="text-deck-body font-bold text-content-strong">{item.name}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.when}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="raised" pad="md" className="animate-rise-5 flex items-center gap-5">
        <CircleCheck className="size-8 shrink-0 text-positive md:size-10" />
        <p className="text-deck-body text-content-secondary">
          새 도구를 열 때마다 <span className="font-bold text-content-strong">설치 이유 · 검증 명령 · 되돌리는 법</span>을 SETUP-REPORT에 추가합니다.
        </p>
      </Panel>
    </SlideLayout>
  )
}
