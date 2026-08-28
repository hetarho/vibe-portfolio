import { ArrowDown, ArrowRight, Bot, Check, Coffee, RefreshCw, RotateCcw, ShieldCheck, User, X } from 'lucide-react'
import { Fragment, useState } from 'react'
import {
  Chip,
  CompareGrid,
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
import {
  ACCEPTANCE,
  CHECKS,
  CODE_ECONOMICS,
  COMMITS,
  DATA_MODEL,
  DEPLOY_CHECK,
  FEATURE_CUT,
  GOOD_CODE,
  HYPOTHESIS,
  INVARIANTS,
  KEYS,
  LIFECYCLE,
  MAINTENANCE,
  OPERATIONS,
  PROBLEM,
  REPO,
  SCREENS,
  STACK,
  STACK_CRITERIA,
  STATES,
} from '../model/mvp-samples'

const RISE = ['animate-rise-1', 'animate-rise-2', 'animate-rise-3', 'animate-rise-4', 'animate-rise-5']
const rise = (index: number) => RISE[Math.min(index, RISE.length - 1)]

/** 단계 화면 공통 머리 — "① 기획 · 2/3" 처럼 어느 단계의 몇 번째 화면인지 */
function PhaseHead({ phase, children, tag }: { phase: string; children: string; tag?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
      <div className="flex flex-col gap-3">
        <SlideKicker>{phase}</SlideKicker>
        <SlideHeadline>{children}</SlideHeadline>
      </div>
      {tag ? <Chip>{tag}</Chip> : null}
    </div>
  )
}

/** M2. ⭐ 개발은 한 바퀴다 — 7단계를 하나씩 켠다 */
export function LifecycleLoopSlide() {
  const [revealed, setRevealed] = useState(1)
  const done = revealed > LIFECYCLE.length

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>오늘의 지도</SlideKicker>
          <SlideHeadline>개발은 직선이 아니라 한 바퀴예요</SlideHeadline>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setRevealed((value) => Math.min(value + 1, LIFECYCLE.length + 1))}
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

      <ol className="grid gap-3 md:gap-4 lg:grid-cols-7">
        {LIFECYCLE.map((step, index) => {
          const on = index < revealed
          return (
            <li
              key={step.label}
              className={cx(
                'flex flex-col gap-3 rounded-panel p-4 transition duration-500 ease-deck md:p-5',
                on ? 'bg-surface-raised shadow-raised' : 'bg-surface-sunken inset-shadow-sunken',
              )}
            >
              <span
                className={cx(
                  'grid size-10 place-items-center rounded-full text-deck-caption font-bold transition duration-300 ease-deck md:size-12',
                  on ? 'bg-accent text-accent-contrast' : 'bg-surface-highlight text-content-muted',
                )}
              >
                {index + 1}
              </span>
              <p className={cx('text-deck-body font-bold', on ? 'text-content-strong' : 'text-content-muted')}>{step.label}</p>
              <p className={cx('text-deck-caption', on ? 'text-content-secondary' : 'text-content-muted')}>{step.question}</p>
            </li>
          )
        })}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <p className="flex items-center gap-4 rounded-panel bg-surface-raised px-4 py-3 text-deck-caption font-semibold text-content-secondary shadow-raised md:px-8 md:py-5">
          <RefreshCw size={28} className="text-accent" />
          7 → 1 다시: 운영하다 보면 다음 기획이 나와요
        </p>
        <p
          className={cx(
            'rounded-panel px-4 py-3 text-deck-body font-bold transition duration-500 ease-deck md:px-8 md:py-5',
            done ? 'animate-pop bg-accent text-accent-contrast shadow-lifted' : 'bg-surface-sunken text-content-muted',
          )}
        >
          MVP = 이 바퀴를 <span className="underline decoration-4 underline-offset-8">작게 한 번</span>
        </p>
      </div>

      <SlideNote tone="quiet">
        예시는 강사가 Claude Code로 <Mark>{REPO.builtIn}</Mark>에 만든 {REPO.name} — 다음 시간까지 여러분 것도 이 수준으로 가요
      </SlideNote>
    </SlideLayout>
  )
}

/* ───────────────────────────── ① 기획 ───────────────────────────── */

