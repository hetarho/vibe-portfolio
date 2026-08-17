import type { DeckDef } from '@/features/slide-deck'
import { FrameSlide, StandbySlide, WorriesSlide } from './parts/opening'
import { AptitudeGuideSlide, AptitudeTestSlide } from './parts/aptitude'
import { BreakSlide, CareerTalkSlide, DayInLifeSlide, FieldMapSlide, ResultTalkSlide } from './parts/field-map'
import { PromptHandoffSlide } from './parts/handoff'
import { AiTrapSlide, RedefineSlide, TutorialHellSlide } from './parts/study-method'
import { LiveDemoSlide, TutorPromptSlide } from './parts/tutor'
import { AssignmentSlide, PrepChecklistSlide, SetupGuideSlide, SummarySlide, WarningSlide } from './parts/setup'

const PART = {
  standby: 'PART 0 · 시작 전',
  opening: 'PART 1 · 오프닝',
  aptitude: 'PART 1 · 성향 체크',
  map: 'PART 1 · 분야 지도',
  talk: 'PART 1 · 커리어 토크',
  rest: '휴식',
  why: 'PART 2 · 왜 공부법이 달라져야 하나',
  tutor: 'PART 2 · 튜터 프롬프트',
  setup: 'PART 2 · 세팅 & 경고',
  closing: 'PART 2 · 마무리',
  instructor: '강사용',
}

export const careerAndAiStudyDeck: DeckDef = {
  slides: [
    { id: 'C0', part: PART.standby, title: '시작 전 · 설치 확인', component: StandbySlide },
    { id: 'C1', part: PART.opening, title: '요즘 개발자들이 걸려 있는 자리', component: WorriesSlide },
    { id: 'C2', part: PART.opening, title: '시장은 참고자료, 성향은 엔진', component: FrameSlide },
    { id: 'C3', part: PART.aptitude, title: '⭐ 개발 성향 체크 13문항', component: AptitudeTestSlide },
    { id: 'C4', part: PART.aptitude, title: '채점 · 해석 가이드', component: AptitudeGuideSlide },
    { id: 'C5', part: PART.map, title: '결과 같이 뜯어보기', component: ResultTalkSlide },
    { id: 'C6', part: PART.map, title: '분야 지도', component: FieldMapSlide },
    { id: 'C7', part: PART.map, title: 'FE의 하루 vs BE의 하루', component: DayInLifeSlide },
    { id: 'C8', part: PART.talk, title: '커리어 패스 토크 (구두)', component: CareerTalkSlide },
    { id: 'C9', part: PART.rest, title: '휴식 5분', component: BreakSlide },
    { id: 'C10', part: PART.tutor, title: '⭐ 튜터 프롬프트 복사', component: PromptHandoffSlide },
    { id: 'C11', part: PART.why, title: '튜토리얼 지옥', component: TutorialHellSlide },
    { id: 'C12', part: PART.why, title: 'AI 시대의 함정', component: AiTrapSlide },
    { id: 'C13', part: PART.why, title: '공부의 목표 재정의', component: RedefineSlide },
    { id: 'C14', part: PART.tutor, title: '튜터 프롬프트 설계', component: TutorPromptSlide },
    { id: 'C15', part: PART.tutor, title: '라이브 데모', component: LiveDemoSlide },
    { id: 'C16', part: PART.setup, title: '세팅 가이드', component: SetupGuideSlide },
    { id: 'C17', part: PART.setup, title: '경고 2가지', component: WarningSlide },
    { id: 'C18', part: PART.closing, title: '오늘 남길 2줄', component: SummarySlide },
    { id: 'C19', part: PART.closing, title: '다음 수업까지', component: AssignmentSlide },
    { id: 'C20', part: PART.instructor, title: '수업 전 준비 체크리스트', component: PrepChecklistSlide },
  ],
  shortcuts: [
    { key: 'a', slideId: 'C3', label: '성향 체크' },
    { key: 'c', slideId: 'C10', label: '프롬프트 복사' },
    { key: 'd', slideId: 'C15', label: '데모' },
  ],
}
