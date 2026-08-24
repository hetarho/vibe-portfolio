import { Ban, FileCode2, GitPullRequest, ListOrdered, MessageCircleQuestion, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { PromptCopyButton } from '../../shared'
import {
  CheckRow,
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
import coachPrompt from '../model/coach-prompt.md?raw'
import { DIFF_LINKS, PRACTICE_FILES } from '../model/links'
import { DeckLink } from '../ui/DeckLink'

/** R16. ⭐ 오늘 같이 읽을 실제 파일 — 링크를 눌러 그대로 연다 */
export function PracticeReposSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-4 md:gap-5">
          <FileCode2 className="size-8 text-accent md:size-11" />
          <SlideHeadline>이제 진짜 코드를 열어요</SlideHeadline>
        </div>
        <Chip tone="accent">짧은 것부터</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {PRACTICE_FILES.map((item, index) => (
          <Panel
            key={item.href}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <PanelLabel tone="accent">{item.repo}</PanelLabel>
              <Chip>{item.lines}</Chip>
            </div>
            <p className="overflow-x-auto rounded-card bg-surface-sunken p-4 font-mono text-deck-caption text-content-strong inset-shadow-sunken md:p-5">
              {item.file}
            </p>
            <p className="text-deck-body font-semibold text-content-strong">{item.decides}</p>
            <p className="text-deck-caption text-content-secondary">{item.practice}</p>
            <div className="mt-auto flex">
              <DeckLink href={item.href}>함수 열기</DeckLink>
            </div>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="lg" className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <GitPullRequest className="size-6 shrink-0 text-accent md:size-8" />
          <PanelLabel>diff는 여기서 골라요</PanelLabel>
        </div>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
          {DIFF_LINKS.map((link) => (
            <div key={link.href} className="flex flex-col gap-2">
              <div className="flex">
                <DeckLink href={link.href}>{link.name}</DeckLink>
              </div>
              <p className="text-deck-meta text-content-muted">{link.note}</p>
            </div>
          ))}
        </div>
      </Panel>

      <p className="text-deck-meta text-content-muted">
        Cal.com은 레포 이름이 <span className="font-mono">cal.diy</span>로 바뀌었어요 — 예전 주소로 들어가도 여기로
        넘어와요
      </p>
    </SlideLayout>
  )
}

const STEPS = [
  { head: 'README 첫 화면', hint: '이 프로젝트가 뭔지 한 문장으로 말해보기' },
  { head: '폴더 이름만 훑기', hint: 'src · components · api 같은 이름으로 지도 그리기' },
  { head: '진입점 찾기', hint: 'main · index · App — 여기서 화면이 시작돼요' },
  { head: '내가 아는 화면 하나 고르기', hint: '로그인, 목록, 결제처럼 사용자로 써본 화면' },
  { head: '그 화면이 부르는 함수 하나 열기', hint: '아까처럼 이름 · 조건 · 반복 · 호출만 보며 한 줄씩' },
]

/** R17. ⭐ 읽는 순서 5단계 + 실습 타이머 */
export function ReadingOrderSlide() {
  const [checks, setChecks] = useState(() => STEPS.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 1 · 15분</SlideKicker>
          <div className="flex items-center gap-4 md:gap-5">
            <ListOrdered className="size-8 text-accent md:size-11" />
            <SlideHeadline>읽는 순서 5단계</SlideHeadline>
          </div>
        </div>
        <CountdownTimer seconds={900} caption="남은 시간" size="md" />
      </div>

      <div className="flex flex-col gap-3">
        {STEPS.map((step, index) => (
          <CheckRow key={step.head} checked={checks[index]} onToggle={() => toggle(index)} hint={step.hint}>
            {index + 1}. {step.head}
          </CheckRow>
        ))}
      </div>

      <SlideBody>
        5단계까지 못 가도 괜찮아요. <Mark>3단계까지만 가도 지도는 생겨요.</Mark>
      </SlideBody>
    </SlideLayout>
  )
}

const AI_QUESTIONS = [
  {
    q: '이 파일이 하는 일을 한 문장으로, 비개발자에게 설명해줘',
    why: '요약을 먼저 받고 내 짐작과 맞는지 확인해요',
  },
  {
    q: '이 함수의 입력과 출력을 표로. 각 입력이 없으면 어떻게 되는지도',
    why: '“없을 때”가 대부분의 버그가 사는 자리예요',
  },
  {
    q: '이 조건문 때문에 제외되는 사용자 케이스를 나열해줘',
    why: '스펙에서 빠진 케이스를 찾는 질문이에요',
  },
  {
    q: '이 값을 바꾸면 어디가 영향받아? 파일 목록으로',
    why: '영향 범위를 파일 수로 바꿔주는 질문이에요',
  },
]

/** R18. AI에게 읽히는 법 */
export function AskAiSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <MessageCircleQuestion className="size-8 text-accent md:size-11" />
        <SlideHeadline>AI에게는 이 4개만 물어요</SlideHeadline>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {AI_QUESTIONS.map((item, index) => (
          <Panel
            key={item.q}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-3',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <p className="text-deck-body font-semibold text-content-strong">&ldquo;{item.q}&rdquo;</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.why}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="lg" className="flex items-center gap-5">
        <TriangleAlert className="size-8 shrink-0 text-caution md:size-10" />
        <p className="text-deck-body text-content-secondary">
          AI 요약은 <Mark>그럴듯하게 틀립니다.</Mark> 숫자와 조건은 항상 코드에서 직접 눈으로 확인해요.
        </p>
      </Panel>
    </SlideLayout>
  )
}

const COACH_DOES = [
  { head: '6주 커리큘럼을 들고 있어요', detail: '주차만 말하면 이번 주 과제와 남길 것을 꺼내 줘요' },
  { head: '내 3문장을 채점해요', detail: '파일·줄 번호가 없으면 미달. 놓친 조건을 되짚어줘요' },
  { head: '코드는 안 써줘요', detail: '대신 써 달라고 하면 거절하고 읽기 과제로 바꿔요' },
]

/** R19. ⭐ 코치 프롬프트 복사 */
export function CoachPromptSlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘 가져갈 것 ②</SlideKicker>
      <SlideHeadline>
        매주 혼자 돌릴 <Mark>코드 읽기 코치</Mark>
      </SlideHeadline>

      <div className="flex">
        <PromptCopyButton label="코드 읽기 코치 프롬프트 복사" text={coachPrompt} />
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {COACH_DOES.map((item, index) => (
          <Panel
            key={item.head}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-3',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-caption text-content-secondary">{item.detail}</p>
          </Panel>
        ))}
      </div>

      <p className="text-deck-meta text-content-muted">
        오늘 배운 5단계 · 3문장 틀 · 자습 1~6주차 커리큘럼이 프롬프트 안에 들어 있어요 · 용어는 영어, 설명은 한국어로 나와요
      </p>
    </SlideLayout>
  )
}

const THREE = [
  { no: '무엇이', ask: '어떤 파일의 어떤 값·조건이 바뀌었나', need: 'file:line 이 들어가야 통과' },
  { no: '왜', ask: '이 변경이 노리는 사용자 행동은 무엇인가', need: '코드에 근거가 있어야 통과' },
  { no: '위험은', ask: '누가 다르게 대우받고, 배포 전에 뭘 확인하나', need: '“누가”가 없으면 미달' },
]

/** R20. ⭐ 3문장으로 말하기 */
export function SummaryDrillSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 2 · 10분</SlideKicker>
          <SlideHeadline>읽은 PR을 세 문장으로</SlideHeadline>
        </div>
        <CountdownTimer seconds={600} caption="남은 시간" size="md" />
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {THREE.map((item, index) => (
          <Panel
            key={item.no}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-3',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <PanelLabel tone="accent">{item.no}</PanelLabel>
            <p className="text-deck-body font-semibold text-content-strong">{item.ask}</p>
            <div className="mt-auto flex">
              <Chip>{item.need}</Chip>
            </div>
          </Panel>
        ))}
      </div>

      <Panel tone="accentSoft" pad="lg" className="flex flex-col gap-3">
        <PanelLabel tone="accent">아까 diff로 쓰면 이렇게</PanelLabel>
        <p className="text-deck-body font-semibold text-content-strong">
          shipping.js 2번 줄에서 회원 무료배송 기준이 50,000원에서 30,000원으로 내려갔고, 대형 상품 추가비가 비회원에게만
          붙게 바뀌었어요. 회원 장바구니 금액을 올리려는 변경으로 보여요. 대형 상품을 사는 회원은 8,000원을 더 안 내게
          되는데, 이게 의도된 것인지 확인해야 해요.
        </p>
      </Panel>

      <SlideNote>세 문장을 소리 내서 말해 보세요 — 말이 안 나오면 아직 안 읽은 거예요</SlideNote>
    </SlideLayout>
  )
}

const DONT = [
  { head: '직접 머지하거나 커밋하지 않아요', why: '읽기 권한만으로 충분해요. 책임 경계가 흐려지면 리뷰가 무너져요' },
  { head: '코드 스타일을 지적하지 않아요', why: '변수명·들여쓰기는 리뷰어의 일이에요. PM이 볼 건 조건과 영향 범위예요' },
  { head: '코드만 보고 일정을 혼자 정하지 않아요', why: '읽은 건 근거고, 추정은 개발자와 같이 하는 거예요' },
]

/** R21. PM이 하지 않는 것 */
export function BoundariesSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <Ban className="size-8 text-critical md:size-11" />
        <SlideHeadline>읽을 수 있게 되면 조심할 것</SlideHeadline>
      </div>

      <div className="flex flex-col gap-4">
        {DONT.map((item, index) => (
          <Panel
            key={item.head}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-8',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-caption text-content-secondary md:max-w-column">{item.why}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        읽기의 목적은 <Mark>더 나은 질문</Mark>이에요. 판단을 빼앗아 오는 게 아니에요
      </SlideNote>
    </SlideLayout>
  )
}