/** M3. 기획 1/3 · 기능이 아니라 문제로 시작한다 */
export function ProblemStatementSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="① 기획 · 1/3" tag="문제 문장">
        기획은 기능 목록이 아니라 문제 한 문장이에요
      </PhaseHead>

      <Panel tone="sunken" pad="md" className="animate-rise-1 overflow-x-auto">
        <p className="font-mono text-deck-body font-semibold whitespace-pre text-content-strong">{PROBLEM.template}</p>
      </Panel>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="animate-rise-2 flex flex-col gap-4">
          <PanelLabel>기능으로 시작하면</PanelLabel>
          <ul className="flex flex-1 flex-col gap-3">
            {PROBLEM.bad.map((line) => (
              <li key={line} className="flex items-start gap-3 text-deck-body text-content-muted">
                <X className="mt-1 size-6 shrink-0 text-critical" aria-hidden />
                <span className="line-through decoration-content-muted">{line}</span>
              </li>
            ))}
          </ul>
          <p className="text-deck-caption text-content-muted">AI에게 주면 "지도 앱"을 만들어요 — 누구의 것도 아닌 지도 앱</p>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-3 flex flex-col gap-3">
          <PanelLabel tone="accent">문제로 시작하면 · {REPO.name}</PanelLabel>
          {[
            ['누가', PROBLEM.good.who],
            ['어떤 상황', PROBLEM.good.when],
            ['무엇을', PROBLEM.good.want],
            ['왜 못 하나', PROBLEM.good.why],
          ].map(([head, body]) => (
            <div key={head} className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
              <span className="shrink-0 text-deck-caption font-bold text-accent md:w-32">{head}</span>
              <span className="text-deck-body text-content-strong">{body}</span>
            </div>
          ))}
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">{PROBLEM.test}</SlideNote>
    </SlideLayout>
  )
}

/** M4. 기획 2/3 · 기능 자르기 */
export function FeatureCutSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="① 기획 · 2/3" tag="넣은 것 3 · 뺀 것 4">
        MVP는 뺀 것의 목록으로 정의돼요
      </PhaseHead>

      <div className="flex flex-wrap gap-3">
        {FEATURE_CUT.rule.map((rule, index) => (
          <Chip key={rule} tone={index === 2 ? 'accent' : 'quiet'}>
            질문 {index + 1} · {rule}
          </Chip>
        ))}
      </div>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-3">
          <PanelLabel tone="accent">넣었다 · 세 질문에 모두 예</PanelLabel>
          {FEATURE_CUT.kept.map((item) => (
            <div key={item.f} className="flex items-start gap-3">
              <Check className="mt-1 size-6 shrink-0 text-positive" aria-hidden />
              <div className="flex flex-col">
                <span className="text-deck-body font-bold text-content-strong">{item.f}</span>
                <span className="text-deck-caption text-content-secondary">{item.why}</span>
              </div>
            </div>
          ))}
        </Panel>

        <Panel tone="sunken" pad="lg" className="animate-rise-3 flex flex-col gap-3">
          <PanelLabel>뺐다 · 하나라도 아니오</PanelLabel>
          {FEATURE_CUT.cut.map((item) => (
            <div key={item.f} className="flex items-start gap-3">
              <X className="mt-1 size-6 shrink-0 text-content-muted" aria-hidden />
              <div className="flex flex-col">
                <span className="text-deck-body font-semibold text-content-primary">{item.f}</span>
                <span className="text-deck-caption text-content-muted">{item.why}</span>
              </div>
            </div>
          ))}
        </Panel>
      </CompareGrid>

      <SlideNote>
        뺀 것은 버린 게 아니에요 — <span className="underline decoration-4 underline-offset-8">문서에 "안 한다"고 적어두는 것</span>까지가 기획
      </SlideNote>
    </SlideLayout>
  )
}

