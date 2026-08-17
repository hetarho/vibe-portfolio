import { FolderGit2, GraduationCap, MessageCircleQuestion, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import {
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

const DESIGN_POINTS = [
  {
    icon: ShieldCheck,
    head: '안 배운 것으로 가르치지 않는다',
    body: '레슨에 나오는 모든 토큰이 이전에 설명된 것인지 기계가 검사합니다. 갑자기 어려워지는 순간이 없어요.',
  },
  {
    icon: FolderGit2,
    head: '채팅이 아니라 레포',
    body: '레슨이 파일로 쌓입니다. 사라지지 않고, git 히스토리가 내 성장 기록이 됩니다.',
  },
  {
    icon: GraduationCap,
    head: '개념 하나당 실습 하나 + 판정',
    body: '"이해했겠지"가 아니라 명령어 실행 결과로 판정합니다.',
  },
  {
    icon: MessageCircleQuestion,
    head: 'AI가 답을 안 준다',
    body: '채점이 질문으로 옵니다. 이해도 체크를 통과 못 하면 다음 레슨을 안 줍니다.',
  },
]

/** C14. 튜터 프롬프트 소개 */
export function TutorPromptSlide() {
  return (
    <SlideLayout>
      <SlideKicker>튜터 프롬프트</SlideKicker>
      <SlideHeadline>어떻게 설계되어 있나</SlideHeadline>

      <div className="grid gap-5 lg:grid-cols-2">
        {DESIGN_POINTS.map((point, index) => (
          <Panel
            key={point.head}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <point.icon size={36} className="text-accent" />
            <p className="text-deck-body font-bold text-content-strong">{point.head}</p>
            <p className="text-deck-caption text-content-secondary">{point.body}</p>
          </Panel>
        ))}
      </div>

      <SlideNote>AI를 코드 생성기가 아니라, 전담 과외 선생으로 계약하는 문서</SlideNote>
    </SlideLayout>
  )
}

/**
 * 데모 단계별로 "무엇을 보여줄지" 정리한 것.
 * 터미널 출력은 실제 레포 출력을 흉내 낸 예시이므로, 데모용 레포에 맞춰 손봐도 된다.
 */
const DEMO_STEPS = [
  {
    label: '진행 상황 한 화면',
    command: 'python3 tools/study-status.py',
    lines: [
      { text: '진행   L01–L07 완료 · 7 / 10', tone: 'plain' as const },
      { text: '다음   L08 · 에러 처리', tone: 'plain' as const },
      { text: '미제출 drill-06', tone: 'caution' as const },
    ],
  },
  {
    label: '레슨 파일 훑기',
    command: 'open lessons/L01/LESSON.md',
    lines: [
      { text: '## drill 3 — 직접 쳐볼 것', tone: 'plain' as const },
      { text: '## 과제 카드', tone: 'plain' as const },
      { text: '## 이해도 체크 (3문항)', tone: 'plain' as const },
    ],
  },
  {
    label: '⭐ 안전장치 시연',
    command: 'python3 tools/check-order.py lessons/L08',
    lines: [
      { text: '✗ L08:42  배운 적 없는 개념이 등장', tone: 'critical' as const },
      { text: '  → 선행 레슨이 필요합니다', tone: 'critical' as const },
      { text: 'FAILED (1 violation)', tone: 'critical' as const },
    ],
  },
  {
    label: '채점 장면',
    command: 'submit drill-06',
    lines: [
      { text: '점수 82 / 100', tone: 'positive' as const },
      { text: 'Q. 이 줄에서 err이 nil이 아니면 어떻게 되죠?', tone: 'plain' as const },
      { text: 'Q. 왜 여기서 early return을 골랐나요?', tone: 'plain' as const },
    ],
  },
]

const LINE_TONE = {
  plain: 'text-content-primary',
  caution: 'text-caution',
  critical: 'text-critical',
  positive: 'text-positive',
}

/** C15. 라이브 데모 — 미리 만들어둔 레포로 시연 */
export function LiveDemoSlide() {
  const [step, setStep] = useState(0)
  const current = DEMO_STEPS[step]

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>라이브 데모 · 15분</SlideKicker>
          <SlideHeadline>미리 만들어둔 레포로 보여드립니다</SlideHeadline>
        </div>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-9">
        <ol className="flex flex-col gap-3 lg:col-span-4">
          {DEMO_STEPS.map((item, index) => {
            const active = index === step
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => setStep(index)}
                  className={cx(
                    'flex w-full items-center gap-5 rounded-card p-6 text-left transition duration-300 ease-deck',
                    active
                      ? 'bg-accent text-accent-contrast shadow-lifted'
                      : 'bg-surface-raised text-content-secondary shadow-raised hover:bg-surface-overlay',
                  )}
                >
                  <span
                    className={cx(
                      'grid size-12 shrink-0 place-items-center rounded-full text-deck-caption font-bold',
                      active ? 'bg-accent-contrast/15 text-accent-contrast' : 'bg-surface-sunken text-content-primary',
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="text-deck-body font-semibold">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ol>

        <Panel tone="sunken" pad="lg" className="flex flex-col gap-5 lg:col-span-5">
          <PanelLabel>이 화면에서 보여줄 것</PanelLabel>
          <p className="font-mono text-deck-caption text-accent">$ {current.command}</p>
          <div className="flex flex-col gap-3 rounded-card bg-surface-base p-7">
            {current.lines.map((line) => (
              <p key={line.text} className={cx('font-mono text-deck-caption', LINE_TONE[line.tone])}>
                {line.text}
              </p>
            ))}
          </div>
        </Panel>
      </div>

      <SlideBody>
        3번이 오늘의 하이라이트입니다 — <Mark>여러분을 지켜주는 안전장치</Mark>
      </SlideBody>
    </SlideLayout>
  )
}
