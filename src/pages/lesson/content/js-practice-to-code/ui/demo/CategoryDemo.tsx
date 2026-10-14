import { useState } from 'react'
import { checkClass, DemoButton, DemoFrame, DemoOutput } from './kit'

const CATEGORIES = ['종합', '소설', '시/에세이', '경제/경영', '자기계발', '아동', '여행', '과학', '역사/문화', '외국어', '컴퓨터', '만화']

/**
 * Practice1 완성본 · 전체선택과 카테고리 열두 개.
 * 정답 코드는 전체선택 칸의 체크를 따로 맞춰 주지만, 여기서는 "열두 개가 다 체크됐는가"에서 바로 구한다.
 * 화면에 보이는 동작은 같다.
 */
export function CategoryDemo() {
  const [checked, setChecked] = useState<boolean[]>(() => CATEGORIES.map(() => false))
  const [output, setOutput] = useState('')
  const all = checked.every(Boolean)

  const toggle = (index: number) => setChecked((list) => list.map((value, i) => (i === index ? !value : value)))

  return (
    <DemoFrame title="Practice1">
      <div className="flex flex-col gap-2 rounded-card bg-surface-raised px-4 py-4 shadow-raised">
        <p className="text-deck-meta font-semibold tracking-widest text-content-muted">취미</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <label className="flex items-center gap-2 text-deck-caption font-bold text-content-strong">
            <input type="checkbox" className={checkClass} checked={all} onChange={() => setChecked(CATEGORIES.map(() => !all))} />
            전체선택
          </label>
          {CATEGORIES.map((name, index) => (
            <label key={name} className="flex items-center gap-2 text-deck-caption font-semibold text-content-primary">
              <input type="checkbox" className={checkClass} checked={checked[index]} onChange={() => toggle(index)} />
              {name}
            </label>
          ))}
        </div>
      </div>
      <div className="flex">
        <DemoButton onClick={() => setOutput(CATEGORIES.filter((_, index) => checked[index]).join(' '))}>카테고리 선택</DemoButton>
      </div>
      <DemoOutput className="min-h-16">{output}</DemoOutput>
    </DemoFrame>
  )
}
