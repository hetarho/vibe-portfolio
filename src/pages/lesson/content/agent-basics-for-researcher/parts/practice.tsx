import { BarChart3, BookOpenCheck, FolderOpen, Globe2, MessageCircle, MessageSquareText, Terminal } from 'lucide-react'
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
import { PromptCopyButton } from '../../shared'
import chartData from '../model/chart-practice-data.md?raw'
import consultPrompt from '../model/chat-consult-practice-prompt.md?raw'

const PRACTICE_MAP = [
  {
    quote: '어떤 분석을 하면 의미가 있을지, 어떤 tool들을 사용하면 좋을지',
    practice: '실습 1 · 채팅 상의',
    output: '내 데이터의 분석 후보 표',
  },
  {
    quote: 'open되어 있는 database로부터 자료들을 불러오게 해서 분석을 시키고',
    practice: '실습 2 · 에이전트',
    output: '진짜 유전체 3개 + 첫 분석 표',
  },
  {
    quote: 'figure도 만들게 해보는',
    practice: '실습 3 · 에이전트',
    output: '논문 규격 figure PNG + 스크립트',
  },
]

/** B15. 실습 지도 · 요구사항 연결 */
export function PracticeMapSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>마지막 40분 · 보내주신 메시지 그대로</SlideKicker>
          <SlideHeadline>원하신 것이 실제로 만들어지는 걸 봅니다</SlideHeadline>
        </div>
        <Chip tone="accent">오늘은 3개로 맛보기</Chip>
      </div>

      <div className="flex flex-col gap-3">
        {PRACTICE_MAP.map((row, index) => (
          <Panel
            key={row.practice}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="sm"
            className={cx('grid items-center gap-3 md:grid-cols-9 md:gap-6', `animate-rise-${index + 1}`)}
          >
            <p className="text-deck-caption text-content-muted md:col-span-4">“{row.quote}”</p>
            <p className="text-deck-body font-bold text-content-strong md:col-span-2">{row.practice}</p>
            <p className="text-deck-caption font-semibold text-content-secondary md:col-span-3">→ {row.output}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        원하는 걸 오늘 다 만들지는 못해도 · <Mark>“일단 만드는 게 된다”</Mark>는 오늘 확인합니다
      </SlideNote>
    </SlideLayout>
  )
}

const CHAT_SETUP = [
  { head: '주소 입력', body: '브라우저에서 claude.ai 또는 chatgpt.com (평소 쓰는 쪽)' },
  { head: '로그인 후 새 대화', body: '왼쪽 위 “새 대화” 버튼. 무료 계정도 가능' },
  { head: '재료 열어두기', body: '균주 목록 · 메타데이터 엑셀을 옆에 (빈칸 채울 재료)' },
]

/** B16. 실습 1-① 접속과 준비 */
export function Chat1SetupSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>실습 1 · 아이디어 얻기 · 1/3</SlideKicker>
          <SlideHeadline>챗 서비스에 접속합니다</SlideHeadline>
          <div className="flex flex-col gap-3">
            {CHAT_SETUP.map((step, index) => (
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
        </div>

        <Panel tone="sunken" pad="lg" className="animate-rise-3 flex flex-col gap-4 lg:col-span-4">
          <div className="flex items-center gap-4">
            <Globe2 className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">시작 전 확인</PanelLabel>
          </div>
          {['파일은 올리지 않습니다. 글로만 설명합니다', '검체 정보는 검체번호만 씁니다 (환자 정보 금지)', '수업에서는 강사와 같은 화면으로 진행'].map((item) => (
            <p key={item} className="rounded-card bg-surface-raised p-3 text-deck-caption font-semibold text-content-primary shadow-raised md:p-4">
              {item}
            </p>
          ))}
        </Panel>
      </div>

      <SlideNote tone="quiet">
        보내주신 말 · “어떤 분석을 하면 의미가 있을지” · 그걸 지금 <Mark>직접 물어봅니다</Mark>
      </SlideNote>
    </SlideLayout>
  )
}

const PROMPT_BLANKS = [
  '균주: E. faecium [50]개 · 혈액 배양',
  '감수성: [내성 O / 감수성 O / 미정]',
  '시퀀싱: [진행 중 / FASTA / FASTQ]',
  '메타데이터: [검체번호 · 연월 · 병동 · MIC]',
  '마감: [10월 전]',
]

const PROMPT_ASKS = ['분석마다 “답하는 질문” 한 문장', '표로 정리 (분석 · 질문 · 도구 · 결과물)', '용어는 한 줄 해설', '내가 결정할 것 따로 모으기']

/** B17. 실습 1-② 상의 프롬프트 */
export function Chat2PromptSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>실습 1 · 아이디어 얻기 · 2/3</SlideKicker>
          <SlideHeadline>프롬프트를 붙여넣고 대괄호만 채웁니다</SlideHeadline>
          <Panel tone="sunken" pad="md" className="flex flex-col gap-2">
            <PanelLabel>채울 칸 다섯 개 · 모르면 “미정”</PanelLabel>
            <div className="overflow-x-auto">
              {PROMPT_BLANKS.map((line) => (
                <p key={line} className="font-mono text-deck-caption whitespace-pre text-content-secondary">
                  {line}
                </p>
              ))}
            </div>
          </Panel>
          <div className="grid gap-3 md:grid-cols-2">
            {PROMPT_ASKS.map((item, index) => (
              <Panel key={item} tone="raised" pad="sm" className="flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-10">
                  {index + 1}
                </span>
                <p className="text-deck-caption font-semibold text-content-secondary">{item}</p>
              </Panel>
            ))}
          </div>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-6 lg:col-span-4">
          <MessageSquareText className="size-10 text-accent md:size-14" />
          <PanelLabel tone="accent">상의 프롬프트 전문</PanelLabel>
          <p className="text-deck-body text-content-secondary">
            내 소개 · 데이터 다섯 칸 · 부탁 다섯 줄이 들어 있는 완성본. 복사해서 그대로 붙여넣으면 됩니다.
          </p>
          <PromptCopyButton size="md" label="상의 프롬프트 복사" text={consultPrompt} />
        </Panel>
      </div>

      <SlideNote tone="quiet">
        “미정”이라고 쓴 칸은 AI가 <Mark>확인 필요 목록</Mark>으로 따로 정리해줍니다
      </SlideNote>
    </SlideLayout>
  )
}

