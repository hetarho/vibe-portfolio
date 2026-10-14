import { useState } from 'react'
import { cx } from '../../../../deck'
import { DemoButton, DemoFrame, fieldClass } from './kit'

const OPS = ['+', '-', '*', '/', '%'] as const
type Op = (typeof OPS)[number]

function compute(a: number, op: Op, b: number) {
  if (op === '+') return a + b
  if (op === '-') return a - b
  if (op === '*') return a * b
  if (op === '/') return a / b
  return a % b
}

/** Practice2 완성본 · 0으로 나누면 결과 칸이 빨개지고 연산불가가 뜬다 */
export function CalcDemo() {
  const [a, setA] = useState('')
  const [op, setOp] = useState<Op>('+')
  const [b, setB] = useState('')
  const [result, setResult] = useState<{ text: string; error: boolean }>({ text: '', error: false })

  const calc = () => {
    const answer = compute(Number(a), op, Number(b))
    if (Number.isNaN(answer) || answer === Infinity || answer === -Infinity) setResult({ text: '연산불가', error: true })
    else setResult({ text: String(answer), error: false })
  }

  return (
    <DemoFrame title="Practice2">
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <input type="number" className={`${fieldClass} w-28 md:w-32`} value={a} onChange={(e) => setA(e.target.value)} />
        <select className={fieldClass} value={op} onChange={(e) => setOp(e.target.value as Op)}>
          {OPS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input type="number" className={`${fieldClass} w-28 md:w-32`} value={b} onChange={(e) => setB(e.target.value)} />
        <DemoButton onClick={calc}>=</DemoButton>
        <input
          readOnly
          value={result.text}
          className={cx(fieldClass, 'w-40 font-semibold md:w-44', result.error && 'bg-critical font-bold text-content-strong')}
        />
      </div>
      <p className="text-deck-caption text-content-muted">10 + 0, 10 / 3, 10 / 0, 그다음에 10 * 0을 차례로 넣어 봅니다</p>
    </DemoFrame>
  )
}
