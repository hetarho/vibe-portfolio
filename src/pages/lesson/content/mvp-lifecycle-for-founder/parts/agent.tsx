import { Bot, MousePointerClick, ShieldAlert, Terminal, User } from 'lucide-react'
import {
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
  SlideNote,
} from '../../../deck'
import { ASK_STEPS, CHAT, CONSOLES, ERRORS, REPO, SECRETS, VERIFY } from '../model/mvp-samples'

/** M22. 연동이 어려운 진짜 이유 */
export function WhyHardSlide() {
  return (
    <SlideLayout>
      <SlideKicker>PART 2 · 에이전트에게 시키기</SlideKicker>
      <SlideHeadline>연동이 어려운 이유는 코드가 아니에요</SlideHeadline>

      <SlideBody>
        코드는 이미 있어요. 어려운 건 <span className="text-content-strong">콘솔 4개를 사람이 클릭</span>해서 값 4개를 받아 오는 일 —
        그리고 AI는 그 화면을 클릭할 수 없어요.
      </SlideBody>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
        {CONSOLES.map((item, index) => (
          <Panel
            key={item.name}
            tone="raised"
            pad="sm"
            className={cx(
              'flex flex-col gap-2',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <div className="flex items-center gap-3">
              <MousePointerClick className="size-6 text-content-muted md:size-7" />
              <p className="text-deck-body font-bold text-content-strong">{item.name}</p>
            </div>
            <p className="text-deck-caption text-content-secondary">{item.makes}</p>
          </Panel>
        ))}
      </div>

      <SlideNote>
        <span className="underline decoration-4 underline-offset-8">손은 내가, 내비는 AI가</span> — 강사도 GCP를 몰랐고 {REPO.name}을 이렇게 만들었어요
      </SlideNote>
    </SlideLayout>
  )
}

/** M23. ⭐ 실제 대화 — 강사가 GCP를 이렇게 물었다 */
export function RealChatSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <SlideHeadline>실제로 이렇게 물었어요</SlideHeadline>
        <Chip>강사가 {REPO.name} 지도 키 만들 때 · GCP 처음</Chip>
      </div>

      <div className="flex flex-col gap-3 md:gap-4">
        {CHAT.map((turn, index) => {
          const me = turn.who === 'me'
          return (
            <div
              key={index}
              className={cx(
                'flex items-start gap-3 md:gap-4',
                me ? 'lg:pr-24' : 'lg:pl-24',
                index === 0 && 'animate-rise-1',
                index === 1 && 'animate-rise-2',
                index === 2 && 'animate-rise-3',
                index === 3 && 'animate-rise-4',
              )}
            >
              <span
                className={cx(
                  'grid size-10 shrink-0 place-items-center rounded-full md:size-12',
                  me ? 'bg-surface-highlight text-content-primary' : 'bg-accent text-accent-contrast',
                )}
              >
                {me ? <User className="size-6" /> : <Bot className="size-6" />}
              </span>
              <Panel tone={me ? 'sunken' : 'raised'} pad="sm" className="flex-1">
                <p className={cx('text-deck-caption md:text-deck-body', me ? 'text-content-primary' : 'text-content-strong')}>{turn.text}</p>
              </Panel>
            </div>
          )
        })}
      </div>

      <SlideNote tone="quiet">
        &ldquo;어디서 · 무슨 화면 · 뭘 골라?&rdquo; — <Mark>위치와 화면을 주면</Mark> 모르는 콘솔도 같이 갈 수 있어요
      </SlideNote>
    </SlideLayout>
  )
}

