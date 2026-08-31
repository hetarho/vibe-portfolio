import {
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  FileCheck2,
  Images,
  Landmark,
  Languages,
  MessageSquarePlus,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'
import {
  CheckRow,
  Chip,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideNote,
} from '../../../deck'

const WORKSPACES = [
  { icon: Landmark, name: 'Zonta', goal: '공식 자료 · 회기 전략 · 발표 · 회의 기록', first: '10월 오리엔테이션 PPT' },
  { icon: Languages, name: '영어', goal: '내 수준 · 상황별 역할극 · 학습 기록', first: '매일 15분 국제회의 대화' },
  { icon: BriefcaseBusiness, name: '투자', goal: '투자 원칙 · 자료 조사 · 판단 기록', first: '관심 자산의 근거표부터' },
  { icon: Images, name: '전시기획', goal: '아이디어 · 파트너 · 예산 · 일정 · 제안서', first: '반복 업무 목록 인터뷰' },
]

/** A26. 네 프로젝트 */
export function WorkspacesSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>장기적으로 만들 AI 프로젝트 관리</SlideKicker>
          <SlideHeadline>한 명의 만능 AI보다 네 개의 작업실</SlideHeadline>
        </div>
        <Chip tone="accent">자료 · 지침 · 기록을 분리</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {WORKSPACES.map((space, index) => (
          <Panel
            key={space.name}
            tone={index === 0 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <space.icon className="size-8 text-accent md:size-10" />
            <p className="text-deck-lead font-bold text-content-strong">{space.name}</p>
            <p className="text-deck-caption text-content-secondary">{space.goal}</p>
            <p className="mt-auto rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-primary inset-shadow-sunken md:p-4">
              첫 프로젝트 · {space.first}
            </p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        투자 정보가 영어 피드백에 섞이지 않게 · <Mark>목적마다 별도 프로젝트·폴더·대화</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const THREE = [
  { icon: MessageSquarePlus, head: '시키기', body: '역할 · 상황 · 목표 · 입력 · 산출물 · 규칙 · 완료 조건' },
  { icon: ShieldCheck, head: '확인하기', body: '출처 · 날짜 · 빠진 정보 · 사람의 승인선' },
  { icon: FileCheck2, head: '남기기', body: '결과 파일 · 근거표 · 다음 질문 · 작업 기록' },
]

/** A27. 오늘의 세 동사 */
export function SummarySlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘 배운 전부</SlideKicker>
      <SlideHeadline>시키고, 확인하고, 남긴다</SlideHeadline>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {THREE.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-5', `animate-rise-${index + 1}`)}
          >
            <item.icon className="size-9 text-accent md:size-12" />
            <p className="text-deck-lead font-bold text-content-strong">{item.head}</p>
            <p className="text-deck-body text-content-secondary">{item.body}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        좋은 에이전트 사용자는 프롬프트를 외운 사람이 아니라 <Mark>완료 기준을 말하고 결과를 판단하는 사람</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const NEXT = [
  { head: '오늘', hint: '세 프롬프트와 만든 파일을 내 폴더에 저장' },
  { head: '24시간 안에', hint: 'PPT 한 장 수정 + 영어 15분 한 번 실행' },
  { head: '이번 주', hint: 'PPT 확인 필요 목록을 담당자에게 질문' },
  { head: '다음 요청 때', hint: '결과 파일·막힌 화면·원하는 변화 세 가지를 함께 가져오기' },
]

/** A28. 수업 뒤 바로 할 일 */
export function NextActionsSlide() {
  const [checks, setChecks] = useState(() => NEXT.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>수업이 끝난 뒤</SlideKicker>
          <SlideHeadline>다음 질문은 해본 결과에서 나옵니다</SlideHeadline>

          <Panel tone="sunken" pad="lg" className="flex flex-col gap-4">
            <PanelLabel>도움을 요청할 때 세 가지</PanelLabel>
            {['무엇을 하려 했는지', '어디까지 나왔는지', '어떻게 달라지길 원하는지'].map((item, index) => (
              <p key={item} className="flex items-center gap-4 text-deck-body font-semibold text-content-primary">
                <CheckCircle2 className="size-6 shrink-0 text-positive md:size-8" />
                {index + 1}. {item}
              </p>
            ))}
          </Panel>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <div className="flex items-center gap-4">
            <BookOpen className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">첫 주 체크리스트</PanelLabel>
          </div>
          {NEXT.map((item, index) => (
            <CheckRow key={item.head} checked={checks[index]} onToggle={() => toggle(index)} hint={item.hint}>
              {item.head}
            </CheckRow>
          ))}
        </Panel>
      </div>

      <SlideNote tone="quiet">
        첫 목표 · 완벽한 자동화가 아니라 <Mark>PPT 한 번 + 영어 15분 한 번</Mark>을 내 손으로 끝내기
      </SlideNote>
    </SlideLayout>
  )
}

