import { PartyPopper } from 'lucide-react'
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
  SlideLayout,
  SlideNote,
} from '../../../deck'
import { BRING, REPO } from '../model/mvp-samples'

const SUMMARY = [
  { head: '지도', body: '개발은 7단계 한 바퀴', tail: '문제 한 문장 → 화면 4상태 → 표·선·규칙 → 작은 파일 → 관찰 가능한 기준 → 주소 3곳 → 우선순위 표' },
  { head: '연동', body: '손은 내가, 내비는 AI가', tail: '위치 · 화면 그대로 · 한 클릭 · 검증 명령 — 비밀키는 어디에도 붙이지 않기' },
  { head: '다음까지', body: '내 아이디어로 8단계', tail: '1~2번은 코드 0줄 · 6번(친구 폰에서 로그인)이 도착점 · 8번(5명 반응 + BLOCKERS.md)이 다음 교재' },
]

/** M34. 오늘 남길 3줄 */
export function SummarySlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <SlideHeadline>오늘 남길 3줄</SlideHeadline>
        <Chip tone="accent">내 아이디어로 한 번 더 말해볼까요</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {SUMMARY.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 2 ? 'accent' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-5', index === 0 && 'animate-rise-1', index === 1 && 'animate-rise-2', index === 2 && 'animate-rise-3')}
          >
            <span
              className={cx(
                'grid size-10 place-items-center rounded-full text-deck-caption font-bold md:size-14',
                index === 2 ? 'bg-accent-contrast/15 text-accent-contrast' : 'bg-surface-sunken text-content-secondary',
              )}
            >
              {index + 1}
            </span>
            <p className={cx('text-deck-caption font-semibold', index === 2 ? 'text-accent-contrast/70' : 'text-content-muted')}>{item.head}</p>
            <p className={cx('text-deck-lead font-bold', index === 2 ? 'text-accent-contrast' : 'text-content-strong')}>{item.body}</p>
            <p className={cx('mt-auto text-deck-caption', index === 2 ? 'text-accent-contrast/70' : 'text-content-secondary')}>{item.tail}</p>
          </Panel>
        ))}
      </div>
    </SlideLayout>
  )
}

/** M35. 다음 시간 · 결과물을 같이 열어요 */
export function NextSessionSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>다음 시간엔 결과물을 같이 열어요</SlideHeadline>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="animate-rise-1 flex flex-col gap-4">
          <PanelLabel>오늘 · 1회차</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">
            어떻게 <Mark>흐르는가</Mark>
          </p>
          <p className="mt-auto text-deck-caption text-content-secondary">기획 · 좋은 코드 · 검증 기준 · AI에게 연동 시키는 법 · 혼자 할 8단계</p>
        </Panel>
        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4">
          <PanelLabel tone="accent">다음 · 2회차</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">
            어디서 <span className="underline decoration-4 underline-offset-8">막혔는가</span>
          </p>
          <p className="text-deck-caption text-content-secondary">BLOCKERS.md를 위에서부터 같이 풀고 · 배포된 앱을 같이 눌러보고</p>
          <p className="mt-auto text-deck-caption text-content-muted">5명의 반응으로 기획 문단을 고치고 — 두 번째 바퀴 시작</p>
        </Panel>
      </CompareGrid>

      <Panel tone="sunken" pad="lg" className="animate-rise-3 flex flex-col gap-4">
        <PanelLabel>가져올 것 3개</PanelLabel>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
          {BRING.map((item, index) => (
            <div key={item.what} className="flex items-start gap-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-12">
                {index + 1}
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-deck-body font-semibold text-content-strong">{item.what}</span>
                <span className="text-deck-caption text-content-secondary">{item.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <SlideNote tone="quiet">
        <span className="inline-flex items-center gap-3">
          <PartyPopper className="size-6 md:size-8" />
          <span>
            8단계 중 <Mark>어디까지 갔든</Mark> 그 지점이 다음 수업의 첫 화면이에요 👏
          </span>
        </span>
      </SlideNote>
    </SlideLayout>
  )
}

const PREP = [
  { head: '수강생 아이디어를 미리 한 줄 받아두기', hint: 'M3 문제 문장 · M4 기능 자르기를 수강생 아이디어로 한 번 더 해보는 게 PART 1의 진짜 실습' },
  { head: `${REPO.name}을 배포 주소와 로컬 양쪽으로 열어두기`, hint: 'M2·M6·M7에서 실제 화면(빈 지도 · 추천 띠 · 부팅 거부 메시지)을 보여준다 — 변수 하나 비운 .env.local 준비' },
  { head: `${REPO.name} 폴더를 편집기로 열어두기`, hint: 'M9 migrations 파일 3개 · M11 git log · M12 features/ 폴더 이름 · M15 jobs/08 수용 기준을 라이브로' },
  { head: 'Google Cloud 콘솔을 강사 계정으로 열어두기', hint: 'M23 대화의 "애플리케이션 제한사항" 화면을 실제로 보여준다 — 한국어 UI 기준' },
  { head: '수강생 결제 카드 준비 여부 확인', hint: '없으면 5단계 외부 API에서 멈춘다 — 무료 한도와 7단계 상한을 미리 설명' },
  { head: 'Claude Code 설치 · GitHub 계정 확인', hint: '2단계 "빈 폴더에서 설계 문서"가 수업 다음 날 바로 시작돼야 한다' },
  { head: '2회차 일정 잡기 · 2~3주 이내', hint: '8단계는 주말 둘이면 되지만 미루면 문제 문장부터 다시 써야 한다' },
]

/** M36. 수업 전 준비 체크리스트 */
export function PrepChecklistSlide() {
  const [checks, setChecks] = useState(() => PREP.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <SlideHeadline>수업 전 준비</SlideHeadline>
        <Chip>강사용</Chip>
      </div>

      <div className="flex flex-col gap-3">
        {PREP.map((item, index) => (
          <CheckRow key={item.head} checked={checks[index]} onToggle={() => toggle(index)} hint={item.hint}>
            {item.head}
          </CheckRow>
        ))}
      </div>

      <SlideBody>실습은 수업 후 내 아이디어로 혼자 하는 구조예요 — 아이디어 한 줄을 미리 못 받으면 PART 1이 강의로만 흘러가요.</SlideBody>
    </SlideLayout>
  )
}
