import { Coffee, Database, FileDiff, GitPullRequest, Monitor, ScrollText, Server } from 'lucide-react'
import { useState } from 'react'
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
import {
  DIFF_STEPS,
  ERROR_READING_GUIDE,
  SHIPPING_DIFF,
  STACK_TRACE,
  type DiffLine,
} from '../model/code-samples'

const TERMS = [
  {
    en: 'Repository (repo)',
    ko: '프로젝트 폴더 하나',
    detail: '코드와 그 코드의 역사가 다 들어 있어요. 회사에서는 제품 하나에 레포가 여러 개일 수 있어요',
  },
  {
    en: 'Branch',
    ko: '원본을 건드리지 않고 따로 떠놓은 작업 사본',
    detail: '개발자는 자기 브랜치에서 고쳐요. 그래서 작업 중에도 서비스는 그대로 돌아가요',
  },
  {
    en: 'Commit',
    ko: '저장 지점 하나',
    detail: '“무엇을 왜 바꿨는지” 메모가 붙어요. 되돌릴 때 이 단위로 되돌려요',
  },
  {
    en: 'Pull request (PR)',
    ko: '“이 브랜치를 원본에 합쳐도 될까요?” 리뷰 요청',
    detail: 'PM이 실제로 보는 화면은 거의 이것 하나예요',
  },
]

/** R10. 용어 4개 — 영어 그대로 쓰는 이유까지 */
export function RepoTermsSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <GitPullRequest className="size-8 text-accent md:size-11" />
        <SlideHeadline>코드가 사는 집 · 용어 4개</SlideHeadline>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {TERMS.map((term, index) => (
          <Panel
            key={term.en}
            tone={index === 3 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-3',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <PanelLabel tone={index === 3 ? 'accent' : 'muted'}>{term.en}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">{term.ko}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{term.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>
        번역해서 외우지 마세요. GitHub와 Slack에서 <Mark>영어 단어 그대로</Mark> 쓰게 돼요.
      </SlideBody>
    </SlideLayout>
  )
}

/** R11. ⭐ diff 읽는 순서 4단계 */
export function DiffSlide() {
  const [step, setStep] = useState(0)
  const current = DIFF_STEPS[step]

  // 1단계는 파일 이름만 보는 단계라 코드 줄은 전부 죽여 둔다.
  const lineTone = (line: DiffLine) => {
    const lit =
      step === 3 || (step === 1 && line.kind !== 'context') || (step === 2 && Boolean(line.policy))
    if (!lit) return 'text-content-muted opacity-40'
    if (line.kind === 'add') return 'bg-positive-soft text-positive'
    if (line.kind === 'remove') return 'bg-critical-soft text-critical'
    return 'text-content-secondary'
  }

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-4 md:gap-5">
          <FileDiff className="size-8 text-accent md:size-11" />
          <SlideHeadline>diff는 이 순서로 읽어요</SlideHeadline>
        </div>
        <Chip tone="accent">
          {step + 1} / {DIFF_STEPS.length}단계
        </Chip>
      </div>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="md" className="flex flex-col gap-2 overflow-x-auto lg:col-span-5">
          <p
            className={cx(
              'w-fit min-w-full rounded-control px-3 py-2 font-mono text-deck-caption font-bold transition duration-300 ease-deck md:px-4',
              step === 0 ? 'bg-accent text-accent-contrast' : 'text-content-muted opacity-40',
            )}
          >
            src/checkout/shipping.js
          </p>
          {SHIPPING_DIFF.map((line, index) => (
            <p
              key={index}
              className={cx(
                // w-fit min-w-full: 줄이 화면보다 길어도 +/- 배경이 끝까지 이어진다
                'w-fit min-w-full rounded-control px-3 py-1 font-mono text-deck-caption whitespace-pre transition duration-300 ease-deck md:px-4',
                lineTone(line),
              )}
            >
              {line.code}
            </p>
          ))}
        </Panel>

        <div className="flex flex-col gap-3 lg:col-span-4">
          <div className="flex flex-wrap gap-2">
            {DIFF_STEPS.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setStep(index)}
                className={cx(
                  'rounded-full px-4 py-2 text-deck-caption font-semibold transition duration-200 ease-deck md:px-5 md:py-3',
                  step === index
                    ? 'bg-accent text-accent-contrast shadow-lifted'
                    : 'bg-surface-raised text-content-secondary shadow-raised hover:bg-surface-highlight hover:text-content-primary',
                )}
              >
                {index + 1}. {item.title}
              </button>
            ))}
          </div>

          <Panel tone="raised" pad="lg" className="flex flex-1 flex-col justify-center gap-4">
            <p className="animate-pop overflow-x-auto rounded-card bg-surface-sunken p-4 font-mono text-deck-caption text-content-strong inset-shadow-sunken md:p-6">
              {current.look}
            </p>
            <p className="text-deck-body text-content-secondary">{current.read}</p>
          </Panel>
        </div>
      </div>

      <p className="text-deck-meta text-content-muted">
        빨간 줄(−)은 지워진 줄, 초록 줄(+)은 새로 들어온 줄이에요. 나머지는 그대로 있는 줄이에요
      </p>
    </SlideLayout>
  )
}

