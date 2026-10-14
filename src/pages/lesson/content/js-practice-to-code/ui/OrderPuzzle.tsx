import { ArrowRight, Check, RotateCcw, TriangleAlert, Undo2 } from 'lucide-react'
import { useState } from 'react'
import { cx, Panel, PanelLabel } from '../../../deck'

type Piece = { label: string; code: string[] }

type Props = {
  pieces: Piece[]
  answer: string[]
}

type Verdict = { ok: boolean; text: string }

function judge(picked: string[], answer: string[]): Verdict {
  if (picked.join() === answer.join()) return { ok: true, text: '맞았습니다. 다음 화면에서 절차와 한 줄씩 맞춰 봅니다' }
  if (picked.some((label) => !answer.includes(label))) return { ok: false, text: '쓰지 않는 조각이 섞여 있습니다. 조각 하나는 함정입니다' }
  if (picked.length < answer.length) return { ok: false, text: `조각이 ${answer.length - picked.length}개 더 필요합니다` }
  const at = picked.findIndex((label, index) => label !== answer[index])
  return { ok: false, text: `${at + 1}번째 조각부터 다시 봅니다` }
}

/**
 * 순서 맞추기. 코드 조각을 누른 순서대로 아래 줄에 쌓는다.
 * 빈 화면에서 쓰는 것보다 한 단계 쉬운 연습이다. 코드는 이미 있고, 절차대로 놓는 일만 남긴다.
 */
export function OrderPuzzle({ pieces, answer }: Props) {
  const [picked, setPicked] = useState<string[]>([])
  const [verdict, setVerdict] = useState<Verdict | null>(null)

  const toggle = (label: string) => {
    setVerdict(null)
    setPicked((list) => (list.includes(label) ? list.filter((item) => item !== label) : [...list, label]))
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 조각마다 줄 수가 크게 달라서 격자 대신 세로 단으로 흘려 높이를 맞춘다 */}
      <div className="columns-1 gap-3 md:columns-2">
        {pieces.map((piece, index) => {
          const order = picked.indexOf(piece.label)
          return (
            <button
              key={piece.label}
              type="button"
              onClick={() => toggle(piece.label)}
              className={cx(
                'mb-3 flex w-full break-inside-avoid flex-col gap-2 rounded-card p-3 text-left transition duration-200 ease-deck md:px-4',
                order >= 0 ? 'bg-surface-sunken inset-shadow-sunken' : 'bg-surface-overlay shadow-overlay hover:bg-surface-highlight',
                `animate-rise-${Math.min(index + 1, 5)}`,
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-deck-caption font-bold text-content-strong">{piece.label}</span>
                {order >= 0 ? (
                  <span className="grid size-7 place-items-center rounded-full bg-surface-highlight text-deck-meta font-bold text-content-strong md:size-8">
                    {order + 1}
                  </span>
                ) : null}
              </div>
              <pre className="overflow-x-auto font-mono text-deck-meta text-content-primary">
                {piece.code.map((line) => (
                  <span key={line} className="block whitespace-pre">
                    {line}
                  </span>
                ))}
              </pre>
            </button>
          )
        })}
      </div>

      <Panel tone="sunken" pad="sm" className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-2 md:gap-3">
          <PanelLabel>내가 놓은 순서</PanelLabel>
          {picked.length === 0 ? <p className="text-deck-caption text-content-muted">조각을 위에서 순서대로 누릅니다</p> : null}
          {picked.map((label, index) => (
            <span key={label} className="flex items-center gap-2">
              {index > 0 ? <ArrowRight className="size-5 text-content-muted" /> : null}
              <span className="rounded-full bg-surface-raised px-4 py-1 text-deck-body font-bold text-content-strong shadow-raised">{label}</span>
            </span>
          ))}
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setVerdict(null)
              setPicked((list) => list.slice(0, -1))
            }}
            className="flex items-center gap-2 rounded-control bg-surface-raised px-4 py-2 text-deck-caption font-semibold text-content-primary shadow-raised transition duration-200 ease-deck hover:bg-surface-highlight"
          >
            <Undo2 className="size-5" />
            하나 빼기
          </button>
          <button
            type="button"
            onClick={() => {
              setVerdict(null)
              setPicked([])
            }}
            className="flex items-center gap-2 rounded-control bg-surface-raised px-4 py-2 text-deck-caption font-semibold text-content-primary shadow-raised transition duration-200 ease-deck hover:bg-surface-highlight"
          >
            <RotateCcw className="size-5" />
            처음부터
          </button>
          <button
            type="button"
            onClick={() => setVerdict(judge(picked, answer))}
            className="flex items-center gap-2 rounded-control bg-accent px-4 py-2 text-deck-caption font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck hover:bg-accent-strong"
          >
            <Check className="size-5" strokeWidth={3} />
            맞춰 보기
          </button>
        </div>
      </Panel>

      {verdict ? (
        <div
          className={cx(
            'animate-rise flex items-center gap-3 rounded-card px-4 py-3 md:px-6',
            verdict.ok ? 'bg-positive-soft text-positive' : 'bg-caution-soft text-caution',
          )}
        >
          {verdict.ok ? <Check className="size-6 shrink-0" strokeWidth={3} /> : <TriangleAlert className="size-6 shrink-0" />}
          <p className="text-deck-body font-bold">{verdict.text}</p>
        </div>
      ) : null}
    </div>
  )
}
