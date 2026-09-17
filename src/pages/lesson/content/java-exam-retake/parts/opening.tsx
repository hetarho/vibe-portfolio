import { ArrowRight, Brain, ListChecks, PencilLine, Star, Target } from 'lucide-react'
import {
  Chip,
  Mark,
  Panel,
  PanelLabel,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideLead,
  SlideNote,
} from '../../../deck'
import { CHEAT_SHEET, QUIZ_PROBLEMS } from '../model/problems'

/** R1. 왜 50문제인지, 순서가 무엇을 뜻하는지 */
export function OpeningSlide() {
  return (
    <SlideLayout>
      <SlideKicker>재시험 대비 · 예상문제 {QUIZ_PROBLEMS.length}개</SlideKicker>
      <SlideHeadline size="hero">외울 것만 정확히 외우고 들어갑니다</SlideHeadline>
      <SlideLead>
        문제는 다 바뀌지만 출제 범위는 그대로입니다. 그 범위 안에서 {QUIZ_PROBLEMS.length}개를 뽑았고, 앞에 있을수록
        중요한 개념입니다.
      </SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <Panel tone="accent" pad="lg" className="flex flex-col gap-3">
          <PanelLabel tone="inverse">1번 ~ 10번</PanelLabel>
          <p className="text-deck-lead font-bold">이 범위의 뼈대가 되는 개념</p>
          <p className="text-deck-caption font-semibold opacity-80">
            문제가 어떤 형태로 바뀌어 나와도 결국 여기서 나옵니다. 배점도 가장 큽니다.
          </p>
        </Panel>
        <Panel tone="raised" pad="lg" className="flex flex-col gap-3">
          <PanelLabel tone="accent">11번 ~ 30번</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">같은 단원의 짝꿍 문제</p>
          <p className="text-deck-caption font-semibold text-content-secondary">
            오버라이딩이 나왔으면 오버로딩이, 추상화가 나왔으면 캡슐화가 따라옵니다.
          </p>
        </Panel>
        <Panel tone="raised" pad="lg" className="flex flex-col gap-3">
          <PanelLabel tone="accent">31번 ~ 50번</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">범위 안 나머지와 결과 예측</p>
          <p className="text-deck-caption font-semibold text-content-secondary">
            시간이 없으면 여기는 외울 문장만 읽고 넘어가도 됩니다.
          </p>
        </Panel>
      </div>

      <SlideNote tone="quiet">
        시간이 모자라면 <Mark>앞에서부터</Mark> 하세요. 뒤로 갈수록 배점이 작고 곁가지입니다
      </SlideNote>
    </SlideLayout>
  )
}

/** R2. 화면 두 장이 한 세트라는 것과 조작법 */
export function HowToUseSlide() {
  return (
    <SlideLayout>
      <SlideKicker>사용법 · 두 화면이 한 세트</SlideKicker>
      <SlideHeadline>문제 화면에서 먼저 쓰고, 다음 화면에서 채점합니다</SlideHeadline>
      <SlideLead>눈으로만 읽으면 시험장에서 한 글자도 안 나옵니다. 짧아도 손으로 쓰고 넘어가세요.</SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <Panel tone="raised" pad="lg" className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <PencilLine className="size-7 shrink-0 text-accent md:size-9" />
            <PanelLabel tone="accent">앞 화면 · 문제</PanelLabel>
          </div>
          <p className="text-deck-body font-bold text-content-strong">오른쪽 칸에 아는 만큼 답을 씁니다</p>
          <p className="text-deck-caption font-semibold text-content-secondary">
            막히면 힌트를 한 개씩 엽니다. 힌트를 다 열고 써도 괜찮습니다. 쓴 내용은 자동으로 저장됩니다.
          </p>
        </Panel>

        <Panel tone="raised" pad="lg" className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <ListChecks className="size-7 shrink-0 text-accent md:size-9" />
            <PanelLabel tone="accent">뒤 화면 · 풀이</PanelLabel>
          </div>
          <p className="text-deck-body font-bold text-content-strong">모범 답안 옆에 내 답이 나란히 뜹니다</p>
          <p className="text-deck-caption font-semibold text-content-secondary">
            채점 키워드를 눌러 내 답에 들어간 것만 체크하고, 맞혔다 · 애매하다 · 못 썼다 중 하나를 고릅니다.
          </p>
        </Panel>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <Chip tone="accent">→ 다음 화면</Chip>
        <Chip>← 이전 화면</Chip>
        <Chip>O 전체 목록</Chip>
        <Chip>Q 1번 문제</Chip>
        <Chip>F 전체화면</Chip>
        <Chip>C 외울 문장</Chip>
        <Chip>R 마지막 정리</Chip>
      </div>

      <SlideNote tone="quiet">
        답을 쓰는 칸에 글자를 치는 동안에는 <Mark>화살표를 눌러도 화면이 넘어가지 않습니다</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

/** R3. 서술형에서 점수를 받는 문장 형태 */
export function WritingRuleSlide() {
  return (
    <SlideLayout>
      <SlideKicker>서술형 · 점수를 받는 문장</SlideKicker>
      <SlideHeadline>길게 쓰지 말고, 칸을 나눠서 쓰세요</SlideHeadline>
      <SlideLead>채점은 문장이 아니라 단어를 셉니다. 아는 단어를 몇 개 넣었는지가 점수입니다.</SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <Panel tone="raised" pad="lg" className="flex flex-col gap-3">
          <PanelLabel tone="accent">1 · 첫 줄은 정의</PanelLabel>
          <p className="text-deck-body font-bold text-content-strong">"~는 ~하는 것이다"</p>
          <p className="text-deck-caption font-semibold text-content-secondary">
            문제가 묻는 단어를 그대로 주어로 놓고 한 문장으로 끝냅니다.
          </p>
        </Panel>
        <Panel tone="accentSoft" pad="lg" className="flex flex-col gap-3">
          <PanelLabel tone="accent">2 · 조건은 번호로</PanelLabel>
          <p className="text-deck-body font-bold text-content-strong">1) 2) 3) 으로 줄을 바꿔서</p>
          <p className="text-deck-caption font-semibold text-content-secondary">
            줄글로 이어 쓰면 채점자가 못 찾습니다. 한 줄에 하나씩 끊습니다.
          </p>
        </Panel>
        <Panel tone="raised" pad="lg" className="flex flex-col gap-3">
          <PanelLabel tone="accent">3 · 영어 용어는 그대로</PanelLabel>
          <p className="text-deck-body font-bold text-content-strong">오버라이딩, extends, private</p>
          <p className="text-deck-caption font-semibold text-content-secondary">
            한글로 풀어 쓰는 것보다 용어를 그대로 쓰는 쪽이 점수가 붙습니다.
          </p>
        </Panel>
      </div>

      <Panel tone="sunken" pad="md" className="flex flex-col gap-2">
        <PanelLabel>문제가 개수를 알려 주면 그게 답안 줄 수입니다</PanelLabel>
        <p className="text-deck-body font-semibold text-content-primary">
          "3가지를 서술하시오" → 세 줄. "모두 서술하시오" → 아는 것을 전부 번호 붙여서. "각각" → 덩어리를 나눠서.
        </p>
      </Panel>

      <SlideNote tone="quiet">
        모르는 문제도 <Mark>빈칸으로 두지 않습니다</Mark>. 관련 단어 하나라도 쓰면 부분 점수가 나옵니다
      </SlideNote>
    </SlideLayout>
  )
}

