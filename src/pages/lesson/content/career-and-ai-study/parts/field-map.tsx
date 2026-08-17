import { Database, Eye, MessagesSquare, MonitorSmartphone, Server, Smartphone } from 'lucide-react'
import { useState } from 'react'
import {
  CompareGrid,
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
} from '@/features/slide-deck'

/** C6. 결과 나눔 — 짝 토론 */
export function PairTalkSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <MessagesSquare size={44} className="text-accent" />
        <SlideHeadline>옆 사람과 5분</SlideHeadline>
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <Panel tone="raised" pad="lg">
            <p className="text-deck-lead font-bold text-content-strong">결과에 동의하나요?</p>
          </Panel>
          <Panel tone="raised" pad="lg">
            <p className="text-deck-lead font-bold text-content-strong">의외였던 문항은 뭐였나요?</p>
          </Panel>
        </div>

        <Panel tone="sunken" pad="lg" className="lg:col-span-4">
          <CountdownTimer seconds={300} caption="짝 토론" size="md" />
        </Panel>
      </div>

      <SlideNote tone="quiet">끝나면 2~3명, 전체와 나눠봅시다</SlideNote>
    </SlideLayout>
  )
}

const FIELDS = [
  {
    icon: MonitorSmartphone,
    name: '웹 프론트엔드',
    line: '사용자가 만지는 화면을 만든다',
    detail: '컴포넌트, 상태 관리, 반응형, 접근성',
  },
  {
    icon: Server,
    name: '웹 백엔드',
    line: '데이터와 규칙을 다룬다',
    detail: 'API 설계, DB, 인증, 성능',
  },
  {
    icon: Smartphone,
    name: '모바일 앱',
    line: '기기 기능까지 쓰는 앱을 만든다',
    detail: '네이티브 UI, 푸시, 카메라·센서, 스토어 배포',
  },
  {
    icon: Database,
    name: '데이터 · 인프라',
    line: '오늘은 이름만 알고 갑시다',
    detail: '데이터 파이프라인, 클라우드, 배포 자동화',
    quiet: true,
  },
]

/** C7. 분야 지도 */
export function FieldMapSlide() {
  return (
    <SlideLayout>
      <SlideKicker>분야 지도</SlideKicker>
      <SlideHeadline>선택지는 이 정도입니다</SlideHeadline>

      <div className="grid gap-5 lg:grid-cols-4">
        {FIELDS.map((field, index) => (
          <Panel
            key={field.name}
            tone={field.quiet ? 'sunken' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <field.icon size={38} className={field.quiet ? 'text-content-muted' : 'text-accent'} />
            <p className={cx('text-deck-body font-bold', field.quiet ? 'text-content-secondary' : 'text-content-strong')}>
              {field.name}
            </p>
            <p className="text-deck-caption font-semibold text-content-primary">{field.line}</p>
            <p className="mt-auto text-deck-caption text-content-muted">{field.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>기술 스택 말고, 하루가 어떻게 흘러가는지로 보겠습니다.</SlideBody>
    </SlideLayout>
  )
}

const FE_DAY = ['디자이너와 시안 논의', '컴포넌트 구현', '크로스브라우징 확인']
const BE_DAY = ['API 설계', '쿼리 튜닝', '장애 로그 추적']

function DayList({ items, tone }: { items: string[]; tone: 'accent' | 'quiet' }) {
  return (
    <ol className="flex flex-1 flex-col gap-4">
      {items.map((item, index) => (
        <li
          key={item}
          className={cx(
            'flex items-center gap-5 rounded-card px-7 py-6',
            tone === 'accent' ? 'bg-surface-overlay' : 'bg-surface-base',
          )}
        >
          <span
            className={cx(
              'grid size-12 shrink-0 place-items-center rounded-full text-deck-caption font-bold',
              tone === 'accent' ? 'bg-accent text-accent-contrast' : 'bg-surface-highlight text-content-primary',
            )}
          >
            {index + 1}
          </span>
          <span className="text-deck-body font-semibold text-content-strong">{item}</span>
        </li>
      ))}
    </ol>
  )
}

/** C8. FE의 하루 vs BE의 하루 */
export function DayInLifeSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>어느 쪽 하루가 더 끌리나요?</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Eye size={34} className="text-accent" />
            <PanelLabel tone="accent">FE의 하루</PanelLabel>
          </div>
          <DayList items={FE_DAY} tone="accent" />
        </Panel>

        <Panel tone="sunken" pad="lg" className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Server size={34} className="text-content-muted" />
            <PanelLabel>BE의 하루</PanelLabel>
          </div>
          <DayList items={BE_DAY} tone="quiet" />
        </Panel>
      </CompareGrid>

      <SlideNote>여러분이 상상한 하루와 어느 쪽이 가까운가요?</SlideNote>
    </SlideLayout>
  )
}

const TALKING_POINTS = [
  {
    head: '처음 6개월은 어느 길이든 겹친다',
    body: 'HTTP, git, 자료구조 기초, 하나의 언어 제대로 — 지금 결정이 평생 결정이 아닙니다',
  },
  {
    head: '시장 얘기 정면 돌파',
    body: '채용 공고는 지금의 수요지, 여러분 졸업 시점의 수요가 아닙니다',
  },
  {
    head: '포트폴리오',
    body: '클론 코딩 나열보다 "어떤 문제를 왜 이렇게 풀었나" 서사 1~2개',
  },
  {
    head: '전환 비용은 생각보다 낮다',
    body: '겹치는 근육 — 디버깅, 코드 읽기, 커뮤니케이션',
  },
  {
    head: 'AI 시대에 신입에게 남는 것',
    body: '코드 생산은 싸졌고, 읽고 판단하는 능력이 병목입니다 → 2부로',
  },
]

/** C9. 커리어 패스 토크 — 화면 없이 구두 진행 */
export function CareerTalkSlide() {
  const [notes, setNotes] = useState(false)

  return (
    <SlideLayout>
      <div className="flex flex-col items-center gap-8 text-center">
        <SlideKicker>20분 · 커리어 패스 토크</SlideKicker>
        <SlideHeadline size="hero">
          여기서부터는 화면 말고, <Mark>저를 보세요</Mark>
        </SlideHeadline>
        <button
          type="button"
          onClick={() => setNotes((value) => !value)}
          className="rounded-full bg-surface-raised px-8 py-4 text-deck-caption font-semibold text-content-secondary shadow-raised transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary"
        >
          {notes ? '스피커 노트 접기' : '스피커 노트 펼치기 (강사용)'}
        </button>
      </div>

      {notes ? (
        <ul className="animate-fade grid gap-4 lg:grid-cols-2">
          {TALKING_POINTS.map((point, index) => (
            <li
              key={point.head}
              className={cx(
                'flex flex-col gap-2 rounded-card bg-surface-raised p-7 shadow-raised',
                index === TALKING_POINTS.length - 1 && 'lg:col-span-2',
              )}
            >
              <p className="text-deck-caption font-bold text-accent">{point.head}</p>
              <p className="text-deck-caption text-content-secondary">{point.body}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </SlideLayout>
  )
}

/** C10. 휴식 */
export function BreakSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col items-center gap-10 text-center">
        <SlideKicker>휴식</SlideKicker>
        <CountdownTimer seconds={300} autoStart caption="다시 모이기까지" />
        <p className="text-deck-lead font-semibold text-content-primary">
          2부는 손을 씁니다. 노트북 켜두고 오세요.
        </p>
      </div>

      <SlideNote tone="quiet">
        다음은 <Mark>PART 2 · AI 시대 개발 공부법</Mark>
      </SlideNote>
    </SlideLayout>
  )
}
