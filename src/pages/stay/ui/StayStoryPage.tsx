import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Photo, Reveal } from '@/shared/ui'
import { story } from '../model/content'
import { Container, SectionHead, stayBase } from './primitives'

export function StayStoryPage() {
  return (
    <>
      <section className="pt-36 pb-16 sm:pt-44">
        <Container>
          <p className="stay-eyebrow animate-rise-1">Story</p>
          <h1 className="stay-display animate-rise-2 mt-5 max-w-[14ch] text-[clamp(3rem,7vw,7.5rem)] text-stay-ink">
            안개의 바다에 <em>잠시 배를 대는</em> 곳
          </h1>
        </Container>
      </section>

      <Reveal variant="scale" className="px-2 sm:px-4">
        <Photo src={story.hero} alt="하븐 전경" loading="eager" frameClassName="aspect-[16/9] rounded-[1.5rem] sm:aspect-[21/9]" className="animate-kenburns" />
      </Reveal>

      <section className="py-28 sm:py-36">
        <Container className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <blockquote>
              <p className="stay-display text-[clamp(1.75rem,3vw,3rem)] leading-[1.25] text-stay-ink">“{story.founder.quote}”</p>
              <footer className="mt-6 text-sm text-stay-muted">{story.founder.name}</footer>
            </blockquote>
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-7 text-lg leading-[1.9] text-stay-ink/85 lg:col-span-6 lg:col-start-7">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 20)}>{paragraph}</p>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="px-2 sm:px-4">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {story.photos.map((src, index) => (
            <Reveal key={src} variant="scale" delay={index * 100} className={index === 2 ? 'col-span-2 lg:col-span-1' : ''}>
              <Photo src={src} alt="" frameClassName="aspect-[4/5] rounded-[1.5rem] bg-stay-sunken" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-28 sm:py-36">
        <Container>
          <SectionHead eyebrow="Principles" title={<>지키는 <em>세 가지</em></>} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] bg-stay-line md:grid-cols-3">
            {story.principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 90} className="bg-stay-bg p-8 sm:p-10">
                <span className="stay-display text-4xl text-stay-moss">0{index + 1}</span>
                <h3 className="stay-display mt-6 text-3xl text-stay-ink">{principle.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-stay-muted">{principle.detail}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-stay-deep py-28 text-stay-bg sm:py-36">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead tone="dark" eyebrow="Getting here" title={<>오는 <em className="text-stay-sand">길</em></>} />
            <p className="mt-8 text-base leading-[1.9] text-stay-bg/70">{story.address}</p>
            <Link to={`${stayBase}/book`} className="stay-button-light mt-10">
              예약하기 <ArrowRight size={15} />
            </Link>
          </div>
          <dl className="flex flex-col lg:col-span-6 lg:col-start-7">
            {story.access.map((item, index) => (
              <Reveal key={item.how} delay={index * 60} className="grid grid-cols-12 gap-4 border-b border-stay-bg/10 py-6">
                <dt className="stay-display col-span-3 text-2xl text-stay-sand">{item.how}</dt>
                <dd className="col-span-9 text-base leading-relaxed text-stay-bg/85">{item.detail}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>
    </>
  )
}
