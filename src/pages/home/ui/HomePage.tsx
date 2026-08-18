import { ArrowUpRight, LayoutGrid, Presentation } from 'lucide-react'

type Props = {
  onOpenPortfolio: () => void
  onOpenLesson: () => void
}

const doors = [
  {
    key: 'portfolio',
    icon: LayoutGrid,
    eyebrow: 'Portfolio',
    title: '바이브코딩 포트폴리오',
    detail: '말로 만든 웹사이트 3종',
  },
  {
    key: 'lesson',
    icon: Presentation,
    eyebrow: 'Lesson',
    title: '강의 자료',
    detail: '1대1 수업용 발표 덱',
  },
] as const

/** 사이트의 첫 화면 — 포트폴리오로 갈지 강의로 갈지만 고르게 한다 */
export function HomePage({ onOpenPortfolio, onOpenLesson }: Props) {
  const open = { portfolio: onOpenPortfolio, lesson: onOpenLesson }

  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-surface-base px-6 py-20 font-sans break-keep text-content-primary">
      {/* 배경 — 가운데를 살짝 들어올리는 빛 한 겹 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: 'radial-gradient(60% 45% at 50% 32%, #2b2724 0%, transparent 72%)' }}
      />

      <div className="relative flex w-full max-w-column flex-col items-center gap-16">
        <h1 className="animate-rise m-0 text-center text-[clamp(3rem,11vw,6.5rem)] font-bold leading-none tracking-[-0.055em] text-content-strong">
          vibe<span className="text-accent">.</span>haeram
        </h1>

        <nav className="grid w-full gap-4 sm:grid-cols-2" aria-label="사이트 입구">
          {doors.map(({ key, icon: Icon, eyebrow, title, detail }, index) => (
            <button
              key={key}
              type="button"
              onClick={open[key]}
              className={`group flex flex-col gap-6 rounded-card bg-surface-raised p-8 text-left shadow-raised transition duration-300 ease-deck hover:-translate-y-1.5 hover:bg-surface-overlay hover:shadow-overlay ${
                index === 0 ? 'animate-rise-1' : 'animate-rise-2'
              }`}
            >
              <span className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-control bg-surface-sunken text-content-secondary transition duration-300 ease-deck group-hover:bg-accent group-hover:text-accent-contrast">
                  <Icon size={20} />
                </span>
                <ArrowUpRight
                  size={20}
                  className="text-content-muted transition duration-300 ease-deck group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </span>

              <span className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold tracking-[0.18em] text-content-muted uppercase">{eyebrow}</span>
                <span className="text-xl font-semibold tracking-tight text-content-strong">{title}</span>
                <span className="text-sm text-content-secondary">{detail}</span>
              </span>
            </button>
          ))}
        </nav>
      </div>
    </main>
  )
}
