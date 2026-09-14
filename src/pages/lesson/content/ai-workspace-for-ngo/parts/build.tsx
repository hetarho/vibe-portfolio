import { Eye, FileSpreadsheet, FileText, ListChecks, Presentation, Table2, Users } from 'lucide-react'
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
import { PromptCopyButton } from '../../shared'
import collectPrompt from '../model/zonta-collect-prompt.md?raw'
import deckPrompt from '../model/zonta-deck-prompt.md?raw'

const OUTPUTS = [
  {
    icon: FileSpreadsheet,
    name: 'zonta-근거표.xlsx',
    body: '주장 하나마다 날짜와 출처와 확신도가 붙은 표',
    why: '발표 중에 질문이 들어와도 원문을 바로 엽니다',
  },
  {
    icon: FileText,
    name: 'zonta-조사보고.md',
    body: '국제와 한국을 나눠 정리한 요약과 질문 목록',
    why: '무엇을 아직 모르는지가 여기에 남습니다',
  },
  {
    icon: Presentation,
    name: 'zonta-오리엔테이션.pptx',
    body: '발표자 노트까지 들어간 편집 가능한 파일',
    why: '오늘 열어보고 한 장은 직접 고쳐봅니다',
  },
]

/** C19. 오늘 나갈 산출물 */
export function OutputsSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>Zonta 한 바퀴 · 남은 40분</SlideKicker>
          <SlideHeadline>이 세 파일을 만들고 마칩니다</SlideHeadline>
        </div>
        <Chip tone="accent">전부 Zonta 폴더 안에</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {OUTPUTS.map((out, index) => (
          <Panel
            key={out.name}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <out.icon className={cx('size-8 md:size-10', index === 2 ? 'text-accent' : 'text-content-muted')} />
            <p className="text-deck-body font-bold text-content-strong">{out.name}</p>
            <p className="text-deck-body text-content-secondary">{out.body}</p>
            <p className="mt-auto rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-4">
              {out.why}
            </p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        오늘 손에 쥐는 건 <Mark>초안</Mark>입니다 · 고칠 데가 보이는 파일이면 충분합니다
      </SlideNote>
    </SlideLayout>
  )
}

const COLLECT_BLANKS = [
  '일정: 10월 [ ]일 · 지역 [ ]곳',
  '청중: [지역별 참석자 · 인원]',
  '발표 시간: 지역당 [ ]분',
  '열어둔 화면: [탭 주소를 그대로]',
]

const COLLECT_RULES = ['근거 없는 주장 금지', '게시일과 사건일을 구분', '못 읽으면 멈추고 보고', '한국 상황은 질문으로']

/** C20. 자료 수집 프롬프트 */
export function CollectPromptSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>Zonta 한 바퀴 · 1 / 7</SlideKicker>
          <SlideHeadline>열어둔 화면을 읽게 시킵니다</SlideHeadline>
          <SlideBody>크롬 옆창에 붙여 넣고, 대괄호만 내 상황으로 채웁니다.</SlideBody>
          <div className="flex flex-col gap-3">
            {COLLECT_BLANKS.map((blank, index) => (
              <Panel
                key={blank}
                tone="sunken"
                pad="sm"
                className={cx('text-deck-caption font-semibold text-content-primary', `animate-rise-${index + 1}`)}
              >
                {blank}
              </Panel>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-4">
          <Panel tone="raised" pad="md" className="animate-rise-2 flex flex-col gap-3">
            <PanelLabel>프롬프트에 박아둔 규칙</PanelLabel>
            {COLLECT_RULES.map((rule) => (
              <p
                key={rule}
                className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-4"
              >
                {rule}
              </p>
            ))}
          </Panel>
          <PromptCopyButton size="md" label="자료 수집 프롬프트 복사" text={collectPrompt} />
        </div>
      </div>

      <SlideNote tone="quiet">
        “검색해줘”가 아니라 <Mark>“지금 열어둔 이 화면을 읽어라”</Mark> · 이 한 줄이 회원 자료를 여는 열쇠입니다
      </SlideNote>
    </SlideLayout>
  )
}

const WATCH = [
  { head: '계획을 먼저 보여주는가', body: '바로 읽기 시작하면 멈추고 계획부터 달라고 합니다' },
  { head: '내 탭을 진짜 읽는가', body: '열어둔 페이지 제목이 보고에 나오는지 확인합니다' },
  { head: '못 읽은 것을 말하는가', body: '조용히 넘어가면 그 자리가 나중에 틀린 문장이 됩니다' },
  { head: '물어보는가', body: '연도나 지역이 모호하면 되묻는 쪽이 정상입니다' },
]

/** C21. 일하는 동안 볼 것 */
export function WatchSlide() {
  return (
    <SlideLayout>
      <SlideKicker>Zonta 한 바퀴 · 2 / 7</SlideKicker>
      <SlideHeadline>기다리는 동안 이 네 가지를 봅니다</SlideHeadline>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-2">
        {WATCH.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex items-center gap-4', `animate-rise-${index + 1}`)}
          >
            <Eye className={cx('size-8 shrink-0 md:size-10', index === 2 ? 'text-accent' : 'text-content-muted')} />
            <div className="flex flex-col gap-1">
              <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
              <p className="text-deck-caption text-content-secondary">{item.body}</p>
            </div>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        결과만 보지 말고 <Mark>과정을 봅니다</Mark> · 어디서 추측이 섞였는지는 과정에서만 보입니다
      </SlideNote>
    </SlideLayout>
  )
}

const TABLE_HEAD = ['핵심 주장', '구분', '기준일', '출처', '쓸 장', '확신도']
const TABLE_ROWS = [
  ['새 회기의 중점 과제는 ○○이다', '사실', '2026-07-○○', 'Zonta 공식 컨벤션 페이지', '4', '높음'],
  ['한국은 회원 감소가 현안이다', '해석', '내부 자료 기준', '32지구 내부 문서', '7', '확인 필요'],
  ['지역별 참여 동기가 다른가', '질문', '-', '현장에서 물을 것', '9', '-'],
]

/** C22. 근거표로 모으기 */
export function EvidenceTableSlide() {
  return (
    <SlideLayout>
      <SlideKicker>Zonta 한 바퀴 · 3 / 7</SlideKicker>
      <SlideHeadline>PPT보다 이 표가 먼저 나와야 합니다</SlideHeadline>

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
        <Panel tone="raised" pad="md" className="animate-rise-3 flex items-center gap-4">
          <Table2 className="size-8 shrink-0 text-content-muted md:size-10" />
          <p className="text-deck-caption font-semibold text-content-primary">사실과 해석과 질문을 한 칸에서 구분합니다</p>
        </Panel>
        <Panel tone="raised" pad="md" className="animate-rise-4 flex items-center gap-4">
          <ListChecks className="size-8 shrink-0 text-content-muted md:size-10" />
          <p className="text-deck-caption font-semibold text-content-primary">확신도가 낮은 줄은 발표에서 뺍니다</p>
        </Panel>
        <Panel tone="accentSoft" pad="md" className="animate-rise-5 flex items-center gap-4">
          <FileSpreadsheet className="size-8 shrink-0 text-accent md:size-10" />
          <p className="text-deck-caption font-semibold text-content-strong">이 표가 다음 2년 동안 계속 쌓입니다</p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

const DECK_ORDER = [
  { head: '제목만 먼저 받습니다', body: '파일을 만들기 전에 열두 장의 제목 순서만 봅니다' },
  { head: '소리 내어 읽어봅니다', body: '제목만 이어 읽었을 때 이야기가 되는지가 판단 기준입니다' },
  { head: '승인한 뒤에 만들게 합니다', body: '순서가 틀린 채로 만들면 전부 다시 만들어야 합니다' },
]

/** C23. PPT 제작 프롬프트 */
export function DeckPromptSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>Zonta 한 바퀴 · 4 / 7</SlideKicker>
          <SlideHeadline>근거표를 PPT로 옮깁니다</SlideHeadline>
          <div className="flex flex-col gap-3">
            {DECK_ORDER.map((step, index) => (
              <Panel
                key={step.head}
                tone={index === 2 ? 'accentSoft' : 'raised'}
                pad="sm"
                className={cx('flex items-center gap-4', `animate-rise-${index + 1}`)}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-11">
                  {index + 1}
                </span>
                <div className="flex flex-col">
                  <p className="text-deck-body font-bold text-content-strong">{step.head}</p>
                  <p className="text-deck-caption text-content-secondary">{step.body}</p>
                </div>
              </Panel>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-4">
          <Panel tone="raised" pad="md" className="animate-rise-2 flex flex-col gap-3">
            <PanelLabel>이번에는 Cowork에서</PanelLabel>
            <p className="text-deck-body text-content-secondary">
              크롬에서 모은 내용이 같은 계정에 남아 있습니다. 데스크톱 앱으로 옮겨 폴더의 두 파일을 재료로 씁니다.
            </p>
            <p className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-4">
              근거표에 없는 주장은 슬라이드에 넣지 않게 막아두었습니다
            </p>
          </Panel>
          <PromptCopyButton size="md" label="PPT 제작 프롬프트 복사" text={deckPrompt} />
        </div>
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
  '해석을 사실처럼 쓴 자리는 없는가',
  '뒷자리에서 읽히는 크기인가',
  '청중이 답할 질문이 들어 있는가',
]

/** C24. PPT 열어서 검수 */
export function ReviewSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <Panel tone="accentSoft" pad="lg" className="animate-rise-1 flex flex-col gap-4 lg:col-span-4">
          <Presentation className="size-9 text-accent md:size-12" />
          <PanelLabel tone="accent">가장 중요한 한 걸음</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">채팅의 “완료했습니다”를 믿지 않습니다</p>
          <p className="text-deck-body text-content-secondary">
            폴더를 열어 pptx를 PowerPoint로 직접 띄웁니다. 글자가 넘치거나 표가 깨진 자리는 화면에서만 보입니다.
          </p>
        </Panel>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <SlideKicker>Zonta 한 바퀴 · 5 / 7</SlideKicker>
          <SlideHeadline>다섯 가지만 보고 저장합니다</SlideHeadline>
          <div className="flex flex-col gap-3">
            {REVIEW.map((item, index) => (
              <Panel
                key={item}
                tone="raised"
                pad="sm"
                className={cx('flex items-center gap-4', index < 5 ? `animate-rise-${index + 1}` : 'animate-rise-5')}
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
        고칠 곳을 찾으면 전체를 다시 만들지 말고 · <Mark>그 장만 지목해서</Mark> 고치게 합니다
      </SlideNote>
    </SlideLayout>
  )
}

const REGIONS = [
  { head: '그대로 두는 장', body: '국제 Zonta의 방향과 새 회기의 중점 · 어느 지역에서나 같습니다' },
  { head: '바꿔 끼우는 장', body: '지역 현황 · 회원 구성 · 그 지역에 던질 질문' },
  { head: '시간에 맞춰 빼는 장', body: '30분이면 사례를 줄이고, 60분이면 토론 시간을 넣습니다' },
]

/** C25. 지역별 버전 */
export function RegionSlide() {
  return (
    <SlideLayout>
      <SlideKicker>Zonta 한 바퀴 · 6 / 7</SlideKicker>
      <SlideHeadline>세 지역용으로 갈라 쓰는 법</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {REGIONS.map((region, index) => (
          <Panel
            key={region.head}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <Users className={cx('size-8 md:size-10', index === 1 ? 'text-accent' : 'text-content-muted')} />
            <p className="text-deck-lead font-bold text-content-strong">{region.head}</p>
            <p className="mt-auto text-deck-body text-content-secondary">{region.body}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        세 벌을 따로 만들지 않습니다 · <Mark>한 벌을 만들고 바뀌는 장만 교체</Mark>하면 고칠 때도 한 번만 고칩니다
      </SlideNote>
    </SlideLayout>
  )
}
