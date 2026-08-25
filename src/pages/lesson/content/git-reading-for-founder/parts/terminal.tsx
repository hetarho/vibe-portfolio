import { Compass, GitBranch, GitPullRequest, Laptop, Monitor, RefreshCw, ShieldAlert, Terminal } from 'lucide-react'
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
import {
  BRANCHES_PAGE,
  BRANCH_RULES,
  DANGER_SIGNS,
  LOG_READING,
  LOG_SAMPLE,
  REMOTE_CHECKS,
  REMOTE_LINES,
  STATUS_PHRASES,
  STATUS_STAGES,
  TWO_COMPUTERS,
  type TermLine,
} from '../model/git-samples'

/** git-samples의 tone → 화면 톤. bad는 git이 빨갛게 찍는 줄, key는 판단 근거 문장. */
const TERM_TONE: Record<NonNullable<TermLine['tone']>, string> = {
  muted: 'text-content-muted opacity-60',
  key: 'font-bold text-content-strong',
  bad: 'text-critical',
  good: 'text-positive',
}

const termToneClass = (tone: TermLine['tone']) => (tone ? TERM_TONE[tone] : 'text-content-secondary')

/** G8. ⭐ git status · 고치고 커밋하고 푸시하면 */
export function StatusLifecycleSlide() {
  const [step, setStep] = useState(0)
  const stage = STATUS_STAGES[step]

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-4 md:gap-5">
          <Terminal className="size-8 text-accent md:size-11" />
          <SlideHeadline>고치고, 커밋하고, 푸시하면</SlideHeadline>
        </div>
        <Chip tone="accent">
          {step + 1} / {STATUS_STAGES.length}단계
        </Chip>
      </div>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="md" className="flex flex-col gap-1 overflow-x-auto lg:col-span-5">
          <p className="px-3 py-2 font-mono text-deck-caption font-bold text-content-muted md:px-4">$ git status</p>
          {stage.lines.map((line, index) => (
            <p
              key={index}
              className={cx(
                'px-3 py-1 font-mono text-deck-caption whitespace-pre transition duration-300 ease-deck md:px-4',
                termToneClass(line.tone),
              )}
            >
              {line.text || ' '}
            </p>
          ))}
        </Panel>

        <div className="flex flex-col gap-3 lg:col-span-4">
          <div className="flex flex-wrap gap-2">
            {STATUS_STAGES.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setStep(index)}
                className={cx(
                  'rounded-full px-4 py-2 text-deck-caption font-semibold transition duration-200 ease-deck md:px-5 md:py-3',
                  step === index
                    ? 'bg-accent text-accent-contrast shadow-lifted'
                    : 'bg-surface-raised text-content-secondary shadow-raised hover:bg-surface-highlight hover:text-content-primary',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Panel tone="raised" pad="lg" className="flex flex-1 flex-col justify-center gap-4">
            <p className="text-deck-caption text-content-muted">{stage.action}</p>
            <p className="text-deck-body text-content-secondary">{stage.verdict}</p>
            {stage.order ? (
              <p className="animate-pop rounded-card bg-surface-sunken p-4 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-5">
                Claude에게: {stage.order}
              </p>
            ) : null}
          </Panel>
        </div>
      </div>

      <p className="text-deck-meta text-content-muted">②의 Untracked 한 줄을 기억해 두세요 — 2부에서 다시 나옵니다</p>
    </SlideLayout>
  )
}

/** 방향 그림에 쓰는 화살표와 이름표 — 문장 원문은 git-samples에 있다 */
const DIRECTIONS = {
  same: { symbol: '=', label: '같아요' },
  ahead: { symbol: '→', label: '내가 앞' },
  behind: { symbol: '←', label: 'GitHub가 앞' },
}

/** G9. ahead/behind 번역표 */
export function AheadBehindSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>이 문장, 셋 중 하나예요</SlideHeadline>

      <div className="flex flex-col gap-4 md:gap-6">
        {STATUS_PHRASES.map((item, index) => {
          const direction = DIRECTIONS[item.direction]
          return (
            <Panel
              key={item.phrase}
              tone="raised"
              pad="md"
              className={cx(
                'grid items-center gap-4 md:gap-6 lg:grid-cols-9',
                index === 0 && 'animate-rise-1',
                index === 1 && 'animate-rise-2',
                index === 2 && 'animate-rise-3',
              )}
            >
              <p className="overflow-x-auto rounded-card bg-surface-sunken p-4 font-mono text-deck-caption text-content-strong inset-shadow-sunken md:p-5 lg:col-span-4">
                {item.phrase}
              </p>
              <div className="flex items-center justify-center gap-2 md:gap-3 lg:col-span-2">
                <Chip>노트북</Chip>
                <span className="flex flex-col items-center">
                  <span className="text-deck-body font-bold text-content-strong" aria-hidden>
                    {direction.symbol}
                  </span>
                  <span className="text-deck-meta text-content-muted">{direction.label}</span>
                </span>
                <Chip>GitHub</Chip>
              </div>
              <div className="flex flex-col gap-2 lg:col-span-3">
                <p className="text-deck-caption text-content-secondary">{item.read}</p>
                <p className="text-deck-caption font-semibold text-content-primary">시킬 말: {item.order}</p>
              </div>
            </Panel>
          )
        })}
      </div>

      <SlideNote tone="quiet">
        문장은 길어도 볼 건 <Mark>ahead냐 behind냐 숫자 몇이냐</Mark>뿐이에요
      </SlideNote>
    </SlideLayout>
  )
}

