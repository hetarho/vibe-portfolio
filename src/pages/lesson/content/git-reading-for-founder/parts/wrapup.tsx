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

const SUMMARY = [
  { head: '지도', body: '코드는 세 곳에 산다', tail: '내 컴퓨터 · GitHub · 배포 — 미스터리는 어긋남이에요' },
  { head: '계기판', body: 'status·log·Branches가 위치를 말한다', tail: 'ahead면 올리고, 작업 브랜치면 PR로 main까지' },
  { head: '막히면', body: '커밋부터 브라우저까지 순서대로', tail: '6단계로 짚으면 스스로 진단돼요' },
]

/** G36. 오늘 남길 3줄 */
export function SummarySlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <SlideHeadline>오늘 남길 3줄</SlideHeadline>
        <Chip tone="accent">본인 레포로 한 번 더 말해볼까요</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {SUMMARY.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 2 ? 'accent' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-5',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <span
              className={cx(
                'grid size-10 place-items-center rounded-full text-deck-caption font-bold md:size-14',
                index === 2 ? 'bg-accent-contrast/15 text-accent-contrast' : 'bg-surface-sunken text-content-secondary',
              )}
            >
              {index + 1}
            </span>
            <p
              className={cx(
                'text-deck-caption font-semibold',
                index === 2 ? 'text-accent-contrast/70' : 'text-content-muted',
              )}
            >
              {item.head}
            </p>
            <p className={cx('text-deck-lead font-bold', index === 2 ? 'text-accent-contrast' : 'text-content-strong')}>
              {item.body}
            </p>
            <p
              className={cx(
                'mt-auto text-deck-caption',
                index === 2 ? 'text-accent-contrast/70' : 'text-content-secondary',
              )}
            >
              {item.tail}
            </p>
          </Panel>
        ))}
      </div>
    </SlideLayout>
  )
}

const NEXT_HOMEWORK = [
  '아침에 한 번 "받고 시작" 루틴 돌려보기',
  '본인 레포 Actions 탭 한 번 열어보기',
  '막히면 화면 캡처해서 가져오기',
]

/** G37. 다음 시간 · F12 예고 */
export function NextSessionSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>다음 시간엔 브라우저를 열어요</SlideHeadline>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="animate-rise-1 flex flex-col gap-4">
          <PanelLabel>오늘 · 1회차</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">
            코드가 <Mark>올라갔는가</Mark>
          </p>
          <p className="mt-auto text-deck-caption text-content-secondary">
            터미널과 GitHub 읽기 — 커밋 · 푸시 · Actions까지 왔어요
          </p>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4">
          <PanelLabel tone="accent">다음 · 2회차</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">
            브라우저에서 <span className="underline decoration-4 underline-offset-8">무슨 일이 벌어지는가</span>
          </p>
          <p className="text-deck-caption text-content-secondary">F12 · Console 에러 · Network 200/404/401/500 · 캐시</p>
          <p className="mt-auto text-deck-caption text-content-muted">
            오늘 진단 6단계의 마지막 칸이 다음 수업 전체예요
          </p>
        </Panel>
      </CompareGrid>

      <Panel tone="sunken" pad="lg" className="animate-rise-3 flex flex-col gap-4">
        <PanelLabel>다음 시간까지 · 선택</PanelLabel>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
          {NEXT_HOMEWORK.map((item, index) => (
            <div key={item} className="flex items-center gap-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-12">
                {index + 1}
              </span>
              <span className="text-deck-caption text-content-secondary">{item}</span>
            </div>
          ))}
        </div>
      </Panel>

      <SlideNote tone="quiet">
        <span className="inline-flex items-center gap-3">
          <PartyPopper className="size-6 md:size-8" />
          <span>
            오늘 <Mark>미스터리 두 개를 스스로 풀 수 있는 눈</Mark>이 생겼어요 👏
          </span>
        </span>
      </SlideNote>
    </SlideLayout>
  )
}

const PREP = [
  {
    head: '수강생 레포 주소 미리 받아 열어보기',
    hint: 'Public/Private, Branches·PR·Actions·Deployments 유무 확인 — 2부 실습이 전부 이 레포다',
  },
  {
    head: '배포 방식 파악',
    hint: 'GitHub Actions인지 Vercel 자동 배포인지 — G23~G27을 그 환경 말로 진행',
  },
  {
    head: '실제로 쓰는 컴퓨터 대수 확인',
    hint: '두 대 이상이면 G14가 본인 이야기가 된다 — 실제 사례로 진행',
  },
  {
    head: '미스터리 시연용 데모 레포 준비',
    hint: 'push 안 한 커밋 2개 + Untracked 파일 1개를 만들어 두면 G8~G10을 라이브로 보여줄 수 있다',
  },
  {
    head: '수강생 터미널에서 git 동작 확인',
    hint: 'Claude Code를 쓰니 되겠지만, 수업 전날 status 한 번 쳐보게 하기',
  },
  {
    head: '카페 와이파이 대비',
    hint: '네트워크가 죽으면 덱의 목업 화면만으로 진행 가능한지 리허설',
  },
  {
    head: '2회차 일정 잡기',
    hint: '오늘 끝나기 전에 날짜를 정해야 F12 수업이 안 밀린다',
  },
]

/** G38. 수업 전 준비 체크리스트 */
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

      <SlideBody>2부는 수강생 레포가 교재예요 — 레포 주소를 미리 못 받으면 실습 90분이 흔들려요.</SlideBody>
    </SlideLayout>
  )
}
