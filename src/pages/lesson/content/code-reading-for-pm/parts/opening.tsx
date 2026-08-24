import { Bug, Compass, MessageSquare, Timer } from 'lucide-react'
import { APM_LINKS } from '../model/links'
import { DeckLink } from '../ui/DeckLink'
import { useState } from 'react'
import {
  CheckRow,
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

/** R0. 시작 전 — 준비 확인 */
export function StandbySlide() {
  const [checks, setChecks] = useState([false, false])
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-5">
          <SlideKicker>오늘 수업</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            쓰지는 않아도
            <br />
            <Mark>읽을 수는 있게</Mark>
          </h1>
          <SlideBody>2부는 실제 코드를 같이 열어요. 시작 전에 두 가지만 확인할게요.</SlideBody>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>준비 확인</PanelLabel>
          <CheckRow checked={checks[0]} onToggle={() => toggle(0)} hint="ChatGPT·Claude 아무거나 · 코드 붙여넣기용">
            LLM 계정
          </CheckRow>
          <CheckRow checked={checks[1]} onToggle={() => toggle(1)} hint="오늘 읽은 걸 세 문장으로 적어요">
            메모할 곳
          </CheckRow>
          <p className="text-deck-meta text-content-muted">
            GitHub는 로그인 없이 읽어요 — 계정은 오늘 쓰지 않습니다
          </p>
        </Panel>
      </div>

      <div className="animate-rise-3 grid gap-5 lg:grid-cols-2">
        <Panel tone="sunken" pad="md" className="flex items-center gap-5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-14">
            1
          </span>
          <p className="text-deck-caption text-content-secondary">
            오늘 가져갈 것 ① 코드 읽는 <span className="text-content-strong">순서 5단계</span>
          </p>
        </Panel>
        <Panel tone="sunken" pad="md" className="flex items-center gap-5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-14">
            2
          </span>
          <p className="text-deck-caption text-content-secondary">
            오늘 가져갈 것 ② 매주 혼자 돌릴 <span className="text-content-strong">코치 프롬프트</span>
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

const MOMENTS = [
  {
    icon: MessageSquare,
    when: '스펙을 논의할 때',
    line: '이 케이스는 어떻게 되나요?',
    detail: '조건을 안 물으면 그 결정은 사라지지 않고, 개발자가 코드에서 혼자 정해요',
  },
  {
    icon: Timer,
    when: '일정을 들을 때',
    line: '왜 3일이 걸려요?',
    detail: '대답을 듣고 판단할 수 있어요. 어디가 비싼지 알면 우선순위를 바꿀 수 있어요',
  },
  {
    icon: Bug,
    when: '버그 리포트가 올 때',
    line: '이건 어디 문제예요?',
    detail: '화면인지 서버인지 데이터인지 1차 분류를 스스로 해요. 급한지도 스스로 판단해요',
  },
]

/** R1. 오프닝 — 커피챗에서 들은 그 말을 번역하면 */
export function WhyReadSlide() {
  return (
    <SlideLayout>
      <SlideKicker>커피챗에서 들은 말</SlideKicker>
      <SlideHeadline>
        &ldquo;코드를 쓰진 못해도, <Mark>읽을 수는 있으면</Mark> 좋다&rdquo;
      </SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {MOMENTS.map((moment, index) => (
          <Panel
            key={moment.when}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <moment.icon className={cx('size-8 md:size-10', index === 2 ? 'text-accent' : 'text-content-muted')} />
            <PanelLabel tone={index === 2 ? 'accent' : 'muted'}>{moment.when}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">&ldquo;{moment.line}&rdquo;</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{moment.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>
        읽기가 바꾸는 건 지식이 아니라 속도예요. <Mark>같은 회의에서 한 번 더 물을 수 있느냐</Mark>의 차이예요.
      </SlideBody>
    </SlideLayout>
  )
}

const WRITE_SIDE = ['문법을 외워서 빈 화면에서 시작하기', '내 에러를 혼자 끝까지 해결하기', '라이브러리와 구조 고르기', '성능 개선하기']
const READ_SIDE = [
  '이 파일이 하는 일을 한 문장으로 말하기',
  '조건이 갈리는 지점 찾기',
  '이걸 바꾸면 어디가 영향받는지 짚기',
  '에러에서 파일과 줄 번호 찾기',
]

/** R2. 읽기와 쓰기는 다른 능력 */
export function ReadVsWriteSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>읽기와 쓰기는 다른 능력이에요</SlideHeadline>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 md:gap-6">
          <PanelLabel>오늘 안 하는 것 · 쓰기</PanelLabel>
          <ul className="flex flex-1 flex-col gap-4">
            {WRITE_SIDE.map((item) => (
              <li key={item} className="text-deck-body text-content-secondary line-through decoration-content-muted">
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 md:gap-6">
          <PanelLabel tone="accent">오늘 하는 것 · 읽기</PanelLabel>
          <ul className="flex flex-1 flex-col gap-4">
            {READ_SIDE.map((item) => (
              <li key={item} className="text-deck-body font-semibold text-content-strong">
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        외국어도 읽기가 쓰기보다 훨씬 빨리 늘어요. 오늘 문법은 <Mark>딱 4개</Mark>만 배우고, 나머지는 모르는 채로 읽는
        법을 배워요
      </SlideNote>
    </SlideLayout>
  )
}

const JD_PHRASES = [
  {
    phrase: 'Technical fluency',
    mean: '개발자와 같은 단어로 대화한다',
    where: 'PART 1 · 문법 4개와 용어',
  },
  {
    phrase: 'Translate requirements into technical requirements',
    mean: '조건·예외·기본값까지 적는다',
    where: 'PART 2 · 코드가 될 수 있는 스펙',
  },
  {
    phrase: 'Partner closely with engineering',
    mean: '파일과 줄 번호를 들고 묻는다',
    where: 'PART 2 · 질문 업그레이드',
  },
  {
    phrase: 'Familiarity with APIs and data models',
    mean: '데이터가 어디서 와서 어디에 저장되는지 안다',
    where: 'PART 1 · 화면·서버·데이터 3층',
  },
]

/** R3. 미국 PM 공고에 실제로 쓰여 있는 문구 */
export function JobDescriptionSlide() {
  return (
    <SlideLayout>
      <SlideKicker>미국 신입 PM · APM 공고</SlideKicker>
      <SlideHeadline>공고의 이 문구가 오늘 배울 것이에요</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {JD_PHRASES.map((item, index) => (
          <Panel
            key={item.phrase}
            tone="raised"
            pad="md"
            className={cx(
              'flex flex-col gap-3',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <p className="text-deck-body font-bold text-content-strong">&ldquo;{item.phrase}&rdquo;</p>
            <p className="text-deck-caption text-content-secondary">= {item.mean}</p>
            <div className="mt-auto flex">
              <Chip>{item.where}</Chip>
            </div>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="lg" className="animate-rise-5 flex flex-col gap-4">
        <PanelLabel>직접 열어서 문구를 확인해요</PanelLabel>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
          {APM_LINKS.map((link) => (
            <div key={link.href} className="flex flex-col gap-2">
              <div className="flex">
                <DeckLink href={link.href} tone={link.primary ? 'accent' : 'quiet'}>
                  {link.name}
                </DeckLink>
              </div>
              <p className="text-deck-meta text-content-muted">{link.note}</p>
            </div>
          ))}
        </div>
      </Panel>

      <SlideNote>
        어느 공고도 코드를 짜라고 하지 않아요 — 읽고 판단해서 다시 말할 수 있느냐를 봅니다
      </SlideNote>
    </SlideLayout>
  )
}

const JOURNEY = ['문법 4개', '함수 두 개 · 조건과 반복', 'PR diff 하나', '3문장 요약']

/** R4. 오늘의 도착점 */
export function JourneySlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <Compass className="size-8 text-accent md:size-11" />
        <SlideHeadline>오늘의 도착점</SlideHeadline>
      </div>

      <ol className="grid gap-4 lg:grid-cols-8">
        {JOURNEY.map((step, index) => (
          <li
            key={step}
            className={cx(
              'flex items-center gap-4 lg:col-span-2',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <span
              className={cx(
                'flex-1 rounded-card px-4 py-3 text-deck-caption font-bold md:px-7 md:py-6',
                index === JOURNEY.length - 1
                  ? 'bg-accent text-accent-contrast shadow-lifted'
                  : 'bg-surface-raised text-content-primary shadow-raised',
              )}
            >
              {step}
            </span>
            {index < JOURNEY.length - 1 ? (
              <span className="shrink-0 text-deck-caption text-content-muted" aria-hidden>
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>

      <Panel tone="sunken" pad="lg" className="animate-rise-5 flex flex-col gap-4">
        <PanelLabel>오늘 성공의 기준</PanelLabel>
        <p className="text-deck-lead font-bold text-content-strong">
          실제 PR 하나를 열어서 <Mark>무엇이 · 왜 · 위험은</Mark> 세 문장으로 말할 수 있으면 끝이에요
        </p>
      </Panel>

      <div className="flex flex-wrap gap-3">
        <Chip>PART 1 개념 50분</Chip>
        <Chip>휴식 5분</Chip>
        <Chip tone="accent">PART 2 실습 55분</Chip>
      </div>
    </SlideLayout>
  )
}
