import { CalendarClock, Laptop, Server } from 'lucide-react'
import {
  Chip,
  CompareGrid,
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
import { PromptCopyButton } from '../../shared'
import coachPrompt from '../model/coach-prompt.md?raw'

const MADE = [
  '직위를 고르는 화면',
  '직위별로 다른 평정 항목',
  '넣는 대로 나오는 합계',
  '제출과 제출 기록',
  '누가 냈는지 보이는 관리자 화면',
]

const NOT_YET = [
  { head: '다른 사람이 들어올 수 없다', body: '내 컴퓨터에서만 열립니다. 사내 주소로 올리는 일이 남았습니다' },
  { head: '본인 확인이 없다', body: '지금은 이름을 직접 고릅니다. 사번이나 사내 계정과 이어야 합니다' },
  { head: '데이터가 파일 하나다', body: '동시에 여러 명이 제출하는 상황은 아직 감당하지 못합니다' },
  { head: '권한 구분이 없다', body: '관리자 화면을 누구나 열 수 있습니다' },
]

/** H27. 오늘 만든 것과 아직 아닌 것 */
export function MadeAndNotSlide() {
  return (
    <SlideLayout>
      <SlideKicker>마무리 · 선을 분명히 긋고 갑니다</SlideKicker>
      <SlideHeadline>오늘 만든 것은 시제품입니다</SlideHeadline>
      <SlideBody>
        시제품은 “이렇게 돌아가면 되겠다”를 눈으로 확인하는 물건입니다. 실제 평정에 쓰려면 네 가지가 더 필요하고,
        그 넷이 2회차의 주제입니다.
      </SlideBody>

      <CompareGrid>
        <Panel tone="accentSoft" pad="lg" className="animate-rise-1 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <Laptop className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">오늘 두 시간에 만든 것</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {MADE.map((item) => (
              <li
                key={item}
                className="rounded-card bg-surface-raised p-3 text-deck-caption font-semibold text-content-primary shadow-raised md:p-4"
              >
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <Server className="size-8 text-content-muted md:size-10" />
            <PanelLabel>실제로 쓰려면 남은 것</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {NOT_YET.map((item) => (
              <li key={item.head} className="rounded-card bg-surface-sunken p-3 inset-shadow-sunken md:p-4">
                <p className="text-deck-caption font-bold text-content-strong">{item.head}</p>
                <p className="text-deck-caption text-content-secondary">{item.body}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        시제품이 있으면 달라지는 것이 하나 있습니다 · <Mark>남에게 설명할 때 화면을 보여줄 수 있습니다</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const NEXT = [
  { no: '1', head: '사내에서 열리게 올리기', body: '링크를 받은 평정자가 자기 컴퓨터에서 들어올 수 있게 합니다' },
  { no: '2', head: '본인 확인 붙이기', body: '누가 낸 평정지인지 시스템이 알게 만듭니다' },
  { no: '3', head: '데이터 제대로 쌓기', body: '여러 명이 동시에 내도 섞이지 않게 합니다' },
  { no: '4', head: '엑셀로 내보내기', body: '지금 쓰시는 집계 양식과 맞춰 내려받게 합니다' },
]

/** H28. 2회차에 할 일 */
export function NextSessionSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>다음 시간</SlideKicker>
          <SlideHeadline>시제품을 실제로 돌아가게 만듭니다</SlideHeadline>
        </div>
        <Chip tone="accent">
          <CalendarClock className="size-5 md:size-6" />
          2회차
        </Chip>
      </div>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-4">
        {NEXT.map((item, index) => (
          <Panel
            key={item.no}
            tone="raised"
            pad="lg"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <span className="grid size-9 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-11">
              {item.no}
            </span>
            <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.body}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-5 flex flex-col gap-2">
        <PanelLabel>다음 시간 전에 준비해 오시면 좋은 것</PanelLabel>
        <p className="text-deck-caption text-content-secondary">
          사내에서 웹 서비스를 올릴 때 지켜야 하는 규정이 있는지, 인사 자료를 외부 서비스에 둘 수 있는지를 정보 담당
          부서에 한 번 확인해 두시면 2회차가 훨씬 빨라집니다.
        </p>
      </Panel>
    </SlideLayout>
  )
}

/** H29. 집에서 쓰는 코치 프롬프트 */
export function CoachPromptSlide() {
  return (
    <SlideLayout>
      <SlideKicker>혼자 이어가실 때</SlideKicker>
      <SlideHeadline>막히지 않게 해주는 문장을 드리고 갑니다</SlideHeadline>
      <SlideBody>
        혼자 하실 때 가장 흔한 실패는 에이전트가 너무 많이 만들어 버려서 어디가 깨졌는지 모르게 되는 것입니다. 이
        프롬프트는 그 속도를 늦추고, 매번 확인할 것을 돌려주게 만듭니다.
      </SlideBody>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-3 lg:col-span-5">
          <PanelLabel>이 프롬프트가 시키는 것</PanelLabel>
          <ul className="flex flex-col gap-3">
            {[
              '한 번에 하나씩만 만들게 한다',
              '기능마다 저장점을 먼저 만들게 한다',
              '인사 규칙이 불확실하면 지어내지 말고 묻게 한다',
              '실제 직원 데이터를 쓰지 않게 한다',
              '끝났다고 말하기 전에 스스로 검사하게 한다',
            ].map((item) => (
              <li
                key={item}
                className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-secondary inset-shadow-sunken md:p-4"
              >
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <div className="flex flex-col justify-center gap-4 lg:col-span-4">
          <PromptCopyButton label="평정 시스템 코치 프롬프트 복사" text={coachPrompt} />
          <p className="text-deck-caption text-content-muted">
            새 작업을 시작할 때 맨 처음 한 번 붙여 넣으시면 됩니다. 그 대화 내내 이 규칙이 살아 있습니다.
          </p>
        </div>
      </div>
    </SlideLayout>
  )
}

const THREE = [
  { head: '제도는 내가 정하고, 코드는 맡긴다', body: '항목과 가중치를 물어보면 지어냅니다. 먼저 적어서 줍니다' },
  { head: '가짜 데이터로 만들고, 진짜는 나중에', body: '만드는 동안 실제 인사 자료는 필요하지 않습니다' },
  { head: '저장하고, 하나씩, 눈으로 확인', body: '되돌릴 수 있으면 과감하게 시켜볼 수 있습니다' },
]

/** H30. 오늘의 3줄 */
export function SummarySlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘 가져가실 것</SlideKicker>
      <SlideHeadline>세 줄로 남깁니다</SlideHeadline>

      <div className="flex flex-col gap-4 md:gap-5">
        {THREE.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-3 md:grid md:grid-cols-9 md:items-center md:gap-8',
              `animate-rise-${index + 1}`,
            )}
          >
            <div className="flex items-center gap-4 md:col-span-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-12">
                {index + 1}
              </span>
              <p className="text-deck-lead font-bold text-content-strong">{item.head}</p>
            </div>
            <p className="text-deck-caption text-content-secondary md:col-span-5">{item.body}</p>
          </Panel>
        ))}
      </div>

      <SlideNote>엑셀 1,000장이 화면 하나로 바뀌는 일은 · 오늘 만든 그 시제품에서 시작합니다</SlideNote>
    </SlideLayout>
  )
}
