import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import { useCallback, useState } from 'react'
import type { DeckDef } from '../model/types'
import { useDeckKeyboard } from '../model/useDeckKeyboard'
import { cx } from './primitives'
import { SlideOverview } from './SlideOverview'

type Props = {
  deck: DeckDef
  lessonTitle: string
  index: number
  onIndexChange: (index: number) => void
  onExit: () => void
}

export function DeckShell({ deck, lessonTitle, index, onIndexChange, onExit }: Props) {
  const [overviewOpen, setOverviewOpen] = useState(false)
  const { slides, shortcuts = [] } = deck
  const total = slides.length
  const safeIndex = Math.min(Math.max(index, 0), total - 1)
  const slide = slides[safeIndex]
  const SlideComponent = slide.component

  const goTo = useCallback(
    (next: number) => {
      onIndexChange(Math.min(Math.max(next, 0), total - 1))
    },
    [onIndexChange, total],
  )

  const onPrev = useCallback(() => goTo(safeIndex - 1), [goTo, safeIndex])
  const onNext = useCallback(() => goTo(safeIndex + 1), [goTo, safeIndex])
  const onToggleOverview = useCallback(() => setOverviewOpen((open) => !open), [])
  const onEscape = useCallback(() => setOverviewOpen(false), [])

  const onShortcut = useCallback(
    (key: string) => {
      const shortcut = shortcuts.find((item) => item.key === key)
      if (!shortcut) return
      const target = slides.findIndex((item) => item.id === shortcut.slideId)
      if (target >= 0) goTo(target)
    },
    [goTo, shortcuts, slides],
  )

  useDeckKeyboard({ onPrev, onNext, onToggleOverview, onShortcut, onEscape })

  return (
    <div className="fixed inset-0 flex h-dvh w-screen flex-col overflow-hidden bg-surface-base font-sans text-content-primary">
      <header className="flex shrink-0 items-center gap-10 px-12 pt-7 pb-5">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onExit}
            aria-label="강의 목록으로"
            className="grid size-12 place-items-center rounded-control bg-surface-raised text-content-secondary shadow-raised transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary"
          >
            <LayoutGrid size={22} />
          </button>
          <div>
            <p className="text-deck-meta tracking-widest text-content-muted uppercase">{lessonTitle}</p>
            <p className="text-deck-caption font-semibold text-content-primary">{slide.part}</p>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-5">
          <div className="flex flex-1 items-center gap-1" role="presentation">
            {slides.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                aria-label={`${item.id} ${item.title}`}
                onClick={() => goTo(itemIndex)}
                className={cx(
                  'h-2 flex-1 rounded-full transition duration-300 ease-deck',
                  itemIndex <= safeIndex ? 'bg-accent' : 'bg-surface-highlight hover:bg-content-muted',
                )}
              />
            ))}
          </div>
          <span className="text-deck-caption font-semibold tabular-nums text-content-muted">
            {Math.round(((safeIndex + 1) / total) * 100)}%
          </span>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto px-12">
        <div key={slide.id} className="h-full min-h-full animate-fade">
          <SlideComponent active />
        </div>
      </main>

      <footer className="flex shrink-0 items-center justify-between gap-8 px-12 pt-5 pb-8">
        <button
          type="button"
          onClick={onPrev}
          disabled={safeIndex === 0}
          className="flex items-center gap-3 rounded-full bg-surface-raised px-7 py-3 text-deck-caption font-semibold text-content-secondary shadow-raised transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary disabled:opacity-30"
        >
          <ArrowLeft size={22} />
          이전
        </button>

        <div className="flex items-center gap-5">
          <span className="hidden text-deck-meta text-content-muted lg:block">
            ← → Space 이동 · O 목록 · F 전체화면
            {shortcuts.map((shortcut) => ` · ${shortcut.key.toUpperCase()} ${shortcut.label}`)}
          </span>
          <span className="rounded-full bg-surface-sunken px-6 py-3 text-deck-caption font-semibold tabular-nums text-content-primary inset-shadow-sunken">
            {safeIndex + 1} / {total}
          </span>
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={safeIndex === total - 1}
          className="flex items-center gap-3 rounded-full bg-accent px-7 py-3 text-deck-caption font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck hover:bg-accent-strong disabled:opacity-30"
        >
          다음
          <ArrowRight size={22} />
        </button>
      </footer>

      {overviewOpen ? (
        <SlideOverview
          slides={slides}
          index={safeIndex}
          onSelect={(next) => {
            goTo(next)
            setOverviewOpen(false)
          }}
          onClose={() => setOverviewOpen(false)}
        />
      ) : null}
    </div>
  )
}