/** G10. ⭐ git log · 어디까지 올라갔나 */
export function LogReadingSlide() {
  return (
    <SlideLayout>
      <SlideKicker>미스터리의 아침 · 노트북</SlideKicker>
      <SlideHeadline>어제 커밋은 어디까지 갔을까요</SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="md" className="flex flex-col gap-1 overflow-x-auto lg:col-span-5">
          <p className="px-3 py-2 font-mono text-deck-caption font-bold text-content-muted md:px-4">
            $ git log --oneline -5
          </p>
          {LOG_SAMPLE.map((line) => (
            <p
              key={line.hash}
              className={cx(
                // w-fit min-w-full: 줄이 화면보다 길어도 강조 배경이 끝까지 이어진다
                'rounded-control px-3 py-1 font-mono text-deck-caption whitespace-pre md:px-4',
                line.unpushed && 'w-fit min-w-full bg-accent-soft',
              )}
            >
              <span className="text-content-muted">{line.hash}</span>
              {line.refs ? (
                <span className={cx('font-semibold', line.refs === 'HEAD -> main' ? 'text-accent' : 'text-info')}>
                  {' '}
                  ({line.refs})
                </span>
              ) : null}
              <span className={line.unpushed ? 'text-content-primary' : 'text-content-secondary'}> {line.message}</span>
            </p>
          ))}
        </Panel>

        <div className="flex flex-col gap-3 md:gap-4 lg:col-span-4">
          {LOG_READING.map((item, index) => (
            <Panel
              key={item.look}
              tone="raised"
              pad="md"
              className={cx(
                'flex flex-1 items-start gap-4',
                index === 0 && 'animate-rise-1',
                index === 1 && 'animate-rise-2',
                index === 2 && 'animate-rise-3',
              )}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-12">
                {index + 1}
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-mono text-deck-caption font-bold text-content-strong">{item.look}</span>
                <span className="text-deck-caption text-content-secondary">{item.read}</span>
              </span>
            </Panel>
          ))}
        </div>
      </div>

      <SlideNote>
        미스터리 ① 풀림 — 커밋은 있었지만{' '}
        <span className="underline decoration-4 underline-offset-8">푸시가 안 됐어요</span>. Claude의 보고와 실제가
        달랐죠
      </SlideNote>

      <p className="text-deck-meta text-content-muted">
        왜 안 됐는지(네트워크, 인증 만료…)는 중요하지 않아요 — 안 됐다는 사실을 읽어낸 게 중요해요
      </p>
    </SlideLayout>
  )
}