/** R4. 시험장 들어가기 직전에 읽을 열 줄 */
export function CheatSheetSlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
        <SlideKicker>무조건 외울 열 줄</SlideKicker>
        <div className="flex items-center gap-2">
          <Star className="size-5 fill-accent text-accent md:size-6" />
          <Star className="size-5 fill-accent text-accent md:size-6" />
          <Star className="size-5 fill-accent text-accent md:size-6" />
        </div>
      </div>
      <SlideHeadline>이 열 줄만 외워도 절반은 넘깁니다</SlideHeadline>
      <SlideLead>이해가 안 되면 지금은 그냥 외우세요. 이해는 다음 학기에 따라옵니다.</SlideLead>

      <div className="grid gap-2 md:gap-3 lg:grid-cols-2">
        {CHEAT_SHEET.map((item, index) => (
          <Panel key={item.label} tone={index < 4 ? 'accentSoft' : 'raised'} pad="sm" className="flex items-start gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-deck-meta font-bold text-accent-contrast md:size-8">
              {index + 1}
            </span>
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className="text-deck-meta font-bold tracking-wide text-accent uppercase">{item.label}</p>
              <p className="text-deck-caption font-semibold text-content-strong">{item.line}</p>
            </div>
          </Panel>
        ))}
      </div>

      <Panel tone="inverse" pad="sm" className="flex items-center gap-3">
        <Brain className="size-6 shrink-0 md:size-7" />
        <p className="text-deck-caption font-bold">
          C 키를 누르면 언제든 이 화면으로 돌아옵니다. 하루에 한 번 소리 내서 읽으세요.
        </p>
      </Panel>
    </SlideLayout>
  )
}

/** R5. 이제 문제로 들어간다 */
export function StartSlide() {
  return (
    <SlideLayout>
      <SlideKicker>지금부터 · 예상문제 1번</SlideKicker>
      <SlideHeadline size="hero">문제는 바뀌어도 물어보는 개념은 그대로입니다</SlideHeadline>
      <SlideLead>
        그래서 답을 통째로 외우는 대신 문제마다 붙은 외울 한 줄을 외웁니다. 같은 개념을 어떻게 물어봐도 그 한 줄이 답의
        뼈대가 됩니다.
      </SlideLead>

      <Panel tone="accent" pad="lg" className="flex items-center gap-4">
        <Target className="size-8 shrink-0 md:size-12" />
        <div className="flex flex-col gap-1">
          <PanelLabel tone="inverse">목표</PanelLabel>
          <p className="text-deck-title font-bold">앞에서부터, 외울 한 줄을 백지에 쓸 수 있게</p>
        </div>
      </Panel>

      <div className="flex items-center gap-3 text-content-secondary">
        <ArrowRight className="size-6 shrink-0 md:size-7" />
        <p className="text-deck-body font-semibold">
          다음 화면부터 문제와 풀이가 번갈아 나옵니다. 문제 화면에서 반드시 한 줄이라도 쓰고 넘기세요.
        </p>
      </div>
    </SlideLayout>
  )
}
