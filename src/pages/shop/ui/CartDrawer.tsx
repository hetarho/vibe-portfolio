import { Link } from '@tanstack/react-router'
import { ArrowRight, ShoppingBag, X } from 'lucide-react'
import { useEffect } from 'react'
import { formatWon } from '@/shared/lib'
import { Photo } from '@/shared/ui'
import { useCart } from '../model/cart'
import { FREE_SHIPPING_FROM } from '../model/products'
import { QtyStepper, shopBase } from './primitives'

export function CartDrawer() {
  const cart = useCart()

  useEffect(() => {
    if (!cart.isOpen) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && cart.close()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [cart.isOpen, cart])

  if (!cart.isOpen) return null

  const remaining = Math.max(0, FREE_SHIPPING_FROM - cart.subtotal)
  const progress = Math.min(100, (cart.subtotal / FREE_SHIPPING_FROM) * 100)

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal aria-label="장바구니">
      <button type="button" className="animate-fade absolute inset-0 bg-shop-ink/40 backdrop-blur-sm" onClick={cart.close} aria-label="닫기" />
      <aside className="shop-drawer relative flex h-full w-full max-w-md flex-col bg-shop-bg shadow-2xl">
        <header className="flex items-center justify-between border-b border-shop-line px-6 py-5">
          <h2 className="shop-display text-2xl text-shop-ink">
            장바구니 <span className="shop-italic text-xl">{cart.count}</span>
          </h2>
          <button type="button" onClick={cart.close} className="grid size-10 place-items-center rounded-full hover:bg-shop-sunken" aria-label="장바구니 닫기">
            <X size={20} />
          </button>
        </header>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-shop-sunken text-shop-muted">
              <ShoppingBag size={26} />
            </span>
            <p className="shop-display text-2xl text-shop-ink">아직 담긴 물건이 없어요.</p>
            <p className="text-sm text-shop-muted">천천히 골라 보세요. 좋은 물건은 기다려 줍니다.</p>
            <Link to={`${shopBase}/collection`} onClick={cart.close} className="shop-button mt-2">
              컬렉션 보기
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-shop-line px-6 py-4">
              <p className="text-xs text-shop-muted">
                {remaining > 0 ? (
                  <>
                    <b className="text-shop-ink">{formatWon(remaining)}</b> 더 담으면 무료배송
                  </>
                ) : (
                  <b className="text-shop-accent">무료배송이 적용됐어요</b>
                )}
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-shop-sunken">
                <div className="h-full rounded-full bg-shop-accent transition-all duration-700 ease-site" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="flex-1 overflow-y-auto px-6">
              {cart.lines.map((line) => (
                <li key={line.key} className="flex gap-4 border-b border-shop-line py-5">
                  <Link to={`${shopBase}/product/$id`} params={{ id: line.product.id }} onClick={cart.close}>
                    <Photo src={line.product.images[0]} alt="" frameClassName="size-24 rounded-xl" style={{ backgroundColor: line.product.tone }} />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-shop-ink">{line.product.name}</p>
                        <p className="mt-0.5 text-xs text-shop-muted">
                          {line.product.category}
                          {line.option ? ` · ${line.option}` : ''}
                        </p>
                      </div>
                      <button type="button" onClick={() => cart.remove(line.key)} className="text-shop-muted hover:text-shop-ink" aria-label="빼기">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <QtyStepper size="sm" value={line.qty} onChange={(qty) => cart.setQty(line.key, qty)} />
                      <p className="text-sm font-semibold text-shop-ink">{formatWon(line.product.price * line.qty)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-shop-line bg-shop-surface px-6 py-5">
              <dl className="flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between text-shop-muted">
                  <dt>소계</dt>
                  <dd>{formatWon(cart.subtotal)}</dd>
                </div>
                <div className="flex justify-between text-shop-muted">
                  <dt>배송</dt>
                  <dd>{cart.shipping === 0 ? '무료' : formatWon(cart.shipping)}</dd>
                </div>
                <div className="mt-2 flex justify-between text-base font-semibold text-shop-ink">
                  <dt>합계</dt>
                  <dd>{formatWon(cart.total)}</dd>
                </div>
              </dl>
              <Link to={`${shopBase}/checkout`} onClick={cart.close} className="shop-button mt-5 w-full">
                결제하기 <ArrowRight size={16} />
              </Link>
              <button type="button" onClick={cart.close} className="mt-3 w-full text-center text-xs text-shop-muted hover:text-shop-ink">
                계속 둘러보기
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
