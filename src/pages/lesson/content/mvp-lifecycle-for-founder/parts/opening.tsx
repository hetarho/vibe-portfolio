import { Compass, Eye, Rocket, Users } from 'lucide-react'
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
} from '../../../deck'
import { REPO } from '../model/mvp-samples'

/** M0. 시작 전 · 준비 확인 */
export function StandbySlide() {
  const [checks, setChecks] = useState([false, false, false])
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-5">
          <SlideKicker>오늘 수업 · 2회 중 1회차</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            앱 하나가
            <br />
            <Mark>태어나서 살아가는 길</Mark>
          </h1>
          <SlideBody>오늘은 코드를 안 써요. 기획하는 법부터 좋은 코드가 뭔지까지 개발 한 바퀴를 배우고, 어려운 연동을 AI에게 시키는 법을 봐요. 예시는 강사가 {REPO.builtIn}에 만든 {REPO.name}.</SlideBody>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>준비 확인</PanelLabel>
          <CheckRow checked={checks[0]} onToggle={() => toggle(0)} hint="Claude Code가 설치된 그 노트북">
            터미널이 열리는 컴퓨터
          </CheckRow>
          <CheckRow checked={checks[1]} onToggle={() => toggle(1)} hint="내 프로젝트를 올릴 곳 — 없으면 오늘 만들어요">
            GitHub 계정
          </CheckRow>
          <CheckRow checked={checks[2]} onToggle={() => toggle(2)} hint="결제 카드 등록이 필요해요 — 무료 한도 안에서 써요">
            Google 계정 · 카드 한 장
          </CheckRow>
        </Panel>
      </div>

      <div className="animate-rise-3 grid gap-5 lg:grid-cols-2">
        <Panel tone="sunken" pad="md" className="flex items-center gap-5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-14">
            1
          </span>
          <p className="text-deck-caption text-content-secondary">
            오늘 가져갈 것 ① <span className="text-content-strong">기획하는 법 · 좋은 코드 보는 법</span> — 7단계 한 바퀴
          </p>
        </Panel>
        <Panel tone="sunken" pad="md" className="flex items-center gap-5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-14">
            2
          </span>
          <p className="text-deck-caption text-content-secondary">
            오늘 가져갈 것 ② 연동을 <span className="text-content-strong">AI에게 시키고 확인하는 법</span> + 혼자 할 8단계
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

const PHASES = [
  { icon: Rocket, head: '1회차 · 오늘', body: '기획 · UX · 설계 · 좋은 코드 · 검증 · 배포 · 운영 한 바퀴 + AI에게 시키는 법', tone: 'now' },
  { icon: Eye, head: '수업 사이 · 혼자', body: '내 아이디어로 빈 폴더에서 시작해 친구 폰에서 열리는 앱까지 8단계', tone: 'alone' },
  { icon: Users, head: '2회차', body: '결과물을 같이 열고 막힌 곳을 풀기 · 다음 아이디어를 spec으로', tone: 'next' },
] as const

/** M1. 오늘의 도착점 */
export function GoalSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <Compass className="size-8 text-accent md:size-11" />
        <SlideHeadline>목표는 100명이 쓰는 MVP예요</SlideHeadline>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {PHASES.map((phase, index) => (
          <Panel
            key={phase.head}
            tone={phase.tone === 'alone' ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <phase.icon className={cx('size-8 md:size-10', phase.tone === 'alone' ? 'text-accent' : 'text-content-muted')} />
            <PanelLabel tone={phase.tone === 'alone' ? 'accent' : 'muted'}>{phase.head}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">{phase.body}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="lg" className="animate-rise-4 flex flex-col gap-4">
        <PanelLabel>오늘 성공의 기준</PanelLabel>
        <p className="text-deck-lead font-bold text-content-strong">
          수업 끝에 내 아이디어를 <Mark>문제 한 문장 + 기능 3개 + 뺀 것 목록</Mark>으로 말할 수 있으면 성공이에요
        </p>
      </Panel>

      <div className="flex flex-wrap gap-3">
        <Chip>PART 1 생명주기 75분</Chip>
        <Chip>휴식 5분</Chip>
        <Chip tone="accent">PART 2 에이전트 20분 · PART 3 실습 지도 20분</Chip>
      </div>

      <SlideNote tone="quiet">
        만드는 건 다음 시간까지 <Mark>혼자</Mark> 해요 — 오늘은 그게 가능해지도록 지도를 그려요
      </SlideNote>
    </SlideLayout>
  )
}
