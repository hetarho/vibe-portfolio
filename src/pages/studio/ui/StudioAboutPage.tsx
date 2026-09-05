import { Photo, Reveal } from '@/shared/ui'
import { awards, studioPhotos, team, timeline, values } from '../model/studio'
import { Container, PillLink, SectionHead, studioBase } from './primitives'

export function StudioAboutPage() {
  return (
    <>
      <section className="pt-36 pb-20 sm:pt-44">
        <Container>
          <p className="studio-eyebrow animate-rise-1">( Studio )</p>
          <h1 className="studio-display animate-rise-2 mt-5 max-w-[12ch] text-[clamp(3rem,8.5vw,9.5rem)] text-studio-ink">
            A small studio with a <span className="studio-serif text-studio-accent">heavy</span> hand.
          </h1>
          <div className="animate-rise-4 mt-12 grid gap-8 md:grid-cols-12">
            <p className="text-lg leading-relaxed text-studio-muted md:col-span-6 md:col-start-7">
              모로우는 2018년 서울에서 시작한 브랜드·디지털 스튜디오입니다. 열네 명이 두 도시에서 일하고, 한 해에 여덟
              개 남짓의 프로젝트만 맡습니다. 적게 맡아서 깊게 들어가는 것이 우리가 아는 유일한 방식입니다.
            </p>
          </div>
        </Container>
      </section>

      <section className="px-2 sm:px-4">
        <div className="grid gap-4 md:grid-cols-12">
          <Reveal variant="scale" className="md:col-span-8">
            <Photo src={studioPhotos[0]} alt="한남동 스튜디오" loading="eager" frameClassName="aspect-[3/2] rounded-sm" />
          </Reveal>
          <Reveal variant="scale" delay={120} className="md:col-span-4">
            <Photo src={studioPhotos[1]} alt="스튜디오 회의 공간" frameClassName="aspect-[3/2] h-full rounded-sm md:aspect-auto" />
          </Reveal>
        </div>
      </section>

      <section className="py-28 sm:py-36">
        <Container>
          <SectionHead eyebrow="( Principles )" title="Three things we believe." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-studio-line md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 90} className="bg-studio-bg p-8 sm:p-10">
                <span className="font-mono text-xs text-studio-muted">0{index + 1}</span>
                <h3 className="studio-display mt-6 text-[clamp(1.75rem,2.8vw,2.75rem)] text-studio-ink">{value.title}</h3>
                <p className="mt-6 text-base leading-relaxed text-studio-muted">{value.detail}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-studio-line bg-studio-surface py-28 sm:py-36">
        <Container>
          <SectionHead eyebrow="( People )" title="Fourteen of us." aside={<span>Seoul 11 · Copenhagen 3</span>} />
          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
            {team.map((member, index) => (
              <Reveal key={member.name} as="li" delay={index * 60}>
                <div className="studio-card group">
                  <Photo
                    src={member.photo}
                    alt={member.name}
                    frameClassName="aspect-[4/5] rounded-sm bg-studio-raised"
                    className="grayscale transition duration-700 group-hover:grayscale-0"
                  />
                  <p className="mt-4 font-semibold text-studio-ink">{member.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-studio-muted">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-28 sm:py-36">
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-6">
              <SectionHead eyebrow="( Recognition )" title="Awards" />
              <ul className="mt-10 border-t border-studio-line">
                {awards.map((award, index) => (
                  <Reveal key={`${award.year}-${award.title}`} as="li" delay={index * 40}>
                    <div className="studio-row grid grid-cols-12 items-baseline gap-3 border-b border-studio-line px-2 py-4 text-sm">
                      <span className="col-span-2 font-mono text-xs text-studio-muted">{award.year}</span>
                      <span className="col-span-7 text-studio-ink">{award.title}</span>
                      <span className="col-span-3 text-right text-studio-muted">{award.project}</span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <SectionHead eyebrow="( Timeline )" title="Since 2018" />
              <ol className="mt-10 flex flex-col gap-8 border-l border-studio-line pl-8">
                {timeline.map((item, index) => (
                  <Reveal key={item.year} as="li" delay={index * 60} className="relative">
                    <span className="absolute -left-[2.3rem] top-2 size-2.5 rounded-full bg-studio-accent" />
                    <p className="font-mono text-xs text-studio-muted">{item.year}</p>
                    <p className="mt-1.5 text-lg text-studio-ink">{item.text}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
          <Reveal className="mt-24 flex flex-col items-start gap-6 border-t border-studio-line pt-12 sm:flex-row sm:items-center sm:justify-between">
            <p className="studio-display text-[clamp(2rem,4vw,3.5rem)] text-studio-ink">
              함께 일할 사람을 <span className="studio-serif text-studio-accent">늘</span> 찾습니다.
            </p>
            <PillLink to={`${studioBase}/contact`}>Say hello</PillLink>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
