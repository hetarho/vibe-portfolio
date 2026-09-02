import { MessageCircle, Terminal } from 'lucide-react'
import type { ReactNode } from 'react'
import {
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

const WISHES = [
  { head: '내 자료 업로드해서 분석', quote: '제가 가진 자료들을 업로드하고' },
  { head: '공개 DB에서 자료 불러오기', quote: 'open되어 있는 database로부터 자료들을 불러오게' },
  { head: '의미 있는 분석 상의하기', quote: '어떤 분석을 하면 의미가 있을지' },
  { head: '분석 도구 추천받기', quote: '어떤 tool들을 사용하면 좋을지' },
  { head: '분석을 실제로 실행', quote: '여러 분석 tool을 사용해서 분석하고' },
  { head: '논문 figure 만들기', quote: 'figure도 만들게 해보는' },
]

/** B8. 원하는 것 여섯 가지 */
export function WishlistSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>보내주신 메시지에서 그대로 뽑았습니다</SlideKicker>
          <SlideHeadline>원하는 것은 여섯 가지였습니다</SlideHeadline>
        </div>
        <Chip tone="accent">한 장에 하나씩</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {WISHES.map((wish, index) => (
          <Panel
            key={wish.head}
            tone="raised"
            pad="md"
            className={cx('flex flex-col gap-3', index < 3 ? `animate-rise-${index + 1}` : 'animate-rise-4')}
          >
            <span className="grid size-9 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-11">
              {index + 1}
            </span>
            <p className="text-deck-body font-bold text-content-strong">{wish.head}</p>
            <p className="mt-auto text-deck-caption text-content-muted">“{wish.quote}”</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        지금부터 하나씩 · <Mark>이론적인 구현 방법</Mark>과 AI만으로 되는지, 에이전트가 필요한지를 봅니다
      </SlideNote>
    </SlideLayout>
  )
}

type WantDef = {
  no: number
  title: string
  quote: string
  steps: { head: string; body: string }[]
  /** ai: 채팅 AI만으로 충분 / agent: 코딩 에이전트가 필요 */
  verdict: 'ai' | 'agent'
  why: string
  /** 반대쪽 도구의 몫. ai 판정이면 에이전트가 더해주는 것, agent 판정이면 채팅 AI가 맡는 부분 */
  counterpart: string
  note: ReactNode
}

/** 원하는 것 한 장 공통 틀. 왼쪽 구현 방법 3단계, 오른쪽 AI/에이전트 판정 */
function makeWantSlide(want: WantDef) {
  return function WantSlide() {
    const agent = want.verdict === 'agent'
    return (
      <SlideLayout>
        <div className="flex flex-col gap-4">
          <SlideKicker>원하는 것 {want.no} / 6</SlideKicker>
          <SlideHeadline>{want.title}</SlideHeadline>
          <p className="animate-rise-2 text-deck-caption font-semibold text-content-muted">
            보내주신 말 · “{want.quote}”
          </p>
        </div>

        <div className="grid items-stretch gap-6 md:gap-10 lg:grid-cols-9">
          <div className="flex flex-col gap-3 lg:col-span-5">
            <PanelLabel>이론적인 구현 방법</PanelLabel>
            {want.steps.map((step, index) => (
              <Panel key={step.head} tone="raised" pad="sm" className={cx('flex items-center gap-4', `animate-rise-${index + 1}`)}>
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

          <Panel
            tone={agent ? 'accentSoft' : 'raised'}
            pad="lg"
            className="animate-rise-3 flex flex-col gap-4 lg:col-span-4"
          >
            {agent ? (
              <Terminal className="size-9 text-accent md:size-12" />
            ) : (
              <MessageCircle className="size-9 text-positive md:size-12" />
            )}
            <PanelLabel tone={agent ? 'accent' : 'muted'}>판정</PanelLabel>
            <p className="text-deck-lead font-bold text-content-strong">
              {agent ? '에이전트가 필요합니다' : 'AI만으로 충분합니다'}
            </p>
            <p className="text-deck-caption text-content-secondary">{want.why}</p>
            <p
              className={cx(
                'mt-auto rounded-card p-3 text-deck-caption font-semibold md:p-4',
                agent ? 'bg-surface-raised text-content-primary shadow-raised' : 'bg-surface-sunken text-content-secondary inset-shadow-sunken',
              )}
            >
              {want.counterpart}
            </p>
          </Panel>
        </div>

        <SlideNote tone="quiet">{want.note}</SlideNote>
      </SlideLayout>
    )
  }
}

/** B9. ① 내 자료 업로드해서 분석 */
export const UploadWantSlide = makeWantSlide({
  no: 1,
  title: '내 자료를 올려서 분석시키기',
  quote: '제가 가진 자료들을 업로드하고',
  steps: [
    { head: '폴더에 정리한다', body: '유전체 파일을 작업 폴더에 모으고, 환자 정보는 검체번호만 남긴다' },
    { head: '읽게 한다', body: '에이전트가 파일 개수와 형식을 확인해 목록으로 보고' },
    { head: '분석으로 잇는다', body: '이 폴더를 재료로 도구를 실행하고 결과를 파일로 저장' },
  ],
  verdict: 'agent',
  why: '유전체 파일은 크고 50개나 됩니다. 채팅창 첨부는 몇 개가 한계고, 파일을 도구에 넣어 돌리는 건 실행이 필요한 일입니다.',
  counterpart: '채팅 AI의 몫 → 업로드 전에 무엇을 어떻게 정리할지 상담',
  note: (
    <>
      코딩 에이전트는 내 컴퓨터에서 일합니다 · 파일이 밖으로 나가지 않는 것도 <Mark>환자 검체 데이터엔 장점</Mark>
    </>
  ),
})

/** B10. ② 공개 DB에서 자료 불러오기 */
export const DatabaseWantSlide = makeWantSlide({
  no: 2,
  title: '공개 데이터베이스에서 불러오기',
  quote: 'open되어 있는 database로부터 자료들을 불러오게',
  steps: [
    { head: '조건을 정한다', body: '균종 · 국가 · 연도 · 검체. “전부”가 아니라 비교군의 기준' },
    { head: '받아오게 한다', body: 'NCBI·BV-BRC의 내려받기 도구를 에이전트가 실행' },
    { head: '목록을 남긴다', body: '무엇을 받았는지 accession 목록으로 정리. 논문 Methods의 재료' },
  ],
  verdict: 'agent',
  why: '어느 DB에 무엇이 있는지는 AI에게 물으면 됩니다. 하지만 수백 개 파일을 실제로 내려받고 목록으로 정리하는 건 도구 실행이 필요합니다.',
  counterpart: '채팅 AI의 몫 → 데이터베이스 고르기와 검색 조건 상담',
  note: (
    <>
      수만 개 중에서 <Mark>의미 있는 비교군을 고르는 기준</Mark>은 연구자와 교수님이 정합니다
    </>
  ),
})

/** B11. ③ 의미 있는 분석 상의하기 */
export const ConsultWantSlide = makeWantSlide({
  no: 3,
  title: '어떤 분석이 의미 있을지 상의하기',
  quote: '어떤 분석을 하면 의미가 있을지',
  steps: [
    { head: '내 상황을 설명한다', body: '균주 수 · 검체 · 내성/감수성 · 메타데이터를 한 문단으로' },
    { head: '후보를 받는다', body: '가능한 분석 목록과 “각각이 답하는 질문”을 요청' },
    { head: '되물으며 고른다', body: '모르는 용어는 그 자리에서 묻고, 선택은 내가 한다' },
  ],
  verdict: 'ai',
  why: '이건 지식과 대화의 일입니다. 지금 쓰는 채팅 AI로 오늘 밤에도 시작할 수 있습니다.',
  counterpart: '에이전트가 있으면 → 내 파일을 직접 훑어보고 더 구체적인 제안',
  note: (
    <>
      답의 질은 질문의 질 · <Mark>내 데이터를 설명하는 한 문단</Mark>이 가장 중요한 재료입니다
    </>
  ),
})

/** B12. ④ 분석 도구 추천받기 */
export const ToolsWantSlide = makeWantSlide({
  no: 4,
  title: '어떤 도구를 쓸지 추천받기',
  quote: '어떤 tool들을 사용하면 좋을지',
  steps: [
    { head: '분석 이름으로 묻는다', body: '“이 분석의 표준 도구와 고른 이유를 알려줘”' },
    { head: '비교를 요구한다', body: '대안 도구의 장단점 · 내 데이터와 컴퓨터에 맞는지' },
    { head: '기록해 둔다', body: '고른 도구와 이유를 적어 교수님과 공유' },
  ],
  verdict: 'ai',
  why: '도구 지식은 AI가 이미 알고 있습니다. 논문에서 널리 쓰이는 표준 도구일수록 답이 정확합니다.',
  counterpart: '에이전트가 있으면 → 추천에서 끝나지 않고 설치와 실행까지',
  note: (
    <>
      추천을 <Mark>실행으로 옮기는 순간부터</Mark>가 에이전트의 일입니다
    </>
  ),
})

/** B13. ⑤ 분석을 실제로 실행 */
export const RunWantSlide = makeWantSlide({
  no: 5,
  title: '분석을 실제로 실행시키기',
  quote: '여러 분석 tool을 사용해서 분석하고',
  steps: [
    { head: '설치부터 맡긴다', body: '설치 명령을 외울 필요 없이 에이전트가 직접' },
    { head: '50개에 반복 실행', body: '같은 분석을 모든 균주에 반복. 사람이 제일 힘들어하는 부분' },
    { head: '표로 받는다', body: '결과를 한 표로 모으고 실행 기록을 남기게 한다' },
  ],
  verdict: 'agent',
  why: '챗봇은 내 컴퓨터에서 아무것도 실행하지 못합니다. 설치 · 실행 · 반복은 에이전트만 할 수 있는 일입니다.',
  counterpart: '채팅 AI의 몫 → 나온 결과 표를 붙여넣고 해석을 묻기',
  note: (
    <>
      사람의 일은 실행이 아니라 <Mark>결과 검증과 해석</Mark>으로 옮겨갑니다
    </>
  ),
})

/** B14. ⑥ 논문 figure 만들기 */
export const FigureWantSlide = makeWantSlide({
  no: 6,
  title: '논문에 들어갈 figure 만들기',
  quote: 'figure도 만들게 해보는',
  steps: [
    { head: '재료와 목적을 준다', body: '분석 결과 파일 + “무엇이 보이게 할지” 한 문장' },
    { head: '규격을 요구한다', body: '해상도(600dpi) · 색약 안전 색 · 라벨까지 저널 규격으로' },
    { head: '말로 고친다', body: '스크립트로 그려두면 “색만 바꿔줘”가 10분' },
  ],
  verdict: 'agent',
  why: '그림 파일을 만들고 고치는 건 코드 실행입니다. 스크립트가 남아야 심사 수정 요청에도 같은 그림을 다시 그립니다.',
  counterpart: '채팅 AI의 몫 → 이 분야 논문에 흔한 figure 유형 미리 구경하기',
  note: (
    <>
      “figure를 이틀 만에 완성했다”는 이야기가 바로 <Mark>이 방식</Mark>입니다
    </>
  ),
})
