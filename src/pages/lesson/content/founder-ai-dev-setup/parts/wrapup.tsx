import { CircleCheck, ClipboardList, FileText, Laptop, PartyPopper, Play, RotateCcw, Send, Wrench } from 'lucide-react'
import { useState } from 'react'
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

const HOMEWORK = [
  { icon: RotateCcw, head: '재부팅 뒤 재검수', detail: '버전 명령과 `claude doctor`를 새 터미널에서 한 번' },
  { icon: Play, head: '서비스 한 번 실행', detail: 'C:\\dev에서 열고 localhost가 뜨는 데까지' },
  { icon: FileText, head: 'SETUP-REPORT 보내기', detail: '비밀 값 없는 버전·경로·남은 문제만' },
  { icon: ClipboardList, head: '서비스 목록 적기', detail: '레포 주소 · 하는 일 · 가장 급한 순서 · 자주 나는 오류' },
]

/** W27. 다음 시간까지 가져올 것 */
export function HomeworkSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>다음 미팅의 출발점</SlideKicker>
          <SlideHeadline>숙제는 설치가 아니라 재현입니다</SlideHeadline>
        </div>
        <Chip>30분 안쪽</Chip>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {HOMEWORK.map((item, index) => (
          <Panel
            key={item.head}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="md"
            className={cx(
              'flex items-center gap-5',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <item.icon className="size-9 shrink-0 text-accent md:size-12" />
            <div className="min-w-0">
              <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
              <p className="text-deck-caption text-content-secondary">{item.detail}</p>
            </div>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        에러가 나면 해결해서 지우지 말고 · <Mark>명령 · 전체 오류 · 현재 폴더 · Git 상태</Mark>를 가져옵니다
      </SlideNote>
    </SlideLayout>
  )
}

const SUMMARY = [
  { head: '환경', body: '한 PC에 기준 환경 하나', tail: '도구를 섞지 않고 버전과 경로를 기록한다' },
  { head: '에러', body: '재설치보다 위치 확인', tail: '원문 → 폴더·셸·버전 → 한 원인 → 재검증' },
  { head: '에이전트', body: '사람 수보다 업무 레일 먼저', tail: '설명서 · 격리 · 테스트 · PR 뒤에 팀을 연다' },
]

/** W28. 오늘 남길 세 문장 */
export function SummarySlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <SlideHeadline>오늘 남길 세 문장</SlideHeadline>
        <Chip tone="accent">실행된 서비스 화면을 마지막으로 확인</Chip>
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
            <p className={cx('text-deck-caption font-semibold', index === 2 ? 'text-accent-contrast/70' : 'text-content-muted')}>
              {item.head}
            </p>
            <p className={cx('text-deck-lead font-bold', index === 2 ? 'text-accent-contrast' : 'text-content-strong')}>
              {item.body}
            </p>
            <p className={cx('mt-auto text-deck-caption', index === 2 ? 'text-accent-contrast/80' : 'text-content-secondary')}>
              {item.tail}
            </p>
          </Panel>
        ))}
      </div>

      <SlideNote>
        <span className="inline-flex items-center gap-3">
          <PartyPopper className="size-7 md:size-9" />
          오늘 만든 건 앱 하나가 아니라 <span className="underline decoration-4 underline-offset-8">AI 개발의 기준 작업실</span>입니다
        </span>
      </SlideNote>
    </SlideLayout>
  )
}

const PREP = [
  { head: 'Windows 사양과 버전 미리 받기', hint: 'Windows 10/11 · x64/ARM64 · RAM · 남은 디스크 · 업데이트/재부팅 상태' },
  { head: '기존 설치 화면 받기', hint: '`where.exe git node python claude`와 각 버전 — 중복 설치 가능성 파악' },
  { head: 'Claude 플랜 확인', hint: 'Claude Code 사용 가능한 유료/Console 계정인지, 브라우저 로그인 가능한지' },
  { head: 'GitHub 계정과 2단계 인증', hint: '비밀번호를 받지 말고 교수님 휴대폰으로 직접 승인' },
  { head: '실제 레포 주소와 실행 문서 확인', hint: 'package.json/pyproject, lockfile, Docker 필수 여부, 배포 환경을 강사가 먼저 읽기' },
  { head: 'GitHub에 백업됐는지 확인', hint: '미커밋 파일이 있으면 설치보다 백업을 먼저 — 폴더 이동은 그 뒤' },
  { head: '빠른 지원 리허설', hint: '강사 Microsoft 계정 로그인 · 6자리 코드 · 화면 공유 · 제어 승인 · 종료까지' },
  { head: '설치 실패 대안 준비', hint: '네트워크가 느리면 W12에서 멈추고 W19 프롬프트·SETUP-REPORT로 원격 이어가기' },
]

/** W29. 강사용 수업 전 체크리스트 */
export function InstructorPrepSlide() {
  const [checks, setChecks] = useState(() => PREP.map(() => false))
  const toggle = (index: number) =>
    setChecks((list) => list.map((value, itemIndex) => (itemIndex === index ? !value : value)))

  return (
    <SlideLayout align="top">
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 md:gap-6">
        <SlideHeadline>수업 전 준비</SlideHeadline>
        <Chip>강사용 · 전날 확인</Chip>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {PREP.map((item, index) => (
          <CheckRow key={item.head} checked={checks[index]} onToggle={() => toggle(index)} hint={item.hint}>
            {item.head}
          </CheckRow>
        ))}
      </div>

      <SlideBody>오늘의 성공 기준은 설치 개수가 아니라, 실제 레포가 새 터미널에서 한 번 정상 실행되는 것입니다.</SlideBody>
    </SlideLayout>
  )
}
