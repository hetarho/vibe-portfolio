import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { cx, Panel } from '../../../deck'
import { CardChip, StepBadge, TagChip } from './CardChip'
import { Code } from './Code'

export type StepRow = {
  say: string
  cards: number[]
  tag?: string
  code: string[]
}

type Props = {
  /** 함수를 여는 줄 */
  head: string[]
  rows: StepRow[]
  tail?: string[]
  /** 함수 밖에 두는 줄. 맨 위에 0번으로 붙는다 */
  before?: StepRow
  startAt?: number
  /** 참이면 단계마다 코드를 가려 두고, 눌러서 하나씩 연다 */
  hidden?: boolean
  dense?: boolean
}

/** 함수 안쪽 줄은 두 칸 들여서 보여 준다. 데이터에는 들여쓰기 없이 둔다 */
const indent = (lines: string[]) => lines.map((line) => `  ${line}`)

/** 함수를 여닫는 줄. 코드 칸 안쪽 여백과 글자 시작점을 맞춘다 */
function ShellLines({ lines }: { lines: string[] }) {
  return (
    <pre className="overflow-x-auto px-3 font-mono text-deck-caption text-content-muted md:px-4">
      {lines.map((line) => (
        <span key={line} className="block whitespace-pre">
          {line}
        </span>
      ))}
    </pre>
  )
}

/**
 * 한글 절차 한 줄과 그 줄을 옮긴 코드를 같은 높이에 나란히 놓는다.
 * 왼쪽만 읽으면 절차, 오른쪽만 읽으면 함수 하나가 되게 짜여 있다.
 * 코드 한 줄이 60자를 넘는 일이 많아서 코드 칸에 9칸 중 6칸을 준다.
 * 1부에서는 코드를 가려 두고 단계마다 열고, 2부 풀이에서는 처음부터 보여 준다.
 */
export function StepRows({ head, rows, tail = ['}'], before, startAt = 1, hidden = false, dense = false }: Props) {
  const [opened, setOpened] = useState<number[]>([])
  const total = rows.length + (before ? 1 : 0)
  const allOpen = !hidden || opened.length === total
  const isOpen = (key: number) => !hidden || opened.includes(key)
  const open = (key: number) => setOpened((list) => (list.includes(key) ? list : [...list, key]))

  const renderRow = (row: StepRow, no: number, key: number, code: string[]) => (
    <div key={key} className={cx('grid gap-2 lg:grid-cols-9 lg:gap-5', `animate-rise-${Math.min(key + 1, 5)}`)}>
      <div className="flex items-start gap-3 lg:col-span-3">
        <StepBadge no={no} />
        {/* 칩을 문장 바로 뒤에 붙인다. 문장이 짧으면 한 줄에 들어가서 행 높이가 코드 칸에 맞춰진다 */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-1">
          <p className="mr-1 text-deck-caption font-bold text-content-strong">{row.say}</p>
          {row.cards.map((card) => (
            <CardChip key={card} no={card} />
          ))}
          {row.tag ? <TagChip>{row.tag}</TagChip> : null}
        </div>
      </div>
      <div className="min-w-0 lg:col-span-6">
        {isOpen(key) ? (
          <Code lines={code} size={dense ? 'meta' : 'caption'} pad="sm" className="animate-rise" />
        ) : (
          <button
            type="button"
            onClick={() => open(key)}
            className="flex h-full min-h-14 w-full items-center justify-center gap-3 rounded-card bg-surface-sunken px-4 py-2 text-deck-caption font-semibold text-content-muted inset-shadow-sunken transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary"
          >
            <Eye className="size-5 shrink-0 md:size-6" />
            {no}번을 쳐 본 뒤에 열기
          </button>
        )}
      </div>
    </div>
  )

  return (
    <Panel tone="raised" pad="sm" className="flex flex-col gap-2.5">
      {before ? renderRow(before, 0, 0, before.code) : null}

      <div className="grid items-center gap-2 lg:grid-cols-9 lg:gap-5">
        <div className="lg:col-span-3">
          {hidden ? (
            <button
              type="button"
              onClick={() => setOpened(allOpen ? [] : Array.from({ length: total }, (_, index) => index))}
              className="flex items-center gap-2 rounded-full bg-surface-sunken px-4 py-1.5 text-deck-meta font-semibold text-content-secondary transition duration-200 ease-deck hover:bg-surface-highlight hover:text-content-primary"
            >
              {allOpen ? <EyeOff className="size-4 md:size-5" /> : <Eye className="size-4 md:size-5" />}
              {allOpen ? '코드 전부 가리기' : '코드 전부 열기'}
            </button>
          ) : null}
        </div>
        <div className="lg:col-span-6">
          <ShellLines lines={head} />
        </div>
      </div>

      {rows.map((row, index) => {
        const key = index + (before ? 1 : 0)
        return renderRow(row, startAt + index, key, indent(row.code))
      })}

      <div className="grid lg:grid-cols-9 lg:gap-5">
        <div className="hidden lg:col-span-3 lg:block" />
        <div className="lg:col-span-6">
          <ShellLines lines={tail} />
        </div>
      </div>
    </Panel>
  )
}
