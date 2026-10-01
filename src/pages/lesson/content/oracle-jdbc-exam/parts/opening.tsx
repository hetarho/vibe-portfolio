import { Brain, Eye, ListChecks, PencilLine } from 'lucide-react'
import {
  Chip,
  Mark,
  Panel,
  PanelLabel,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideLead,
  SlideNote,
} from '../../../deck'
import { PROBLEMS } from '../model/problems'
import { ACADEMY_PROBLEMS } from '../model/academy-problems'
import { CHEAT_SHEET, JOIN_KEYS, UNITS } from '../model/units'
import { RichText } from '../ui/RichText'
import { SampleTable } from '../ui/SampleTable'
import { TableList } from '../ui/TableList'

const LEVELS = [
  { level: '하급', points: 6, line: '용어 하나, 함수 결과 하나를 정확히 쓰는 문제입니다.' },
  { level: '중급', points: 11, line: 'SQL 한 문장을 쓰거나 두세 가지를 나눠 서술하는 문제입니다.' },
  { level: '상급', points: 16, line: '조건 여러 개를 한 문장에 담거나 JDBC 코드를 끝까지 쓰는 문제입니다.' },
] as const

/** S1. 범위와 배점 */
export function CoverSlide() {
  return (
    <SlideLayout>
      <SlideKicker>Oracle SQL~JDBC 시험 대비 · 예상 {PROBLEMS.length}문제 + 학원 예시 {ACADEMY_PROBLEMS.length}문제</SlideKicker>
      <SlideHeadline size="hero">예상문제 뒤에 학원 예시까지 풉니다</SlideHeadline>
      <SlideLead>
        먼저 22화면으로 범위를 짚고 {UNITS.length}단원 예상문제 {PROBLEMS.length}개를 풉니다. 이어서 학원에서 직접 준 예시 문제 {ACADEMY_PROBLEMS.length}개를 별도 구간에서 풉니다.
      </SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {LEVELS.map((item) => (
          <Panel key={item.level} tone="raised" pad="lg" className="flex flex-col gap-3">
            <PanelLabel tone="accent">
              {item.level} · {item.points}점
            </PanelLabel>
            <p className="text-deck-title font-bold tabular-nums text-content-strong">
              {PROBLEMS.filter((problem) => problem.level === item.level).length}문제
            </p>
            <p className="text-deck-caption font-semibold text-content-secondary">{item.line}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        위 난이도와 배점별 개수는 예상문제 200개 기준입니다. 학원 예시에는 배점을 붙이지 않았습니다. <Mark>예상문제의 배점은 실제 시험 배점이 아닙니다</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const STEPS = [
  {
    icon: PencilLine,
    label: '1 · 왼쪽 칸에 쓰기',
    head: '아는 만큼 먼저 씁니다',
    line: 'SQL은 실행할 수 있게 끝까지, 서술형은 물은 개수만큼 줄을 나눠 씁니다. 쓴 답은 이 브라우저에 남습니다.',
  },
  {
    icon: Eye,
    label: '2 · 정답 보기',
    head: '오른쪽 버튼으로 엽니다',
    line: '정답과 해설이 열립니다. 확인한 뒤 정답 닫기로 다시 가릴 수 있습니다.',
  },
  {
    icon: ListChecks,
    label: '3 · 스스로 채점',
    head: '세 가지 중 하나를 고릅니다',
    line: '맞혔다 · 애매하다 · 못 썼다. 고른 결과는 마지막 정리 화면에 단원별로 모입니다.',
  },
]

/** S2. 한 화면에서 하는 일 세 가지와 조작법 */
export function HowToSlide() {
  return (
    <SlideLayout>
      <SlideKicker>사용법 · 한 화면에 한 문제</SlideKicker>
      <SlideHeadline>먼저 쓰고, 정답은 그다음에 엽니다</SlideHeadline>
      <SlideLead>눈으로만 읽고 넘기면 아는 것 같아도 시험지 앞에서는 손이 나가지 않습니다. 짧아도 직접 쓰고 넘어갑니다.</SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {STEPS.map((step) => (
          <Panel key={step.label} tone="raised" pad="lg" className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <step.icon className="size-7 shrink-0 text-accent md:size-9" />
              <PanelLabel tone="accent">{step.label}</PanelLabel>
            </div>
            <p className="text-deck-body font-bold text-content-strong">{step.head}</p>
            <p className="text-deck-caption font-semibold text-content-secondary">{step.line}</p>
          </Panel>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <Chip tone="accent">→ 다음 화면</Chip>
        <Chip>← 이전 화면</Chip>
        <Chip>O 전체 목록</Chip>
        <Chip>F 전체화면</Chip>
        <Chip>K 개념 한 바퀴</Chip>
        <Chip>C 함정 열 줄</Chip>
        <Chip>T 테이블과 표본</Chip>
        <Chip>Q 1번 문제</Chip>
        <Chip>R 정리</Chip>
        <Chip>A 학원 예시</Chip>
      </div>

      <SlideNote tone="quiet">
        답 칸에 글자를 치는 동안에는 <Mark>화살표를 눌러도 화면이 넘어가지 않습니다</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

/** S3. 열두 단원의 범위 */
export function MapSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>단원 지도 · {UNITS.length}단원</SlideKicker>
      <SlideHeadline>열두 단원을 차례대로 풉니다</SlideHeadline>
      <SlideLead>단원마다 첫 화면에 핵심 정리가 있습니다. 문제로 들어가기 전에 한 번 읽고 시작합니다.</SlideLead>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {UNITS.map((unit) => (
          <li key={unit.key}>
            <Panel tone="raised" pad="sm" className="flex h-full items-start gap-3 md:gap-4">
              <span className="text-deck-lead font-bold text-accent">{unit.key}</span>
              <div className="flex min-w-0 flex-col gap-1">
                <p className="text-deck-caption font-bold text-content-strong">{unit.title}</p>
                <p className="text-deck-meta tabular-nums text-content-muted">
                  {unit.start}~{unit.end}번 · {unit.end - unit.start + 1}문제
                </p>
              </div>
            </Panel>
          </li>
        ))}
      </ul>

      <SlideNote tone="quiet">
        O 키로 여는 목록에서 <Mark>Q17이 문제집 17번</Mark>입니다. 다시 볼 번호는 거기서 바로 찾아갑니다
      </SlideNote>
    </SlideLayout>
  )
}

/** S4. 문제에 쓰는 테이블과 결과 예측용 표본 (T 키) */
export function TablesSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>테이블과 표본 · T 키로 언제든</SlideKicker>
      <SlideHeadline>문제에 나오는 테이블과 표본</SlideHeadline>

      <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <TableList keys={['EMPLOYEE', 'DEPARTMENT', 'JOB', 'LOCATION']} label="따로 말이 없으면 쓰는 테이블" />
          <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
            <PanelLabel tone="accent">잇는 열</PanelLabel>
            {JOIN_KEYS.map((line) => (
              <p key={line} className="font-mono text-deck-caption wrap-anywhere text-content-strong">
                {line}
              </p>
            ))}
          </Panel>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-4">
          <SampleTable />
          <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
            <PanelLabel tone="accent">표본을 읽는 법</PanelLabel>
            <p className="text-deck-caption font-semibold text-content-strong">
              결과 예측 문제는 이 네 행으로 계산합니다. 실제 수업 데이터가 아닙니다.
            </p>
            <p className="text-deck-caption text-content-secondary">
              결과의 행 순서는 ORDER BY가 있을 때만 보장됩니다.
            </p>
          </Panel>
        </div>
      </div>

      <SlideNote tone="quiet">
        각 문제는 독립적입니다. <Mark>앞 문제에서 만든 테이블이나 바꾼 값은 다음 문제로 이어지지 않습니다</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

/** S5. 시험 직전에 읽을 함정 열 줄 (C 키) */
export function CheatSheetSlide() {
  return (
    <SlideLayout align="top">
      <SlideKicker>함정 열 줄 · C 키로 언제든</SlideKicker>
      <SlideHeadline>시험장에 들어가기 전에 읽을 열 줄</SlideHeadline>

      <div className="grid gap-2 md:gap-3 lg:grid-cols-2">
        {CHEAT_SHEET.map((item, index) => (
          <Panel key={item.label} tone="raised" pad="sm" className="flex items-start gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-deck-meta font-bold text-accent-contrast md:size-8">
              {index + 1}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="text-deck-meta font-bold tracking-wide text-accent uppercase">{item.label}</p>
              <p className="text-deck-caption font-semibold text-content-strong">
                <RichText text={item.line} />
              </p>
            </div>
            <span className="shrink-0 text-deck-meta font-semibold tabular-nums text-content-muted">
              {item.refs.join(' · ')}
            </span>
          </Panel>
        ))}
      </div>

      <Panel tone="inverse" pad="sm" className="flex items-center gap-3">
        <Brain className="size-6 shrink-0 md:size-7" />
        <p className="text-deck-caption font-bold">
          {PROBLEMS.length}문제에서 되풀이되는 함정을 줄였습니다. 줄 끝 번호가 그 함정을 다루는 문제이고, C 키로 언제든
          돌아옵니다.
        </p>
      </Panel>
    </SlideLayout>
  )
}
