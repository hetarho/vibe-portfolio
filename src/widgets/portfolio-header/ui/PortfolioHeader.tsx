import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { pageInfo, pageOrder, type PortfolioPageId } from '@/shared/config/portfolio'

type Props = {
  page: PortfolioPageId
  onChange: (page: PortfolioPageId) => void
  /** 로고를 누르면 포트폴리오 목록(/vibe-portfolio)으로 돌아간다 */
  onHome: () => void
}

export function PortfolioHeader({ page, onChange, onHome }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <header className={`portfolio-header header-${page}`}>
      <button className="portfolio-logo" onClick={onHome} aria-label="포트폴리오 목록으로">
        VIBE<span>®</span>
      </button>

      <nav className={open ? 'portfolio-nav open' : 'portfolio-nav'} aria-label="포트폴리오 프로젝트">
        {pageOrder.map((key) => (
          <button
            key={key}
            className={page === key ? 'active' : ''}
            onClick={() => {
              onChange(key)
              setOpen(false)
            }}
          >
            <span>{pageInfo[key].number}</span>
            {pageInfo[key].label}
          </button>
        ))}
      </nav>

      <div className="header-meta">
        <span>FRONTEND<br />PORTFOLIO</span>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="메뉴 열기">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}
