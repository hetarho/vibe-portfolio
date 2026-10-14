import { Eye } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { cx } from '../../../deck'

type Props = {
  label: string
  children: ReactNode
  className?: string
}

/**
 * 눌러야 보이는 칸. 먼저 쳐 보거나 말해 본 다음에 여는 내용을 담는다.
 * 화면을 넘겼다 돌아오면 다시 닫힌다. 같은 화면을 두 번째로 볼 때도 먼저 떠올려 보게 하려는 것이다.
 */
export function Reveal({ label, children, className }: Props) {
  const [open, setOpen] = useState(false)

  if (open) return <div className={cx('animate-rise', className)}>{children}</div>

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cx(
        'flex w-full items-center justify-center gap-3 rounded-card bg-surface-sunken px-4 py-4 text-deck-caption font-semibold text-content-muted inset-shadow-sunken transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary md:py-5',
        className,
      )}
    >
      <Eye className="size-5 shrink-0 md:size-6" />
      {label}
    </button>
  )
}
