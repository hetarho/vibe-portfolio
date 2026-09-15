import { AppWindow, Coffee, FolderKanban, Globe2, PackageCheck, Puzzle } from 'lucide-react'
import { useState } from 'react'
import {
  CheckRow,
  Chip,
  CountdownTimer,
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

const PREPS = [
  { head: 'Claude 유료 플랜', hint: 'Cowork와 크롬 확장은 Pro 이상에서 열립니다' },
  { head: 'Claude 데스크톱 앱', hint: '클로드 코드와는 별개입니다. 이 앱을 따로 받아야 코워크가 열립니다' },
  { head: '구글 크롬', hint: '엣지 · 웨일 · 사파리에서는 확장이 동작하지 않습니다' },
  { head: '폴더 세 개', hint: '바탕화면에 재건축 · 오리엔테이션 · 법무상담으로 하나씩' },
  { head: '가진 자료 넣어두기', hint: '공고문 · 지난 발표 파일 · 상담 메모를 각자 폴더에' },
]

/** D12. 준비물 체크 */
export function PrepCheckSlide() {
  const [checks, setChecks] = useState(() => PREPS.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))
  const done = checks.filter(Boolean).length

  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>작업실 세팅 · 1 / 4</SlideKicker>
          <SlideHeadline>다섯 가지만 준비하면 됩니다</SlideHeadline>
        </div>
        <div className="flex items-center gap-3 rounded-panel bg-accent px-5 py-3 text-accent-contrast shadow-lifted md:px-8 md:py-5">
          <PackageCheck className="size-7 md:size-9" />
          <span className="text-deck-body font-bold">
            {done} / {PREPS.length}
          </span>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {PREPS.map((item, index) => (
          <CheckRow key={item.head} checked={checks[index]} onToggle={() => toggle(index)} hint={item.hint}>
            {item.head}
          </CheckRow>
        ))}
      </div>

      <SlideBody>폴더를 먼저 만드는 이유는, 오늘 나오는 파일이 전부 그 안에 떨어지게 하기 위해서입니다.</SlideBody>
    </SlideLayout>
  )
}

const PROJECTS = [
  { name: '재건축', put: '공고문 · 분담금표 · 기한 메모', rule: '숫자에는 출처를 달고, 유리한 평형은 말하지 않는다' },
  { name: '오리엔테이션', put: '지난 발표 파일 · 회원 명단 · 지역 일정', rule: '공식 출처와 우리 해석을 섞지 않는다' },
  { name: '법무상담', put: '상담 메모 · 등기부 · 정관', rule: '들은 내용만 적고 법률 지식으로 채우지 않는다' },
]

/** D13. 프로젝트 세 개 만들기 */
export function ProjectSetupSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>작업실 세팅 · 2 / 4</SlideKicker>
          <SlideHeadline>일마다 방을 따로 만듭니다</SlideHeadline>
        </div>
        <Chip tone="accent">영상의 “프로젝트”가 이것입니다</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <Panel
            key={project.name}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <FolderKanban className={cx('size-8 md:size-10', index === 0 ? 'text-accent' : 'text-content-muted')} />
            <p className="text-deck-lead font-bold text-content-strong">{project.name}</p>
            <div className="flex flex-col gap-1">
              <PanelLabel>넣어둘 것</PanelLabel>
              <p className="text-deck-caption text-content-secondary">{project.put}</p>
            </div>
            <div className="mt-auto flex flex-col gap-1 rounded-card bg-surface-sunken p-3 inset-shadow-sunken md:p-4">
              <PanelLabel>이 방의 규칙</PanelLabel>
              <p className="text-deck-caption font-semibold text-content-primary">{project.rule}</p>
            </div>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        방을 나누는 이유는 하나입니다 · <Mark>매번 상황을 다시 설명하지 않으려고</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const COWORK_STEPS = [
  { head: '데스크톱 앱을 엽니다', body: '영상에서 보신 Chat · Cowork · Code 세 탭이 위쪽에 있습니다' },
  { head: 'Cowork 탭으로 갑니다', body: '여기서 파일을 직접 열고 고칩니다' },
  { head: '작업 폴더를 고릅니다', body: '방금 만든 재건축 폴더부터 지정합니다' },
  { head: '파일 만들기를 켭니다', body: '설정 · 기능에서 코드 실행과 파일 생성을 켭니다' },
]

