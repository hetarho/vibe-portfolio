import { CalendarDays, FolderKanban, MessageCircleQuestion, Repeat2 } from 'lucide-react'
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

const REVIEW_LOOP = [
  { no: '1', head: '오늘 만든 것을 다시 연다', body: '프로젝트 세 개 중 하나를 골라 파일을 열어봅니다' },
  { no: '2', head: '한 군데만 고쳐 본다', body: '표 한 줄, 슬라이드 한 장. 전체를 다시 만들지 않습니다' },
  { no: '3', head: '막히면 그대로 둔다', body: '혼자 고치려 애쓰지 말고 화면만 캡처해 둡니다' },
]

const ASK_THREE = [
  { head: '하려던 일', body: '“평형 비교표에 분담금을 넣으려고 했어요”' },
  { head: '지금 나온 결과', body: '화면 캡처나 답변을 그대로 붙여넣기' },
  { head: '원하는 모습', body: '“추산액과 확정액이 갈려 있으면 좋겠어요”' },
]

/** D27. 집에서 복습하고 질문하기 */
export function ReviewHabitSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>집에서</SlideKicker>
          <SlideHeadline>막힌 데를 모아 두시면 됩니다</SlideHeadline>
        </div>
        <Chip tone="accent">혼자 해결하지 않으셔도 됩니다</Chip>
      </div>

      <div className="grid items-stretch gap-6 md:gap-8 lg:grid-cols-9">
        <div className="flex flex-col gap-3 lg:col-span-4">
          <PanelLabel>복습은 이 세 걸음이면 충분</PanelLabel>
          {REVIEW_LOOP.map((step, index) => (
            <Panel
              key={step.no}
              tone="raised"
              pad="sm"
              className={cx('flex items-center gap-4', `animate-rise-${index + 1}`)}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-11">
                {step.no}
              </span>
              <div className="flex flex-col">
                <p className="text-deck-body font-bold text-content-strong">{step.head}</p>
                <p className="text-deck-caption text-content-secondary">{step.body}</p>
              </div>
            </Panel>
          ))}
        </div>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-3 flex flex-col gap-4 lg:col-span-5">
          <div className="flex items-center gap-4">
            <MessageCircleQuestion className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">물어보실 때 이 셋만 담아주세요</PanelLabel>
          </div>
          {ASK_THREE.map((item) => (
            <div key={item.head} className="rounded-card bg-surface-raised p-3 shadow-raised md:p-4">
              <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
              <p className="text-deck-caption text-content-secondary">{item.body}</p>
            </div>
          ))}
          <p className="mt-auto text-deck-caption text-content-secondary">
            셋이 있으면 답이 바로 나갑니다. 없으면 상황을 되묻느라 하루가 갑니다.
          </p>
        </Panel>
      </div>

      <SlideNote tone="quiet">
        “안 돼요”보다 <Mark>“이렇게 했더니 이렇게 나왔어요”</Mark>가 언제나 빠릅니다
      </SlideNote>
    </SlideLayout>
  )
}

const WEEKS = [
  { when: '이번 주', head: '평형 신청 먼저', body: '기한이 가장 급합니다. 비교표를 채우고 조합에 물을 것을 정리합니다' },
  { when: '다음 주', head: '오리엔테이션 자료', body: '근거표를 마무리하고 발표 파일을 지역에 맞게 손봅니다' },
  { when: '상담 뒤 언제든', head: '상담 정리 스킬', body: '법무사를 만나고 오신 날 저녁에 기억나는 대로 넣어 봅니다' },
]

/** D28. 오늘 배운 것과 3주 */
export function SummarySlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-4">
          <SlideKicker>마무리</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            도구는 다섯,
            <br />
            <Mark>동작은 셋</Mark>
          </h1>
          <SlideBody>
            재료를 열어두고, 여섯 칸을 채워 시키고, 나온 파일을 직접 열어 확인합니다. 세 가지 일 모두 같은 순서로
            돌아갑니다.
          </SlideBody>
          <Panel tone="raised" pad="sm" className="animate-rise-2 flex items-center gap-4">
            <FolderKanban className="size-7 text-content-muted md:size-9" />
            <p className="text-deck-caption text-content-secondary">
              프로젝트 세 개가 오늘 가져가시는 작업실입니다
            </p>
          </Panel>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-5">
          {WEEKS.map((week, index) => (
            <Panel
              key={week.when}
              tone={index === 0 ? 'accentSoft' : 'raised'}
              pad="md"
              className={cx('flex items-center gap-4', `animate-rise-${index + 1}`)}
            >
              {index === 0 ? (
                <CalendarDays className="size-8 shrink-0 text-accent md:size-10" />
              ) : (
                <Repeat2 className="size-8 shrink-0 text-content-muted md:size-10" />
              )}
              <div className="flex flex-col">
                <PanelLabel tone={index === 0 ? 'accent' : 'muted'}>{week.when}</PanelLabel>
                <p className="text-deck-body font-bold text-content-strong">{week.head}</p>
                <p className="text-deck-caption text-content-secondary">{week.body}</p>
              </div>
            </Panel>
          ))}
        </div>
      </div>

      <SlideNote>오늘 안에 한 가지만 · 재건축 폴더를 열어 기한표를 달력에 옮겨 적기</SlideNote>
    </SlideLayout>
  )
}
