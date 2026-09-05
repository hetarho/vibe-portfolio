import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Photo, Reveal } from '@/shared/ui'
import { articles, findArticle } from '../model/studio'
import { Container, studioBase } from './primitives'

export function StudioJournalPage() {
  const [lead, ...rest] = articles
  return (
    <>
      <section className="pt-36 pb-16 sm:pt-44">
        <Container>
          <p className="studio-eyebrow animate-rise-1">( Journal )</p>
          <h1 className="studio-display animate-rise-2 mt-5 text-[clamp(3.5rem,11vw,12rem)] text-studio-ink">
            Notes<span className="text-studio-accent">.</span>
          </h1>
        </Container>
      </section>

      <section className="pb-32">
        <Container>
          <Reveal>
            <Link
              to={`${studioBase}/journal/$slug`}
              params={{ slug: lead.slug }}
              className="studio-card group grid gap-8 md:grid-cols-12 md:items-end"
            >
              <Photo
                src={lead.cover}
                alt=""
                loading="eager"
                frameClassName="aspect-[16/9] rounded-sm bg-studio-raised md:col-span-8"
              />
              <div className="md:col-span-4">
                <p className="studio-eyebrow">
                  {lead.category} · {lead.date} · {lead.readMinutes} min
                </p>
                <h2 className="studio-display mt-4 text-[clamp(2rem,3.5vw,3.5rem)] text-studio-ink transition group-hover:text-studio-accent">
                  {lead.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-studio-muted">{lead.lead}</p>
              </div>
            </Link>
          </Reveal>

          <ul className="mt-24 border-t border-studio-line">
            {rest.map((article, index) => (
              <Reveal key={article.slug} as="li" delay={index * 60}>
                <Link
                  to={`${studioBase}/journal/$slug`}
                  params={{ slug: article.slug }}
                  className="studio-row group grid items-center gap-6 border-b border-studio-line px-2 py-8 md:grid-cols-12"
                >
                  <Photo src={article.cover} alt="" frameClassName="aspect-[4/3] rounded-sm bg-studio-raised md:col-span-3" />
                  <div className="md:col-span-7">
                    <p className="studio-eyebrow">
                      {article.category} · {article.date}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-studio-ink sm:text-3xl">{article.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-studio-muted sm:text-base">{article.lead}</p>
                  </div>
                  <div className="flex items-center justify-between md:col-span-2 md:justify-end">
                    <span className="font-mono text-xs text-studio-muted">{article.readMinutes} min</span>
                    <ArrowUpRight size={18} className="ml-4 text-studio-muted transition group-hover:text-studio-accent" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}

export function StudioJournalDetailPage({ slug }: { slug: string }) {
  const article = findArticle(slug)
  if (!article) {
    return (
      <Container className="pt-44 pb-32">
        <p className="studio-eyebrow">( Not found )</p>
        <h1 className="studio-display mt-4 text-6xl">그런 글은 없습니다.</h1>
        <Link to={`${studioBase}/journal`} className="studio-link mt-8 inline-flex text-sm">
          <ArrowLeft size={16} /> 저널로
        </Link>
      </Container>
    )
  }

  const others = articles.filter((item) => item.slug !== article.slug).slice(0, 2)

  return (
    <article>
      <section className="pt-32 sm:pt-40">
        <Container>
          <Link to={`${studioBase}/journal`} className="studio-link animate-rise-1 text-sm text-studio-muted">
            <ArrowLeft size={14} /> Journal
          </Link>
          <p className="studio-eyebrow animate-rise-2 mt-10">
            {article.category} · {article.date} · {article.readMinutes} min read
          </p>
          <h1 className="studio-display animate-rise-3 mt-5 max-w-[16ch] text-[clamp(2.75rem,7vw,7.5rem)] text-studio-ink">
            {article.title}
          </h1>
        </Container>
        <Reveal variant="scale" className="mt-12 px-2 sm:px-4">
          <Photo src={article.cover} alt="" loading="eager" frameClassName="aspect-[16/9] rounded-sm sm:aspect-[21/9]" />
        </Reveal>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-7 md:col-start-4">
              <p className="studio-serif text-[clamp(1.5rem,2.4vw,2.25rem)] leading-snug text-studio-ink">{article.lead}</p>
              <div className="mt-12 flex flex-col gap-8 text-lg leading-[1.9] text-studio-muted">
                {article.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-16 border-t border-studio-line pt-6 text-sm text-studio-muted">글 · MORROW Studio</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-studio-line py-24">
        <Container>
          <p className="studio-eyebrow">( Read next )</p>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {others.map((item, index) => (
              <Reveal key={item.slug} delay={index * 80}>
                <Link to={`${studioBase}/journal/$slug`} params={{ slug: item.slug }} className="studio-card group block">
                  <Photo src={item.cover} alt="" frameClassName="aspect-[16/9] rounded-sm bg-studio-raised" />
                  <p className="studio-eyebrow mt-5">{item.category}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-studio-ink transition group-hover:text-studio-accent">
                    {item.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </article>
  )
}
