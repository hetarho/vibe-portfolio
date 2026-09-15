import { AppWindow, Building2, FolderKanban, Lock, MessageCircle, PanelRight, Presentation, Scale, Wrench } from 'lucide-react'
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

const TASKS = [
  {
    icon: Building2,
    head: '평형 신청',
    quote: '부산삼익비치재건축 평형신청하는걸 도움 받고 싶어요',
    tool: '코워크 + 크롬 옆창',
    out: '기한표 · 평형 비교표 · 물어볼 것 목록',
  },
  {
    icon: Presentation,
    head: '오리엔테이션 준비',
    quote: '오리엔테이션 준비도 하고싶고요',
    tool: '크롬 옆창 + 코워크',
    out: '근거표 · 발표 파일',
  },
  {
    icon: Scale,
    head: '법무상담 정리',
    quote: '법무사랑 법무상담 내용정리도 하고',
    tool: '스킬',
    out: '매번 같은 양식으로 나오는 상담 기록',
  },
]

/** D8. 오늘 할 세 가지 */
export function TaskListSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>보내주신 메시지에서 그대로 옮겼습니다</SlideKicker>
          <SlideHeadline>오늘 할 일은 셋입니다</SlideHeadline>
        </div>
        <Chip tone="accent">일마다 쓰는 도구가 다릅니다</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {TASKS.map((task, index) => (
          <Panel
            key={task.head}
            tone={index === 2 ? 'raised' : 'accentSoft'}
            pad="lg"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <task.icon className={cx('size-8 md:size-10', index === 2 ? 'text-content-muted' : 'text-accent')} />
            <p className="text-deck-lead font-bold text-content-strong">{task.head}</p>
            <p className="text-deck-caption text-content-secondary">“{task.quote}”</p>
            <p className="mt-auto text-deck-caption font-semibold text-content-primary">{task.tool}</p>
            <p className="rounded-card bg-surface-sunken p-3 text-deck-caption text-content-secondary inset-shadow-sunken md:p-4">
              → {task.out}
            </p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        세 번째는 오늘 <Mark>맛보기</Mark>까지만 · 양식을 한 번 만들어 두면 다음부터는 붙여넣기만 하면 됩니다
      </SlideNote>
    </SlideLayout>
  )
}

const BRIEF = [
  { no: '1', head: '끝나는 지점', body: '“자료 조사” 말고 “비교표와 기한표가 나오면 끝”' },
  { no: '2', head: '읽을 사람', body: '나 혼자 볼 것인지, 조합에 낼 것인지, 발표로 쓸 것인지' },
  { no: '3', head: '재료가 있는 곳', body: '열어둔 웹 화면 · 폴더에 넣어둔 문서 · 지난 파일' },
  { no: '4', head: '받을 형태', body: '엑셀 표인지, pptx인지, 문서인지를 파일 이름까지' },
  { no: '5', head: '하면 안 되는 일', body: '근거 없는 주장 금지 · 해석을 사실처럼 쓰지 않기' },
  { no: '6', head: '다 됐다는 신호', body: '내가 눈으로 확인할 항목. 이게 있어야 스스로 검사한다' },
]

/** C9. 요청을 결과로 바꾸는 여섯 칸 */
export function BriefSlide() {
  return (
    <SlideLayout>
      <SlideKicker>원하는 것을 얻는 법</SlideKicker>
      <SlideHeadline>“알아서 잘해줘”로는 안 되는 데가 여섯 군데입니다</SlideHeadline>

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

const TOOLS = [
  { icon: MessageCircle, head: '챗', body: '물어보고 생각을 정리한다', when: '읽고 판단하면 끝날 때' },
  { icon: FolderKanban, head: '프로젝트', body: '일 하나마다 만드는 작업실', when: '같은 설명을 또 하기 싫을 때' },
  { icon: PanelRight, head: '코워크', body: '내 폴더에 있는 파일을 읽고 만든다', when: '파일이 나와야 할 때' },
  { icon: Lock, head: '크롬 옆창', body: '로그인해 둔 화면을 그대로 읽는다', when: '재료가 로그인 뒤에 있을 때' },
  { icon: Wrench, head: '스킬', body: '정리 양식을 저장해 두고 꺼내 쓴다', when: '같은 일이 반복될 때' },
]

/** D9. 도구 다섯과 고르는 기준 */
export function ToolChoiceSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>영상에서 이름은 다 들으셨습니다</SlideKicker>
          <SlideHeadline>오늘 손에 익힐 도구는 다섯입니다</SlideHeadline>
        </div>
        <Chip tone="accent">일마다 하나씩 써 봅니다</Chip>
      </div>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-5">
        {TOOLS.map((tool, index) => (
          <Panel
            key={tool.head}
            tone="raised"
            pad="md"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <tool.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-lead font-bold text-content-strong">{tool.head}</p>
            <p className="text-deck-caption text-content-secondary">{tool.body}</p>
            <p className="mt-auto rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-4">
              {tool.when}
            </p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-5 flex flex-col gap-2">
        <PanelLabel>영상에 나왔지만 오늘은 미루는 셋</PanelLabel>
        <p className="text-deck-caption text-content-secondary">
          아티팩트는 웹 화면을 만드는 기능이라 오늘 산출물과 맞지 않습니다 · 커넥터는 드라이브나 캘린더를 붙일 때 씁니다 ·
          클로드 코드는 지난번에 해보신 그것이고, 오늘 할 일은 코워크 쪽이 빠릅니다
        </p>
      </Panel>
    </SlideLayout>
  )
}

const BUILT_IN = [
  '클로드 전용 브라우저가 옆 패널에 열린다',
  '내 탭 · 북마크 · 비밀번호는 못 본다',
  '공개된 페이지를 조사할 때 편하다',
]

const SIDE_PANEL = [
  '내가 지금 열어둔 그 탭에 붙는다',
  '이미 로그인해 둔 상태를 그대로 쓴다',
  '조합 사이트와 회원 페이지는 이쪽만 된다',
]

/** D11. 브라우저가 둘이라는 것 */
export function LoginWallSlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘 가장 중요한 갈림길</SlideKicker>
      <SlideHeadline>클로드가 쓰는 브라우저는 둘입니다</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <AppWindow className="size-8 text-content-muted md:size-10" />
            <PanelLabel>코워크 안에서 열리는 브라우저</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {BUILT_IN.map((item) => (
              <li
                key={item}
                className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-secondary inset-shadow-sunken md:p-4"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-auto text-deck-caption text-content-muted">
            웹이 필요한 일을 시키면 저절로 열립니다. 로그인해야 보이는 자료 앞에서 막힙니다.
          </p>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-2 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <Lock className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">크롬 옆창 · 오늘 쓸 쪽</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {SIDE_PANEL.map((item) => (
              <li key={item} className="rounded-card bg-surface-raised p-3 text-deck-caption font-semibold text-content-primary shadow-raised md:p-4">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-auto text-deck-caption text-content-secondary">
            내가 먼저 로그인해서 탭을 열어두고, 옆창에 그 화면을 읽으라고 시킵니다.
          </p>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        어느 쪽이든 비밀번호는 넘기지 않습니다 · <Mark>내가 이미 들어가 있는 탭</Mark>을 잠깐 빌려주는 것입니다
      </SlideNote>
    </SlideLayout>
  )
}
