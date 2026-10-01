import { Lightbulb } from 'lucide-react'
import type { ComponentType } from 'react'
import type { SlideProps } from '../../../deck'
import { Chip, Panel, SlideHeadline, SlideKicker, SlideLayout, SlideLead } from '../../../deck'
import { PROBLEMS } from '../model/problems'
import type { Unit } from '../model/units'
import { RichText } from '../ui/RichText'
import { TableList } from '../ui/TableList'

const LEVELS = ['하급', '중급', '상급'] as const

/** 단원 첫 화면. 문제로 들어가기 전에 그 단원에서 꼭 기억할 것만 한 장에 모은다. */
export function makeUnitSlide(unit: Unit): ComponentType<SlideProps> {
  const problems = PROBLEMS.filter((problem) => problem.unit === unit.key)
  const levelCounts = LEVELS.map((level) => ({
    level,
    count: problems.filter((problem) => problem.level === level).length,
  })).filter((item) => item.count > 0)

  return function UnitSlide() {
    return (
      <SlideLayout align="top">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>
            단원 {unit.key} · {unit.start}번 ~ {unit.end}번 · {problems.length}문제
          </SlideKicker>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {levelCounts.map((item) => (
              <Chip key={item.level}>
                {item.level} {item.count}문제
              </Chip>
            ))}
          </div>
        </div>
        <SlideHeadline>{unit.title}</SlideHeadline>
        <SlideLead>{unit.lead}</SlideLead>

        {unit.tables ? (
          <TableList keys={unit.tables} label="워크북 테이블" />
        ) : (
          // 1080p 전체화면에서도 한 화면에 들어오도록 항목 이름을 문장 앞에 붙여 한 덩어리로 쓴다
          <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
            {unit.points.map((point) => (
              <Panel key={point.label} tone="raised" pad="sm">
                <p className="text-deck-caption font-semibold text-content-strong">
                  <span className="mr-2 font-bold text-accent">{point.label}</span>
                  <RichText text={point.line} />
                </p>
              </Panel>
            ))}
          </div>
        )}

        <Panel tone="sunken" pad="sm" className="flex items-center gap-3">
          <Lightbulb className="size-6 shrink-0 text-caution md:size-7" />
          <p className="text-deck-caption font-semibold text-content-primary">{unit.note}</p>
        </Panel>
      </SlideLayout>
    )
  }
}
