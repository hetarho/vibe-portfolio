import { BookOpen, PenLine } from 'lucide-react'
import { CompareGrid, Mark, Panel, PanelLabel, SlideBody, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'

const AGENDA = [
  { no: '1', head: '어려웠던 이유', detail: '능력이 아니라 구조 · 4화면' },
  { no: '2', head: '이미 갖고 있는 것', detail: '세 가지 능력과 계단 · 3화면' },
  { no: '3', head: '사고방식', detail: '오늘의 뼈대 · 개념 하나와 도구 네 개 · 6화면' },
  { no: '4', head: '공부법', detail: '무엇이 공부이고 무엇이 아닌가 · 5화면' },
  { no: '5', head: '앞으로의 길', detail: '지금 배우는 것이 어디로 이어지는가 · 3화면' },
  { no: '6', head: '남는 시간 실습', detail: '배운 사고방식을 문제 하나에 · 2화면' },
  { no: '7', head: '집에서 쓰는 도구', detail: 'PPT로 복습하는 프롬프트 · 3화면' },
]

/** B1. 오늘 수업 목차 */
export function AgendaSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-4">
          <SlideKicker>자바 기초 · 1대1 · 2시간</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            오늘은 문법이 아니라
            <br />
            <Mark>생각하는 순서</Mark>를 잡습니다
          </h1>
          <SlideBody>
            진도는 수업에서 이미 나갑니다. 여기서는 그 문법을 하나로 묶는 개념과, 혼자 공부할 때 쓰는 방법을 잡습니다.
            오늘 잡아 두면 남은 과정 전체에 계속 쓰입니다.
          </SlideBody>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-3 lg:col-span-5">
          <PanelLabel>오늘의 순서</PanelLabel>
          {AGENDA.map((item, index) => (
            <div
              key={item.no}
              className={cx(
                'flex items-center gap-4 rounded-card bg-surface-sunken p-3 inset-shadow-sunken md:p-4',
                `animate-rise-${Math.min(index + 1, 5)}`,
              )}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-raised text-deck-caption font-bold text-content-primary shadow-raised md:size-10">
                {item.no}
              </span>
              <div className="flex flex-col">
                <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
                <p className="text-deck-caption text-content-secondary">{item.detail}</p>
              </div>
            </div>
          ))}
        </Panel>
      </div>

      <SlideNote tone="quiet">
        모르는 말이 나오면 <Mark>그 자리에서 바로</Mark> 멈추고 물어봐 주세요 · 넘어가면 뒤가 전부 막힙니다
      </SlideNote>
    </SlideLayout>
  )
}

/** B2. ⭐ 지금 어디까지 왔는지 확인한다 */
export function PositionSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 1 · 어려웠던 이유</SlideKicker>
      <SlideHeadline>
        지금 어디까지 왔는지 <Mark>먼저 확인</Mark>합니다
      </SlideHeadline>
      <SlideLead>코드를 배우면 두 가지 능력이 따로 자랍니다. 순서도 정해져 있습니다.</SlideLead>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-card bg-surface-sunken text-content-primary inset-shadow-sunken md:size-14">
              <BookOpen className="size-7" strokeWidth={2.2} />
            </span>
            <PanelLabel>이미 되는 것 · 알아보기</PanelLabel>
          </div>
          <p className="text-deck-lead font-bold text-content-strong">코드를 보면 무슨 뜻인지 짚을 수 있다</p>
          <p className="text-deck-body text-content-secondary">
            어디가 조건이고 어디가 반복인지 보입니다. 이 능력이 먼저 자랍니다.
          </p>
        </Panel>

        <Panel tone="sunken" pad="lg" className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-card bg-surface-raised text-content-primary shadow-raised md:size-14">
              <PenLine className="size-7" strokeWidth={2.2} />
            </span>
            <PanelLabel>다음에 될 것 · 꺼내 쓰기</PanelLabel>
          </div>
          <p className="text-deck-lead font-bold text-content-strong">빈 화면에서 내가 만들어 내기</p>
          <p className="text-deck-body text-content-secondary">
            이 능력은 계단을 밟아야 자랍니다. 계단이 없으면 시작점이 안 보입니다.
          </p>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        이 두 능력의 간격을 <Mark>재인·재생 격차</Mark>라고 부릅니다 · 이름이 붙어 있는 정상 단계입니다
      </SlideNote>
    </SlideLayout>
  )
}

