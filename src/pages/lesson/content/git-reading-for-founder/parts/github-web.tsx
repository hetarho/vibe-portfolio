import {
  Check,
  CircleCheck,
  CircleX,
  Coffee,
  GitPullRequest,
  History,
  KeyRound,
  ScrollText,
  ShieldAlert,
  Timer,
  X,
} from 'lucide-react'
import {
  CountdownTimer,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideBody,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideLead,
  SlideNote,
} from '../../../deck'
import {
  ACTIONS_LOG,
  ACTIONS_READING,
  ACTIONS_STEPS,
  BANNER_DIFF,
  COMMITS_CHECKS,
  COMMITS_PAGE,
  DIFF_CHECKS,
  PR_FILES,
  PR_REVIEW_CHECKS,
  PR_SPOTS,
  PR_STATES,
  REPO,
  REPO_HOME_SPOTS,
  type DiffLine,
  type TermLine,
} from '../model/git-samples'

/** G16. 휴식 5분 */
export function BreakSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col items-center gap-6 md:gap-10">
        <Coffee className="size-10 text-accent md:size-14" />
        <SlideHeadline size="hero">휴식 5분</SlideHeadline>
        <CountdownTimer seconds={300} caption="남은 시간" />
        <Panel tone="raised" pad="lg" className="flex flex-col items-center gap-3">
          <PanelLabel tone="accent">돌아와서 할 것</PanelLabel>
          <p className="text-deck-body font-semibold text-content-strong">
            github.com에서 본인 레포를 열어요 — 지금부터는 연습이 아니라 실전이에요
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