/** M5. 기획 3/3 · 가설과 숫자 */
export function HypothesisSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="① 기획 · 3/3" tag="100명을 숫자로">
        "100명이 써보면"을 측정 가능한 문장으로
      </PhaseHead>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="animate-rise-1 flex flex-col gap-3">
          <PanelLabel>이렇게 쓰면 결과를 못 읽어요</PanelLabel>
          <p className="text-deck-lead font-bold text-content-muted line-through decoration-content-muted">{HYPOTHESIS.vague}</p>
        </Panel>
        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-3">
          <PanelLabel tone="accent">이렇게 쓰면 2주 뒤에 답이 나와요</PanelLabel>
          <p className="text-deck-body font-bold text-content-strong">{HYPOTHESIS.sharp}</p>
        </Panel>
      </CompareGrid>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
        {HYPOTHESIS.measures.map((item, index) => (
          <Panel key={item.q} tone="raised" pad="sm" className={cx('flex flex-col gap-2', rise(index + 2))}>
            <PanelLabel>{item.q}</PanelLabel>
            <p className="font-mono text-deck-caption font-semibold text-content-strong">{item.where}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        <Mark>{HYPOTHESIS.lesson}</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

/* ───────────────────────────── ② UX ───────────────────────────── */

/** M6. UX 1/2 · 해피 패스 한 줄 */
export function UserFlowSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="② UX · 1/2" tag="apps/web/src/pages/">
        가장 행복한 사용자가 지나는 길을 한 줄로 그려요
      </PhaseHead>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        {SCREENS.map((screen, index) => (
          <Fragment key={screen.folder}>
            {index > 0 ? (
              <div className="flex items-center justify-center">
                <ArrowDown className="size-6 text-content-muted lg:hidden" aria-hidden />
                <ArrowRight className="hidden size-6 text-content-muted lg:block" aria-hidden />
              </div>
            ) : null}
            <Panel tone={index === 2 ? 'accentSoft' : 'raised'} pad="sm" className={cx('flex flex-1 flex-col gap-2', rise(index))}>
              <p className="text-deck-body font-bold text-content-strong">{screen.name}</p>
              <p className="font-mono text-deck-caption text-content-muted">pages/{screen.folder}</p>
              <p className="mt-auto text-deck-caption text-content-secondary">{screen.beat}</p>
            </Panel>
          </Fragment>
        ))}
      </div>

      <CompareGrid>
        <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-col gap-2">
          <PanelLabel>화면 수 = 비용</PanelLabel>
          <p className="text-deck-body text-content-secondary">
            화면 하나는 만드는 값 + <span className="text-content-strong">평생 고치는 값</span>이에요. 6개 중 &lsquo;닉네임&rsquo;은 첫 로그인에만 보여서 절반 값.
          </p>
        </Panel>
        <Panel tone="sunken" pad="md" className="animate-rise-5 flex flex-col gap-2">
          <PanelLabel>이 그림을 AI에게 주는 법</PanelLabel>
          <p className="text-deck-body text-content-secondary">
            &ldquo;화면은 이 6개, 이 순서. 각 화면에서 <span className="text-content-strong">할 수 있는 일은 하나씩만</span>&rdquo; — 그림이 곧 라우팅 설계
          </p>
        </Panel>
      </CompareGrid>
    </SlideLayout>
  )
}

/** M7. UX 2/2 · 한 화면의 4가지 상태 */
export function ScreenStatesSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="② UX · 2/2" tag="비개발자가 가장 자주 빠뜨리는 것">
        화면 하나에는 늘 상태가 네 개 있어요
      </PhaseHead>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
        {STATES.map((item, index) => (
          <Panel key={item.state} tone={index === 0 ? 'accentSoft' : 'raised'} pad="md" className={cx('flex flex-col gap-2', rise(index))}>
            <div className="flex items-center gap-3">
              <span
                className={cx(
                  'grid size-10 shrink-0 place-items-center rounded-full text-deck-caption font-bold md:size-12',
                  index === 0 ? 'bg-accent text-accent-contrast' : 'bg-surface-sunken text-content-secondary',
                )}
              >
                {index + 1}
              </span>
              <p className="text-deck-body font-bold text-content-strong">{item.state}</p>
            </div>
            <p className="text-deck-caption text-content-secondary">{item.q}</p>
            <p className="mt-auto rounded-card bg-surface-sunken p-3 text-deck-caption text-content-primary inset-shadow-sunken md:p-4">
              {REPO.name}: {item.demo}
            </p>
          </Panel>
        ))}
      </div>

      <SlideNote>
        첫 사용자는 항상 <span className="underline decoration-4 underline-offset-8">빈 화면</span>을 봐요 — 100명 목표라면 1번 상태가 제일 중요한 화면
      </SlideNote>
    </SlideLayout>
  )
}

