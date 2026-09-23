import { ArrowRight, Database, GraduationCap, Layers } from 'lucide-react'
import { Chip, Mark, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'
import { COURSE_LAYERS, DB_ACCESS, ORACLE_NOTES, SPRING_FLOW, SPRING_VIEW, WHERE_NOW } from '../model/stack'

/** W21. 방금 지나온 이야기를 학원 과정의 4층 구조에 얹는다. */
export function CourseMapSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>지금 다니는 과정과 겹쳐 보기</SlideKicker>
      <SlideHeadline>방금 지나온 이야기가 곧 과정의 순서입니다</SlideHeadline>
      <SlideLead>
        과정은 서비스 하나가 돌아가는 데 필요한 층을 아래에서 위로 쌓는 순서입니다. 지금은 2층까지 올라갔다가 1층으로 다시 내려와 있는 자리입니다.
      </SlideLead>

      <div className="flex flex-col gap-3 md:gap-4">
        {COURSE_LAYERS.map((layer, index) => (
          <Panel
            key={layer.floor}
            tone={layer.state === '지금 다시 보는 중' ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('grid items-center gap-3 lg:grid-cols-9 lg:gap-6', `animate-rise-${index + 1}`)}
          >
            <div className="flex items-center gap-3 lg:col-span-2">
              <Layers className="size-6 shrink-0 text-accent md:size-8" />
              <div className="flex flex-col">
                <PanelLabel tone={layer.state === '지금 다시 보는 중' ? 'accent' : 'muted'}>{layer.floor}</PanelLabel>
                <p className="text-deck-body font-bold text-content-strong">{layer.name}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 lg:col-span-4">
              <p className="text-deck-caption font-semibold text-content-primary">{layer.learn}</p>
              <div className="flex">
                <Chip tone={layer.state === '이미 배운 곳' || layer.state === '지금 다시 보는 중' ? 'accent' : 'quiet'}>{layer.state}</Chip>
              </div>
            </div>
            <p className="text-deck-caption text-content-secondary lg:col-span-3">오늘 이야기 · {layer.today}</p>
          </Panel>
        ))}
      </div>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
        {WHERE_NOW.map((item) => (
          <div key={item.head} className="flex flex-col gap-1 rounded-card bg-surface-sunken px-4 py-3 inset-shadow-sunken md:px-6 md:py-4">
            <p className="text-deck-caption font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-meta text-content-secondary">{item.detail}</p>
          </div>
        ))}
      </div>

      <SlideNote tone="quiet">
        오늘 이야기에서 <Mark>2층까지는 이미 지나온 곳</Mark>입니다 · 남은 것은 3층과 4층입니다
      </SlideNote>
    </SlideLayout>
  )
}

/** W22. 카운터·주방·창고 비유를 스프링 용어로 바꿔 놓는다. */
export function SpringFlowSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>3층 · 웹과 스프링</SlideKicker>
      <SlideHeadline>카운터와 주방과 창고에는 이미 정해진 이름이 있습니다</SlideHeadline>
      <SlideLead>과정 후반에 스프링을 배우면 이 이름들이 파일 이름과 폴더 이름으로 그대로 나옵니다.</SlideLead>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-4">
        {SPRING_FLOW.map((item, index) => (
          <Panel
            key={item.step}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <PanelLabel tone={index === 2 ? 'accent' : 'muted'}>{index + 1}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">{item.step}</p>
            <p className="text-deck-caption text-content-secondary">{item.detail}</p>
            <div className="mt-auto flex">
              <Chip>오늘 이야기 · {item.today}</Chip>
            </div>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="grid gap-4 md:grid-cols-2 md:gap-6">
        {SPRING_VIEW.map((item) => (
          <div key={item.head} className="flex items-start gap-3">
            <ArrowRight className="size-6 shrink-0 text-accent md:size-7" />
            <div className="flex flex-col gap-1">
              <p className="text-deck-caption font-bold text-content-strong">{item.head}</p>
              <p className="text-deck-meta text-content-secondary">{item.detail}</p>
            </div>
          </div>
        ))}
      </Panel>

      <SlideNote tone="quiet">
        DTO를 이미 배웠다면 절반은 지나온 것입니다 · <Mark>층과 층 사이로 값을 넘기는 그릇</Mark>이 DTO입니다
      </SlideNote>
    </SlideLayout>
  )
}

/** W23. 자바 코드에서 Oracle에 말을 거는 세 가지 방법. */
export function OracleAccessSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>2층 · 데이터베이스</SlideKicker>
      <SlideHeadline>배운 Oracle과 배울 자바 코드는 이렇게 붙습니다</SlideHeadline>
      <SlideLead>
        셋 다 하는 일은 같습니다. SQL을 보내고 결과를 받아 자바 객체에 담습니다. 첫 번째는 이미 실습에서 해 봤을 것입니다.
      </SlideLead>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
        {DB_ACCESS.map((item, index) => (
          <Panel
            key={item.name}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <div className="flex items-center gap-3">
              <Database className="size-6 shrink-0 text-accent md:size-8" />
              <p className="text-deck-lead font-bold text-content-strong">{item.name}</p>
            </div>
            <p className="text-deck-caption text-content-secondary">{item.detail}</p>
            <div className="mt-auto flex">
              <Chip>{item.feel}</Chip>
            </div>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <GraduationCap className="size-6 shrink-0 text-accent md:size-8" />
          <PanelLabel>Oracle을 쓸 때 달라지는 표기</PanelLabel>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {ORACLE_NOTES.map((item) => (
            <div key={item.head} className="flex flex-col gap-1">
              <p className="text-deck-caption font-bold text-content-strong">{item.head}</p>
              <p className="text-deck-meta text-content-secondary">{item.detail}</p>
            </div>
          ))}
        </div>
      </Panel>
    </SlideLayout>
  )
}
