import { cx } from '../../../deck'

type Props = {
  lines: string[]
  /** given: 문제에 주어진 코드(파인 면) / answer: 정답 코드(밝게 반전된 면) */
  tone?: 'given' | 'answer'
}

export function CodeBlock({ lines, tone = 'answer' }: Props) {
  return (
    <pre
      className={cx(
        'overflow-x-auto rounded-card p-4 font-mono text-deck-caption md:p-5',
        tone === 'answer'
          ? 'bg-surface-inverse text-content-inverse shadow-lifted'
          : 'bg-surface-sunken text-content-primary inset-shadow-sunken',
      )}
    >
      <code>
        {lines.map((line, index) => (
          <span key={`${index}-${line}`} className="block w-fit min-w-full whitespace-pre">
            {line || ' '}
          </span>
        ))}
      </code>
    </pre>
  )
}