/* ───────────────────────────── ③ 설계 ───────────────────────────── */

/** M8. 설계 1/3 · 스택 선택 기준 */
export function StackSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="③ 설계 · 1/3" tag="spec/ARCHITECTURE.md">
        무엇으로 만들지는 창업자의 기준 3개로 골라요
      </PhaseHead>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
        {STACK_CRITERIA.map((item, index) => (
          <Panel key={item.rule} tone="raised" pad="md" className={cx('flex flex-col gap-2', rise(index))}>
            <PanelLabel tone="accent">기준 {index + 1}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">{item.rule}</p>
            <p className="text-deck-caption text-content-secondary">{item.why}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-col gap-3">
        <PanelLabel>{REPO.name}이 고른 것</PanelLabel>
        <div className="grid gap-2 md:gap-3">
          {STACK.map((row) => (
            <div key={row.concern} className="grid items-baseline gap-1 md:gap-6 lg:grid-cols-9">
              <span className="text-deck-caption font-semibold text-content-muted">{row.concern}</span>
              <span className="text-deck-body font-bold text-content-strong lg:col-span-3">{row.choice}</span>
              <span className="text-deck-caption text-content-secondary lg:col-span-5">{row.why}</span>
            </div>
          ))}
        </div>
      </Panel>

      <SlideNote tone="quiet">
        AI에게 &ldquo;뭘로 만들까?&rdquo;가 아니라 <Mark>&ldquo;이 세 기준에 맞는 구성 제안해줘&rdquo;</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

/** M9. 설계 2/3 · 데이터 모델 */
export function DataModelSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="③ 설계 · 2/3" tag="supabase/migrations/">
        명사는 표, 관계는 선, "누가 볼 수 있나"는 규칙
      </PhaseHead>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
        {DATA_MODEL.tables.map((table, index) => (
          <Panel key={table.name} tone={index === 1 ? 'accentSoft' : 'raised'} pad="md" className={cx('flex flex-col gap-3 overflow-x-auto', rise(index))}>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-deck-body font-bold text-content-strong">{table.name}</span>
              <span className="text-deck-caption text-content-muted">{table.korean}</span>
            </div>
            <p className="font-mono text-deck-caption whitespace-pre text-content-secondary">{table.cols}</p>
            <p className="mt-auto flex items-start gap-2 rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-4">
              <ShieldCheck className="size-5 shrink-0 text-positive md:size-6" aria-hidden />
              {table.rule}
            </p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-4">
        <p className="text-deck-body text-content-secondary">
          기획서의 명사를 세어 보세요 — 사람 · 핀 · 팔로우. <span className="text-content-strong">표 3개</span>, 선 3개(→), 규칙 3줄. 이게 이 앱의 뼈대 전부예요.
        </p>
      </Panel>

      <SlideNote tone="quiet">
        <Mark>{DATA_MODEL.insight}</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

/** M10. 설계 3/3 · ⭐ 헌법 */
export function InvariantsSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="③ 설계 · 3/3" tag="spec/00.overview.md §3">
        바꾸기 전에 반드시 물어야 하는 규칙 — 13개 중 4개
      </PhaseHead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {INVARIANTS.map((item, index) => (
          <Panel key={item.id} tone={item.id === 'I9' ? 'accentSoft' : 'raised'} pad="md" className={cx('flex flex-col gap-3', rise(index))}>
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-sunken font-mono text-deck-caption font-bold text-content-secondary md:size-12">
                {item.id}
              </span>
              <p className="text-deck-body font-bold text-content-strong">{item.rule}</p>
            </div>
            <p className="text-deck-caption text-content-secondary">{item.founder}</p>
          </Panel>
        ))}
      </div>

      <SlideNote>
        헌법을 AI에게 같이 주면 <span className="underline decoration-4 underline-offset-8">엉뚱한 방향으로 열심히</span> 하지 않아요 — 규칙 5개면 충분
      </SlideNote>
    </SlideLayout>
  )
}

/* ───────────────────────────── ④ 구현 ───────────────────────────── */

/** M11. 구현 1/3 · spec → job → code */
export function BuildFlowSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="④ 구현 · 1/3" tag="spec/plan → spec/jobs → apps/web">
        문서가 먼저, 코드는 뒤 — 기능 하나 = 문서 하나 = 커밋 하나
      </PhaseHead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-9">
        <div className="flex flex-col gap-3 lg:col-span-4">
          {[
            { cmd: '/create-plan', out: 'spec/plan/NN — 무엇을(WHAT)', who: '나와 AI가 인터뷰로' },
            { cmd: '/create-plan-job NN', out: 'spec/jobs/MM — 할 일 목록 + 수용 기준', who: 'AI가' },
            { cmd: '/implement-job MM', out: '코드 · 테스트 · 문서 갱신', who: 'AI가, 나는 검토' },
          ].map((row, index) => (
            <Panel key={row.cmd} tone={index === 2 ? 'accentSoft' : 'raised'} pad="sm" className={cx('flex flex-col gap-1', rise(index))}>
              <p className="font-mono text-deck-body font-bold text-content-strong">{row.cmd}</p>
              <p className="text-deck-caption text-content-secondary">{row.out}</p>
              <p className="text-deck-caption text-content-muted">{row.who}</p>
            </Panel>
          ))}
        </div>

        <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-col gap-3 overflow-x-auto lg:col-span-5">
          <PanelLabel>git log · 커밋이 job 순서를 그대로 보여줘요</PanelLabel>
          <div className="flex flex-col gap-2">
            {COMMITS.map((commit) => (
              <p key={commit.hash} className="font-mono text-deck-caption whitespace-pre text-content-secondary">
                <span className="text-accent">{commit.hash}</span> {commit.msg}
              </p>
            ))}
          </div>
        </Panel>
      </div>

      <SlideNote tone="quiet">
        <Mark>내가 읽는 건 plan</Mark>, 코드는 AI가 읽어요 — 그래서 plan이 틀리면 코드는 정확하게 틀려요
      </SlideNote>
    </SlideLayout>
  )
}

/** M12. 구현 2/3 · ⭐ 좋은 코드란 */
export function GoodCodeSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="④ 구현 · 2/3" tag="코드를 못 읽어도 보이는 것">
        좋은 코드는 폴더 이름과 파일 크기에서 이미 보여요
      </PhaseHead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-9">
        <div className="grid gap-3 md:gap-4 lg:col-span-6 lg:grid-cols-2">
          {GOOD_CODE.good.map((item, index) => (
            <Panel key={item.sign} tone="raised" pad="sm" className={cx('flex flex-col gap-2', rise(index))}>
              <p className="flex items-start gap-2 text-deck-body font-bold text-content-strong">
                <Check className="mt-1 size-6 shrink-0 text-positive" aria-hidden />
                {item.sign}
              </p>
              <p className="text-deck-caption text-content-secondary">{item.how}</p>
            </Panel>
          ))}
        </div>

        <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-col gap-3 lg:col-span-3">
          <PanelLabel>나쁜 신호</PanelLabel>
          <ul className="flex flex-1 flex-col gap-2">
            {GOOD_CODE.bad.map((line) => (
              <li key={line} className="flex items-start gap-2 text-deck-caption text-content-primary">
                <X className="mt-1 size-5 shrink-0 text-critical" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel tone="accentSoft" pad="md" className="animate-rise-5 flex flex-col gap-2">
        <PanelLabel tone="accent">이 한 문장을 한 달에 한 번</PanelLabel>
        <p className="text-deck-body font-semibold text-content-strong">{GOOD_CODE.ask}</p>
      </Panel>
    </SlideLayout>
  )
}

/** M13. 구현 3/3 · 좋은 코드가 돈인 이유 */
export function CodeEconomicsSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="④ 구현 · 3/3" tag="기술부채">
        좋은 코드는 취향이 아니라 비용 문제예요
      </PhaseHead>

      <div className="grid gap-3 md:gap-4">
        {CODE_ECONOMICS.map((row, index) => (
          <Panel key={row.when} tone="raised" pad="sm" className={cx('grid items-center gap-2 md:gap-6 lg:grid-cols-9', rise(index))}>
            <PanelLabel>{row.when}</PanelLabel>
            <p className="flex items-start gap-2 text-deck-caption font-semibold text-content-strong lg:col-span-4">
              <Check className="mt-1 size-5 shrink-0 text-positive" aria-hidden />
              {row.good}
            </p>
            <p className="flex items-start gap-2 text-deck-caption text-content-secondary lg:col-span-4">
              <X className="mt-1 size-5 shrink-0 text-critical" aria-hidden />
              {row.bad}
            </p>
          </Panel>
        ))}
      </div>

      <CompareGrid>
        <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-col gap-2">
          <PanelLabel>기술부채란</PanelLabel>
          <p className="text-deck-body text-content-secondary">
            &ldquo;일단 되게&rdquo; 만든 코드에 붙는 <span className="text-content-strong">이자</span>예요. 빌린 건 괜찮아요 — MVP는 원래 빌려서 하는 것. 문제는 갚는 날이 없는 것.
          </p>
        </Panel>
        <Panel tone="sunken" pad="md" className="animate-rise-5 flex flex-col gap-2">
          <PanelLabel>창업자가 할 일</PanelLabel>
          <p className="text-deck-body text-content-secondary">
            빌린 곳을 <span className="text-content-strong">문서에 적어두기</span>(known gap) · 100명 넘기 전과 개발자 뽑기 전에 &lsquo;갚는 날&rsquo; 하나씩
          </p>
        </Panel>
      </CompareGrid>
    </SlideLayout>
  )
}

/* ───────────────────────────── ⑤ 검증 ───────────────────────────── */

/** M14. 검증 1/2 · 기계와 사람 */
export function VerifySlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="⑤ 검증 · 1/2" tag=".github/workflows/ci.yml">
        기계가 보는 것과 내가 보는 것은 달라요
      </PhaseHead>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Bot className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">기계 · 매 push마다 자동</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {CHECKS.machine.map((item) => (
              <li key={item.name} className="flex flex-col gap-1 rounded-card bg-surface-sunken p-3 inset-shadow-sunken md:p-4">
                <span className="font-mono text-deck-body font-bold text-content-strong">{item.name}</span>
                <span className="text-deck-caption text-content-secondary">잡는 것: {item.catches}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel tone="sunken" pad="lg" className="animate-rise-2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <User className="size-8 text-content-muted md:size-10" />
            <PanelLabel>사람 · 기계가 못 보는 것</PanelLabel>
          </div>
          <ul className="flex flex-1 flex-col gap-3">
            {CHECKS.human.map((item) => (
              <li key={item} className="text-deck-body text-content-primary">
                · {item}
              </li>
            ))}
          </ul>
          <p className="text-deck-caption text-content-muted">이건 아무도 대신 못 해요 — 창업자가 매일 하는 일</p>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        84개 테스트 중 하나가 빨개지면 <Mark>남의 핀이 보일 수 있다</Mark>는 뜻 — 기능 버그가 아니라 신뢰 사고예요
      </SlideNote>
    </SlideLayout>
  )
}

