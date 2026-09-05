import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { formatWon } from '@/shared/lib'
import { Photo, Reveal } from '@/shared/ui'
import { formatKey, useBooking } from '../model/booking'
import { findRoom, rooms } from '../model/rooms'
import { Container, RoomCard, stayBase } from './primitives'

export function StayRoomDetailPage({ slug }: { slug: string }) {
  const room = findRoom(slug)
  const booking = useBooking()
  const navigate = useNavigate()

  if (!room) {
    return (
      <Container className="pt-44 pb-32 text-center">
        <h1 className="stay-display text-5xl text-stay-ink">그런 방은 없습니다.</h1>
        <Link to={`${stayBase}/rooms`} className="stay-button mt-8">
          객실 목록
        </Link>
      </Container>
    )
  }

  const others = rooms.filter((item) => item.slug !== room.slug).slice(0, 3)
  const [heroImage, ...rest] = room.images

  const book = () => {
    booking.setRoom(room.slug)
    void navigate({ to: `${stayBase}/book` })
  }

  return (
    <article>
      <section className="pt-32 sm:pt-40">
        <Container>
          <Link to={`${stayBase}/rooms`} className="stay-link animate-rise-1 text-xs text-stay-muted">
            <ArrowLeft size={12} /> 객실
          </Link>
          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="stay-eyebrow animate-rise-2">
                {room.kind} · {room.size}㎡ · 최대 {room.guests}인 · {room.view} 전망
              </p>
              <h1 className="stay-display animate-rise-3 mt-4 text-[clamp(3rem,8vw,8.5rem)] text-stay-ink">
                {room.name} <span className="stay-italic text-[0.5em] text-stay-muted">{room.english}</span>
              </h1>
            </div>
            <p className="stay-italic animate-rise-4 text-2xl text-stay-muted lg:col-span-4 lg:pb-4">{room.highlight}</p>
          </div>
        </Container>
        <div className="mt-10 grid gap-3 px-2 sm:px-4 lg:grid-cols-12">
          <Reveal variant="scale" className="lg:col-span-8">
            <Photo src={heroImage} alt={room.name} loading="eager" frameClassName="aspect-[4/3] rounded-[1.5rem] bg-stay-sunken lg:h-full lg:aspect-auto" className="animate-kenburns" />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 lg:col-span-4 lg:grid-cols-1">
            {rest.map((src, index) => (
              <Reveal key={src} variant="scale" delay={100 + index * 100}>
                <Photo src={src} alt={`${room.name} ${index + 2}`} frameClassName="aspect-[4/3] rounded-[1.5rem] bg-stay-sunken" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="flex flex-col gap-6 text-lg leading-[1.9] text-stay-ink/85">
              {room.description.map((paragraph) => (
                <p key={paragraph.slice(0, 20)}>{paragraph}</p>
              ))}
            </Reveal>
            <Reveal delay={100} className="mt-14">
              <p className="stay-eyebrow">Amenities</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-stay-ink sm:grid-cols-3">
                {room.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-2">
                    <Check size={14} className="text-stay-moss" /> {amenity}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={150} className="mt-14 grid gap-4 border-t border-stay-line pt-8 text-sm sm:grid-cols-3">
              <div>
                <p className="stay-eyebrow text-[10px]">침대</p>
                <p className="mt-1 text-stay-ink">{room.bed}</p>
              </div>
              <div>
                <p className="stay-eyebrow text-[10px]">체크인 · 아웃</p>
                <p className="mt-1 text-stay-ink">15:00 · 11:00</p>
              </div>
              <div>
                <p className="stay-eyebrow text-[10px]">취소</p>
                <p className="mt-1 text-stay-ink">7일 전까지 무료</p>
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={120} className="sticky top-28 rounded-[1.5rem] bg-stay-surface p-7 shadow-sm">
              <p className="stay-eyebrow">1박 요금</p>
              <p className="stay-display mt-2 text-4xl text-stay-ink">
                {formatWon(room.price)} <span className="text-base text-stay-muted">/ 세금 별도</span>
              </p>
              <dl className="mt-6 flex flex-col gap-2 border-y border-stay-line py-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-stay-muted">날짜</dt>
                  <dd className="text-stay-ink">{booking.checkIn && booking.checkOut ? `${formatKey(booking.checkIn)} → ${formatKey(booking.checkOut)}` : '예약 화면에서 선택'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stay-muted">인원</dt>
                  <dd className="text-stay-ink">{booking.guests}명</dd>
                </div>
                {booking.nights > 0 && (
                  <div className="flex justify-between font-medium">
                    <dt className="text-stay-muted">{booking.nights}박</dt>
                    <dd className="text-stay-ink">{formatWon(room.price * booking.nights)}</dd>
                  </div>
                )}
              </dl>
              <button type="button" onClick={book} className="stay-button mt-6 w-full">
                이 방으로 예약 <ArrowRight size={15} />
              </button>
              <p className="mt-3 text-center text-xs text-stay-muted">결제는 체크인 때. 지금은 예약만.</p>
            </Reveal>
          </aside>
        </Container>
      </section>

      <section className="border-t border-stay-line py-24">
        <Container>
          <Reveal>
            <p className="stay-eyebrow">Other rooms</p>
            <h2 className="stay-display mt-3 text-4xl text-stay-ink">
              다른 <em>시간</em>의 방
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {others.map((item, index) => (
              <RoomCard key={item.slug} room={item} delay={index * 80} />
            ))}
          </div>
        </Container>
      </section>
    </article>
  )
}
