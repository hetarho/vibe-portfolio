import type { DeckDef } from '../deck'
import { agentBasicsForResearcherDeck } from '../content/agent-basics-for-researcher'
import { agentBuildForHrDeck } from '../content/agent-build-for-hr'
import { aiWorkspaceThreeTasksDeck } from '../content/ai-workspace-three-tasks'
import { careerAndAiStudyDeck } from '../content/career-and-ai-study'
import { codeReadingForPmDeck } from '../content/code-reading-for-pm'
import { founderAiDevSetupDeck } from '../content/founder-ai-dev-setup'
import { gitReadingForFounderDeck } from '../content/git-reading-for-founder'
import { mvpLifecycleForFounderDeck } from '../content/mvp-lifecycle-for-founder'
import { personalAiAgentsDeck } from '../content/personal-ai-agents'
import { vibeCodingFirstAppDeck } from '../content/vibe-coding-first-app'
import { codeThinkingBasicsDeck } from '../content/code-thinking-basics'
import { javaThinkingWorkshopDeck } from '../content/java-thinking-workshop'

export type Lesson = {
  /** URL에 쓰이는 값 — /lesson/{id} */
  id: string
  /**
   * 강의 체계 버전.
   * V1: 초기의 덱별 개별 제작 체계. V2: 공통 개념 화면(content/shared의 AI·에이전트 파트)을
   * 조립해 쓰는 체계. 새 강의는 V2로 만든다.
   */
  version: 'V1' | 'V2'
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
    id: 'agent-build-for-hr',
    version: 'V2',
    title: 'HR 담당자를 위한 에이전트 개발 첫 수업',
    subtitle: '엑셀 평정지 1,000장을 웹 평정 화면으로 · 개념부터 화면이 실제로 뜰 때까지',
    audience: '1대1 · 인사평정을 관할하는 HR 담당자 · 개발 경험 없음',
    duration: '2시간 · 30화면 · 전체 2회 중 1회차',
    outline: [
      'AI란 · 에이전트란 · 공통 개념 여섯 장',
      '지금의 엑셀 집계와, 만들려는 화면 두 개',
      '맡길 일과 내가 정할 일 · 만들 것을 적는 여섯 칸',
      '인사 데이터는 넣지 않는다 · 되돌릴 수 있게 해 둔다',
      '“다 됐습니다”를 직접 확인하는 법과 막혔을 때의 규칙',
      '실습 · 직위 선택부터 자동 집계와 제출 현황까지',
      '시제품과 실제 운영의 차이 · 집에서 쓰는 코치 프롬프트',
    ],
    deck: agentBuildForHrDeck,
  },
  {
    id: 'java-thinking-workshop',
    version: 'V2',
    title: 'Java 문제풀이와 개발자적 사고',
    subtitle: 'Java 시험 10문제를 먼저 풀고, 남는 시간에는 정답이 나온 이유를 여러 방식으로 설명하기',
    audience: '1대1 · Java 문법을 한 번 배운 초급 학습자',
    duration: '2시간 30분 · 47화면 · 문제풀이편',
    outline: [
      '먼저 · 제공된 Java 시험 10문제 직접 풀기',
      '시험 해설 · 문제 해체·모범 답안·채점 키워드',
      '남는 시간 · 생활 문제를 코드 없이 말로 설명하기',
      '한 정답에 도달하는 서로 다른 세 가지 사고 경로',
      '숫자가 바뀌어도 통하는 한글 규칙 만들기',
    ],
    deck: javaThinkingWorkshopDeck,
  },
  {
    id: 'code-thinking-basics',
    version: 'V2',
    title: '문법을 묶는 개념과 공부법',
    subtitle: '“프로그램은 상태를 바꾸는 절차다” 하나로 묶고, 사고 도구 넷과 하루 30분 루틴까지',
    audience: '1대1 · 자바 기초 과정 수강생 · 기초 1회차',
    duration: '2시간 · 27화면 · 1회차',
    outline: [
      '어려웠던 이유 · 재인과 재생, 그리고 묶이지 않은 조각들',
      '이미 갖고 있는 것 · 수학적 사고는 계산이 아니다',
      '사고방식 · 개념 하나와 도구 넷(분해·경우·불변식·작은 경우)',
      '공부법 · 꺼내는 연습만 공부로 치는 기준',
      '앞으로의 길 · 지금 배우는 것이 이어지는 자리',
      '남는 시간에 도구를 문제 하나에 적용',
      '집에서 쓰는 도구 · 강사 PPT를 그대로 복습 문제집으로',
    ],
    deck: codeThinkingBasicsDeck,
  },
  {
    id: 'ai-workspace-three-tasks',
    version: 'V2',
    title: '내 일 세 가지로 도구 익히기',
    subtitle: '설명은 짧게, 직접 쳐보면서 평형 신청 · 오리엔테이션 · 상담 정리를 끝내기',
    audience: '1대1 · 재건축과 NGO 일이 겹친 비개발자 · 2회차',
    duration: '2시간 · 31화면 · 2회차',
    outline: [
      'AI란 · 에이전트란 · 공통 개념 여섯 장',
      '처음 시켜보기 · 대충 물어본 답과 여섯 가지를 얹은 답 비교',
      '도구 다섯과 브라우저 둘 · 로그인 자료를 읽히는 쪽 고르기',
      '작업실 세팅 · 프로젝트 셋 · 코워크 · 크롬 옆창',
      '실습 1 · 재건축 평형 비교표와 물어볼 것 목록',
      '실습 2 · 오리엔테이션 근거표와 발표 파일',
      '실습 3 · 상담 정리 스킬 만들어 써보기',
      '집에서 복습하고 막혔을 때 질문하는 법',
    ],
    deck: aiWorkspaceThreeTasksDeck,
  },
  {
    id: 'agent-basics-for-researcher',
    version: 'V2',
    title: '연구자를 위한 AI 에이전트 기초',
    subtitle: 'AI·에이전트 개념부터, 원하는 여섯 가지의 구현 지도까지',
    audience: '1대1 · 임상미생물학 대학원생 · AI 입문',
    duration: '2시간 30분 · 23화면 · 기초 1회차',
    outline: [
      'AI란 · 개념부터 실무 사용까지',
      '에이전트란 · 챗봇과의 차이와 일하는 방식',
      '수강생이 원하는 것 여섯 가지 확인',
      '각각의 구현 방법과 AI/에이전트 판정',
      '판정대로 해보는 간단 실습과 서비스 추천',
    ],
    deck: agentBasicsForResearcherDeck,
  },
  {
    id: 'personal-ai-agents',
    version: 'V1',
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
    version: 'V1',
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
    version: 'V1',
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
    version: 'V1',
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
    version: 'V1',
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
    version: 'V1',
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
    version: 'V1',
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