/** M15. 검증 2/2 · 수용 기준 쓰는 법 */
export function AcceptanceSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="⑤ 검증 · 2/2" tag="spec/jobs/*.md · Acceptance Criteria">
        "잘 된다"는 검증이 아니에요 — 관찰 가능한 문장으로
      </PhaseHead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="lg" className="animate-rise-1 flex flex-col gap-3 lg:col-span-3">
          <PanelLabel>이렇게 쓰면 확인할 수 없어요</PanelLabel>
          {ACCEPTANCE.bad.map((line) => (
            <p key={line} className="flex items-start gap-2 text-deck-body text-content-muted">
              <X className="mt-1 size-6 shrink-0 text-critical" aria-hidden />
              <span className="line-through decoration-content-muted">{line}</span>
            </p>
          ))}
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-3 lg:col-span-6">
          <PanelLabel tone="accent">{REPO.name} jobs/08에 실제로 있는 문장</PanelLabel>
          {ACCEPTANCE.good.map((line) => (
            <p key={line} className="flex items-start gap-2 text-deck-caption text-content-strong md:text-deck-body">
              <Check className="mt-1 size-6 shrink-0 text-positive" aria-hidden />
              {line}
            </p>
          ))}
        </Panel>
      </div>

      <SlideNote>
        <span className="underline decoration-4 underline-offset-8">{ACCEPTANCE.rule}</span>
      </SlideNote>
    </SlideLayout>
  )
}

