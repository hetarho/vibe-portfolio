import { FileSpreadsheet, ListChecks, Presentation, Table2 } from 'lucide-react'
import {
  Chip,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideNote,
} from '../../../deck'
import { TypeThis } from '../../shared'

/** D24. 타자 1 · 열어둔 화면 읽히기 */
export function CollectType1Slide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 2 · 오리엔테이션 · 1 / 4</SlideKicker>
          <SlideHeadline>이번엔 크롬 옆창에서 칩니다</SlideHeadline>
        </div>
        <Chip tone="accent">로그인해 둔 탭에서</Chip>
      </div>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-2">
        <TypeThis step={1} className="animate-rise-1" why="검색으로 비슷한 페이지를 찾아오지 말고 지금 이 화면을 보라는 뜻입니다.">
          지금 열어둔 이 화면을 읽고, 무슨 내용인지 열 줄로 정리해줘.
        </TypeThis>

        <TypeThis step={2} className="animate-rise-2" why="못 읽은 페이지를 조용히 넘어가면 나중에 틀린 문장이 됩니다.">
          다른 탭도 차례로 읽어줘. 로그인이 풀리거나 못 읽는 게 있으면 지어내지 말고 바로 알려줘.
        </TypeThis>
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-3 flex flex-col gap-2">
        <PanelLabel>기다리는 동안 볼 것</PanelLabel>
        <p className="text-deck-caption text-content-secondary">
          제가 열어둔 페이지 제목이 보고에 나오는지 봅니다. 엉뚱한 사이트 이름이 나오면 검색으로 때운 것이니
          “지금 열어둔 탭만 읽어줘”라고 다시 칩니다.
        </p>
      </Panel>

      <SlideNote tone="quiet">
        평형 신청 때와 <Mark>순서가 똑같습니다</Mark> · 짧게 시키고 · 결과 보고 · 부족한 걸 더 말해주고
      </SlideNote>
    </SlideLayout>
  )
}

const TABLE_HEAD = ['핵심 주장', '구분', '기준일', '출처', '확신도']
const TABLE_ROWS = [
  ['새 회기의 중점 과제는 ○○이다', '사실', '2026-07-○○', '공식 컨벤션 페이지', '높음'],
  ['한국은 회원 감소가 현안이다', '해석', '내부 자료 기준', '32지구 내부 문서', '확인 필요'],
  ['지역별 참여 동기가 다른가', '질문', '-', '현장에서 물을 것', '-'],
]

