import { Dices, Globe, PartyPopper, Rocket, Save } from 'lucide-react'
import { useState } from 'react'
import {
  CheckRow,
  Chip,
  CountdownTimer,
  cx,
  Panel,
  SlideBody,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideNote,
} from '../../../deck'

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
      <div className="flex flex-wrap items-end justify-between gap-4 pt-6 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 2 · 10분</SlideKicker>
          <SlideHeadline>미션: 딱 2가지만 업그레이드하세요</SlideHeadline>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <CountdownTimer seconds={600} caption="남은 시간" size="md" />
          <button
            type="button"
            onClick={drawRandom}
            className="flex items-center gap-3 rounded-full bg-accent px-4 py-4 text-deck-caption font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck md:px-8 hover:bg-accent-strong"
          >
            <Dices size={26} />
            랜덤 뽑기
          </button>
        </div>
      </div>

      {/*
        3D 뒤집기 카드는 앞면이 h-52 박스보다 위아래로 몇 px씩 더 그려져서
        gap-5를 주면 행 간격이 5px밖에 안 남는다(열 간격은 그대로 14px).
        그래서 행 간격만 따로, 열보다 넉넉하게 잡는다.
      */}
      <ul className="grid gap-x-5 gap-y-7 md:gap-y-10 lg:grid-cols-3">
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
                <span className="col-start-1 row-start-1 flex flex-col items-center justify-center gap-3 rounded-card bg-surface-raised p-4 shadow-raised backface-hidden md:p-7">
                  <span className="text-deck-lead font-bold text-content-muted">?</span>
                  <span className="text-deck-caption text-content-muted">미션 {index + 1}</span>
                </span>

                <span className="col-start-1 row-start-1 flex rotate-y-180 flex-col items-center justify-center gap-3 rounded-card bg-accent p-4 text-accent-contrast shadow-lifted backface-hidden md:p-7">
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
  { head: '개발', body: '순서를 빠짐없이 적는 일', tail: '그 적는 일을 AI가 합니다' },
  { head: '프롬프트', body: '무엇을 + 기능 + 느낌', tail: '+ 띄우고 주소 알려줘' },
  { head: '바이브코딩', body: '대화하며 고쳐나가는 것', tail: '오늘 제일 중요한 문장' },
]

/** S20. 마무리 — 오늘의 3줄 */
export function SummarySlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <SlideHeadline>오늘 남길 3줄</SlideHeadline>
        <Chip tone="accent">띄워둔 화면 같이 한번 볼까요</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
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
                'grid size-10 place-items-center rounded-full text-deck-caption font-bold md:size-14',
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
  { icon: Globe, label: '인터넷에 올리기', detail: 'localhost 말고 남에게 보낼 수 있는 주소로' },
  { icon: Save, label: '데이터 저장', detail: '껐다 켜도 남아 있게' },
  { icon: Rocket, label: '나만의 진짜 도구', detail: '내 일에서 매주 쓰는 것으로' },
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

      <Panel tone="sunken" pad="lg" className="flex flex-wrap items-center justify-between gap-5 md:gap-8">
        <p className="text-deck-body text-content-secondary">
          오늘 쓴 프롬프트와 명령 세 줄은 수업 끝나고 정리해서 보낼게요.
        </p>
        <p className="text-deck-caption text-content-muted">공부용 프롬프트는 아까 복사한 그것 그대로예요</p>
      </Panel>

      <SlideNote>
        <span className="inline-flex items-center gap-3">
          <PartyPopper size={30} />
          오늘 <span className="underline decoration-4 underline-offset-8">첫 앱</span>을 직접 띄웠어요 👏
        </span>
      </SlideNote>
    </SlideLayout>
  )
}

const PREP = [
  { head: '사전 설치 확인', hint: '일주일 전 공지 · 코딩 에이전트 CLI + Node.js, 로그인까지' },
  { head: '학생 노트북에서 터미널 한 번 열어보기', hint: '윈도우/맥이 다르니 여는 법을 미리 확인' },
  { head: '데모용 완성 앱 준비', hint: '네트워크가 죽어도 보여줄 것 — 룰렛 미리보기로 대체 가능' },
  { head: '작업 폴더 위치 정해두기', hint: '바탕화면처럼 학생이 눈으로 찾을 수 있는 곳' },
  { head: '공부용 프롬프트 전달 경로', hint: '수업 후 링크로도 한 번 더 보내기' },
]

/** V34. 강사용 — 수업 전 준비 (학생에게 보여주는 화면 아님) */
export function PrepChecklistSlide() {
  const [checks, setChecks] = useState(() => PREP.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
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

      <SlideBody>설치가 안 되어 있으면 PART 2가 통째로 무너져요. 이것부터 확인하세요.</SlideBody>
    </SlideLayout>
  )
}
