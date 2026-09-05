import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Heart, Plus } from 'lucide-react'
import type { ReactNode } from 'react'
import { pageInfo } from '@/shared/config/portfolio'
import { formatWon } from '@/shared/lib'
import { Photo, Reveal } from '@/shared/ui'
import { useCart } from '../model/cart'
import type { Product } from '../model/products'

export const shopBase = pageInfo.shop.path

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[100rem] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
}

export function SectionHead({ eyebrow, title, aside }: { eyebrow: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="shop-eyebrow">{eyebrow}</p>
        <h2 className="shop-display mt-3 text-[clamp(2rem,4vw,3.5rem)] text-shop-ink">{title}</h2>
      </div>
      {aside && <div className="text-sm text-shop-muted">{aside}</div>}
    </Reveal>
  )
}

export function ProductCard({ product, delay = 0, eager = false }: { product: Product; delay?: number; eager?: boolean }) {
  const cart = useCart()
  const wished = cart.isWished(product.id)
  const hasOptions = Boolean(product.options)

  return (
    <Reveal delay={delay} className="shop-card group relative flex flex-col">
      <Link
        to={`${shopBase}/product/$id`}
        params={{ id: product.id }}
        className="block"
        aria-label={`${product.name} 상세 보기`}
      >
        <Photo
          src={product.images[0]}
          alt={product.name}
          loading={eager ? 'eager' : 'lazy'}
          frameClassName="aspect-[4/5] rounded-2xl"
          style={{ backgroundColor: product.tone }}
        />
      </Link>

      <div className="absolute left-3 top-3 flex gap-1.5">
        {product.isNew && (
          <span className="rounded-full bg-shop-ink px-2.5 py-1 text-[10px] font-semibold tracking-wider text-shop-bg">NEW</span>
        )}
        {product.compareAt && (
          <span className="rounded-full bg-shop-accent px-2.5 py-1 text-[10px] font-semibold tracking-wider text-shop-bg">
            SALE
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => cart.toggleWish(product.id)}
        aria-pressed={wished}
        aria-label={wished ? '위시리스트에서 빼기' : '위시리스트에 담기'}
        className={`absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-shop-surface/90 backdrop-blur transition hover:scale-105 ${
          wished ? 'text-shop-accent' : 'text-shop-ink'
        }`}
      >
        <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
      </button>

      {hasOptions ? (
        <Link
          to={`${shopBase}/product/$id`}
          params={{ id: product.id }}
          className="shop-quick absolute inset-x-3 bottom-[calc(25%+0.75rem)] flex h-11 items-center justify-center gap-2 rounded-full bg-shop-surface/95 text-sm font-semibold text-shop-ink shadow-lg backdrop-blur sm:bottom-auto sm:top-[calc(100%-6.5rem)]"
        >
          옵션 선택 <ArrowUpRight size={15} />
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => cart.add(product.id)}
          className="shop-quick absolute inset-x-3 top-[calc(100%-6.5rem)] flex h-11 items-center justify-center gap-2 rounded-full bg-shop-surface/95 text-sm font-semibold text-shop-ink shadow-lg backdrop-blur hover:bg-shop-ink hover:text-shop-bg"
        >
          <Plus size={15} /> 장바구니 담기
        </button>
      )}

      <Link to={`${shopBase}/product/$id`} params={{ id: product.id }} className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="shop-eyebrow text-[10px]">{product.category}</p>
          <h3 className="mt-1 text-base font-semibold tracking-tight text-shop-ink">{product.name}</h3>
          <p className="mt-0.5 text-xs text-shop-muted">{product.summary}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold text-shop-ink">{formatWon(product.price)}</p>
          {product.compareAt && <p className="text-xs text-shop-muted line-through">{formatWon(product.compareAt)}</p>}
        </div>
      </Link>
    </Reveal>
  )
}

export function QtyStepper({ value, onChange, size = 'md' }: { value: number; onChange: (next: number) => void; size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'h-8' : 'h-12'
  const btn = size === 'sm' ? 'w-8 text-base' : 'w-12 text-lg'
  return (
    <div className={`inline-flex ${box} items-center rounded-full border border-shop-line`}>
      <button type="button" onClick={() => onChange(value - 1)} className={`${btn} h-full rounded-l-full text-shop-ink hover:bg-shop-sunken`} aria-label="수량 줄이기">
        −
      </button>
      <span className="min-w-8 text-center text-sm font-semibold text-shop-ink">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} className={`${btn} h-full rounded-r-full text-shop-ink hover:bg-shop-sunken`} aria-label="수량 늘리기">
        +
      </button>
    </div>
  )
}