/** G17. 실습 · 내 레포 첫 화면 4군데 */
export function RepoHomeSlide() {
  return (
    <SlideLayout>
      <SlideKicker>여기부터 본인 레포로 · 같이 열어요</SlideKicker>
      <SlideHeadline>첫 화면에서 볼 곳은 딱 4군데예요</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {REPO_HOME_SPOTS.map((item, index) => (
          <Panel
            key={item.spot}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-3',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-secondary md:size-12">
                {index + 1}
              </span>
              <p className="text-deck-body font-bold text-content-strong">{item.spot}</p>
            </div>
            <p className="w-fit rounded-control bg-surface-sunken px-3 py-1.5 font-mono text-deck-caption text-content-primary inset-shadow-sunken md:px-4">
              {item.find}
            </p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.read}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        레포 첫 화면은 가게 앞 간판이에요 — <Mark>마지막 입고가 언제였는지</Mark>부터 보여요
      </SlideNote>
    </SlideLayout>
  )
}

/** G18. ⭐ push 확인은 commits에서 */
export function CommitsPageSlide() {
  return (
    <SlideLayout>
      <SlideKicker>미스터리의 아침 · GitHub</SlideKicker>
      <SlideHeadline>push 됐는지는 commits가 말해줘요</SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="md" className="flex flex-col gap-2 lg:col-span-5">
          <p className="px-1 font-mono text-deck-caption text-content-muted">
            {REPO.owner}/{REPO.name} · Commits
          </p>
          {COMMITS_PAGE.map((row) => (
            <div
              key={row.hash}
              className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-card bg-surface-raised px-4 py-3 shadow-raised md:px-5 md:py-4"
            >
              <p className="flex-1 text-deck-caption font-semibold text-content-strong">{row.message}</p>
              <p className="font-mono text-deck-caption text-content-muted">{row.hash}</p>
              <p className="text-deck-caption text-content-muted">{row.when}</p>
              {row.check === 'pass' ? (
                <CircleCheck className="size-5 shrink-0 text-positive md:size-6" />
              ) : (
                <CircleX className="size-5 shrink-0 text-critical md:size-6" />
              )}
            </div>
          ))}
        </Panel>

        <div className="flex flex-col gap-4 md:gap-6 lg:col-span-4">
          {COMMITS_CHECKS.map((item, index) => (
            <Panel
              key={item.step}
              tone="raised"
              pad="md"
              className={cx('flex flex-1 flex-col gap-3', index === 0 && 'animate-rise-1', index === 1 && 'animate-rise-2')}
            >
              <p className="text-deck-body font-bold text-content-strong">{item.step}</p>
              <p className="text-deck-caption text-content-secondary">{item.read}</p>
            </Panel>
          ))}
        </div>
      </div>

      <Panel tone="accentSoft" pad="md" className="animate-rise-3">
        <p className="text-deck-body font-semibold text-content-strong">
          터미널의 log 맨 윗줄(<span className="font-mono">f3a9c12</span>)이 여기 없죠 — 어제 커밋은 GitHub에
          도착하지 않았어요
        </p>
      </Panel>

      <SlideNote tone="quiet">
        push 됐는지 궁금하면 <Mark>터미널의 맨 윗줄과 GitHub의 맨 윗줄</Mark>을 맞대보면 끝이에요
      </SlideNote>
    </SlideLayout>
  )
}

// diff 줄 스타일 — 초록 + 줄만 산다. w-fit min-w-full: 긴 줄을 스크롤해도 배경이 끝까지 이어진다.
const diffTone = (line: DiffLine) => {
  if (line.kind === 'add') return 'w-fit min-w-full rounded-control bg-positive-soft text-positive'
  if (line.kind === 'remove') return 'w-fit min-w-full rounded-control bg-critical-soft text-critical'
  return 'text-content-secondary'
}

/** G19. 커밋 열어보기 · AI가 뭘 바꿨나 */
export function CommitDiffSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <History className="size-8 text-accent md:size-11" />
        <SlideHeadline>커밋을 열면 바뀐 줄이 보여요</SlideHeadline>
      </div>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="md" className="flex flex-col gap-1 overflow-x-auto lg:col-span-5">
          <p className="px-3 py-2 font-mono text-deck-caption font-bold text-content-strong md:px-4">
            src/pages/home.tsx
          </p>
          {BANNER_DIFF.map((line, index) => (
            <p
              key={index}
              className={cx('rounded-control px-3 py-1 font-mono text-deck-caption whitespace-pre md:px-4', diffTone(line))}
            >
              {line.code}
            </p>
          ))}
        </Panel>

        <div className="flex flex-col gap-4 md:gap-6 lg:col-span-4">
          {DIFF_CHECKS.map((item, index) => (
            <Panel
              key={item.step}
              tone="raised"
              pad="md"
              className={cx(
                'flex flex-1 flex-col gap-2',
                index === 0 && 'animate-rise-1',
                index === 1 && 'animate-rise-2',
                index === 2 && 'animate-rise-3',
              )}
            >
              <p className="text-deck-body font-bold text-content-strong">{item.step}</p>
              <p className="text-deck-caption text-content-secondary">{item.read}</p>
            </Panel>
          ))}
        </div>
      </div>

      <SlideBody>
        아침마다 1분 — <Mark>어제 AI가 뭘 바꿨는지</Mark> 커밋 하나 열어보는 습관이 서비스 주인의 눈이에요.
      </SlideBody>
    </SlideLayout>
  )
}

