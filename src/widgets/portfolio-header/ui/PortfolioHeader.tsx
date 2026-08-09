import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { pageInfo, type Page } from '@/shared/model/navigation'

type Props = {
  page: Page
  onChange: (page: Page) => void
}

export function PortfolioHeader({ page, onChange }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <header className={`portfolio-header header-${page}`}>
      <button className="portfolio-logo" onClick={() => onChange('studio')} aria-label="Vibe portfolio 홈">
        VIBE<span>®</span>
      </button>

      <nav className={open ? 'portfolio-nav open' : 'portfolio-nav'} aria-label="포트폴리오 프로젝트">
        {(Object.keys(pageInfo) as Page[]).map((key) => (
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
