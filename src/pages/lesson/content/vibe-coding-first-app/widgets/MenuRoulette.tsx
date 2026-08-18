import { Plus, Shuffle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cx } from '@/features/slide-deck'

const DEFAULT_MENUS = ['김치찌개', '마라탕', '돈까스', '냉면', '제육볶음', '초밥']

/**
 * 오늘 실습으로 만들 수 있는 결과물 예시 — 실제로 동작하는 점심 메뉴 룰렛.
 * S1(오프닝)과 S13(라이브 데모 백업)에서 같은 컴포넌트를 쓴다.
 */
export function MenuRoulette() {
  const [menus, setMenus] = useState(DEFAULT_MENUS)
  const [draft, setDraft] = useState('')
  const [display, setDisplay] = useState('점심 뭐 먹지?')
  const [spinning, setSpinning] = useState(false)
  const [picked, setPicked] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => () => {
    if (timer.current !== null) window.clearInterval(timer.current)
  }, [])

  const spin = () => {
    if (spinning || menus.length === 0) return
    setSpinning(true)
    setPicked(false)
    let ticks = 0
    timer.current = window.setInterval(() => {
      ticks += 1
      setDisplay(menus[Math.floor(Math.random() * menus.length)])
      if (ticks >= 20) {
        if (timer.current !== null) window.clearInterval(timer.current)
        timer.current = null
        setSpinning(false)
        setPicked(true)
      }
    }, 80)
  }

  const addMenu = () => {
    const value = draft.trim()
    if (!value) return
    setMenus((list) => [...list, value])
    setDraft('')
  }

  return (
    <div className="flex flex-col gap-5 rounded-panel bg-surface-overlay p-5 shadow-overlay md:p-8">
      <p className="text-deck-caption font-semibold tracking-widest text-content-muted uppercase">점심 메뉴 룰렛</p>

      <div
        className={cx(
          'grid min-h-40 place-items-center rounded-card px-4 py-3 text-center transition duration-300 ease-deck md:px-8 md:py-6',
          picked ? 'bg-accent text-accent-contrast' : 'bg-surface-sunken text-content-strong inset-shadow-sunken',
        )}
      >
        <p key={display} className={cx('text-deck-title font-bold', picked && 'animate-pop')}>
          {display}
        </p>
      </div>

      <button
        type="button"
        onClick={spin}
        disabled={spinning}
        className="flex items-center justify-center gap-3 rounded-control bg-accent px-4 py-3 text-deck-body font-bold text-accent-contrast transition duration-200 ease-deck md:px-8 md:py-5 hover:bg-accent-strong disabled:opacity-50"
      >
        <Shuffle size={28} />
        {spinning ? '두구두구…' : '돌리기'}
      </button>

      <div className="flex items-center gap-3">
        {/* w-0: 인풋 기본 폭(size 속성)이 min-content로 잡혀서, 좁은 화면에서 부모 칸을 밖으로 밀어낸다 */}
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') addMenu()
          }}
          placeholder="메뉴 추가"
          className="w-0 flex-1 rounded-control bg-surface-sunken px-6 py-4 text-deck-caption text-content-primary placeholder:text-content-muted inset-shadow-sunken focus:outline-none"
        />
        <button
          type="button"
          onClick={addMenu}
          aria-label="메뉴 추가"
          className="grid size-10 shrink-0 place-items-center rounded-control bg-surface-highlight text-content-primary transition duration-200 ease-deck md:size-14 hover:bg-accent hover:text-accent-contrast"
        >
          <Plus size={26} />
        </button>
      </div>

      <p className="text-deck-meta text-content-muted">현재 {menus.length}개 · 오늘 실습 30분이면 만들 수 있는 수준</p>
    </div>
  )
}