const FOLLOWUPS = [
  { head: '후속 질문 1 · 도구', body: '“1순위 분석의 표준 도구와 고른 이유, 대안 도구도 알려줘”' },
  { head: '후속 질문 2 · 용어', body: '“방금 나온 MLST를 비유로 다시 설명해줘” (모르는 용어 아무거나)' },
  { head: '저장', body: '답변의 표를 드래그 복사 → 내 문서에 붙여넣기. 대화 제목은 “논문 분석 상담”으로' },
]

/** B18. 실습 1-③ 후속 질문과 저장 */
export function Chat3FollowupSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>실습 1 · 아이디어 얻기 · 3/3</SlideKicker>
          <SlideHeadline>표를 받으면 두 번 더 묻고 저장합니다</SlideHeadline>
          <div className="flex flex-col gap-3">
            {FOLLOWUPS.map((step, index) => (
              <Panel key={step.head} tone={index === 2 ? 'accentSoft' : 'raised'} pad="sm" className={cx('flex flex-col gap-1 px-5', `animate-rise-${index + 1}`)}>
                <PanelLabel tone={index === 2 ? 'accent' : 'muted'}>{step.head}</PanelLabel>
                <p className="text-deck-body font-semibold text-content-primary">{step.body}</p>
              </Panel>
            ))}
          </div>
        </div>

        <Panel tone="sunken" pad="lg" className="animate-rise-3 flex flex-col gap-4 lg:col-span-4">
          <div className="flex items-center gap-4">
            <BookOpenCheck className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">이 작업에 유리한 서비스</PanelLabel>
          </div>
          {[
            { when: '이 실습 그대로', tools: 'Claude · ChatGPT · Gemini' },
            { when: '문헌까지 찾을 때', tools: 'Perplexity · Elicit (출처 표시형)' },
            { when: '깊게 파야 할 때', tools: '각 서비스의 Deep Research 기능' },
          ].map((row) => (
            <div key={row.when} className="rounded-card bg-surface-raised p-4 shadow-raised">
              <p className="text-deck-caption font-semibold text-content-muted">{row.when}</p>
              <p className="text-deck-body font-bold text-content-strong">{row.tools}</p>
            </div>
          ))}
        </Panel>
      </div>

      <SlideNote tone="quiet">
        완료 · <Mark>분석 후보 표 한 장</Mark>이 내 문서에 저장. 아이디어는 여기서 나옵니다
      </SlideNote>
    </SlideLayout>
  )
}

const FETCH_STEPS = [
  {
    head: '에이전트 시작',
    body: '터미널을 열고 claude 입력 (설치는 수업 전에 미리 해뒀습니다)',
  },
  {
    head: '작업실 만들기',
    body: '“바탕화면에 thesis-efm 폴더를 만들고 그 안에서 작업하자. data · results · figures 폴더도 만들어줘.”',
  },
  {
    head: '유전체 3개 받기',
    body: '“NCBI에서 Enterococcus faecium 조립 유전체 3개를 연도나 국가가 다르게 골라 data 폴더에 내려받고, accession · 연도 · 국가를 표로 보여줘.”',
  },
]