/* ───────────────────────────── ⑥ 배포 ───────────────────────────── */

/** M16. 배포 1/2 · 코드가 사는 세 곳과 열쇠 */
export function DeploySlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="⑥ 배포 · 1/2" tag="내 컴퓨터 → GitHub → Netlify">
        올리는 건 push 한 번, 어려운 건 열쇠예요
      </PhaseHead>

      <SlideBody>
        앱은 켜질 때 <span className="text-content-strong">외부 서비스의 주소와 열쇠</span>가 없으면 부팅을 거부해요. {REPO.name}은 4개 — 이 값들이
        콘솔 작업의 전부이고, 로컬(.env.local)과 호스팅(환경변수)에 같은 값을 두 번 넣어요.
      </SlideBody>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
        {KEYS.map((key, index) => (
          <Panel key={key.name} tone="raised" pad="sm" className={cx('flex flex-col gap-2 overflow-x-auto', rise(index))}>
            <p className="font-mono text-deck-caption font-bold whitespace-pre text-content-strong">{key.name}</p>
            <div className="flex flex-wrap gap-2">
              <Chip tone="accent">{key.console}</Chip>
              <Chip>{key.screen}</Chip>
            </div>
            <p className="text-deck-caption text-critical">함정: {key.trap}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        여러분 앱도 열쇠가 <Mark>3~5개</Mark>일 거예요 — 이름 · 어느 콘솔 · 함정, 이 표를 먼저 만들게 시켜요
      </SlideNote>
    </SlideLayout>
  )
}

/** M17. 배포 2/2 · 올리기 전 확인 4개 */
export function DeployCheckSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="⑥ 배포 · 2/2" tag="주소가 생기면 세 콘솔이 따라 바뀐다">
        배포 주소가 생긴 순간 할 일 4개
      </PhaseHead>

      <ol className="grid gap-3 md:gap-4 lg:grid-cols-2">
        {DEPLOY_CHECK.map((item, index) => (
          <li key={item.what} className={cx('flex items-start gap-4 rounded-card bg-surface-raised p-4 shadow-raised md:p-5', rise(index))}>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-deck-caption font-bold text-accent-contrast md:size-12">
              {index + 1}
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-deck-body font-bold text-content-strong">{item.what}</p>
              <p className="text-deck-caption text-content-secondary">{item.where}</p>
            </div>
          </li>
        ))}
      </ol>

      <SlideNote>
        &ldquo;로컬에선 되는데 배포하면 안 돼요&rdquo;의 <span className="underline decoration-4 underline-offset-8">90%는 1번</span> — 주소를 안 알린 콘솔이 하나 있어요
      </SlideNote>
    </SlideLayout>
  )
}

