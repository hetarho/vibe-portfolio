import { Bot, FileCheck2, Languages, Presentation, Route } from 'lucide-react'
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

const READY = [
  { head: '에이전트를 쓸 노트북', hint: '평소 쓰는 AI 서비스에 로그인하고 새 대화를 열어두기' },
  { head: 'Zonta 공식 자료 주소', hint: '국제 홈페이지 · 컨벤션 페이지 · 한국 자료 — 못 찾은 것은 수업 중 함께 찾기' },
  { head: '10월 발표의 기본 조건', hint: '세 지역 · 청중 · 발표 시간 · 원하는 슬라이드 수를 메모해 오기' },
  { head: '영어를 쓸 실제 장면 하나', hint: '국제회의 인사 · 발표 · 질의응답 중 오늘 연습할 장면 고르기' },
]

/** A0. 시작 전 · 준비 확인 */
export function StandbySlide() {
  const [checks, setChecks] = useState(() => READY.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-5">
          <SlideKicker>AI 입문 · 1대1 · 오늘 2시간</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            내 일을 끝까지 맡기는
            <br />
            <Mark>첫 AI 에이전트</Mark>
          </h1>
          <SlideBody>
            Zonta 오리엔테이션 PPT를 만드는 과정을 함께 돌리고, 수업이 끝난 뒤에도 혼자 이어갈 영어 코치를 만듭니다.
          </SlideBody>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>시작 전 준비</PanelLabel>
          {READY.map((item, index) => (
            <CheckRow key={item.head} checked={checks[index]} onToggle={() => toggle(index)} hint={item.hint}>
              {item.head}
            </CheckRow>
          ))}
        </Panel>
      </div>

      <SlideNote tone="quiet">
        자료가 완벽할 필요는 없어요 · <Mark>없는 것을 알아내는 과정</Mark>도 에이전트의 일입니다
      </SlideNote>
    </SlideLayout>
  )
}

const OUTCOMES = [
  { icon: Bot, head: '설명한다', body: '챗봇과 에이전트의 차이, 사람이 잡아야 할 승인선' },
  { icon: Presentation, head: '만든다', body: '근거표가 붙은 Zonta 오리엔테이션 PPT 초안' },
  { icon: Languages, head: '이어간다', body: '매일 15분 진행되는 나만의 영어 연습 에이전트' },
]

/** A1. 오늘의 완료 조건 */
export function FinishLineSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>오늘의 완료 조건</SlideKicker>
          <SlideHeadline>세 가지가 실제로 남아야 끝입니다</SlideHeadline>
        </div>
        <Chip tone="accent">설명 + 파일 + 다음 행동</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {OUTCOMES.map((outcome, index) => (
          <Panel
            key={outcome.head}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}
          >
            <outcome.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-lead font-bold text-content-strong">{outcome.head}</p>
            <p className="mt-auto text-deck-body text-content-secondary">{outcome.body}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-4 flex items-center gap-5">
        <FileCheck2 className="size-7 shrink-0 text-positive md:size-9" />
        <p className="text-deck-body font-semibold text-content-primary">
          기준은 “AI가 해줬다”가 아니라 <Mark>내가 근거를 확인하고 다시 시킬 수 있다</Mark>
        </p>
      </Panel>
    </SlideLayout>
  )
}

const JOURNEY = [
  { time: '0–20분', name: '에이전트 이해', detail: '답변 도구가 일을 끝내는 동료가 되는 조건' },
  { time: '20–40분', name: 'PPT 조사 설계', detail: '목표 · 공식 출처 · 근거표 · 확인 질문' },
  { time: '40–65분', name: 'PPT 제작 시연', detail: '스토리라인 → 슬라이드 → 출처 → 파일' },
  { time: '65–75분', name: '직접 수정 · 검수', detail: '한 장을 고치고 근거까지 확인' },
  { time: '75–80분', name: '휴식', detail: '파일 저장 · 새 대화 준비' },
  { time: '80–110분', name: '영어 코치 만들기', detail: '진단 · 역할극 · 피드백 · 학습 기록' },
  { time: '110–120분', name: '네 프로젝트로 확장', detail: 'Zonta · 영어 · 투자 · 전시기획을 분리해 운영' },
]

/** A2. 120분 여정 */
export function JourneySlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>오늘의 시간표</SlideKicker>
          <SlideHeadline>설명 20분, 나머지는 실제로 돌립니다</SlideHeadline>
        </div>
        <Route className="size-9 text-accent md:size-12" />
      </div>

      <ol className="flex flex-col gap-3">
        {JOURNEY.map((step, index) => (
          <li key={step.time} className={cx(index < 4 ? `animate-rise-${index + 1}` : 'animate-rise-5')}>
            <Panel
              tone={index === 2 || index === 5 ? 'accentSoft' : 'raised'}
              pad="sm"
              className="grid items-center gap-3 md:grid-cols-9 md:gap-6"
            >
              <p className="text-deck-caption font-bold text-content-muted md:col-span-2">{step.time}</p>
              <p className="text-deck-body font-bold text-content-strong md:col-span-3">{step.name}</p>
              <p className="text-deck-caption text-content-secondary md:col-span-4">{step.detail}</p>
            </Panel>
          </li>
        ))}
      </ol>
    </SlideLayout>
  )
}

