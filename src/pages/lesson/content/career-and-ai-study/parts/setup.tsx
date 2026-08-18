import { CircleAlert, MessageSquareText, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import {
  CheckRow,
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
} from '@/features/slide-deck'
import { PromptCopyButton } from '../widgets/PromptCopyButton'

const STAGES = [
  { tag: 'S1', head: '문서와 도구', body: '커리큘럼 · 어휘 원장 · 채점 기준 · 검사기' },
  { tag: 'S2', head: '레슨 뷰어', body: 'pnpm dev로 빈 화면까지 뜨는지' },
  { tag: 'S3', head: '첫 레슨 L01', body: '뷰어에 레슨이 렌더되면 끝' },
]

const DONE_CHECKS = [
  { head: 'pnpm dev가 뜨나요', hint: '브라우저에 뷰어 화면이 나와야 해요' },
  { head: 'study-status.py가 다음 할 일을 말하나요', hint: '"L01 집필부터"가 나오면 정상' },
  { head: '뷰어에 L01이 보이나요', hint: '여기까지 오면 혼자 굴러가요' },
]

/** 2부 · 세팅이 끝나갈 때 확인할 것 */
export function SetupGuideSlide() {
  const [checks, setChecks] = useState(() => DONE_CHECKS.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-6 pt-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>세팅은 세 번 끊겨요</SlideKicker>
          <SlideHeadline>중간에 멈추면 정상이에요</SlideHeadline>
        </div>
        <PromptCopyButton size="md" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {STAGES.map((stage, index) => (
          <Panel
            key={stage.tag}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-3',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <PanelLabel tone={index === 2 ? 'accent' : 'muted'}>{stage.tag}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">{stage.head}</p>
            <p className="text-deck-caption text-content-secondary">{stage.body}</p>
          </Panel>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {DONE_CHECKS.map((item, index) => (
          <CheckRow key={item.head} checked={checks[index]} onToggle={() => toggle(index)} hint={item.hint}>
            {item.head}
          </CheckRow>
        ))}
      </div>

      <SlideNote tone="quiet">단계 끝마다 멈추고 물어봐요. &ldquo;계속해주세요&rdquo; 하면 다음으로 가요</SlideNote>
    </SlideLayout>
  )
}

/** C23. 반드시 짚고 갈 경고 2가지 */
export function WarningSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <TriangleAlert size={44} className="text-caution" />
        <SlideHeadline>두 가지만 꼭 지켜주세요</SlideHeadline>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <CircleAlert size={34} className="text-critical" />
            <PanelLabel>다른 AI 창에 시키지 않기</PanelLabel>
          </div>
          <p className="text-deck-body font-semibold text-content-strong">
            실습을 다른 창에 시켜서 풀면 이 구조가 통째로 무의미해져요.
          </p>
          <p className="text-deck-caption text-content-secondary">
            어차피 이해도 체크에서 걸리고, 걸리면 다음 레슨이 안 열려요.
          </p>
          <p className="mt-auto rounded-card bg-critical-soft px-7 py-5 text-deck-body font-bold text-content-strong">
            면접장에는 AI를 못 데려가요
          </p>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <CircleAlert size={34} className="text-caution" />
            <PanelLabel>이상하면 바로 말하기</PanelLabel>
          </div>
          <p className="text-deck-body font-semibold text-content-strong">
            튜터가 안 배운 문법을 들고 나오면 참지 마세요.
          </p>
          <p className="text-deck-caption text-content-secondary">
            &ldquo;이거 안 배웠는데요&rdquo; 한마디면 돼요.
          </p>
          <p className="mt-auto rounded-card bg-accent-soft px-7 py-5 text-deck-body font-bold text-content-strong">
            그 지적이 시스템을 단단하게 해요
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

const TWO_LINES = [
  {
    head: '진로',
    body: 'FE나 BE로 시작해, 기획과 UX를 보며 제품을 끝까지 구현하는 프로덕트 엔지니어가 돼요',
  },
  {
    head: '공부',
    body: '학습 프로젝트로 개발 기본기를 쌓고, 그 위에서 구현 범위를 넓혀요',
  },
]

/** C24. 마무리 — 오늘의 2줄 */
export function SummarySlide() {
  return (
    <SlideLayout>
      <SlideHeadline>오늘 남길 2줄</SlideHeadline>

      <div className="grid gap-6 lg:grid-cols-2">
        {TWO_LINES.map((line, index) => (
          <Panel
            key={line.head}
            tone={index === 1 ? 'accent' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-5', index === 0 ? 'animate-rise-1' : 'animate-rise-2')}
          >
            <span
              className={cx(
                'grid size-14 place-items-center rounded-full text-deck-caption font-bold',
                index === 1 ? 'bg-accent-contrast/15 text-accent-contrast' : 'bg-surface-sunken text-content-secondary',
              )}
            >
              {index + 1}
            </span>
            <p className={cx('text-deck-caption font-semibold', index === 1 ? 'opacity-70' : 'text-content-muted')}>
              {line.head}
            </p>
            <p className={cx('text-deck-lead font-bold', index === 1 ? '' : 'text-content-strong')}>{line.body}</p>
          </Panel>
        ))}
      </div>
    </SlideLayout>
  )
}

/** C25. 다음 수업까지 할 것 */
export function AssignmentSlide() {
  return (
    <SlideLayout>
      <SlideKicker>다음 수업까지</SlideKicker>
      <SlideHeadline>
        세팅 끝내고 <Mark>첫 레슨(L01)</Mark>까지 열어보기
      </SlideHeadline>

      <div className="grid items-stretch gap-6 lg:grid-cols-9">
        <Panel tone="raised" pad="lg" className="flex flex-col gap-5 lg:col-span-5">
          <div className="flex items-center gap-4">
            <MessageSquareText size={34} className="text-accent" />
            <PanelLabel tone="accent">막히면 바로 연락</PanelLabel>
          </div>
          <p className="text-deck-body text-content-secondary">
            에러는 스크린샷 말고 텍스트로 붙여넣어 주세요. 30분 넘게 혼자 붙잡고 있지 말고요.
          </p>
          <div className="flex flex-wrap gap-3">
            <Chip>설치가 안 돼요</Chip>
            <Chip>인터뷰에 뭐라고 답하죠</Chip>
            <Chip>뷰어가 안 떠요</Chip>
          </div>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="flex flex-col justify-center gap-4 lg:col-span-4">
          <PanelLabel tone="accent">다음 시간 첫 순서</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">L01 얘기부터 듣기</p>
          <p className="text-deck-caption text-content-secondary">뭐가 막혔는지, 채점이 어땠는지</p>
        </Panel>
      </div>

      <SlideNote>여기까지 오면 다음 주부터는 혼자서도 굴러가요</SlideNote>
    </SlideLayout>
  )
}

const PREP = [
  { head: '데모용 학습 레포 준비', hint: 'L01까지 · 뷰어 떠 있는 상태로. 현장 부트스트랩 금지' },
  { head: '학생 목표 스택 확인', hint: '데모 레포를 가능하면 그 스택으로 맞추기' },
  { head: '학생이 쓰는 AI 도구 확인', hint: '세션 재개 파일 위치가 도구마다 달라요' },
  { head: '배포용 튜터 프롬프트 최종본', hint: '학습 대상 칸 채우는 법 예시까지' },
  { head: '사전 설치 공지', hint: '일주일 전 · LLM 계정, 코딩 CLI, git, python3, node, pnpm' },
]

/** C26. 강사용 — 수업 전 준비 (학생에게 보여주는 화면 아님) */
export function PrepChecklistSlide() {
  const [checks, setChecks] = useState(() => PREP.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-6 pt-6">
        <SlideHeadline>수업 전 준비</SlideHeadline>
        <Chip>강사용</Chip>
      </div>

      <div className="flex flex-col gap-4">
        {PREP.map((item, index) => (
          <CheckRow key={item.head} checked={checks[index]} onToggle={() => toggle(index)} hint={item.hint}>
            {item.head}
          </CheckRow>
        ))}
      </div>

      <SlideBody>사전 설치가 안 되어 있으면 2부가 통째로 무너져요. 이것부터 확인하세요.</SlideBody>
    </SlideLayout>
  )
}
