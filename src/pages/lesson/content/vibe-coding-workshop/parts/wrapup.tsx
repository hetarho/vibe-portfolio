import { Dices, Globe, PartyPopper, Rocket, Save } from 'lucide-react'
import { useState } from 'react'
import {
  Chip,
  CountdownTimer,
  cx,
  Panel,
  QrSlot,
  SlideBody,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideNote,
} from '@/features/slide-deck'

const MISSIONS = [
  { emoji: '🌙', name: '다크모드', how: '"어두운 테마도 만들어줘"' },
  { emoji: '✨', name: '애니메이션', how: '"버튼 누를 때 살짝 움직이게"' },
  { emoji: '😄', name: '이모지 추가', how: '"제목 옆에 어울리는 이모지"' },
  { emoji: '📱', name: '모바일 대응', how: '"휴대폰에서도 잘 보이게"' },
  { emoji: '🔊', name: '효과음', how: '"누를 때 딸깍 소리 나게"' },
  { emoji: '🎨', name: '색 테마 바꾸기', how: '"전체를 초록 계열로"' },
]

/** S19. 실습 2 — 업그레이드 미션 */
export function MissionSlide() {
  const [flipped, setFlipped] = useState<number[]>([])

  const toggle = (index: number) =>
    setFlipped((list) => (list.includes(index) ? list.filter((item) => item !== index) : [...list, index]))

  const drawRandom = () => {
    const pool = MISSIONS.map((_, index) => index).sort(() => Math.random() - 0.5)
    setFlipped(pool.slice(0, 2))
  }

  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-6 pt-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 2 · 10분</SlideKicker>
          <SlideHeadline>미션: 딱 2가지만 업그레이드하세요</SlideHeadline>
        </div>

        <div className="flex items-center gap-6">
          <CountdownTimer seconds={600} caption="남은 시간" size="md" />
          <button
            type="button"
            onClick={drawRandom}
            className="flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-deck-caption font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck hover:bg-accent-strong"
          >
            <Dices size={26} />
            랜덤 뽑기
          </button>
        </div>
      </div>

      <ul className="grid gap-5 lg:grid-cols-3">
        {MISSIONS.map((mission, index) => {
          const open = flipped.includes(index)
          return (
            <li key={mission.name} className="perspective-distant">
              <button
                type="button"
                onClick={() => toggle(index)}
                className={cx(
                  'relative grid h-52 w-full transform-3d transition-transform duration-500 ease-deck',
                  open && 'rotate-y-180',
                )}
              >
                <span className="col-start-1 row-start-1 flex flex-col items-center justify-center gap-3 rounded-card bg-surface-raised p-7 shadow-raised backface-hidden">
                  <span className="text-deck-lead font-bold text-content-muted">?</span>
                  <span className="text-deck-caption text-content-muted">미션 {index + 1}</span>
                </span>

                <span className="col-start-1 row-start-1 flex rotate-y-180 flex-col items-center justify-center gap-3 rounded-card bg-accent p-7 text-accent-contrast shadow-lifted backface-hidden">
                  <span className="text-deck-lead">{mission.emoji}</span>
                  <span className="text-deck-body font-bold">{mission.name}</span>
                  <span className="text-deck-caption opacity-80">{mission.how}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <SlideBody>못 정하겠으면 랜덤 뽑기를 누르세요. 고민이 길어지면 그게 손해입니다.</SlideBody>
    </SlideLayout>
  )
}

const SUMMARY = [
  { head: '웹 앱', body: '내용 + 디자인 + 기능', tail: '직접 쓸 필요 없음' },
  { head: '프롬프트', body: '무엇을 + 기능 + 느낌', tail: '이 공식 하나면 충분' },
  { head: '바이브코딩', body: '대화하며 고쳐나가는 것', tail: '오늘 제일 중요한 문장' },
]

/** S20. 마무리 — 오늘의 3줄 */
export function SummarySlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <SlideHeadline>오늘의 3줄</SlideHeadline>
        <Chip tone="accent">자랑하실 분? 🙌</Chip>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {SUMMARY.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 2 ? 'accent' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-5',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <span
              className={cx(
                'grid size-14 place-items-center rounded-full text-deck-caption font-bold',
                index === 2 ? 'bg-accent-contrast/15 text-accent-contrast' : 'bg-surface-sunken text-content-secondary',
              )}
            >
              {index + 1}
            </span>
            <p className={cx('text-deck-caption font-semibold', index === 2 ? 'text-accent-contrast/70' : 'text-content-muted')}>
              {item.head}
            </p>
            <p className={cx('text-deck-lead font-bold', index === 2 ? 'text-accent-contrast' : 'text-content-strong')}>
              {item.body}
            </p>
            <p className={cx('mt-auto text-deck-caption', index === 2 ? 'text-accent-contrast/70' : 'text-content-secondary')}>
              {item.tail}
            </p>
          </Panel>
        ))}
      </div>
    </SlideLayout>
  )
}

const ROADMAP = [
  { icon: Globe, label: '배포', detail: '링크로 공유하기' },
  { icon: Save, label: '데이터 저장', detail: '껐다 켜도 남아 있게' },
  { icon: Rocket, label: '나만의 진짜 프로젝트', detail: '내 일에 쓰는 도구로' },
]

/** S21. 다음 단계 & 마침 */
export function ClosingSlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘 여기까지, 다음엔</SlideKicker>

      <ol className="grid gap-5 lg:grid-cols-3">
        {ROADMAP.map((step, index) => (
          <Panel
            key={step.label}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <step.icon size={40} className="text-accent" />
            <p className="text-deck-body font-bold text-content-strong">{step.label}</p>
            <p className="text-deck-caption text-content-secondary">{step.detail}</p>
          </Panel>
        ))}
      </ol>

      <Panel tone="sunken" pad="lg" className="flex flex-wrap items-center justify-around gap-8">
        <QrSlot label="오늘 자료 · 프롬프트 모음" caption="집에 가서 다시 해보실 분" />
        <QrSlot label="피드백 설문" caption="2분이면 끝납니다" />
      </Panel>

      <SlideNote>
        <span className="inline-flex items-center gap-3">
          <PartyPopper size={30} />
          여러분은 오늘 <span className="underline decoration-4 underline-offset-8">첫 앱</span>을 만든 사람입니다 👏
        </span>
      </SlideNote>
    </SlideLayout>
  )
}
