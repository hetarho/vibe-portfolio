import { Calculator, Globe, LifeBuoy, MonitorCheck } from 'lucide-react'
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
import { TypeThis } from '../../shared'

/** H21. 첫 문장과 규칙 넘기기 */
export function FirstAskSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>만들기 · 1 / 6</SlideKicker>
          <SlideHeadline>만들 것을 한 줄로 말하고, 규칙을 붙여 줍니다</SlideHeadline>
        </div>
        <Chip tone="accent">아까 여섯 칸의 1번과 3번입니다</Chip>
      </div>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-2">
        <TypeThis step={1} className="animate-rise-1" why="먼저 무엇을 만드는지만 말합니다. 화면 모양은 아직 말하지 않습니다.">
          직원 인사평정을 입력하는 웹 화면을 만들 거야. 평정자가 직위를 고르면 그 직위의 항목만 나오고, 점수를 넣으면 합계가 바로 보이게 하고 싶어.
        </TypeThis>

        <TypeThis step={2} className="animate-rise-2" why="규칙은 지어내게 두지 않습니다. 손에 든 항목표를 그대로 붙여 넣습니다.">
          직위별 항목표를 줄게. 이대로만 쓰고 없는 항목은 만들지 마. (표 붙여넣기)
        </TypeThis>
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-3 flex flex-col gap-2">
        <PanelLabel>여기서 멈추고 같이 봅니다</PanelLabel>
        <p className="text-deck-caption text-content-secondary">
          에이전트가 되묻는 것이 있으면 좋은 신호입니다. 척도가 5점인지 100점인지, 가중치를 곱하는지 더하는지를 물어 오면
          그 자리에서 답해 주시면 됩니다.
        </p>
      </Panel>

      <SlideNote tone="quiet">
        직원 이름은 넣지 않습니다 · <Mark>“가짜 이름 스무 개로 채워줘”</Mark>라고 말하면 됩니다
      </SlideNote>
    </SlideLayout>
  )
}

/** H22. 직위를 고르면 항목이 바뀌게 */
export function RoleBranchSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>만들기 · 2 / 6</SlideKicker>
          <SlideHeadline>오늘의 핵심 동작을 먼저 세웁니다</SlideHeadline>
        </div>
        <Chip tone="accent">직위 선택 → 해당 항목 페이지</Chip>
      </div>

      <div className="grid items-stretch gap-4 md:gap-5 lg:grid-cols-3">
        <TypeThis step={1} className="animate-rise-1" why="화면을 하나만 먼저 세웁니다. 한 번에 하나씩의 원칙입니다.">
          첫 화면에 직위를 고르는 목록을 만들어줘. 고르면 다음 화면으로 넘어가게.
        </TypeThis>
        <TypeThis step={2} className="animate-rise-2" why="분기가 제대로 도는지가 오늘 가장 중요한 지점입니다.">
          직위마다 아까 준 표의 항목만 나오게 해줘. 다른 직위 항목은 보이면 안 돼.
        </TypeThis>
        <TypeThis step={3} className="animate-rise-3" why="잘 된 순간에 저장합니다. 다음 단계에서 깨지면 여기로 돌아옵니다.">
          잘 되네. 지금 상태 저장해줘.
        </TypeThis>
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-col gap-2">
        <PanelLabel>세 직위를 차례로 눌러 봅니다</PanelLabel>
        <SlideBody>
          한 직위만 되고 나머지는 빈 화면이 나오는 경우가 흔합니다. 그때는 “과장을 고르면 항목이 하나도 안 나와”라고
          본 그대로 말해 주시면 됩니다.
        </SlideBody>
      </Panel>
    </SlideLayout>
  )
}

/** H23. 점수를 넣으면 합계가 나오게 */
export function ScoringSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>만들기 · 3 / 6</SlideKicker>
          <SlideHeadline>엑셀 함수가 하던 일을 화면 안으로 옮깁니다</SlideHeadline>
        </div>
        <Chip tone="accent">여기서 집계가 사라집니다</Chip>
      </div>

      <div className="grid items-stretch gap-4 md:gap-5 lg:grid-cols-3">
        <TypeThis step={1} className="animate-rise-1" why="계산 규칙을 말로 정확히 줍니다. 가중치는 여기서 한 번에 못 박습니다.">
          점수를 넣으면 가중치를 곱해서 합계가 화면 아래에 바로 보이게 해줘.
        </TypeThis>
        <TypeThis step={2} className="animate-rise-2" why="실제 평정에서 반드시 생기는 실수를 미리 막습니다.">
          척도를 벗어난 점수는 못 넣게 막아줘. 안 채운 항목이 있으면 알려주고.
        </TypeThis>
        <TypeThis step={3} className="animate-rise-3" why="확인 기준을 사후가 아니라 사전으로 옮기는 문장입니다.">
          세 직위로 한 번씩 넣어보고 합계가 맞는지 스스로 확인한 다음에 알려줘.
        </TypeThis>
      </div>

      <div className="flex items-center gap-4">
        <Calculator className="size-8 shrink-0 text-content-muted md:size-10" />
        <p className="text-deck-caption text-content-muted">
          가중치를 곱하는 방식은 회사마다 다릅니다. 합이 100이 되게 맞추는지, 항목별 만점이 따로 있는지를 여기서 분명히
          말해 주셔야 합니다.
        </p>
      </div>

      <SlideNote tone="quiet">
        마지막 문장이 오늘 배운 것 중 · <Mark>가장 오래 쓰실 한 줄</Mark>입니다
      </SlideNote>
    </SlideLayout>
  )
}

