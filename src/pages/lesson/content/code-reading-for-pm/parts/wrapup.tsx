import { CalendarCheck, NotebookPen, PartyPopper } from 'lucide-react'
import { useState } from 'react'
import {
  CheckRow,
  Chip,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideBody,
  SlideHeadline,
  SlideLayout,
  SlideNote,
} from '../../../deck'
import { SOLO_LOOP, TOGETHER, WEEKS } from '../model/curriculum'

const SUMMARY = [
  { head: '문법', body: '값 · 조건 · 반복 · 호출', tail: '나머지는 이름으로 추측하고 넘어가요' },
  { head: '제품 규칙', body: 'if문에 산다', tail: '숫자와 조건의 순서가 곧 정책이에요' },
  { head: '읽고 나서', body: '무엇이 · 왜 · 위험은', tail: '세 문장으로 말할 수 있으면 읽은 거예요' },
]

/** R24. 오늘 남길 3줄 */
export function SummarySlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <SlideHeadline>오늘 남길 3줄</SlideHeadline>
        <Chip tone="accent">읽은 함수 다시 한번 볼까요</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {SUMMARY.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 2 ? 'accent' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-5',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <span
              className={cx(
                'grid size-10 place-items-center rounded-full text-deck-caption font-bold md:size-14',
                index === 2 ? 'bg-accent-contrast/15 text-accent-contrast' : 'bg-surface-sunken text-content-secondary',
              )}
            >
              {index + 1}
            </span>
            <p
              className={cx(
                'text-deck-caption font-semibold',
                index === 2 ? 'text-accent-contrast/70' : 'text-content-muted',
              )}
            >
              {item.head}
            </p>
            <p className={cx('text-deck-lead font-bold', index === 2 ? 'text-accent-contrast' : 'text-content-strong')}>
              {item.body}
            </p>
            <p
              className={cx(
                'mt-auto text-deck-caption',
                index === 2 ? 'text-accent-contrast/70' : 'text-content-secondary',
              )}
            >
              {item.tail}
            </p>
          </Panel>
        ))}
      </div>
    </SlideLayout>
  )
}

/** R26. 같이 2주, 그다음은 혼자 */
export function HandoffSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <NotebookPen className="size-8 text-accent md:size-11" />
        <SlideHeadline>
          같이 2주, 그다음은 <Mark>혼자</Mark>
        </SlideHeadline>
      </div>

      <ol className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {TOGETHER.map((item, index) => (
          <Panel
            key={item.when}
            tone={item.mine ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-3',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <PanelLabel tone={item.mine ? 'accent' : 'muted'}>{item.when}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">{item.what}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.detail}</p>
          </Panel>
        ))}
      </ol>

      <Panel tone="sunken" pad="lg" className="flex flex-col gap-4">
        <PanelLabel>3주차부터 매주 돌리는 루프</PanelLabel>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
          {SOLO_LOOP.map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-12">
                {item.step}
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-deck-caption font-bold text-content-strong">{item.head}</span>
                <span className="text-deck-caption text-content-secondary">{item.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <SlideNote tone="quiet">
        2주차에 확인할 건 하나예요 — <Mark>혼자서도 이 루프가 돌아가는지</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

/** R27. 혼자 돌리는 3~8주차 커리큘럼 */
export function CurriculumSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-4 md:gap-5">
          <CalendarCheck className="size-8 text-accent md:size-11" />
          <SlideHeadline>혼자 돌릴 6주 커리큘럼</SlideHeadline>
        </div>
        <Chip tone="accent">주차마다 한 장씩 남겨요</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {WEEKS.map((item, index) => (
          <Panel
            key={item.week}
            tone={index === WEEKS.length - 1 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx(
              'flex flex-col gap-3',
              index < 3 && 'animate-rise-1',
              index >= 3 && 'animate-rise-2',
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <PanelLabel tone={index === WEEKS.length - 1 ? 'accent' : 'muted'}>{item.week}</PanelLabel>
              <Chip tone={index === WEEKS.length - 1 ? 'accent' : 'quiet'}>{item.make}</Chip>
            </div>
            <p className="text-deck-body font-semibold text-content-strong">{item.goal}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.why}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="lg" className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-8">
        <p className="text-deck-body text-content-secondary">
          이 커리큘럼은 <span className="text-content-strong">코치 프롬프트 안에도</span> 들어 있어요. 주차만 말하면 코치가
          과제를 꺼내 줘요.
        </p>
        <p className="text-deck-caption text-content-muted">막히는 주차가 생기면 그때 연락 주세요</p>
      </Panel>

      <SlideNote>
        <span className="inline-flex items-center gap-3">
          <PartyPopper className="size-6 md:size-8" />
          오늘 <span className="underline decoration-4 underline-offset-8">함수 두 개와 PR 하나</span>를 끝까지 읽었어요 👏
        </span>
      </SlideNote>
    </SlideLayout>
  )
}

const PREP = [
  { head: '커피챗 피드백 원문 확인', hint: '학생이 실제로 들은 문장으로 2번째 화면을 시작하면 훨씬 붙어요' },
  { head: '덱의 바깥 링크 5개 열어보기', hint: 'APM 공고 3개 + 실습 파일 3개 + diff 목록 2개 · 죽은 링크가 있으면 수업이 멈춘다' },
  { head: '실습용 PR 하나 미리 골라두기', hint: 'Cal.com 머지된 PR 중 Files changed 30줄 이하 · 숫자나 조건이 바뀐 것' },
  { head: '학생 GitHub 계정 · LLM 계정 확인', hint: '수업 전날 한 번 더 · PART 2가 여기서 무너져요' },
  { head: '3문장 요약 예시 미리 작성', hint: '학생 답과 비교해서 보여줄 모범 답안' },
  { head: '2주차 날짜 잡고 끝내기', hint: '같이 하는 건 2주뿐이라, 오늘 안 잡으면 그대로 끝나요' },
  { head: '오프라인 대비', hint: '네트워크가 죽으면 이 덱의 함수·diff 화면으로 그대로 진행 가능' },
]

/** R26. 강사용 — 수업 전 준비 (학생에게 보여주는 화면 아님) */
export function PrepChecklistSlide() {
  const [checks, setChecks] = useState(() => PREP.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <SlideHeadline>수업 전 준비</SlideHeadline>
        <Chip>강사용</Chip>
      </div>

      <div className="flex flex-col gap-3">
        {PREP.map((item, index) => (
          <CheckRow key={item.head} checked={checks[index]} onToggle={() => toggle(index)} hint={item.hint}>
            {item.head}
          </CheckRow>
        ))}
      </div>

      <SlideBody>읽을 레포와 PR을 미리 못 정하면 PART 2에서 20분이 날아가요.</SlideBody>
    </SlideLayout>
  )
}
