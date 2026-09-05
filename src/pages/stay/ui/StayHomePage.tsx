import { Link } from '@tanstack/react-router'
import { ArrowDown, ArrowRight, Calendar, Users } from 'lucide-react'
import { Photo, Reveal } from '@/shared/ui'
import { formatKey, useBooking } from '../model/booking'
import { dining, experiences, hero, introPhotos, reviews, seasons } from '../model/content'
import { rooms } from '../model/rooms'
import { Container, RoomCard, SectionHead, stayBase, TextLink } from './primitives'

const featured = rooms.filter((room) => room.featured).slice(0, 3)

export function StayHomePage() {
  const booking = useBooking()

  return (
    <>
      {/* 히어로 */}
      <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden text-stay-bg">
        <Photo src={hero.image} alt={hero.alt} loading="eager" frameClassName="absolute inset-0" className="animate-kenburns" />
        <div aria-hidden className="stay-shade absolute inset-0" />
        <Container className="relative pb-10 pt-40 sm:pb-16">
          <p className="stay-eyebrow animate-rise-1 text-stay-bg/70">Gangwon, 780m above the fog</p>
          <h1 className="stay-display animate-rise-2 mt-5 max-w-[16ch] text-[clamp(3.25rem,8.5vw,9.5rem)]">
            안개가 걷히길 <em>기다리는 일</em>이 하루의 전부여도 되는 곳
          </h1>
          <div className="animate-rise-4 mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-md text-base leading-relaxed text-stay-bg/80 sm:text-lg">
              방은 여섯 개. 숲 사우나와 안개 풀, 20km 안에서 온 식탁. 강원 인제, 능선 아래.
            </p>
            <Link
              to={`${stayBase}/book`}
              className="group flex w-full max-w-xl items-stretch overflow-hidden rounded-full bg-stay-bg text-stay-ink shadow-2xl"
              aria-label="예약하러 가기"
            >
              <span className="flex flex-1 items-center gap-3 px-6 py-4">
                <Calendar size={18} className="text-stay-muted" />
                <span className="text-sm">
                  {booking.checkIn && booking.checkOut ? `${formatKey(booking.checkIn)} → ${formatKey(booking.checkOut)}` : '날짜 선택'}
                </span>
              </span>
              <span className="hidden items-center gap-3 border-l border-stay-line px-6 py-4 sm:flex">
                <Users size={18} className="text-stay-muted" />
                <span className="text-sm">{booking.guests}명</span>
              </span>
              <span className="m-1.5 grid place-items-center rounded-full bg-stay-ink px-6 text-sm font-medium text-stay-bg transition group-hover:bg-stay-moss">
                예약
              </span>
            </Link>
          </div>
        </Container>
        <button
          type="button"
          onClick={() => document.querySelector('#stay-intro')?.scrollIntoView({ behavior: 'smooth' })}
          className="animate-breathe absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-stay-bg/70 lg:block"
          aria-label="아래로"
        >
          <ArrowDown size={20} />
        </button>
      </section>

      {/* 소개 */}
      <section id="stay-intro" className="py-28 sm:py-40">
        <Container className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="stay-eyebrow">The place</p>
            <h2 className="stay-display mt-5 text-[clamp(2.5rem,4.5vw,4.5rem)] text-stay-ink">
              낮게 짓고, <em>조용히</em> 머무는 여섯 개의 방
            </h2>
            <p className="mt-8 text-base leading-[1.9] text-stay-muted sm:text-lg">
              하븐은 폐교된 분교 자리에 3년을 들여 지었습니다. 건물은 주변 나무보다 낮고, 방은 여섯 개를 넘지 않습니다.
              저녁 라운지에서 서로의 얼굴을 기억할 수 있는 숫자입니다.
            </p>
            <div className="mt-10">
              <TextLink to={`${stayBase}/story`}>하븐의 이야기</TextLink>
            </div>
          </Reveal>
          <div className="grid grid-cols-12 gap-4 lg:col-span-7">
            <Reveal variant="scale" className="col-span-7">
              <Photo src={introPhotos[0]} alt="안개 낀 숲" frameClassName="aspect-[4/5] rounded-[1.5rem] bg-stay-sunken" />
            </Reveal>
            <Reveal variant="scale" delay={150} className="col-span-5 pt-16">
              <Photo src={introPhotos[1]} alt="침대에서 책 읽는 사람" frameClassName="aspect-[4/5] rounded-[1.5rem] bg-stay-sunken" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 객실 */}
      <section className="pb-28 sm:pb-40">
        <Container>
          <SectionHead eyebrow="Rooms" title={<>여섯 개의 방, <em>여섯 가지 시간</em></>} aside={<TextLink to={`${stayBase}/rooms`}>객실 전체 보기</TextLink>} />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {featured.map((room, index) => (
              <RoomCard key={room.slug} room={room} delay={index * 100} eager />
            ))}
          </div>
        </Container>
      </section>

      {/* 경험 스트립 */}
      <section className="bg-stay-deep py-28 text-stay-bg sm:py-36">
        <Container>
          <SectionHead tone="dark" eyebrow="Experiences" title={<>하루를 채우는 <em className="text-stay-sand">여섯 가지</em></>} aside={<TextLink to={`${stayBase}/experiences`} tone="dark">경험 자세히</TextLink>} />
        </Container>
        <div className="stay-strip mt-14 flex gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12">
          {experiences.map((experience, index) => (
            <Reveal key={experience.slug} delay={index * 60} className="stay-card w-[76vw] shrink-0 sm:w-[44vw] lg:w-[28vw]">
              <Link to={`${stayBase}/experiences`} className="block" aria-label={experience.name}>
                <Photo src={experience.image} alt={experience.name} frameClassName="aspect-[4/5] rounded-[1.5rem] bg-stay-ink" />
                <p className="stay-eyebrow mt-5 text-stay-bg/50">{experience.time}</p>
                <h3 className="stay-display mt-2 text-3xl">
                  {experience.name} <span className="stay-italic text-xl text-stay-bg/60">{experience.english}</span>
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 다이닝 */}
      <section className="py-28 sm:py-40">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal variant="scale" className="lg:col-span-7">
            <Photo src={dining.hero} alt="소목의 접시" frameClassName="aspect-[4/3] rounded-[1.5rem] bg-stay-sunken" />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <p className="stay-eyebrow">Dining · {dining.english}</p>
            <h2 className="stay-display mt-4 text-[clamp(2.5rem,4vw,4rem)] text-stay-ink">
              20km 안의 <em>식탁</em>
            </h2>
            <p className="mt-6 text-base leading-[1.9] text-stay-muted">{dining.statement}</p>
            <div className="mt-8">
              <TextLink to={`${stayBase}/dining`}>다이닝 소목</TextLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 사계절 */}
      <section className="pb-28 sm:pb-40">
        <Container>
          <SectionHead eyebrow="Seasons" title={<>언제 와도 <em>다른 곳</em></>} />
          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {seasons.map((season, index) => (
              <Reveal key={season.name} delay={index * 80} className="stay-card group relative overflow-hidden rounded-[1.5rem]">
                <Photo src={season.image} alt={season.name} frameClassName="aspect-[3/4] bg-stay-sunken" />
                <div className="stay-shade absolute inset-0 flex flex-col justify-end p-5 text-stay-bg">
                  <p className="stay-eyebrow text-stay-bg/60">{season.months}</p>
                  <p className="stay-display mt-1 text-4xl">{season.name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-stay-bg/80">{season.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 후기 */}
      <section className="border-t border-stay-line bg-stay-surface py-28 sm:py-36">
        <Container>
          <SectionHead align="center" eyebrow="Guests" title={<>머문 사람들의 <em>말</em></>} />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {reviews.map((review, index) => (
              <Reveal key={review.by} delay={index * 90} className="rounded-[1.5rem] bg-stay-bg p-8">
                <p className="stay-display text-2xl leading-snug text-stay-ink">“{review.text}”</p>
                <p className="mt-6 text-xs tracking-wide text-stay-muted">{review.by}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <Photo src="/images/stay/terrace-sunset.jpg" alt="" frameClassName="aspect-[4/5] sm:aspect-[21/9]" />
        <div className="absolute inset-0 flex items-center justify-center bg-stay-ink/40 p-6 text-center text-stay-bg">
          <Reveal>
            <p className="stay-eyebrow text-stay-bg/70">Reservations</p>
            <h2 className="stay-display mt-4 text-[clamp(2.5rem,6vw,6rem)]">
              오늘 저녁, <em>능선 위의 해</em>
            </h2>
            <Link to={`${stayBase}/book`} className="stay-button-light mt-8">
              예약하기 <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
