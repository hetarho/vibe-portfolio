import { Check, CircleCheck, CircleX, History, Rocket, Timer, X } from 'lucide-react'
import { useState } from 'react'
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
import {
  ACTIVITY_EVENTS,
  CAPSTONE_EVIDENCE,
  DEPLOYMENTS_PAGE,
  DEPLOYMENT_STATES,
  GREEN_ACTIONS_STEPS,
  ROLLBACK_POINTS,
} from '../model/git-samples'

/** G25. Actions 초록 = 무조건 배포 성공? */
export function ActionsNotDeploymentSlide() {
  return (
    <SlideLayout>
      <SlideKicker>초록 체크를 한 단계 더 정확히 읽기</SlideKicker>
      <SlideHeadline>Actions가 초록이어도 사이트는 그대로일 수 있어요</SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-4 lg:col-span-5">
          <div className="flex items-center justify-between gap-4">
            <PanelLabel tone="accent">✓ Pull request checks</PanelLabel>
            <Chip tone="accent">Success</Chip>
          </div>
          {GREEN_ACTIONS_STEPS.map((step) => (
            <div key={step.name} className="flex items-center gap-4 rounded-card bg-surface-sunken p-4 inset-shadow-sunken">
              <Check className="size-5 shrink-0 text-positive md:size-6" />
              <p className="flex-1 text-deck-caption font-semibold text-content-primary">{step.name}</p>
              <p className="font-mono text-deck-caption text-content-muted">{step.duration}</p>
            </div>
          ))}
          <p className="text-deck-caption text-content-muted">목록 끝 — Deploy라는 job은 애초에 없어요.</p>
        </Panel>

        <Panel tone="sunken" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <Rocket className="size-8 text-content-muted md:size-10" />
          <PanelLabel>Production 배포</PanelLabel>
          <p className="font-mono text-deck-lead font-bold text-content-strong">c19e5b0</p>
          <p className="text-deck-caption text-content-secondary">feat: 예약 확인 메일 발송</p>
          <p className="text-deck-caption font-semibold text-critical">3 days ago · 최신 커밋이 아님</p>
          <p className="mt-auto rounded-card bg-surface-base p-4 text-deck-caption font-semibold text-content-primary inset-shadow-sunken">
            판단: 코드 검사는 성공했지만 production 배포는 시작되지 않았어요.
          </p>
        </Panel>
      </div>

      <SlideNote>
        초록 체크의 정확한 번역 — <span className="underline decoration-4 underline-offset-8">등록된 작업이 성공했다</span>
      </SlideNote>
    </SlideLayout>
  )
}

/** G26. ⭐ Deployments에서 실제 배포 커밋 확인 */
export function DeploymentHistorySlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-4 md:gap-5">
          <Rocket className="size-8 text-accent md:size-11" />
          <SlideHeadline>사이트에 간 커밋은 Deployments가 말해줘요</SlideHeadline>
        </div>
        <Chip>레포 오른쪽 · Deployments</Chip>
      </div>

      <Panel tone="sunken" pad="md" className="flex flex-col gap-3">
        {DEPLOYMENTS_PAGE.map((deployment) => (
          <div
            key={deployment.environment}
            className={cx(
              'grid gap-2 rounded-card p-4 md:grid-cols-12 md:items-center md:gap-4 md:p-5',
              deployment.environment === 'Production' ? 'bg-surface-raised shadow-raised' : 'bg-accent-soft',
            )}
          >
            <div className="flex items-center gap-3 md:col-span-3">
              <CircleCheck className={cx('size-5 shrink-0', deployment.current ? 'text-accent' : 'text-positive')} />
              <p className="text-deck-body font-bold text-content-strong">{deployment.environment}</p>
            </div>
            <p className="text-deck-caption text-content-secondary md:col-span-4">{deployment.message}</p>
            <p className="font-mono text-deck-caption font-bold text-content-primary md:col-span-2">{deployment.hash}</p>
            <p className="text-deck-caption text-content-muted md:col-span-3 md:text-right">{deployment.when}</p>
          </div>
        ))}
      </Panel>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <Panel tone="raised" pad="md" className="animate-rise-1 flex flex-col gap-2">
          <p className="text-deck-body font-bold text-content-strong">① 환경</p>
          <p className="text-deck-caption text-content-secondary">Preview 성공과 Production 성공은 다른 사이트예요.</p>
        </Panel>
        <Panel tone="raised" pad="md" className="animate-rise-2 flex flex-col gap-2">
          <p className="text-deck-body font-bold text-content-strong">② 커밋 해시</p>
          <p className="text-deck-caption text-content-secondary">내 최신 f3a9c12가 production 줄에 있는지 맞대요.</p>
        </Panel>
        <Panel tone="raised" pad="md" className="animate-rise-3 flex flex-col gap-2">
          <p className="text-deck-body font-bold text-content-strong">③ 시각·URL·로그</p>
          <p className="text-deck-caption text-content-secondary">언제 배포됐고 어느 주소인지, 실패하면 어떤 로그인지 열어요.</p>
        </Panel>
      </div>

      <SlideNote>
        여기서는 Preview만 최신 — <span className="underline decoration-4 underline-offset-8">production은 3일 전 코드</span>예요
      </SlideNote>
    </SlideLayout>
  )
}

