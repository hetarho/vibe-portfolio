import { CircleAlert, FolderGit2, GraduationCap, MonitorPlay, Terminal } from 'lucide-react'
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
} from '@/features/slide-deck'
import { PromptCopyButton } from '../../shared'

/** V29. 오늘 방식의 한계 — 왜 공부가 필요해지나 */
export function WhyStudyAloneSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col gap-4 md:gap-6">
        <SlideKicker>오늘 이후</SlideKicker>
        <SlideHeadline>꽤 멀리 갈 수 있어요. 그런데 두 번 막힙니다</SlideHeadline>
      </div>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-4 md:gap-6">
          <PanelLabel>막히는 순간 ①</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">
            고치라고 세 번 말했는데 <Mark>계속 딴 걸 고칠 때</Mark>
          </p>
          <p className="text-deck-body text-content-secondary">
            어디가 잘못됐는지 내가 짚어줄 수 있으면 한 번에 끝나요.
          </p>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 md:gap-6">
          <PanelLabel>막히는 순간 ②</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">
            만들고 싶은 게 커져서 <Mark>뭘 시켜야 할지 모를 때</Mark>
          </p>
          <p className="text-deck-body text-content-secondary">
            저장은 어디에 하지? 로그인은 어떻게 하지? — 여기서부터는 알아야 시킬 수 있어요.
          </p>
        </Panel>
      </CompareGrid>

      <SlideBody>
        전부 다 배울 필요는 없어요. <Mark>딱 시킬 수 있을 만큼</Mark>이면 충분합니다.
      </SlideBody>
    </SlideLayout>
  )
}

const TARGET_EXAMPLES = ['HTML·CSS·자바스크립트 기초', '파이썬 기초', '엑셀 자동화용 파이썬']

const PROMPT_STEPS = [
  { head: '새 폴더에서 에이전트를 켜요', body: '오늘 만든 앱 폴더가 아니라 빈 폴더에서' },
  { head: '복사한 프롬프트를 붙여넣어요', body: '길어도 그대로 한 번에' },
  { head: '맨 끝 “학습 대상”에 배울 것을 적어요', body: '비워두면 뭘 배우고 싶은지 물어봐요' },
]

/** V30. ⭐ 혼자 공부하는 법 — 공용 튜터 프롬프트 */
export function StudyPromptSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-5">
          <SlideKicker>혼자 공부하는 법</SlideKicker>
          <SlideHeadline>
            선생님 대신 <Mark>프롬프트 하나</Mark>를 드릴게요
          </SlideHeadline>
          <SlideBody>붙여넣으면 나에게 맞는 학습 폴더를 만들어 주고, 매번 레슨을 하나씩 내줍니다.</SlideBody>
          <PromptCopyButton label="공부용 프롬프트 복사" />
        </div>

        <Panel tone="sunken" pad="lg" className="flex flex-col gap-5 lg:col-span-4">
          <div className="flex items-center gap-4">
            <Terminal className="size-6 text-accent md:size-8" />
            <PanelLabel tone="accent">쓰는 순서</PanelLabel>
          </div>
          {PROMPT_STEPS.map((step, index) => (
            <div
              key={step.head}
              className={cx(
                'flex items-start gap-4 md:gap-5',
                index === 0 && 'animate-rise-1',
                index === 1 && 'animate-rise-2',
                index === 2 && 'animate-rise-3',
              )}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-raised text-deck-caption font-bold text-content-primary md:size-12">
                {index + 1}
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-deck-caption font-bold text-content-strong">{step.head}</span>
                <span className="text-deck-caption text-content-secondary">{step.body}</span>
              </span>
            </div>
          ))}
        </Panel>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <PanelLabel>학습 대상 예시</PanelLabel>
        {TARGET_EXAMPLES.map((example) => (
          <Chip key={example}>{example}</Chip>
        ))}
      </div>
    </SlideLayout>
  )
}

const LOOP = [
  {
    icon: FolderGit2,
    head: '내 학습 폴더가 생겨요',
    body: '레슨이 파일로 쌓입니다. 채팅처럼 사라지지 않아요.',
  },
  {
    icon: MonitorPlay,
    head: '레슨은 브라우저에서 읽어요',
    body: '오늘 배운 그 localhost 주소로 읽습니다.',
  },
  {
    icon: GraduationCap,
    head: '직접 쳐보고 채점받아요',
    body: '답을 바로 안 주고, 이해했는지 되물어봅니다.',
  },
]

/** V31. 프롬프트가 만드는 것 + 지킬 것 2가지 */
export function StudyLoopSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>붙여넣으면 이런 게 만들어져요</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {LOOP.map((item, index) => (
          <Panel
            key={item.head}
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
            <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.body}</p>
          </Panel>
        ))}
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <Panel tone="accentSoft" pad="md" className="animate-rise-4 flex items-start gap-4">
          <CircleAlert className="size-6 shrink-0 text-accent md:size-8" />
          <p className="text-deck-body font-semibold text-content-strong">
            실습 답을 다른 AI 창에 물어보지 않기 — 그러면 남는 게 없어요
          </p>
        </Panel>
        <Panel tone="raised" pad="md" className="animate-rise-5 flex items-start gap-4">
          <CircleAlert className="size-6 shrink-0 text-caution md:size-8" />
          <p className="text-deck-body font-semibold text-content-strong">
            모르는 게 갑자기 나오면 &ldquo;이거 안 배웠는데요&rdquo; 한마디
          </p>
        </Panel>
      </div>

      <SlideNote>일주일에 두 번, 30분이면 충분해요. 오래 앉아 있는 게 목표가 아닙니다</SlideNote>
    </SlideLayout>
  )
}
