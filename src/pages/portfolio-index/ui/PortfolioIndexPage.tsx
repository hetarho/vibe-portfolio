import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { pageInfo, pageOrder, type PortfolioPageId } from '@/shared/config/portfolio'
import { projectCards } from '../model/projects'

/** Tailwind가 클래스명을 정적으로 훑기 때문에 등장 지연은 문자열 그대로 적어둔다 */
const riseDelay = ['animate-rise-1', 'animate-rise-2', 'animate-rise-3']

type Props = {
  onOpen: (page: PortfolioPageId) => void
  onBack: () => void
}

/** /vibe-portfolio — 포트폴리오 3종 목록. 여기서 각 사이트로 들어간다 */
export function PortfolioIndexPage({ onOpen, onBack }: Props) {
  return (
    <main className="min-h-dvh w-full bg-surface-base px-6 py-16 font-sans break-keep text-content-primary sm:px-12">
      <div className="mx-auto flex max-w-column flex-col gap-14">
        <header className="animate-rise flex flex-col gap-6">
          <button
            type="button"
            onClick={onBack}
            className="flex w-fit items-center gap-2 text-sm font-medium text-content-muted transition hover:text-content-primary"
          >
            <ArrowLeft size={16} />
            vibe.haeram
          </button>

          <h1 className="m-0 text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-[-0.04em] text-content-strong">
            바이브코딩 포트폴리오
          </h1>
          <p className="m-0 max-w-2xl text-base text-content-secondary sm:text-lg">
            코드를 직접 타이핑하지 않고, AI에게 말로 지시해서 만든 웹사이트 세 개입니다. 하나씩 열어 보세요.
          </p>
        </header>

        <ul className="m-0 flex list-none flex-col gap-4 p-0">
          {pageOrder.map((key, index) => {
            const page = pageInfo[key]
            const card = projectCards[key]
            return (
              <li key={key} className={riseDelay[index]}>
                <button
                  type="button"
                  onClick={() => onOpen(key)}
                  className="group flex w-full items-center gap-6 rounded-card bg-surface-raised p-6 text-left shadow-raised transition duration-300 ease-deck hover:-translate-y-1.5 hover:bg-surface-overlay hover:shadow-overlay sm:gap-8 sm:p-8"
                >
                  <span
                    aria-hidden
                    className="hidden size-20 shrink-0 rounded-panel ring-1 ring-line-default sm:block"
                    style={{ backgroundColor: card.swatch }}
                  />

                  <span className="flex min-w-0 flex-1 flex-col gap-2">
                    <span className="font-mono text-xs tracking-[0.16em] text-content-muted">{page.number}</span>
                    <span className="text-xl font-semibold tracking-tight text-content-strong sm:text-2xl">
                      {page.label}
                    </span>
                    <span className="text-sm text-content-secondary sm:text-base">{card.summary}</span>
                    <span className="mt-2 flex flex-wrap gap-2">
                      {card.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-surface-sunken px-3 py-1 text-xs text-content-secondary"
                        >
                          {item}
                        </span>
                      ))}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={24}
                    className="shrink-0 text-content-muted transition duration-300 ease-deck group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
