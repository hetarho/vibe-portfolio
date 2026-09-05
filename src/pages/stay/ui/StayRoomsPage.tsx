import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { formatWon } from '@/shared/lib'
import { Photo, Reveal } from '@/shared/ui'
import { rooms } from '../model/rooms'
import { Container, stayBase } from './primitives'

export function StayRoomsPage() {
  return (
    <>
      <section className="pt-36 pb-16 sm:pt-44">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="stay-eyebrow animate-rise-1">Rooms · 6</p>
            <h1 className="stay-display animate-rise-2 mt-5 text-[clamp(3rem,7vw,7.5rem)] text-stay-ink">
              여섯 개의 방,
              <br />
              <em>여섯 가지 시간</em>
            </h1>
          </div>
          <p className="animate-rise-3 text-base leading-[1.9] text-stay-muted lg:col-span-4 lg:col-start-9">
            어떤 방은 저녁이 아름답고, 어떤 방은 아침이 먼저 옵니다. 방마다 가장 좋은 시간이 다릅니다. 그 시간을 기준으로
            골라 보세요.
          </p>
        </Container>
      </section>

      <section className="pb-32">
        <Container className="flex flex-col gap-24">
          {rooms.map((room, index) => {
            const flip = index % 2 === 1
            return (
              <Reveal key={room.slug} className={`grid gap-8 lg:grid-cols-12 lg:items-center`}>
                <Link
                  to={`${stayBase}/rooms/$slug`}
                  params={{ slug: room.slug }}
                  className={`stay-card block lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}
                  aria-label={`${room.name} 보기`}
                >
                  <Photo src={room.images[0]} alt={room.name} loading={index < 2 ? 'eager' : 'lazy'} frameClassName="aspect-[4/3] rounded-[1.5rem] bg-stay-sunken" />
                </Link>
                <div className={`lg:col-span-4 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'}`}>
                  <p className="stay-eyebrow">
                    {String(index + 1).padStart(2, '0')} · {room.kind}
                  </p>
                  <h2 className="stay-display mt-3 text-[clamp(2.5rem,4vw,4rem)] text-stay-ink">
                    {room.name} <span className="stay-italic text-[0.6em] text-stay-muted">{room.english}</span>
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-stay-muted">{room.summary}</p>
                  <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-stay-line py-4 text-sm">
                    <div>
                      <dt className="stay-eyebrow text-[10px]">면적</dt>
                      <dd className="mt-1 text-stay-ink">{room.size}㎡</dd>
                    </div>
                    <div>
                      <dt className="stay-eyebrow text-[10px]">인원</dt>
                      <dd className="mt-1 text-stay-ink">최대 {room.guests}인</dd>
                    </div>
                    <div>
                      <dt className="stay-eyebrow text-[10px]">전망</dt>
                      <dd className="mt-1 text-stay-ink">{room.view}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-stay-muted">
                      1박 <b className="text-lg font-medium text-stay-ink">{formatWon(room.price)}</b>
                    </p>
                    <Link to={`${stayBase}/rooms/$slug`} params={{ slug: room.slug }} className="stay-link text-sm text-stay-ink">
                      자세히 <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </Container>
      </section>
    </>
  )
}
