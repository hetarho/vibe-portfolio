import { Camera, FolderInput, Lock, ScrollText, Table2, UserCheck } from 'lucide-react'
import {
  Chip,
  CompareGrid,
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

const MACHINE_PART = [
  '여기저기 흩어진 기한과 서류를 한 장에 모으기',
  '평형마다 분담금을 같은 기준으로 나란히',
  '1+1 · 임대 · 현금청산처럼 놓치기 쉬운 선택지 확인',
  '조합과 법무사에 물어볼 것 추리기',
]

const HUMAN_PART = [
  '얼마까지 낼 수 있는지',
  '들어가 살 것인지 세를 줄 것인지',
  '얼마나 오래 들고 갈 것인지',
]

/** D16. 무엇을 맡기고 무엇을 내가 정하나 */
export function ApartmentScopeSlide() {
  return (
    <SlideLayout>
      <SlideKicker>실습 1 · 평형 신청 · 1 / 5</SlideKicker>
      <SlideHeadline>고르는 일은 맡기지 않습니다</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Table2 className="size-8 text-content-muted md:size-10" />
            <PanelLabel>맡기는 일 · 모으고 나란히 놓기</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {MACHINE_PART.map((item) => (
              <li
                key={item}
                className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-secondary inset-shadow-sunken md:p-4"
              >
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-2 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <UserCheck className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">내가 정하는 일</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {HUMAN_PART.map((item) => (
              <li key={item} className="rounded-card bg-surface-raised p-3 text-deck-body font-bold text-content-strong shadow-raised md:p-4">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-auto text-deck-caption text-content-secondary">
            숫자로 답이 나오지 않는 것들입니다. 이 셋이 정해져야 선택지가 걸러집니다.
          </p>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        프롬프트에 <Mark>“어느 평형이 유리한지 말하지 마라”</Mark>를 넣어 두었습니다 · 돈이 걸린 판단은 넘기지 않습니다
      </SlideNote>
    </SlideLayout>
  )
}

const INTAKE = [
  {
    icon: FolderInput,
    head: 'PDF나 사진으로 있다면',
    body: '재건축 폴더에 전부 넣고 코워크에게 읽어달라고 합니다',
  },
  {
    icon: Lock,
    head: '조합 사이트에 있다면',
    body: '로그인해서 탭을 열어두고 크롬 옆창에 그 화면을 읽어달라고 합니다',
  },
  {
    icon: Camera,
    head: '종이로만 있다면',
    body: '폰으로 찍어 폴더에 넣습니다. 표는 한 장에 한 면씩, 글자가 읽히게',
  },
]

/** D17. 자료 넣기 */
export function ApartmentIntakeSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 1 · 평형 신청 · 2 / 5</SlideKicker>
          <SlideHeadline>가지고 오신 형태대로 넣으면 됩니다</SlideHeadline>
        </div>
        <Chip tone="accent">셋 다 됩니다</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {INTAKE.map((way, index) => (
          <Panel
            key={way.head}
            tone="raised"
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <way.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-body font-bold text-content-strong">{way.head}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{way.body}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-4 flex flex-wrap items-center gap-4 md:gap-6">
        <ScrollText className="size-8 text-content-muted md:size-10" />
        <p className="text-deck-body text-content-secondary">
          자료를 넣은 뒤 첫 확인 · <Mark>“받은 자료 목록과 각각의 발행일을 보여줘”</Mark>
        </p>
      </Panel>
    </SlideLayout>
  )
}

/** D21. 타자 1 · 폴더를 읽히고 기한부터 */
export function ApartmentType1Slide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 1 · 평형 신청 · 3 / 5</SlideKicker>
          <SlideHeadline>급한 것부터 꺼냅니다</SlideHeadline>
        </div>
        <Chip tone="accent">코워크에서</Chip>
      </div>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-2">
        <TypeThis step={1} className="animate-rise-1" why="먼저 무엇이 들어왔는지 확인합니다. 못 읽은 파일이 여기서 드러납니다.">
          이 폴더에 뭐가 있는지 목록으로 보여줘. 각각 언제 나온 자료인지도 같이.
        </TypeThis>

        <TypeThis step={2} className="animate-rise-2" why="가장 급한 것부터 꺼냅니다. 기한을 놓치면 나머지는 의미가 없습니다.">
          공고문에서 신청 기한이랑 내야 할 서류만 뽑아서 표로 만들어줘. 공고문 몇 페이지에서 가져왔는지도 같이 적어줘.
        </TypeThis>
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-3 flex flex-col gap-2">
        <PanelLabel>여기서 멈추고 같이 봅니다</PanelLabel>
        <p className="text-deck-caption text-content-secondary">
          표에 페이지 번호가 붙어 있나요. 없으면 “어느 페이지에서 가져왔는지 적어줘”라고 한 번 더 치시면 됩니다.
          지어낸 숫자는 페이지를 못 답니다.
        </p>
      </Panel>

      <SlideNote tone="quiet">
        나온 기한은 오늘 <Mark>달력에 옮겨 적는 것</Mark>까지 하고 넘어갑니다
      </SlideNote>
    </SlideLayout>
  )
}

/** D22. 타자 2 · 평형 비교표 */
export function ApartmentType2Slide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 1 · 평형 신청 · 4 / 5</SlideKicker>
          <SlideHeadline>숫자를 나란히 놓습니다</SlideHeadline>
        </div>
        <Chip tone="accent">세 번 나눠 칩니다</Chip>
      </div>

      <div className="flex flex-col gap-4">
        <TypeThis step={3} className="animate-rise-1" why="한 번에 완벽한 표를 요구하지 않습니다. 먼저 뼈대만 받습니다.">
          평형별로 분담금이 얼마인지 표로 만들어줘. 숫자마다 어느 자료 몇 페이지인지 같이.
        </TypeThis>

        <TypeThis step={4} className="animate-rise-2" why="이 한 줄이 오늘 가장 중요합니다. 추산액을 확정액으로 읽으면 자금 계획이 통째로 틀어집니다.">
          그중에 확정된 금액이랑 아직 추산인 금액을 구분해서 표시해줘.
        </TypeThis>

        <TypeThis step={5} className="animate-rise-3" why="자료에 있는데 모르고 지나가는 선택지를 막습니다.">
          공고문에 1+1이나 임대, 현금청산 같은 선택지가 있으면 조건이랑 같이 알려줘. 없으면 없다고 해줘.
        </TypeThis>
      </div>

      <SlideNote tone="quiet">
        자료에 없는 칸은 <Mark>빈칸으로 두라고</Mark> 하십니다 · 채워져 있으면 어디서 왔는지 물어보세요
      </SlideNote>
    </SlideLayout>
  )
}

const CHECKS = [
  { head: '숫자에 출처가 붙었나', body: '어느 자료 몇 페이지인지 없으면 그 줄은 쓰지 않습니다' },
  { head: '추산과 확정이 갈렸나', body: '추산액을 확정액처럼 읽으면 계획이 통째로 틀어집니다' },
  { head: '빈칸이 빈칸으로 남았나', body: '자료에 없던 숫자가 채워져 있으면 어디서 왔는지 물어봅니다' },
  { head: '결론을 내려 하지 않았나', body: '“이 평형이 유리합니다” 같은 문장이 있으면 지웁니다' },
]

/** D23. 타자 3 · 물어볼 것 추리고 확인 */
export function ApartmentType3Slide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 1 · 평형 신청 · 5 / 5</SlideKicker>
          <SlideHeadline>물어볼 것을 추리고 저장합니다</SlideHeadline>
        </div>
        <Chip tone="accent">세 번째 실습에서 씁니다</Chip>
      </div>

      <div className="grid items-stretch gap-6 md:gap-8 lg:grid-cols-9">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <TypeThis step={6} className="animate-rise-1" why="법무사에게 물을 것과 조합에 물을 것이 다릅니다.">
            내가 조합에 물어볼 것이랑 법무사한테 물어볼 것을 나눠서 정리해줘.
          </TypeThis>
          <TypeThis step={7} className="animate-rise-2" why="파일로 남겨야 다음에 이어서 씁니다.">
            지금까지 만든 걸 엑셀 파일로 저장해줘. 이름은 평형정리로.
          </TypeThis>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-5">
          <PanelLabel>저장 전에 네 가지만 봅니다</PanelLabel>
          {CHECKS.map((item, index) => (
            <Panel
              key={item.head}
              tone={index === 3 ? 'accentSoft' : 'raised'}
              pad="sm"
              className={cx('flex items-center gap-4', `animate-rise-${index + 1}`)}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-11">
                {index + 1}
              </span>
              <div className="flex flex-col">
                <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
                <p className="text-deck-caption text-content-secondary">{item.body}</p>
              </div>
            </Panel>
          ))}
        </div>
      </div>

      <SlideNote tone="quiet">
        마지막 “물어볼 것” 목록은 버리지 마세요 · <Mark>세 번째 실습에서 그대로 씁니다</Mark>
      </SlideNote>
    </SlideLayout>
  )
}
