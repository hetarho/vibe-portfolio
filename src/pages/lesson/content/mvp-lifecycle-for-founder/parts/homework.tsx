import { ArrowRight, Check, MessageSquareText } from 'lucide-react'
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
import { PromptCopyButton } from '../../shared'
import { HOMEWORK, REPO } from '../model/mvp-samples'
import setupCoachPrompt from '../model/setup-coach-prompt.md?raw'

/** M28. ⭐ 실습 지도 — 8단계 한 화면 */
export function HomeworkMapSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 3 · 다음 시간까지 혼자 · 내 아이디어로 0부터</SlideKicker>
      <SlideHeadline>8단계 — 순서가 곧 의존 관계예요</SlideHeadline>

      <ol className="grid gap-3 md:gap-4 lg:grid-cols-4">
        {HOMEWORK.map((item, index) => (
          <li
            key={item.n}
            className={cx(
              'flex items-center gap-3 rounded-card p-4 md:p-5',
              item.n === 6 ? 'bg-accent text-accent-contrast shadow-lifted' : 'bg-surface-raised shadow-raised',
              index < 4 && 'animate-rise-1',
              index >= 4 && 'animate-rise-3',
            )}
          >
            <span
              className={cx(
                'grid size-9 shrink-0 place-items-center rounded-full text-deck-caption font-bold md:size-12',
                item.n === 6 ? 'bg-accent-contrast/15 text-accent-contrast' : 'bg-surface-sunken text-content-secondary',
              )}
            >
              {item.n}
            </span>
            <span className={cx('text-deck-caption font-bold md:text-deck-body', item.n === 6 ? 'text-accent-contrast' : 'text-content-strong')}>
              {item.title}
            </span>
          </li>
        ))}
      </ol>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-col gap-2">
          <PanelLabel>1~5 · 내 컴퓨터에서 다 되게</PanelLabel>
          <p className="text-deck-body text-content-secondary">
            문단 → 문서 → 가짜 데이터 화면 → 로그인·DB → 외부 API. <span className="text-content-strong">1~2번은 코드 0줄</span>이에요 — 여기서 하루를 써도 남는 장사.
          </p>
        </Panel>
        <Panel tone="sunken" pad="md" className="animate-rise-5 flex flex-col gap-2">
          <PanelLabel>6~8 · 남의 폰에서 되게, 그리고 기록</PanelLabel>
          <p className="text-deck-body text-content-secondary">
            6번이 진짜 도착점 — <span className="text-content-strong">친구 폰에서 로그인까지</span>. 7번은 카드 지키기, 8번은 5명의 반응 = 다음 기획 재료.
          </p>
        </Panel>
      </div>

      <SlideNote tone="quiet">
        각 단계에 <Mark>성공 기준</Mark>이 있어요 — 기준이 안 나오면 다음으로 넘어가지 말고 물어요
      </SlideNote>
    </SlideLayout>
  )
}

type Step = (typeof HOMEWORK)[number]

function StepCard({ step, rise }: { step: Step; rise: string }) {
  return (
    <Panel tone="raised" pad="lg" className={cx('flex flex-col gap-4', rise)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-deck-caption font-bold text-accent-contrast md:size-12">
            {step.n}
          </span>
          <p className="text-deck-lead font-bold text-content-strong">{step.title}</p>
        </div>
        <Chip>{step.doc}</Chip>
      </div>

      <p className="text-deck-body text-content-primary">{step.do}</p>

      <p className="flex items-start gap-2 rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-positive inset-shadow-sunken md:p-4">
        <Check className="size-5 shrink-0 md:size-6" aria-hidden />
        <span>성공 기준: {step.success}</span>
      </p>

      <p className="mt-auto flex items-start gap-2 text-deck-caption text-content-secondary">
        <MessageSquareText className="size-5 shrink-0 text-accent md:size-6" aria-hidden />
        <span>막히면 → {step.ask}</span>
      </p>
    </Panel>
  )
}

/** M29~M32 · 두 단계씩 자세히 — 같은 화면 틀을 데이터만 바꿔 네 번 쓴다 */
function makeStepPairSlide(first: number, headline: string) {
  const pair = HOMEWORK.slice(first, first + 2)
  return function StepPairSlide() {
    return (
      <SlideLayout>
        <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
          <SlideHeadline>{headline}</SlideHeadline>
          <Chip tone="accent">
            {pair[0].n}~{pair[1].n} / 8
          </Chip>
        </div>

        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          <StepCard step={pair[0]} rise="animate-rise-1" />
          <StepCard step={pair[1]} rise="animate-rise-2" />
        </div>

        <div className="hidden items-center justify-center gap-3 text-deck-caption text-content-muted lg:flex">
          {pair[0].n} 성공 기준 <ArrowRight className="size-5" aria-hidden /> {pair[1].n} 시작
        </div>
      </SlideLayout>
    )
  }
}

export const StepsOneTwoSlide = makeStepPairSlide(0, '켜보고, 지도부터 띄워요')
export const StepsThreeFourSlide = makeStepPairSlide(2, '표를 만들고, 로그인을 붙여요')
export const StepsFiveSixSlide = makeStepPairSlide(4, '한 바퀴 돌려보고, 세상에 올려요')
export const StepsSevenEightSlide = makeStepPairSlide(6, '카드를 지키고, 막힌 곳을 남겨요')

/** M33. ⭐ MVP 코치 프롬프트 */
export function CoachPromptSlide() {
  return (
    <SlideLayout>
      <SlideKicker>복사해 가는 것</SlideKicker>
      <SlideHeadline>
        빈 폴더에서 Claude Code를 켜고 <Mark>이걸 먼저</Mark> 붙여요
      </SlideHeadline>

      <SlideBody>
        1단계 인터뷰부터 8단계까지 순서를 지키게 하고, 기능마다 문서 → 수용 기준 → 코드 → 검증 순으로 일하고, 콘솔은 한 클릭씩,
        비밀키가 보이면 멈추고, 막힌 곳을 BLOCKERS.md에 적어요. {REPO.name}을 만든 강사의 방식이 그대로 들어 있어요.
      </SlideBody>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-3 lg:col-span-5">
          <PanelLabel tone="accent">첫 문장 예시</PanelLabel>
          <p className="text-deck-body text-content-strong">&ldquo;1단계 시작. 내 아이디어는 이거야: [한 문단]. 질문해줘.&rdquo;</p>
          <p className="text-deck-body text-content-strong">&ldquo;4단계 · Supabase 이 화면인데 [캡처] 다음에 뭘 눌러?&rdquo;</p>
          <p className="text-deck-body text-content-strong">&ldquo;오늘 여기까지. 정리해줘.&rdquo;</p>
        </Panel>
        <div className="flex flex-col justify-center gap-3 lg:col-span-4">
          <PromptCopyButton label="셋업 코치 프롬프트 복사" text={setupCoachPrompt} />
          <p className="text-center text-deck-caption text-content-muted">한 번 붙이면 그 세션 내내 코치가 돼요</p>
        </div>
      </div>

      <SlideNote tone="quiet">
        코치도 클릭은 못 해요 — <Mark>손은 여전히 내 것</Mark>이고, 그래서 다음 시간에 내가 설명할 수 있어요
      </SlideNote>
    </SlideLayout>
  )
}