/** B19. 실습 2-① 유전체 3개 받기 */
export function Agent1FetchSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <SlideKicker>실습 2 · 자료 불러와 분석 · 1/3</SlideKicker>
          <SlideHeadline>공개 데이터베이스에서 진짜 유전체를 받아옵니다</SlideHeadline>
          <div className="flex flex-col gap-3">
            {FETCH_STEPS.map((step, index) => (
              <Panel key={step.head} tone="raised" pad="sm" className={cx('flex items-start gap-4', `animate-rise-${index + 1}`)}>
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

        <Panel tone="sunken" pad="lg" className="animate-rise-3 flex flex-col gap-4 lg:col-span-4">
          <div className="flex items-center gap-4">
            <Terminal className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">실행 중 지켜볼 것</PanelLabel>
          </div>
          {['실행 전에 계획을 먼저 말함', '필요한 도구는 스스로 설치. 승인을 물으면 읽고 y', '다운로드에 1~2분 걸릴 수 있음'].map((item) => (
            <p key={item} className="rounded-card bg-surface-raised p-3 text-deck-caption font-semibold text-content-primary shadow-raised md:p-4">
              {item}
            </p>
          ))}
        </Panel>
      </div>

      <SlideNote tone="quiet">
        보내주신 말 · “database로부터 자료들을 불러오게” · <Mark>지금 그 장면</Mark>입니다
      </SlideNote>
    </SlideLayout>
  )
}

/** B20. 실습 2-② 첫 분석 시키기 */
export function Agent2AnalyzeSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>실습 2 · 자료 불러와 분석 · 2/3</SlideKicker>
          <SlideHeadline>받은 유전체로 첫 분석을 시킵니다</SlideHeadline>
        </div>
        <Chip tone="accent">아래 문장을 그대로 입력</Chip>
      </div>

      <Panel tone="raised" pad="md" className="animate-rise-1 flex flex-col gap-2">
        <PanelLabel tone="accent">분석 명령</PanelLabel>
        <p className="text-deck-body font-semibold text-content-primary">
          “data 폴더의 유전체 3개 각각의 크기(bp), GC 비율(%), contig 수를 계산해서 표로 보여주고,
          results 폴더에 genome-stats.csv로 저장해줘.”
        </p>
      </Panel>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <Panel tone="sunken" pad="md" className="animate-rise-2 flex flex-col gap-2">
          <PanelLabel>이게 무슨 분석인가</PanelLabel>
          <p className="text-deck-caption font-semibold text-content-secondary">
            유전체 크기와 GC 비율은 논문 Table 1에 들어가는 기본 특성입니다. 균주 소개 표의 첫 열들이 지금 만들어지고
            있는 겁니다.
          </p>
        </Panel>
        <Panel tone="sunken" pad="md" className="animate-rise-3 flex flex-col gap-2">
          <PanelLabel>확인할 것</PanelLabel>
          <p className="text-deck-caption font-semibold text-content-secondary">
            표가 채팅에 뜨고, results 폴더에 genome-stats.csv 파일이 생깁니다. 균주 3개면 표도 3행이어야 합니다.
          </p>
        </Panel>
      </div>

      <SlideNote tone="quiet">
        도구 이름을 하나도 몰라도 됩니다 · <Mark>원하는 표를 문장으로</Mark> 쓰면 됩니다
      </SlideNote>
    </SlideLayout>
  )
}

const VERIFY_STEPS = [
  { head: '폴더 직접 열기', body: 'Finder(파일 탐색기) → 바탕화면 → thesis-efm' },
  { head: '파일 확인', body: 'data에 유전체 3개(.fasta 등) · results에 genome-stats.csv' },
  { head: '내용 물어보기', body: '“방금 표에서 GC 비율이 뭔지, 왜 보는지 쉽게 설명해줘”' },
]

