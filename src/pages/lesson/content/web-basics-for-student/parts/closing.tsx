import { CheckCircle2, Rocket } from 'lucide-react'
import { Mark, Panel, PanelLabel, SlideBody, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote, cx } from '../../../deck'
import { PromptCopyButton } from '../../shared'
import studyPrompt from '../model/study-prompt.md?raw'
import { THINKING_DRILLS } from '../model/thinking-drills'

const MAP_CHECKS = [
  '주소를 치고 화면이 뜰 때까지 무엇이 오갔는지 말할 수 있다',
  '같은 코드라도 브라우저에서 도는지 서버에서 도는지 구분할 수 있다',
  '값을 데이터베이스에 넣는 이유와 표를 나누는 이유를 말할 수 있다',
  '배포가 파일을 올리는 일에서 끝나지 않는 이유를 설명할 수 있다',
]

/** W42. 앞부분에서 남긴 지도 점검 */
export function RecapMapSlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘의 도착점 · 앞부분</SlideKicker>
      <SlideHeadline>용어를 외운 상태에서, 구조를 설명할 수 있는 상태로 넘어갑니다</SlideHeadline>
      <SlideLead>아래 네 가지를 말로 설명할 수 있으면 앞부분은 충분합니다.</SlideLead>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-2">
        {MAP_CHECKS.map((item, index) => (
          <Panel
            key={item}
            tone={index === 3 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx('flex items-center gap-4', `animate-rise-${index + 1}`)}
          >
            <CheckCircle2 className="size-7 shrink-0 text-positive md:size-9" />
            <p className="text-deck-body font-bold text-content-strong">{item}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        지금 배우는 자바는 <Mark>서버 코드 칸</Mark>에서 돌아갑니다 · 앞으로 배우는 것도 이 지도 위에 얹힙니다
      </SlideNote>
    </SlideLayout>
  )
}

/** W43. 뒷부분에서 남긴 사고 도구 열 개를 한 화면으로 */
export function RecapRulesSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>오늘의 도착점 · 뒷부분</SlideKicker>
      <SlideHeadline>만들기 전에 꺼내 쓰는 질문 열 개가 남았습니다</SlideHeadline>
      <SlideLead>새 기능을 맡았을 때 이 목록을 위에서부터 훑어보면, 빠뜨린 경우가 대부분 여기서 걸립니다.</SlideLead>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
        {THINKING_DRILLS.map((drill) => (
          <div
            key={drill.no}
            className="flex items-center gap-4 rounded-card bg-surface-sunken px-4 py-3 inset-shadow-sunken md:px-6 md:py-4"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-raised text-deck-meta font-bold text-content-primary shadow-raised md:size-10">
              {drill.no}
            </span>
            <p className="text-deck-caption font-semibold text-content-primary">{drill.skill}</p>
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}

const WEEK = [
  { day: '이번 주 · 눈으로', do: 'F12의 Network 탭을 켜고 자주 쓰는 사이트에서 요청과 응답을 구경합니다' },
  { day: '이번 주 · 손으로', do: 'HTML 한 장을 만들어 올리고, 친구 폰에서 열리는지 확인합니다' },
  { day: '매일 · 말로', do: '프롬프트를 붙여 넣고 질문 세 개에 답합니다. 20분이면 한 바퀴가 돕니다' },
]

/** W44. 집에서 이어가는 방법 · 복습 프롬프트 */
export function HomeworkSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-5">
          <SlideKicker>집에서 이어가기</SlideKicker>
          <SlideHeadline>
            오늘 이야기를 <Mark>내가 설명하고</Mark> AI가 채점하게 시킵니다
          </SlideHeadline>
          <SlideBody>
            설명을 받아 읽으면 아는 것 같은 느낌만 남습니다. 질문을 받고 답하는 쪽으로 방향을 돌려 둔 프롬프트입니다.
          </SlideBody>
          <PromptCopyButton size="md" label="복습 프롬프트 복사" text={studyPrompt} />
        </div>

        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>이번 주에 하는 세 가지</PanelLabel>
          {WEEK.map((item, index) => (
            <div key={item.day} className={cx('flex items-start gap-4', `animate-rise-${index + 1}`)}>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-raised text-deck-caption font-bold text-content-primary shadow-raised md:size-10">
                {index + 1}
              </span>
              <div className="flex flex-col">
                <p className="text-deck-caption font-bold text-content-strong">{item.day}</p>
                <p className="text-deck-caption text-content-secondary">{item.do}</p>
              </div>
            </div>
          ))}
        </Panel>
      </div>

      <Panel tone="raised" pad="md" className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <Rocket className="size-8 shrink-0 text-accent md:size-10" />
        <div className="flex flex-col gap-1">
          <PanelLabel>다음 회차</PanelLabel>
          <p className="text-deck-body font-semibold text-content-primary">
            오늘 그린 지도 위에서 주문 사이트를 실제로 만들어 봅니다. 표를 설계하고 주소가 열릴 때까지 갑니다.
          </p>
        </div>
      </Panel>
    </SlideLayout>
  )
}
