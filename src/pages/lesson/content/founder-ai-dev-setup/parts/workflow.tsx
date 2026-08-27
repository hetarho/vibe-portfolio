import { ClipboardCheck } from 'lucide-react'
import {
  Mark,
  Panel,
  PanelLabel,
  SlideBody,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideNote,
} from '../../../deck'
import { PromptCopyButton } from '../../shared'
import setupPrompt from '../model/windows-setup-prompt.md?raw'

/** W8. Claude Code에 붙여 넣을 자동 세팅 프롬프트 */
export function PromptHandoffSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-6 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <SlideKicker>두 개를 설치한 다음 바로 할 일</SlideKicker>
          <SlideHeadline>이 프롬프트 하나를 Claude에게 줍니다</SlideHeadline>
          <SlideBody>
            Claude가 현재 상태를 확인하고, 빠진 개발 도구를 직접 설치한 뒤 버전과 경로까지 검증합니다.
            교수님은 UAC·브라우저 로그인·재시작이 필요할 때만 응답합니다.
          </SlideBody>

          <div className="grid gap-3 md:grid-cols-2">
            {[
              ['1', '현재 환경 자동 확인'],
              ['2', '누락 도구 자동 설치'],
              ['3', '버전·경로 자동 검증'],
              ['4', 'SETUP-REPORT 남기기'],
            ].map(([number, label]) => (
              <Panel key={number} tone="sunken" pad="sm" className="flex items-center gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-highlight text-deck-caption font-bold text-content-primary md:size-10">
                  {number}
                </span>
                <p className="text-deck-caption font-semibold text-content-secondary">{label}</p>
              </Panel>
            ))}
          </div>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-6 lg:col-span-4">
          <ClipboardCheck className="size-10 text-accent md:size-14" />
          <PanelLabel tone="accent">Windows 개발 환경 담당자</PanelLabel>
          <p className="text-deck-body text-content-secondary">설치·경로·계정·검증·보고서까지 한 번에 이어지는 전체 프롬프트</p>
          <PromptCopyButton size="md" label="환경 세팅 프롬프트 복사" text={setupPrompt} />
        </Panel>
      </div>

      <SlideNote tone="quiet">
        다른 Windows PC에서도 순서는 같습니다 · <Mark>VS Code → Claude Code → 프롬프트 붙여넣기</Mark>
      </SlideNote>
    </SlideLayout>
  )
}
