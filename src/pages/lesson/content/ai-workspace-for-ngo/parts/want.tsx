import {
  FolderKanban,
  KeyRound,
  Languages,
  Lock,
  MessageCircle,
  Palette,
  PanelRight,
  Plug,
  Presentation,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react'
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

const WISHES = [
  {
    icon: Presentation,
    head: '10월 오리엔테이션 자료',
    quote: '내용수집하고 ppt 작성하는게 급합니다',
    when: '지금 급한 것',
  },
  { icon: Users, head: 'Zonta 운영', quote: '1 존타', when: '앞으로 2년' },
  { icon: Languages, head: '영어 공부', quote: '2 영어공부', when: '앞으로 2년' },
  { icon: TrendingUp, head: '투자', quote: '3 투자', when: '앞으로 2년' },
  { icon: Palette, head: '전시기획 비즈니스', quote: '4 전시기획과 관련한 비지니스', when: '앞으로 2년' },
]

/** C8. 원하는 것 다섯 가지 */
export function WishlistSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>보내주신 메시지에서 그대로 옮겼습니다</SlideKicker>
          <SlideHeadline>급한 것 하나, 길게 갈 것 넷</SlideHeadline>
        </div>
        <Chip tone="accent">오늘은 맨 위 하나</Chip>
      </div>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-5">
        {WISHES.map((wish, index) => (
          <Panel
            key={wish.head}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <wish.icon className={cx('size-8 md:size-10', index === 0 ? 'text-accent' : 'text-content-muted')} />
            <p className="text-deck-body font-bold text-content-strong">{wish.head}</p>
            <p className="text-deck-caption text-content-secondary">“{wish.quote}”</p>
            <p className="mt-auto text-deck-caption font-semibold text-content-muted">{wish.when}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        넷을 한꺼번에 짓지 않습니다 · <Mark>급한 하나를 끝까지 해보면</Mark> 나머지는 같은 방법의 반복입니다
      </SlideNote>
    </SlideLayout>
  )
}

const BRIEF = [
  { no: '1', head: '무엇이 끝인가', body: '“Zonta 자료 조사” 말고 “근거표와 12장 PPT가 나오면 끝”' },
  { no: '2', head: '누가 듣는가', body: '지역 · 인원 · Zonta를 얼마나 아는 분들인지' },
  { no: '3', head: '재료는 어디에', body: '열어둔 웹 화면 · 내 폴더의 내부 문서 · 지난 발표 파일' },
  { no: '4', head: '어떤 모양으로', body: '엑셀 표인지, pptx인지, 문서인지를 파일 이름까지' },
  { no: '5', head: '하면 안 되는 것', body: '근거 없는 주장 금지 · 해석을 사실처럼 쓰지 않기' },
  { no: '6', head: '무엇을 보면 되는가', body: '내가 눈으로 확인할 항목. 이게 있어야 스스로 검사한다' },
]

/** C9. 요청을 결과로 바꾸는 여섯 칸 */
export function BriefSlide() {
  return (
    <SlideLayout>
      <SlideKicker>원하는 것을 얻는 법</SlideKicker>
      <SlideHeadline>“알아서 잘해줘”가 안 되는 자리는 여섯 칸입니다</SlideHeadline>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
        {BRIEF.map((item, index) => (
          <Panel
            key={item.no}
            tone={index === 5 ? 'accentSoft' : 'raised'}
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
        오늘 쓸 프롬프트도 전부 이 여섯 칸입니다 · 빈칸만 <Mark>내 상황으로 채우면</Mark> 됩니다
      </SlideNote>
    </SlideLayout>
  )
}

const TODAY_THREE = [
  { icon: MessageCircle, head: '챗', body: '묻고 정리하는 자리. 영상의 엑셀 분석이 이 칸입니다' },
  { icon: FolderKanban, head: '프로젝트', body: '같은 설명을 반복하지 않으려고 만드는 작업실' },
  { icon: PanelRight, head: '코워크', body: '지난번 클로드 코드와 같은 일을 합니다. 검은 창 대신 채팅으로' },
]

const LATER_FOUR = [
  { icon: Sparkles, head: '아티팩트', why: '웹 화면을 만드는 기능입니다. 발표는 pptx 파일로 받습니다' },
  { icon: Terminal, head: '클로드 코드', why: '지난번에 같이 해봤습니다. 오늘은 같은 일을 더 쉬운 쪽에서 합니다' },
  { icon: Wrench, head: '스킬', why: '같은 일이 세 번 반복된 뒤에 만듭니다. 아직 한 번도 안 했습니다' },
  { icon: Plug, head: '커넥터 · MCP', why: '드라이브나 캘린더를 붙일 때. Zonta가 끝난 다음입니다' },
]

/** C10. 영상에서 본 일곱 가지 */
export function VideoRecapSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>보고 오신 영상에 나온 것들</SlideKicker>
          <SlideHeadline>지난번에 해보신 것보다 쉬운 길로 갑니다</SlideHeadline>
        </div>
        <Chip tone="accent">터미널은 안 씁니다</Chip>
      </div>

      <div className="flex flex-col gap-3">
        <PanelLabel tone="accent">오늘 씁니다</PanelLabel>
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          {TODAY_THREE.map((tool, index) => (
            <Panel
              key={tool.head}
              tone="accentSoft"
              pad="lg"
              className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
            >
              <tool.icon className="size-8 text-accent md:size-10" />
              <p className="text-deck-lead font-bold text-content-strong">{tool.head}</p>
              <p className="mt-auto text-deck-caption text-content-secondary">{tool.body}</p>
            </Panel>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <PanelLabel>오늘은 미룹니다</PanelLabel>
        <div className="grid gap-3 md:gap-4 lg:grid-cols-4">
          {LATER_FOUR.map((tool, index) => (
            <Panel
              key={tool.head}
              tone="sunken"
              pad="sm"
              className={cx('flex flex-col gap-2', `animate-rise-${index + 1}`)}
            >
              <div className="flex items-center gap-3">
                <tool.icon className="size-6 shrink-0 text-content-muted md:size-8" />
                <p className="text-deck-caption font-bold text-content-primary">{tool.head}</p>
              </div>
              <p className="text-deck-caption text-content-muted">{tool.why}</p>
            </Panel>
          ))}
        </div>
      </div>

      <SlideNote tone="quiet">
        오늘 진짜 새로 얻으시는 건 하나입니다 · <Mark>로그인 뒤에 있는 자료를 읽는 크롬 옆창</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const TOOLS = [
  {
    icon: MessageCircle,
    head: '채팅',
    where: 'claude.ai · 데스크톱 앱의 Chat 탭',
    use: '생각을 정리하고 물어볼 때',
    out: '결과는 채팅창 속의 글',
    pick: '내가 읽고 판단하면 끝나는 일',
  },
  {
    icon: PanelRight,
    head: 'Cowork',
    where: '데스크톱 앱의 Cowork 탭',
    use: '내 컴퓨터의 파일을 읽고 만들 때',
    out: '결과는 폴더에 남는 파일',
    pick: '표 · 문서 · PPT가 나와야 하는 일',
  },
  {
    icon: Lock,
    head: '크롬 옆창',
    where: '크롬 확장 · 사이드패널',
    use: '로그인해 둔 웹 화면을 읽을 때',
    out: '결과는 파일 + 웹에서의 조작',
    pick: '재료가 로그인 뒤에 있는 일',
  },
]

/** C11. 세 가지 도구와 고르는 기준 */
export function ToolChoiceSlide() {
  return (
    <SlideLayout>
      <SlideKicker>원하는 것을 얻는 법</SlideKicker>
      <SlideHeadline>도구는 셋뿐입니다. 결과물의 모양으로 고릅니다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {TOOLS.map((tool, index) => (
          <Panel
            key={tool.head}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <tool.icon className={cx('size-8 md:size-10', index === 2 ? 'text-accent' : 'text-content-muted')} />
            <p className="text-deck-lead font-bold text-content-strong">{tool.head}</p>
            <p className="text-deck-caption text-content-muted">{tool.where}</p>
            <p className="text-deck-body text-content-secondary">{tool.use}</p>
            <p className="text-deck-caption font-semibold text-content-primary">{tool.out}</p>
            <p className="mt-auto rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-4">
              고르는 기준 · {tool.pick}
            </p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        셋은 한 계정에서 <Mark>같은 대화를 이어받습니다</Mark> · 크롬에서 시작해 데스크톱에서 마무리해도 됩니다
      </SlideNote>
    </SlideLayout>
  )
}

const WRONG = [
  '회원 전용 자료는 검색으로 안 읽힙니다',
  'AI에게 아이디와 비밀번호를 넘기면 안 됩니다',
  '화면을 캡처해서 올리면 글자가 깨지고 출처가 안 남습니다',
]

const RIGHT = [
  { no: '1', body: '내가 크롬에서 먼저 로그인합니다' },
  { no: '2', body: '읽힐 페이지를 탭으로 열어둡니다' },
  { no: '3', body: '옆창을 열고 “열어둔 화면을 읽어라”라고 시킵니다' },
]

/** C12. 로그인이 필요한 자료 */
export function LoginWallSlide() {
  return (
    <SlideLayout>
      <SlideKicker>원하는 것을 얻는 법</SlideKicker>
      <SlideHeadline>로그인 뒤에 있는 자료도 읽힙니다</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <KeyRound className="size-8 text-content-muted md:size-10" />
            <PanelLabel>막히는 자리</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {WRONG.map((item) => (
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
            <Lock className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">푸는 방법</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {RIGHT.map((step) => (
              <li
                key={step.no}
                className="flex items-center gap-4 rounded-card bg-surface-raised p-3 shadow-raised md:p-4"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-11">
                  {step.no}
                </span>
                <span className="text-deck-caption font-semibold text-content-primary">{step.body}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        비밀번호는 넘기지 않습니다 · <Mark>내가 이미 들어가 있는 탭</Mark>을 그대로 빌려주는 방식입니다
      </SlideNote>
    </SlideLayout>
  )
}
