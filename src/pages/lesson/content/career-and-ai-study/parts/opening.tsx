import { ArrowRight, Compass, Search, TrendingDown } from 'lucide-react'
import { useState } from 'react'
import {
  CheckRow,
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

/** C0. 시작 전 — 설치 확인 */
export function StandbySlide() {
  const [checks, setChecks] = useState([false, false, false, false])
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-5">
          <SlideKicker>오늘 수업</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            진로 찾기 &amp;
            <br />
            <Mark>AI 시대 개발 공부법</Mark>
          </h1>
          <SlideBody>2부는 같이 손을 써요. 시작 전에 옆에 네 가지만 확인할게요.</SlideBody>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>설치 확인</PanelLabel>
          <CheckRow checked={checks[0]} onToggle={() => toggle(0)} hint="쓰고 있는 LLM 아무거나 · 로그인까지">
            LLM 계정
          </CheckRow>
          <CheckRow checked={checks[1]} onToggle={() => toggle(1)} hint="터미널에서 명령어가 실행되는지">
            코딩 CLI 설치
          </CheckRow>
          <CheckRow checked={checks[2]} onToggle={() => toggle(2)} hint="git --version · python3 --version">
            git &amp; python3
          </CheckRow>
          <CheckRow checked={checks[3]} onToggle={() => toggle(3)} hint="레슨 뷰어를 띄우는 데 필요해요">
            node &amp; pnpm
          </CheckRow>
        </Panel>
      </div>

      <div className="animate-rise-3 grid gap-5 lg:grid-cols-2">
        <Panel tone="sunken" pad="md" className="flex items-center gap-5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-14">
            1
          </span>
          <p className="text-deck-caption text-content-secondary">
            오늘 가져갈 것 ① 시장에 들어갈 <span className="text-content-strong">첫 역할</span>
          </p>
        </Panel>
        <Panel tone="sunken" pad="md" className="flex items-center gap-5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-14">
            2
          </span>
          <p className="text-deck-caption text-content-secondary">
            오늘 가져갈 것 ② 기본기를 쌓을 <span className="text-content-strong">학습 레포</span>
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

/**
 * 실제 게시글에서 추린 것. 국내는 OKKY 본문, 해외는 스레드 제목을 옮겼다.
 * - okky.kr/articles/1516395 (6개월차 신입) · okky.kr/articles/1535768
 * - r/learnprogramming "Choosing my IT path feels harder than learning to code",
 *   "1st Year CS Student ... AI is making me rethink everything"
 * - r/cscareerquestions "Two years into AI coding tools the actual harm isn't job
 *   displacement, it's that mid-level engineers can no longer explain what they built"
 */
const VOICES = [
  {
    source: 'OKKY · 6개월차 신입',
    quote: '구현은 거의 지피티한테 시켜요. 이게 맞나 싶어요',
    tail: '방법은 아는데 코드로 안 나온대요',
  },
  {
    source: 'OKKY · 주니어',
    quote: '신입을 거의 안 뽑는다는데, 제가 막차인가 싶어요',
    tail: 'CS 전공에 부트캠프까지 마친 사람 얘기예요',
  },
  {
    source: 'r/learnprogramming',
    quote: '진로 정하는 게 코딩 배우는 것보다 어렵네요',
    tail: '풀스택 하려다 AI 보고 흔들린 1학년도 있어요',
  },
  {
    source: 'r/cscareerquestions',
    quote: '진짜 문제는 일자리가 아니라, 만든 걸 설명 못 하는 거예요',
    tail: 'AI 코딩 도구 2년 만에 나온 결론이에요',
  },
]

/** C1. 오프닝 — 커뮤니티가 하는 이야기 */
export function WorriesSlide() {
  return (
    <SlideLayout>
      <SlideKicker>오프닝</SlideKicker>
      <SlideHeadline>요즘 개발자 커뮤니티 의견</SlideHeadline>

      <div className="grid gap-5 lg:grid-cols-2">
        {VOICES.map((voice, index) => (
          <Panel
            key={voice.quote}
            tone={index === 3 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <PanelLabel tone={index === 3 ? 'accent' : 'muted'}>{voice.source}</PanelLabel>
            <p className="text-deck-body font-semibold text-content-strong">&ldquo;{voice.quote}&rdquo;</p>
            <p className="text-deck-caption text-content-secondary">{voice.tail}</p>
          </Panel>
        ))}
      </div>

      <p className="text-deck-meta text-content-muted">
        OKKY 게시글 본문 · Reddit r/learnprogramming, r/cscareerquestions 최근 1년 상위 스레드에서 추림
      </p>

      <SlideBody>
        걱정의 모양은 달라도 질문은 하나예요.{' '}
        <Mark>어떤 역할로 시장에 들어가고, 어디까지 성장할 것인가.</Mark>
      </SlideBody>
    </SlideLayout>
  )
}

const SHIFT = [
  {
    head: '신입 공고 vs 신입 지원',
    stat: '0.8% vs 29.5%',
    body: '개발 공고 중 신입은 0.8%, 지원자 중 신입은 29.5%. 열린 자리가 지원자 비중에 비해 아주 적어요',
    tone: 'sunken' as const,
  },
  {
    head: '5~10년차 공고 비중',
    stat: '39.7%',
    body: '공고의 39.7%가 5~10년차예요. 기업은 복잡한 일을 바로 맡길 수 있는 경력자를 더 많이 찾고 있어요',
    tone: 'sunken' as const,
  },
  {
    head: '2026 선호 직군 1위',
    stat: '28.1%',
    body: '2026년에 기업이 가장 뽑고 싶은 직군은 여전히 개발이에요. 문이 닫힌 게 아니라 옮겨간 거예요',
    tone: 'accentSoft' as const,
  },
]

/** C2. 시장 얘기 정면 돌파 — 붕괴가 아니라 개편 */
export function MarketShiftSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <TrendingDown size={44} className="text-critical" />
        <SlideKicker>시장 얘기부터 하고 갈게요</SlideKicker>
      </div>
      <SlideHeadline>
        시장이 망한 게 아니라 <Mark>개편</Mark>되는 중이에요
      </SlideHeadline>

      <div className="grid gap-5 lg:grid-cols-3">
        {SHIFT.map((item, index) => (
          <Panel
            key={item.head}
            tone={item.tone}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <PanelLabel tone={item.tone === 'accentSoft' ? 'accent' : 'muted'}>{item.head}</PanelLabel>
            <p className="text-deck-lead font-bold tabular-nums text-content-strong">{item.stat}</p>
            <p className="text-deck-caption text-content-secondary">{item.body}</p>
          </Panel>
        ))}
      </div>

      <p className="text-deck-meta text-content-muted">
        사람인·점핏 「2025 상반기 개발자 채용 리포트」 (공고 10만 건 · 입사지원 260만 건) · 원티드랩 「2026 채용 트렌드
        서베이」 (기업 153곳)
      </p>

      <SlideNote>신입에게 필요한 건 시키는 대로 코드만 치는 능력보다, 문제를 판단하고 구현하는 힘이에요</SlideNote>
    </SlideLayout>
  )
}

const PE_BEFORE = [
  '요구받은 기능만 만들어요',
  '내 코드 범위만 책임져요',
  '기획과 디자인은 내 일이 아니라고 봐요',
]
const PE_AFTER = [
  '사용자 문제와 요구사항부터 이해해요',
  '기획 의도와 UX를 함께 보고 구현해요',
  '아이디어부터 배포까지 직접 책임져요',
]

/** C3. 개편의 결과 — 프로덕트 엔지니어 */
export function ProductEngineerSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <Search size={44} className="text-accent" />
        <SlideKicker>신입 때부터 목표로 둘 역할</SlideKicker>
      </div>
      <SlideHeadline size="hero">프로덕트 엔지니어</SlideHeadline>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 md:gap-6">
          <PanelLabel>기능 구현에 머문 기준</PanelLabel>
          <ul className="flex flex-1 flex-col gap-4">
            {PE_BEFORE.map((item) => (
              <li key={item} className="text-deck-body text-content-secondary line-through decoration-content-muted">
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 md:gap-6">
          <PanelLabel tone="accent">우리가 키울 기준</PanelLabel>
          <ul className="flex flex-1 flex-col gap-4">
            {PE_AFTER.map((item) => (
              <li key={item} className="text-deck-body font-semibold text-content-strong">
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </CompareGrid>

      <SlideBody>
        신입 때는 FE나 BE로 시작해도, 최종 목표는 <Mark>제품을 끝까지 구현하는 개발자</Mark>예요.
      </SlideBody>
    </SlideLayout>
  )
}

const CHAIN = ['FE·BE 중 하나 선택', '주력 기술 기본기', '제품 구현 범위 확장', '프로덕트 엔지니어']

/** C4. 오늘의 프레임 — FE·BE는 입구, 목표는 프로덕트 엔지니어 */
export function FrameSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <Compass size={44} className="text-accent" />
        <SlideHeadline>
          입구는 <span className="text-content-secondary">FE·BE</span>, 목표는 <Mark>프로덕트 엔지니어</Mark>
        </SlideHeadline>
      </div>

      <Panel tone="sunken" pad="lg" className="animate-rise-2">
        <p className="text-deck-body text-content-secondary">
          국내 신입 채용은 역할이 FE와 BE로 나뉘는 경우가 많아요. 처음부터 풀스택을 내세우기보다{' '}
          <span className="text-content-strong">하나로 깊이를 먼저 보여주는 편</span>이 현실적이에요.
        </p>
      </Panel>

      {/* 8칸 = (칩 2칸 + 화살표) × 3 + 마지막 칩 2칸. 마지막만 좁아져 두 줄이 되는 걸 막는다 */}
      <ol className="grid gap-4 lg:grid-cols-8">
        {CHAIN.map((step, index) => (
          <li
            key={step}
            className={cx(
              'flex items-center gap-4 lg:col-span-2',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <span
              className={cx(
                'flex-1 rounded-card px-4 py-3 text-deck-caption font-bold md:px-7 md:py-6',
                index === CHAIN.length - 1
                  ? 'bg-accent text-accent-contrast shadow-lifted'
                  : 'bg-surface-raised text-content-primary shadow-raised',
              )}
            >
              {step}
            </span>
            {index < CHAIN.length - 1 ? <ArrowRight size={28} className="shrink-0 text-content-muted" /> : null}
          </li>
        ))}
      </ol>

      <SlideBody>
        성향 검사는 평생 할 일을 정하는 시험이 아니에요. <Mark>어느 역할부터 준비할지</Mark> 좁히는 도구예요.
      </SlideBody>
    </SlideLayout>
  )
}
