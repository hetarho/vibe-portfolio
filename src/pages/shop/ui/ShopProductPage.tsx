import { Link } from '@tanstack/react-router'
import { ArrowLeft, Check, ChevronDown, Heart, RotateCcw, ShoppingBag, Truck } from 'lucide-react'
import { useState } from 'react'
import { formatWon } from '@/shared/lib'
import { Photo, Reveal } from '@/shared/ui'
import { useCart } from '../model/cart'
import { findProduct, relatedProducts } from '../model/products'
import { Container, ProductCard, QtyStepper, shopBase } from './primitives'

export function ShopProductPage({ id }: { id: string }) {
  const product = findProduct(id)
  const cart = useCart()
  const [index, setIndex] = useState(0)
  const [option, setOption] = useState<string | undefined>(product?.options?.values[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <Container className="py-32 text-center">
        <p className="shop-eyebrow">Not found</p>
        <h1 className="shop-display mt-4 text-4xl">그런 물건은 없어요.</h1>
        <Link to={`${shopBase}/collection`} className="shop-button mt-8">
          컬렉션으로
        </Link>
      </Container>
    )
  }

  const wished = cart.isWished(product.id)
  const related = relatedProducts(product)

  const addToCart = () => {
    cart.add(product.id, option, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <>
      <Container className="py-8 lg:py-14">
        <Link to={`${shopBase}/collection`} className="shop-link text-xs text-shop-muted">
          <ArrowLeft size={12} /> 컬렉션
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* 갤러리 */}
          <div className="lg:col-span-7">
            <div className="flex flex-col-reverse gap-4 sm:flex-row">
              {product.images.length > 1 && (
                <ul className="flex gap-3 sm:flex-col">
                  {product.images.map((src, i) => (
                    <li key={src}>
                      <button
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`${i + 1}번째 사진`}
                        className={`block size-20 overflow-hidden rounded-xl ring-2 transition ${
                          index === i ? 'ring-shop-ink' : 'ring-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={src} alt="" className="size-full object-cover" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <Reveal variant="scale" className="flex-1">
                <div className="relative overflow-hidden rounded-[1.75rem]" style={{ backgroundColor: product.tone }}>
                  <img key={product.images[index]} src={product.images[index]} alt={product.name} className="animate-fade aspect-[4/5] w-full object-cover" />
                  {product.isNew && (
                    <span className="absolute left-4 top-4 rounded-full bg-shop-ink px-3 py-1 text-[10px] font-semibold tracking-wider text-shop-bg">NEW</span>
                  )}
                </div>
              </Reveal>
            </div>
          </div>

          {/* 정보 */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="shop-eyebrow animate-rise-1">
                {product.category} · {product.maker}
              </p>
              <h1 className="shop-display animate-rise-2 mt-3 text-[clamp(2.25rem,4vw,3.5rem)] text-shop-ink">{product.name}</h1>
              <p className="shop-italic animate-rise-2 mt-1 text-xl text-shop-muted">{product.english}</p>

              <div className="animate-rise-3 mt-6 flex items-baseline gap-3">
                <p className="text-2xl font-semibold text-shop-ink">{formatWon(product.price)}</p>
                {product.compareAt && (
                  <>
                    <p className="text-base text-shop-muted line-through">{formatWon(product.compareAt)}</p>
                    <span className="rounded-full bg-shop-accent/10 px-2 py-0.5 text-xs font-semibold text-shop-accent">
                      {Math.round((1 - product.price / product.compareAt) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <p className="animate-rise-3 mt-6 text-base leading-relaxed text-shop-muted">{product.description}</p>

              {product.options && (
                <fieldset className="animate-rise-4 mt-8">
                  <legend className="text-sm font-semibold text-shop-ink">
                    {product.options.label} <span className="ml-1 font-normal text-shop-muted">{option}</span>
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.options.values.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setOption(value)}
                        aria-pressed={option === value}
                        className={`h-10 rounded-full border px-4 text-sm transition ${
                          option === value ? 'border-shop-ink bg-shop-ink text-shop-bg' : 'border-shop-line text-shop-ink hover:border-shop-ink'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <div className="animate-rise-4 mt-8 flex items-center gap-3">
                <QtyStepper value={qty} onChange={(next) => setQty(Math.max(1, next))} />
                <button type="button" onClick={addToCart} className="shop-button flex-1">
                  {added ? (
                    <>
                      <Check size={16} /> 담았어요
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} /> 장바구니 담기 · {formatWon(product.price * qty)}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => cart.toggleWish(product.id)}
                  aria-pressed={wished}
                  aria-label="위시리스트"
                  className={`grid size-12 shrink-0 place-items-center rounded-full border transition ${
                    wished ? 'border-shop-accent text-shop-accent' : 'border-shop-line text-shop-ink hover:border-shop-ink'
                  }`}
                >
                  <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
                </button>
              </div>

              <ul className="animate-rise-5 mt-6 flex flex-col gap-2 text-xs text-shop-muted">
                <li className="flex items-center gap-2">
                  <Truck size={14} /> 5만 원 이상 무료배송 · 주문 후 2~3일 도착
                </li>
                <li className="flex items-center gap-2">
                  <RotateCcw size={14} /> 받은 날부터 14일 안에 반품 · 고쳐 쓰기 서비스 평생
                </li>
              </ul>

              <div className="mt-8 divide-y divide-shop-line border-y border-shop-line">
                {product.details.map((detail) => (
                  <details key={detail.label} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold text-shop-ink">
                      {detail.label}
                      <ChevronDown size={16} className="text-shop-muted transition group-open:rotate-180" />
                    </summary>
                    <p className="pb-4 text-sm leading-relaxed text-shop-muted">{detail.value}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <section className="border-t border-shop-line py-20">
        <Container>
          <Reveal>
            <p className="shop-eyebrow">You may also like</p>
            <h2 className="shop-display mt-3 text-3xl text-shop-ink">
              함께 두면 <em>좋은</em> 물건
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {related.map((item, i) => (
              <ProductCard key={item.id} product={item} delay={i * 60} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
