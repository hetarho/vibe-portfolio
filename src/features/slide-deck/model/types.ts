import type { ComponentType } from 'react'

export type SlideProps = {
  /** 현재 화면에 떠 있는 슬라이드인지 여부 */
  active: boolean
}

export type SlideDef = {
  /** 설계서 기준 화면 코드 (예: S6) */
  id: string
  /** 상단 좌측에 노출되는 파트명 (예: PART 1 · 개념) */
  part: string
  /** 전체 목록(O 키)에 노출되는 제목 */
  title: string
  component: ComponentType<SlideProps>
}

export type DeckShortcut = {
  /** 소문자 단축키 (예: p) */
  key: string
  slideId: string
  label: string
}

export type DeckDef = {
  slides: SlideDef[]
  /** 강의 중 즉시 되돌아갈 화면 단축키 */
  shortcuts?: DeckShortcut[]
}