const DEPLOYMENT_TONES = {
  caution: { icon: Timer, className: 'text-caution', panel: 'raised' as const },
  positive: { icon: CircleCheck, className: 'text-positive', panel: 'raised' as const },
  critical: { icon: CircleX, className: 'text-critical', panel: 'raised' as const },
  muted: { icon: X, className: 'text-content-muted', panel: 'sunken' as const },
}

/** G27. 배포 대기·성공·실패·취소 구분 */
export function DeploymentStatesSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>배포 상태는 네 단어로 끝나요</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {DEPLOYMENT_STATES.map((state, index) => {
          const tone = DEPLOYMENT_TONES[state.tone]
          const Icon = tone.icon
          return (
            <Panel
              key={state.name}
              tone={tone.panel}
              pad="lg"
              className={cx(
                'flex flex-col gap-4',
                index === 0 && 'animate-rise-1',
                index === 1 && 'animate-rise-2',
                index === 2 && 'animate-rise-3',
                index === 3 && 'animate-rise-4',
              )}
            >
              <Icon className={cx('size-8 md:size-10', tone.className)} />
              <p className="font-mono text-deck-body font-bold text-content-strong">{state.name}</p>
              <p className="mt-auto text-deck-caption text-content-secondary">{state.read}</p>
            </Panel>
          )
        })}
      </div>

      <Panel tone="sunken" pad="lg" className="animate-rise-5 flex flex-col gap-3">
        <PanelLabel>기다려도 되는 것 vs 고쳐야 하는 것</PanelLabel>
        <p className="text-deck-body text-content-secondary">
          Pending은 잠깐 기다리고, Failure는 로그를 읽어요. Canceled는 더 최신 실행이 성공했는지 먼저 확인해요.
        </p>
      </Panel>

      <SlideNote tone="quiet">
        상태 이름보다 중요한 건 <Mark>어느 환경의 어느 커밋인가</Mark>예요
      </SlideNote>
    </SlideLayout>
  )
}

/** G33. Activity · 누가 무엇을 바꿨나 */
export function ActivitySlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <History className="size-8 text-accent md:size-11" />
        <SlideHeadline>커밋이 사라졌다면 Activity를 열어요</SlideHeadline>
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip tone="accent">All activity</Chip>
        <Chip>Direct pushes</Chip>
        <Chip>Pull request merges</Chip>
        <Chip>Force pushes</Chip>
      </div>

      <Panel tone="sunken" pad="md" className="flex flex-col gap-3">
        {ACTIVITY_EVENTS.map((event, index) => (
          <div
            key={`${event.action}-${event.when}`}
            className={cx(
              'grid gap-2 rounded-card p-4 md:grid-cols-12 md:items-center md:gap-4 md:p-5',
              event.danger ? 'bg-critical-soft ring-2 ring-critical/40' : 'bg-surface-raised shadow-raised',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <p className={cx('font-mono text-deck-caption font-bold md:col-span-2', event.danger ? 'text-critical' : 'text-content-muted')}>
              {event.icon}
            </p>
            <p className="text-deck-caption font-semibold text-content-strong md:col-span-2">{event.who}</p>
            <p className={cx('font-mono text-deck-caption md:col-span-6', event.danger ? 'text-critical' : 'text-content-secondary')}>
              {event.action}
            </p>
            <p className="text-deck-caption text-content-muted md:col-span-2 md:text-right">{event.when}</p>
          </div>
        ))}
      </Panel>

      <SlideNote>
        원인 발견 — <span className="underline decoration-4 underline-offset-8">main이 force-push로 옛 커밋으로 돌아갔어요</span>
      </SlideNote>

      <SlideBody>Claude에게: &ldquo;Activity의 force-push 기록을 보고, 사라진 커밋을 복구할 방법부터 설명해줘&rdquo;</SlideBody>
    </SlideLayout>
  )
}

