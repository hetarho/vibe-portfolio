import type { ReactNode } from 'react'
import { cx } from '../../../deck'

const tones = {
  sunken: 'bg-surface-sunken text-content-primary inset-shadow-sunken',
  overlay: 'bg-surface-overlay text-content-primary shadow-overlay',
  inverse: 'bg-surface-inverse text-content-inverse shadow-lifted',
} as const

type Props = {
  lines: string[]
  tone?: keyof typeof tones
  /** meta는 스무 줄이 넘는 코드에만 쓴다 */
  size?: 'caption' | 'meta'
  /** sm은 코드 칸이 여러 개 쌓이는 화면에서 쓴다 */
  pad?: 'sm' | 'md'
  className?: string
}

/** [[가]]처럼 쓴 자리를 빈칸 표시로 바꾼다 */
const BLANK = /\[\[(.+?)\]\]/

function renderLine(line: string): ReactNode {
  const trimmed = line.trimStart()
  if (trimmed.startsWith('//') || trimmed.startsWith('<!--')) {
    return <span className="text-content-muted">{line}</span>
  }
  if (!BLANK.test(line)) return line || ' '

  // split에 캡처 그룹을 주면 홀수 칸에 빈칸 이름이 온다
  return line.split(new RegExp(BLANK, 'g')).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="mx-1 rounded-control bg-accent px-3 font-bold text-accent-contrast">
        ({part})
      </span>
    ) : (
      part
    ),
  )
}

/**
 * 고정폭 코드 블록. 한 줄 전체가 주석이면 흐리게 보여 준다.
 * 한글 절차를 주석으로 먼저 쓰는 것이 이 수업의 방법이라, 주석과 코드가 눈으로 갈라져야 한다.
 */
export function Code({ lines, tone = 'sunken', size = 'caption', pad = 'md', className }: Props) {
  return (
    <pre
      className={cx(
        'overflow-x-auto rounded-card font-mono',
        pad === 'md' ? 'p-4 md:p-5' : 'px-3 py-2.5 md:px-4 md:py-3',
        size === 'caption' ? 'text-deck-caption' : 'text-deck-meta',
        tones[tone],
        className,
      )}
    >
      <code>
        {lines.map((line, index) => (
          <span key={`${index}-${line}`} className="block w-fit min-w-full whitespace-pre">
            {renderLine(line)}
          </span>
        ))}
      </code>
    </pre>
  )
}
