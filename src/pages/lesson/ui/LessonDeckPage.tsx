import { ArrowLeft } from 'lucide-react'
import { DeckShell } from '../deck'
import { findLesson } from '../model/registry'

type Props = {
  lessonId: string
  /** URL에 노출되는 1-based 화면 번호 */
  slideNumber: number
  onSlideChange: (slideNumber: number) => void
  onExit: () => void
}

export function LessonDeckPage({ lessonId, slideNumber, onSlideChange, onExit }: Props) {
  const lesson = findLesson(lessonId)

  if (!lesson) {
    return (
      <div className="grid min-h-dvh w-full place-items-center bg-surface-base px-5 font-sans md:px-12">
        <div className="flex flex-col items-center gap-4 rounded-stage bg-surface-raised p-8 text-center shadow-raised md:gap-7 md:p-16">
          <p className="text-deck-title font-bold text-content-strong">없는 강의입니다</p>
          <p className="text-deck-body text-content-secondary">주소를 다시 확인해 주세요 — {lessonId}</p>
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-3 rounded-full bg-accent px-4 py-4 text-deck-caption font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck md:px-8 hover:bg-accent-strong"
          >
            <ArrowLeft size={24} />
            강의 목록으로
          </button>
        </div>
      </div>
    )
  }

  return (
    <DeckShell
      deck={lesson.deck}
      lessonTitle={lesson.title}
      index={slideNumber - 1}
      onIndexChange={(index) => onSlideChange(index + 1)}
      onExit={onExit}
    />
  )
}
