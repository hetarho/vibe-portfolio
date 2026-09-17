import { Bot, Hammer, ShieldCheck, Sparkles } from 'lucide-react'
import { Chip, cx, Mark, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideNote } from '../../../deck'

const AGENDA = [
  { icon: Sparkles, part: 'PART 1', head: 'AI란 무엇인가', body: '무엇을 잘하고 무엇을 못 하는 기계인지 먼저 봅니다', time: '10분' },
  { icon: Bot, part: 'PART 2', head: '에이전트란 무엇인가', body: '답만 하는 AI와, 파일을 만들어 놓는 AI의 차이입니다', time: '10분' },
  { icon: ShieldCheck, part: 'PART 3·4', head: '맡길 때 지킬 것', body: '만들 것을 적는 법 · 인사 데이터 · 되돌리는 법 · 확인하는 법', time: '35분' },
  { icon: Hammer, part: 'PART 5·6', head: '직접 만들어 띄우기', body: '직위를 고르면 항목이 바뀌고 합계가 나오는 화면까지', time: '50분' },
]

/** H1. 오늘 수업 목차 */
export function AgendaSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>전체 2회 중 1회차 · 2시간</SlideKicker>
          <SlideHeadline>오늘은 평정 화면 하나가 뜨는 데까지 갑니다</SlideHeadline>
        </div>
        <Chip tone="accent">뒤로 갈수록 직접 치는 시간이 깁니다</Chip>
      </div>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-4">
        {AGENDA.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 3 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <item.icon className={cx('size-8 md:size-10', index === 3 ? 'text-accent' : 'text-content-muted')} />
            <PanelLabel tone={index === 3 ? 'accent' : 'muted'}>{item.part}</PanelLabel>
            <p className="text-deck-lead font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-caption text-content-secondary">{item.body}</p>
            <p className="mt-auto rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-4">
              {item.time}
            </p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        오늘 만드는 것은 <Mark>내 컴퓨터에서 도는 시제품</Mark>입니다 · 회사에 올려 쓰는 일은 2회차에서 이어갑니다
      </SlideNote>
    </SlideLayout>
  )
}
