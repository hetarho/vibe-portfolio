import { ClipboardCheck } from 'lucide-react'
import {
  Chip,
  Mark,
  Panel,
  PanelLabel,
  SlideBody,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
} from '@/features/slide-deck'
import { PromptCopyButton, tutorPrompt } from '../widgets/PromptCopyButton'

const PREVIEW_LINES = tutorPrompt.split('\n').slice(0, 6)

const CONTAINS = ['가르치는 순서 규칙', '레슨 파일 구조', '채점 기준과 근거', '세션 재개 스킬']

/** C10. PART 2 시작 — 튜터 프롬프트 건네기 */
export function PromptHandoffSlide() {
  return (
    <SlideLayout>
      <div className="grid items-center gap-12 lg:grid-cols-9">
        <div className="flex flex-col gap-7 lg:col-span-5">
          <SlideKicker>PART 2 시작</SlideKicker>
          <SlideHeadline>
            듣기 전에, <Mark>이것부터 복사해두세요</Mark>
          </SlideHeadline>
          <SlideBody>지금부터 45분 동안 설명할 게 전부 이 문서 안에 있어요.</SlideBody>
          <PromptCopyButton />
          <p className="flex items-center gap-3 text-deck-caption text-content-muted">
            <ClipboardCheck size={24} />
            맨 끝 &lsquo;학습 대상&rsquo; 칸을 채워야 시작돼요
          </p>
        </div>

        <Panel tone="sunken" pad="lg" className="flex flex-col gap-5 lg:col-span-4">
          <PanelLabel>이 안에 들어 있는 것</PanelLabel>
          <div className="flex flex-wrap gap-3">
            {CONTAINS.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
          <div className="flex flex-col gap-2 rounded-card bg-surface-base p-7">
            {PREVIEW_LINES.map((line, index) => (
              <p key={index} className="truncate font-mono text-deck-meta text-content-muted">
                {line || ' '}
              </p>
            ))}
            <p className="font-mono text-deck-meta text-accent">…</p>
          </div>
          <p className="text-deck-caption text-content-secondary">
            길어요. 지금 읽지 말고 복사만 해두세요.
          </p>
        </Panel>
      </div>
    </SlideLayout>
  )
}
