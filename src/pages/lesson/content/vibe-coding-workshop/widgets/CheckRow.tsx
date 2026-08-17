import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { cx } from '@/features/slide-deck'

type Props = {
  checked: boolean
  onToggle: () => void
  children: ReactNode
  hint?: ReactNode
}

/** 강사가 하나씩 눌러 체크하며 진행하는 큰 체크박스 행 */
export function CheckRow({ checked, onToggle, children, hint }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className={cx(
        'flex w-full items-center gap-6 rounded-card p-6 text-left transition duration-300 ease-deck',
        checked ? 'bg-accent-soft' : 'bg-surface-overlay hover:bg-surface-highlight',
      )}
    >
      <span
        className={cx(
          'grid size-14 shrink-0 place-items-center rounded-control transition duration-300 ease-deck',
          checked ? 'bg-accent text-accent-contrast' : 'bg-surface-sunken text-content-muted inset-shadow-sunken',
        )}
      >
        <Check size={30} strokeWidth={3} />
      </span>
      <span className="flex flex-col gap-1">
        <span
          className={cx(
            'text-deck-body font-semibold transition duration-300 ease-deck',
            checked ? 'text-content-strong' : 'text-content-primary',
          )}
        >
          {children}
        </span>
        {hint ? <span className="text-deck-caption text-content-muted">{hint}</span> : null}
      </span>
    </button>
  )
}
