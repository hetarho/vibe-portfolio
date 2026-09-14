import { CalendarDays, FolderCog, Languages, Palette, TrendingUp, Users } from 'lucide-react'
import {
  Chip,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideBody,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideNote,
} from '../../../deck'

const ROOMS = [
  { icon: Users, head: 'Zonta', body: '회기 자료 · 근거표 · 지역별 발표', state: '오늘 만들었습니다' },
  { icon: Languages, head: '영어', body: '역할극 상대 · 막힌 문장 기록', state: '지난 시간 프롬프트 그대로' },
  { icon: TrendingUp, head: '투자', body: '기업 자료 읽기 · 판단 근거 남기기', state: '같은 방법의 복제' },
  { icon: Palette, head: '전시기획', body: '기획서 · 예산표 · 제안 자료', state: '같은 방법의 복제' },
]

/** C26. 네 개의 작업실 */
export function WorkspacesSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>앞으로</SlideKicker>
          <SlideHeadline>나머지 셋은 오늘 한 것의 복사본입니다</SlideHeadline>
        </div>
        <Chip tone="accent">폴더 하나 = 작업실 하나</Chip>
      </div>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-4">
        {ROOMS.map((room, index) => (
          <Panel
            key={room.head}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <room.icon className={cx('size-8 md:size-10', index === 0 ? 'text-accent' : 'text-content-muted')} />
            <p className="text-deck-lead font-bold text-content-strong">{room.head}</p>
            <p className="text-deck-caption text-content-secondary">{room.body}</p>
            <p className="mt-auto text-deck-caption font-semibold text-content-muted">{room.state}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="raised" pad="md" className="animate-rise-5 flex flex-wrap items-center gap-4 md:gap-6">
        <FolderCog className="size-8 text-content-muted md:size-10" />
        <p className="text-deck-body text-content-secondary">
          영상에서 보신 <Mark>프로젝트</Mark>가 이 작업실입니다 · 폴더 하나와 그 일의 규칙을 적은 지침 하나면 한 칸이 열립니다
        </p>
      </Panel>
    </SlideLayout>
  )
}

const WEEKS = [
  {
    when: '이번 주',
    head: '근거표를 끝냅니다',
    items: ['빠진 칸을 사람에게 물어 채우기', '확신도 낮은 줄은 빼거나 확인', '내부 자료를 폴더에 더 넣기'],
  },
  {
    when: '다음 주',
    head: '발표본을 확정합니다',
    items: ['목차 순서 확정 후 PPT 재생성', '지역별로 바뀌는 장만 따로', '발표자 노트를 내 말로 고치기'],
  },
  {
    when: '셋째 주',
    head: '입으로 한 번 돌립니다',
    items: ['시간 재면서 소리 내어 읽기', '예상 질문과 답을 근거표에서 뽑기', '지역별 파일을 각각 저장'],
  },
]

/** C27. 10월 초까지 3주 계획 */
export function ScheduleSlide() {
  return (
    <SlideLayout>
      <SlideKicker>앞으로</SlideKicker>
      <SlideHeadline>10월 첫 일정까지 3주, 이렇게 나눕니다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {WEEKS.map((week, index) => (
          <Panel
            key={week.when}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <div className="flex items-center gap-4">
              <CalendarDays className={cx('size-8 md:size-10', index === 0 ? 'text-accent' : 'text-content-muted')} />
              <PanelLabel tone={index === 0 ? 'accent' : 'muted'}>{week.when}</PanelLabel>
            </div>
            <p className="text-deck-lead font-bold text-content-strong">{week.head}</p>
            <ul className="mt-auto flex flex-col gap-3">
              {week.items.map((item) => (
                <li
                  key={item}
                  className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        막히면 세 가지를 들고 오시면 됩니다 · <Mark>하려던 일 · 지금 나온 결과 · 원하는 모습</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const VERBS = [
  { no: '1', head: '연다', body: '읽힐 화면을 먼저 로그인해서 열어둡니다' },
  { no: '2', head: '시킨다', body: '여섯 칸을 채운 프롬프트로 목표와 완료 조건을 줍니다' },
  { no: '3', head: '연다', body: '결과 파일을 직접 열어 눈으로 확인하고 고칩니다' },
]

/** C28. 오늘 배운 것 · 혼자 할 일 */
export function SummarySlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-4">
          <SlideKicker>마무리</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            오늘 배운 건 <Mark>동작 세 개</Mark>입니다
          </h1>
          <SlideBody>
            도구 이름은 바뀌어도 이 세 동작은 그대로입니다. 영어든 투자든 전시기획이든 같은 순서로 돌아갑니다.
          </SlideBody>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5">
          {VERBS.map((verb, index) => (
            <Panel
              key={verb.no}
              tone={index === 2 ? 'accentSoft' : 'raised'}
              pad="md"
              className={cx('flex items-center gap-4', `animate-rise-${index + 1}`)}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-body font-bold text-content-primary md:size-12">
                {verb.no}
              </span>
              <div className="flex flex-col">
                <p className="text-deck-lead font-bold text-content-strong">{verb.head}</p>
                <p className="text-deck-caption text-content-secondary">{verb.body}</p>
              </div>
            </Panel>
          ))}
        </div>
      </div>

      <SlideNote>오늘 안에 한 가지만 · Zonta 폴더를 열어 PPT 한 장을 내 말로 고쳐보기</SlideNote>
    </SlideLayout>
  )
}
