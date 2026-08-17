import { X } from 'lucide-react'
import type { SlideDef } from '../model/types'
import { cx } from './primitives'

type Props = {
  slides: SlideDef[]
  index: number
  onSelect: (index: number) => void
  onClose: () => void
}

export function SlideOverview({ slides, index, onSelect, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-surface-sunken/95 backdrop-blur-sm">
      <div className="flex shrink-0 items-center justify-between px-12 pt-10 pb-6">
        <div>
          <p className="text-deck-meta tracking-widest text-content-muted uppercase">전체 화면 목록</p>
          <p className="text-deck-lead font-bold text-content-strong">어디로 갈까요?</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-3 rounded-full bg-surface-raised px-6 py-3 text-deck-caption font-semibold text-content-secondary transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary"
        >
          <X size={22} />
          닫기
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-12 pb-12">
        <ul className="mx-auto grid max-w-stage grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {slides.map((slide, slideIndex) => {
            const current = slideIndex === index
            return (
              <li key={slide.id}>
                <button
                  type="button"
                  onClick={() => onSelect(slideIndex)}
                  className={cx(
                    'flex h-full w-full flex-col gap-2 rounded-card p-6 text-left transition duration-200 ease-deck',
                    current
                      ? 'bg-accent text-accent-contrast shadow-lifted'
                      : 'bg-surface-raised text-content-primary shadow-raised hover:bg-surface-highlight',
                  )}
                >
                  <span
                    className={cx(
                      'text-deck-meta font-bold tracking-widest tabular-nums uppercase',
                      current ? 'text-accent-contrast/70' : 'text-content-muted',
                    )}
                  >
                    {slide.id} · {slide.part}
                  </span>
                  <span className="text-deck-caption font-semibold text-balance">{slide.title}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
