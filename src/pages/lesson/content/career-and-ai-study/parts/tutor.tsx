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
    head: '안 배운 걸로 가르치지 않아요',
    body: '배운 단어를 원장에 적어두고, 레슨에 새 문법이 끼어들면 검사기가 통째로 실패시켜요. 갑자기 어려워지는 순간이 없어요.',
  },
  {
    icon: FolderGit2,
    head: '채팅이 아니라 레포',
    body: '레슨이 파일로 쌓이고 뷰어에서 읽어요. 사라지지 않고, git 히스토리가 내 성장 기록이 돼요.',
  },
  {
    icon: GraduationCap,
    head: '개념 하나당 실습 하나',
    body: '실습마다 판정 명령이 붙어요. "에디터를 보세요"는 판정이 아니에요.',
  },
  {
    icon: MessageCircleQuestion,
    head: 'AI가 답을 안 줘요',
    body: '"여기 고치세요" 대신 "이 줄에서 err이 nil이면 어떻게 되죠?"로 물어요. 통과 못 하면 다음 레슨을 안 줘요.',
  },
]

/** C19. 튜터 프롬프트 소개 */
export function TutorPromptSlide() {
  return (
    <SlideLayout>
      <SlideKicker>튜터 프롬프트</SlideKicker>
      <SlideHeadline>기본기를 놓치지 않게 만든 장치예요</SlideHeadline>

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

      <SlideNote>AI와 함께 공부해도 내 손에 기본기가 남도록 만든 문서예요</SlideNote>
    </SlideLayout>
  )
}

/**
 * 데모 단계별로 "무엇을 보여줄지" 정리한 것.
 * 터미널 출력은 실제 레포 출력을 흉내 낸 예시이므로, 데모용 레포에 맞춰 손봐도 된다.
 */
const DEMO_STEPS = [
  {
    label: '오늘 뭐 할지 판정',
    command: 'python3 tools/study-status.py',
    lines: [
      { text: '진행   L01–L07 완료 · 7 / 10', tone: 'plain' as const },
      { text: '뷰어   http://localhost:5173 응답 OK', tone: 'positive' as const },
      { text: '다음   L08 집필부터', tone: 'plain' as const },
    ],
  },
  {
    label: '뷰어에서 레슨 읽기',
    command: 'pnpm dev',
    lines: [
      { text: ':::drill 3 — 직접 쳐볼 것', tone: 'plain' as const },
      { text: ':::spec  과제 카드', tone: 'plain' as const },
      { text: ':::check 이해도 질문 (힌트 접힘)', tone: 'plain' as const },
    ],
  },
  {
    label: '⭐ 안전장치 시연',
    command: 'python3 tools/check-order.py lessons/08-interface',
    lines: [
      { text: '✗ L08:42  원장에 없는 토큰', tone: 'critical' as const },
      { text: '  → 먼저 가르치거나 빼세요', tone: 'critical' as const },
      { text: 'FAILED (1 violation)', tone: 'critical' as const },
    ],
  },
  {
    label: '채점 장면',
    command: '구현 제출',
    lines: [
      { text: '정확성 4 · 관용성 3 · 에러처리 3', tone: 'positive' as const },
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

/** C21. 라이브 데모 — 미리 만들어둔 레포로 시연 */
export function LiveDemoSlide() {
  const [step, setStep] = useState(0)
  const current = DEMO_STEPS[step]

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>미리 만들어둔 레포로</SlideKicker>
          <SlideHeadline>다 만들어지면 이런 화면이에요</SlideHeadline>
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
          <PanelLabel>이럴 때 이런 게 나와요</PanelLabel>
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
        여기가 오늘의 하이라이트예요 — <Mark>막히기 전에 막아주는 안전장치</Mark>
      </SlideBody>
    </SlideLayout>
  )
}
