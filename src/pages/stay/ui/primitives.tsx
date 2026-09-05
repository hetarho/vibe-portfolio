import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { pageInfo } from '@/shared/config/portfolio'
import { formatWon } from '@/shared/lib'
import { Photo, Reveal } from '@/shared/ui'
import type { Room } from '../model/rooms'

export const stayBase = pageInfo.stay.path

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[100rem] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
}

export function SectionHead({
  eyebrow,
  title,
  aside,
  align = 'left',
  tone = 'light',
}: {
  eyebrow: string
  title: ReactNode
  aside?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}) {
  const ink = tone === 'dark' ? 'text-stay-bg' : 'text-stay-ink'
  const muted = tone === 'dark' ? 'text-stay-bg/60' : 'text-stay-muted'
  return (
    <Reveal
      className={`flex flex-col gap-5 ${align === 'center' ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}
    >
      <div>
        <p className={`stay-eyebrow ${muted}`}>{eyebrow}</p>
        <h2 className={`stay-display mt-4 text-[clamp(2.5rem,5vw,4.75rem)] ${ink}`}>{title}</h2>
      </div>
      {aside && <div className={`text-sm ${muted}`}>{aside}</div>}
    </Reveal>
  )
}

export function RoomCard({ room, delay = 0, eager = false }: { room: Room; delay?: number; eager?: boolean }) {
  return (
    <Reveal delay={delay} className="stay-card group">
      <Link to={`${stayBase}/rooms/$slug`} params={{ slug: room.slug }} className="block" aria-label={`${room.name} 객실 보기`}>
        <Photo src={room.images[0]} alt={room.name} loading={eager ? 'eager' : 'lazy'} frameClassName="aspect-[4/5] rounded-[1.5rem] bg-stay-sunken" />
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="stay-eyebrow">
              {room.kind} · {room.size}㎡ · {room.guests}인
            </p>
            <h3 className="stay-display mt-2 text-3xl text-stay-ink">
              {room.name} <span className="stay-italic text-2xl text-stay-muted">{room.english}</span>
            </h3>
            <p className="mt-2 text-sm text-stay-muted">{room.summary}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-sm font-medium text-stay-ink">{formatWon(room.price)}</p>
            <p className="text-[11px] text-stay-muted">1박 · 세금 별도</p>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export function TextLink({ to, children, tone = 'light' }: { to: string; children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <Link to={to} className={`stay-link text-sm ${tone === 'dark' ? 'text-stay-bg' : 'text-stay-ink'}`}>
      {children} <ArrowRight size={14} />
    </Link>
  )
}
