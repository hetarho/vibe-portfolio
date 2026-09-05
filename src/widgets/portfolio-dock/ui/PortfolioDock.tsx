import { Link } from '@tanstack/react-router'
import { Grip, X } from 'lucide-react'
import { useState } from 'react'
import { pageInfo, pageOrder, portfolioRootPath, type PortfolioPageId } from '@/shared/config/portfolio'

type Props = {
  page: PortfolioPageId
}

/**
 * 사이트 3종 위에 떠 있는 작은 스위처. 각 사이트는 자기 헤더를 갖고 있으므로
 * 이 위젯은 화면 아래 구석에서 "지금 어느 작품인지"와 "다른 작품으로 가기"만 맡는다.
 */
export function PortfolioDock({ page }: Props) {
  const [open, setOpen] = useState(false)
  const dark = pageInfo[page].tone === 'dark'

  const shell = dark
    ? 'bg-white/10 text-white ring-white/15 hover:bg-white/15'
    : 'bg-black/70 text-white ring-black/10 hover:bg-black/80'

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[90] flex justify-center px-4 sm:justify-end sm:px-6">
      <div className="pointer-events-auto flex flex-col items-end gap-2">
        {open && (
          <nav
            aria-label="다른 작품으로"
            className="animate-pop flex flex-col gap-1 rounded-2xl bg-black/85 p-2 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
          >
            {pageOrder.map((key) => {
              const info = pageInfo[key]
              const active = key === page
              return (
                <Link
                  key={key}
                  to={info.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                    active ? 'bg-white text-black' : 'hover:bg-white/10'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-60">{info.number}</span>
                  <span className="font-semibold">{info.brand}</span>
                  <span className={`text-xs ${active ? 'text-black/60' : 'text-white/60'}`}>{info.label}</span>
                </Link>
              )
            })}
            <Link
              to={portfolioRootPath}
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-between rounded-xl px-3 py-2 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              포트폴리오 목록으로
              <span aria-hidden>↗</span>
            </Link>
          </nav>
        )}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? '작품 스위처 닫기' : '작품 스위처 열기'}
          className={`flex h-11 items-center gap-2.5 rounded-full pl-3.5 pr-4 text-xs font-semibold tracking-wide shadow-xl ring-1 backdrop-blur-xl transition ${shell}`}
        >
          {open ? <X size={16} /> : <Grip size={16} />}
          <span className="font-mono text-[10px] opacity-70">{pageInfo[page].number}</span>
          <span>vibe.haeram</span>
        </button>
      </div>
    </div>
  )
}
