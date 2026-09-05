import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Photo, Reveal } from '@/shared/ui'
import { findStory, stories } from '../model/content'
import { Container, shopBase } from './primitives'

export function ShopJournalPage() {
  const [lead, ...rest] = stories
  return (
    <>
      <section className="shop-paper border-b border-shop-line">
        <Container className="py-14 sm:py-20">
          <p className="shop-eyebrow animate-rise-1">Journal</p>
          <h1 className="shop-display animate-rise-2 mt-4 text-[clamp(2.75rem,6vw,5.5rem)] text-shop-ink">
            물건보다 <em>조금 긴</em> 이야기
          </h1>
        </Container>
      </section>

      <Container className="py-14">
        <Reveal>
          <Link to={`${shopBase}/journal/$slug`} params={{ slug: lead.slug }} className="shop-card group grid gap-8 lg:grid-cols-12 lg:items-center">
            <Photo src={lead.cover} alt="" loading="eager" frameClassName="aspect-[16/10] rounded-[1.75rem] bg-shop-sunken lg:col-span-7" />
            <div className="lg:col-span-5">
              <p className="shop-eyebrow">
                {lead.category} · {lead.date}
              </p>
              <h2 className="shop-display mt-3 text-[clamp(2rem,3.5vw,3.25rem)] text-shop-ink transition group-hover:text-shop-accent">{lead.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-shop-muted">{lead.lead}</p>
              <span className="shop-link mt-6 inline-flex text-sm text-shop-ink">
                읽기 <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </Reveal>

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          {rest.map((story, index) => (
            <Reveal key={story.slug} delay={index * 80}>
              <Link to={`${shopBase}/journal/$slug`} params={{ slug: story.slug }} className="shop-card group block">
                <Photo src={story.cover} alt="" frameClassName="aspect-[4/3] rounded-2xl bg-shop-sunken" />
                <p className="shop-eyebrow mt-5">
                  {story.category} · {story.date}
                </p>
                <h2 className="shop-display mt-2 text-3xl text-shop-ink transition group-hover:text-shop-accent">{story.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-shop-muted">{story.lead}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  )
}

export function ShopJournalDetailPage({ slug }: { slug: string }) {
  const story = findStory(slug)
  if (!story) {
    return (
      <Container className="py-32 text-center">
        <h1 className="shop-display text-4xl">그런 글은 없어요.</h1>
        <Link to={`${shopBase}/journal`} className="shop-button mt-8">
          저널로
        </Link>
      </Container>
    )
  }
  const others = stories.filter((item) => item.slug !== story.slug)

  return (
    <article>
      <Container className="py-10 lg:py-16">
        <Link to={`${shopBase}/journal`} className="shop-link text-xs text-shop-muted">
          <ArrowLeft size={12} /> 저널
        </Link>
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="shop-eyebrow animate-rise-1">
            {story.category} · {story.date}
          </p>
          <h1 className="shop-display animate-rise-2 mt-4 text-[clamp(2.5rem,5vw,4.5rem)] text-shop-ink">{story.title}</h1>
          <p className="shop-italic animate-rise-3 mt-6 text-2xl text-shop-muted">{story.lead}</p>
        </div>
      </Container>
      <Reveal variant="scale" className="px-2 sm:px-4">
        <Photo src={story.cover} alt="" loading="eager" frameClassName="aspect-[16/9] rounded-[2rem] sm:aspect-[21/9]" />
      </Reveal>
      <Container className="py-16">
        <Reveal className="mx-auto flex max-w-2xl flex-col gap-7 text-lg leading-[1.9] text-shop-ink/85">
          {story.body.map((paragraph) => (
            <p key={paragraph.slice(0, 20)}>{paragraph}</p>
          ))}
        </Reveal>
      </Container>
      <section className="border-t border-shop-line py-20">
        <Container>
          <p className="shop-eyebrow">Read next</p>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {others.map((item, index) => (
              <Reveal key={item.slug} delay={index * 80}>
                <Link to={`${shopBase}/journal/$slug`} params={{ slug: item.slug }} className="shop-card group block">
                  <Photo src={item.cover} alt="" frameClassName="aspect-[16/9] rounded-2xl bg-shop-sunken" />
                  <p className="shop-eyebrow mt-5">{item.category}</p>
                  <h3 className="shop-display mt-2 text-2xl text-shop-ink transition group-hover:text-shop-accent">{item.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </article>
  )
}
