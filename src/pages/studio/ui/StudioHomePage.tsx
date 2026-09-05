import { Link } from '@tanstack/react-router'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Photo, Reveal } from '@/shared/ui'
import { projects } from '../model/projects'
import { articles, clients, services } from '../model/studio'
import { Container, PillLink, ProjectCard, SectionHead, studioBase } from './primitives'

const featured = projects.filter((project) => project.featured)
const reel = [...projects, ...projects]

export function StudioHomePage() {
  return (
    <>
      {/* 히어로 */}
      <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden pb-10 pt-32 sm:pb-14">
        <div aria-hidden className="studio-hero-grid absolute inset-0" />
        <div
          aria-hidden
          className="absolute -right-[10vw] top-[8vh] size-[60vw] rounded-full opacity-70 blur-3xl"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(255,90,45,0.35) 0%, rgba(255,90,45,0.05) 45%, transparent 70%)',
          }}
        />
        <div aria-hidden className="studio-noise pointer-events-none absolute inset-0" />

        <Container className="relative">
          <p className="studio-eyebrow animate-rise-1">Brand & Digital Studio · Seoul / Copenhagen</p>
          <h1 className="studio-display animate-rise-2 mt-6 max-w-[14ch] text-[clamp(3.5rem,10.5vw,11.5rem)] text-studio-ink">
            We shape brands that are <span className="studio-serif text-studio-accent">felt</span> before they are
            explained.
          </h1>

          <div className="animate-rise-4 mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-base leading-relaxed text-studio-muted sm:text-lg">
              좋은 브랜드는 설명보다 먼저 느껴집니다. 모로우는 그 첫 3초를 설계하는 스튜디오입니다. 전략에서
              화면까지, 덜어내서 무겁게.
            </p>
            <div className="flex items-center gap-4">
              <PillLink to={`${studioBase}/work`}>Selected work</PillLink>
              <button
                type="button"
                onClick={() => document.querySelector('#studio-reel')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="아래로"
                className="grid size-12 place-items-center rounded-full border border-studio-line text-studio-muted transition hover:border-studio-ink hover:text-studio-ink"
              >
                <ArrowDown size={18} />
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* 릴: 프로젝트 커버가 흐른다 */}
      <section id="studio-reel" className="overflow-hidden py-6">
        <div className="group flex w-max gap-4 animate-marquee-slow hover:[animation-play-state:paused]">
          {reel.map((project, index) => (
            <Link
              key={`${project.slug}-${index}`}
              to={`${studioBase}/work/$slug`}
              params={{ slug: project.slug }}
              className="studio-card relative block w-[70vw] shrink-0 sm:w-[44vw] lg:w-[28vw]"
              aria-label={`${project.title} 보기`}
            >
              <Photo
                src={project.cover}
                alt=""
                loading={index < 4 ? 'eager' : 'lazy'}
                frameClassName="aspect-[4/3] rounded-sm bg-studio-raised"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-studio-bg/70 px-3 py-1 font-mono text-[10px] tracking-wider text-studio-ink backdrop-blur">
                {project.title} · {project.year}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 선언 */}
      <section className="py-28 sm:py-40">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <p className="studio-eyebrow">( About )</p>
            </Reveal>
            <Reveal delay={80} className="md:col-span-9">
              <p className="studio-display-wide text-[clamp(1.75rem,3.4vw,3.5rem)] leading-[1.18] text-studio-ink">
                요소가 적을수록 남은 것은 커집니다. 우리는 브랜드가 말하고 싶은 모든 것을 벽에 붙이고, 마지막{' '}
                <span className="studio-serif text-studio-accent">두 장</span>이 남을 때까지 떼어냅니다. 그 두 장이
                워드마크가 되고, 웹사이트가 되고, 건물의 사이니지가 됩니다.
              </p>
              <div className="mt-16 grid grid-cols-3 gap-6 border-t border-studio-line pt-8">
                {[
                  ['08', 'Years'],
                  ['64', 'Brands shaped'],
                  ['19', 'Awards'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="studio-display text-[clamp(2.5rem,5vw,5rem)] text-studio-ink">{value}</p>
                    <p className="mt-2 text-xs tracking-wider text-studio-muted uppercase">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 선택된 작업 */}
      <section className="pb-28 sm:pb-40">
        <Container>
          <SectionHead
            eyebrow="( Selected work )"
            title={
              <>
                Made to be <span className="studio-serif text-studio-accent">felt.</span>
              </>
            }
            aside={<span>2024 ~ 2026</span>}
          />
          <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-12">
            <div className="md:col-span-7">
              <ProjectCard project={featured[0]} ratio="aspect-[4/3]" />
            </div>
            <div className="md:col-span-5 md:pt-32">
              <ProjectCard project={featured[1]} ratio="aspect-[4/5]" delay={120} />
            </div>
            <div className="md:col-span-5">
              <ProjectCard project={featured[2]} ratio="aspect-[4/5]" />
            </div>
            <div className="md:col-span-7 md:pt-24">
              <ProjectCard project={featured[3]} ratio="aspect-[4/3]" delay={120} />
            </div>
          </div>
          <Reveal className="mt-16 flex justify-center">
            <PillLink to={`${studioBase}/work`}>All work ({projects.length})</PillLink>
          </Reveal>
        </Container>
      </section>

      {/* 서비스 */}
      <section className="border-y border-studio-line bg-studio-surface py-28 sm:py-36">
        <Container>
          <SectionHead eyebrow="( What we do )" title="Five disciplines, one system." />
          <ul className="mt-14 border-t border-studio-line">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 60} as="li">
                <div className="studio-row grid items-center gap-4 border-b border-studio-line px-2 py-7 sm:grid-cols-12 sm:py-9">
                  <span className="font-mono text-xs text-studio-muted sm:col-span-1">0{index + 1}</span>
                  <h3 className="studio-display text-[clamp(1.75rem,3.2vw,3.25rem)] text-studio-ink sm:col-span-5">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-studio-muted sm:col-span-5 sm:text-base">
                    <span className="mr-2 text-studio-ink">{service.ko}</span>
                    {service.detail}
                  </p>
                  <ArrowUpRight size={20} className="hidden text-studio-muted sm:col-span-1 sm:block sm:justify-self-end" />
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* 클라이언트 마퀴 */}
      <section className="overflow-hidden py-16">
        <p className="studio-eyebrow mb-8 text-center">( Trusted by )</p>
        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
          {[...clients, ...clients].map((client, index) => (
            <span key={`${client}-${index}`} className="studio-display text-[clamp(2rem,4vw,4rem)] text-studio-raised">
              {client}
            </span>
          ))}
        </div>
      </section>

      {/* 저널 */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHead
            eyebrow="( Journal )"
            title="Notes from the studio."
            aside={
              <Link to={`${studioBase}/journal`} className="studio-link">
                All notes <ArrowUpRight size={14} />
              </Link>
            }
          />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {articles.slice(0, 3).map((article, index) => (
              <Reveal key={article.slug} delay={index * 90}>
                <Link
                  to={`${studioBase}/journal/$slug`}
                  params={{ slug: article.slug }}
                  className="studio-card group block"
                >
                  <Photo src={article.cover} alt="" frameClassName="aspect-[4/3] rounded-sm bg-studio-raised" />
                  <p className="studio-eyebrow mt-5">
                    {article.category} · {article.readMinutes} min
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-studio-ink transition group-hover:text-studio-accent">
                    {article.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-studio-accent py-28 text-studio-bg sm:py-40">
        <Container className="relative">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-70">( Start a project )</p>
            <Link
              to={`${studioBase}/contact`}
              className="studio-display mt-6 block max-w-[12ch] text-[clamp(3rem,9vw,10rem)] transition hover:translate-x-2"
            >
              Let&apos;s make something matter.
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
