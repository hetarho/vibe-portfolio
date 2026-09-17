import {
  AlertTriangle,
  ClipboardCheck,
  Eye,
  History,
  RotateCcw,
  ScrollText,
  UserRoundCog,
  Wrench,
} from 'lucide-react'
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

const AGENT_DOES = [
  '화면을 만들고 버튼을 붙인다',
  '점수를 더하고 가중치를 곱하는 코드를 짠다',
  '에러가 나면 원인을 찾아 고친다',
  '직위가 늘어나면 같은 화면을 여러 벌 찍어낸다',
]

const HUMAN_DECIDES = [
  { head: '평정 규칙', body: '항목 · 척도 · 가중치는 회사 제도입니다. 물어보면 그럴듯하게 지어냅니다' },
  { head: '누가 무엇을 보는가', body: '평정자가 남의 점수를 볼 수 있는지는 기술이 아니라 인사 정책입니다' },
  { head: '틀렸을 때의 책임', body: '집계가 어긋났을 때 설명해야 하는 사람은 담당자님입니다' },
  { head: '어디까지가 완료인가', body: '이 말을 안 주면 스스로 적당한 선에서 끝났다고 합니다' },
]

/** H12. 에이전트가 하는 일과 사람이 정하는 일 */
export function DivisionSlide() {
  return (
    <SlideLayout>
      <SlideKicker>맡기기 전에 · 1 / 6</SlideKicker>
      <SlideHeadline>코드는 맡기고, 제도는 맡기지 않습니다</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <Wrench className="size-8 text-positive md:size-10" />
            <PanelLabel>맡겨도 되는 일</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {AGENT_DOES.map((item) => (
              <li
                key={item}
                className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-secondary inset-shadow-sunken md:p-4"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-auto text-deck-caption text-content-muted">
            이쪽은 사람보다 빠르고, 몇 번을 다시 시켜도 지치지 않습니다.
          </p>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-2 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <UserRoundCog className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">담당자님이 정해야 하는 일</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {HUMAN_DECIDES.map((item) => (
              <li key={item.head} className="rounded-card bg-surface-raised p-3 shadow-raised md:p-4">
                <p className="text-deck-caption font-bold text-content-strong">{item.head}</p>
                <p className="text-deck-caption text-content-secondary">{item.body}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        모르는 것을 물으면 멈추지 않고 <Mark>그럴듯한 답을 만들어 냅니다</Mark> · 규칙은 먼저 적어서 줍니다
      </SlideNote>
    </SlideLayout>
  )
}

const BRIEF = [
  { no: '1', head: '무엇을 만드는가', body: '직위를 고르면 그 직위 항목만 나오는 평정 입력 화면과, 제출 현황을 보는 관리자 화면' },
  { no: '2', head: '누가 쓰는가', body: '평정자는 컴퓨터가 익숙하지 않은 분도 있다 · 관리자는 나 한 사람' },
  { no: '3', head: '규칙은 내가 준다', body: '직위별 항목표 · 척도 · 가중치를 표로 붙여 넣는다' },
  { no: '4', head: '완료 조건', body: '세 직위로 한 번씩 넣어 합계가 손계산과 같으면 끝' },
  { no: '5', head: '하면 안 되는 일', body: '실제 직원 이름 · 사번 · 기존 평정 결과는 쓰지 않는다' },
  { no: '6', head: '받을 형태', body: '브라우저에서 열리는 화면 · 제출 내용은 폴더 안 파일 하나에 쌓이게' },
]

/** H13. 만들 것을 말로 적는 여섯 칸 */
export function BriefSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>맡기기 전에 · 2 / 6</SlideKicker>
          <SlideHeadline>“알아서 만들어줘”가 무너지는 자리는 여섯 군데입니다</SlideHeadline>
        </div>
        <Chip tone="accent">오늘 칠 문장이 전부 여기서 나옵니다</Chip>
      </div>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
        {BRIEF.map((item, index) => (
          <Panel
            key={item.no}
            tone={index === 4 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex flex-col gap-3', index < 5 ? `animate-rise-${index + 1}` : 'animate-rise-5')}
          >
            <span className="grid size-9 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-11">
              {item.no}
            </span>
            <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.body}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        여섯 칸을 채우는 데 10분 · 이걸 건너뛰면 <Mark>고쳐 달라고 말하는 데 두 시간</Mark>이 듭니다
      </SlideNote>
    </SlideLayout>
  )
}

const FAKE_OK = [
  '직위 이름과 평정 항목 · 척도 · 가중치',
  '점수 구간과 등급 기준',
  '화면에 들어갈 안내 문구',
]

const NEVER_IN = [
  '직원 실명과 사번 · 소속',
  '지난 평정 결과와 등급',
  '인사기록카드 · 급여 자료',
]

/** H14. 인사 데이터는 넣지 않는다 */
export function DataSafetySlide() {
  return (
    <SlideLayout>
      <SlideKicker>맡기기 전에 · 3 / 6</SlideKicker>
      <SlideHeadline>만드는 동안에는 가짜 데이터로 충분합니다</SlideHeadline>
      <SlideBody>
        평정지는 인사기록이고 개인정보입니다. 화면이 제대로 도는지 확인하는 데에는 “홍길동1 · 82점” 스무 줄이면 됩니다.
        진짜 데이터는 완성된 시스템이 회사 안에 들어간 다음에 만납니다.
      </SlideBody>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <ClipboardCheck className="size-8 text-positive md:size-10" />
            <PanelLabel>넣어도 되는 것 · 양식</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {FAKE_OK.map((item) => (
              <li
                key={item}
                className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-secondary inset-shadow-sunken md:p-4"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-auto text-deck-caption text-content-muted">사람이 아니라 제도의 모양입니다.</p>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-2 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <AlertTriangle className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">오늘 넣지 않는 것 · 사람</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {NEVER_IN.map((item) => (
              <li
                key={item}
                className="rounded-card bg-surface-raised p-3 text-deck-caption font-semibold text-content-primary shadow-raised md:p-4"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-auto text-deck-caption text-content-secondary">
            회사에 따라 반출 자체가 규정 위반입니다. 확인 전에는 양식만 씁니다.
          </p>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        가짜 데이터로 만들어도 <Mark>진짜 데이터에서 똑같이 돕니다</Mark> · 바뀌는 것은 내용뿐입니다
      </SlideNote>
    </SlideLayout>
  )
}

const UNDO = [
  { icon: History, head: '빈 폴더에서 시작한다', body: '바탕화면에 새 폴더를 만들고 거기서만 일을 시킵니다. 공용 드라이브나 문서 폴더 안에서 열지 않습니다' },
  { icon: RotateCcw, head: '저장점을 만들어 둔다', body: '시작할 때와 잘 된 순간마다 한 줄이면 됩니다. 망가지면 그 지점으로 되돌립니다' },
  { icon: Eye, head: '지우는 일은 물어보게 한다', body: '파일을 지우거나 덮어쓰기 전에 확인을 받게 합니다. 승인 버튼이 있는 이유입니다' },
]

/** H15. 되돌릴 수 있게 해 두기 */
export function UndoSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>맡기기 전에 · 4 / 6</SlideKicker>
          <SlideHeadline>에이전트는 파일을 실제로 고치고 지웁니다</SlideHeadline>
        </div>
        <Chip tone="accent">되돌릴 준비가 먼저입니다</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {UNDO.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <item.icon className={cx('size-8 md:size-10', index === 0 ? 'text-accent' : 'text-content-muted')} />
            <p className="text-deck-lead font-bold text-content-strong">{item.head}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.body}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-col gap-2">
        <PanelLabel>실습 때 같이 칩니다</PanelLabel>
        <p className="text-deck-caption text-content-secondary">
          저장점을 만드는 일도 에이전트에게 시키면 됩니다. “지금 상태를 저장해줘”라고 말하면 그다음은 알아서 합니다.
        </p>
      </Panel>

      <SlideNote tone="quiet">
        되돌릴 수 있으면 <Mark>과감하게 시켜볼 수 있습니다</Mark> · 이것이 속도를 만드는 진짜 장치입니다
      </SlideNote>
    </SlideLayout>
  )
}

const VERIFY = [
  { no: '1', head: '화면이 실제로 뜨는가', body: '브라우저에서 열어 눈으로 봅니다. “만들었습니다”는 떴다는 뜻이 아닙니다' },
  { no: '2', head: '직위를 바꾸면 항목이 바뀌는가', body: '세 직위를 차례로 골라 봅니다. 한 직위만 되는 경우가 흔합니다' },
  { no: '3', head: '합계가 손계산과 같은가', body: '계산기로 한 장을 직접 더해 맞춰 봅니다. 여기서 가중치 실수가 잡힙니다' },
  { no: '4', head: '이상한 값을 막는가', body: '5점 만점에 9를 넣어 봅니다. 그대로 들어가면 실제 평정에서도 들어갑니다' },
]

/** H16. 다 됐다는 말을 확인하는 법 */
export function VerifySlide() {
  return (
    <SlideLayout>
      <SlideKicker>맡기기 전에 · 5 / 6</SlideKicker>
      <SlideHeadline>“다 됐습니다”는 보고이지 확인이 아닙니다</SlideHeadline>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-4">
        {VERIFY.map((item, index) => (
          <Panel
            key={item.no}
            tone={index === 2 ? 'accentSoft' : 'raised'}
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
        <PanelLabel>순서를 바꾸면 더 빨라집니다</PanelLabel>
        <p className="text-deck-caption text-content-secondary">
          이 네 가지를 만들기 전에 미리 적어서 주면, 에이전트가 스스로 검사한 다음에 보고합니다. 사후 점검이 사전 기준으로
          바뀌는 것입니다.
        </p>
      </Panel>
    </SlideLayout>
  )
}

const STUCK = [
  { head: '빨간 글씨는 통째로 붙여 넣는다', body: '요약하거나 “안 돼요”라고만 하면 엉뚱한 데를 고칩니다. 화면에 뜬 글자를 그대로 복사해 줍니다' },
  { head: '같은 자리를 세 번 돌면 멈춘다', body: '“지금까지 무엇을 시도했고 무엇이 남았는지 정리해줘”라고 물은 뒤, 마지막 저장점으로 되돌립니다' },
  { head: '한 번에 하나씩만 시킨다', body: '세 가지를 한꺼번에 시키면 어느 것 때문에 깨졌는지 알 수 없습니다. 되면 저장하고 다음으로 갑니다' },
]

/** H17. 막혔을 때 세 가지 규칙 */
export function StuckSlide() {
  return (
    <SlideLayout>
      <SlideKicker>맡기기 전에 · 6 / 6</SlideKicker>
      <SlideHeadline>막히는 것은 사고가 아니라 과정입니다</SlideHeadline>

      <div className="flex flex-col gap-4 md:gap-5">
        {STUCK.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-3 md:grid md:grid-cols-9 md:items-center md:gap-8',
              `animate-rise-${index + 1}`,
            )}
          >
            <p className="text-deck-lead font-bold text-content-strong md:col-span-3">{item.head}</p>
            <p className="text-deck-caption text-content-secondary md:col-span-6">{item.body}</p>
          </Panel>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <ScrollText className="size-8 shrink-0 text-content-muted md:size-10" />
        <p className="text-deck-caption text-content-muted">
          오늘 실습에서도 한두 번은 막힙니다. 막히는 자리에서 어떻게 빠져나오는지가 사실 오늘 배우는 것의 절반입니다.
        </p>
      </div>

      <SlideNote tone="quiet">
        고치라고 말하기 전에 · <Mark>무엇이 어떻게 잘못 나왔는지</Mark>부터 한 줄로 말합니다
      </SlideNote>
    </SlideLayout>
  )
}
