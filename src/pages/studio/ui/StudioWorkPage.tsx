import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { useRef, useState, type MouseEvent } from 'react'
import { Photo, Reveal } from '@/shared/ui'
import { disciplines, projects, type Discipline } from '../model/projects'
import { Container, studioBase } from './primitives'

/** 작업 목록. 데스크톱은 마우스를 따라오는 미리보기, 모바일은 썸네일 행 */
export function StudioWorkPage() {
  const [filter, setFilter] = useState<Discipline | 'All'>('All')
  const [peek, setPeek] = useState<string | null>(null)
  const peekRef = useRef<HTMLDivElement>(null)

  const visible = filter === 'All' ? projects : projects.filter((project) => project.disciplines.includes(filter))

  const follow = (event: MouseEvent) => {
    const node = peekRef.current
    if (!node) return
    node.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%) rotate(${
      (event.clientX / window.innerWidth - 0.5) * 6
    }deg)`
  }

  const current = projects.find((project) => project.slug === peek)

  return (
    <>
      <section className="pt-36 pb-16 sm:pt-44">
        <Container>
          <p className="studio-eyebrow animate-rise-1">( Work )</p>
          <h1 className="studio-display animate-rise-2 mt-5 text-[clamp(3.5rem,11vw,12rem)] text-studio-ink">
            Selected <span className="studio-serif text-studio-accent">work</span>
          </h1>
          <div className="animate-rise-4 mt-12 flex flex-wrap items-center gap-2">
            {(['All', ...disciplines] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`h-10 rounded-full border px-4 text-sm transition ${
                  filter === item
                    ? 'border-studio-ink bg-studio-ink text-studio-bg'
                    : 'border-studio-line text-studio-muted hover:border-studio-ink hover:text-studio-ink'
                }`}
              >
                {item}
                <span className="ml-2 font-mono text-[10px] opacity-60">
                  {item === 'All' ? projects.length : projects.filter((p) => p.disciplines.includes(item)).length}
                </span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-32" onMouseMove={follow} onMouseLeave={() => setPeek(null)}>
        <Container>
          <ul className="border-t border-studio-line">
            {visible.map((project, index) => (
              <Reveal key={project.slug} as="li" delay={Math.min(index, 6) * 40}>
                <Link
                  to={`${studioBase}/work/$slug`}
                  params={{ slug: project.slug }}
                  onMouseEnter={() => setPeek(project.slug)}
                  className="studio-row group grid items-center gap-x-6 gap-y-4 border-b border-studio-line px-2 py-6 sm:grid-cols-12 sm:py-8"
                >
                  <div className="flex items-center gap-4 sm:col-span-5 lg:col-span-6">
                    <Photo
                      src={project.cover}
                      alt=""
                      frameClassName="size-16 shrink-0 rounded-sm bg-studio-raised sm:hidden"
                    />
                    <div>
                      <span className="font-mono text-[11px] text-studio-muted">0{index + 1}</span>
                      <h2 className="studio-display mt-1 text-[clamp(2rem,4.5vw,4.5rem)] text-studio-ink transition duration-500 ease-site group-hover:translate-x-3">
                        {project.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-sm text-studio-muted sm:col-span-3 lg:col-span-3">{project.client}</p>
                  <p className="hidden text-sm text-studio-muted sm:col-span-3 sm:block lg:col-span-2">
                    {project.disciplines.join(' · ')}
                  </p>
                  <div className="flex items-center justify-between sm:col-span-1 sm:justify-end">
                    <span className="font-mono text-xs text-studio-muted sm:hidden">{project.disciplines.join(' · ')}</span>
                    <span className="flex items-center gap-3 font-mono text-xs text-studio-muted">
                      {project.year}
                      <ArrowUpRight size={16} className="transition group-hover:text-studio-accent" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>

        <div ref={peekRef} className={`studio-peek hidden lg:block ${peek ? 'is-active' : ''}`} aria-hidden>
          {current && (
            <img
              key={current.slug}
              src={current.cover}
              alt=""
              className="animate-pop size-full rounded-sm object-cover shadow-2xl"
            />
          )}
        </div>
      </section>
    </>
  )
}