/** G20. PR은 합치기 전 대기실 */
export function PrWaitingRoomSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <GitPullRequest className="size-8 text-accent md:size-11" />
        <SlideHeadline>Pull request는 main에 들어가기 전 대기실</SlideHeadline>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {PR_STATES.map((state, index) => (
          <Panel
            key={state.name}
            tone={state.key ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <PanelLabel tone={state.key ? 'accent' : 'muted'}>{state.name}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">
              {state.name === 'Draft' && '작업 중'}
              {state.name === 'Open' && '검토 대기'}
              {state.name === 'Merged' && 'main에 합쳐짐'}
              {state.name === 'Closed' && '합치지 않고 닫힘'}
            </p>
            <p className="mt-auto text-deck-caption text-content-secondary">{state.read}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="lg" className="animate-rise-5 flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-14">
          !
        </span>
        <p className="text-deck-body text-content-secondary">
          <span className="font-semibold text-content-strong">Open + Checks passed</span> 여도 아직 main에는 없어요. 상태가{' '}
          <Mark>Merged</Mark>가 되어야 문을 통과한 거예요.
        </p>
      </Panel>
    </SlideLayout>
  )
}

/** G21. PR에서 볼 곳 4개 */
export function PrFourPlacesSlide() {
  return (
    <SlideLayout>
      <SlideKicker>Pull requests → Open PR 하나 클릭</SlideKicker>
      <SlideHeadline>PR을 열면 위쪽 탭 4개만 봐요</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {PR_SPOTS.map((item, index) => (
          <Panel
            key={item.spot}
            tone={item.key ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex items-start gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-secondary md:size-14">
              {index + 1}
            </span>
            <span className="flex flex-col gap-2">
              <span className="text-deck-body font-bold text-content-strong">{item.spot}</span>
              <span className="text-deck-caption text-content-secondary">{item.read}</span>
            </span>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        창업자가 가장 오래 볼 곳은 <Mark>Files changed</Mark> — 코드 작성이 아니라 변경 범위 승인 화면이에요
      </SlideNote>
    </SlideLayout>
  )
}

/** G22. ⭐ AI가 만든 PR 검토하기 */
export function AiPrReviewSlide() {
  return (
    <SlideLayout>
      <SlideKicker>요청 · “홈에 이벤트 배너를 달아줘”</SlideKicker>
      <SlideHeadline>시킨 일 밖의 파일이 섞였나요?</SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="md" className="flex flex-col gap-3 lg:col-span-5">
          <div className="flex items-center justify-between gap-4 px-1">
            <PanelLabel>Files changed · 4</PanelLabel>
            <p className="text-deck-caption text-content-muted">+48 −12</p>
          </div>
          {PR_FILES.map((file) => (
            <div
              key={file.path}
              className={cx(
                'flex items-center gap-3 rounded-card bg-surface-raised p-4 shadow-raised md:p-5',
                !file.expected && 'ring-2 ring-critical/50',
              )}
            >
              <span
                className={cx(
                  'grid size-8 shrink-0 place-items-center rounded-control font-mono text-deck-caption font-bold',
                  file.state === 'added'
                    ? 'bg-positive-soft text-positive'
                    : 'bg-surface-highlight text-content-secondary',
                )}
              >
                {file.state === 'added' ? 'A' : 'M'}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-mono text-deck-caption font-semibold text-content-strong">
                  {file.path}
                </span>
                <span className="text-deck-caption text-content-muted">{file.read}</span>
              </span>
              <span className={cx('text-deck-caption font-semibold', file.expected ? 'text-positive' : 'text-critical')}>
                {file.expected ? '예상' : '왜?'}
              </span>
            </div>
          ))}
        </Panel>

        <div className="flex flex-col gap-3 md:gap-4 lg:col-span-4">
          {PR_REVIEW_CHECKS.map((check, index) => (
            <Panel
              key={check.head}
              tone="raised"
              pad="md"
              className={cx(
                'flex flex-1 flex-col gap-2',
                index === 0 && 'animate-rise-1',
                index === 1 && 'animate-rise-2',
                index === 2 && 'animate-rise-3',
              )}
            >
              <p className="text-deck-body font-bold text-content-strong">{index + 1}. {check.head}</p>
              <p className="text-deck-caption text-content-secondary">{check.read}</p>
            </Panel>
          ))}
          <p className="rounded-card bg-surface-sunken p-4 text-deck-caption font-semibold text-content-primary inset-shadow-sunken">
            Claude에게: &ldquo;payments.ts와 package.json은 왜 바꿨는지, 배너 작업에 꼭 필요한지 설명해줘&rdquo;
          </p>
        </div>
      </div>

      <SlideNote>
        설명을 듣기 전에는 <span className="underline decoration-4 underline-offset-8">Merge 버튼을 누르지 않아요</span>
      </SlideNote>
    </SlideLayout>
  )
}

const ACTION_STATES = [
  {
    icon: CircleCheck,
    iconClass: 'text-positive',
    name: '초록 ✓ · 통과',
    read: '설정된 검사와 작업을 통과했어요. Deploy 작업이 있는지는 한 번 더 봐야 해요.',
  },
  {
    icon: CircleX,
    iconClass: 'text-critical animate-breathe',
    name: '빨간 ✗ · 실패',
    read: '중간에 멈췄어요. 사이트는 아직 옛날 코드예요.',
  },
  {
    icon: Timer,
    iconClass: 'text-caution',
    name: '노란 ● · 진행 중',
    read: '로봇이 아직 도는 중이에요. 1~2분 기다렸다 새로고침해요.',
  },
]

/** G23. Actions · 초록 체크와 빨간 ✗ */
export function ActionsOverviewSlide() {
  return (
    <SlideLayout>
      <SlideKicker>미스터리 2막 — 푸시를 했더니</SlideKicker>
      <SlideHeadline>푸시하면 GitHub의 로봇이 돌아요</SlideHeadline>
      <SlideLead>검사하고 빌드하고, 설정돼 있다면 배포까지 — 그 실행 결과가 ✓과 ✗예요.</SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {ACTION_STATES.map((item, index) => (
          <Panel
            key={item.name}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <item.icon className={cx('size-8 md:size-11', item.iconClass)} />
            <p className={cx('text-deck-body font-bold', index === 1 ? 'text-critical' : 'text-content-strong')}>
              {item.name}
            </p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.read}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-4">
        <p className="text-deck-caption text-content-secondary">
          초록은 “등록된 작업이 성공했다”는 뜻이에요. Test·Build만 등록됐다면 배포 여부는 아직 몰라요
        </p>
      </Panel>

      <SlideNote tone="quiet">
        빨간 ✗의 뜻은 하나예요 — <Mark>푸시는 됐지만 그다음 단계가 멈췄다</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

// Actions 로그 줄 스타일 — 원인 줄(bad)만 빨간 면으로 띄운다
const actionsLogTone = (line: TermLine) => {
  if (line.tone === 'bad') return 'w-fit min-w-full rounded-control bg-critical-soft font-semibold text-critical'
  if (line.tone === 'key') return 'font-bold text-content-strong'
  if (line.tone === 'muted') return 'text-content-muted opacity-60'
  return 'text-content-secondary'
}

/** G24. ⭐ 실패 로그에서 원인 찾기 */
export function ActionsLogSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <ScrollText className="size-8 text-critical md:size-11" />
        <SlideHeadline>빨간 ✗를 열면 원인이 적혀 있어요</SlideHeadline>
      </div>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="raised" pad="sm" className="animate-rise-1 flex flex-col gap-2 lg:col-span-3">
          <PanelLabel>step 목록</PanelLabel>
          {ACTIONS_STEPS.map((step) => (
            <div
              key={step.name}
              className={cx(
                'flex items-center gap-3 rounded-control px-3 py-2 md:px-4 md:py-3',
                step.state === 'fail' && 'bg-critical-soft',
                step.state === 'skip' && 'opacity-60',
              )}
            >
              {step.state === 'pass' ? <Check className="size-5 shrink-0 text-positive md:size-6" /> : null}
              {step.state === 'fail' ? <X className="size-5 shrink-0 text-critical md:size-6" /> : null}
              {step.state === 'skip' ? (
                <span className="w-5 shrink-0 text-center font-mono text-deck-caption text-content-muted md:w-6">
                  –
                </span>
              ) : null}
              <p
                className={cx(
                  'flex-1 text-deck-caption font-semibold',
                  step.state === 'fail' && 'text-critical',
                  step.state === 'skip' && 'text-content-muted',
                  step.state === 'pass' && 'text-content-primary',
                )}
              >
                {step.name}
              </p>
              <p className={cx('font-mono text-deck-caption', step.state === 'fail' ? 'text-critical' : 'text-content-muted')}>
                {step.duration}
              </p>
            </div>
          ))}
        </Panel>

        <Panel tone="sunken" pad="md" className="animate-rise-2 flex flex-col gap-1 overflow-x-auto lg:col-span-6">
          <p className="px-3 py-1 font-mono text-deck-caption text-content-muted md:px-4">✗ Build · 로그</p>
          {ACTIONS_LOG.map((line, index) => (
            <p
              key={index}
              className={cx(
                'rounded-control px-3 py-1 font-mono text-deck-caption whitespace-pre md:px-4',
                actionsLogTone(line),
              )}
            >
              {line.text || ' '}
            </p>
          ))}
        </Panel>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {ACTIONS_READING.map((item, index) => (
          <Panel
            key={item.step}
            tone="raised"
            pad="md"
            className={cx(
              'flex flex-col gap-2',
              index === 0 && 'animate-rise-3',
              index === 1 && 'animate-rise-4',
              index === 2 && 'animate-rise-5',
            )}
          >
            <p className="text-deck-body font-bold text-content-strong">{item.step}</p>
            <p className="text-deck-caption text-content-secondary">{item.read}</p>
          </Panel>
        ))}
      </div>

      <SlideNote>
        미스터리 ② 풀림 — 범인은{' '}
        <span className="underline decoration-4 underline-offset-8">커밋에서 빠졌던 새 파일</span>. 1부의 그
        Untracked 한 줄이었어요
      </SlideNote>
    </SlideLayout>
  )
}

/** G28. 내 API 키는 안전한가 */
export function SecretsSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>결제 키가 GitHub에 올라가 있진 않나요?</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-4">
          <ShieldAlert className="size-8 text-content-muted md:size-10" />
          <p className="text-deck-body font-bold text-content-strong">이 레포, Public인가요?</p>
          <p className="text-deck-caption text-content-secondary">
            Public이면 코드도, 역사도, 전 세계 누구나 볼 수 있어요.
          </p>
          <p className="mt-auto rounded-card bg-surface-sunken p-4 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-5">
            서비스 레포가 모르고 Public이면 → Settings 맨 아래에서 Private으로. 클릭 두 번이라 직접 해요
          </p>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4">
          <KeyRound className="size-8 text-content-muted md:size-10" />
          <p className="text-deck-body font-bold text-content-strong">
            <span className="font-mono">.env</span>가 올라가 있나요?
          </p>
          <p className="text-deck-caption text-content-secondary">
            레포 검색창에 <span className="font-mono text-content-strong">.env</span>를 쳐 봐요. API 키·결제 키가 든
            파일이 나오는지 보는 거예요.
          </p>
          <p className="mt-auto rounded-card bg-surface-sunken p-4 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-5">
            현재 파일 검색은 1차 확인 — 이미 삭제된 과거 커밋은 여기서 안 보여요
          </p>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-3 flex flex-col gap-4">
          <KeyRound className="size-8 text-accent md:size-10" />
          <p className="text-deck-body font-bold text-content-strong">과거 노출은 Secret scanning</p>
          <p className="text-deck-caption text-content-secondary">
            <span className="font-semibold text-content-strong">Security and quality → Secret scanning</span>에서 삭제된
            파일과 과거 커밋의 경고까지 확인해요. 레포·플랜에 따라 메뉴가 없을 수 있어요.
          </p>
          <p className="mt-auto rounded-card bg-surface-sunken p-4 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-5">
            한 번이라도 올라간 키는 삭제로 끝내지 말고 <Mark>즉시 폐기·재발급</Mark>
          </p>
        </Panel>
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-col gap-2">
        <PanelLabel>Claude에게 시킬 점검 한 마디</PanelLabel>
        <p className="text-deck-body font-semibold text-content-primary">
          &ldquo;이 레포에 비밀키나 .env가 커밋된 적 있는지 역사까지 뒤져서 알려줘&rdquo;
        </p>
      </Panel>

      <SlideNote tone="quiet">
        &ldquo;AI가 알아서 가려줬겠지&rdquo;를 <Mark>오늘 확인으로</Mark> 바꿔요 — 5분이면 돼요
      </SlideNote>
    </SlideLayout>
  )
}
