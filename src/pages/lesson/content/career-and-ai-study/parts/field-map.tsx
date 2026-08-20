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
} from '../../../deck'

/** C7. 결과 같이 뜯어보기 */
export function ResultTalkSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-5">
        <MessagesSquare size={44} className="text-accent" />
        <SlideHeadline>결과, 같이 뜯어봐요</SlideHeadline>
      </div>

      <div className="grid items-center gap-5 md:gap-8 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <Panel tone="raised" pad="lg">
            <p className="text-deck-lead font-bold text-content-strong">첫 지원은 FE와 BE 중 어디예요?</p>
          </Panel>
          <Panel tone="raised" pad="lg">
            <p className="text-deck-lead font-bold text-content-strong">그 역할을 위해 먼저 보완할 건 뭐예요?</p>
          </Panel>
        </div>

        <Panel tone="sunken" pad="lg" className="lg:col-span-4">
          <CountdownTimer seconds={300} caption="이 얘기에 5분" size="md" />
        </Panel>
      </div>

      <SlideNote tone="quiet">결과보다 중요한 건 첫 역할을 하나 정하고 준비를 시작하는 거예요</SlideNote>
    </SlideLayout>
  )
}

const FIELDS = [
  {
    icon: MonitorSmartphone,
    name: '웹 프론트엔드',
    line: '보이는 화면을 만들어요',
    detail: '컴포넌트 · 상태 관리 · 반응형 · 접근성',
  },
  {
    icon: Server,
    name: '웹 백엔드',
    line: '데이터와 규칙을 다뤄요',
    detail: 'API 설계 · DB · 인증 · 성능',
  },
  {
    icon: Smartphone,
    name: '모바일 앱',
    line: '나중에 넓힐 화면 영역',
    detail: '네이티브 UI · 푸시 · 센서 · 스토어 배포',
    quiet: true,
  },
  {
    icon: Database,
    name: '데이터 · 인프라',
    line: '오늘은 이름만 알고 가요',
    detail: '파이프라인 · 클라우드 · 배포 자동화',
    quiet: true,
  },
]

/** C8. 분야 지도 */
export function FieldMapSlide() {
  return (
    <SlideLayout>
      <SlideKicker>분야 지도</SlideKicker>
      <SlideHeadline>신입 시장의 입구부터 볼게요</SlideHeadline>

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

      <SlideBody>
        국내 채용은 역할이 나뉘어 있어요. 오늘은 <Mark>FE와 BE 중 어디로 먼저 들어갈지</Mark> 좁혀요.
      </SlideBody>
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
            'flex items-center gap-5 rounded-card px-4 py-3 md:px-7 md:py-6',
            tone === 'accent' ? 'bg-surface-overlay' : 'bg-surface-base',
          )}
        >
          <span
            className={cx(
              'grid size-9 shrink-0 place-items-center rounded-full text-deck-caption font-bold md:size-12',
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

/** C9. FE의 하루 vs BE의 하루 */
export function DayInLifeSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>FE와 BE, 첫 지원은 어디로?</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="flex flex-col gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <Eye size={34} className="text-accent" />
            <PanelLabel tone="accent">FE의 하루</PanelLabel>
          </div>
          <DayList items={FE_DAY} tone="accent" />
        </Panel>

        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <Server size={34} className="text-content-muted" />
            <PanelLabel>BE의 하루</PanelLabel>
          </div>
          <DayList items={BE_DAY} tone="quiet" />
        </Panel>
      </CompareGrid>

      <Panel tone="sunken" pad="md" className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline gap-x-12 gap-y-2">
          <p className="text-deck-caption text-content-secondary">
            공고 <span className="font-bold text-content-strong">BE 16.2% · FE 11.1%</span>
          </p>
          <p className="text-deck-caption text-content-secondary">
            지원 <span className="font-bold text-content-strong">BE 23.5% · FE 15.5%</span>
          </p>
          <p className="text-deck-caption font-bold text-accent">경쟁 강도는 거의 같아요</p>
        </div>
        <p className="text-deck-meta text-content-muted">
          사람인·점핏 2025 상반기 · 공고 대비 지원 배수 FE 1.4배 · BE 1.45배
        </p>
      </Panel>

      <SlideNote>지금 고르는 것은 최종 직함이 아니라 첫 지원 직무예요</SlideNote>
    </SlideLayout>
  )
}

const TALKING_POINTS = [
  {
    head: '첫 취업은 역할을 좁혀야 해요',
    body: '여러 영역을 얕게 훑기보다 FE나 BE 하나로 기본기와 깊이를 먼저 보여줘요',
  },
  {
    head: '처음 6개월 기본기는 겹쳐요',
    body: 'HTTP · git · 자료구조 · 언어 하나. 어느 입구를 골라도 이 기초부터 탄탄히 쌓아요',
  },
  {
    head: '포트폴리오는 제품으로 말해요',
    body: '클론 여러 개보다 문제를 왜 골랐고, UX와 구조를 어떻게 판단했는지 보여줘요',
  },
  {
    head: '제품을 만들며 경계를 넓혀요',
    body: 'FE는 API·데이터를, BE는 사용자 흐름·화면을 익히며 제품 전체로 범위를 넓혀요',
  },
  {
    head: '목표는 프로덕트 엔지니어',
    body: '기획과 UX 관점에서 문제를 정하고, 필요한 영역을 직접 구현해 배포까지 책임져요',
  },
]

/** C10. 커리어 패스 토크 — 화면 접고 말로 */
export function CareerTalkSlide() {
  const [notes, setNotes] = useState(false)

  return (
    <SlideLayout>
      <div className="flex flex-col items-center gap-5 text-center md:gap-8">
        <SlideKicker>시장 진입 다음의 성장 경로</SlideKicker>
        <SlideHeadline size="hero">
          한쪽으로 들어가 <Mark>제품 전체로 넓혀요</Mark>
        </SlideHeadline>
        <button
          type="button"
          onClick={() => setNotes((value) => !value)}
          className="rounded-full bg-surface-raised px-4 py-4 text-deck-caption font-semibold text-content-secondary shadow-raised transition duration-200 ease-deck md:px-8 hover:bg-surface-highlight hover:text-content-primary"
        >
          {notes ? '노트 접기' : '말할 거리 펼치기'}
        </button>
      </div>

      {notes ? (
        <ul className="animate-fade grid gap-4 lg:grid-cols-2">
          {TALKING_POINTS.map((point, index) => (
            <li
              key={point.head}
              className={cx(
                'flex flex-col gap-2 rounded-card bg-surface-raised p-4 shadow-raised md:p-7',
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

/** C11. 휴식 */
export function BreakSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col items-center gap-5 text-center md:gap-10">
        <SlideKicker>휴식</SlideKicker>
        <CountdownTimer seconds={300} autoStart caption="다시 시작까지" />
        <p className="max-w-4xl text-deck-lead font-semibold text-content-primary">
          제품 전체를 구현하려면 먼저 한 영역의 기본기가 단단해야 해요. 2부에서 그 훈련 구조를 만들어요.
        </p>
      </div>

      <SlideNote tone="quiet">
        노트북은 켜둔 채로 쉬어요 · 이어서 <Mark>PART 2 · AI 시대 개발 공부법</Mark>
      </SlideNote>
    </SlideLayout>
  )
}
