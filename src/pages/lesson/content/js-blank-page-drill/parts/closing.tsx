import { useState } from 'react'
import { CheckRow, cx, Mark, Panel, PanelLabel, SlideBody, SlideHeadline, SlideKicker, SlideLayout, SlideNote } from '../../../deck'
import { PromptCopyButton } from '../../shared'
import { DRILLS } from '../model/drill'
import reviewPrompt from '../model/review-prompt.md?raw'

const LADDER = [
  { head: '이번 Step 규칙을 소리 내어 읽는다', detail: '검은 상자 한 줄이면 됩니다' },
  { head: '다음에 할 일을 한국어로 말한다', detail: '말이 나오면 그대로 주석으로 씁니다' },
  { head: '속은 비우고 껍데기만 친다', detail: 'if () { } else { } · 손이 움직이면 머리가 풀립니다' },
  { head: '「정답 5초 보기」를 내가 누른다', detail: '5초 뒤에 다시 가려집니다' },
  { head: '한 Step 내려갔다가 다시 올라온다', detail: '아래 Step을 통과하면 원래 Step으로 돌아옵니다' },
]

/** 멈췄을 때 내려가는 사다리 · 학생이 스스로 쓰는 판 */
export function StuckLadderSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>막혔을 때</SlideKicker>
      <SlideHeadline>
        막히면 <Mark>한 칸씩</Mark> 내려갑니다
      </SlideHeadline>

      <div className="flex flex-col gap-3">
        {LADDER.map((rung, index) => (
          <Panel
            key={rung.head}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="sm"
            className={cx('grid items-center gap-2 md:grid-cols-9 md:gap-5', `animate-rise-${index + 1}`)}
          >
            <div className="flex items-center gap-3 md:col-span-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-strong inset-shadow-sunken md:size-10">
                {index + 1}
              </span>
              <p className="text-deck-body font-bold text-content-strong">{rung.head}</p>
            </div>
            <p className="text-deck-caption text-content-secondary md:col-span-4">{rung.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">어느 칸에서든 다시 움직이기 시작하면 거기서 멈춥니다</SlideNote>
    </SlideLayout>
  )
}

/** 오늘의 도착점 · 문제마다 Step 5를 정답 보기 없이 통과했는지 같이 체크한다 */
export function RecapSlide() {
  const [checked, setChecked] = useState<string[]>([])
  const toggle = (id: string) => setChecked(checked.includes(id) ? checked.filter((item) => item !== id) : [...checked, id])

  return (
    <SlideLayout align="top">
      <SlideKicker>오늘의 도착점</SlideKicker>
      <SlideHeadline>
        Step 5를 <Mark>정답 보기 없이</Mark> 통과한 문제
      </SlideHeadline>

      <div className="grid gap-3 lg:grid-cols-2">
        {DRILLS.map((problem) => (
          <CheckRow key={problem.id} checked={checked.includes(problem.id)} onToggle={() => toggle(problem.id)} hint={`${problem.period} · ${problem.focus}`}>
            {problem.no} {problem.title}
          </CheckRow>
        ))}
      </div>

      <SlideNote tone="quiet">
        하나라도 통과했다면 오늘 빈 화면에서 <Mark>첫 줄을 뗀 것</Mark>입니다 · 남은 문제는 다음 수업의 Step 4부터
      </SlideNote>
    </SlideLayout>
  )
}

const ROUNDS = [
  { day: '오늘 밤', what: '타자 연습장 패턴 A~D를 다섯 판씩. 첫 판과 마지막 판 시간을 적어 옵니다' },
  { day: '내일', what: '오늘 통과한 문제 하나를 Step 5로 다시. 주석부터 씁니다' },
  { day: '남은 요일', what: '복습 프롬프트로 새 문제를 받아 네 단계로 줄여 가며 풉니다' },
]

/** 집에서 이어가기 · 세 번과 복습 프롬프트 */
export function HomeworkSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-5">
          <SlideKicker>집에서 이어가기</SlideKicker>
          <SlideHeadline>
            AI가 같은 문제를 <Mark>힌트를 줄여 가며</Mark> 네 번 냅니다
          </SlideHeadline>
          <SlideBody>
            값만 비운 코드 → 껍데기와 주석 → 주석만 → 문제 설명만. 틀리면 줄 번호와 질문 하나만 돌려줍니다. 두 번 막혀야 정답을 보여 줍니다.
          </SlideBody>
          <PromptCopyButton size="md" label="복습 프롬프트 복사" text={reviewPrompt} />
        </div>

        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>같은 손을 세 번</PanelLabel>
          {ROUNDS.map((round, index) => (
            <div key={round.day} className={cx('flex items-start gap-4', `animate-rise-${index + 1}`)}>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-raised text-deck-caption font-bold text-content-strong shadow-raised md:size-10">
                {index + 1}
              </span>
              <div className="flex flex-col">
                <p className="text-deck-caption font-bold text-content-strong">{round.day}</p>
                <p className="text-deck-caption text-content-secondary">{round.what}</p>
              </div>
            </div>
          ))}
        </Panel>
      </div>
    </SlideLayout>
  )
}