/** D25. 타자 2 · 근거표 */
export function EvidenceTableSlide() {
  return (
    <SlideLayout>
      <SlideKicker>실습 2 · 오리엔테이션 · 2 / 4</SlideKicker>
      <SlideHeadline>발표를 만들기 전에 표부터 만듭니다</SlideHeadline>

      <TypeThis className="animate-rise-1" why="평형 비교표와 구조가 같습니다. 주장마다 출처와 날짜를 달고, 확실하지 않은 것을 표시합니다.">
        읽은 내용을 표로 정리해줘. 주장마다 사실인지 우리 해석인지 현장에서 물을 질문인지 나누고, 출처랑 날짜도 같이.
      </TypeThis>

      <Panel tone="raised" pad="md" className="animate-rise-2 overflow-x-auto">
        <table className="w-fit min-w-full border-collapse text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="px-3 py-3 text-deck-caption font-semibold tracking-widest text-content-muted uppercase md:px-4">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((row) => (
              <tr key={row[0]} className="align-top">
                {row.map((cell, index) => (
                  <td
                    key={cell + String(index)}
                    className={cx(
                      'whitespace-pre px-3 py-3 text-deck-caption md:px-4',
                      index === 0 ? 'font-bold text-content-strong' : 'text-content-secondary',
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
        <Panel tone="raised" pad="sm" className="animate-rise-3 flex items-center gap-4">
          <Table2 className="size-7 shrink-0 text-content-muted md:size-9" />
          <p className="text-deck-caption font-semibold text-content-primary">사실과 해석과 질문을 한 칸에서 구분</p>
        </Panel>
        <Panel tone="raised" pad="sm" className="animate-rise-4 flex items-center gap-4">
          <ListChecks className="size-7 shrink-0 text-content-muted md:size-9" />
          <p className="text-deck-caption font-semibold text-content-primary">확신도가 낮은 줄은 발표에서 뺍니다</p>
        </Panel>
        <Panel tone="accentSoft" pad="sm" className="animate-rise-5 flex items-center gap-4">
          <FileSpreadsheet className="size-7 shrink-0 text-accent md:size-9" />
          <p className="text-deck-caption font-semibold text-content-strong">이 표는 앞으로 2년 동안 채워집니다</p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

/** D26. 타자 3 · 발표 파일 만들기 */
export function DeckBuildSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 2 · 오리엔테이션 · 3 / 4</SlideKicker>
          <SlideHeadline>제목부터 받고, 승인한 뒤에 만듭니다</SlideHeadline>
        </div>
        <Chip tone="accent">코워크로 옮겨서</Chip>
      </div>

      <div className="flex flex-col gap-4">
        <TypeThis step={1} className="animate-rise-1" why="파일부터 만들게 하면 순서가 틀렸을 때 전부 다시 만들어야 합니다.">
          이 표로 발표 자료를 만들 건데, 먼저 슬라이드 제목만 열두 개 순서대로 보여줘. 아직 파일은 만들지 마.
        </TypeThis>

        <Panel tone="sunken" pad="md" className="animate-rise-2 flex flex-col gap-2">
          <PanelLabel>여기서 소리 내어 읽어봅니다</PanelLabel>
          <p className="text-deck-caption text-content-secondary">
            제목만 위에서 아래로 읽었을 때 이야기가 이어지나요. 어색한 자리가 있으면 “세 번째랑 네 번째를 바꿔줘”처럼
            그 자리만 고치게 합니다.
          </p>
        </Panel>

        <TypeThis step={2} className="animate-rise-3" why="승인한 뒤에야 파일을 만들게 합니다. 표에 없는 주장이 들어가는 것도 여기서 막습니다.">
          좋아, 이 순서로 만들어줘. 표에 없는 내용은 넣지 말고, 발표자 노트도 같이. 파일 이름은 오리엔테이션으로.
        </TypeThis>
      </div>

      <SlideNote tone="quiet">
        만들기 전에 <Mark>목차부터 승인</Mark> · 이 한 단계가 다시 만드는 시간을 없앱니다
      </SlideNote>
    </SlideLayout>
  )
}

const REVIEW = [
  '제목만 읽어도 흐름이 이어지는가',
  '숫자와 핵심 주장에 출처와 날짜가 붙었는가',
  '해석을 사실처럼 쓴 데는 없는가',
  '뒷자리에서 읽히는 크기인가',
  '청중이 답할 질문이 들어 있는가',
]

/** D27. 열어서 검수 */
export function ReviewSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <Panel tone="accentSoft" pad="lg" className="animate-rise-1 flex flex-col gap-4 lg:col-span-4">
          <Presentation className="size-9 text-accent md:size-12" />
          <PanelLabel tone="accent">가장 중요한 한 걸음</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">채팅의 “완료했습니다”를 믿지 않습니다</p>
          <p className="text-deck-body text-content-secondary">
            폴더를 열어 PowerPoint로 직접 띄웁니다. 글자가 넘치거나 표가 깨진 데는 실제로 열어봐야 보입니다.
          </p>
        </Panel>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <SlideKicker>실습 2 · 오리엔테이션 · 4 / 4</SlideKicker>
          <SlideHeadline>다섯 가지만 보고 저장합니다</SlideHeadline>
          <div className="flex flex-col gap-3">
            {REVIEW.map((item, index) => (
              <Panel
                key={item}
                tone="raised"
                pad="sm"
                className={cx('flex items-center gap-4', `animate-rise-${index + 1}`)}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-11">
                  {index + 1}
                </span>
                <p className="text-deck-caption font-semibold text-content-primary">{item}</p>
              </Panel>
            ))}
          </div>
        </div>
      </div>

      <SlideNote tone="quiet">
        고칠 데를 찾으면 전체를 다시 만들지 말고 · <Mark>그 장만 지목해서</Mark> 고치게 합니다
      </SlideNote>
    </SlideLayout>
  )
}
