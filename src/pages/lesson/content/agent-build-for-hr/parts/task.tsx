import { Calculator, Database, FileSpreadsheet, Inbox, Layers, ListChecks, Send, UserCheck } from 'lucide-react'
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

const NOW = [
  { icon: Send, head: '보내기', body: '직위마다 다른 양식을 골라 메일로 보냅니다' },
  { icon: Inbox, head: '받기', body: '회신 파일을 모읍니다. 누가 아직 안 냈는지는 손으로 셉니다' },
  { icon: Calculator, head: '집계', body: '함수가 걸린 시트에 옮겨 붙입니다. 한 칸만 밀려도 점수가 틀어집니다' },
  { icon: ListChecks, head: '확인', body: '“지금 몇 장 들어왔냐”는 물음이 올 때마다 다시 셉니다' },
]

/** H8. 지금 일어나고 있는 일 */
export function CurrentWorkSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>보내주신 메시지에서 그대로 옮겼습니다</SlideKicker>
          <SlideHeadline>평정지 1,000장이 만드는 일은 넷입니다</SlideHeadline>
        </div>
        <Chip tone="accent">“엑셀 함수로 점수를 집계하고 있습니다”</Chip>
      </div>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-4">
        {NOW.map((item, index) => (
          <Panel
            key={item.head}
            tone="raised"
            pad="lg"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <item.icon className="size-8 text-content-muted md:size-10" />
            <p className="text-deck-lead font-bold text-content-strong">{item.head}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.body}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        넷 중 셋은 <Mark>사람이 세고 옮기는 일</Mark>입니다 · 시스템으로 옮기면 사라지는 쪽이 바로 이 셋입니다
      </SlideNote>
    </SlideLayout>
  )
}

const RATER_FLOW = [
  '받은 링크를 연다',
  '내 직위를 고른다',
  '그 직위의 평정 항목만 화면에 나온다',
  '점수를 넣으면 합계가 그 자리에서 보인다',
  '제출을 누른다',
]

const ADMIN_FLOW = [
  '누가 냈고 누가 안 냈는지 한 화면에서 본다',
  '제출된 평정지를 열어서 내용을 확인한다',
  '집계된 점수를 표로 내려받는다',
]