/** B21. 실습 2-③ 결과 확인과 막혔을 때 */
export function Agent3VerifySlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>실습 2 · 자료 불러와 분석 · 3/3</SlideKicker>
          <SlideHeadline>완료 메시지 말고 폴더를 직접 엽니다</SlideHeadline>
          <div className="flex flex-col gap-3">
            {VERIFY_STEPS.map((step, index) => (
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
        </div>

        <Panel tone="sunken" pad="lg" className="animate-rise-3 flex flex-col gap-4 lg:col-span-4">
          <div className="flex items-center gap-4">
            <FolderOpen className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">막혔을 때 · 다른 도구</PanelLabel>
          </div>
          {[
            '오류가 나면 그대로 두고 “왜 실패했어? 쉽게 설명해줘”',
            '같은 종류: OpenAI Codex CLI (ChatGPT 구독) · Gemini CLI (무료 사용량 큼)',
            '평소 쓰는 챗과 같은 회사 제품이 적응이 빠름',
          ].map((item) => (
            <p key={item} className="rounded-card bg-surface-raised p-3 text-deck-caption font-semibold text-content-primary shadow-raised md:p-4">
              {item}
            </p>
          ))}
        </Panel>
      </div>

      <SlideNote tone="quiet">
        방금 한 것 · 공개 DB에서 자료를 불러와 <Mark>분석을 시키고 파일로 받은 것</Mark>. 원하던 그 흐름입니다
      </SlideNote>
    </SlideLayout>
  )
}

/** B22. 실습 3-① 논문 규격 figure 시키기 */
export function Figure1RequestSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <SlideKicker>실습 3 · figure 만들기 · 1/2</SlideKicker>
          <SlideHeadline>방금 만든 표로 figure를 시킵니다</SlideHeadline>

          <Panel tone="raised" pad="md" className="animate-rise-1 flex flex-col gap-2">
            <PanelLabel tone="accent">figure 명령 (이어서 그대로 입력)</PanelLabel>
            <p className="text-deck-body font-semibold text-content-primary">
              “results/genome-stats.csv로 세 균주의 유전체 크기와 GC 비율을 비교하는 막대그래프를 그려줘. 축 라벨과
              단위를 표시하고, 600dpi PNG로 figures 폴더에 저장하고, 그린 스크립트도 남겨줘.”
            </p>
          </Panel>

          <div className="flex flex-wrap gap-3">
            <Chip>600dpi = 인쇄 규격</Chip>
            <Chip>축 라벨 · 단위</Chip>
            <Chip tone="accent">스크립트 저장 = 수정 가능</Chip>
          </div>
        </div>

        <Panel tone="sunken" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <div className="flex items-center gap-4">
            <BarChart3 className="size-8 text-accent md:size-10" />
            <PanelLabel tone="accent">실습 2를 건너뛰었다면</PanelLabel>
          </div>
          <p className="text-deck-caption font-semibold text-content-secondary">
            아래 예시 표를 복사해 붙여넣고 “이 표를 CSV로 저장한 뒤 같은 figure를 그려줘”라고 하면 똑같이 진행됩니다.
          </p>
          <PromptCopyButton size="md" label="예시 표 복사" text={chartData} />
        </Panel>
      </div>

      <SlideNote tone="quiet">
        보내주신 말 · “figure도 만들게 해보는” · <Mark>지금 그 장면</Mark>입니다
      </SlideNote>
    </SlideLayout>
  )
}

const TODAY_OUTPUTS = [
  '분석 후보 표 (실습 1 · 채팅)',
  '진짜 유전체 3개 + 특성 표 CSV (실습 2)',
  '논문 규격 figure PNG + 스크립트 (실습 3)',
]

/** B23. 실습 3-② 오늘 만든 것과 확장 */
export function Figure2ScaleSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col gap-4">
        <SlideKicker>실습 3 · figure 만들기 · 2/2</SlideKicker>
        <SlideHeadline>3개로 된 것은 50개로도 됩니다</SlideHeadline>
      </div>

      <div className="grid items-stretch gap-6 md:gap-10 lg:grid-cols-9">
        <Panel tone="raised" pad="lg" className="animate-rise-1 flex flex-col gap-4 lg:col-span-4">
          <PanelLabel tone="accent">오늘 실제로 만들어진 것</PanelLabel>
          {TODAY_OUTPUTS.map((item, index) => (
            <p key={item} className="flex items-center gap-3 text-deck-body font-semibold text-content-primary">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-sunken text-deck-caption font-bold text-content-primary md:size-10">
                {index + 1}
              </span>
              {item}
            </p>
          ))}
        </Panel>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <Panel tone="sunken" pad="md" className="animate-rise-2 flex items-start gap-4">
            <MessageCircle className="size-7 shrink-0 text-content-muted md:size-9" />
            <p className="text-deck-caption font-semibold text-content-secondary">
              같은 걸 채팅에 시키면 그림이 화면 속에만 뜹니다. 파일 · 인쇄 규격 · 반복 수정은 에이전트의 영역입니다.
            </p>
          </Panel>
          <Panel tone="accentSoft" pad="md" className="animate-rise-3 flex items-start gap-4">
            <Terminal className="size-7 shrink-0 text-accent md:size-9" />
            <p className="text-deck-body font-semibold text-content-primary">
              내 데이터 50개가 오면 오늘 명령에서 <Mark>개수만 바꿔서</Mark> 다시 시키면 됩니다. “figure를 이틀 만에
              완성했다”는 이야기의 정체가 이겁니다.
            </p>
          </Panel>
        </div>
      </div>

      <SlideNote tone="quiet">
        오늘의 결론 · 원하시던 것들, <Mark>일단 만드는 게 됩니다</Mark>. 다음 회차부터 내 논문 걸로 합니다
      </SlideNote>
    </SlideLayout>
  )
}
