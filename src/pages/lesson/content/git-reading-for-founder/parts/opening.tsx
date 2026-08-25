import { ArrowDown, ArrowRight, Bot, Cloud, Compass, Laptop, Monitor, Rocket } from 'lucide-react'
import { Fragment, useState } from 'react'
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
import { REPO } from '../model/git-samples'

/** G0. 시작 전 · 준비 확인 */
export function StandbySlide() {
  const [checks, setChecks] = useState([false, false, false])
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-5">
          <SlideKicker>오늘 수업</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            커밋 · 푸시 · 배포
            <br />
            <Mark>어디서 멈췄는지 읽는 법</Mark>
          </h1>
          <SlideBody>명령은 하나도 안 외워요. 출력을 읽고 판단하는 법만 배워요.</SlideBody>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>준비 확인</PanelLabel>
          <CheckRow checked={checks[0]} onToggle={() => toggle(0)} hint="터미널이 열리는 컴퓨터">
            Claude Code 쓰던 그 노트북
          </CheckRow>
          <CheckRow checked={checks[1]} onToggle={() => toggle(1)} hint="본인 계정 · 폰 2단계 인증 준비">
            GitHub 로그인
          </CheckRow>
          <CheckRow checked={checks[2]} onToggle={() => toggle(2)} hint="여러 개면 제일 아끼는 것부터">
            오늘 뜯어볼 내 서비스 레포 1개
          </CheckRow>
        </Panel>
      </div>

      <div className="animate-rise-3 grid gap-5 lg:grid-cols-2">
        <Panel tone="sunken" pad="md" className="flex items-center gap-5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-14">
            1
          </span>
          <p className="text-deck-caption text-content-secondary">
            오늘 가져갈 것 ① &ldquo;반영이 안 돼요&rdquo; <span className="text-content-strong">진단 6단계</span>
          </p>
        </Panel>
        <Panel tone="sunken" pad="md" className="flex items-center gap-5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-14">
            2
          </span>
          <p className="text-deck-caption text-content-secondary">
            오늘 가져갈 것 ② 컴퓨터 바꿀 때 루틴 — <span className="text-content-strong">받고 시작, 올리고 끝</span>
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}

const SCENES = [
  {
    icon: Monitor,
    when: '어제 고쳤는데',
    line: '사이트에 안 보여요',
    detail: '고친 코드는 분명 있는데 사이트는 그대로예요',
  },
  {
    icon: Laptop,
    when: '집 컴퓨터를 켜니',
    line: '예전 코드가 떠 있어요',
    detail: '어느 컴퓨터가 최신인지 아무도 몰라요',
  },
  {
    icon: Bot,
    when: 'Claude는',
    line: '푸시까지 완료했다는데요',
    detail: '진짜 됐는지 확인할 방법을 몰라요',
  },
]