const RECOGNITION = [
  { head: '들으면 아는 노래', detail: '제목도 가수도 바로 떠오른다', tag: '재인 · 알아보기' },
  { head: '부르려면 막히는 가사', detail: '음은 아는데 2절이 안 나온다', tag: '재생 · 꺼내 쓰기' },
]

const FIELD_NAMES = [
  { field: '외국어 학습', term: '수용 어휘 · 생산 어휘', detail: '읽으면 아는 단어가 말할 수 있는 단어보다 훨씬 많다' },
  { field: '학습 연구', term: '재인 · 재생', detail: '알아보는 것과 스스로 꺼내는 것을 따로 측정한다' },
]

/** B3. 이름이 붙어 있는 현상이다 */
export function NamedSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 1 · 어려웠던 이유</SlideKicker>
      <SlideHeadline>어느 분야에서든 이 두 가지를 따로 구분합니다</SlideHeadline>
      <SlideLead>
        코딩에만 있는 일이 아닙니다. 그래서 이미 이름이 붙어 있고, 넘어가는 방법도 정리되어 있습니다.
      </SlideLead>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="raised" pad="lg" className="flex flex-col gap-6 lg:col-span-4">
          <PanelLabel>누구나 겪는 쪽</PanelLabel>
          {RECOGNITION.map((item, index) => (
            <div key={item.head} className={cx('flex flex-col gap-2', `animate-rise-${index + 1}`)}>
              <p className="text-deck-meta font-semibold tracking-wider text-content-muted uppercase">{item.tag}</p>
              <p className="text-deck-lead font-bold text-content-strong">{item.head}</p>
              <p className="text-deck-body text-content-secondary">{item.detail}</p>
            </div>
          ))}
          <p className="text-deck-caption text-content-muted">
            아는 노래를 다 부를 수 있는 사람은 없습니다. 그래도 아무도 자기 기억력을 의심하지 않습니다.
          </p>
        </Panel>

        <div className="flex flex-col gap-4 lg:col-span-5">
          {FIELD_NAMES.map((item, index) => (
            <Panel
              key={item.field}
              tone="sunken"
              pad="md"
              className={cx('flex flex-col gap-2', `animate-rise-${index + 1}`)}
            >
              <PanelLabel>{item.field}</PanelLabel>
              <p className="text-deck-lead font-bold text-content-strong">{item.term}</p>
              <p className="text-deck-caption text-content-secondary">{item.detail}</p>
            </Panel>
          ))}
          <Panel tone="accentSoft" pad="md" className="flex flex-col gap-2">
            <p className="text-deck-body font-bold text-content-strong">공부법이 여기서 나옵니다</p>
            <p className="text-deck-caption text-content-secondary">
              두 능력이 따로 자란다면, 재생을 자라게 하는 것만이 공부가 됩니다. 4부에서 이 기준으로 방법을 고릅니다.
            </p>
          </Panel>
        </div>
      </div>
    </SlideLayout>
  )
}

const PIECES = [
  '변수', '자료형', '형변환', '연산자', '삼항 연산자', 'if', 'else if', 'switch',
  'for', 'while', 'do while', 'break', 'continue', '배열', 'length', '얕은 복사',
  '클래스', '필드', '접근제한자', 'static', 'final', '생성자', 'this', '메소드',
]

