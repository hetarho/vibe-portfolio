import { CheckCircle2, TriangleAlert } from 'lucide-react'
import type { ComponentType } from 'react'
import type { SlideProps } from '../../../deck'
import { Chip, Mark, Panel, PanelLabel, SlideHeadline, SlideKicker, SlideLayout, SlideLead, SlideNote } from '../../../deck'
import type { ExamAnswer } from '../model/exam-answers'

function AnswerCode({ lines }: { lines: string[] }) {
  return (
    <pre className="overflow-x-auto rounded-card bg-surface-inverse p-4 text-deck-caption text-content-inverse shadow-lifted md:p-6">
      <code>
        {lines.map((line, index) => (
          <span key={`${index}-${line}`} className="block w-fit min-w-full whitespace-pre">{line}</span>
        ))}
      </code>
    </pre>
  )
}

/** E0. 제공된 시험문제로 전환 */
export function ExamIntroSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 2 · Java 중급문제</SlideKicker>
      <SlideHeadline size="hero">이제 같은 순서로 시험문제를 읽습니다</SlideHeadline>
      <SlideLead>서술형은 긴 설명보다 정의, 조건, 예외를 빠뜨리지 않는 것이 중요합니다.</SlideLead>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <Panel tone="raised" pad="lg" className="flex flex-col gap-4">
          <PanelLabel>1 · 동사 표시</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">정의하라 · 작성하라 · 결과를 쓰라</p>
        </Panel>
        <Panel tone="accentSoft" pad="lg" className="flex flex-col gap-4">
          <PanelLabel tone="accent">2 · 답의 칸 수</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">“3가지” · “모두” · (a)(b)(c)</p>
        </Panel>
        <Panel tone="raised" pad="lg" className="flex flex-col gap-4">
          <PanelLabel>3 · 채점어</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">전문용어 + 의미를 한 문장씩</p>
        </Panel>
      </div>

      <SlideNote tone="quiet">답을 안다는 것과 <Mark>채점 가능한 문장으로 쓰는 것</Mark>은 다릅니다</SlideNote>
    </SlideLayout>
  )
}

/** 정답을 보기 전에 실제로 풀어 보는 화면. */
export function makeExamQuestionSlide(problem: ExamAnswer): ComponentType<SlideProps> {
  return function ExamQuestionSlide() {
    return (
      <SlideLayout>
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>시험 문제 {problem.no} · {problem.area}</SlideKicker>
          <div className="flex flex-wrap gap-2">
            <Chip>{problem.level}</Chip>
            <Chip tone="accent">{problem.points}점</Chip>
          </div>
        </div>
        <SlideHeadline>{problem.title}</SlideHeadline>
        <Panel tone="accentSoft" pad="lg" className="flex flex-col gap-3">
          <PanelLabel tone="accent">문제</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">{problem.question}</p>
        </Panel>

        {problem.promptLines ? (
          <pre className="overflow-x-auto rounded-card bg-surface-inverse p-4 text-deck-caption text-content-inverse shadow-lifted md:p-7">
            <code>
              {problem.promptLines.map((line, index) => (
                <span key={`${index}-${line}`} className="block w-fit min-w-full whitespace-pre">{line || ' '}</span>
              ))}
            </code>
          </pre>
        ) : (
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            <Panel tone="raised" pad="md"><p className="text-deck-body font-semibold text-content-primary">문제의 동사에 표시하기</p></Panel>
            <Panel tone="sunken" pad="md"><p className="text-deck-body font-semibold text-content-primary">요구한 답의 개수 세기</p></Panel>
            <Panel tone="raised" pad="md"><p className="text-deck-body font-semibold text-content-primary">답안을 먼저 직접 쓰기</p></Panel>
          </div>
        )}

        <SlideNote tone="quiet">다음 화면으로 넘기기 전에 답안을 완성하세요 · 부분적으로 알아도 아는 만큼 먼저 씁니다</SlideNote>
      </SlideLayout>
    )
  }
}

export function makeExamAnswerSlide(problem: ExamAnswer): ComponentType<SlideProps> {
  return function ExamAnswerSlide() {
    return (
      <SlideLayout align="top">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5">
          <SlideKicker>문제 {problem.no} · {problem.area}</SlideKicker>
          <div className="flex flex-wrap gap-2">
            <Chip>{problem.level}</Chip>
            <Chip tone="accent">{problem.points}점</Chip>
          </div>
        </div>
        <SlideHeadline>{problem.title}</SlideHeadline>
        <SlideLead>{problem.question}</SlideLead>

        <div className="grid gap-4 lg:grid-cols-9 lg:gap-6">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Panel tone="raised" pad="md" className="flex flex-col gap-3">
              <PanelLabel tone="accent">모범 답안</PanelLabel>
              {problem.answer.map((line, index) => (
                <div key={line} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-positive md:size-6" />
                  <p className="text-deck-body font-semibold text-content-strong">{line}</p>
                </div>
              ))}
            </Panel>
            {problem.code ? <AnswerCode lines={problem.code} /> : null}
          </div>

          <div className="flex flex-col gap-4 lg:col-span-4">
            <Panel tone="raised" pad="sm" className="flex flex-col gap-2">
              <PanelLabel tone="accent">문제를 해체하면</PanelLabel>
              <p className="text-deck-caption font-semibold text-content-primary">{problem.approach}</p>
            </Panel>
            <Panel tone="sunken" pad="md" className="flex flex-col gap-3">
              <PanelLabel>채점 키워드</PanelLabel>
              {problem.grading.map((item) => (
                <p key={item} className="text-deck-caption font-semibold text-content-primary">· {item}</p>
              ))}
            </Panel>
            <Panel tone="accentSoft" pad="md" className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <TriangleAlert className="size-6 shrink-0 text-caution md:size-8" />
                <PanelLabel tone="accent">자주 놓치는 지점</PanelLabel>
              </div>
              <p className="text-deck-caption font-semibold text-content-strong">{problem.trap}</p>
            </Panel>
          </div>
        </div>
      </SlideLayout>
    )
  }
}
