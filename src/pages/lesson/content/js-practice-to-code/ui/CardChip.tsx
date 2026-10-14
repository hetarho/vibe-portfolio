import type { ReactNode } from 'react'
import { cardOf } from '../model/cards'

/** 카드 번호와 이름. 한글 절차 한 줄 옆에 붙여서 어느 카드를 꺼내는지 보여 준다 */
export function CardChip({ no }: { no: number }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-surface-highlight py-1 pr-3 pl-1 text-deck-meta font-semibold text-content-primary md:pr-4">
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-surface-overlay font-bold text-content-strong md:size-7">
        {no}
      </span>
      {cardOf(no).name}
    </span>
  )
}

/** 카드가 아닌 문법(자바와 같은 if, 내장함수)에 붙이는 이름표 */
export function TagChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface-sunken px-3 py-1 font-mono text-deck-meta font-semibold text-content-secondary inset-shadow-sunken md:px-4">
      {children}
    </span>
  )
}

export function StepBadge({ no }: { no: number | string }) {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-strong inset-shadow-sunken md:size-10">
      {no}
    </span>
  )
}
