import { cx, Panel, PanelLabel } from '../../../deck'
import { EXAM_EMP_ROWS } from '../model/units'

const HEAD = ['ID', 'DEPT', 'SALARY', 'BONUS']

function Cell({ value }: { value: string | number | null }) {
  return (
    <td className={cx('px-3 py-1.5 tabular-nums md:px-4', value === null ? 'text-content-muted' : 'text-content-strong')}>
      {value === null ? 'NULL' : value}
    </td>
  )
}

/** 결과 예측용 표본 EXAM_EMP 네 행. NULL은 흐리게 보여서 계산할 때 바로 눈에 걸리게 한다. */
export function SampleTable() {
  return (
    <Panel tone="sunken" pad="sm" className="flex flex-col gap-3">
      <PanelLabel>표본 EXAM_EMP</PanelLabel>
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-deck-caption">
          <thead>
            <tr className="text-left text-content-muted">
              {HEAD.map((head) => (
                <th key={head} className="px-3 py-1.5 font-semibold md:px-4">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EXAM_EMP_ROWS.map((row, index) => (
              <tr key={row.id} className={cx(index % 2 === 0 && 'bg-surface-base')}>
                <Cell value={row.id} />
                <Cell value={row.dept} />
                <Cell value={row.salary} />
                <Cell value={row.bonus} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}
