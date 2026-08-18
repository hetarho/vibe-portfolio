import type { ReactNode } from 'react'

/** className 조합 헬퍼 — 조건부 클래스에서 falsy 값을 걸러낸다. */
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

type SlideLayoutProps = {
  children: ReactNode
  /** center: 세로 가운데 정렬(기본) / top: 위에서부터 채움 */
  align?: 'center' | 'top'
}

export function SlideLayout({ children, align = 'center' }: SlideLayoutProps) {
  return (
    <section
      className={cx(
        // grow: 부모(DeckShell의 flex 래퍼) 높이만큼 늘어나야 justify-center가 산다.
        //   min-h-full은 부모 높이가 auto로 풀리는 구간이 있어 혼자서는 못 믿는다.
        // h-full을 쓰지 않는 이유: 내용이 화면보다 길어지는 모바일에서
        //   가운데 정렬 때문에 위쪽이 스크롤로 닿지 않는 곳으로 밀려난다.
        'mx-auto flex w-full max-w-stage grow flex-col gap-5 py-2 md:gap-8 md:py-0',
        align === 'center' ? 'justify-center' : 'justify-start',
      )}
    >
      {children}
    </section>
  )
}

export function SlideKicker({ children }: { children: ReactNode }) {
  return (
    <p className="animate-rise flex items-center gap-2 text-deck-caption font-semibold tracking-widest text-content-muted uppercase md:gap-3">
      <span className="size-2 rounded-full bg-accent md:size-3" aria-hidden />
      {children}
    </p>
  )
}

type HeadlineProps = {
  children: ReactNode
  size?: 'hero' | 'title'
}

export function SlideHeadline({ children, size = 'title' }: HeadlineProps) {
  return (
    <h2
      className={cx(
        'animate-rise-1 max-w-column font-bold tracking-tight text-balance text-content-strong',
        size === 'hero' ? 'text-deck-hero' : 'text-deck-title',
      )}
    >
      {children}
    </h2>
  )
}

// text-balance: max-w-column(60rem)에 걸려 두 줄이 될 때 줄 길이를 고르게 나눈다.
// 없으면 마지막 줄에 한 어절만 남아 엉뚱한 데서 끊긴 것처럼 보인다.
export function SlideLead({ children }: { children: ReactNode }) {
  return <p className="animate-rise-2 max-w-column text-deck-lead text-balance text-content-secondary">{children}</p>
}

export function SlideBody({ children }: { children: ReactNode }) {
  return <p className="max-w-column text-deck-body text-balance text-content-secondary">{children}</p>
}

/** 화면 하단 강조 띠 — 한 화면에 하나만 */
export function SlideNote({ children, tone = 'accent' }: { children: ReactNode; tone?: 'accent' | 'quiet' }) {
  return (
    <p
      className={cx(
        'animate-rise-4 rounded-panel px-5 py-4 text-center text-deck-body font-semibold md:px-10 md:py-6',
        tone === 'accent'
          ? 'bg-accent text-accent-contrast shadow-lifted'
          : 'bg-surface-raised text-content-primary shadow-raised',
      )}
    >
      {children}
    </p>
  )
}

/** 키워드 강조 — 포인트 컬러는 여기서만 쓴다 */
export function Mark({ children }: { children: ReactNode }) {
  return <em className="font-bold text-accent not-italic">{children}</em>
}

const panelTones = {
  base: 'bg-surface-base text-content-primary',
  raised: 'bg-surface-raised text-content-primary shadow-raised',
  overlay: 'bg-surface-overlay text-content-primary shadow-overlay',
  sunken: 'bg-surface-sunken text-content-secondary inset-shadow-sunken',
  accent: 'bg-accent text-accent-contrast shadow-lifted',
  accentSoft: 'bg-accent-soft text-content-strong shadow-raised',
  inverse: 'bg-surface-inverse text-content-inverse shadow-lifted',
} as const

// 모바일에서는 한 단계 촘촘하게 — 데스크톱 값이 그대로 오면 카드 안 여백이 글자보다 넓다.
const panelPads = {
  sm: 'p-4 md:p-6',
  md: 'p-5 md:p-8',
  lg: 'p-5 md:p-10',
} as const

type PanelProps = {
  children: ReactNode
  tone?: keyof typeof panelTones
  pad?: keyof typeof panelPads
  className?: string
}

export function Panel({ children, tone = 'raised', pad = 'md', className }: PanelProps) {
  return (
    <div className={cx('rounded-card', panelTones[tone], panelPads[pad], className)}>{children}</div>
  )
}

export function PanelLabel({ children, tone = 'muted' }: { children: ReactNode; tone?: 'muted' | 'accent' | 'inverse' }) {
  return (
    <p
      className={cx(
        'text-deck-caption font-semibold tracking-widest uppercase',
        tone === 'accent' && 'text-accent',
        tone === 'muted' && 'text-content-muted',
        tone === 'inverse' && 'text-content-inverse/70',
      )}
    >
      {children}
    </p>
  )
}

export function Chip({ children, tone = 'quiet' }: { children: ReactNode; tone?: 'quiet' | 'accent' }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-deck-caption font-semibold md:px-5 md:py-2',
        tone === 'accent' ? 'bg-accent text-accent-contrast' : 'bg-surface-highlight text-content-primary',
      )}
    >
      {children}
    </span>
  )
}

/** 좌우 대비 비교용 2단 그리드 */
export function CompareGrid({ children }: { children: ReactNode }) {
  return <div className="grid flex-1 grid-cols-1 items-stretch gap-4 md:gap-8 lg:grid-cols-2">{children}</div>
}
