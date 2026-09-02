import { AlertTriangle, Code2, FileText, Microscope, Search, ThumbsUp } from 'lucide-react'
import {
  CompareGrid,
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

/**
 * AI 개념 공통 화면 3장. V2 체계의 모든 덱이 재사용한다.
 * 특정 수강생·직군 이야기는 넣지 않는다. 맞춤 이야기는 각 덱의 화면에서 한다.
 */

const AI_FACTS = [
  '규칙을 심은 게 아니라 사람의 글에서 배웠다. 그래서 정답표가 없다',
  '기능 목록이 없다. 말로 설명하는 만큼 일한다',
  '학습 시점 이후의 일은 모른다. 검색과 자료로 보완한다',
]

const AI_NAMES = [
  { name: '모델', example: 'GPT · Claude · Gemini', role: '학습을 마친 두뇌' },
  { name: '서비스', example: 'ChatGPT · Claude 앱', role: '두뇌에 대화 화면을 붙인 것' },
  { name: '에이전트', example: 'Claude Code · Codex', role: '두뇌에 도구(손발)를 붙인 것' },
]

/** 공통 AI-1. AI란 무엇인가 */
export function AiWhatSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>개념 · AI란</SlideKicker>
          <SlideHeadline>AI는 다음에 올 말을 예측하는 기계입니다</SlideHeadline>
          <SlideBody>
            사람이 쓴 방대한 글에서 패턴을 배워, 지금까지의 대화 다음에 올 말을 확률로 고릅니다. 그 선택을 이어 붙인
            것이 답변입니다.
          </SlideBody>
          <div className="flex flex-col gap-3">
            {AI_FACTS.map((item, index) => (
              <Panel key={item} tone="sunken" pad="sm" className={cx('flex items-center gap-3', `animate-rise-${index + 1}`)}>
                <p className="text-deck-caption font-semibold text-content-secondary">{item}</p>
              </Panel>
            ))}
          </div>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel tone="accent">헷갈리는 이름 정리</PanelLabel>
          {AI_NAMES.map((row) => (
            <div key={row.name} className="rounded-card bg-surface-sunken p-4 inset-shadow-sunken">
              <div className="flex flex-wrap items-baseline gap-3">
                <p className="text-deck-body font-bold text-content-strong">{row.name}</p>
                <p className="text-deck-caption font-semibold text-content-muted">{row.example}</p>
              </div>
              <p className="text-deck-caption text-content-secondary">{row.role}</p>
            </div>
          ))}
        </Panel>
      </div>

      <SlideNote tone="quiet">
        기능이 정해져 있지 않다는 것이 핵심입니다 · <Mark>설명을 잘하는 사람이 잘 쓰는 도구</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const AI_GOOD = [
  '초안 만들기: 글 · 표 · 계획을 빈 화면보다 빨리',
  '요약 · 번역 · 설명: 내 수준에 맞춘 과외',
  '형식 바꾸기: 글을 표로, 표를 코드로',
  '아이디어 넓히기: 반례와 빠진 것 찾아주기',
]

const AI_RISK = [
  '환각: 그럴듯한 거짓을 자신 있게 말한다',
  '최신 정보와 좁은 전문 영역의 빈틈',
  '계산과 개수 세기 실수',
  '물을 때마다 조금씩 다른 답',
]

/** 공통 AI-2. 잘하는 것과 조심할 것 */
export function AiProsConsSlide() {
  return (
    <SlideLayout>
      <SlideKicker>개념 · AI란</SlideKicker>
      <SlideHeadline>잘하는 일에 쓰고, 약점은 사람이 메웁니다</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <ThumbsUp className="size-8 text-positive md:size-10" />
            <PanelLabel>잘하는 것</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {AI_GOOD.map((item) => (
              <li key={item} className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-secondary inset-shadow-sunken md:p-4">
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <AlertTriangle className="size-8 text-caution md:size-10" />
            <PanelLabel>조심할 것</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {AI_RISK.map((item) => (
              <li key={item} className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-secondary inset-shadow-sunken md:p-4">
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        결론은 하나 · 중요한 것은 <Mark>반드시 사람이 검증</Mark>하고 씁니다
      </SlideNote>
    </SlideLayout>
  )
}

const AI_USES = [
  { icon: FileText, head: '문서 업무', body: '보고서 초안 · 회의록 요약 · 이메일. 가장 넓게 퍼진 사용처' },
  { icon: Code2, head: '소프트웨어 개발', body: '코드 작성과 검토. 개발자의 일상 도구로 정착' },
  { icon: Search, head: '조사 · 분석', body: '자료 조사 · 수십 개 문서 요약 · 데이터 정리' },
  { icon: Microscope, head: '전문 분야', body: '의료 · 법률 · 연구에서 초안과 검토 보조로 확산' },
]

/** 공통 AI-3. 실무에서는 */
export function AiInPracticeSlide() {
  return (
    <SlideLayout>
      <SlideKicker>실무에서는</SlideKicker>
      <SlideHeadline>이미 업무 도구 속에 들어와 있습니다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {AI_USES.map((use, index) => (
          <Panel key={use.head} tone="raised" pad="lg" className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}>
            <use.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-body font-bold text-content-strong">{use.head}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{use.body}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-5 flex items-center gap-4">
        <p className="text-deck-body font-semibold text-content-primary">
          흐름은 “가끔 물어보는 검색창”에서 <Mark>업무 흐름에 상시로 붙는 동료</Mark>로 바뀌는 중입니다. 이 끝에 에이전트가 있습니다
        </p>
      </Panel>
    </SlideLayout>
  )
}
