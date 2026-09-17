import { Chrome, Coffee, FolderPlus, PackageCheck, Terminal } from 'lucide-react'
import { useState } from 'react'
import {
  CheckRow,
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
import { TypeThis } from '../../shared'

/** H18. 휴식 */
export function BreakSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col items-center gap-6 text-center md:gap-10">
        <Coffee className="animate-rise-1 size-16 text-accent md:size-24" />
        <SlideHeadline>5분 쉬고, 이제 직접 만듭니다</SlideHeadline>
        <CountdownTimer seconds={300} caption="남은 휴식" size="lg" />
        <Panel tone="sunken" pad="md" className="animate-rise-3 flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <PackageCheck className="size-7 text-content-muted md:size-9" />
          <p className="text-deck-body text-content-secondary">
            쉬는 동안 · 직위 세 개와 그 항목표를 손에 꺼내 둡니다. 실명은 빼고 항목과 배점만 있으면 됩니다
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

const WINDOWS = [
  {
    icon: Terminal,
    head: '터미널',
    body: '에이전트에게 말을 거는 창입니다. 여기에 한국어로 시킵니다',
    note: '검은 화면이지만 오늘 외울 명령은 세 줄뿐입니다',
  },
  {
    icon: FolderPlus,
    head: '폴더',
    body: '오늘 만드는 파일이 전부 떨어지는 곳입니다',
    note: '바탕화면에 새로 하나 만듭니다. 기존 업무 폴더 안에 만들지 않습니다',
  },
  {
    icon: Chrome,
    head: '브라우저',
    body: '만든 화면이 실제로 뜨는 곳입니다',
    note: '주소창에 localhost로 시작하는 주소를 칩니다',
  },
]

const PREPS = [
  { head: '바탕화면에 빈 폴더를 만들었다', hint: '이름은 영문으로 · 예: hr-eval' },
  { head: 'Claude Code가 설치되어 있다', hint: '터미널에서 claude를 쳤을 때 반응하면 된 것입니다' },
  { head: '직위 세 개의 평정 항목표를 꺼내 두었다', hint: '항목 이름 · 척도 · 가중치만 · 직원 명단은 빼고' },
  { head: '한 장을 손으로 계산한 정답을 적어 두었다', hint: '나중에 합계가 맞는지 대조할 기준입니다' },
]

/** H19. 오늘 쓰는 창 셋과 준비물 */
export function WorkspaceSlide() {
  const [checks, setChecks] = useState(() => PREPS.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))
  const done = checks.filter(Boolean).length

  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 준비</SlideKicker>
          <SlideHeadline>창은 셋, 준비물은 넷입니다</SlideHeadline>
        </div>
        <div className="flex items-center gap-3 rounded-panel bg-accent px-5 py-3 text-accent-contrast shadow-lifted md:px-8 md:py-5">
          <PackageCheck className="size-7 md:size-9" />
          <span className="text-deck-body font-bold">
            {done} / {PREPS.length}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
        {WINDOWS.map((item, index) => (
          <Panel
            key={item.head}
            tone="raised"
            pad="md"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <item.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-caption text-content-secondary">{item.body}</p>
            <p className="mt-auto rounded-card bg-surface-sunken p-3 text-deck-caption text-content-muted inset-shadow-sunken md:p-4">
              {item.note}
            </p>
          </Panel>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {PREPS.map((item, index) => (
          <CheckRow key={item.head} checked={checks[index]} onToggle={() => toggle(index)} hint={item.hint}>
            {item.head}
          </CheckRow>
        ))}
      </div>
    </SlideLayout>
  )
}

/** H20. 폴더를 열고 에이전트를 켜기 */
export function FirstCommandsSlide() {
  return (
    <SlideLayout>
      <SlideKicker>실습 준비 · 직접 칩니다</SlideKicker>
      <SlideHeadline>오늘 외울 명령은 이 세 줄이 전부입니다</SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-5 lg:grid-cols-3">
        <TypeThis step={1} className="animate-rise-1" why="만들어 둔 폴더로 들어갑니다. 앞으로 모든 파일이 여기에 떨어집니다.">
          cd Desktop/hr-eval
        </TypeThis>
        <TypeThis step={2} className="animate-rise-2" why="에이전트를 켭니다. 이 창이 앞으로 대화하는 자리입니다.">
          claude
        </TypeThis>
        <TypeThis step={3} className="animate-rise-3" why="첫 저장점을 만듭니다. 이 뒤로는 언제든 여기로 되돌아올 수 있습니다.">
          지금 이 폴더를 git으로 관리하게 만들고 첫 저장점을 만들어줘
        </TypeThis>
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-col gap-2">
        <PanelLabel>세 번째 줄이 오늘의 안전장치입니다</PanelLabel>
        <SlideBody>
          앞으로 잘 된 순간마다 “지금 상태 저장해줘”라고만 하면 됩니다. 명령을 외울 필요는 없고, 저장을 시킨다는 사실만
          기억하면 됩니다.
        </SlideBody>
      </Panel>

      <SlideNote tone="quiet">
        검은 화면이 어색한 것은 당연합니다 · <Mark>여기부터는 전부 한국어로 말합니다</Mark>
      </SlideNote>
    </SlideLayout>
  )
}
