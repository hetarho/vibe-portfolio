import { CornerDownLeft, Keyboard } from 'lucide-react'
import type { ReactNode } from 'react'
import { cx, Panel, PanelLabel } from '../../../deck'

type Props = {
  /** 수강생이 그대로 따라 칠 문장 */
  children: ReactNode
  /** 왜 이렇게 치는지 한 줄 */
  why?: ReactNode
  /** 몇 번째로 치는 문장인지 */
  step?: number
  className?: string
}

/**
 * 복사 버튼 대신 쓰는 화면.
 * 수강생이 프롬프트를 붙여넣으면 무슨 말인지 모른 채 결과만 받는다.
 * 짧은 문장을 직접 치게 하면 집에서 혼자 할 때도 같은 말을 만들어 낼 수 있다.
 * 그래서 이 카드에 담는 문장은 한 줄을 넘지 않게 쓴다.
 */
export function TypeThis({ children, why, step, className }: Props) {
  return (
    <Panel tone="overlay" pad="md" className={cx('flex flex-col gap-3', className)}>
      <div className="flex items-center gap-3">
        {step ? (
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-deck-caption font-bold text-accent-contrast md:size-10">
            {step}
          </span>
        ) : (
          <Keyboard className="size-7 shrink-0 text-accent md:size-9" />
        )}
        <PanelLabel tone="accent">그대로 쳐보세요</PanelLabel>
      </div>

      <p className="flex items-start gap-3 rounded-card bg-surface-sunken p-4 text-deck-body font-bold text-content-strong inset-shadow-sunken md:p-5">
        <CornerDownLeft className="mt-1 size-6 shrink-0 text-content-muted md:size-7" />
        <span>{children}</span>
      </p>

      {why ? <p className="text-deck-caption text-content-secondary">{why}</p> : null}
    </Panel>
  )
}
