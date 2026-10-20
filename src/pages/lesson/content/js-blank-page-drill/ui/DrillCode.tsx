import type { ReactNode } from 'react'
import { cx } from '../../../deck'

const tones = {
  sunken: 'bg-surface-sunken text-content-primary inset-shadow-sunken',
  overlay: 'bg-surface-overlay text-content-primary shadow-overlay',
} as const

type Props = {
  lines: string[]
  tone?: keyof typeof tones
  /** meta는 열다섯 줄이 넘는 코드에만 쓴다 */
  size?: 'caption' | 'meta'
  /** 줄이 하나도 없을 때 대신 보여 줄 말 (Step 5 백지) */
  empty?: ReactNode
  className?: string
}

/** 학생 파일의 빈칸 표시. ___ 는 Step 2, 빈칸_가 는 4교시 장바구니에서 쓴다 */
const BLANK = /(___|빈칸_[가-힣])/

function renderLine(line: string): ReactNode {
  const split = line.split('//')[0]
  const comment = line.slice(split.length)
  if (split.trim() === '' && comment) return <span className="text-content-muted">{line}</span>
  // 파일에서는 줄 끝 주석을 공백으로 세로 맞춰 두었다. 화면에서 그대로 두면 줄이 길어져 잘리므로 두 칸으로 줄인다
  const code = comment ? split.trimEnd() + '  ' : split

  const pieces = code.split(new RegExp(BLANK, 'g')).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="rounded-control bg-accent px-1 font-bold text-accent-contrast">
        {part}
      </span>
    ) : (
      part
    ),
  )
  return (
    <>
      {pieces}
      {comment ? <span className="text-content-muted">{comment}</span> : null}
      {line === '' ? ' ' : null}
    </>
  )
}

/**
 * 학생이 Step마다 여는 파일의 script 안쪽을 그대로 보여 준다.
 * 주석은 흐리게, 채울 빈칸은 강조색으로 갈라서 "어디를 손대는 Step인지"가 한눈에 보이게 한다.
 */
export function DrillCode({ lines, tone = 'sunken', size = 'caption', empty, className }: Props) {
  return (
    <pre
      className={cx(
        'overflow-x-auto rounded-card p-4 font-mono md:p-5',
        size === 'caption' ? 'text-deck-caption' : 'text-deck-meta',
        tones[tone],
        className,
      )}
    >
      <code>
        {lines.length === 0 ? (
          <span className="block py-6 text-center font-sans text-content-muted">{empty}</span>
        ) : (
          lines.map((line, index) => (
            <span key={`${index}-${line}`} className="block w-fit min-w-full whitespace-pre">
              {renderLine(line)}
            </span>
          ))
        )}
      </code>
    </pre>
  )
}
