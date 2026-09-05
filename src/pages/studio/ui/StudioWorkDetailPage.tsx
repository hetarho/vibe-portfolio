import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Photo, Reveal } from '@/shared/ui'
import { findProject, nextProject } from '../model/projects'
import { Container, studioBase } from './primitives'

export function StudioWorkDetailPage({ slug }: { slug: string }) {
  const project = findProject(slug)
  if (!project) {
    return (
      <Container className="pt-44 pb-32">
        <p className="studio-eyebrow">( Not found )</p>
        <h1 className="studio-display mt-4 text-6xl">그런 프로젝트는 없습니다.</h1>
        <Link to={`${studioBase}/work`} className="studio-link mt-8 inline-flex text-sm">
          <ArrowLeft size={16} /> 작업 목록으로
        </Link>
      </Container>
    )
  }

  const next = nextProject(project.slug)
  const [hero, ...rest] = project.gallery

  return (
    <article>
      <section className="pt-32 sm:pt-40">
        <Container>
          <Link to={`${studioBase}/work`} className="studio-link animate-rise-1 text-sm text-studio-muted">
            <ArrowLeft size={14} /> Work
          </Link>
          <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
            <h1 className="studio-display animate-rise-2 text-[clamp(3.5rem,11vw,12rem)] text-studio-ink md:col-span-8">
              {project.title}
            </h1>
            <p className="animate-rise-3 text-lg text-studio-muted md:col-span-4 md:pb-6">{project.tagline}</p>
          </div>
        </Container>

        <Reveal variant="scale" className="mt-12 px-2 sm:px-4">
          <Photo
            src={hero}
            alt={`${project.title} 대표 이미지`}
            loading="eager"
            frameClassName="aspect-[16/10] rounded-sm sm:aspect-[21/9]"
            className="animate-kenburns"
          />
        </Reveal>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 text-sm md:grid-cols-1">
                {[
                  ['Client', project.client],
                  ['Year', String(project.year)],
                  ['Discipline', project.disciplines.join(', ')],
                  ['Services', project.services.join(' · ')],
                ].map(([label, value]) => (
                  <div key={label} className="border-t border-studio-line pt-3">
                    <dt className="studio-eyebrow">{label}</dt>
                    <dd className="mt-2 text-studio-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={80} className="md:col-span-7 md:col-start-6">
              <p className="studio-display-wide text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.3] text-studio-ink">
                {project.intro}
              </p>
              <div className="mt-10 flex flex-col gap-6 text-base leading-[1.85] text-studio-muted sm:text-lg">
                {project.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 20)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 갤러리: 넓은 것과 좁은 것을 번갈아 */}
      <section className="pb-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-12 md:gap-6">
            {rest.map((src, index) => {
              const wide = index % 3 === 2
              return (
                <Reveal
                  key={src}
                  variant="scale"
                  delay={(index % 2) * 100}
                  className={wide ? 'md:col-span-12' : 'md:col-span-6'}
                >
                  <Photo
                    src={src}
                    alt={`${project.title} 이미지 ${index + 2}`}
                    frameClassName={`rounded-sm bg-studio-raised ${wide ? 'aspect-[21/9]' : 'aspect-[4/5]'}`}
                  />
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* 성과 + 인용 */}
      <section className="border-y border-studio-line bg-studio-surface py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="grid grid-cols-3 gap-6 md:col-span-7">
              {project.outcomes.map((outcome) => (
                <div key={outcome.label}>
                  <p className="studio-display text-[clamp(2.5rem,5.5vw,5.5rem)] text-studio-ink">{outcome.value}</p>
                  <p className="mt-3 text-xs leading-relaxed text-studio-muted">{outcome.label}</p>
                </div>
              ))}
            </Reveal>
            {project.quote && (
              <Reveal delay={100} className="md:col-span-5">
                <blockquote className="border-l border-studio-accent pl-6">
                  <p className="studio-serif text-2xl leading-snug text-studio-ink sm:text-3xl">“{project.quote.text}”</p>
                  <footer className="mt-4 text-sm text-studio-muted">{project.quote.by}</footer>
                </blockquote>
              </Reveal>
            )}
          </div>
        </Container>
      </section>

      {/* 다음 프로젝트 */}
      <Link
        to={`${studioBase}/work/$slug`}
        params={{ slug: next.slug }}
        className="studio-card group relative block overflow-hidden"
        aria-label={`다음 프로젝트 ${next.title}`}
      >
        <Photo
          src={next.cover}
          alt=""
          frameClassName="aspect-[16/9] sm:aspect-[21/8]"
          className="opacity-50 transition duration-700 group-hover:opacity-70"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12">
          <p className="studio-eyebrow text-studio-ink/80">( Next project )</p>
          <p className="studio-display mt-3 flex items-center gap-4 text-[clamp(3rem,8vw,8rem)] text-studio-ink">
            {next.title}
            <ArrowUpRight className="size-[0.6em] transition duration-500 ease-site group-hover:-translate-y-2 group-hover:translate-x-2" />
          </p>
        </div>
      </Link>
    </article>
  )
}
