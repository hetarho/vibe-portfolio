import { ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import { cx } from '../../../deck'

type Props = {
  href: string
  children: ReactNode
  tone?: 'quiet' | 'accent'
}

/**
 * 강의장에서 그대로 눌러 여는 바깥 링크.
 * 이 덱만 쓰기 때문에 덱 폴더에 둔다 — 다른 덱이 링크를 쓰게 되면 그때 deck/으로 올린다.
 */
export function DeckLink({ href, children, tone = 'quiet' }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cx(
        'inline-flex items-center gap-3 rounded-full px-4 py-2.5 text-deck-caption font-bold transition duration-200 ease-deck md:px-6 md:py-3',
        tone === 'accent'
          ? 'bg-accent text-accent-contrast shadow-lifted hover:bg-accent-strong'
          : 'bg-surface-highlight text-content-primary shadow-raised hover:bg-accent hover:text-accent-contrast',
      )}
    >
      {children}
      <ExternalLink className="size-5 shrink-0 md:size-6" />
    </a>
  )
}