/** H9. 만들려는 것 한 장 */
export function TargetShapeSlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘의 목표 그림</SlideKicker>
      <SlideHeadline>화면은 둘입니다 · 평정자 쪽과 관리자 쪽</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <UserCheck className="size-8 text-content-muted md:size-10" />
            <PanelLabel>평정자가 보는 화면</PanelLabel>
          </div>
          <ol className="flex flex-col gap-3">
            {RATER_FLOW.map((item, index) => (
              <li
                key={item}
                className="flex items-center gap-4 rounded-card bg-surface-sunken p-3 inset-shadow-sunken md:p-4"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-raised text-deck-caption font-bold text-content-primary md:size-10">
                  {index + 1}
                </span>
                <span className="text-deck-caption font-semibold text-content-secondary">{item}</span>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-2 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <Layers className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">관리자가 보는 화면 · 담당자님 자리</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {ADMIN_FLOW.map((item) => (
              <li
                key={item}
                className="rounded-card bg-surface-raised p-3 text-deck-caption font-semibold text-content-primary shadow-raised md:p-4"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-auto text-deck-caption text-content-secondary">
            오늘은 이 중 “누가 냈는지”까지 만들어 봅니다. 내려받기는 2회차 몫입니다.
          </p>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        이 그림 한 장이 오늘 <Mark>에이전트에게 건넬 설계도</Mark>입니다
      </SlideNote>
    </SlideLayout>
  )
}

const EXCEL_SIDE = [
  '사본이 평정자 수만큼 생긴다',
  '양식을 고치면 처음부터 다시 보내야 한다',
  '누가 냈는지는 메일함만 알고 있다',
  '집계는 회신이 다 모인 다음에 시작된다',
]

const SYSTEM_SIDE = [
  '원본이 하나뿐이고 모두 같은 화면을 본다',
  '양식을 고치면 그다음 사람부터 바로 반영된다',
  '제출한 순간 기록이 남는다',
  '집계는 저장될 때 이미 끝나 있다',
]

/** H10. 엑셀과 시스템의 차이 */
export function WhyNotExcelSlide() {
  return (
    <SlideLayout>
      <SlideKicker>왜 시스템이 쉬워지는가</SlideKicker>
      <SlideHeadline>바뀌는 것은 기능이 아니라 데이터가 있는 자리입니다</SlideHeadline>
      <SlideBody>
        엑셀에서는 데이터가 사람마다 흩어진 파일 안에 있습니다. 시스템에서는 한 곳에 쌓입니다. 집계가 사라지는 이유도,
        현황이 저절로 보이는 이유도 전부 여기에서 나옵니다.
      </SlideBody>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <FileSpreadsheet className="size-8 text-content-muted md:size-10" />
            <PanelLabel>파일이 돌아다닐 때</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {EXCEL_SIDE.map((item) => (
              <li
                key={item}
                className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-secondary inset-shadow-sunken md:p-4"
              >
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-2 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <Database className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">한 곳에 쌓일 때</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {SYSTEM_SIDE.map((item) => (
              <li
                key={item}
                className="rounded-card bg-surface-raised p-3 text-deck-caption font-semibold text-content-primary shadow-raised md:p-4"
              >
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        그래서 처음 정할 것도 화면이 아니라 · <Mark>무엇을 어떤 모양으로 쌓을지</Mark>입니다
      </SlideNote>
    </SlideLayout>
  )
}

const TODAY_SCOPE = [
  '직위를 고르는 첫 화면',
  '직위별로 다른 평정 항목 페이지',
  '점수를 넣으면 바로 나오는 합계',
  '제출 버튼과 제출 기록',
  '누가 냈는지 보이는 관리자 화면',
]

const LATER_SCOPE = [
  { head: '진짜 주소로 띄우기', body: '사내에서 링크를 열 수 있게 올리는 일' },
  { head: '본인 확인', body: '사번이나 사내 계정으로 들어오게 하는 일' },
  { head: '보관과 권한', body: '누가 무엇까지 볼 수 있는지를 나누는 일' },
  { head: '마감과 알림', body: '기한 안내와 미제출자 독촉' },
  { head: '엑셀 내려받기', body: '기존 집계 양식과 맞추는 일' },
]

/** H11. 이번에 만들 것과 나중에 붙일 것 */
export function ScopeSplitSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>한 번에 다 만들지 않습니다</SlideKicker>
          <SlideHeadline>오늘 손댈 자리를 먼저 잘라 둡니다</SlideHeadline>
        </div>
        <Chip tone="accent">자르지 않으면 어디서 끝인지 알 수 없습니다</Chip>
      </div>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="accentSoft" pad="lg" className="animate-rise-1 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel tone="accent">오늘 만드는 것 · 시제품</PanelLabel>
          <ul className="flex flex-col gap-3">
            {TODAY_SCOPE.map((item) => (
              <li
                key={item}
                className="rounded-card bg-surface-raised p-3 text-deck-caption font-semibold text-content-primary shadow-raised md:p-4"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-auto text-deck-caption text-content-secondary">전부 내 컴퓨터 안에서만 돕니다.</p>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-5">
          <PanelLabel>2회차 이후에 붙이는 것</PanelLabel>
          <div className="grid gap-3 md:grid-cols-2">
            {LATER_SCOPE.map((item) => (
              <div key={item.head} className="rounded-card bg-surface-sunken p-3 inset-shadow-sunken md:p-4">
                <p className="text-deck-caption font-bold text-content-strong">{item.head}</p>
                <p className="text-deck-caption text-content-secondary">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-auto text-deck-caption text-content-secondary">
            기간을 늘리는 것은 화면 개수가 아니라 대부분 이 다섯입니다.
          </p>
        </Panel>
      </div>

      <SlideNote tone="quiet">
        오늘의 끝은 하나입니다 · <Mark>세 직위로 넣어 본 합계가 손계산과 같아지는 것</Mark>
      </SlideNote>
    </SlideLayout>
  )
}