/** D14. Cowork 열기 */
export function CoworkSetupSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>작업실 세팅 · 4 / 4</SlideKicker>
          <SlideHeadline>Cowork에게 작업할 폴더를 알려줍니다</SlideHeadline>
          <div className="flex flex-col gap-3">
            {COWORK_STEPS.map((step, index) => (
              <Panel
                key={step.head}
                tone="raised"
                pad="sm"
                className={cx('flex items-center gap-4', `animate-rise-${index + 1}`)}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-11">
                  {index + 1}
                </span>
                <div className="flex flex-col">
                  <p className="text-deck-body font-bold text-content-strong">{step.head}</p>
                  <p className="text-deck-caption text-content-secondary">{step.body}</p>
                </div>
              </Panel>
            ))}
          </div>
        </div>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-3 flex flex-col gap-4 lg:col-span-4">
          <AppWindow className="size-9 text-accent md:size-12" />
          <PanelLabel tone="accent">여기서 달라집니다</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">채팅은 글을 주고, Cowork는 파일을 줍니다</p>
          <p className="text-deck-body text-content-secondary">
            같은 질문을 해도 Cowork는 폴더 안의 자료를 직접 열어보고, 결과를 파일로 떨어뜨린 다음 무엇을 만들었는지
            보고합니다.
          </p>
          <p className="mt-auto rounded-card bg-surface-raised p-3 text-deck-caption font-semibold text-content-primary shadow-raised md:p-4">
            파일 생성을 켜야 pptx와 xlsx가 나옵니다
          </p>
        </Panel>
      </div>

      <SlideNote tone="quiet">
        확인하는 법 · “이 폴더에 뭐가 있는지 목록으로 보여줘”라고 시켜 <Mark>내 파일 이름이 나오면</Mark> 연결된 것입니다
      </SlideNote>
    </SlideLayout>
  )
}

const CHROME_STEPS = [
  { head: '크롬 웹스토어에서 설치', body: 'Claude in Chrome을 찾아 “Chrome에 추가”' },
  { head: '내 계정으로 로그인', body: '데스크톱 앱과 같은 계정이어야 대화가 이어집니다' },
  { head: '퍼즐 아이콘에서 고정', body: '주소창 옆에 아이콘이 늘 보이게 핀으로 꽂습니다' },
  { head: '권한을 허용', body: '화면을 읽고 클릭할 권한입니다. 여기서 승인 규칙도 정합니다' },
]

/** D15. 크롬 옆창 연결과 안전장치 */
export function ChromeSetupSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>작업실 세팅 · 3 / 4</SlideKicker>
          <SlideHeadline>크롬 옆창을 붙입니다</SlideHeadline>
        </div>
        <Chip tone="accent">2분이면 끝납니다</Chip>
      </div>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-4">
        {CHROME_STEPS.map((step, index) => (
          <Panel
            key={step.head}
            tone="raised"
            pad="md"
            className={cx('flex flex-col gap-3', `animate-rise-${index + 1}`)}
          >
            <span className="grid size-9 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-11">
              {index + 1}
            </span>
            <p className="text-deck-body font-bold text-content-strong">{step.head}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{step.body}</p>
          </Panel>
        ))}
      </div>

      <Panel tone="accentSoft" pad="md" className="animate-rise-5 flex flex-wrap items-center gap-4 md:gap-6">
        <Puzzle className="size-8 text-accent md:size-10" />
        <p className="text-deck-body font-semibold text-content-strong">
          설정 → Cowork → 기본 브라우저를 <Mark>크롬</Mark>으로 바꾼 뒤 · 로그인한 페이지를 열고 “이 화면이 무슨 페이지인지 말해줘”
        </p>
      </Panel>

      <Panel tone="sunken" pad="md" className="animate-rise-5 flex flex-col gap-2">
        <PanelLabel>내 브라우저를 빌려주는 일이니 · 규칙 셋</PanelLabel>
        <p className="text-deck-caption text-content-secondary">
          보내기 · 제출 · 결제 · 삭제는 반드시 먼저 묻게 둡니다 · 남이 만든 페이지에 숨은 지시가 있을 수 있습니다 ·
          메일과 뱅킹 탭은 닫고 시작합니다
        </p>
      </Panel>

      <SlideNote tone="quiet">
        옆창의 대화는 계정에 저장됩니다 · 크롬에서 모으고 <Mark>데스크톱에서 이어서</Mark> 파일을 만들 수 있습니다
      </SlideNote>
    </SlideLayout>
  )
}

/** D16. 휴식 5분 */
export function BreakSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col items-center gap-6 text-center md:gap-10">
        <Coffee className="animate-rise-1 size-16 text-accent md:size-24" />
        <SlideHeadline>5분 쉬고, 진짜 자료를 넣습니다</SlideHeadline>
        <CountdownTimer seconds={300} caption="남은 휴식" size="lg" />
        <Panel tone="sunken" pad="md" className="animate-rise-3 flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <Globe2 className="size-7 text-content-muted md:size-9" />
          <p className="text-deck-body text-content-secondary">
            쉬는 동안 · 재건축 자료를 폴더에 넣고, 조합 사이트와 Zonta 페이지에 로그인해서 탭으로 열어둡니다
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}
