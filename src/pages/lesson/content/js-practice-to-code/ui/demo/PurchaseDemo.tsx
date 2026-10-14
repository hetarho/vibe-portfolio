import { useState } from 'react'
import { DemoButton, DemoFrame, DemoOutput, FieldRow, fieldClass } from './kit'

/** Practice4 완성본 · 여섯 칸의 값을 아래 네모에 출력한다 */
export function PurchaseDemo() {
  const [buyer, setBuyer] = useState('')
  const [product, setProduct] = useState('')
  const [price, setPrice] = useState('')
  const [count, setCount] = useState('')
  const [grade, setGrade] = useState('1')
  const [etc, setEtc] = useState('')
  const [lines, setLines] = useState<string[]>([])

  const print = () =>
    setLines([
      `구매자 명 : ${buyer}님`,
      `상품 명 : ${product}`,
      `가격 : ${price}만원`,
      `구매 수량 : ${count}개`,
      `납품등급 : ${grade}등급`,
      `기타사항 : ${etc}`,
    ])

  return (
    <DemoFrame title="Practice4">
      <div className="flex flex-col gap-2">
        <FieldRow label="구매자">
          <input className={`${fieldClass} w-0 flex-1`} value={buyer} onChange={(e) => setBuyer(e.target.value)} placeholder="구매자의 이름을 입력하세요" />
        </FieldRow>
        <FieldRow label="상품명">
          <input className={`${fieldClass} w-0 flex-1`} value={product} onChange={(e) => setProduct(e.target.value)} placeholder="구매 상품 명을 입력하세요" />
        </FieldRow>
        <FieldRow label="가격">
          <input className={`${fieldClass} w-0 flex-1`} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="구매 가격을 입력하세요" />
        </FieldRow>
        <FieldRow label="구매 수량">
          <input
            type="number"
            min={10}
            max={100}
            step={10}
            className={`${fieldClass} w-0 flex-1`}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="최소 10, 최대 100"
          />
        </FieldRow>
        <FieldRow label={`납품 등급 · ${grade}`}>
          <input type="range" min={1} max={9} step={2} className="w-0 flex-1 accent-accent" value={grade} onChange={(e) => setGrade(e.target.value)} />
        </FieldRow>
        <FieldRow label="기타 사항">
          <textarea rows={2} className={`${fieldClass} w-0 flex-1 resize-none`} value={etc} onChange={(e) => setEtc(e.target.value)} />
        </FieldRow>
      </div>
      <div className="flex">
        <DemoButton onClick={print}>입력 값 출력하기</DemoButton>
      </div>
      <DemoOutput>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </DemoOutput>
    </DemoFrame>
  )
}
