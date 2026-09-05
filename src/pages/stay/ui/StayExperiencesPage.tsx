import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Photo, Reveal } from '@/shared/ui'
import { dayFlow, experiences } from '../model/content'
import { Container, SectionHead, stayBase } from './primitives'

export function StayExperiencesPage() {
  return (
    <>
      <section className="pt-36 pb-16 sm:pt-44">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="stay-eyebrow animate-rise-1">Experiences</p>
            <h1 className="stay-display animate-rise-2 mt-5 text-[clamp(3rem,7vw,7.5rem)] text-stay-ink">
              아무것도 <em>안 해도</em>
              <br />
              괜찮은 하루
            </h1>
          </div>
          <p className="animate-rise-3 text-base leading-[1.9] text-stay-muted lg:col-span-4 lg:col-start-9">
            그래도 무언가 하고 싶어지면, 여섯 가지가 있습니다. 모두 걸어서 5분 안에 있고, 예약이 필요한 것은 방에서
            전화 한 통이면 됩니다.
          </p>
        </Container>
      </section>

      <section className="pb-28">
        <Container className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {experiences.map((experience, index) => (
            <Reveal key={experience.slug} delay={(index % 2) * 100} className={`stay-card ${index % 2 === 1 ? 'md:pt-24' : ''}`}>
              <Photo src={experience.image} alt={experience.name} loading={index < 2 ? 'eager' : 'lazy'} frameClassName={`rounded-[1.5rem] bg-stay-sunken ${index % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[4/5]'}`} />
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <p className="stay-eyebrow">{experience.time}</p>
                  <h2 className="stay-display mt-2 text-4xl text-stay-ink">
                    {experience.name} <span className="stay-italic text-2xl text-stay-muted">{experience.english}</span>
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-stay-muted">{experience.detail}</p>
                </div>
                <span className="stay-display shrink-0 text-5xl text-stay-line">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="bg-stay-deep py-28 text-stay-bg sm:py-36">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead tone="dark" eyebrow="A day at HAVN" title={<>하루의 <em className="text-stay-sand">흐름</em></>} />
            <p className="mt-8 text-base leading-[1.9] text-stay-bg/70">
              정해진 것은 없습니다. 다만 이렇게 보내는 분들이 많습니다. 시간표라기보다 하나의 제안입니다.
            </p>
            <Link to={`${stayBase}/book`} className="stay-button-light mt-10">
              하룻밤 예약 <ArrowRight size={15} />
            </Link>
          </div>
          <ol className="flex flex-col lg:col-span-6 lg:col-start-7">
            {dayFlow.map((item, index) => (
              <Reveal key={item.time} as="li" delay={index * 60} className="grid grid-cols-12 items-baseline gap-4 border-b border-stay-bg/10 py-5">
                <span className="stay-display col-span-3 text-3xl text-stay-sand">{item.time}</span>
                <span className="col-span-9 text-base text-stay-bg/85">{item.text}</span>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>
    </>
  )
}
