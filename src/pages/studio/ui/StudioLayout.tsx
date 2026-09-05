import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { pageInfo } from '@/shared/config/portfolio'
import { useScrolled } from '@/shared/lib'
import '../styles.css'

const base = pageInfo.studio.path

const nav = [
  { to: `${base}/work`, label: 'Work' },
  { to: `${base}/about`, label: 'Studio' },
  { to: `${base}/journal`, label: 'Journal' },
  { to: `${base}/contact`, label: 'Contact' },
] as const

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Behance', href: 'https://www.behance.net/' },
  { label: 'Are.na', href: 'https://www.are.na/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
] as const

/** MORROW 사이트의 껍데기: 고정 헤더, 페이지 전환, 대형 워드마크 푸터 */
export function StudioLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const scrolled = useScrolled(40)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="min-h-dvh bg-studio-bg font-sans break-keep text-studio-ink selection:bg-studio-accent selection:text-studio-bg">
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-500 ${
          scrolled || menuOpen ? 'bg-studio-bg/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-18 max-w-[110rem] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to={base} className="studio-display text-2xl tracking-[-0.06em]" aria-label="MORROW 홈">
            MORROW<span className="text-studio-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="사이트 메뉴">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="studio-link text-sm font-medium text-studio-muted transition hover:text-studio-ink [&.active]:text-studio-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={`${base}/contact`}
              className="ml-2 inline-flex h-10 items-center gap-2 rounded-full bg-studio-ink px-5 text-sm font-semibold text-studio-bg transition hover:bg-studio-accent hover:text-studio-bg"
            >
              Start a project
              <ArrowUpRight size={16} />
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-full text-studio-ink md:hidden"
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="animate-fade fixed inset-0 z-[70] flex flex-col justify-end bg-studio-bg px-6 pb-16 pt-28 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="사이트 메뉴">
            {nav.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                style={{ animationDelay: `${index * 60}ms` }}
                className="studio-display animate-rise flex items-end justify-between border-b border-studio-line py-4 text-[3.25rem] text-studio-ink [&.active]:text-studio-accent"
              >
                {item.label}
                <span className="mb-3 font-mono text-xs text-studio-muted">0{index + 1}</span>
              </Link>
            ))}
          </nav>
          <p className="mt-10 text-sm text-studio-muted">hello@morrow.studio · Seoul & Copenhagen</p>
        </div>
      )}

      <main key={pathname} className="studio-enter">
        <Outlet />
      </main>

      <StudioFooter />
    </div>
  )
}

function StudioFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-studio-line bg-studio-bg">
      <div className="mx-auto max-w-[110rem] px-5 pt-20 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="studio-eyebrow">Have something in mind?</p>
            <Link
              to={`${base}/contact`}
              className="studio-display mt-4 block text-[clamp(2.5rem,5vw,4.5rem)] text-studio-ink transition hover:text-studio-accent"
            >
              Let&apos;s talk.
            </Link>
          </div>
          <div className="grid gap-8 text-sm sm:grid-cols-3 md:col-span-7">
            <div>
              <p className="studio-eyebrow">Seoul</p>
              <p className="mt-3 leading-relaxed text-studio-muted">
                서울 용산구 한남대로 27길 12, 3F
                <br />
                +82 2 6000 1234
              </p>
            </div>
            <div>
              <p className="studio-eyebrow">Copenhagen</p>
              <p className="mt-3 leading-relaxed text-studio-muted">
                Refshalevej 163A
                <br />
                1432 København K
              </p>
            </div>
            <div>
              <p className="studio-eyebrow">Follow</p>
              <ul className="mt-3 flex flex-col gap-1.5 text-studio-muted">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="studio-link hover:text-studio-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-studio-line py-6 text-xs text-studio-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 MORROW Studio. All rights reserved.</span>
          <Link to={pageInfo.shop.path} className="studio-link hover:text-studio-ink">
            Next project · {pageInfo.shop.brand}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <div
        aria-hidden
        className="studio-display pointer-events-none select-none px-5 text-[clamp(6rem,20.5vw,22rem)] leading-[0.8] text-studio-raised sm:px-8 lg:px-12"
        style={{ marginBottom: '-0.12em' }}
      >
        MORROW
      </div>
    </footer>
  )
}
