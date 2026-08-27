import {
  BarChart3,
  BookOpenText,
  CircleCheck,
  ClipboardCheck,
  FileSearch,
  Hand,
  Languages,
  Mail,
  Megaphone,
  MessageCircle,
  Newspaper,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UserRoundSearch,
  Users,
  Waypoints,
} from 'lucide-react'
import {
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

const US_CHANNELS = [
  { icon: UserRoundSearch, name: '고객 발견', detail: '인터뷰 · 리뷰 · 커뮤니티 · 경쟁사 조사' },
  { icon: Search, name: '검색 수요', detail: '전문 지식 기반 SEO · Google Search Ads' },
  { icon: BookOpenText, name: '신뢰 콘텐츠', detail: '영문 사례 · 가이드 · 뉴스레터 · 웨비나' },
  { icon: Users, name: '관계 유통', detail: '협회 · 파트너 · 팟캐스트 · 업계 커뮤니티' },
  { icon: Mail, name: '적합한 리드', detail: '폼 · CRM · 허용된 이메일 후속 · 소개' },
  { icon: BarChart3, name: '전환과 유지', detail: '랜딩페이지 · 온보딩 · 추천 · 실험 분석' },
]

/** W21. 미국 마케팅 가능성 지도 */
export function UsMarketingChannelsSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>미국 고객에게 닿는 길은 광고 하나가 아닙니다</SlideKicker>
          <SlideHeadline>여섯 개 입구를 열어두고 비교합니다</SlideHeadline>
        </div>
        <Chip>오늘은 채널 선택 전 탐색</Chip>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {US_CHANNELS.map((channel, index) => (
          <Panel
            key={channel.name}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex items-center gap-5', `animate-rise-${Math.min(index + 1, 5)}`)}
          >
            <channel.icon className="size-9 shrink-0 text-accent md:size-11" />
            <div className="min-w-0">
              <p className="text-deck-body font-bold text-content-strong">{channel.name}</p>
              <p className="text-deck-caption text-content-secondary">{channel.detail}</p>
            </div>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        먼저 정할 것 · <Mark>미국의 어떤 고객이 어떤 문제 때문에 우리를 찾는가?</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const GROWTH_ROLES = [
  { icon: FileSearch, role: 'Market Researcher', output: '고객·경쟁·키워드 근거' },
  { icon: Languages, role: 'Content Localizer', output: '교수님 지식 → 미국식 영문 초안' },
  { icon: Target, role: 'Lead · CRM', output: '문의 분류 · 점수 · 다음 행동' },
  { icon: Mail, role: 'Nurture', output: '이메일·후속 메시지 초안' },
  { icon: BarChart3, role: 'Analyst', output: '전환 · 비용 · 주간 인사이트' },
  { icon: ShieldCheck, role: 'Compliance', output: '주장 · 출처 · 동의 · 수신 거부' },
]

/** W22. 마케팅 에이전트 조직 */
export function MarketingAgentTeamSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>하나의 성장팀, 서로 다른 책임</SlideKicker>
          <SlideHeadline>에이전트가 조사하고 교수님이 목소리를 정합니다</SlideHeadline>
        </div>
        <Chip tone="accent">교수님 = 편집장</Chip>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {GROWTH_ROLES.map((item, index) => (
          <Panel
            key={item.role}
            tone={index === GROWTH_ROLES.length - 1 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex items-center gap-5', `animate-rise-${Math.min(index + 1, 5)}`)}
          >
            <item.icon className="size-9 shrink-0 text-accent md:size-11" />
            <div className="min-w-0">
              <p className="text-deck-body font-bold text-content-strong">{item.role}</p>
              <p className="text-deck-caption text-content-secondary">{item.output}</p>
            </div>
          </Panel>
        ))}
      </div>

      <SlideBody>처음에는 여섯 에이전트가 아니라, 한 에이전트 안에서 역할별 결과물을 구분해도 충분합니다.</SlideBody>
    </SlideLayout>
  )
}

const AUTOMATION_IDEAS = [
  { icon: Newspaper, name: '주간 시장 브리프', detail: '경쟁사·뉴스·고객 신호를 출처와 함께 요약' },
  { icon: Sparkles, name: '콘텐츠 재가공', detail: '전공 원자료 하나를 글·메일·영상 대본 초안으로' },
  { icon: Target, name: 'SEO 기회 레이더', detail: '검색 질문과 기존 콘텐츠의 빈틈을 후보로 정리' },
  { icon: Waypoints, name: '리드 분류', detail: '폼 문의를 고객상·관심·긴급도별로 CRM에 제안' },
  { icon: Mail, name: '후속 초안', detail: '상황에 맞는 개인화 메일을 만들고 발송 전 대기' },
  { icon: BarChart3, name: '성과 보고', detail: '유입·전환·비용을 묶어 다음 실험 하나를 제안' },
]

/** W23. 마케팅 자동화 후보 갤러리 */
export function MarketingAutomationGallerySlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>처음부터 완전자동으로 가지 않습니다</SlideKicker>
          <SlideHeadline>초안과 보고서부터 자동화합니다</SlideHeadline>
        </div>
        <Chip>후보 6개 · 오늘 설치 0개</Chip>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {AUTOMATION_IDEAS.map((idea, index) => (
          <Panel
            key={idea.name}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex flex-col gap-4', `animate-rise-${Math.min(index + 1, 5)}`)}
          >
            <idea.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-body font-bold text-content-strong">{idea.name}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{idea.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        첫 파일럿 추천 · <Mark>주간 시장 브리프 또는 콘텐츠 초안</Mark>처럼 외부 행동이 없는 일
      </SlideNote>
    </SlideLayout>
  )
}

const MARKETING_LOOP = [
  { icon: MessageCircle, name: '듣기', detail: '고객 신호' },
  { icon: FileSearch, name: '조사', detail: '근거 수집' },
  { icon: Sparkles, name: '초안', detail: '콘텐츠·후속' },
  { icon: Hand, name: '승인', detail: '주장·대상·예산' },
  { icon: Megaphone, name: '실행', detail: '공식 채널' },
  { icon: BarChart3, name: '측정', detail: '전환·비용' },
  { icon: ClipboardCheck, name: '학습', detail: '다음 실험' },
]

/** W24. 미국 마케팅 자동화 한 바퀴 */
export function MarketingControlLoopSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>많이 발행하는 기계보다 잘 배우는 시스템</SlideKicker>
          <SlideHeadline>듣기에서 다음 실험까지 한 바퀴</SlideHeadline>
        </div>
        <Chip>전환 측정이 먼저</Chip>
      </div>

      <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-7">
        {MARKETING_LOOP.map((step, index) => (
          <li key={step.name}>
            <Panel
              tone={index === 3 ? 'accent' : 'raised'}
              pad="sm"
              className={cx('flex h-full flex-col gap-3', `animate-rise-${Math.min(index + 1, 5)}`)}
            >
              <span className={cx('text-deck-caption font-semibold', index === 3 ? 'text-accent-contrast/70' : 'text-content-muted')}>
                {index + 1}
              </span>
              <step.icon className={cx('size-7 md:size-9', index === 3 ? 'text-accent-contrast' : 'text-accent')} />
              <p className={cx('text-deck-body font-bold', index === 3 ? 'text-accent-contrast' : 'text-content-strong')}>{step.name}</p>
              <p className={cx('mt-auto text-deck-caption', index === 3 ? 'text-accent-contrast/80' : 'text-content-secondary')}>{step.detail}</p>
            </Panel>
          </li>
        ))}
      </ol>

      <div className="grid gap-3 lg:grid-cols-3">
        {[
          'CAN-SPAM · 발신 정보와 수신 거부',
          'LinkedIn · 봇 게시·메시지·스크래핑 금지',
          '광고·전문 주장 · 근거와 사람 승인',
        ].map((rule) => (
          <Panel key={rule} tone="sunken" pad="sm" className="flex items-center gap-4">
            <CircleCheck className="size-6 shrink-0 text-positive md:size-8" />
            <p className="text-deck-caption font-semibold text-content-secondary">{rule}</p>
          </Panel>
        ))}
      </div>
    </SlideLayout>
  )
}