/** B4. ⭐ 조각은 쌓였는데 묶는 것이 없다 */
export function PiecesSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>PART 1 · 어려웠던 이유</SlideKicker>
      <SlideHeadline>
        조각은 스물네 개, <Mark>묶는 개념은 아직 없습니다</Mark>
      </SlideHeadline>
      <SlideLead>
        지금까지 배운 것을 다 적으면 이렇습니다. 하나씩 보면 다 이해가 됩니다. 그런데 문제 앞에서는 어느 것을 꺼낼지
        정해지지 않습니다.
      </SlideLead>

      <Panel tone="sunken" pad="md" className="flex flex-wrap gap-2">
        {PIECES.map((piece) => (
          <span
            key={piece}
            className="rounded-control bg-surface-raised px-3 py-2 text-deck-caption font-semibold text-content-muted shadow-raised"
          >
            {piece}
          </span>
        ))}
      </Panel>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-2">
        <Panel tone="raised" pad="lg" className="flex flex-col gap-3">
          <PanelLabel>지금 상태</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">스물네 개를 스물네 개로 외우고 있다</p>
          <p className="text-deck-body text-content-secondary">
            외울 것이 계속 늘어나기만 합니다. 진도가 빠른 게 아니라, 묶이지 않은 채로 쌓이는 것이 어렵습니다.
          </p>
        </Panel>
        <Panel tone="accentSoft" pad="lg" className="flex flex-col gap-3">
          <PanelLabel>3부에서 할 일</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">이걸 전부 개념 하나 아래로 묶습니다</p>
          <p className="text-deck-body text-content-secondary">
            묶이면 외울 것이 스물네 개에서 한 개가 됩니다. 남은 과정에서 새 문법이 나와도 같은 자리에 붙습니다.
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

/** B5. 그리고 문제는 아직 안 배운 것을 요구했다 */
export function DemandSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 1 · 어려웠던 이유</SlideKicker>
      <SlideHeadline>문제 하나가 두 가지를 동시에 요구했습니다</SlideHeadline>

      <div className="grid items-stretch gap-4 md:gap-6 lg:grid-cols-9">
        <Panel tone="sunken" pad="md" className="flex flex-col gap-3 overflow-x-auto lg:col-span-5">
          <PanelLabel>실습문제 지문의 첫 두 줄</PanelLabel>
          <p className="font-mono text-deck-caption whitespace-pre text-content-strong">
            Class Name : com.kh.practice1.func.VariablePractice1
          </p>
          <p className="font-mono text-deck-caption whitespace-pre text-content-strong">
            실행 클래스 : com.kh.practice1.run.Run
          </p>
          <div className="h-2" />
          <PanelLabel>그리고 본문</PanelLabel>
          <p className="text-deck-caption text-content-secondary">이름, 성별, 나이, 키를 입력 받아 변수에 담고 출력하세요.</p>
        </Panel>

        <div className="flex flex-col gap-4 lg:col-span-4">
          <Panel tone="raised" pad="md" className="flex flex-col gap-2">
            <p className="text-deck-caption font-bold text-content-muted">①</p>
            <p className="text-deck-lead font-bold text-content-strong">아직 안 배운 것</p>
            <p className="text-deck-body text-content-secondary">패키지 · 클래스 · 실행 클래스</p>
          </Panel>
          <Panel tone="raised" pad="md" className="flex flex-col gap-2">
            <p className="text-deck-caption font-bold text-content-muted">②</p>
            <p className="text-deck-lead font-bold text-content-strong">이미 배운 것</p>
            <p className="text-deck-body text-content-secondary">입력받기 · 변수에 담기 · 출력하기</p>
          </Panel>
        </div>
      </div>

      <SlideNote tone="quiet">
        ①은 <Mark>외우지 않고 적어 두면</Mark> 끝나는 부분입니다 · 어려웠던 것은 ②가 아니었습니다
      </SlideNote>
    </SlideLayout>
  )
}
