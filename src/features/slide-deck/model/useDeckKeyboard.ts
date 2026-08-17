import { useEffect } from 'react'

type Handlers = {
  onPrev: () => void
  onNext: () => void
  onToggleOverview: () => void
  onShortcut: (key: string) => void
  onEscape: () => void
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  )
}

/**
 * 무선 프리젠터(←/→/Space)와 강사용 단축키를 처리한다.
 * 입력 중일 때는 슬라이드가 넘어가지 않도록 막는다.
 */
export function useDeckKeyboard({ onPrev, onNext, onToggleOverview, onShortcut, onEscape }: Handlers) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return

      if (event.key === 'Escape') {
        onEscape()
        return
      }

      if (isTypingTarget(event.target)) return

      switch (event.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          event.preventDefault()
          onNext()
          return
        case 'ArrowLeft':
        case 'PageUp':
          event.preventDefault()
          onPrev()
          return
        case 'f':
        case 'F':
          event.preventDefault()
          if (document.fullscreenElement) document.exitFullscreen().catch(() => undefined)
          else document.documentElement.requestFullscreen().catch(() => undefined)
          return
        case 'o':
        case 'O':
          event.preventDefault()
          onToggleOverview()
          return
        default:
          onShortcut(event.key.toLowerCase())
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onPrev, onNext, onToggleOverview, onShortcut, onEscape])
}
