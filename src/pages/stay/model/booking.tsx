import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { TAX_RATE, extras, findRoom, type ExtraId } from './rooms'

/** 'YYYY-MM-DD' 로컬 날짜 키. Date 객체의 시간대 문제를 피한다 */
export const toKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export const fromKey = (key: string) => {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const nightsBetween = (from: string | null, to: string | null) => {
  if (!from || !to) return 0
  return Math.max(0, Math.round((fromKey(to).getTime() - fromKey(from).getTime()) / 86400000))
}

export const formatKey = (key: string | null, style: 'short' | 'long' = 'short') => {
  if (!key) return ''
  const date = fromKey(key)
  return style === 'long'
    ? date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })
    : date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })
}

type Booking = {
  checkIn: string | null
  checkOut: string | null
  guests: number
  roomSlug: string | null
  extras: ExtraId[]
  nights: number
  roomTotal: number
  extrasTotal: number
  tax: number
  total: number
  setDates: (checkIn: string | null, checkOut: string | null) => void
  setGuests: (guests: number) => void
  setRoom: (slug: string | null) => void
  toggleExtra: (id: ExtraId) => void
  reset: () => void
}

const BookingContext = createContext<Booking | null>(null)

/** 예약 진행 상태. 객실 상세에서 고른 방이 예약 페이지까지 이어진다 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [checkIn, setCheckIn] = useState<string | null>(null)
  const [checkOut, setCheckOut] = useState<string | null>(null)
  const [guests, setGuests] = useState(2)
  const [roomSlug, setRoom] = useState<string | null>(null)
  const [picked, setPicked] = useState<ExtraId[]>([])

  const value = useMemo<Booking>(() => {
    const nights = nightsBetween(checkIn, checkOut)
    const room = roomSlug ? findRoom(roomSlug) : undefined
    const roomTotal = room ? room.price * nights : 0
    const extrasTotal = picked.reduce((sum, id) => {
      const extra = extras.find((item) => item.id === id)
      if (!extra) return sum
      return sum + extra.price * (extra.perGuest ? guests : 1) * Math.max(nights, 1)
    }, 0)
    const tax = Math.round((roomTotal + extrasTotal) * TAX_RATE)
    return {
      checkIn,
      checkOut,
      guests,
      roomSlug,
      extras: picked,
      nights,
      roomTotal,
      extrasTotal,
      tax,
      total: roomTotal + extrasTotal + tax,
      setDates: (nextIn, nextOut) => {
        setCheckIn(nextIn)
        setCheckOut(nextOut)
      },
      setGuests,
      setRoom,
      toggleExtra: (id) => setPicked((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id])),
      reset: () => {
        setCheckIn(null)
        setCheckOut(null)
        setGuests(2)
        setRoom(null)
        setPicked([])
      },
    }
  }, [checkIn, checkOut, guests, roomSlug, picked])

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) throw new Error('useBooking은 BookingProvider 안에서만 쓸 수 있습니다')
  return context
}
