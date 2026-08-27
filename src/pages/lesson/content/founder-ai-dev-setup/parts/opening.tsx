import { Bot, Boxes, CircleCheck, Cloud, Code2, GitBranch, Laptop, Play, Wrench } from 'lucide-react'
import { Fragment, useState } from 'react'
import {
  CheckRow,
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

const READY = [
  { head: '전원 · 인터넷 · 2시간', hint: '충전기를 연결하고 Windows 업데이트의 재시작 예약부터 확인' },
  { head: 'Windows 관리자 암호', hint: '필요할 때 본인이 직접 입력 — 강사에게 공유하지 않기' },
  { head: 'GitHub · Claude 로그인', hint: '휴대폰 2단계 인증과 복구 수단 확인' },
  { head: '현재 서비스 폴더 하나', hint: '가장 자주 고치는 서비스와 GitHub 주소를 함께 준비' },
]

/** W0. 시작 전 · 준비 확인 */
export function StandbySlide() {
  const [checks, setChecks] = useState(() => READY.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-5">
          <SlideKicker>Git 수업 후속편 · 오늘 2시간</SlideKicker>
          <h1 className="animate-rise-1 text-deck-hero font-bold tracking-tight text-balance text-content-strong">
            AI가 일할
            <br />
            <Mark>개발 작업실 세팅</Mark>
          </h1>
          <SlideBody>오늘은 코드를 많이 만드는 날이 아니라, 앞으로 계속 만들 수 있게 바닥을 고르는 날입니다.</SlideBody>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel>시작 전 준비</PanelLabel>
          {READY.map((item, index) => (
            <CheckRow key={item.head} checked={checks[index]} onToggle={() => toggle(index)} hint={item.hint}>
              {item.head}
            </CheckRow>
          ))}
        </Panel>
      </div>

      <SlideNote tone="quiet">
        끝날 때 남는 것 · <Mark>실행되는 서비스 1개 + 새 PC용 프롬프트 1개 + 다음 6회 로드맵</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const BEFORE_AFTER = [
  { before: '사람이 할 일 · 1', after: 'VS Code 설치' },
  { before: '사람이 할 일 · 2', after: 'Claude Code 설치' },
  { before: '그다음', after: 'Claude가 나머지를 설치' },
]

/** W1. 오늘은 작업실을 만드는 날 */
export function WhySetupSlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘의 전체 흐름은 단순합니다</SlideKicker>
      <SlideHeadline>사람은 두 개만, 나머지는 Claude가</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {BEFORE_AFTER.map((item, index) => (
          <Panel
            key={item.before}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-5',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <p className="text-deck-caption font-semibold text-content-muted">{item.before}</p>
            <p className="text-deck-lead font-bold text-content-strong">{item.after}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        다른 PC에서도 · <Mark>두 개 설치 → 같은 프롬프트 붙여 넣기</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const PROOFS = [
  { icon: Code2, label: '열린다', detail: '`code .`로 올바른 폴더가 열린다' },
  { icon: Play, label: '실행된다', detail: 'Node 또는 Python 서비스가 로컬에서 뜬다' },
  { icon: GitBranch, label: '연결된다', detail: 'GitHub 로그인과 push 경로를 확인한다' },
  { icon: CircleCheck, label: '진단된다', detail: 'Claude 점검과 테스트 결과가 초록이다' },
]

/** W2. 오늘의 완료 조건 */
export function FinishLineSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <SlideHeadline>오늘은 이 네 가지가 보여야 끝</SlideHeadline>
        <Chip tone="accent">느낌 말고 증거</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {PROOFS.map((proof, index) => (
          <Panel
            key={proof.label}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-5',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <proof.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-lead font-bold text-content-strong">{proof.label}</p>
            <p className="text-deck-caption text-content-secondary">{proof.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>하나라도 빨갛다면 숨기지 않고 설정 보고서의 ‘남은 문제’에 적어둡니다.</SlideBody>
    </SlideLayout>
  )
}

const LAYERS = [
  { icon: Laptop, name: 'Windows', role: '파일 · 권한 · 네트워크' },
  { icon: Code2, name: 'VS Code', role: '보고 대화하는 작업대' },
  { icon: Boxes, name: 'Node · Python', role: '서비스를 돌리는 엔진' },
  { icon: Cloud, name: 'Git · GitHub', role: '기록 · 공유 · 복구' },
  { icon: Bot, name: 'Claude Code', role: '위 도구를 쓰는 에이전트' },
]

/** W3. 개발 환경의 다섯 층 */
export function SystemMapSlide() {
  return (
    <SlideLayout>
      <SlideKicker>에러를 읽는 새 지도</SlideKicker>
      <SlideHeadline>“Claude가 안 돼요” 아래에는 다섯 층이 있어요</SlideHeadline>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        {LAYERS.map((layer, index) => (
          <Fragment key={layer.name}>
            {index > 0 ? (
              <div className="flex items-center justify-center text-deck-body font-bold text-content-muted">→</div>
            ) : null}
            <Panel
              tone={index === LAYERS.length - 1 ? 'accentSoft' : 'raised'}
              pad="md"
              className={cx('flex flex-1 flex-col gap-4', `animate-rise-${Math.min(index + 1, 5)}`)}
            >
              <layer.icon className="size-7 text-accent md:size-9" />
              <p className="text-deck-body font-bold text-content-strong">{layer.name}</p>
              <p className="mt-auto text-deck-caption text-content-secondary">{layer.role}</p>
            </Panel>
          </Fragment>
        ))}
      </div>

      <SlideNote tone="quiet">
        에이전트는 맨 위층입니다 · 아래층이 흔들리면 <Mark>똑똑해도 계속 넘어집니다</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const JOURNEY = [
  { time: '0–20분', name: '사람이 두 개 설치', detail: 'VS Code · Claude Code · 로그인' },
  { time: '20–50분', name: '프롬프트 한 번 실행', detail: 'Claude가 Git · Node · Python 등을 자동 설치' },
  { time: '50–55분', name: '휴식', detail: '설치 뒤 VS Code와 터미널 다시 열기' },
  { time: '55–90분', name: '실제 서비스 연결', detail: '프로젝트 열기 · 실행 · 테스트 · GitHub 로그인' },
  { time: '90–120분', name: '사용법과 로드맵', detail: 'VS Code · 에러 대응 · 원격 지원 · 6회 미팅' },
]

/** W4. 120분 여정 */
export function JourneySlide() {
  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>오늘의 시간표</SlideKicker>
          <SlideHeadline>설치보다 검증에 시간을 남깁니다</SlideHeadline>
        </div>
        <Chip>2시간 · 1대1</Chip>
      </div>

      <ol className="flex flex-col gap-3">
        {JOURNEY.map((step, index) => (
          <li key={step.time} className={cx(index < 4 ? `animate-rise-${index + 1}` : 'animate-rise-5')}>
            <Panel tone={index === 3 ? 'accentSoft' : 'raised'} pad="sm" className="grid items-center gap-3 md:grid-cols-9 md:gap-6">
              <p className="text-deck-caption font-bold text-content-muted md:col-span-2">{step.time}</p>
              <p className="text-deck-body font-bold text-content-strong md:col-span-3">{step.name}</p>
              <p className="text-deck-caption text-content-secondary md:col-span-4">{step.detail}</p>
            </Panel>
          </li>
        ))}
      </ol>

      <SlideNote tone="quiet">
        설치가 길어지면 항목을 줄입니다 · <Mark>실제 서비스가 한 번 뜨는 것</Mark>은 줄이지 않습니다
      </SlideNote>
    </SlideLayout>
  )
}
