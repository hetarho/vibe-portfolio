import { QrCode } from 'lucide-react'

type Props = {
  label: string
  caption?: string
}

/** QR 코드가 들어갈 자리 — 실제 이미지는 강의 직전에 교체한다 */
export function QrSlot({ label, caption }: Props) {
  return (
    <div className="flex items-center gap-5">
      <span className="grid size-28 shrink-0 place-items-center rounded-card bg-surface-sunken text-content-muted inset-shadow-sunken">
        <QrCode size={56} strokeWidth={1.5} />
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-deck-caption font-semibold text-content-primary">{label}</span>
        {caption ? <span className="text-deck-meta text-content-muted">{caption}</span> : null}
      </span>
    </div>
  )
}
