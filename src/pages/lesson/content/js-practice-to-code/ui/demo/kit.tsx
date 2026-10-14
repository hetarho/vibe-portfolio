import { MousePointerClick } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { cx, PanelLabel } from '../../../../deck'

/**
 * 완성본 화면이 함께 쓰는 입력 칸과 틀.
 * 학원 문제의 화면을 덱 안에 다시 만든 것이라 동작은 정답 파일과 같고, 색과 크기는 덱 토큰만 쓴다.
 * scheme-dark는 날짜 칸의 달력 아이콘과 select 목록을 어두운 바탕에 맞춘다.
 */
export const fieldClass =
  'min-w-0 rounded-control bg-surface-sunken px-3 py-1.5 text-deck-caption text-content-strong inset-shadow-sunken scheme-dark placeholder:text-content-muted focus:ring-2 focus:ring-accent focus:outline-none'

export const checkClass = 'size-5 shrink-0 accent-accent md:size-6'

export function DemoButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-control bg-surface-highlight px-4 py-1.5 text-deck-caption font-semibold text-content-strong shadow-raised transition duration-200 ease-deck hover:bg-surface-raised"
    >
      {children}
    </button>
  )
}

export function DemoOutput({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        'min-h-24 rounded-control bg-surface-sunken px-4 py-3 text-deck-caption text-content-strong inset-shadow-sunken',
        className,
      )}
    >
      {children}
    </div>
  )
}

type AlertProps = { message: string; onClose: () => void }

/**
 * 진짜 alert() 대신 쓰는 알림창. 전체화면 발표 중에 브라우저 알림창이 뜨면 전체화면이 풀린다.
 * 확인 버튼에 바로 커서를 둬서 Enter로 닫을 수 있게 한다.
 */
function DemoAlert({ message, onClose }: AlertProps) {
  const button = useRef<HTMLButtonElement>(null)
  useEffect(() => button.current?.focus(), [])

  return (
    <div className="absolute inset-0 z-10 grid place-items-center rounded-panel bg-surface-base/80 p-4">
      <div className="animate-pop flex w-full max-w-md flex-col gap-4 rounded-card bg-surface-raised p-5 shadow-overlay md:p-6">
        <p className="text-deck-meta font-semibold tracking-widest text-content-muted">이 페이지 내용 · 알림창</p>
        <p className="text-deck-caption font-bold text-content-strong">{message}</p>
        <div className="flex justify-end">
          <button
            ref={button}
            type="button"
            onClick={onClose}
            className="rounded-control bg-accent px-5 py-2 text-deck-caption font-bold text-accent-contrast transition duration-200 ease-deck hover:bg-accent-strong"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

type FrameProps = {
  title: string
  children: ReactNode
  alert?: AlertProps | null
  className?: string
}

/** 완성본을 담는 틀. 위쪽에 학원 화면의 제목(Practice4 등)을 그대로 단다 */
export function DemoFrame({ title, children, alert, className }: FrameProps) {
  return (
    <div className={cx('relative flex flex-col gap-4 rounded-panel bg-surface-overlay p-4 shadow-overlay md:p-6', className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-deck-body font-bold text-content-strong">{title}</p>
        <span className="flex items-center gap-2">
          <MousePointerClick className="size-5 text-accent md:size-6" />
          <PanelLabel tone="accent">완성본 · 눌러 보세요</PanelLabel>
        </span>
      </div>
      {children}
      {alert ? <DemoAlert message={alert.message} onClose={alert.onClose} /> : null}
    </div>
  )
}

/** 이름표와 칸을 한 줄에 놓는다 */
export function FieldRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex items-center gap-3">
      <span className="w-28 shrink-0 text-deck-caption font-semibold text-content-secondary md:w-36">{label}</span>
      {children}
    </label>
  )
}
