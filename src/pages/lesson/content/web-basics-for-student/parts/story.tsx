import { ArrowRight, Database, Globe, GraduationCap, Rocket, Server } from 'lucide-react'
import { Fragment, type ComponentType } from 'react'
import type { SlideProps } from '../../../deck'
import { Chip, Mark, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'
import type { StoryBeat } from '../model/story'

/**
 * 이야기 한 장면을 그리는 화면.
 * 같은 틀에 points(나란히 보는 설명), steps(순서), terms(용어)를 갈아 끼워
 * 화면마다 모양이 달라지게 한다. 번호를 붙인 예시 목록처럼 보이지 않게 하려는 의도다.
 */
export function makeStorySlide(beat: StoryBeat): ComponentType<SlideProps> {
  return function StorySlide() {
    return (
      <SlideLayout align={beat.terms && (beat.points || beat.steps) ? 'top' : 'center'}>
        <SlideKicker>{beat.stage}</SlideKicker>
        <SlideHeadline>{beat.headline}</SlideHeadline>
        <SlideLead>{beat.lead}</SlideLead>

        {beat.steps && (
          <div className="grid gap-4 md:gap-5 lg:grid-cols-4">
            {beat.steps.map((item, index) => (
              <Panel
                key={item.step}
                tone={index === 0 ? 'accentSoft' : 'raised'}
                pad="md"
                className={cx('flex flex-col gap-2', `animate-rise-${index + 1}`)}
              >
                <PanelLabel tone={index === 0 ? 'accent' : 'muted'}>{item.step}</PanelLabel>
                <p className="text-deck-caption font-semibold text-content-primary">{item.detail}</p>
              </Panel>
            ))}
          </div>
        )}

        {beat.points && (
          <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
            {beat.points.map((item, index) => (
              <Panel
                key={item.head}
                tone={index === 1 ? 'accentSoft' : 'raised'}
                pad="lg"
                className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
              >
                <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
                <p className="text-deck-caption text-content-secondary">{item.detail}</p>
              </Panel>
            ))}
          </div>
        )}

        {beat.terms && (
          <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
            {beat.terms.map((term) => (
              <div key={term.word} className="flex flex-col gap-1 rounded-card bg-surface-sunken px-4 py-3 inset-shadow-sunken md:px-6 md:py-4">
                <p className="text-deck-caption font-bold text-content-strong">{term.word}</p>
                <p className="text-deck-meta text-content-secondary">{term.mean}</p>
              </div>
            ))}
          </div>
        )}

        {beat.learned && (
          <div className="flex flex-col gap-2 rounded-card bg-surface-raised px-4 py-3 shadow-raised md:flex-row md:items-center md:gap-5 md:px-6 md:py-4">
            <div className="flex flex-wrap items-center gap-3">
              <GraduationCap className="size-6 shrink-0 text-accent md:size-7" />
              <PanelLabel tone="accent">{beat.learned.layer}</PanelLabel>
              <Chip tone={beat.learned.status === '이미 배운 것' ? 'accent' : 'quiet'}>{beat.learned.status}</Chip>
            </div>
            <p className="text-deck-caption font-semibold text-content-primary">{beat.learned.course}</p>
          </div>
        )}

        <SlideNote tone="quiet">{beat.real}</SlideNote>
      </SlideLayout>
    )
  }
}

const PLACES = [
  { icon: Globe, head: '브라우저', detail: '손님이 보고 누르는 화면', sub: 'HTML · CSS · JS' },
  { icon: Server, head: '서버 코드', detail: '규칙대로 판단하고 답장을 만드는 곳', sub: '지금 배우는 자바가 사는 칸' },
  { icon: Database, head: '데이터베이스', detail: '꺼져도 남아야 하는 기록', sub: '표 · 행 · 열' },
]

/** W20. 이야기를 다 지나온 뒤 한 장으로 접는 지도. 이후에도 M 키로 계속 돌아온다. */
export function StoryMapSlide() {
  return (
    <SlideLayout>
      <SlideKicker>여기까지 지나온 길</SlideKicker>
      <SlideHeadline>분식집 사이트 하나를 만들며 지나온 곳은 세 군데였습니다</SlideHeadline>

      <div className="grid items-stretch gap-3 md:gap-5 lg:grid-cols-11">
        {PLACES.map((place, index) => {
          const Icon = place.icon
          return (
            <Fragment key={place.head}>
              <Panel
                tone={index === 1 ? 'accentSoft' : 'raised'}
                pad="lg"
                className={cx('flex flex-col gap-3 lg:col-span-3', `animate-rise-${index + 1}`)}
              >
                <Icon className="size-8 text-accent md:size-11" />
                <p className="text-deck-lead font-bold text-content-strong">{place.head}</p>
                <p className="text-deck-caption text-content-secondary">{place.detail}</p>
                <div className="mt-auto flex">
                  <Chip>{place.sub}</Chip>
                </div>
              </Panel>
              {index < PLACES.length - 1 && (
                <div className="flex items-center justify-center lg:col-span-1">
                  <ArrowRight className="size-7 text-accent md:size-9" />
                </div>
              )}
            </Fragment>
          )
        })}
      </div>

      <Panel tone="sunken" pad="md" className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <Rocket className="size-8 shrink-0 text-accent md:size-10" />
        <div className="flex flex-col gap-1">
          <PanelLabel>배포와 운영</PanelLabel>
          <p className="text-deck-body font-semibold text-content-primary">
            이 세 곳을 늘 켜져 있는 컴퓨터에 올려 주소를 열고, 문을 연 다음부터는 기록을 보며 고쳐 나갑니다.
          </p>
        </div>
      </Panel>

      <SlideNote tone="quiet">
        수업 중에 길을 잃으면 <Mark>M 키</Mark>를 눌러 이 화면으로 돌아옵니다
      </SlideNote>
    </SlideLayout>
  )
}
