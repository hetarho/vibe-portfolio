import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { pageInfo } from '@/shared/config/portfolio'
import { useScrolled } from '@/shared/lib'
import { BookingProvider } from '../model/booking'
import { story } from '../model/content'
import { Container, stayBase } from './primitives'
import '../styles.css'

const nav = [
  { to: `${stayBase}/rooms`, label: '객실', en: 'Rooms' },
  { to: `${stayBase}/experiences`, label: '경험', en: 'Experiences' },
  { to: `${stayBase}/dining`, label: '다이닝', en: 'Dining' },
  { to: `${stayBase}/story`, label: '이야기', en: 'Story' },
] as const

export function StayLayout() {
  return (
    <BookingProvider>
      <StayFrame />
    </BookingProvider>
  )
}

function StayFrame() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const scrolled = useScrolled(60)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMenuOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /* 홈 히어로 위에서는 투명 + 밝은 글자, 스크롤하면 뼛빛 바탕으로 */
  const overHero = pathname.replace(/\/$/, '') === stayBase && !scrolled && !menuOpen
  const ink = overHero ? 'text-stay-bg' : 'text-stay-ink'

  return (
    <div className="min-h-dvh bg-stay-bg font-sans break-keep text-stay-ink selection:bg-stay-moss selection:text-stay-bg">
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-500 ${
          overHero ? 'bg-transparent' : 'bg-stay-bg/85 backdrop-blur-xl'
        } ${ink}`}
      >
        <Container className="grid h-20 grid-cols-[1fr_auto_1fr] items-center">
          <nav className="hidden items-center gap-8 md:flex" aria-label="사이트 메뉴">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="stay-link text-sm tracking-wide">
                {item.label}
              </Link>
            ))}
          </nav>
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="grid size-10 place-items-center md:hidden" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to={stayBase} className="stay-display text-[2rem] tracking-[0.12em]" aria-label="HAVN 홈">
            HAVN
          </Link>

          <div className="flex justify-end">
            <Link
              to={`${stayBase}/book`}
              className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium tracking-wide transition ${
                overHero ? 'bg-stay-bg text-stay-ink hover:bg-white' : 'bg-stay-ink text-stay-bg hover:bg-stay-moss'
              }`}
            >
              예약 <ArrowRight size={15} className="hidden sm:block" />
            </Link>
          </div>
        </Container>
      </header>

      {menuOpen && (
        <div className="animate-fade fixed inset-0 z-[70] flex flex-col justify-end bg-stay-bg px-6 pb-16 pt-28 md:hidden">
          <nav className="flex flex-col" aria-label="사이트 메뉴">
            {nav.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                style={{ animationDelay: `${index * 60}ms` }}
                className="stay-display animate-rise flex items-baseline justify-between border-b border-stay-line py-5 text-5xl text-stay-ink"
              >
                {item.label}
                <span className="stay-italic text-xl text-stay-muted">{item.en}</span>
              </Link>
            ))}
          </nav>
          <p className="mt-10 text-sm text-stay-muted">{story.address}</p>
        </div>
      )}

      <main key={pathname} className="stay-enter">
        <Outlet />
      </main>

      <StayFooter />
    </div>
  )
}

function StayFooter() {
  return (
    <footer className="bg-stay-deep text-stay-bg">
      <Container className="grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="stay-eyebrow text-stay-bg/50">Reservations</p>
          <p className="stay-display mt-4 text-4xl">
            안개 위의 <em className="text-stay-sand">하룻밤</em>을 예약하세요.
          </p>
          <Link to={`${stayBase}/book`} className="stay-button-light mt-8">
            예약하기 <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 md:col-span-7">
          <div>
            <p className="stay-eyebrow text-stay-bg/50">Visit</p>
            <p className="mt-3 leading-relaxed text-stay-bg/75">{story.address}</p>
            <p className="mt-2 text-stay-bg/75">+82 33 460 1200</p>
          </div>
          <div>
            <p className="stay-eyebrow text-stay-bg/50">Explore</p>
            <ul className="mt-3 flex flex-col gap-2 text-stay-bg/75">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="stay-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="stay-eyebrow text-stay-bg/50">Now</p>
            <p className="mt-3 leading-relaxed text-stay-bg/75">
              인제 12°C · 안개
              <br />
              체크인 15:00 · 체크아웃 11:00
            </p>
          </div>
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-stay-bg/10 py-6 text-xs text-stay-bg/50 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 HAVN. 사진: Unsplash 작가들.</span>
        <Link to={pageInfo.studio.path} className="stay-link">
          Back to first · {pageInfo.studio.brand} <ArrowRight size={12} />
        </Link>
      </Container>
      <div aria-hidden className="stay-display select-none overflow-hidden px-5 text-center text-[clamp(6rem,26vw,28rem)] leading-[0.78] tracking-[0.1em] text-stay-bg/[0.05]" style={{ marginBottom: '-0.12em' }}>
        HAVN
      </div>
    </footer>
  )
}
