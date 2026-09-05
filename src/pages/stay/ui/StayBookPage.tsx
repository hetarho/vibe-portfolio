import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Check, Minus, Plus } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { formatWon } from '@/shared/lib'
import { Photo, Reveal } from '@/shared/ui'
import { formatKey, useBooking } from '../model/booking'
import { extras, findRoom, rooms } from '../model/rooms'
import { Container, stayBase } from './primitives'
import { RangeCalendar } from './RangeCalendar'

const steps = ['날짜와 인원', '객실', '확인'] as const

export function StayBookPage() {
  const booking = useBooking()
  const [step, setStep] = useState(() => (booking.roomSlug && !booking.checkIn ? 0 : booking.roomSlug ? 2 : 0))
  const [confirmed, setConfirmed] = useState<{ code: string; total: number; nights: number; room: string } | null>(null)

  const room = booking.roomSlug ? findRoom(booking.roomSlug) : undefined
  const datesReady = Boolean(booking.checkIn && booking.checkOut && booking.nights > 0)

  const go = (next: number) => {
    setStep(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const confirm = (event: FormEvent) => {
    event.preventDefault()
    if (!room) return
    setConfirmed({ code: `HV-${Date.now().toString().slice(-6)}`, total: booking.total, nights: booking.nights, room: room.name })
    booking.reset()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (confirmed) {
    return (
      <Container className="flex min-h-[80vh] flex-col items-center justify-center pt-32 pb-24 text-center">
        <span className="animate-pop grid size-16 place-items-center rounded-full bg-stay-moss text-stay-bg">
          <Check size={28} />
        </span>
        <p className="stay-eyebrow animate-rise-1 mt-8">Reservation {confirmed.code}</p>
        <h1 className="stay-display animate-rise-2 mt-4 text-[clamp(2.75rem,6vw,6rem)] text-stay-ink">
          {confirmed.room}에서 <em>{confirmed.nights}박</em>
        </h1>
        <p className="animate-rise-3 mt-5 max-w-md text-base leading-relaxed text-stay-muted">
          예약이 접수됐습니다. 총 {formatWon(confirmed.total)}, 결제는 체크인 때 합니다. 오시는 길과 셔틀 안내를 이메일로
          보내 드렸어요.
        </p>
        <div className="animate-rise-4 mt-10 flex gap-3">
          <Link to={stayBase} className="stay-button-ghost">
            홈으로
          </Link>
          <Link to={`${stayBase}/experiences`} className="stay-button">
            하루의 흐름 보기 <ArrowRight size={15} />
          </Link>
        </div>
      </Container>
    )
  }

  return (
    <Container className="pt-32 pb-28 sm:pt-40">
      <Link to={stayBase} className="stay-link text-xs text-stay-muted">
        <ArrowLeft size={12} /> HAVN
      </Link>
      <h1 className="stay-display animate-rise-1 mt-6 text-[clamp(2.75rem,6vw,6rem)] text-stay-ink">
        하룻밤을 <em>예약</em>합니다
      </h1>

      <ol className="mt-10 flex flex-wrap items-center gap-3 text-sm">
        {steps.map((label, index) => (
          <li key={label} className="flex items-center gap-3">
            <button
              type="button"
              disabled={index > step}
              onClick={() => go(index)}
              className={`grid size-7 place-items-center rounded-full font-mono text-xs transition ${
                index < step ? 'bg-stay-ink text-stay-bg' : index === step ? 'bg-stay-moss text-stay-bg' : 'bg-stay-sunken text-stay-muted'
              }`}
              aria-label={`${index + 1}단계 ${label}`}
            >
              {index < step ? <Check size={13} /> : index + 1}
            </button>
            <span className={index === step ? 'font-medium text-stay-ink' : 'text-stay-muted'}>{label}</span>
            {index < steps.length - 1 && <span className="h-px w-8 bg-stay-line" />}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {step === 0 && (
            <Reveal className="flex flex-col gap-8">
              <RangeCalendar checkIn={booking.checkIn} checkOut={booking.checkOut} onChange={booking.setDates} />
              <div className="flex flex-col gap-6 rounded-[1.5rem] bg-stay-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div>
                  <p className="stay-eyebrow">인원</p>
                  <p className="mt-1 text-sm text-stay-muted">캐빈은 4인까지, 다른 방은 2~3인까지 머물 수 있어요.</p>
                </div>
                <div className="inline-flex h-12 items-center rounded-full border border-stay-line">
                  <button type="button" onClick={() => booking.setGuests(Math.max(1, booking.guests - 1))} className="grid size-12 place-items-center rounded-l-full hover:bg-stay-sunken" aria-label="인원 줄이기">
                    <Minus size={16} />
                  </button>
                  <span className="min-w-12 text-center text-sm font-medium">{booking.guests}명</span>
                  <button type="button" onClick={() => booking.setGuests(Math.min(4, booking.guests + 1))} className="grid size-12 place-items-center rounded-r-full hover:bg-stay-sunken" aria-label="인원 늘리기">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <button type="button" disabled={!datesReady} onClick={() => go(1)} className="stay-button self-end">
                객실 고르기 <ArrowRight size={15} />
              </button>
            </Reveal>
          )}

          {step === 1 && (
            <Reveal className="flex flex-col gap-4">
              {rooms.map((item) => {
                const fits = item.guests >= booking.guests
                const on = booking.roomSlug === item.slug
                return (
                  <button
                    key={item.slug}
                    type="button"
                    disabled={!fits}
                    onClick={() => booking.setRoom(item.slug)}
                    aria-pressed={on}
                    className={`grid gap-5 rounded-[1.5rem] border p-4 text-left transition sm:grid-cols-12 sm:items-center ${
                      on ? 'border-stay-ink bg-stay-surface' : 'border-stay-line hover:border-stay-ink'
                    } disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    <Photo src={item.images[0]} alt="" frameClassName="aspect-[4/3] rounded-2xl bg-stay-sunken sm:col-span-4" />
                    <div className="sm:col-span-5">
                      <p className="stay-eyebrow">
                        {item.kind} · {item.size}㎡ · 최대 {item.guests}인
                      </p>
                      <p className="stay-display mt-2 text-3xl text-stay-ink">
                        {item.name} <span className="stay-italic text-xl text-stay-muted">{item.english}</span>
                      </p>
                      <p className="mt-2 text-sm text-stay-muted">{item.summary}</p>
                      {!fits && <p className="mt-2 text-xs text-stay-moss">{booking.guests}명은 머물 수 없는 방입니다</p>}
                    </div>
                    <div className="flex items-center justify-between sm:col-span-3 sm:flex-col sm:items-end sm:gap-3">
                      <p className="text-sm text-stay-muted">
                        {booking.nights}박 <b className="text-lg font-medium text-stay-ink">{formatWon(item.price * booking.nights)}</b>
                      </p>
                      <span className={`grid size-8 place-items-center rounded-full ${on ? 'bg-stay-ink text-stay-bg' : 'border border-stay-line text-transparent'}`}>
                        <Check size={14} />
                      </span>
                    </div>
                  </button>
                )
              })}
              <div className="mt-4 flex justify-between">
                <button type="button" onClick={() => go(0)} className="stay-button-ghost">
                  <ArrowLeft size={15} /> 날짜
                </button>
                <button type="button" disabled={!room} onClick={() => go(2)} className="stay-button">
                  확인 <ArrowRight size={15} />
                </button>
              </div>
            </Reveal>
          )}

          {step === 2 && (
            <Reveal as="form" className="flex flex-col gap-10" onSubmit={confirm}>
              {!datesReady || !room ? (
                <div className="rounded-[1.5rem] bg-stay-surface p-8">
                  <p className="stay-display text-3xl text-stay-ink">날짜와 방을 먼저 골라 주세요.</p>
                  <button type="button" onClick={() => go(0)} className="stay-button mt-6">
                    날짜 고르기
                  </button>
                </div>
              ) : (
                <>
                  <fieldset>
                    <legend className="stay-eyebrow">더할 것</legend>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {extras.map((extra) => {
                        const on = booking.extras.includes(extra.id)
                        return (
                          <button
                            key={extra.id}
                            type="button"
                            onClick={() => booking.toggleExtra(extra.id)}
                            aria-pressed={on}
                            className={`flex flex-col gap-2 rounded-2xl border p-5 text-left transition ${on ? 'border-stay-ink bg-stay-surface' : 'border-stay-line hover:border-stay-ink'}`}
                          >
                            <span className="flex items-center justify-between text-sm font-medium text-stay-ink">
                              {extra.name}
                              {on && <Check size={14} className="text-stay-moss" />}
                            </span>
                            <span className="text-xs text-stay-muted">{extra.detail}</span>
                            <span className="mt-auto text-sm text-stay-ink">
                              {formatWon(extra.price)} <span className="text-xs text-stay-muted">/ {extra.perGuest ? '1인 · 1박' : '1회 · 1박'}</span>
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  <fieldset className="grid gap-4 sm:grid-cols-2">
                    <legend className="stay-eyebrow mb-4">머무는 분</legend>
                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="font-medium">이름</span>
                      <input required className="stay-field" placeholder="이름" />
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="font-medium">연락처</span>
                      <input required type="tel" className="stay-field" placeholder="010-0000-0000" />
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                      <span className="font-medium">이메일</span>
                      <input required type="email" className="stay-field" placeholder="you@example.com" />
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                      <span className="font-medium">요청 사항</span>
                      <textarea rows={3} className="stay-field h-auto resize-none py-3" placeholder="도착 예정 시간, 알레르기, 기념일 등" />
                    </label>
                  </fieldset>

                  <label className="flex items-start gap-3 text-sm text-stay-muted">
                    <input required type="checkbox" className="mt-1 size-4 accent-stay-moss" />
                    체크인 7일 전까지 무료 취소, 이후 첫날 요금이 부과됩니다. 확인했습니다.
                  </label>

                  <div className="flex justify-between">
                    <button type="button" onClick={() => go(1)} className="stay-button-ghost">
                      <ArrowLeft size={15} /> 객실
                    </button>
                    <button type="submit" className="stay-button">
                      예약 확정 <ArrowRight size={15} />
                    </button>
                  </div>
                </>
              )}
            </Reveal>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 rounded-[1.5rem] bg-stay-surface p-7">
            <p className="stay-eyebrow">Your stay</p>
            {room ? (
              <>
                <Photo src={room.images[0]} alt="" frameClassName="mt-4 aspect-[4/3] rounded-2xl bg-stay-sunken" />
                <p className="stay-display mt-4 text-3xl text-stay-ink">
                  {room.name} <span className="stay-italic text-xl text-stay-muted">{room.english}</span>
                </p>
              </>
            ) : (
              <p className="stay-display mt-4 text-2xl text-stay-muted">아직 방을 고르지 않았어요</p>
            )}
            <dl className="mt-5 flex flex-col gap-2 border-t border-stay-line pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-stay-muted">체크인</dt>
                <dd className="text-stay-ink">{booking.checkIn ? formatKey(booking.checkIn, 'long') : '-'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stay-muted">체크아웃</dt>
                <dd className="text-stay-ink">{booking.checkOut ? formatKey(booking.checkOut, 'long') : '-'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stay-muted">인원</dt>
                <dd className="text-stay-ink">{booking.guests}명</dd>
              </div>
            </dl>
            {room && datesReady && (
              <dl className="mt-5 flex flex-col gap-2 border-t border-stay-line pt-5 text-sm">
                <div className="flex justify-between text-stay-muted">
                  <dt>
                    객실 {booking.nights}박 × {formatWon(room.price)}
                  </dt>
                  <dd>{formatWon(booking.roomTotal)}</dd>
                </div>
                {booking.extrasTotal > 0 && (
                  <div className="flex justify-between text-stay-muted">
                    <dt>더한 것</dt>
                    <dd>{formatWon(booking.extrasTotal)}</dd>
                  </div>
                )}
                <div className="flex justify-between text-stay-muted">
                  <dt>세금 10%</dt>
                  <dd>{formatWon(booking.tax)}</dd>
                </div>
                <div className="mt-2 flex justify-between text-lg font-medium text-stay-ink">
                  <dt>합계</dt>
                  <dd>{formatWon(booking.total)}</dd>
                </div>
              </dl>
            )}
            <p className="mt-5 text-xs leading-relaxed text-stay-muted">결제는 체크인 때 합니다. 7일 전까지 무료 취소.</p>
          </div>
        </aside>
      </div>
    </Container>
  )
}
