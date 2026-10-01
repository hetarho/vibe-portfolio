import { Panel, PanelLabel } from '../../../deck'
import type { TableKey } from '../model/units'
import { TABLES } from '../model/units'

type Props = {
  keys: TableKey[]
  label?: string
}

/** 테이블 이름과 열 목록. 열 이름을 정확히 봐야 하는 문제 옆에 띄운다. */
export function TableList({ keys, label = '쓰는 테이블' }: Props) {
  return (
    <Panel tone="sunken" pad="sm" className="flex flex-col gap-3">
      <PanelLabel>{label}</PanelLabel>
      <div className="flex flex-col gap-2">
        {keys.map((key) => (
          <p key={key} className="font-mono text-deck-caption wrap-anywhere text-content-secondary">
            <span className="font-bold text-content-strong">{key}</span>({TABLES[key].join(', ')})
          </p>
        ))}
      </div>
    </Panel>
  )
}
