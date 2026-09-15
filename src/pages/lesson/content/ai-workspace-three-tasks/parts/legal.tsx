import { Repeat, Wrench } from 'lucide-react'
import {
  Chip,
  CompareGrid,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideNote,
} from '../../../deck'
import { TypeThis } from '../ui/TypeThis'

const WITHOUT = [
  '매번 다른 양식으로 정리된다',
  '지난번엔 적었던 칸을 이번엔 빠뜨린다',
  '다음에 뭘 물어야 할지 매번 다시 떠올려야 한다',
]

const WITH_SKILL = [
  '녹취든 메모든 넣으면 같은 양식으로 나온다',
  '기한이 빠지면 “기한 확인 필요”로 남는다',
  '결론이 안 난 것이 맨 위에 모인다',
]

/** D25. 같은 일이 반복되면 스킬 */
export function SkillWhySlide() {
  return (
    <SlideLayout>
      <SlideKicker>실습 3 · 법무상담 정리 · 1 / 2</SlideKicker>
      <SlideHeadline>상담은 한 번으로 끝나지 않습니다</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Repeat className="size-8 text-content-muted md:size-10" />
            <PanelLabel>매번 새로 시킬 때</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {WITHOUT.map((item) => (
              <li
                key={item}
                className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-secondary inset-shadow-sunken md:p-4"
              >
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-2 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Wrench className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">양식을 한 번 저장해 두면</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {WITH_SKILL.map((item) => (
              <li key={item} className="rounded-card bg-surface-raised p-3 text-deck-caption font-semibold text-content-primary shadow-raised md:p-4">
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        스킬은 어려운 기능이 아닙니다 · <Mark>“이렇게 정리해줘”를 글로 적어 저장해 둔 것</Mark>입니다
      </SlideNote>
    </SlideLayout>
  )
}

const SAMPLE_OUT = [
  { head: '결론이 안 난 것', body: '1+1 가능 여부 · 근거 정관 조항 번호 · 세금 전부' },
  { head: '답변 정리', body: '질문마다 요지와 근거, 상담자가 단정해서 말했는지까지' },
  { head: '다음에 할 일', body: '등기부등본 발급 · 다음 주까지 · 필요 서류까지' },
  { head: '다음에 물을 것', body: '이번에 새로 생긴 의문만' },
]

/** D29. 타자 · 스킬 만들고 써보기 */
export function SkillDemoSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 3 · 법무상담 정리 · 2 / 2</SlideKicker>
          <SlideHeadline>양식을 한 번 만들어 두고 바로 써봅니다</SlideHeadline>
        </div>
        <Chip tone="accent">두 번만 칩니다</Chip>
      </div>

      <div className="flex flex-col gap-4">
        <TypeThis step={1} className="animate-rise-1" why="이 한 줄이 스킬이 됩니다. 어려운 기능이 아니라 정리 방식을 글로 적어두는 것입니다.">
          앞으로 법무상담 내용을 넣으면 이렇게 정리해줘. 결론이 안 난 것을 맨 위에, 그다음 질문별 답변과 근거, 다음에
          할 일과 기한, 마지막에 다음에 물어볼 것. 들은 내용만 적고 법률 지식으로 채우지 마. 이걸 상담정리 스킬로
          저장해줘.
        </TypeThis>

        <TypeThis step={2} className="animate-rise-2" why="녹취가 아니어도 됩니다. 기억나는 대로 두세 줄이면 충분합니다.">
          오늘 법무사 다녀왔어. 1+1 되는지 물었더니 전용면적 합이 기존보다 크면 안 된대. 정관 몇 조라던데 못 적었어.
          조합원 지위는 승계되는데 이주비 대출은 다시 심사한대. 다음 주까지 등기부등본 떼오래.
        </TypeThis>
      </div>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-4">
        {SAMPLE_OUT.map((row, index) => (
          <Panel
            key={row.head}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="sm"
            className={cx('flex flex-col gap-1', `animate-rise-${index + 1}`)}
          >
            <PanelLabel tone={index === 0 ? 'accent' : 'muted'}>{row.head}</PanelLabel>
            <p className="text-deck-caption text-content-secondary">{row.body}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        앞에서 뽑아 둔 <Mark>“물어볼 것”</Mark>을 여기 붙이면 다음 상담 질문지가 됩니다
      </SlideNote>
    </SlideLayout>
  )
}
