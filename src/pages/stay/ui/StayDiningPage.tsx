import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Photo, Reveal } from '@/shared/ui'
import { dining } from '../model/content'
import { Container, SectionHead, stayBase } from './primitives'

export function StayDiningPage() {
  return (
    <>
      <section className="relative flex min-h-[80vh] flex-col justify-end overflow-hidden text-stay-bg">
        <Photo src={dining.hero} alt="소목의 접시" loading="eager" frameClassName="absolute inset-0" className="animate-kenburns" />
        <div aria-hidden className="stay-shade absolute inset-0" />
        <Container className="relative pb-14 pt-48">
          <p className="stay-eyebrow animate-rise-1 text-stay-bg/70">Dining</p>
          <h1 className="stay-display animate-rise-2 mt-4 text-[clamp(3.5rem,9vw,10rem)]">
            {dining.name} <span className="stay-italic text-[0.5em] text-stay-bg/70">{dining.english}</span>
          </h1>
          <p className="animate-rise-3 mt-6 max-w-xl text-lg leading-relaxed text-stay-bg/85">{dining.statement}</p>
        </Container>
      </section>

      <section className="py-28 sm:py-36">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="stay-eyebrow">Chef</p>
            <p className="stay-display mt-4 text-[clamp(1.75rem,2.8vw,2.75rem)] leading-[1.25] text-stay-ink">{dining.chef}</p>
          </Reveal>
          <div className="grid grid-cols-3 gap-3 lg:col-span-7">
            {dining.photos.map((src, index) => (
              <Reveal key={src} variant="scale" delay={index * 100} className={index === 1 ? 'pt-10' : ''}>
                <Photo src={src} alt="" frameClassName="aspect-[3/4] rounded-[1.25rem] bg-stay-sunken" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-stay-surface py-28 sm:py-36">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="This week" title={<>이번 주의 <em>다섯 접시</em></>} />
            <p className="mt-8 text-base leading-[1.9] text-stay-muted">메뉴는 매주 월요일에 바뀝니다. 채식 코스는 예약 시 말씀해 주세요.</p>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {dining.courses.map((course, index) => (
              <Reveal key={course.name} as="li" delay={index * 60} className="grid grid-cols-12 items-baseline gap-4 border-b border-stay-line py-6">
                <span className="stay-eyebrow col-span-3">{course.name}</span>
                <span className="stay-display col-span-9 text-2xl text-stay-ink sm:text-3xl">{course.dish}</span>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-28 sm:py-36">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <p className="stay-eyebrow">Hours</p>
            <dl className="mt-6 divide-y divide-stay-line border-y border-stay-line">
              {dining.hours.map((slot) => (
                <div key={slot.name} className="grid grid-cols-12 items-baseline py-4 text-sm">
                  <dt className="stay-display col-span-3 text-2xl text-stay-ink">{slot.name}</dt>
                  <dd className="col-span-5 text-stay-ink">{slot.time}</dd>
                  <dd className="col-span-4 text-right text-stay-muted">{slot.note}</dd>
                </div>
              ))}
            </dl>
            <Link to={`${stayBase}/book`} className="stay-button mt-10">
              디너 포함 예약 <ArrowRight size={15} />
            </Link>
          </Reveal>
          <Reveal variant="scale" delay={100} className="lg:col-span-6 lg:col-start-7">
            <Photo src={dining.breakfast} alt="창가의 아침 식사" frameClassName="aspect-[4/5] rounded-[1.5rem] bg-stay-sunken sm:aspect-[4/3]" />
          </Reveal>
        </Container>
      </section>
    </>
  )
}
