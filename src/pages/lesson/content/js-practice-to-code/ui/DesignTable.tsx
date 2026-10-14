import { cx, Panel } from '../../../deck'
import type { DesignRow } from '../model/practice'

/**
 * 화면 설계표. 칸 하나마다 태그와 id를 한 줄로 정한다.
 * id 열이 HTML과 자바스크립트를 잇는 다리라서 따로 세운다.
 */
export function DesignTable({ rows }: { rows: DesignRow[] }) {
  return (
    <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
      <div className="hidden grid-cols-9 gap-4 px-4 text-deck-caption font-semibold tracking-widest text-content-muted md:grid">
        <p className="col-span-2">칸</p>
        <p className="col-span-5">태그와 속성</p>
        <p className="col-span-2">id</p>
      </div>
      {rows.map((row, index) => (
        <div
          key={row.part}
          className={cx(
            'grid gap-1 rounded-card px-4 py-3 md:grid-cols-9 md:items-center md:gap-4',
            index % 2 === 0 ? 'bg-surface-overlay' : 'bg-surface-sunken inset-shadow-sunken',
            `animate-rise-${Math.min(index + 1, 5)}`,
          )}
        >
          <p className="text-deck-caption font-bold text-content-strong md:col-span-2">{row.part}</p>
          <p className="font-mono text-deck-caption font-semibold break-words text-content-primary md:col-span-5">{row.tag}</p>
          <p className="font-mono text-deck-caption font-bold text-content-strong md:col-span-2">{row.id || '·'}</p>
        </div>
      ))}
    </Panel>
  )
}
