import { Cloud, GitBranch, GitCommitHorizontal, History, Laptop, ShieldAlert } from 'lucide-react'
import { Fragment } from 'react'
import {
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

const TERMS = [
  {
    en: 'Repository (repo)',
    ko: '서비스 하나의 폴더 + 역사 전체',
    detail: 'Claude가 말끝마다 쓰는 단어예요. 서비스가 셋이면 레포도 보통 셋이에요',
  },
  {
    en: 'Commit',
    ko: '저장 지점 하나',
    detail: '“무엇을 왜 바꿨는지” 메모가 붙어요. 되돌릴 때 이 단위로 되돌려요',
  },
  {
    en: 'Push / Pull',
    ko: '올리기 / 받아오기',
    detail: '내 컴퓨터 ↔ GitHub 사이의 왕복이에요. 방향만 기억하면 돼요',
  },
  {
    en: 'origin',
    ko: 'GitHub 쪽 주소의 별명',
    detail: '출력에 계속 나오는 origin/main = “GitHub가 아는 main”이에요',
  },
]

/** G5. 용어 4개 · repo부터 pull까지 */
export function TermsSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <GitBranch className="size-8 text-accent md:size-11" />
        <SlideHeadline>용어는 4개만 알면 돼요</SlideHeadline>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {TERMS.map((term, index) => (
          <Panel
            key={term.en}
            tone={index === 2 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-3',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <PanelLabel tone={index === 2 ? 'accent' : 'muted'}>{term.en}</PanelLabel>
            <p className="text-deck-body font-bold text-content-strong">{term.ko}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{term.detail}</p>
          </Panel>
        ))}
      </div>

      <SlideBody>
        번역해서 외우지 마세요. Claude의 보고와 터미널 출력에 <Mark>영어 그대로</Mark> 나와요.
      </SlideBody>
    </SlideLayout>
  )
}

// LOG_SAMPLE의 역사 5줄 중 4개를 시간순으로 축약한 것 — 같은 레포의 같은 역사다.
const COMMIT_POINTS = ['클래스 소개 문구', '예약 버튼 겹침', '확인 메일', '이벤트 배너']

const SAVE_JUDGMENTS = [
  {
    icon: History,
    head: '세이브가 있으면 언제든 되돌릴 수 있어요',
    tail: '“망했다” 순간에도 잃는 건 마지막 세이브 이후뿐이에요',
  },
  {
    icon: ShieldAlert,
    head: '커밋 안 된 수정은 세이브 안 된 진행이에요',
    tail: '컴퓨터가 죽으면 같이 사라져요',
  },
]

/** G6. 커밋은 저장 지점 */
export function CommitSaveSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <GitCommitHorizontal className="size-8 text-accent md:size-11" />
        <SlideHeadline>커밋은 게임의 세이브 지점이에요</SlideHeadline>
      </div>

      <Panel tone="sunken" pad="lg" className="animate-rise-2 flex flex-col gap-5 md:gap-7">
        <PanelLabel>{REPO.name}의 최근 세이브 4개</PanelLabel>
        <div className="flex items-start gap-2 md:gap-4">
          {COMMIT_POINTS.map((point, index) => (
            <Fragment key={point}>
              <div className="flex flex-col items-center gap-3">
                <span
                  className={cx(
                    'size-5 rounded-full md:size-6',
                    index === COMMIT_POINTS.length - 1 ? 'animate-breathe bg-accent' : 'bg-surface-highlight',
                  )}
                  aria-hidden
                />
                <p
                  className={cx(
                    'text-center text-deck-caption',
                    index === COMMIT_POINTS.length - 1
                      ? 'font-bold text-content-strong'
                      : 'text-content-secondary',
                  )}
                >
                  {point}
                </p>
              </div>
              {index < COMMIT_POINTS.length - 1 ? (
                // 연결선은 선(border)이 아니라 얇은 면 — 점 중심 높이에 맞춰 내린다
                <span className="mt-2 h-1 flex-1 rounded-full bg-surface-highlight md:mt-2.5" aria-hidden />
              ) : null}
            </Fragment>
          ))}
        </div>
      </Panel>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {SAVE_JUDGMENTS.map((item, index) => (
          <Panel
            key={item.head}
            tone="raised"
            pad="lg"
            className={cx(
              'flex flex-col gap-3',
              index === 0 && 'animate-rise-3',
              index === 1 && 'animate-rise-4',
            )}
          >
            <item.icon className="size-8 text-content-muted md:size-10" />
            <p className="text-deck-body font-bold text-content-strong">{item.head}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{item.tail}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        세이브 버튼을 누르는 건 한 마디예요 — <Mark>&ldquo;방금 작업 커밋해줘&rdquo;</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

/** G7. ⭐ 저장했다 ≠ 올렸다 */
export function SaveVsUploadSlide() {
  return (
    <SlideLayout>
      <SlideKicker>오늘 제일 중요한 오해 교정</SlideKicker>
      <SlideHeadline>저장했다 ≠ 올렸다</SlideHeadline>

      <CompareGrid>
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-4">
          <PanelLabel>커밋 = 내 컴퓨터에 저장</PanelLabel>
          <Laptop className="size-8 text-content-muted md:size-10" />
          <p className="text-deck-body font-bold text-content-strong">이 컴퓨터의 역사에만 기록돼요</p>
          <p className="mt-auto text-deck-caption text-content-secondary">
            GitHub도, 다른 컴퓨터도, 배포도 아직 몰라요
          </p>
        </Panel>

        <Panel tone="accentSoft" pad="lg" className="animate-rise-2 flex flex-col gap-4">
          <PanelLabel tone="accent">푸시 = GitHub에 올림</PanelLabel>
          <Cloud className="size-8 text-accent md:size-10" />
          <p className="text-deck-body font-bold text-content-strong">이제 세 곳이 같은 코드를 봐요</p>
          <p className="mt-auto text-deck-caption text-content-secondary">
            다른 컴퓨터가 받아갈 수도, 배포가 시작될 수도 있어요
          </p>
        </Panel>
      </CompareGrid>

      <Panel tone="sunken" pad="md" className="animate-rise-3 flex flex-col gap-2">
        <PanelLabel>흔한 착각</PanelLabel>
        <p className="text-deck-body text-content-secondary">
          &ldquo;Claude가 커밋했댔으니 사이트에 반영됐겠지&rdquo; — 커밋과 푸시와 배포는{' '}
          <span className="font-semibold text-content-strong">세 개의 다른 단계</span>예요
        </p>
      </Panel>

      {/* accent 면 위라 Mark 대신 밑줄로 강조한다 (DESIGN.md) */}
      <SlideNote>
        커밋하고 푸시 안 한 코드는{' '}
        <span className="underline decoration-4 underline-offset-8">그 컴퓨터에만 있어요</span>
      </SlideNote>
    </SlideLayout>
  )
}
