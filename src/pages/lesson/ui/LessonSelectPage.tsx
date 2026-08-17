import { ArrowRight, Clock, Presentation, Users } from 'lucide-react'
import { lessons } from '../model/registry'

type Props = {
  onOpen: (lessonId: string) => void
}

/** 강의 선택 화면 — URL을 직접 입력해야만 도달하는 진입점 */
export function LessonSelectPage({ onOpen }: Props) {
  return (
    <div className="min-h-dvh w-full bg-surface-base font-sans text-content-primary">
      <div className="mx-auto flex max-w-stage flex-col gap-12 px-12 py-20">
        <header className="animate-rise flex flex-col gap-5">
          <p className="flex items-center gap-3 text-deck-caption font-semibold tracking-widest text-content-muted uppercase">
            <span className="size-3 rounded-full bg-accent" aria-hidden />
            Lesson
          </p>
          <h1 className="text-deck-hero font-bold tracking-tight text-content-strong">클래스를 선택하세요</h1>
          <p className="text-deck-body text-content-secondary">
            선택하면 화면 전체를 쓰는 발표 모드로 들어갑니다. 종료는 좌측 상단 버튼.
          </p>
        </header>

        <ul className="grid gap-6 lg:grid-cols-2">
          {lessons.map((lesson, index) => (
            <li key={lesson.id} className={index === 0 ? 'animate-rise-1' : 'animate-rise-2'}>
              <button
                type="button"
                onClick={() => onOpen(lesson.id)}
                className="group flex h-full w-full flex-col gap-7 rounded-stage bg-surface-raised p-12 text-left shadow-raised transition duration-300 ease-deck hover:-translate-y-2 hover:bg-surface-overlay hover:shadow-overlay"
              >
                <span className="grid size-16 place-items-center rounded-panel bg-accent text-accent-contrast">
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
                  <span className="flex flex-wrap items-center gap-6 text-deck-caption text-content-muted">
                    <span className="flex items-center gap-2">
                      <Clock size={22} />
                      {lesson.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users size={22} />
                      {lesson.audience}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 rounded-full bg-surface-highlight px-7 py-3 text-deck-caption font-bold text-content-primary transition duration-300 ease-deck group-hover:bg-accent group-hover:text-accent-contrast">
                    시작하기
                    <ArrowRight size={24} />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <footer className="rounded-panel bg-surface-sunken px-10 py-7 text-deck-caption text-content-muted inset-shadow-sunken">
          이 페이지는 포트폴리오 내비게이션 어디에도 연결되어 있지 않습니다. 주소를 직접 입력해야 들어올 수 있습니다.
        </footer>
      </div>
    </div>
  )
}