/** G11. git remote -v · 이 폴더는 어느 서비스인가 */
export function RemoteSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <Compass className="size-8 text-accent md:size-11" />
        <SlideHeadline>이 폴더, 어느 서비스인가요</SlideHeadline>
      </div>

      <Panel tone="sunken" pad="md" className="flex flex-col gap-1 overflow-x-auto">
        <p className="px-3 py-2 font-mono text-deck-caption font-bold text-content-muted md:px-4">$ git remote -v</p>
        {REMOTE_LINES.map((line) => (
          <p key={line} className="px-3 py-1 font-mono text-deck-caption whitespace-pre text-content-secondary md:px-4">
            {line}
          </p>
        ))}
      </Panel>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {REMOTE_CHECKS.map((item, index) => (
          <Panel
            key={item.look}
            tone={index === 2 ? 'sunken' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-3',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            {/* 셋째 카드(빈 출력)는 터미널 원문이 아니라서 mono를 쓰지 않는다 */}
            <p className={cx('text-deck-caption font-bold text-content-strong', index < 2 && 'font-mono')}>
              {item.look}
            </p>
            <p className="text-deck-caption text-content-secondary">{item.read}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>
        서비스 여러 개를 운영하면 이 명령이 <Mark>&ldquo;내가 지금 어느 가게 계산대에 서 있는지&rdquo;</Mark>{' '}
        확인이에요.
      </SlideBody>
    </SlideLayout>
  )
}

/** G12. 지금 어느 브랜치인가 */
export function BranchBasicsSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <GitBranch className="size-8 text-accent md:size-11" />
        <SlideHeadline>같은 레포에도 작업 줄기는 여러 개예요</SlideHeadline>
      </div>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="lg" className="flex flex-col justify-center gap-4 lg:col-span-4">
          <PanelLabel>지금 서 있는 브랜치</PanelLabel>
          <p className="font-mono text-deck-caption text-content-muted">$ git branch --show-current</p>
          <p className="rounded-card bg-surface-base p-5 font-mono text-deck-lead font-bold text-accent inset-shadow-sunken">
            feature/banner
          </p>
          <p className="text-deck-caption text-content-secondary">
            이 컴퓨터의 최신 작업은 main이 아니라 배너 전용 줄기에 있어요.
          </p>
        </Panel>

        <div className="flex flex-col gap-3 md:gap-4 lg:col-span-5">
          {BRANCH_RULES.map((rule, index) => (
            <Panel
              key={rule.head}
              tone="raised"
              pad="md"
              className={cx(
                'flex flex-1 items-start gap-4',
                index === 0 && 'animate-rise-1',
                index === 1 && 'animate-rise-2',
                index === 2 && 'animate-rise-3',
              )}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-secondary md:size-12">
                {index + 1}
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-deck-body font-bold text-content-strong">{rule.head}</span>
                <span className="text-deck-caption text-content-secondary">{rule.read}</span>
              </span>
            </Panel>
          ))}
        </div>
      </div>

      <SlideNote tone="quiet">
        <Mark>푸시됨</Mark>과 <Mark>main에 들어감</Mark>은 다른 말이에요
      </SlideNote>
    </SlideLayout>
  )
}

/** G13. ⭐ 엉뚱한 브랜치에 푸시한 사례 */
export function WrongBranchSlide() {
  return (
    <SlideLayout>
      <SlideKicker>미스터리 3막 · GitHub에는 분명 있는데</SlideKicker>
      <SlideHeadline>사이트가 그대로라면 브랜치를 봐요</SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="md" className="flex flex-col gap-3 lg:col-span-6">
          <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <p className="font-mono text-deck-caption text-content-muted">Code → View all branches</p>
            <Chip>2 branches</Chip>
          </div>
          {BRANCHES_PAGE.map((branch) => (
            <div
              key={branch.name}
              className={cx(
                'grid gap-2 rounded-card p-4 md:grid-cols-12 md:items-center md:gap-4 md:p-5',
                branch.current ? 'bg-accent-soft' : 'bg-surface-raised shadow-raised',
              )}
            >
              <div className="flex items-center gap-3 md:col-span-3">
                <GitBranch className={cx('size-5 shrink-0', branch.current ? 'text-accent' : 'text-content-muted')} />
                <p className="font-mono text-deck-caption font-bold text-content-strong">{branch.name}</p>
              </div>
              <p className="text-deck-caption text-content-secondary md:col-span-4">{branch.message}</p>
              <p className="font-mono text-deck-caption text-content-muted md:col-span-2">{branch.hash}</p>
              <div className="md:col-span-3 md:text-right">
                <p className="text-deck-caption font-semibold text-content-primary">{branch.role}</p>
                <p className="text-deck-meta text-content-muted">{branch.when}</p>
              </div>
            </div>
          ))}
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-3">
          <GitPullRequest className="size-8 text-accent md:size-10" />
          <PanelLabel tone="accent">판단</PanelLabel>
          <p className="text-deck-body font-bold text-content-strong">푸시는 성공했지만 main은 3일 전 그대로</p>
          <p className="text-deck-caption text-content-secondary">
            production이 main만 보고 있어서, feature/banner의 최신 코드는 사이트에 갈 길이 없어요.
          </p>
          <p className="mt-auto rounded-card bg-surface-sunken p-4 text-deck-caption font-semibold text-content-primary inset-shadow-sunken">
            Claude에게: &ldquo;feature/banner 변경을 PR로 보여주고, 확인받은 뒤 main에 합쳐줘&rdquo;
          </p>
        </Panel>
      </div>

      <SlideNote>
        세 번째 범인 — <span className="underline decoration-4 underline-offset-8">코드는 올라갔지만 잘못된 줄기에 있었어요</span>
      </SlideNote>
    </SlideLayout>
  )
}

