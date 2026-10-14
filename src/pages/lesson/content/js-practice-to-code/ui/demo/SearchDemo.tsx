import { useState } from 'react'
import { checkClass, DemoButton, DemoFrame, fieldClass } from './kit'

type Kind = 'title' | 'date' | 'writer'

const OPTIONS: Array<{ kind: Kind; label: string }> = [
  { kind: 'title', label: '제목' },
  { kind: 'date', label: '날짜' },
  { kind: 'writer', label: '작성자' },
]

/** Practice5 완성본 · 고른 라디오에 맞는 검색 창 하나만 보인다. 검색 버튼은 아무 일도 하지 않는다 */
export function SearchDemo() {
  const [kind, setKind] = useState<Kind | null>(null)

  return (
    <DemoFrame title="Practice5">
      <div className="flex flex-col items-center gap-3 rounded-card bg-surface-raised px-4 py-4 shadow-raised">
        <p className="text-deck-caption text-content-secondary">검색할 항목을 선택하세요.</p>
        <div className="flex flex-wrap justify-center gap-5 md:gap-8">
          {OPTIONS.map((option) => (
            <label key={option.kind} className="flex items-center gap-2 text-deck-caption font-semibold text-content-strong">
              <input type="radio" name="demo-search" className={checkClass} checked={kind === option.kind} onChange={() => setKind(option.kind)} />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {kind ? (
        <div key={kind} className="animate-fade flex flex-col gap-3 rounded-card bg-surface-highlight px-4 py-4">
          {kind === 'title' ? (
            <>
              <p className="text-deck-caption text-content-primary">검색할 제목을 입력하세요 :</p>
              <div className="flex items-center gap-3">
                <input className={`${fieldClass} w-0 flex-1`} />
                <DemoButton>검색</DemoButton>
              </div>
            </>
          ) : null}
          {kind === 'date' ? (
            <>
              <p className="text-deck-caption text-content-primary">검색할 날짜를 선택하세요 :</p>
              <div className="flex flex-wrap items-center gap-3">
                <input type="date" className={fieldClass} />
                <span className="text-deck-caption text-content-secondary">-</span>
                <input type="date" className={fieldClass} />
                <DemoButton>검색</DemoButton>
              </div>
            </>
          ) : null}
          {kind === 'writer' ? (
            <>
              <p className="text-deck-caption text-content-primary">검색할 작성자 아이디를 입력하세요 :</p>
              <div className="flex items-center gap-3">
                <input className={`${fieldClass} w-0 flex-1`} />
                <DemoButton>검색</DemoButton>
              </div>
            </>
          ) : null}
        </div>
      ) : (
        <p className="text-deck-caption text-content-muted">처음에는 검색 창이 하나도 보이지 않습니다</p>
      )}
    </DemoFrame>
  )
}
