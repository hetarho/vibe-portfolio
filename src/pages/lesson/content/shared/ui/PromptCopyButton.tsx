import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { cx } from '../../../deck'
import tutorPrompt from '../model/tutor-prompt.md?raw'

export { tutorPrompt }

type Props = {
  size?: 'lg' | 'md'
  /** 덱마다 부르는 이름이 달라서 라벨만 바꿔 쓴다 */
  label?: string
  /** 복사할 프롬프트 본문. 기본값은 두 덱이 공유하는 학습 튜터 프롬프트 */
  text?: string
}

/**
 * 프롬프트 전문을 클립보드로 넘긴다.
 * 버튼은 모든 덱이 이것 하나만 쓴다 — 라벨과 본문만 바꿔 끼운다.
 * 여러 덱이 함께 쓰는 학습 튜터 프롬프트 본문은 model/tutor-prompt.md 한 곳에만 있고,
 * 덱 하나만 쓰는 프롬프트는 그 덱 폴더의 model/에 두고 text로 넘긴다.
 */
export function PromptCopyButton({ size = 'lg', label = '튜터 프롬프트 복사', text = tutorPrompt }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    void navigator.clipboard?.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cx(
        'flex items-center justify-center gap-4 rounded-panel font-bold transition duration-200 ease-deck',
        size === 'lg' ? 'px-5 py-4 text-deck-lead md:px-12 md:py-8' : 'px-4 py-3 text-deck-body md:px-8 md:py-5',
        copied
          ? 'bg-positive text-content-inverse shadow-lifted'
          : 'bg-accent text-accent-contrast shadow-lifted hover:bg-accent-strong',
      )}
    >
      {copied ? <Check className="size-7 md:size-9" strokeWidth={3} /> : <Copy className="size-7 md:size-9" />}
      {copied ? '복사했어요' : label}
    </button>
  )
}
