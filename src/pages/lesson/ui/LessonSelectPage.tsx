import { ArrowLeft, ArrowRight, Clock, Presentation, Users } from 'lucide-react'
import { lessons } from '../model/registry'

/** 카드 등장 순서 — 강의가 늘어나도 마지막 값으로 눌러 붙는다 */
const RISE = ['animate-rise-1', 'animate-rise-2', 'animate-rise-3', 'animate-rise-4', 'animate-rise-5']

type Props = {
  onOpen: (lessonId: string) => void
  onBack: () => void
}

/** 강의 선택 화면 */
export function LessonSelectPage({ onOpen, onBack }: Props) {
  return (
    <div data-deck className="min-h-dvh w-full bg-surface-base font-sans break-keep text-content-primary">
      <div className="mx-auto flex max-w-stage flex-col gap-6 px-5 py-10 md:gap-12 md:px-12 md:py-20">
        <header className="animate-rise flex flex-col gap-5">
          <button
            type="button"
            onClick={onBack}
            className="flex w-fit items-center gap-2 text-deck-meta font-medium text-content-muted transition hover:text-content-primary"
          >
            <ArrowLeft size={18} />
            vibe.haeram
          </button>
          <p className="flex items-center gap-3 text-deck-caption font-semibold tracking-widest text-content-muted uppercase">
            <span className="size-3 rounded-full bg-accent" aria-hidden />
            Lesson
          </p>
          <h1 className="text-deck-hero font-bold tracking-tight text-content-strong">클래스를 선택하세요</h1>
          <p className="text-deck-body text-content-secondary">
            선택하면 화면 전체를 쓰는 발표 모드로 들어갑니다. 종료는 좌측 상단 버튼.
          </p>
        </header>

        <ul className="grid gap-4 md:gap-6 lg:grid-cols-2">
          {lessons.map((lesson, index) => (
            <li key={lesson.id} className={RISE[Math.min(index, RISE.length - 1)]}>
              <button
                type="button"
                onClick={() => onOpen(lesson.id)}
                className="group flex h-full w-full flex-col gap-4 rounded-stage bg-surface-raised p-6 text-left shadow-raised transition duration-300 ease-deck md:gap-7 md:p-12 hover:-translate-y-2 hover:bg-surface-overlay hover:shadow-overlay"
              >
                <span className="grid size-12 place-items-center rounded-panel bg-accent text-accent-contrast md:size-16">
                  <Presentation size={34} />
                </span>

                <span className="flex flex-col gap-3">
                  <span className="text-deck-title font-bold tracking-tight text-content-strong">{lesson.title}</span>
                  <span className="text-deck-body text-content-secondary">{lesson.subtitle}</span>
                </span>

                <span className="flex flex-wrap gap-3">
                  {lesson.outline.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-surface-sunken px-5 py-2 text-deck-caption text-content-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </span>

                <span className="mt-auto flex flex-wrap items-center justify-between gap-5 pt-2">
                  <span className="flex flex-wrap items-center gap-4 text-deck-caption text-content-muted md:gap-6">
                    <span className="flex items-center gap-2">
                      <Clock size={22} />
                      {lesson.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users size={22} />
                      {lesson.audience}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 rounded-full bg-surface-highlight px-4 py-3 text-deck-caption font-bold text-content-primary transition duration-300 ease-deck md:px-7 group-hover:bg-accent group-hover:text-accent-contrast">
                    시작하기
                    <ArrowRight size={24} />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
