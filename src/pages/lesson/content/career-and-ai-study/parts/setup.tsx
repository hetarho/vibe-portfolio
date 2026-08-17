import { CircleAlert, MessagesSquare, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import {
  CheckRow,
  Chip,
  cx,
  Mark,
  Panel,
  PanelLabel,
  QrSlot,
  SlideBody,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideNote,
} from '@/features/slide-deck'

const SETUP_STEPS = [
  { head: '빈 폴더에서 Claude Code 실행', body: '튜터 프롬프트 전체를 붙여넣습니다' },
  { head: '맨 끝 "학습 대상"을 내 것으로', body: '예) TypeScript + React, 목표: 실무 FE 코드 읽기' },
  { head: '첫 응답 인터뷰에 솔직하게', body: '"주 언어 없음", "목표 코드베이스 아직 없음"도 그대로 답하면 됩니다' },
  { head: 'S1 완료까지가 이번 주 과제', body: '여기까지 오면 첫 레슨이 열립니다' },
]

/** C16. 세팅 가이드 */
export function SetupGuideSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-col gap-4 pt-6">
        <SlideKicker>집에 가서 할 것</SlideKicker>
        <SlideHeadline>세팅은 네 단계입니다</SlideHeadline>
      </div>

      <ol className="grid gap-5 lg:grid-cols-2">
        {SETUP_STEPS.map((step, index) => (
          <Panel
            key={step.head}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex items-start gap-6',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary">
              {index + 1}
            </span>
            <span className="flex flex-col gap-2">
              <span className="text-deck-body font-bold text-content-strong">{step.head}</span>
              <span className="text-deck-caption text-content-secondary">{step.body}</span>
            </span>
          </Panel>
        ))}
      </ol>

      <Panel tone="sunken" pad="lg" className="flex flex-wrap items-center justify-between gap-8">
        <QrSlot label="세팅 가이드 유인물" caption="튜터 프롬프트 전문 + 붙여넣는 순서" />
        <p className="text-deck-caption text-content-muted">막히면 이 QR부터 다시 보세요</p>
      </Panel>
    </SlideLayout>
  )
}

/** C17. 반드시 할 경고 2가지 */
export function WarningSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <TriangleAlert size={44} className="text-caution" />
        <SlideHeadline>두 가지만 꼭 기억하세요</SlideHeadline>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <CircleAlert size={34} className="text-critical" />
            <PanelLabel>다른 AI 창에 시키지 않기</PanelLabel>
          </div>
          <p className="text-deck-body font-semibold text-content-strong">
            실습을 다른 창에 시켜서 풀면 이 시스템 전체가 무의미해집니다.
          </p>
          <p className="text-deck-caption text-content-secondary">
            어차피 이해도 체크에서 걸리고, 걸리면 다음 레슨이 안 열립니다.
          </p>
          <p className="mt-auto rounded-card bg-critical-soft px-7 py-5 text-deck-body font-bold text-content-strong">
            면접장에는 AI를 못 데려갑니다
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
            &ldquo;이거 안 배웠는데요&rdquo; 한마디면 됩니다.
          </p>
          <p className="mt-auto rounded-card bg-accent-soft px-7 py-5 text-deck-body font-bold text-content-strong">
            그 지적이 시스템을 더 단단하게 만듭니다
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

const TWO_LINES = [
  {
    head: '방향',
    body: '시장이 아니라 "뭘 고칠 때 시간 가는 줄 모르는가"로 정한다',
  },
  {
    head: 'AI 시대의 공부',
    body: 'AI에게 시키기가 아니라, AI에게 배우되 손은 내가 움직이기',
  },
]

/** C18. 마무리 — 오늘의 2줄 */
export function SummarySlide() {
  return (
    <SlideLayout>
      <SlideHeadline>오늘의 2줄</SlideHeadline>

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

/** C19. 과제 공지 & 질문 채널 */
export function AssignmentSlide() {
  return (
    <SlideLayout>
      <SlideKicker>이번 주 과제</SlideKicker>
      <SlideHeadline>
        S1 부트스트랩 완료 + <Mark>첫 레슨(L01)</Mark> 받아보기
      </SlideHeadline>

      <div className="grid items-center gap-6 lg:grid-cols-9">
        <Panel tone="raised" pad="lg" className="flex flex-col gap-5 lg:col-span-5">
          <div className="flex items-center gap-4">
            <MessagesSquare size={34} className="text-accent" />
            <PanelLabel tone="accent">막히면 여기로</PanelLabel>
          </div>
          <p className="text-deck-body text-content-secondary">
            에러 메시지를 그대로 붙여넣어 주세요. 혼자 30분 붙잡고 있지 마세요.
          </p>
          <div className="flex flex-wrap gap-3">
            <Chip>설치가 안 돼요</Chip>
            <Chip>인터뷰에 뭐라고 답하죠?</Chip>
            <Chip>레슨이 안 열려요</Chip>
          </div>
        </Panel>

        <Panel tone="sunken" pad="lg" className="lg:col-span-4">
          <QrSlot label="질문 채널" caption="오픈채팅 · 이번 주 내내 엽니다" />
        </Panel>
      </div>

      <SlideNote>다음 주에 만나면, 여러분의 L01 얘기부터 듣겠습니다</SlideNote>
    </SlideLayout>
  )
}

const PREP = [
  { head: '데모용 학습 레포 준비', hint: 'S2(L01 포함)까지 미리 — 현장 부트스트랩 금지' },
  { head: '성향 체크 배포 방식 결정', hint: '종이 / 화면 / 이 슬라이드의 웹 버전' },
  { head: '학생 배포용 튜터 프롬프트 최종본', hint: '§9 "xxxx" 자리를 채우는 법 예시 포함' },
  { head: '세팅 가이드 유인물 + QR', hint: 'C16 · C19의 QR 자리 교체' },
  { head: '사전 설치 공지 발송', hint: '일주일 전 · Claude Code, git, python3' },
]

/** C20. 강사용 — 발표 전 준비 체크리스트 (학생에게 보여주는 화면 아님) */
export function PrepChecklistSlide() {
  const [checks, setChecks] = useState(() => PREP.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-6 pt-6">
        <SlideHeadline>강사 준비 체크리스트</SlideHeadline>
        <Chip>강의 시작 전에 확인</Chip>
      </div>

      <div className="flex flex-col gap-4">
        {PREP.map((item, index) => (
          <CheckRow key={item.head} checked={checks[index]} onToggle={() => toggle(index)} hint={item.hint}>
            {item.head}
          </CheckRow>
        ))}
      </div>

      <SlideBody>사전 설치가 안 되어 있으면 2부 진행이 무너집니다. 이것부터 확인하세요.</SlideBody>
    </SlideLayout>
  )
}
