import { useState } from 'react'
import { cx } from '../../../../deck'
import { Code } from '../Code'
import { DemoButton, DemoFrame } from './kit'

type Place = 'outside' | 'inside'

const CODE: Record<Place, string[]> = {
  outside: ['let stock = 7;', '', 'function order() {', '  …', '  stock = stock - count;', '}'],
  inside: ['', '', 'function order() {', '  let stock = 7;', '  …', '  stock = stock - count;', '}'],
}

/**
 * 그릇을 함수 밖에 둘 때와 안에 둘 때를 바꿔 가며 3개씩 주문해 본다.
 * 안에 두면 누를 때마다 7에서 다시 시작해서 영원히 4개가 남는다.
 */
export function StockDemo() {
  const [place, setPlace] = useState<Place>('outside')
  const [stock, setStock] = useState(7)
  const [log, setLog] = useState<string[]>([])

  const choose = (next: Place) => {
    setPlace(next)
    setStock(7)
    setLog([])
  }

  const order = () => {
    const current = place === 'outside' ? stock : 7
    if (3 > current) {
      setLog((list) => [...list, '재고가 부족합니다'])
      return
    }
    const left = current - 3
    if (place === 'outside') setStock(left)
    setLog((list) => [...list, `남은 재고 ${left}개`])
  }

  return (
    <DemoFrame title="그릇 위치 바꿔 보기">
      <div className="grid grid-cols-2 gap-2 rounded-card bg-surface-sunken p-1.5 inset-shadow-sunken">
        {(['outside', 'inside'] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => choose(item)}
            className={cx(
              'rounded-control px-3 py-2 text-deck-caption font-bold transition duration-200 ease-deck',
              place === item ? 'bg-surface-raised text-content-strong shadow-raised' : 'text-content-muted hover:text-content-primary',
            )}
          >
            {item === 'outside' ? '함수 밖에 둔 경우' : '함수 안에 둔 경우'}
          </button>
        ))}
      </div>
      <Code lines={CODE[place]} size="meta" />
      <div className="flex items-center gap-3">
        <DemoButton onClick={order}>3개 주문</DemoButton>
        <p className="text-deck-caption text-content-muted">여러 번 눌러 봅니다</p>
      </div>
      <div className="flex min-h-12 flex-wrap items-center gap-2">
        {log.map((line, index) => (
          <span
            key={`${index}-${line}`}
            className={cx(
              'animate-pop rounded-full px-3 py-1 text-deck-caption font-semibold',
              line.startsWith('재고가') ? 'bg-caution-soft text-caution' : 'bg-surface-highlight text-content-strong',
            )}
          >
            {line}
          </span>
        ))}
      </div>
    </DemoFrame>
  )
}
