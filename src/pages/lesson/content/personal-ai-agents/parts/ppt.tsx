import {
  AlertTriangle,
  Download,
  Eye,
  FileSearch,
  FileText,
  Globe2,
  Link2,
  MessageSquareText,
  Presentation,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
} from 'lucide-react'
import {
  Chip,
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
import { PromptCopyButton } from '../../shared'
import pptPrompt from '../model/zonta-ppt-agent-prompt.md?raw'
import researchPrompt from '../model/zonta-research-agent-prompt.md?raw'

const MISSION = [
  { label: '청중', value: '서울을 포함한 한국 세 지역의 회원', ask: '지역과 Zonta 경험 수준은?' },
  { label: '변화', value: '새 회기의 방향을 이해하고 동기를 얻는다', ask: '끝나고 무엇을 결정할까?' },
  { label: '내용', value: '컨벤션 · 국제 · 한국 · 현안 · 토론', ask: '내부에서만 아는 사실은?' },
  { label: '산출물', value: '공통 PPT + 지역별 조정 장', ask: '발표 시간과 장수는?' },
]

/** A8. PPT 미션 */
export function PptMissionSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 1 · Zonta 오리엔테이션</SlideKicker>
          <SlideHeadline>발표가 끝난 뒤 청중이 무엇을 할지부터 정합니다</SlideHeadline>
        </div>
        <Presentation className="size-9 text-accent md:size-12" />
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {MISSION.map((item, index) => (
          <Panel
            key={item.label}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex flex-col gap-3', `animate-rise-${Math.min(index + 1, 4)}`)}
          >
            <PanelLabel tone={index === 1 ? 'accent' : 'muted'}>{item.label}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">{item.value}</p>
            <p className="text-deck-caption text-content-muted">먼저 확인 → {item.ask}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        같은 Zonta 자료도 <Mark>누구에게 어떤 변화를 만들지</Mark>에 따라 PPT는 달라집니다
      </SlideNote>
    </SlideLayout>
  )
}

const SOURCES = [
  { icon: Globe2, rank: '1순위', name: '국제 공식', body: 'Zonta International 홈페이지 · 공식 보고서·전략 문서' },
  { icon: Presentation, rank: '1순위', name: '컨벤션 공식', body: '해당 연도의 공식 컨벤션 페이지 · 결의·발표 자료' },
  { icon: Users, rank: '1순위', name: '한국 공식·내부', body: '한국의 공식 채널 · 지역 자료 · 회의 기록 · 담당자 확인' },
  { icon: Search, rank: '보조', name: '외부 자료', body: 'UN·파트너 기관·언론 — 맥락과 교차 확인에만 사용' },
]

/** A9. 출처 지도 */
export function SourceMapSlide() {
  return (
    <SlideLayout>
      <SlideKicker>자료가 많을수록 순서가 필요합니다</SlideKicker>
      <SlideHeadline>자료는 공식 홈페이지부터 찾습니다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {SOURCES.map((source, index) => (
          <Panel
            key={source.name}
            tone={index < 3 ? 'raised' : 'sunken'}
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <source.icon className={cx('size-8 md:size-10', index < 3 ? 'text-accent' : 'text-content-muted')} />
            <PanelLabel tone={index < 3 ? 'accent' : 'muted'}>{source.rank}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">{source.name}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{source.body}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="accentSoft" pad="md" className="animate-rise-5 flex items-center gap-4">
        <AlertTriangle className="size-7 shrink-0 text-accent md:size-9" />
        <p className="text-deck-body font-semibold text-content-primary">
          “지난 7월”은 먼저 <Mark>연도 · 공식 행사명 · 개최지</Mark>를 확인 — 상대적인 날짜는 그대로 조사하지 않습니다
        </p>
      </Panel>
    </SlideLayout>
  )
}

/** A10. 조사 에이전트 프롬프트 */
export function ResearchPromptSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>복사해서 새 대화에 붙이기</SlideKicker>
          <SlideHeadline>조사 전에 다섯 가지를 먼저 확인합니다</SlideHeadline>
          <SlideBody>
            정확한 컨벤션, 세 지역과 청중, 발표 시간, 민감한 현안, 한국 최신 자료를 확인한 뒤 공식 출처부터 읽게 합니다.
          </SlideBody>

          <div className="grid gap-3 md:grid-cols-2">
            {['공식 출처 우선', '날짜·URL 기록', '사실·해석 분리', '확인 필요 공개'].map((item, index) => (
              <Panel key={item} tone="sunken" pad="sm" className="flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-10">
                  {index + 1}
                </span>
                <p className="text-deck-caption font-semibold text-content-secondary">{item}</p>
              </Panel>
            ))}
          </div>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-6 lg:col-span-4">
          <FileSearch className="size-10 text-accent md:size-14" />
          <PanelLabel tone="accent">Zonta 리서치 에이전트</PanelLabel>
          <p className="text-deck-body text-content-secondary">근거표 · 국제/한국 구분 · 빠진 정보 · 발표 흐름까지 한 번에 남기는 업무 지침</p>
          <PromptCopyButton size="md" label="조사 프롬프트 복사" text={researchPrompt} />
        </Panel>
      </div>

      <SlideNote tone="quiet">
        빈칸을 다 몰라도 괜찮아요 · 프롬프트가 먼저 묻고 <Mark>답을 기다리게</Mark> 만들었습니다
      </SlideNote>
    </SlideLayout>
  )
}

const EVIDENCE = [
  ['핵심 주장', '발표에서 말하고 싶은 한 문장'],
  ['구분', '사실 · 해석 · 토론 질문'],
  ['날짜', '발행일과 사건일을 따로'],
  ['출처', '제목 · 발행 주체 · URL/파일명'],
  ['용도', '어느 슬라이드에 왜 쓰는지'],
  ['확신도', '확인 · 교차 확인 · 확인 필요'],
]

/** A11. 근거표 */
export function EvidenceTableSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>조사한 내용을 PPT로 옮기기 전에</SlideKicker>
          <SlideHeadline>AI가 찾은 내용은 이 표에 먼저 모읍니다</SlideHeadline>
        </div>
        <Chip tone="accent">주장 하나마다 출처 하나</Chip>
      </div>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
        {EVIDENCE.map(([head, body], index) => (
          <Panel
            key={head}
            tone={index === 5 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex flex-col gap-3', index < 3 ? `animate-rise-${index + 1}` : 'animate-rise-4')}
          >
            <PanelLabel tone={index === 5 ? 'accent' : 'muted'}>{head}</PanelLabel>
            <p className="text-deck-body font-semibold text-content-strong">{body}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-5 flex items-center gap-4">
        <Link2 className="size-7 shrink-0 text-accent md:size-9" />
        <p className="text-deck-body text-content-secondary">
          이 표가 있으면 숫자나 방향이 의심스러울 때 <Mark>원문을 바로 열어 확인할 수 있습니다</Mark>
        </p>
      </Panel>
    </SlideLayout>
  )
}

const TYPES = [
  { label: '사실', example: '공식 문서가 명시한 방향·날짜·결정', rule: '출처와 날짜를 붙인다', tone: 'raised' },
  { label: '해석', example: '이 방향이 한국의 새 회기에 갖는 의미', rule: '“우리는 이렇게 읽었다”라고 말한다', tone: 'accentSoft' },
  { label: '질문', example: '세 지역에서는 무엇이 다르게 보이는가', rule: '현장에서 답을 모은다', tone: 'raised' },
] as const

/** A12. 사실·해석·질문 분리 */
export function FactInterpretationSlide() {
  return (
    <SlideLayout>
      <SlideKicker>NGO 오리엔테이션에서 특히 중요한 구분</SlideKicker>
      <SlideHeadline>검색으로 확인할 것과 사람이 논의할 것을 섞지 않습니다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {TYPES.map((type, index) => (
          <Panel
            key={type.label}
            tone={type.tone}
            pad="lg"
            className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}
          >
            <span className="grid size-11 place-items-center rounded-full bg-surface-highlight text-deck-body font-bold text-content-primary md:size-14">
              {index + 1}
            </span>
            <p className="text-deck-lead font-bold text-content-strong">{type.label}</p>
            <p className="text-deck-body text-content-secondary">{type.example}</p>
            <p className="mt-auto text-deck-caption font-semibold text-content-primary">→ {type.rule}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        한국 Zonta의 동기와 현안은 공개 자료만으로 단정하지 말고 <Mark>좋은 토론 질문</Mark>으로 바꿉니다
      </SlideNote>
    </SlideLayout>
  )
}

const STORY = [
  ['1–2', '문을 연다', '왜 지금 새 회기인가 · 오늘 나눌 질문'],
  ['3–5', '같이 본다', 'Zonta · 컨벤션 방향 · 국제 상황'],
  ['6–7', '우리에게 온다', '한국·세 지역의 현실 · 이미 가진 힘'],
  ['8–10', '움직인다', '현안 · 2년 우선순위 · 첫 행동'],
]

/** A13. PPT 이야기 구조 */
export function DeckStorySlide() {
  return (
    <SlideLayout>
      <SlideKicker>자료를 나열하지 않는 법</SlideKicker>
      <SlideHeadline>10장의 순서는 이렇게 잡습니다</SlideHeadline>

      <ol className="flex flex-col gap-4">
        {STORY.map(([pages, head, body], index) => (
          <li key={pages} className={cx(`animate-rise-${index + 1}`)}>
            <Panel tone={index === STORY.length - 1 ? 'accentSoft' : 'raised'} pad="md" className="grid items-center gap-4 md:grid-cols-9 md:gap-6">
              <p className="text-deck-caption font-bold text-content-muted md:col-span-1">{pages}</p>
              <p className="text-deck-lead font-bold text-content-strong md:col-span-2">{head}</p>
              <p className="text-deck-body text-content-secondary md:col-span-6">{body}</p>
            </Panel>
          </li>
        ))}
      </ol>

      <SlideNote tone="quiet">
        제목만 이어 읽어도 하나의 주장이어야 합니다 · <Mark>한 장 = 한 메시지</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

/** A14. PPT 제작 프롬프트 */
export function PptPromptSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>근거표를 파일로 저장한 다음</SlideKicker>
          <SlideHeadline>바로 만들지 말고 제목 순서부터 확인합니다</SlideHeadline>
          <SlideBody>
            조사 에이전트와 제작 에이전트를 나누면, 새 사실을 지어내지 않고 승인된 근거만 화면과 발표자 노트로 바꿀 수 있습니다.
          </SlideBody>

          <div className="flex flex-col gap-3">
            {[
              ['입력', '청중 · 시간 · 근거표 · 템플릿'],
              ['중간 승인', '느낌 · 이해 · 행동 + 슬라이드 제목'],
              ['산출물', '화면 문구 · 노트 · 출처 · PPTX/PDF'],
            ].map(([head, body], index) => (
              <Panel key={head} tone="sunken" pad="sm" className={cx('flex items-center gap-5', `animate-rise-${index + 1}`)}>
                <PanelLabel>{head}</PanelLabel>
                <p className="text-deck-caption font-semibold text-content-secondary">{body}</p>
              </Panel>
            ))}
          </div>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-6 lg:col-span-4">
          <Sparkles className="size-10 text-accent md:size-14" />
          <PanelLabel tone="accent">Zonta PPT 제작 에이전트</PanelLabel>
          <p className="text-deck-body text-content-secondary">10장 기본 흐름 · 한 장 한 메시지 · 발표자 노트 · 출처 · 지역별 수정 지점</p>
          <PromptCopyButton size="md" label="PPT 프롬프트 복사" text={pptPrompt} />
        </Panel>
      </div>

      <SlideNote tone="quiet">
        사용하는 서비스가 파일을 못 만들면 <Mark>슬라이드 명세서</Mark>까지 받고 PowerPoint에 옮깁니다
      </SlideNote>
    </SlideLayout>
  )
}

const BUILD_FLOW = [
  { icon: Upload, head: '자료 넣기', body: '근거표 · 공식 자료 · 로고 · 기존 템플릿' },
  { icon: MessageSquareText, head: '질문에 답하기', body: '청중 · 시간 · 금지선 · 꼭 남길 말' },
  { icon: Eye, head: '제목 먼저 승인', body: '슬라이드 제목만 읽고 흐름을 고치기' },
  { icon: Download, head: '파일 받고 열기', body: 'PPTX · PDF · 출처 목록을 실제로 확인' },
]

/** A15. 라이브 제작 흐름 */
export function LiveBuildSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>강사 시연 · 지금 함께 실행</SlideKicker>
          <SlideHeadline>PPT 파일을 열어 직접 확인해야 끝입니다</SlideHeadline>
        </div>
        <Chip tone="accent">화면을 나란히 보세요</Chip>
      </div>

      <ol className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {BUILD_FLOW.map((step, index) => (
          <li key={step.head} className="contents">
            <Panel tone={index === 2 ? 'accentSoft' : 'raised'} pad="lg" className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}>
              <step.icon className="size-8 text-accent md:size-10" />
              <p className="text-deck-body font-bold text-content-strong">{step.head}</p>
              <p className="mt-auto text-deck-caption text-content-secondary">{step.body}</p>
            </Panel>
          </li>
        ))}
      </ol>

      <Panel tone="sunken" pad="md" className="animate-rise-5 flex flex-col gap-3">
        <PanelLabel>시연 중 볼 것</PanelLabel>
        <div className="flex flex-wrap gap-3">
          <Chip>에이전트가 질문하는가</Chip>
          <Chip>계획을 먼저 보여주는가</Chip>
          <Chip>파일을 실제로 만드는가</Chip>
          <Chip>불확실성을 보고하는가</Chip>
        </div>
      </Panel>
    </SlideLayout>
  )
}

/** A16. 직접 수정 실습 */
export function PptPracticeSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>직접 해보기 · 10분</SlideKicker>
          <SlideHeadline>한 장만 내 말로 바꿔봅니다</SlideHeadline>

          <ol className="flex flex-col gap-3">
            {[
              '제목이 결론인지 확인하고 내 말로 고치기',
              '화면 문장을 세 덩어리 이하로 줄이기',
              '핵심 주장 하나의 원문 링크 열어 확인하기',
              '한국에서 확인할 것은 토론 질문으로 바꾸기',
            ].map((item, index) => (
              <li key={item} className={cx('flex items-center gap-4 text-deck-body text-content-secondary', `animate-rise-${index + 1}`)}>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-raised font-bold text-content-primary shadow-raised md:size-11">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 grid place-items-center lg:col-span-4">
          <CountdownTimer seconds={600} caption="한 장 수정하기" />
        </Panel>
      </div>

      <SlideNote tone="quiet">
        수정 문장 예시 · “6장을 세 지역 회원에게 말하듯 쉽게 고쳐줘. <Mark>추가한 사실은 없게</Mark>.”
      </SlideNote>
    </SlideLayout>
  )
}

const REVIEW = [
  { icon: FileText, head: '내용', body: '제목만 읽어도 흐름이 이어지는가' },
  { icon: Link2, head: '근거', body: '핵심 사실의 링크와 날짜가 열리는가' },
  { icon: ShieldCheck, head: '경계', body: '해석과 확인 필요가 사실과 분리됐는가' },
  { icon: Presentation, head: '화면', body: '한 장 한 메시지, 뒤에서 읽히는가' },
  { icon: Users, head: '행동', body: '세 지역이 말할 질문과 첫 행동이 있는가' },
]

/** A17. PPT 완료 검수 */
export function PptReviewSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PPT 완료 조건</SlideKicker>
      <SlideHeadline>완성본은 이 다섯 가지를 확인합니다</SlideHeadline>

      <div className="grid gap-4 lg:grid-cols-5">
        {REVIEW.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 4 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <item.icon className="size-7 text-accent md:size-9" />
            <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.body}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-5 flex items-center gap-4">
        <RefreshCw className="size-7 shrink-0 text-accent md:size-9" />
        <p className="text-deck-body font-semibold text-content-primary">
          “전체를 다시 만들어줘” 대신 <Mark>어느 장 · 무엇이 문제 · 통과 기준</Mark>을 말해 한 번씩 고칩니다
        </p>
      </Panel>

      <SlideNote tone="quiet">
        저장할 파일 · <Mark>조사 보고서 + 근거표 + PPTX + PDF + 확인 필요 목록</Mark>
      </SlideNote>
    </SlideLayout>
  )
}