const FETCH_STEPS = ['① fetch 전', '② fetch 후 다시 status']

/** G14. ⭐ 두 컴퓨터, 어디가 최신인가 */
export function TwoComputersSlide() {
  const [fetched, setFetched] = useState(false)
  const cards = fetched ? TWO_COMPUTERS.after : TWO_COMPUTERS.before

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-4 md:gap-5">
          <RefreshCw className="size-8 text-accent md:size-11" />
          <SlideHeadline>두 컴퓨터, 어디가 최신일까요</SlideHeadline>
        </div>
        <div className="flex flex-wrap gap-2">
          {FETCH_STEPS.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setFetched(index === 1)}
              className={cx(
                'rounded-full px-4 py-2 text-deck-caption font-semibold transition duration-200 ease-deck md:px-5 md:py-3',
                (index === 1) === fetched
                  ? 'bg-accent text-accent-contrast shadow-lifted'
                  : 'bg-surface-raised text-content-secondary shadow-raised hover:bg-surface-highlight hover:text-content-primary',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <CompareGrid>
        {cards.map((card, index) => {
          const Icon = index === 0 ? Laptop : Monitor
          return (
            <Panel key={card.name} tone="raised" pad="lg" className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Icon className="size-8 text-content-muted md:size-10" />
                <div className="flex flex-col">
                  <p className="text-deck-body font-bold text-content-strong">{card.name}</p>
                  <p className="text-deck-caption text-content-muted">{card.sub}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 overflow-x-auto rounded-card bg-surface-sunken p-4 inset-shadow-sunken md:p-5">
                {card.lines.map((line, lineIndex) => (
                  <p
                    key={lineIndex}
                    className={cx(
                      'font-mono text-deck-caption whitespace-pre transition duration-300 ease-deck',
                      termToneClass(line.tone),
                    )}
                  >
                    {line.text || ' '}
                  </p>
                ))}
              </div>
              <p
                className={cx(
                  'mt-auto text-deck-caption text-content-secondary',
                  // fetch 전 데스크톱의 "최신처럼 보이죠"가 이 화면의 함정이다 — 여기만 힘을 준다
                  !fetched && index === 1 && 'font-semibold text-content-primary',
                )}
              >
                {card.read}
              </p>
            </Panel>
          )
        })}
      </CompareGrid>

      <Panel tone="sunken" pad="md" className="flex flex-col gap-2">
        <PanelLabel>왜 fetch부터?</PanelLabel>
        <p className="text-deck-caption text-content-secondary">
          status의 ahead/behind는 마지막으로 GitHub 소식을 들은 시점 기준이에요. 그래서 컴퓨터를 열면{' '}
          <Mark>fetch(소식만 받기 — 코드는 안 건드려서 항상 안전)</Mark>부터 시키고 읽어요.
        </p>
      </Panel>

      <SlideNote>
        최신은 컴퓨터가 아니라 커밋이 정해요 —{' '}
        <span className="underline decoration-4 underline-offset-8">ahead가 뜬 쪽이 아직 안 보낸 최신</span>을 들고
        있어요
      </SlideNote>
    </SlideLayout>
  )
}

/** G15. 멈추고 읽어야 할 신호 3개 */
export function DangerSignsSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <ShieldAlert className="size-8 text-critical md:size-11" />
        <SlideHeadline>멈추고 읽어야 할 신호 3개</SlideHeadline>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {DANGER_SIGNS.map((sign, index) => (
          <Panel
            key={sign.name}
            tone="raised"
            pad="md"
            className={cx(
              'flex flex-col gap-3',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            {/* 터미널에 찍히는 표기 그대로 보여줘야 해서 uppercase 라벨을 쓰지 않는다 */}
            <p className="font-mono text-deck-caption font-bold text-content-strong">{sign.name}</p>
            <p className="text-deck-caption text-content-muted">{sign.when}</p>
            <div className="flex flex-col gap-1 overflow-x-auto rounded-card bg-surface-sunken p-4 inset-shadow-sunken">
              {sign.lines.map((line) => (
                <p key={line} className="font-mono text-deck-caption whitespace-pre text-critical">
                  {line}
                </p>
              ))}
            </div>
            <p className="text-deck-caption text-content-secondary">{sign.read}</p>
            <p className="mt-auto rounded-card bg-surface-sunken p-4 text-deck-caption font-semibold text-content-primary inset-shadow-sunken">
              Claude에게: {sign.order}
            </p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        셋 다 코드가 사라진 게 아니에요 — <Mark>git이 안전하게 멈춰 준 것</Mark>. 멈추고, 읽고, 시키면 돼요
      </SlideNote>
    </SlideLayout>
  )
}
