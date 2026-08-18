import { Check, Copy, Play, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import {
  Chip,
  CountdownTimer,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideBody,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideNote,
} from '@/features/slide-deck'
import { MenuRoulette } from '../widgets/MenuRoulette'

const BUILDER_FIELDS = [
  { key: 'what', label: '무엇을', placeholder: '할 일 목록 웹 앱' },
  { key: 'features', label: '기능 1·2·3', placeholder: '추가 · 완료 체크 · 삭제' },
  { key: 'mood', label: '디자인 느낌', placeholder: '파스텔 톤의 둥근 디자인' },
] as const

type BuilderKey = (typeof BUILDER_FIELDS)[number]['key']

/** S12. ⭐ 프롬프트 공식 — 실습 내내 P 키로 돌아오는 화면 */
export function PromptFormulaSlide() {
  const [values, setValues] = useState<Record<BuilderKey, string>>({ what: '', features: '', mood: '' })
  const [copied, setCopied] = useState(false)

  const what = values.what || '할 일 목록 웹 앱'
  const features = values.features || '추가 · 완료 체크 · 삭제'
  const mood = values.mood || '파스텔 톤의 둥근 디자인'
  const sentence = `${what} 만들어줘. ${features}가 되고, ${mood}으로.`

  const copy = () => {
    void navigator.clipboard?.writeText(sentence)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <SlideLayout align="top">
      <div className="flex flex-col gap-5 pt-6">
        <SlideKicker>오늘의 핵심 공식</SlideKicker>
        <p className="animate-rise-1 flex flex-wrap items-center gap-4 rounded-panel bg-accent px-5 py-4 text-deck-lead font-bold text-accent-contrast shadow-lifted md:px-10 md:py-8">
          <span>[무엇을] 만들어줘</span>
          <span className="opacity-60">+</span>
          <span>[기능 1·2·3]</span>
          <span className="opacity-60">+</span>
          <span>[디자인 느낌]</span>
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-9">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <Panel tone="sunken" pad="md" className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <ThumbsDown size={26} className="text-content-muted" />
              <PanelLabel>나쁜 예</PanelLabel>
            </div>
            <p className="text-deck-body text-content-muted line-through">앱 만들어줘</p>
          </Panel>

          <Panel tone="accentSoft" pad="md" className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <ThumbsUp size={26} className="text-accent" />
              <PanelLabel tone="accent">좋은 예</PanelLabel>
            </div>
            <p className="text-deck-body font-semibold text-content-strong">
              할 일 목록 웹 앱 만들어줘. 추가·완료 체크·삭제가 되고, 파스텔 톤의 둥근 디자인으로
            </p>
          </Panel>
        </div>

        <Panel tone="raised" pad="lg" className="flex flex-col gap-5 lg:col-span-5">
          <PanelLabel>프롬프트 빌더 — 빈칸을 채워보세요</PanelLabel>

          <div className="flex flex-col gap-3">
            {BUILDER_FIELDS.map((field) => (
              <label key={field.key} className="flex items-center gap-5">
                <span className="w-44 shrink-0 text-deck-caption font-semibold text-content-secondary">
                  {field.label}
                </span>
                <input
                  value={values[field.key]}
                  onChange={(event) => setValues((prev) => ({ ...prev, [field.key]: event.target.value }))}
                  placeholder={field.placeholder}
                  className="w-0 flex-1 rounded-control bg-surface-sunken px-6 py-4 text-deck-caption text-content-strong placeholder:text-content-muted inset-shadow-sunken focus:outline-none"
                />
              </label>
            ))}
          </div>

          <div className="flex items-start justify-between gap-5 rounded-card bg-surface-overlay p-4 shadow-overlay md:p-7">
            <p className="text-deck-body font-semibold text-content-strong">{sentence}</p>
            <button
              type="button"
              onClick={copy}
              aria-label="완성 문장 복사"
              className={cx(
                'grid size-10 shrink-0 place-items-center rounded-control transition duration-200 ease-deck md:size-14',
                copied ? 'bg-accent text-accent-contrast' : 'bg-surface-highlight text-content-secondary hover:text-content-primary',
              )}
            >
              {copied ? <Check size={26} strokeWidth={3} /> : <Copy size={26} />}
            </button>
          </div>
        </Panel>
      </div>

      <SlideBody>
        실습 중에 이 화면이 다시 필요하면 <Mark>P</Mark> 키를 누르세요.
      </SlideBody>
    </SlideLayout>
  )
}

/** S13. 라이브 데모 */
export function LiveDemoSlide() {
  const [backup, setBackup] = useState(false)

  return (
    <SlideLayout>
      <div className="grid items-center gap-5 md:gap-10 lg:grid-cols-9">
        <div className="flex flex-col gap-4 md:gap-7 lg:col-span-5">
          <SlideKicker>라이브 데모</SlideKicker>
          <SlideHeadline>지금부터 1분, 실시간으로 만들어보겠습니다</SlideHeadline>

          <Panel tone="accentSoft" pad="lg" className="animate-rise-2">
            <p className="text-deck-body font-semibold text-content-strong">
              점심 메뉴 룰렛 만들어줘. 메뉴를 추가할 수 있고, 돌리면 두구두구 애니메이션 후 하나가 뽑혀. 귀엽고
              알록달록하게
            </p>
          </Panel>

          <div className="flex flex-wrap items-center gap-4">
            <Chip>수정 요청도 보여드립니다 → &ldquo;버튼 더 크게, 주황색으로&rdquo;</Chip>
            <button
              type="button"
              onClick={() => setBackup((value) => !value)}
              className="flex items-center gap-3 rounded-full bg-surface-raised px-4 py-3 text-deck-caption font-semibold text-content-secondary shadow-raised transition duration-200 ease-deck md:px-7 hover:bg-surface-highlight hover:text-content-primary"
            >
              <Play size={24} />
              {backup ? '미리보기 닫기' : '완성본 미리보기'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-4">
          {backup ? (
            <div className="animate-pop">
              <MenuRoulette />
            </div>
          ) : (
            <Panel tone="sunken" pad="lg" className="grid min-h-80 place-items-center text-center">
              <p className="text-deck-body text-content-muted">
                이 자리에 실제 에이전트 화면을 나란히 띄웁니다
                <br />
                <span className="text-deck-caption">네트워크가 불안하면 &lsquo;완성본 미리보기&rsquo;로 대체</span>
              </p>
            </Panel>
          )}
        </div>
      </div>
    </SlideLayout>
  )
}

/** S14. 휴식 */
export function BreakSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col items-center gap-5 text-center md:gap-10">
        <SlideKicker>휴식</SlideKicker>
        <CountdownTimer seconds={300} autoStart caption="다시 모이기까지" />
        <p className="text-deck-lead font-semibold text-content-primary">
          돌아오시면 바로 만듭니다. 노트북 로그인 상태 확인해 주세요!
        </p>
        <p className="rounded-panel bg-surface-raised px-5 py-3 text-deck-body font-semibold text-content-secondary shadow-raised md:px-10 md:py-6">
          다음은 <Mark>PART 2 · 직접 만들기</Mark>
        </p>
      </div>

      <SlideNote tone="quiet">화장실 · 물 · 스트레칭 — 이 순서를 추천합니다</SlideNote>
    </SlideLayout>
  )
}
