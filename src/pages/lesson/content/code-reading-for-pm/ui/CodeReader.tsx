import { useState } from 'react'
import { Chip, cx, Panel, PanelLabel } from '../../../deck'
import type { CodeLine } from '../model/code-samples'

type Props = {
  lines: CodeLine[]
  /** 오른쪽 패널에 아직 아무 줄도 안 눌렀을 때 띄우는 안내 */
  idle: string
}

/**
 * 줄을 누르면 뜻과 물어볼 것이 뜨는 코드 리더.
 * 조건만 있는 함수(R7)와 반복문이 있는 함수(R8)가 같은 인터랙션을 써야
 * 학생이 두 번째 화면에서 조작법을 다시 배우지 않는다.
 */
export function CodeReader({ lines, idle }: Props) {
  const [picked, setPicked] = useState<number | null>(null)
  const line = picked === null ? null : lines[picked]

  return (
    <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
      <Panel tone="sunken" pad="md" className="flex flex-col gap-1 overflow-x-auto lg:col-span-5">
        {lines.map((item, index) =>
          item.plain ? (
            <button
              key={index}
              type="button"
              onClick={() => setPicked(index)}
              className={cx(
                // w-fit min-w-full: 가로 스크롤이 생기는 긴 줄에서도 선택 배경이 코드 끝까지 간다
                'w-fit min-w-full rounded-control px-3 py-2 text-left font-mono text-deck-caption whitespace-pre transition duration-200 ease-deck md:px-4',
                picked === index
                  ? 'bg-accent text-accent-contrast'
                  : 'text-content-primary hover:bg-surface-base hover:text-content-strong',
              )}
            >
              {item.code}
            </button>
          ) : (
            <p key={index} className="px-3 py-2 font-mono text-deck-caption whitespace-pre text-content-muted md:px-4">
              {item.code}
            </p>
          ),
        )}
      </Panel>

      <Panel tone="raised" pad="lg" className="flex flex-col gap-4 lg:col-span-4">
        {line ? (
          <div className="animate-pop flex flex-col gap-4">
            <PanelLabel>한국어로 옮기면</PanelLabel>
            <p className="text-deck-body font-semibold text-content-strong">{line.plain}</p>
            {line.ask ? (
              <>
                <PanelLabel tone="accent">PM이 물어야 할 것</PanelLabel>
                <p className="text-deck-caption text-content-secondary">{line.ask}</p>
              </>
            ) : null}
            {line.pivotal ? (
              <div className="flex">
                <Chip tone="accent">꼭 짚고 갈 줄</Chip>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex flex-1 flex-col justify-center gap-4">
            <PanelLabel>읽는 방법</PanelLabel>
            <p className="text-deck-body text-content-secondary">{idle}</p>
          </div>
        )}
      </Panel>
    </div>
  )
}
