import { Pause, Play, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cx } from './primitives'

type Props = {
  /** 카운트다운 시작 초 */
  seconds: number
  /** 화면에 들어오자마자 자동으로 흐르게 할지 */
  autoStart?: boolean
  caption?: string
  size?: 'lg' | 'md'
}

function format(total: number) {
  const minutes = Math.floor(total / 60)
  const rest = total % 60
  return `${minutes}:${String(rest).padStart(2, '0')}`
}

export function CountdownTimer({ seconds, autoStart = false, caption, size = 'lg' }: Props) {
  const [remaining, setRemaining] = useState(seconds)
  const [running, setRunning] = useState(autoStart)

  useEffect(() => {
    setRemaining(seconds)
    setRunning(autoStart)
  }, [seconds, autoStart])

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          window.clearInterval(id)
          return 0
        }
        return value - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [running])

  const done = remaining === 0

  return (
    <div className="flex flex-col items-center gap-5">
      {caption ? <p className="text-deck-caption font-semibold tracking-widest text-content-muted uppercase">{caption}</p> : null}

      <p
        aria-live="off"
        className={cx(
          'font-bold tabular-nums tracking-tight',
          size === 'lg' ? 'text-deck-numeric' : 'text-deck-hero',
          done ? 'text-accent animate-breathe' : 'text-content-strong',
        )}
      >
        {format(remaining)}
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setRunning((value) => !value)}
          disabled={done}
          className="flex items-center gap-3 rounded-full bg-surface-highlight px-7 py-3 text-deck-caption font-semibold text-content-primary transition duration-200 ease-deck hover:bg-accent hover:text-accent-contrast disabled:opacity-40"
        >
          {running ? <Pause size={22} /> : <Play size={22} />}
          {running ? '일시정지' : '시작'}
        </button>
        <button
          type="button"
          onClick={() => {
            setRemaining(seconds)
            setRunning(false)
          }}
          className="flex items-center gap-3 rounded-full bg-surface-raised px-7 py-3 text-deck-caption font-semibold text-content-secondary transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary"
        >
          <RotateCcw size={22} />
          리셋
        </button>
      </div>
    </div>
  )
}
