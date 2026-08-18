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
  const percent = Math.round(((safeIndex + 1) / total) * 100)

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
    // break-keep: 한글이 어절 중간에서 잘리지 않게 (예: "참고자/료")
    // text-balance: 카드 안 문구까지 줄 길이를 고르게 나눈다 (한 어절만 남는 고아 줄 방지)
    <div
      data-deck
      className="fixed inset-0 flex h-dvh w-screen flex-col overflow-hidden bg-surface-base font-sans break-keep text-balance text-content-primary"
    >
      {/*
        모바일에서는 헤더를 2줄로 쪼갠다.
        한 줄에 두면 진행률 바가 폭을 반쯤 먹으면서 좌측 파트명이 5줄로 접히고,
        정작 진행률 칸(총 화면 수만큼 분할)은 눈에 보이지 않을 만큼 얇아진다.
      */}
      <header className="flex shrink-0 flex-col gap-3 px-5 pt-4 pb-3 md:flex-row md:items-center md:gap-10 md:px-12 md:pt-7 md:pb-5">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <button
            type="button"
            onClick={onExit}
            aria-label="강의 목록으로"
            className="grid size-10 shrink-0 place-items-center rounded-control bg-surface-raised text-content-secondary shadow-raised transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary md:size-12"
          >
            <LayoutGrid className="size-5 md:size-6" />
          </button>
          {/* min-w-0 + truncate: 긴 파트명이 줄바꿈으로 헤더 높이를 늘리지 않게 */}
          <div className="min-w-0">
            <p className="truncate text-deck-meta tracking-widest text-content-muted uppercase">{lessonTitle}</p>
            <p className="truncate text-deck-caption font-semibold text-content-primary">{slide.part}</p>
          </div>
          <span className="ml-auto shrink-0 text-deck-caption font-semibold tabular-nums text-content-muted md:hidden">
            {percent}%
          </span>
        </div>

        <div className="flex flex-1 items-center gap-5">
          {/* 칸이 좁아지는 모바일에서는 칸 사이 간격을 최소로 (간격이 칸보다 넓어지지 않게) */}
          <div className="flex flex-1 items-center gap-px md:gap-1" role="presentation">
            {slides.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                aria-label={`${item.id} ${item.title}`}
                onClick={() => goTo(itemIndex)}
                className={cx(
                  'h-1.5 flex-1 rounded-full transition duration-300 ease-deck md:h-2',
                  itemIndex <= safeIndex ? 'bg-accent' : 'bg-surface-highlight hover:bg-content-muted',
                )}
              />
            ))}
          </div>
          <span className="hidden text-deck-caption font-semibold tabular-nums text-content-muted md:block">
            {percent}%
          </span>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto px-5 md:px-12">
        <div key={slide.id} className="min-h-full animate-fade">
          <SlideComponent active />
        </div>
      </main>

      <footer className="flex shrink-0 items-center justify-between gap-3 px-5 pt-3 pb-5 md:gap-8 md:px-12 md:pt-5 md:pb-8">
        <button
          type="button"
          onClick={onPrev}
          disabled={safeIndex === 0}
          className="flex items-center gap-2 rounded-full bg-surface-raised px-4 py-2.5 text-deck-caption font-semibold text-content-secondary shadow-raised transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary disabled:opacity-30 md:gap-3 md:px-7 md:py-3"
        >
          <ArrowLeft className="size-5 md:size-6" />
          이전
        </button>

        <div className="flex items-center gap-5">
          <span className="hidden text-deck-meta text-content-muted lg:block">
            ← → Space 이동 · O 목록 · F 전체화면
            {shortcuts.map((shortcut) => ` · ${shortcut.key.toUpperCase()} ${shortcut.label}`)}
          </span>
          <span className="rounded-full bg-surface-sunken px-4 py-2.5 text-deck-caption font-semibold tabular-nums text-content-primary inset-shadow-sunken md:px-6 md:py-3">
            {safeIndex + 1} / {total}
          </span>
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={safeIndex === total - 1}
          className="flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-deck-caption font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck hover:bg-accent-strong disabled:opacity-30 md:gap-3 md:px-7 md:py-3"
        >
          다음
          <ArrowRight className="size-5 md:size-6" />
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
