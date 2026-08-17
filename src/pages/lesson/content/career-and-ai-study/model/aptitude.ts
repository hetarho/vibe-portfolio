import { useCallback, useState } from 'react'

export type Choice = 'A' | 'B'

export type AptitudeQuestion = {
  no: number
  /** tendency: 화면(A) vs 구조(B) · platform: 웹(A) vs 앱(B) */
  axis: 'tendency' | 'platform'
  a: string
  b: string
  /** 강사가 특히 짚어주는 문항 */
  pivotal?: boolean
}

export const QUESTIONS: AptitudeQuestion[] = [
  {
    no: 1,
    axis: 'tendency',
    a: '새 서비스를 쓰면 화면 디자인·전환 애니메이션에 먼저 눈이 가요',
    b: '"이 데이터는 어디에 어떻게 저장될까"가 먼저 궁금해요',
  },
  {
    no: 2,
    axis: 'tendency',
    a: '팀플에서 사용자가 보는 화면을 맡고 싶어요',
    b: '로그인·데이터 처리 같은 뒷단 로직을 맡고 싶어요',
  },
  {
    no: 3,
    axis: 'tendency',
    a: '내가 만든 화면을 친구가 "예쁘다"고 할 때 뿌듯할 것 같아요',
    b: '느리던 처리를 몇 배 빠르게 만들었을 때 뿌듯할 것 같아요',
    pivotal: true,
  },
  {
    no: 4,
    axis: 'tendency',
    a: '결과가 바로 눈에 보여야 힘이 나요',
    b: '눈에 안 보여도 로그와 숫자로 확인되면 충분해요',
  },
  {
    no: 5,
    axis: 'tendency',
    a: '디자이너 시안을 픽셀 단위로 맞추는 작업, 재밌을 것 같아요',
    b: '그건 좀 답답할 것 같아요',
  },
  {
    no: 6,
    axis: 'tendency',
    a: '"버튼이 안 눌려요" 문제를 파고들고 싶어요',
    b: '"데이터가 꼬였어요" 문제를 파고들고 싶어요',
    pivotal: true,
  },
  {
    no: 7,
    axis: 'tendency',
    a: '발표자료·포스터 만들 때 배치와 색을 오래 고민하는 편이에요',
    b: '자료구조·DB 같은 논리 과목이 상대적으로 잘 맞아요',
  },
  {
    no: 8,
    axis: 'tendency',
    a: '개발자도구(F12)로 남의 사이트 구조를 구경해본 적 있어요',
    b: '별로 안 궁금해요',
  },
  {
    no: 9,
    axis: 'tendency',
    a: '기기·화면 크기마다 어떻게 보일지 고민하는 게 좋아요',
    b: '규칙과 구조를 세우고 지키게 만드는 일이 좋아요',
  },
  {
    no: 10,
    axis: 'tendency',
    a: '새 UI 트렌드·인터랙션 소식에 끌려요',
    b: '새 아키텍처·인프라 기술 소식에 끌려요',
  },
  {
    no: 11,
    axis: 'platform',
    a: '링크 하나로 누구나 바로 들어오는 게 매력적이에요',
    b: '홈 화면 아이콘과 푸시 알림으로 일상에 들어가는 게 매력적이에요',
  },
  {
    no: 12,
    axis: 'platform',
    a: '고치면 바로 모든 사용자에게 반영되는 배포가 좋아요',
    b: '카메라·GPS·센서 같은 기기 기능을 다루는 게 재밌어요',
  },
  {
    no: 13,
    axis: 'platform',
    a: '하나 만들어서 PC·모바일 다 대응하는 효율이 좋아요',
    b: '스토어 심사가 있어도 네이티브의 매끄러운 경험을 만들고 싶어요',
  },
]

export const TENDENCY_COUNT = QUESTIONS.filter((question) => question.axis === 'tendency').length

export type Track = 'frontend' | 'backend' | 'fullstack'

export type AptitudeResult = {
  /** 1~10번 중 A를 고른 수 */
  aCount: number
  /** 11~13번 중 W(=A)를 고른 수 */
  wCount: number
  track: Track
  platform: 'web' | 'app'
}

export const TRACK_INFO: Record<Track, { label: string; line: string; detail: string }> = {
  frontend: {
    label: 'FE 성향 뚜렷',
    line: '화면과 사용자 경험 쪽',
    detail: '눈에 보이는 결과에서 동기를 얻는 편이에요. 프론트엔드부터 파보세요.',
  },
  backend: {
    label: 'BE 성향 뚜렷',
    line: '구조와 데이터 쪽',
    detail: '보이지 않는 곳의 규칙과 성능에 반응해요. 백엔드부터 파보세요.',
  },
  fullstack: {
    label: '아직 데이터 부족 · 풀스택형 출발',
    line: '둘 다 찍먹해보고 결정',
    detail: '처음 6개월 기초는 어차피 겹쳐요. 해보고 정하는 게 제일 빨라요.',
  },
}

export function score(answers: Array<Choice | null>): AptitudeResult | null {
  if (answers.some((answer) => answer === null)) return null

  const aCount = answers.slice(0, TENDENCY_COUNT).filter((answer) => answer === 'A').length
  const wCount = answers.slice(TENDENCY_COUNT).filter((answer) => answer === 'A').length
  const track: Track = aCount >= 7 ? 'frontend' : aCount <= 3 ? 'backend' : 'fullstack'

  return { aCount, wCount, track, platform: wCount >= 2 ? 'web' : 'app' }
}

const STORAGE_KEY = 'lesson:career-and-ai-study:aptitude'

function read(): Array<Choice | null> {
  const empty: Array<Choice | null> = QUESTIONS.map(() => null)
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length !== QUESTIONS.length) return empty
    return parsed.map((item) => (item === 'A' || item === 'B' ? item : null))
  } catch {
    return empty
  }
}

function write(answers: Array<Choice | null>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
  } catch {
    /* 저장 실패해도 진행에는 영향이 없다 */
  }
}

/**
 * 성향 체크 응답. 결과 해석 화면(다음 슬라이드)에서 다시 꺼내 쓰기 위해
 * localStorage에 보관한다.
 */
export function useAptitude() {
  const [answers, setAnswers] = useState<Array<Choice | null>>(read)

  const answer = useCallback((index: number, choice: Choice) => {
    setAnswers((list) => {
      const next = list.map((item, itemIndex) => (itemIndex === index ? choice : item))
      write(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    const empty: Array<Choice | null> = QUESTIONS.map(() => null)
    setAnswers(empty)
    write(empty)
  }, [])

  return { answers, answer, reset, result: score(answers) }
}