/** M24. ⭐ 막혔을 때 4단계 */
export function AskStepsSlide() {
  return (
    <SlideLayout>
      <SlideHeadline>막히면 이 4가지를 순서대로 줘요</SlideHeadline>

      <ol className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {ASK_STEPS.map((item, index) => (
          <li
            key={item.step}
            className={cx(
              'flex flex-col gap-3 rounded-panel bg-surface-raised p-5 shadow-raised md:p-7',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <span className="grid size-10 place-items-center rounded-full bg-accent text-deck-caption font-bold text-accent-contrast md:size-12">
              {index + 1}
            </span>
            <p className="text-deck-body font-bold text-content-strong">{item.step}</p>
            <p className="rounded-card bg-surface-sunken p-3 text-deck-caption text-content-primary inset-shadow-sunken md:p-4">{item.say}</p>
            <p className="mt-auto text-deck-caption text-content-muted">{item.why}</p>
          </li>
        ))}
      </ol>

      <SlideNote tone="quiet">
        요약해서 말하지 말고 <Mark>화면을 그대로</Mark> — 내가 중요하지 않다고 뺀 것이 보통 답이에요
      </SlideNote>
    </SlideLayout>
  )
}

/** M25. 자주 나는 에러 4개 번역표 */
export function ErrorTableSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <SlideHeadline>이 4개는 미리 알고 가요</SlideHeadline>
        <Chip>지도 + Google 로그인 앱이면 거의 다 만나요</Chip>
      </div>

      <div className="grid gap-3 md:gap-4">
        {ERRORS.map((row, index) => (
          <Panel
            key={row.text}
            tone="raised"
            pad="sm"
            className={cx(
              'grid items-center gap-2 overflow-x-auto md:gap-6 lg:grid-cols-9',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <p className="font-mono text-deck-caption font-bold whitespace-pre text-critical lg:col-span-3">{row.text}</p>
            <p className="text-deck-caption text-content-secondary lg:col-span-3">{row.means}</p>
            <p className="text-deck-caption font-semibold text-content-strong lg:col-span-3">→ {row.fix}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        에러 문구는 <Mark>번역하지 말고 그대로</Mark> 붙여요 — AI는 그 문자열로 문서를 찾아요
      </SlideNote>
    </SlideLayout>
  )
}

/** M26. ⭐ 절대 붙이지 말 것 */
export function SecretsSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <ShieldAlert className="size-8 text-critical md:size-11" />
        <SlideHeadline>이 셋은 AI 채팅창에도 붙이지 않아요</SlideHeadline>
      </div>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="animate-rise-1 flex flex-col gap-4">
          <PanelLabel>붙이면 안 되는 것</PanelLabel>
          <ul className="flex flex-col gap-3">
            {SECRETS.map((item) => (
              <li key={item.looks} className="flex flex-col gap-1 rounded-card bg-surface-base p-3 md:p-4">
                <span className="font-mono text-deck-body font-bold text-critical">{item.looks}</span>
                <span className="text-deck-caption text-content-secondary">{item.is}</span>
              </li>
            ))}
          </ul>
          <p className="text-deck-caption text-content-muted">있어야 할 곳: Supabase 대시보드 · Google 콘솔 — 그 안에서만</p>
        </Panel>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4">
          <PanelLabel tone="accent">붙여도 되는 것</PanelLabel>
          <p className="text-deck-lead font-bold text-content-strong">
            <Mark>VITE_</Mark>로 시작하는 4개
          </p>
          <p className="text-deck-body text-content-secondary">
            어차피 사용자 브라우저에 실려 나가는 값이에요. 보안은 값을 숨기는 게 아니라 &ldquo;어느 사이트에서만&rdquo; 제한하는 것 (I8)
          </p>
          <p className="mt-auto text-deck-caption text-content-muted">앱이 sb_secret이나 eyJ를 .env.local에서 보면 부팅을 거부하도록 이미 막아뒀어요</p>
        </Panel>
      </CompareGrid>

      <SlideNote>
        실수로 붙였으면 지우는 게 아니라 <span className="underline decoration-4 underline-offset-8">콘솔에서 새로 발급</span>이에요
      </SlideNote>
    </SlideLayout>
  )
}

/** M27. 에이전트에게 검증 시키기 */
export function VerifyCommandsSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <Terminal className="size-8 text-accent md:size-11" />
        <SlideHeadline>&ldquo;됐습니다&rdquo; 대신 명령 결과를 받아요</SlideHeadline>
      </div>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
        {VERIFY.map((row, index) => (
          <Panel
            key={row.cmd}
            tone="raised"
            pad="sm"
            className={cx(
              'flex flex-col gap-2 overflow-x-auto',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
              index === 3 && 'animate-rise-4',
            )}
          >
            <PanelLabel>{row.when}</PanelLabel>
            <p className="rounded-card bg-surface-sunken p-3 font-mono text-deck-caption whitespace-pre text-content-strong inset-shadow-sunken md:p-4">
              $ {row.cmd}
            </p>
            <p className="text-deck-caption font-semibold text-positive">통과: {row.pass}</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        시키는 말은 하나예요 — <Mark>&ldquo;됐는지 확인하는 명령 돌리고 결과 보여줘&rdquo;</Mark>
      </SlideNote>
    </SlideLayout>
  )
}
