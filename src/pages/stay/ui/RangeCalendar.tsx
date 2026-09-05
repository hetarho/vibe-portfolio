import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { toKey } from '../model/booking'

type Props = {
  checkIn: string | null
  checkOut: string | null
  onChange: (checkIn: string | null, checkOut: string | null) => void
  /** 한 번에 보여줄 달 수 */
  months?: 1 | 2
}

const weekdays = ['일', '월', '화', '수', '목', '금', '토']

/** 체크인·체크아웃 범위를 고르는 달력. 첫 클릭이 체크인, 둘째 클릭이 체크아웃 */
export function RangeCalendar({ checkIn, checkOut, onChange, months = 2 }: Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [hover, setHover] = useState<string | null>(null)
  const todayKey = toKey(today)

  const pick = (key: string) => {
    if (!checkIn || (checkIn && checkOut)) {
      onChange(key, null)
      return
    }
    if (key <= checkIn) {
      onChange(key, null)
      return
    }
    onChange(checkIn, key)
  }

  const rangeEnd = checkOut ?? (checkIn && hover && hover > checkIn ? hover : null)

  const renderMonth = (offset: number) => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth() + offset, 1)
    const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
    const leading = first.getDay()
    const cells: (Date | null)[] = [...Array<null>(leading).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => new Date(first.getFullYear(), first.getMonth(), i + 1))]

    return (
      <div key={offset} className="flex-1">
        <p className="stay-display mb-4 text-center text-2xl text-stay-ink">
          {first.getFullYear()}년 {first.getMonth() + 1}월
        </p>
        <div className="grid grid-cols-7 text-center text-[11px] text-stay-muted">
          {weekdays.map((day) => (
            <span key={day} className="py-1">
              {day}
            </span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-y-1">
          {cells.map((date, index) => {
            if (!date) return <span key={`empty-${index}`} />
            const key = toKey(date)
            const disabled = key < todayKey
            const isEdge = key === checkIn || key === checkOut
            const between = Boolean(checkIn && rangeEnd && key > checkIn && key < rangeEnd)
            return (
              <button
                key={key}
                type="button"
                disabled={disabled}
                onClick={() => pick(key)}
                onMouseEnter={() => setHover(key)}
                onMouseLeave={() => setHover(null)}
                className={`stay-day ${isEdge ? 'is-edge' : ''} ${between ? 'is-between' : ''} ${key === todayKey && !isEdge ? 'font-semibold underline decoration-stay-moss underline-offset-4' : ''}`}
                aria-label={`${date.getMonth() + 1}월 ${date.getDate()}일`}
                aria-pressed={isEdge}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const canGoBack = cursor > new Date(today.getFullYear(), today.getMonth(), 1)

  return (
    <div className="rounded-[1.5rem] bg-stay-surface p-5 sm:p-7">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          disabled={!canGoBack}
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          className="grid size-9 place-items-center rounded-full text-stay-ink transition hover:bg-stay-sunken disabled:opacity-30"
          aria-label="이전 달"
        >
          <ChevronLeft size={18} />
        </button>
        <p className="text-xs text-stay-muted">{checkIn ? (checkOut ? '날짜를 다시 고르려면 아무 날이나 누르세요' : '체크아웃 날짜를 고르세요') : '체크인 날짜를 고르세요'}</p>
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          className="grid size-9 place-items-center rounded-full text-stay-ink transition hover:bg-stay-sunken"
          aria-label="다음 달"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="flex flex-col gap-8 sm:flex-row">
        {renderMonth(0)}
        {months === 2 && <div className="hidden flex-1 sm:block">{renderMonth(1)}</div>}
      </div>
    </div>
  )
}
