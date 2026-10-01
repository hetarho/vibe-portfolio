import { Panel } from '../../../deck'
import type { ExamBlock } from '../model/problems'
import { isMonoBlock } from '../model/problems'
import { CodeBlock } from './CodeBlock'
import { RichText } from './RichText'

/**
 * 시험지의 [보기]·[문제]·[코드]·[실행 결과]·[테이블] 덩어리.
 * 이름표를 대괄호로 달아 기출 시험지에서 보던 모양 그대로 둔다.
 * 코드와 실행 결과는 줄을 맞춰야 읽히므로 고정폭, 보기와 문제는 문장으로 그린다.
 */
export function ExamBlockView({ block }: { block: ExamBlock }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-deck-meta font-bold tracking-wide text-content-secondary">[{block.label}]</p>
      {isMonoBlock(block) ? (
        <CodeBlock lines={block.lines} tone="given" />
      ) : (
        // RichText의 코드 조각은 sunken 바탕이라 raised 면 위에 얹는다
        <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
          {block.lines.map((line) => (
            <p key={line} className="text-deck-caption font-semibold text-content-strong">
              <RichText text={line} />
            </p>
          ))}
        </Panel>
      )}
    </div>
  )
}
