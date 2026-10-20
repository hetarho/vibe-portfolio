import { Ban, FileCode2 } from 'lucide-react'
import { useState } from 'react'
import { cx, Panel, PanelLabel } from '../../../deck'
import type { DrillProblem } from '../model/drill'
import { STEPS } from '../model/drill'
import { DrillCode } from './DrillCode'

/** 고정폭 글꼴에서 한글은 영문 두 칸을 먹는다 */
function widthOf(line: string) {
  let width = 0
  for (const char of line) width += /[가-힣]/.test(char) ? 2 : 1
  return width
}

/**
 * 같은 문제의 Step 1~5 파일을 탭으로 넘겨 본다. 힌트가 한 겹씩 지워지는 것을 눈으로 보여 주는 화면이다.
 * Step 1 파일은 안내 주석 한 줄뿐이고 학생은 오른쪽 화면의 정답을 보고 치므로, Step 1 탭에는 그 정답을 띄운다.
 * 화면을 넘겼다 돌아오면 Step 1부터 다시 본다.
 */
export function StepTabs({ problem }: { problem: DrillProblem }) {
  const [step, setStep] = useState(1)
  const info = STEPS[step - 1]
  const lines = step === 1 ? problem.answerLines : problem.steps[step - 1]

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {STEPS.map((item) => (
          <button
            key={item.no}
            type="button"
            onClick={() => setStep(item.no)}
            aria-pressed={step === item.no}
            className={cx(
              'flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-deck-caption font-semibold transition duration-200 ease-deck',
              step === item.no
                ? 'bg-accent text-accent-contrast shadow-lifted'
                : 'bg-surface-raised text-content-primary shadow-raised hover:bg-surface-highlight',
            )}
          >
            <span
              className={cx(
                'grid size-8 shrink-0 place-items-center rounded-full font-bold md:size-9',
                step === item.no ? 'bg-accent-contrast text-accent' : 'bg-surface-sunken text-content-strong inset-shadow-sunken',
              )}
            >
              {item.no}
            </span>
            {item.name}
          </button>
        ))}
      </div>

      <Panel tone="raised" pad="sm" className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-4">
          <PanelLabel tone="accent">
            Step {info.no} · {info.name}
          </PanelLabel>
          <p className="flex items-center gap-2 text-deck-meta text-content-secondary">
            {step === 1 ? <Ban className="size-4 shrink-0" /> : <FileCode2 className="size-4 shrink-0" />}
            {step === 1 ? '코드 칸은 비어 있고, 위에 보이는 이 정답을 보고 칩니다' : `코드 칸에 처음 들어 있는 것 · ${info.hand}`}
          </p>
        </div>
        <DrillCode
          key={step}
          lines={lines}
          size={lines.length > 15 || Math.max(0, ...lines.map(widthOf)) > 64 ? 'meta' : 'caption'}
          className="animate-rise"
          empty="코드 칸이 완전히 비어 있습니다 · 주석 → 껍데기 → 빈칸"
        />
      </Panel>
    </div>
  )
}
