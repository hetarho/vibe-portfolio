import { Chip, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideLead } from '../../../deck'

/** 기존 200문제와 출처·원본 번호 체계를 구분하는 경계 화면. */
export function AcademyIntroSlide() {
  return (
    <SlideLayout>
      <SlideKicker>추가 문제 · 학원 제공 예시</SlideKicker>
      <SlideHeadline>학원에서 직접 준 문제 27개</SlideHeadline>
      <SlideLead>기존 예상문제 200개를 마친 뒤 이어집니다. 시험지 원본의 번호를 따라 JDBC 1~8번, SQL 1~19번으로 표시했습니다.</SlideLead>
      <Panel tone="raised" pad="lg" className="flex flex-col gap-4 border-2 border-caution">
        <PanelLabel tone="accent">원본 시험지 기준</PanelLabel>
        <div className="flex flex-wrap gap-3">
          <Chip>JDBC · 8문제</Chip>
          <Chip>SQL · 19문제</Chip>
        </div>
        <p className="text-deck-caption text-content-secondary">사진의 인쇄된 문항과 코드만 옮겼습니다. 손글씨 답안과 채점 표시는 포함하지 않았습니다.</p>
      </Panel>
    </SlideLayout>
  )
}
