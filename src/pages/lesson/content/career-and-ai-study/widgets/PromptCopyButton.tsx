import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { cx } from '@/features/slide-deck'
import tutorPrompt from '../model/tutor-prompt.md?raw'

export { tutorPrompt }

type Props = {
  size?: 'lg' | 'md'
}

/** 튜터 프롬프트 전문을 클립보드로 넘긴다 */
export function PromptCopyButton({ size = 'lg' }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    void navigator.clipboard?.writeText(tutorPrompt)
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
      {copied ? <Check size={34} strokeWidth={3} /> : <Copy size={34} />}
      {copied ? '복사했어요' : '튜터 프롬프트 복사'}
    </button>
  )
}