/** G1. 어느 창업자의 세 장면 */
export function ThreeScenesSlide() {
  return (
    <SlideLayout>
      <SlideKicker>이런 아침이 있었죠</SlideKicker>
      <SlideHeadline>어느 창업자의 세 장면</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {SCENES.map((scene, index) => (
          <Panel
            key={scene.when}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <scene.icon className={cx('size-8 md:size-10', index === 2 ? 'text-accent' : 'text-content-muted')} />
            <PanelLabel tone={index === 2 ? 'accent' : 'muted'}>{scene.when}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">&ldquo;{scene.line}&rdquo;</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{scene.detail}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="sunken" pad="lg" className="animate-rise-4 flex flex-col gap-3">
        <PanelLabel>
          오늘의 미스터리 · {REPO.owner}/{REPO.name}
        </PanelLabel>
        <p className="text-deck-body text-content-secondary">
          어젯밤 Claude —{' '}
          <span className="font-semibold text-content-strong">&ldquo;배너 달고 커밋·푸시까지 완료했습니다&rdquo;</span>
        </p>
        <p className="text-deck-body text-content-secondary">
          → 오늘 아침, <span className="font-semibold text-content-strong">사이트에 배너가 없다</span>
        </p>
      </Panel>

      <SlideNote tone="quiet">
        이 미스터리를 오늘 <Mark>두 번, 서로 다른 범인으로</Mark> 풀어요
      </SlideNote>
    </SlideLayout>
  )
}

const NOT_TODAY = ['명령어 외우기', '충돌을 손으로 해결하기', '브랜치 전략 · 커밋 메시지 작법', 'git 내부 원리']
const TODAY = [
  '출력을 읽고 지금 상태 판단하기',
  '여러 컴퓨터 중 최신 가려내기',
  'GitHub에서 올라갔는지 확인하기',
  '읽은 다음 Claude에게 정확히 시키기',
]

/** G2. 타이핑은 AI가, 판단은 내가 */
export function ReadVsTypeSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>타이핑은 AI가, 판단은 내가</SlideHeadline>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 md:gap-6">
          <PanelLabel>오늘 안 하는 것 · 쓰기</PanelLabel>
          <ul className="flex flex-1 flex-col gap-4">
            {NOT_TODAY.map((item) => (
              <li key={item} className="text-deck-body text-content-secondary line-through decoration-content-muted">
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 md:gap-6">
          <PanelLabel tone="accent">오늘 하는 것 · 읽기</PanelLabel>
          <ul className="flex flex-1 flex-col gap-4">
            {TODAY.map((item) => (
              <li key={item} className="text-deck-body font-semibold text-content-strong">
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        운전은 AI가 해요. 하지만 <Mark>계기판은 내가 읽어야</Mark> 어디로 가는지 알죠
      </SlideNote>
    </SlideLayout>
  )
}

const PLACES = [
  {
    icon: Laptop,
    name: '내 컴퓨터(들)',
    desc: '코드를 고치고 저장(커밋)하는 곳',
    check: '확인 창구 · 터미널',
  },
  {
    icon: Cloud,
    name: 'GitHub',
    desc: '모든 컴퓨터가 함께 보는 원본',
    check: '확인 창구 · github.com',
  },
  {
    icon: Rocket,
    name: '내 사이트',
    desc: '손님이 실제로 보는 화면',
    check: '확인 창구 · 내 도메인',
  },
]

/** 세 곳 사이 연결부 — 위 Chip은 수업 구간, 아래는 코드가 건너가는 방법 */
function PlaceArrow({ part, how }: { part: string; how: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 lg:gap-3">
      <Chip>{part}</Chip>
      <ArrowDown className="size-6 text-content-muted md:size-8 lg:hidden" aria-hidden />
      <ArrowRight className="hidden size-6 text-content-muted md:size-8 lg:block" aria-hidden />
      <p className="font-mono text-deck-caption font-semibold text-content-secondary">{how}</p>
    </div>
  )
}

/** G3. ⭐ 코드가 사는 세 곳 */
export function ThreePlacesSlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘의 지도</SlideKicker>
      <SlideHeadline>코드는 세 곳에 살아요</SlideHeadline>

      <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-stretch">
        {PLACES.map((place, index) => (
          <Fragment key={place.name}>
            {index > 0 ? (
              <PlaceArrow
                part={index === 1 ? '1부: 이 구간을 읽어요' : '2부: 이 구간을 읽어요'}
                how={index === 1 ? 'push' : '자동 배포'}
              />
            ) : null}
            <Panel
              tone="raised"
              pad="lg"
              className={cx(
                'flex flex-1 flex-col gap-3',
                index === 0 && 'animate-rise-1',
                index === 1 && 'animate-rise-2',
                index === 2 && 'animate-rise-3',
              )}
            >
              <place.icon className="size-8 text-content-muted md:size-10" />
              <p className="text-deck-lead font-bold text-content-strong">{place.name}</p>
              <p className="text-deck-caption text-content-secondary">{place.desc}</p>
              <p className="mt-auto rounded-card bg-surface-sunken p-4 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-5">
                {place.check}
              </p>
            </Panel>
          </Fragment>
        ))}
      </div>

      <Panel tone="sunken" pad="md" className="animate-rise-4">
        <p className="text-deck-body text-content-secondary">
          컴퓨터가 두 대면 &lsquo;내 컴퓨터&rsquo; 칸이 둘로 늘어요 —{' '}
          <span className="text-content-strong">어긋날 곳이 하나 더 생기는 거예요</span>
        </p>
      </Panel>

      <SlideNote>
        모든 미스터리는 <span className="underline decoration-4 underline-offset-8">세 곳 중 두 곳이 어긋난 것</span>
        이에요
      </SlideNote>
    </SlideLayout>
  )
}

const JOURNEY = ['용어 4개', '터미널 출력 3종', '브랜치 판단', 'PR 검토', '배포 확인', '진단 6단계']

/** G4. 오늘의 도착점 */
export function JourneySlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <Compass className="size-8 text-accent md:size-11" />
        <SlideHeadline>오늘의 도착점</SlideHeadline>
      </div>

      <ol className="grid gap-4 lg:grid-cols-6">
        {JOURNEY.map((step, index) => (
          <li
            key={step}
            className={cx(
              'flex items-center gap-3',
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
          수업 끝에 내 레포를 열고 <Mark>&lsquo;지금 어디까지 갔는지&rsquo;</Mark> 세 문장으로 말할 수 있으면 성공이에요
        </p>
      </Panel>

      <div className="flex flex-wrap gap-3">
        <Chip>PART 1 개념 65분</Chip>
        <Chip>휴식 5분</Chip>
        <Chip tone="accent">PART 2 실습 90분</Chip>
      </div>
    </SlideLayout>
  )
}
