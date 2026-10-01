import type { ReactNode } from 'react'
import { Chip, cx, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLead } from '../../../deck'
import { RichText } from './RichText'

type HeadProps = {
  step: number
  /** 이 화면이 다루는 단원 (예: B단원) */
  area: string
  title: ReactNode
  lead?: string
  /** 이 내용을 묻는 문제 번호 */
  refs: string
}

/** 개념 화면의 머리. 오른쪽 위에 관련 문제 번호를 붙여 설명과 문제를 오갈 수 있게 한다. */
export function ConceptHead({ step, area, title, lead, refs }: HeadProps) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>
          개념 {step} · {area}
        </SlideKicker>
        <Chip>관련 문제 {refs}</Chip>
      </div>
      <SlideHeadline>{title}</SlideHeadline>
      {lead ? <SlideLead>{lead}</SlideLead> : null}
    </>
  )
}

/** 이름표를 문장 앞에 붙인 규칙 목록. 한 덩어리로 읽혀야 해서 칸을 나누지 않는다. */
export function Rules({ items, label }: { items: Array<{ label: string; text: string }>; label?: string }) {
  return (
    <Panel tone="raised" pad="sm" className="flex flex-col gap-2.5">
      {label ? <PanelLabel tone="accent">{label}</PanelLabel> : null}
      {items.map((item) => (
        <p key={item.label} className="text-deck-caption font-semibold text-content-strong">
          <span className="mr-2 font-bold text-accent">{item.label}</span>
          <RichText text={item.text} />
        </p>
      ))}
    </Panel>
  )
}

type TableProps = {
  head: string[]
  /** null은 SQL의 NULL로 흐리게 보여 준다 */
  rows: Array<Array<string | null>>
  /** 고정폭 글꼴로 보여 줄 칸 번호 */
  mono?: number[]
  label?: string
}

/** 예시와 결과를 나란히 놓는 작은 표. 코드 칸은 고정폭 글꼴, 설명 칸은 `코드`를 읽는다. */
export function MiniTable({ head, rows, mono = [], label }: TableProps) {
  return (
    <Panel tone="raised" pad="sm" className="flex flex-col gap-3">
      {label ? <PanelLabel tone="accent">{label}</PanelLabel> : null}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-deck-caption">
          <thead>
            <tr className="text-content-muted">
              {head.map((cell) => (
                <th key={cell} className="px-3 py-1.5 font-semibold md:px-4">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={cx(rowIndex % 2 === 0 && 'bg-surface-overlay')}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cx(
                      'px-3 py-1.5 align-top md:px-4',
                      // 고정폭 칸은 공백을 그대로 보여 줘야 TRIM('  SQL  ') 같은 예가 바르게 읽힌다
                      mono.includes(cellIndex) ? 'font-mono font-semibold whitespace-pre-wrap' : 'font-semibold',
                      cell === null ? 'text-content-muted' : 'text-content-strong',
                    )}
                  >
                    {cell === null ? 'NULL' : mono.includes(cellIndex) ? cell : <RichText text={cell} />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}

/** 코드 아래에 붙는 한 줄 설명 */
export function Caption({ children }: { children: string }) {
  return (
    <p className="text-deck-caption font-semibold text-content-secondary">
      <RichText text={children} />
    </p>
  )
}
