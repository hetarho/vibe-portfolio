import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { pageInfo, pageOrder, type PortfolioPageId } from '@/shared/config/portfolio'
import { Photo } from '@/shared/ui'
import { projectCards } from '../model/projects'

/** Tailwind가 클래스명을 정적으로 훑기 때문에 등장 지연은 문자열 그대로 적어둔다 */
const riseDelay = ['animate-rise-1', 'animate-rise-2', 'animate-rise-3']

type Props = {
  onOpen: (page: PortfolioPageId) => void
  onBack: () => void
}

/** /vibe-portfolio: 포트폴리오 3종 목록. 여기서 각 사이트로 들어간다 */
export function PortfolioIndexPage({ onOpen, onBack }: Props) {
  return (
    <main className="min-h-dvh w-full bg-surface-base px-6 py-16 font-sans break-keep text-content-primary sm:px-12">
      <div className="mx-auto flex max-w-stage flex-col gap-14">
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
            코드를 직접 타이핑하지 않고, AI 에이전트에게 말로 지시해서 만든 웹사이트 세 개입니다. 각각 일곱 페이지짜리
            사이트로, 하나씩 열어 보세요.
          </p>
        </header>

        <ul className="m-0 grid list-none gap-6 p-0 lg:grid-cols-3">
          {pageOrder.map((key, index) => {
            const page = pageInfo[key]
            const card = projectCards[key]
            return (
              <li key={key} className={riseDelay[index]}>
                <button
                  type="button"
                  onClick={() => onOpen(key)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-card bg-surface-raised text-left shadow-raised transition duration-500 ease-deck hover:-translate-y-1.5 hover:bg-surface-overlay hover:shadow-overlay"
                >
                  <Photo
                    src={card.cover}
                    alt=""
                    loading="eager"
                    frameClassName="aspect-[4/3] bg-surface-sunken"
                    className="transition duration-700 ease-deck group-hover:scale-[1.03]"
                  />

                  <span className="flex flex-1 flex-col gap-3 p-7">
                    <span className="flex items-center justify-between">
                      <span className="font-mono text-xs tracking-[0.16em] text-content-muted">
                        {page.number} · {card.pages} pages
                      </span>
                      <ArrowUpRight
                        size={20}
                        className="text-content-muted transition duration-300 ease-deck group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </span>
                    <span className="text-2xl font-semibold tracking-tight text-content-strong">
                      {page.brand}
                      <span className="ml-2 text-base font-medium text-content-secondary">{page.label}</span>
                    </span>
                    <span className="text-sm leading-relaxed text-content-secondary">{card.summary}</span>
                    <span className="mt-auto flex flex-wrap gap-2 pt-3">
                      {card.stack.map((item) => (
                        <span key={item} className="rounded-full bg-surface-sunken px-3 py-1 text-xs text-content-secondary">
                          {item}
                        </span>
                      ))}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
