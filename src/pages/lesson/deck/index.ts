/**
 * 강의 콘텐츠(./content/**)와 lesson 화면이 쓰는 덱 모듈의 public API.
 * lesson 바깥에서는 이 경로를 직접 import하지 않는다.
 */
export type { DeckDef, DeckShortcut, SlideDef, SlideProps } from './model/types'
export { CheckRow } from './ui/CheckRow'
export { CountdownTimer } from './ui/CountdownTimer'
export { DeckShell } from './ui/DeckShell'
export {
  Chip,
  CompareGrid,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideBody,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideLead,
  SlideNote,
} from './ui/primitives'
