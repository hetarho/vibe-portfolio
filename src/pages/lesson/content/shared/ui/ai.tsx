import { Code2, Compass, FileText, Microscope, Search, Wrench } from 'lucide-react'
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
  '사람이 쓴 글에서 통째로 배웠다. 그래서 정해진 정답표가 없다',
  '기능 목록이 없다. 말로 설명하는 만큼 일한다',
  '몇 해 전까지는 이게 전부였다. 채팅창 안에서 글만 주고받았다',
  '지금은 검색하고 계산하고 파일까지 만드는 도구가 붙었다',
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

const AI_SOLVED = [
  {
    before: '지어낸다',
    after: '검색해서 읽고 출처까지 답니다. 그 출처를 열어보는 것은 여전히 사람 몫입니다',
  },
  { before: '계산과 개수를 틀린다', after: '직접 코드를 짜서 돌리고 결과를 가져옵니다' },
  { before: '최신 정보를 모른다', after: '오늘 올라온 페이지도 열어서 읽습니다' },
  { before: '글밖에 못 만든다', after: '표 · 문서 · 발표 파일을 직접 만듭니다' },
]

const HUMAN_PART = [
  { head: '무엇을 할지', body: '할 수 있는 일은 많습니다. 지금 해야 할 하나를 고르는 건 사람입니다' },
  { head: '무엇이 완료인지', body: '어디까지 나와야 끝인지를 말해줘야 스스로 검사합니다' },
  { head: '우리한테 맞는지', body: '사실이 맞더라도 우리 상황에 쓸 내용인지는 다른 질문입니다' },
]

/** 공통 AI-2. 도구가 붙은 뒤 사람의 자리 */
export function AiHumanRoleSlide() {
  return (
    <SlideLayout>
      <SlideKicker>개념 · AI란</SlideKicker>
      <SlideHeadline>사람이 할 일은 틀린 것 찾기가 아닙니다</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Wrench className="size-8 text-positive md:size-10" />
            <PanelLabel>예전에 약점이라 부르던 것</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {AI_SOLVED.map((item) => (
              <li
                key={item.before}
                className="rounded-card bg-surface-sunken p-3 inset-shadow-sunken md:p-4"
              >
                <p className="text-deck-caption font-semibold text-content-muted line-through">{item.before}</p>
                <p className="text-deck-caption font-semibold text-content-primary">→ {item.after}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-2 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Compass className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">도구가 대신 못 하는 것</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {HUMAN_PART.map((item) => (
              <li key={item.head} className="rounded-card bg-surface-raised p-3 shadow-raised md:p-4">
                <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
                <p className="text-deck-caption text-content-secondary">{item.body}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        도구가 늘어날수록 · <Mark>무엇을 시킬지 정하는 일</Mark>이 더 중요해집니다
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