/* ───────────────────────────── ⑦ 운영 ───────────────────────────── */

/** M18. 운영 1/2 · 리스크와 방어 */
export function OperateSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="⑦ 운영 · 1/2" tag=".github/workflows/">
        배포는 끝이 아니라 시작이에요
      </PhaseHead>

      <div className="grid gap-3 md:gap-4">
        {OPERATIONS.map((row, index) => (
          <Panel key={row.risk} tone={index === 3 ? 'accentSoft' : 'raised'} pad="sm" className={cx('grid items-center gap-2 md:gap-6 lg:grid-cols-9', rise(index))}>
            <p className="text-deck-body font-semibold text-content-primary lg:col-span-5">{row.risk}</p>
            <div className="flex items-center gap-3 lg:col-span-4">
              <ShieldCheck className={cx('size-6 shrink-0 md:size-7', index === 3 ? 'text-accent' : 'text-positive')} />
              <p className="text-deck-caption font-semibold text-content-strong">{row.guard}</p>
            </div>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        위 셋은 <Mark>한 번 설정하면 기계가</Mark> 해요. 마지막 줄만 사람 일이고, 그게 다음 화면
      </SlideNote>
    </SlideLayout>
  )
}

const MAINT_TONE = {
  critical: 'bg-critical-soft text-content-strong',
  caution: 'bg-caution-soft text-content-strong',
  info: 'bg-info-soft text-content-strong',
  quiet: 'bg-surface-raised text-content-secondary',
} as const

/** M19. 운영 2/2 · 유지보수 = 작은 기획 */
export function MaintenanceSlide() {
  return (
    <SlideLayout>
      <PhaseHead phase="⑦ 운영 · 2/2" tag="spec/changes/">
        "이거 안 돼요"가 들어오면 표 하나로 판단해요
      </PhaseHead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-9">
        <div className="flex flex-col gap-2 lg:col-span-6">
          <div className="flex items-center justify-between text-deck-caption font-semibold text-content-muted">
            <span>↑ {MAINTENANCE.axes.y}</span>
            <span>{MAINTENANCE.axes.x} →</span>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {[MAINTENANCE.cells[1], MAINTENANCE.cells[0], MAINTENANCE.cells[3], MAINTENANCE.cells[2]].map((cell, index) => (
              <div key={cell.label} className={cx('flex flex-col gap-2 rounded-card p-4 shadow-raised md:p-6', MAINT_TONE[cell.tone], rise(index))}>
                <p className="text-deck-caption font-semibold opacity-80">{cell.label}</p>
                <p className="text-deck-body font-bold">{cell.action}</p>
              </div>
            ))}
          </div>
        </div>

        <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-col gap-3 lg:col-span-3">
          <PanelLabel>유지보수 = 작은 기획</PanelLabel>
          <p className="text-deck-caption text-content-secondary">
            오른쪽 위 칸만 &lsquo;버그&rsquo;예요. 나머지는 <span className="text-content-strong">다음 바퀴의 기획 재료</span> — changes 문서로 적고 모아서 한 번에 돌려요.
          </p>
          <p className="mt-auto text-deck-caption text-content-muted">{MAINTENANCE.debt}</p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

const MEASURE = [
  { q: '진짜 쓰나', how: 'Supabase → Table Editor → places 행 수가 매주 느는가' },
  { q: '다시 오나', how: '같은 사람이 2주 뒤에도 핀을 찍는가' },
  { q: '퍼지나', how: '/u/닉네임 링크로 들어온 새 계정이 있는가' },
]

/** M20. ⭐ MVP는 작은 한 바퀴 — 100명과 그다음 */
export function MvpLoopSlide() {
  return (
    <SlideLayout>
      <SlideKicker>그래서 MVP란</SlideKicker>
      <SlideHeadline>
        7단계를 <Mark>가장 작게 한 바퀴</Mark> 돌고, 숫자를 보고, 다시 도는 것
      </SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {MEASURE.map((item, index) => (
          <Panel key={item.q} tone="raised" pad="lg" className={cx('flex flex-col gap-3', rise(index))}>
            <PanelLabel tone="accent">{item.q}</PanelLabel>
            <p className="text-deck-body font-semibold text-content-strong">{item.how}</p>
          </Panel>
        ))}
      </div>

      <CompareGrid>
        <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-col gap-2">
          <PanelLabel>100명 전</PanelLabel>
          <p className="text-deck-body text-content-secondary">
            기능 추가보다 <span className="text-content-strong">①기획 문단 고치기</span>가 더 자주 일어나요. 콘솔 연동은 한 번만 하면 돼요.
          </p>
        </Panel>
        <Panel tone="sunken" pad="md" className="animate-rise-5 flex flex-col gap-2">
          <PanelLabel>개발자를 찾을 때</PanelLabel>
          <p className="text-deck-body text-content-secondary">
            문서 폴더와 숫자를 보여주면 돼요 — <span className="text-content-strong">&ldquo;뭘 만들지&rdquo;가 이미 문서</span>라서 첫 주가 달라요
          </p>
        </Panel>
      </CompareGrid>
    </SlideLayout>
  )
}

/** M21. 휴식 5분 */
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
            내 아이디어의 &ldquo;문제 한 문장&rdquo;을 메모에 써두세요 — 2부는 &ldquo;AI에게 어떻게 시키나&rdquo;예요
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}
