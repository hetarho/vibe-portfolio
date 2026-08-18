import type { DeckDef } from '@/features/slide-deck'
import { careerAndAiStudyDeck } from '../content/career-and-ai-study'
import { vibeCodingWorkshopDeck } from '../content/vibe-coding-workshop'

export type Lesson = {
  /** URL에 쓰이는 값 — /lesson/{id} */
  id: string
  title: string
  subtitle: string
  /** 누구를 위한 수업인지 */
  audience: string
  duration: string
  /** 커리큘럼 요약 — 선택 화면 카드에 노출 */
  outline: string[]
  deck: DeckDef
}

/**
 * 강의 목록. 새 강의를 추가하려면 content/ 아래에 덱을 만들고 이 배열에 한 줄 추가한다.
 * 이 목록은 포트폴리오 내비게이션 어디에도 연결하지 않는다 (URL 직접 입력 전용).
 */
export const lessons: Lesson[] = [
  {
    id: 'vibe-coding-workshop',
    title: '바이브코딩 워크숍',
    subtitle: '말로 만드는 나의 첫 웹 앱',
    audience: '1대1 · 코드를 처음 만지는 학생',
    duration: '2시간 · 22화면',
    outline: ['웹 앱이란 무엇인가', 'AI 에이전트의 작동 방식', '프롬프트 공식', '직접 만들고 고치기'],
    deck: vibeCodingWorkshopDeck,
  },
  {
    id: 'career-and-ai-study',
    title: '진로 찾기 & AI 시대 개발 공부법',
    subtitle: 'FE·BE 진입 전략부터 기본기 학습 레포까지',
    audience: '1대1 · 진로 미정인 개발 지망 대학생',
    duration: '2시간 · 27화면',
    outline: [
      'FE·BE 시장 진입 전략',
      '프로덕트 엔지니어라는 목표',
      '개발 기본기가 먼저인 이유',
      '학습 프로젝트 프롬프트 세팅',
    ],
    deck: careerAndAiStudyDeck,
  },
]

export function findLesson(id: string) {
  return lessons.find((lesson) => lesson.id === id)
}
