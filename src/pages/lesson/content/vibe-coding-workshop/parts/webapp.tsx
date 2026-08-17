import { BookOpen, ChefHat, MousePointerClick, Sparkles, Utensils } from 'lucide-react'
import { useState } from 'react'
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
} from '@/features/slide-deck'

const READ_ONLY = [
  { name: '뉴스', why: '기사를 읽기만 합니다' },
  { name: '블로그', why: '글이 그대로 놓여 있습니다' },
  { name: '회사 소개', why: '내용이 바뀌지 않습니다' },
]

const INTERACTIVE = [
  { name: '지메일', why: '내가 쓴 메일이 저장되고 전송됩니다' },
  { name: '지도', why: '내 위치에 반응해 경로를 계산합니다' },
  { name: '인스타그램', why: '올리고, 누르고, 반응이 남습니다' },
]

/** S5. 웹사이트 vs 웹 앱 */
export function SiteVsAppSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>웹사이트와 웹 앱, 뭐가 다를까요?</SlideHeadline>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <BookOpen size={34} className="text-content-muted" />
            <PanelLabel>웹사이트 — 읽는 것</PanelLabel>
          </div>
          <ul className="flex flex-1 flex-col gap-4">
            {READ_ONLY.map((item) => (
              <li
                key={item.name}
                className="group rounded-card bg-surface-base px-8 py-6 transition duration-300 ease-deck hover:bg-surface-raised"
              >
                <p className="text-deck-body font-semibold text-content-primary">{item.name}</p>
                <p className="max-h-0 overflow-hidden text-deck-caption text-content-muted opacity-0 transition-all duration-300 ease-deck group-hover:max-h-24 group-hover:opacity-100">
                  {item.why}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-deck-body font-bold text-content-secondary">보기만 함</p>
        </Panel>

        <Panel tone="raised" pad="lg" className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <MousePointerClick size={34} className="text-accent" />
            <PanelLabel tone="accent">웹 앱 — 쓰는 것</PanelLabel>
          </div>
          <ul className="flex flex-1 flex-col gap-4">
            {INTERACTIVE.map((item) => (
              <li
                key={item.name}
                className="group rounded-card bg-surface-overlay px-8 py-6 transition duration-300 ease-deck hover:bg-surface-highlight"
              >
                <p className="text-deck-body font-semibold text-content-strong">{item.name}</p>
                <p className="max-h-0 overflow-hidden text-deck-caption text-content-secondary opacity-0 transition-all duration-300 ease-deck group-hover:max-h-24 group-hover:opacity-100">
                  {item.why}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-deck-body font-bold text-content-strong">입력 · 저장 · 반응</p>
        </Panel>
      </CompareGrid>

      <SlideNote>오늘 만드는 것 = 웹 앱</SlideNote>
    </SlideLayout>
  )
}

type ToggleRowProps = {
  title: string
  role: string
  on: boolean
  locked?: boolean
  lockedLabel?: string
  onToggle: () => void
}

function ToggleRow({ title, role, on, locked, lockedLabel, onToggle }: ToggleRowProps) {
  return (
    <div
      className={cx(
        'flex items-center justify-between gap-6 rounded-card p-7 transition duration-300 ease-deck',
        on ? 'bg-surface-overlay' : 'bg-surface-sunken inset-shadow-sunken',
      )}
    >
      <div className="flex flex-col gap-1">
        <p className={cx('text-deck-body font-bold', on ? 'text-content-strong' : 'text-content-muted')}>{title}</p>
        <p className="text-deck-caption text-content-muted">{locked ? lockedLabel : role}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={title}
        disabled={locked}
        onClick={onToggle}
        className={cx(
          'flex h-14 w-26 shrink-0 items-center rounded-full p-2 transition duration-300 ease-deck',
          on ? 'bg-accent' : 'bg-surface-highlight',
          locked ? 'opacity-60' : 'hover:brightness-110',
        )}
      >
        <span
          className={cx(
            'size-10 rounded-full bg-surface-inverse shadow-raised transition-transform duration-300 ease-deck',
            on ? 'translate-x-12' : 'translate-x-0',
          )}
        />
      </button>
    </div>
  )
}

/** S6. ⭐ 웹 앱의 3가지 재료 — 토글로 직접 꺼보는 화면 */
export function IngredientsSlide() {
  const [css, setCss] = useState(true)
  const [js, setJs] = useState(true)
  const [count, setCount] = useState(0)

  return (
    <SlideLayout>
      <div className="flex flex-col gap-4">
        <SlideKicker>웹 앱의 재료</SlideKicker>
        <SlideHeadline>스위치를 꺼 보면 바로 알 수 있습니다</SlideHeadline>
      </div>

      <div className="grid items-stretch gap-8 lg:grid-cols-9">
        <div className="lg:col-span-5">
          {css ? (
            <Panel tone="raised" pad="lg" className="flex h-full flex-col items-center justify-center gap-7">
              <PanelLabel tone="accent">카운터 앱</PanelLabel>
              <p className="text-deck-numeric font-bold tabular-nums text-content-strong">{count}</p>
              <button
                type="button"
                onClick={() => js && setCount((value) => value + 1)}
                className="rounded-control bg-accent px-12 py-6 text-deck-body font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck hover:bg-accent-strong"
              >
                +1 누르기
              </button>
              <p className="text-deck-caption text-content-muted">
                {js ? '버튼을 누르면 숫자가 올라갑니다' : '버튼은 그대로인데, 눌러도 아무 반응이 없습니다'}
              </p>
            </Panel>
          ) : (
            /* CSS를 끈 상태 — 일부러 못생기게 보여주는 것이 목적이라 이 블록만 디자인 규칙의 예외다. */
            <div className="flex h-full flex-col justify-center gap-2 bg-surface-inverse p-6 font-serif text-content-inverse">
              <p className="text-deck-caption underline">카운터 앱</p>
              <p className="text-deck-body">{count}</p>
              <button
                type="button"
                onClick={() => js && setCount((value) => value + 1)}
                className="w-fit bg-primary-200 px-2 py-1 text-deck-caption text-content-inverse"
              >
                +1 누르기
              </button>
              <p className="text-deck-caption">스타일이 사라지면 이렇게 됩니다.</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 lg:col-span-4">
          <ToggleRow
            title="HTML (내용)"
            role="글자와 버튼, 앱의 뼈대"
            on
            locked
            lockedLabel="뼈대라서 못 뺍니다"
            onToggle={() => undefined}
          />
          <ToggleRow title="CSS (디자인)" role="색, 크기, 모양" on={css} onToggle={() => setCss((value) => !value)} />
          <ToggleRow
            title="JavaScript (기능)"
            role="누르면 반응하는 동작"
            on={js}
            onToggle={() => setJs((value) => !value)}
          />
        </div>
      </div>

      <SlideNote tone="quiet">
        메뉴판 글자 <Mark>HTML</Mark> · 메뉴판 디자인 <Mark>CSS</Mark> · 주문 시스템 <Mark>JS</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const CONTEXT_MENU = ['뒤로 가기', '새로고침', '다른 이름으로 저장', '페이지 소스 보기', '검사']

/** S7. 페이지 소스 보기 데모 안내 */
export function ViewSourceSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SlideKicker>직접 확인해 봅시다</SlideKicker>
          <SlideHeadline size="hero">지금 보고 계신 이 화면도 코드입니다</SlideHeadline>
          <SlideBody>마우스 우클릭 → 페이지 소스 보기</SlideBody>
        </div>

        <Panel tone="overlay" pad="sm" className="animate-rise-2 flex flex-col gap-1 lg:col-span-4">
          {CONTEXT_MENU.map((item) => {
            const highlighted = item === '페이지 소스 보기'
            return (
              <p
                key={item}
                className={cx(
                  'rounded-control px-7 py-4 text-deck-caption transition duration-300 ease-deck',
                  highlighted ? 'animate-breathe bg-accent font-bold text-accent-contrast' : 'text-content-secondary',
                )}
              >
                {item}
              </p>
            )
          })}
        </Panel>
      </div>

      <SlideNote>그리고 오늘, 이 코드를 한 줄도 직접 쓰지 않습니다</SlideNote>
    </SlideLayout>
  )
}

/** S8. 프론트엔드와 백엔드 — 30초만 쓰는 화면 */
export function FrontBackSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>식당으로 비유하면</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Utensils size={34} className="text-accent" />
            <PanelLabel tone="accent">홀 — 프론트엔드</PanelLabel>
          </div>
          <p className="text-deck-lead font-bold text-content-strong">손님에게 보이는 부분</p>
          <p className="text-deck-body text-content-secondary">테이블, 메뉴판, 인테리어. 눌리고 보이는 모든 것.</p>
        </Panel>

        <Panel tone="sunken" pad="lg" className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <ChefHat size={34} className="text-content-muted" />
            <PanelLabel>주방 — 백엔드</PanelLabel>
          </div>
          <p className="text-deck-lead font-bold text-content-secondary">데이터를 저장하고 처리하는 곳</p>
          <p className="text-deck-body text-content-muted">회원 정보, 결제, 주문 기록. 손님 눈에는 보이지 않습니다.</p>
        </Panel>
      </CompareGrid>

      <SlideNote>
        <span className="inline-flex items-center gap-3">
          <Sparkles size={30} />
          오늘 실습 = 주방 없이 홀만으로 완성되는 카페 ☕
        </span>
      </SlideNote>
    </SlideLayout>
  )
}