const PR_TABS = [
  {
    tab: 'Conversation',
    what: '왜 이 변경을 하는지, 리뷰어가 무엇을 걱정하는지',
    pm: 'PM이 여기에 한 줄 남기면 결정이 기록으로 남아요',
  },
  {
    tab: 'Files changed',
    what: '방금 배운 diff. 바뀐 파일 목록과 줄',
    pm: '파일 수가 곧 위험의 크기예요. 10개가 넘으면 왜 그런지 물어봐요',
  },
  {
    tab: 'Checks',
    what: '자동 테스트와 빌드 결과',
    pm: '빨간불이면 아직 못 나가요. “언제 돼요?”보다 여기를 먼저 봐요',
  },
]

const PR_STATES = ['Draft', 'Open', 'Approved', 'Merged']

/** R12. PR 화면에서 PM이 보는 곳 */
export function PullRequestSlide() {
  return (
    <SlideLayout>
      <SlideKicker>GitHub PR 화면</SlideKicker>
      <SlideHeadline>탭 3개만 보면 돼요</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {PR_TABS.map((item, index) => (
          <Panel
            key={item.tab}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <PanelLabel tone={index === 1 ? 'accent' : 'muted'}>{item.tab}</PanelLabel>
            <p className="text-deck-body font-semibold text-content-strong">{item.what}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.pm}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="flex flex-wrap items-center gap-3 md:gap-5">
        <PanelLabel>PR 상태</PanelLabel>
        {PR_STATES.map((state, index) => (
          <span key={state} className="flex items-center gap-3">
            <span
              className={cx(
                'rounded-full px-4 py-2 font-mono text-deck-caption font-semibold md:px-5',
                index === PR_STATES.length - 1
                  ? 'bg-accent text-accent-contrast'
                  : 'bg-surface-highlight text-content-primary',
              )}
            >
              {state}
            </span>
            {index < PR_STATES.length - 1 ? (
              <span className="text-deck-caption text-content-muted" aria-hidden>
                →
              </span>
            ) : null}
          </span>
        ))}
      </Panel>

      <SlideNote tone="quiet">
        PM이 볼 순서는 <Mark>Conversation → Files changed → Checks</Mark>예요
      </SlideNote>
    </SlideLayout>
  )
}

const LAYERS = [
  {
    icon: Monitor,
    layer: '화면',
    en: 'Frontend',
    symptom: '안 보여요 · 깨져 보여요 · 버튼이 안 눌려요',
    ask: '새로고침하면 되나요? 어떤 브라우저예요?',
  },
  {
    icon: Server,
    layer: '서버',
    en: 'Backend',
    symptom: '눌렀는데 아무 일도 안 나요 · 에러 팝업이 떠요',
    ask: '다른 사람도 그래요? 몇 시부터예요?',
  },
  {
    icon: Database,
    layer: '데이터',
    en: 'Database',
    symptom: '숫자가 틀려요 · 저장이 안 돼요 · 예전 값이 남아 있어요',
    ask: '언제부터 그래요? 이 계정만 그래요?',
  },
]

/** R13. 버그가 어디서 났나 — 3층 감각 */
export function ThreeLayersSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>버그는 세 층 중 한 곳에서 나요</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {LAYERS.map((item, index) => (
          <Panel
            key={item.layer}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <item.icon className="size-8 text-accent md:size-10" />
            <div className="flex flex-col gap-1">
              <p className="text-deck-lead font-bold text-content-strong">{item.layer}</p>
              <p className="font-mono text-deck-caption text-content-muted">{item.en}</p>
            </div>
            <p className="text-deck-caption text-content-secondary">{item.symptom}</p>
            <p className="mt-auto rounded-card bg-surface-sunken p-4 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-5">
              {item.ask}
            </p>
          </Panel>
        ))}
      </div>

      <SlideBody>
        층만 맞게 짚어도 리포트가 <Mark>담당자에게 바로 갑니다</Mark>. 원인까지 맞힐 필요는 없어요.
      </SlideBody>
    </SlideLayout>
  )
}

/** R14. 에러 메시지에서 먼저 볼 세 가지 */
export function ErrorLogSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <ScrollText className="size-8 text-critical md:size-11" />
        <SlideHeadline>에러에서 먼저 볼 건 세 가지예요</SlideHeadline>
      </div>

      <Panel tone="sunken" pad="md" className="flex flex-col gap-1 overflow-x-auto">
        {STACK_TRACE.map((line, index) => (
          <p
            key={`${line.code}-${index}`}
            className={cx(
              'px-3 py-2 font-mono text-deck-caption whitespace-pre md:px-4',
              line.source === 'error' && 'font-bold text-critical',
              line.source === 'product' && 'font-semibold text-accent',
              line.source === 'framework' && 'text-content-muted opacity-60',
              line.source === 'context' && 'pt-4 font-bold text-content-secondary',
            )}
          >
            {line.code}
          </p>
        ))}
      </Panel>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {ERROR_READING_GUIDE.map((item, index) => (
          <Panel
            key={item.label}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-3',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <PanelLabel tone={index === 1 ? 'accent' : 'muted'}>{item.label}</PanelLabel>
            <p className="text-deck-caption text-content-secondary">{item.read}</p>
          </Panel>
        ))}
      </div>

      <SlideNote>
        react-dom 같은 줄은 건너뛰고 우리 파일을 찾으세요 · 공유할 때는 로그 전체를 붙여 주세요
      </SlideNote>
    </SlideLayout>
  )
}

/** R15. 휴식 */
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
            실제 레포를 열어서 함수 하나와 PR 하나를 끝까지 읽어요
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}
