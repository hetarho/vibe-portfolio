import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { cx } from './primitives'

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
        // 체크리스트 화면은 행이 4~5개 쌓여서 여백이 그대로면 세로를 통째로 넘긴다.
        // 글자 크기는 그대로 두고 패딩·체크박스 상자만 한 단계 좁게 잡는다.
        'flex w-full items-center gap-4 rounded-card p-4 text-left transition duration-300 ease-deck md:gap-5 md:p-5',
        checked ? 'bg-accent-soft' : 'bg-surface-overlay hover:bg-surface-highlight',
      )}
    >
      <span
        className={cx(
          'grid size-10 shrink-0 place-items-center rounded-control transition duration-300 ease-deck md:size-12',
          checked ? 'bg-accent text-accent-contrast' : 'bg-surface-sunken text-content-muted inset-shadow-sunken',
        )}
      >
        <Check className="size-6 md:size-7" strokeWidth={3} />
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
