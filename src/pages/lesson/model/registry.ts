import type { DeckDef } from '../deck'
import { careerAndAiStudyDeck } from '../content/career-and-ai-study'
import { codeReadingForPmDeck } from '../content/code-reading-for-pm'
import { founderAiDevSetupDeck } from '../content/founder-ai-dev-setup'
import { gitReadingForFounderDeck } from '../content/git-reading-for-founder'
import { mvpLifecycleForFounderDeck } from '../content/mvp-lifecycle-for-founder'
import { personalAiAgentsDeck } from '../content/personal-ai-agents'
import { vibeCodingFirstAppDeck } from '../content/vibe-coding-first-app'

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

/** 강의 목록. 새 강의를 추가하려면 content/ 아래에 덱을 만들고 이 배열에 한 줄 추가한다. */
export const lessons: Lesson[] = [
  {
    id: 'personal-ai-agents',
    title: '내 일을 맡기는 AI 에이전트 첫 수업',
    subtitle: 'Zonta 오리엔테이션 PPT부터 매일 쓰는 영어 코치까지',
    audience: '1대1 · 발표 준비가 급한 비개발자 · AI 입문',
    duration: '2시간 · 29화면',
    outline: [
      '에이전트란 무엇이고 사람은 무엇을 결정하는가',
      '공식 출처 조사와 근거표 만들기',
      'Zonta 오리엔테이션 PPT 제작·검수 실습',
      '매일 15분 영어공부 에이전트 만들기',
      'Zonta·영어·투자·전시기획 작업실 설계',
    ],
    deck: personalAiAgentsDeck,
  },
  {
    id: 'vibe-coding-first-app',
    title: '바이브코딩 첫 수업',
    subtitle: '말로 만들어 내 컴퓨터에서 띄우는 첫 웹 앱',
    audience: '1대1 · 개발을 한 번도 안 해본 분',
    duration: '2시간 · 35화면',
    outline: [
      '개발이란 무엇인가',
      '터미널과 localhost',
      'AI 에이전트와 프롬프트 공식',
      '직접 만들어 로컬에서 띄우기',
      '혼자 공부하는 법',
    ],
    deck: vibeCodingFirstAppDeck,
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
  {
    id: 'code-reading-for-pm',
    title: 'PM을 위한 코드 읽기',
    subtitle: '쓰지 않아도 읽고 판단하는 2시간',
    audience: '1대1 · 미국 거주 대학생 · PM 지망',
    duration: '2시간 · 29화면 · 이후 6주 자습',
    outline: [
      '읽기와 쓰기는 다른 능력',
      '함수 두 개 · 조건과 반복',
      '실제 레포에서 PR diff 읽기',
      '3문장 요약과 6주 자습 커리큘럼',
    ],
    deck: codeReadingForPmDeck,
  },
  {
    id: 'git-reading-for-founder',
    title: '창업자를 위한 Git/GitHub 읽기',
    subtitle: '내 코드가 어디까지 갔는지 스스로 판단하는 실전 수업',
    audience: '1대1 · AI로 웹서비스를 운영하는 비개발자 창업자',
    duration: '2시간 40분 · 39화면 · 전체 2회 중 1회차',
    outline: [
      '코드가 사는 세 곳 — 내 컴퓨터·GitHub·배포',
      'status·log·remote 출력 해석',
      '여러 컴퓨터 중 어디가 최신인지 판단',
      'Branches·PR에서 main 반영 여부 검토',
      'Actions·Deployments 성공/실패 읽기',
      '"반영이 안 돼요" 6단계 진단과 안전한 복구',
    ],
    deck: gitReadingForFounderDeck,
  },
  {
    id: 'founder-ai-dev-setup',
    title: '창업자를 위한 AI 개발 작업실 세팅',
    subtitle: 'Windows 세팅부터 코딩·미국 마케팅·상시 에이전트의 청사진까지',
    audience: '1대1 · Claude Code로 서비스를 운영하는 비개발자 창업자',
    duration: '2시간 · 30화면 · Git 수업 후속편',
    outline: [
      '사람은 VS Code·Claude Code만 설치',
      '한 프롬프트로 Git·Node·Python 자동 설치',
      'AI 코딩 에이전트 조직과 작업 흐름 설계',
      '미국 마케팅 채널과 자동화 가능성 탐색',
      'Cloud Routines·관리형 자동화·VPS·Hermes 비교',
      '작은 파일럿부터 시작하는 6회 로드맵',
    ],
    deck: founderAiDevSetupDeck,
  },
  {
    id: 'mvp-lifecycle-for-founder',
    title: '창업자를 위한 개발 생명주기와 에이전트',
    subtitle: '기획부터 운영까지 한 바퀴를 배우고, 내 아이디어로 혼자 MVP를 만들 수 있게',
    audience: '1대1 · MVP를 만들려는 비개발자 창업자',
    duration: '2시간 · 37화면 · 전체 2회 중 1회차',
    outline: [
      '문제 한 문장 · 기능 자르기 · 가설과 숫자',
      '화면의 4가지 상태 · 표·선·규칙 · 헌법',
      '좋은 코드란 · 수용 기준 쓰는 법 · 유지보수 우선순위',
      '콘솔 연동을 Claude Code에게 시키고 검증하기',
      '내 아이디어로 혼자 할 8단계 + MVP 코치 프롬프트',
    ],
    deck: mvpLifecycleForFounderDeck,
  },
]

export function findLesson(id: string) {
  return lessons.find((lesson) => lesson.id === id)
}
