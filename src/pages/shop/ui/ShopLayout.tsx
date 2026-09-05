import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import { ArrowRight, Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { pageInfo } from '@/shared/config/portfolio'
import { formatWon } from '@/shared/lib'
import { Photo } from '@/shared/ui'
import { CartProvider, useCart } from '../model/cart'
import { products } from '../model/products'
import { CartDrawer } from './CartDrawer'
import { Container, shopBase } from './primitives'
import '../styles.css'

const nav = [
  { to: `${shopBase}/collection`, label: '컬렉션' },
  { to: `${shopBase}/journal`, label: '저널' },
  { to: `${shopBase}/about`, label: '오하우' },
] as const

export function ShopLayout() {
  return (
    <CartProvider>
      <ShopFrame />
    </CartProvider>
  )
}

function ShopFrame() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const cart = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
    setQuery('')
  }, [pathname])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products
      .filter((product) => [product.name, product.english, product.category, product.summary].join(' ').toLowerCase().includes(q))
      .slice(0, 6)
  }, [query])

  return (
    <div className="min-h-dvh bg-shop-bg font-sans break-keep text-shop-ink selection:bg-shop-accent selection:text-shop-bg">
      <div className="bg-shop-deep py-2 text-center text-[11px] tracking-wide text-shop-bg/90">
        5만 원 이상 무료배송 · 새 컬렉션 <span className="shop-italic text-shop-bg">Soft Objects</span> 가 도착했습니다
      </div>

      <header className="sticky top-0 z-[80] border-b border-shop-line/70 bg-shop-bg/85 backdrop-blur-xl">
        <Container className="grid h-16 grid-cols-[1fr_auto_1fr] items-center">
          <nav className="hidden items-center gap-7 md:flex" aria-label="사이트 메뉴">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="shop-link text-sm font-medium text-shop-ink">
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="grid size-10 place-items-center md:hidden"
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to={shopBase} className="shop-display text-[1.75rem] tracking-[-0.03em] text-shop-ink" aria-label="OHAU 홈">
            OHAU
          </Link>

          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen((value) => !value)}
              className="grid size-10 place-items-center rounded-full transition hover:bg-shop-sunken"
              aria-label="검색"
            >
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>
            <Link
              to={`${shopBase}/collection`}
              className="relative hidden size-10 place-items-center rounded-full transition hover:bg-shop-sunken sm:grid"
              aria-label={`위시리스트 ${cart.wishlist.length}개`}
            >
              <Heart size={19} />
              {cart.wishlist.length > 0 && <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-shop-accent" />}
            </Link>
            <button
              type="button"
              onClick={cart.open}
              className="relative grid size-10 place-items-center rounded-full transition hover:bg-shop-sunken"
              aria-label={`장바구니 ${cart.count}개`}
            >
              <ShoppingBag size={19} />
              {cart.count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-shop-ink font-mono text-[10px] text-shop-bg">
                  {cart.count}
                </span>
              )}
            </button>
          </div>
        </Container>

        {searchOpen && (
          <div className="animate-fade border-t border-shop-line bg-shop-bg">
            <Container className="py-6">
              <label className="flex items-center gap-3 border-b border-shop-ink pb-3">
                <Search size={20} className="text-shop-muted" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="어떤 물건을 찾고 있나요?"
                  className="shop-display w-full bg-transparent text-2xl text-shop-ink outline-none placeholder:text-shop-muted/60"
                />
              </label>
              {query && (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {results.length === 0 && <li className="py-4 text-sm text-shop-muted">‘{query}’에 맞는 물건이 없어요.</li>}
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        to={`${shopBase}/product/$id`}
                        params={{ id: product.id }}
                        className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-shop-sunken"
                      >
                        <Photo src={product.images[0]} alt="" frameClassName="size-14 rounded-lg" style={{ backgroundColor: product.tone }} />
                        <span className="flex-1">
                          <span className="block text-sm font-semibold">{product.name}</span>
                          <span className="block text-xs text-shop-muted">{product.category}</span>
                        </span>
                        <span className="text-sm">{formatWon(product.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Container>
          </div>
        )}

        {menuOpen && (
          <nav className="animate-fade border-t border-shop-line bg-shop-bg md:hidden" aria-label="사이트 메뉴">
            <Container className="flex flex-col py-4">
              {nav.map((item) => (
                <Link key={item.to} to={item.to} className="shop-display flex items-center justify-between border-b border-shop-line py-4 text-3xl text-shop-ink">
                  {item.label} <ArrowRight size={20} />
                </Link>
              ))}
            </Container>
          </nav>
        )}
      </header>

      <main key={pathname} className="shop-enter">
        <Outlet />
      </main>

      <ShopFooter />
      <CartDrawer />
    </div>
  )
}

function ShopFooter() {
  const [subscribed, setSubscribed] = useState(false)
  return (
    <footer className="bg-shop-deep text-shop-bg">
      <Container className="grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="shop-eyebrow text-shop-bg/60">Newsletter</p>
          <h2 className="shop-display mt-3 text-3xl">
            한 달에 한 번, <em className="text-shop-bg/80">새 물건 소식</em>을 보냅니다.
          </h2>
          {subscribed ? (
            <p className="mt-6 text-sm text-shop-bg/80">고맙습니다. 다음 소식에서 만나요.</p>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setSubscribed(true)
              }}
              className="mt-6 flex max-w-sm items-center border-b border-shop-bg/40 pb-2"
            >
              <input required type="email" placeholder="이메일 주소" className="w-full bg-transparent text-sm text-shop-bg outline-none placeholder:text-shop-bg/50" />
              <button type="submit" className="grid size-9 place-items-center rounded-full bg-shop-bg text-shop-deep" aria-label="구독">
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 md:col-span-7">
          <div>
            <p className="shop-eyebrow text-shop-bg/60">Shop</p>
            <ul className="mt-3 flex flex-col gap-2 text-shop-bg/80">
              <li><Link to={`${shopBase}/collection`} className="shop-link">전체 컬렉션</Link></li>
              <li><Link to={`${shopBase}/journal`} className="shop-link">저널</Link></li>
              <li><Link to={`${shopBase}/about`} className="shop-link">오하우 이야기</Link></li>
            </ul>
          </div>
          <div>
            <p className="shop-eyebrow text-shop-bg/60">Help</p>
            <ul className="mt-3 flex flex-col gap-2 text-shop-bg/80">
              <li>배송 · 반품</li>
              <li>고쳐 쓰기 서비스</li>
              <li>자주 묻는 질문</li>
            </ul>
          </div>
          <div>
            <p className="shop-eyebrow text-shop-bg/60">Visit</p>
            <p className="mt-3 leading-relaxed text-shop-bg/80">
              서울 마포구 성미산로 23
              <br />
              화~일 12:00~20:00
            </p>
          </div>
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-shop-bg/10 py-6 text-xs text-shop-bg/60 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 OHAU Objects. 사진: Unsplash 작가들.</span>
        <Link to={pageInfo.stay.path} className="shop-link">
          Next project · {pageInfo.stay.brand} <ArrowRight size={12} />
        </Link>
      </Container>
      <div aria-hidden className="shop-display select-none overflow-hidden px-5 text-[clamp(6rem,24vw,26rem)] leading-[0.78] text-shop-bg/[0.06] sm:px-8 lg:px-12" style={{ marginBottom: '-0.1em' }}>
        OHAU
      </div>
    </footer>
  )
}