const CHECKS = [
  { head: '주소를 열면 화면이 뜬다', body: 'localhost로 시작하는 주소를 브라우저에 칩니다' },
  { head: '직위를 바꾸면 항목이 바뀐다', body: '세 직위를 전부 눌러 봅니다' },
  { head: '합계가 손계산과 같다', body: '쉬는 시간에 적어 둔 정답과 맞춰 봅니다' },
  { head: '이상한 점수가 막힌다', body: '5점 만점에 9를 넣어 봅니다' },
]

/** H24. 떴는지 확인하기 */
export function ItRunsSlide() {
  return (
    <SlideLayout>
      <SlideKicker>만들기 · 4 / 6</SlideKicker>
      <SlideHeadline>이제 담당자님이 직접 확인할 차례입니다</SlideHeadline>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-4">
        {CHECKS.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <MonitorCheck
              className={cx('size-8 md:size-10', index === 2 ? 'text-accent' : 'text-content-muted')}
            />
            <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.body}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-5 flex items-center gap-4">
        <Globe className="size-8 shrink-0 text-content-muted md:size-10" />
        <p className="text-deck-body text-content-secondary">
          이 주소는 <Mark>담당자님 컴퓨터 안에서만</Mark> 열립니다. 아직 아무도 들어올 수 없고, 그래서 지금은 마음껏
          망가뜨려도 됩니다.
        </p>
      </Panel>
    </SlideLayout>
  )
}

/** H25. 제출과 관리자 현황 */
export function SubmitAdminSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>만들기 · 5 / 6</SlideKicker>
          <SlideHeadline>제출을 받고, 현황을 보는 화면까지</SlideHeadline>
        </div>
        <Chip tone="accent">“회신 현황 및 내용을 확인”</Chip>
      </div>

      <div className="grid items-stretch gap-4 md:gap-5 lg:grid-cols-3">
        <TypeThis step={1} className="animate-rise-1" why="제출한 내용이 어딘가에 남아야 현황도 집계도 생깁니다.">
          제출 버튼을 만들고, 누른 내용이 폴더 안 파일 하나에 쌓이게 해줘.
        </TypeThis>
        <TypeThis step={2} className="animate-rise-2" why="메일함에서 세던 일이 이 화면 하나로 바뀝니다.">
          관리자 화면을 따로 만들어서 누가 제출했고 누가 아직 안 했는지 목록으로 보여줘.
        </TypeThis>
        <TypeThis step={3} className="animate-rise-3" why="오늘의 마지막 저장점입니다.">
          여기까지 저장해줘. 오늘 만든 걸 내일 다시 열려면 뭘 하면 되는지도 알려줘.
        </TypeThis>
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-col gap-2">
        <PanelLabel>지금은 파일 하나로 충분합니다</PanelLabel>
        <SlideBody>
          제대로 된 데이터베이스는 실제로 사람들이 쓰기 시작할 때 붙입니다. 시제품 단계에서 먼저 붙이면 확인할 것만
          늘어납니다.
        </SlideBody>
      </Panel>
    </SlideLayout>
  )
}

const TROUBLE = [
  { when: '빨간 글씨가 잔뜩 나왔다', how: '전부 복사해서 그대로 붙여 넣고 “이거 고쳐줘”라고 합니다' },
  { when: '주소를 열었는데 아무것도 없다', how: '“화면이 안 떠. 지금 실행 중인지 확인해줘”라고 합니다' },
  { when: '고쳤다는데 그대로다', how: '브라우저에서 새로고침을 먼저 해 봅니다' },
  { when: '되던 것이 갑자기 깨졌다', how: '“마지막 저장점으로 되돌려줘”라고 합니다' },
  { when: '같은 자리를 계속 맴돈다', how: '멈추고 “무엇을 시도했는지 정리해줘”라고 물은 뒤 다시 시작합니다' },
]

/** H26. 트러블슈팅 치트시트 */
export function TroubleshootSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>만들기 · 6 / 6</SlideKicker>
          <SlideHeadline>막히면 이 다섯 줄로 돌아옵니다</SlideHeadline>
        </div>
        <LifeBuoy className="size-10 text-accent md:size-12" />
      </div>

      <div className="flex flex-col gap-3">
        {TROUBLE.map((item, index) => (
          <Panel
            key={item.when}
            tone={index === 4 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx(
              'flex flex-col gap-2 md:grid md:grid-cols-9 md:items-center md:gap-8',
              index < 5 ? `animate-rise-${index + 1}` : 'animate-rise-5',
            )}
          >
            <p className="text-deck-body font-bold text-content-strong md:col-span-4">{item.when}</p>
            <p className="text-deck-caption text-content-secondary md:col-span-5">{item.how}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        다섯 줄 중 넷은 <Mark>본 그대로 말하기</Mark>입니다 · 해석해서 전하려 하지 않으셔도 됩니다
      </SlideNote>
    </SlideLayout>
  )
}