/** G34. ⭐ 문제 생기면 마지막 정상 버전으로 */
export function RollbackSlide() {
  return (
    <SlideLayout>
      <SlideKicker>사이트 장애 · 먼저 정상 기준점을 찾기</SlideKicker>
      <SlideHeadline>되돌리기는 “지우기”가 아니라 새 커밋이에요</SlideHeadline>

      <div className="grid items-center gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-5 lg:col-span-4">
          {ROLLBACK_POINTS.map((point, index) => (
            <div key={point.hash} className="flex items-start gap-4">
              <span
                className={cx(
                  'grid size-10 shrink-0 place-items-center rounded-full font-mono text-deck-caption font-bold md:size-12',
                  point.state === 'good' ? 'bg-positive-soft text-positive' : 'bg-critical-soft text-critical',
                )}
              >
                {index + 1}
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-mono text-deck-caption font-bold text-content-strong">{point.hash}</span>
                <span className="text-deck-caption text-content-secondary">{point.label}</span>
              </span>
            </div>
          ))}
        </Panel>

        <div className="flex flex-col gap-3 md:gap-4 lg:col-span-5">
          {[
            ['① 기준점 찾기', 'Deployments에서 마지막 정상 production 커밋 c19e5b0을 찾는다.'],
            ['② 차이 좁히기', 'Compare에서 c19e5b0 → f3a9c12 사이 변경만 본다.'],
            ['③ 안전하게 되돌리기', '문제 변경을 취소하는 새 커밋을 만들고, 다시 검사·배포한다.'],
          ].map(([head, read], index) => (
            <Panel
              key={head}
              tone="raised"
              pad="md"
              className={cx('flex flex-1 flex-col gap-2', index === 0 && 'animate-rise-1', index === 1 && 'animate-rise-2', index === 2 && 'animate-rise-3')}
            >
              <p className="text-deck-body font-bold text-content-strong">{head}</p>
              <p className="text-deck-caption text-content-secondary">{read}</p>
            </Panel>
          ))}
        </div>
      </div>

      <Panel tone="accentSoft" pad="md" className="animate-rise-4">
        <p className="text-deck-body font-semibold text-content-strong">
          Claude에게: &ldquo;c19e5b0이 마지막 정상이야. f3a9c12와 차이를 설명하고, 다른 변경은 살린 채 문제만 revert해줘&rdquo;
        </p>
      </Panel>

      <SlideNote tone="quiet">
        직접 reset·force push하지 않아요 — <Mark>정상 기준점과 보존할 변경</Mark>을 먼저 말해요
      </SlideNote>
    </SlideLayout>
  )
}

/** G35. 최종 종합 미스터리 */
export function CapstoneSlide() {
  const [revealed, setRevealed] = useState(false)

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <div>
          <SlideKicker>마지막 사건 · 네 화면을 함께 읽기</SlideKicker>
          <SlideHeadline>전부 초록인데 왜 사이트는 옛날일까요?</SlideHeadline>
        </div>
        <Chip tone="accent">최종 실습</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {CAPSTONE_EVIDENCE.map((item, index) => (
          <Panel
            key={item.where}
            tone="raised"
            pad="md"
            className={cx(
              'flex flex-col gap-2',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <PanelLabel>{item.where}</PanelLabel>
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-secondary">
                {index + 1}
              </span>
            </div>
            <p className="font-mono text-deck-caption font-bold text-content-strong">{item.evidence}</p>
            <p className="text-deck-caption text-content-secondary">{item.read}</p>
          </Panel>
        ))}
      </div>

      {revealed ? (
        <Panel tone="accentSoft" pad="lg" className="animate-pop flex flex-col gap-3">
          <PanelLabel tone="accent">판단</PanelLabel>
          <p className="text-deck-body font-bold text-content-strong">
            최신 코드는 feature/banner에 있고 PR은 Open — 검사는 통과했지만 main에 합쳐지지 않아 production이 3일 전이에요.
          </p>
          <p className="text-deck-caption font-semibold text-content-primary">
            시킬 말: &ldquo;PR의 Files changed를 보여줘. 확인 후 main에 합치고 production이 f3a9c12인지 확인해줘&rdquo;
          </p>
        </Panel>
      ) : (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="rounded-full bg-accent px-6 py-4 text-deck-body font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck hover:brightness-110"
        >
          범인과 시킬 말 확인하기
        </button>
      )}

      <SlideNote tone="quiet">
        네 화면의 해시는 한 줄로 이어져요 — <Mark>브랜치 → PR → Actions → Deployments</Mark>
      </SlideNote>
    </SlideLayout>
  )
}
