import { useSearch } from '@tanstack/react-router'
import { SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { formatWon } from '@/shared/lib'
import { Reveal } from '@/shared/ui'
import { categories, products, type Category } from '../model/products'
import { Container, ProductCard } from './primitives'

type Sort = 'recommended' | 'new' | 'price-asc' | 'price-desc'

const sorts: { value: Sort; label: string }[] = [
  { value: 'recommended', label: '추천순' },
  { value: 'new', label: '신상품' },
  { value: 'price-asc', label: '낮은 가격' },
  { value: 'price-desc', label: '높은 가격' },
]

const maxPrice = Math.max(...products.map((product) => product.price))

export function ShopCollectionPage() {
  const search = useSearch({ strict: false }) as { category?: string }
  const [picked, setPicked] = useState<Category[]>([])
  const [priceCap, setPriceCap] = useState(maxPrice)
  const [newOnly, setNewOnly] = useState(false)
  const [sort, setSort] = useState<Sort>('recommended')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    const fromUrl = categories.find((category) => category === search.category)
    setPicked(fromUrl ? [fromUrl] : [])
  }, [search.category])

  const visible = useMemo(() => {
    const filtered = products.filter(
      (product) =>
        (picked.length === 0 || picked.includes(product.category)) && product.price <= priceCap && (!newOnly || product.isNew),
    )
    switch (sort) {
      case 'new':
        return [...filtered].sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)))
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price)
      default:
        return filtered
    }
  }, [picked, priceCap, newOnly, sort])

  const toggle = (category: Category) =>
    setPicked((items) => (items.includes(category) ? items.filter((item) => item !== category) : [...items, category]))

  const reset = () => {
    setPicked([])
    setPriceCap(maxPrice)
    setNewOnly(false)
  }

  const activeCount = picked.length + (priceCap < maxPrice ? 1 : 0) + (newOnly ? 1 : 0)

  const filters = (
    <div className="flex flex-col gap-8">
      <fieldset>
        <legend className="shop-eyebrow">카테고리</legend>
        <ul className="mt-4 flex flex-col gap-1">
          {categories.map((category) => {
            const on = picked.includes(category)
            const count = products.filter((product) => product.category === category).length
            return (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => toggle(category)}
                  aria-pressed={on}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                    on ? 'bg-shop-ink text-shop-bg' : 'text-shop-ink hover:bg-shop-sunken'
                  }`}
                >
                  {category}
                  <span className={`font-mono text-[11px] ${on ? 'text-shop-bg/70' : 'text-shop-muted'}`}>{count}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="shop-eyebrow">가격</legend>
        <p className="mt-4 text-sm text-shop-ink">
          <b>{formatWon(priceCap)}</b> 이하
        </p>
        <input
          type="range"
          min={20000}
          max={maxPrice}
          step={2000}
          value={priceCap}
          onChange={(event) => setPriceCap(Number(event.target.value))}
          className="mt-3 w-full accent-shop-accent"
          aria-label="최대 가격"
        />
        <div className="mt-1 flex justify-between text-[11px] text-shop-muted">
          <span>2만 원</span>
          <span>{formatWon(maxPrice)}</span>
        </div>
      </fieldset>

      <label className="flex items-center justify-between rounded-xl bg-shop-surface px-4 py-3 text-sm">
        신상품만 보기
        <input type="checkbox" checked={newOnly} onChange={(event) => setNewOnly(event.target.checked)} className="size-4 accent-shop-accent" />
      </label>

      {activeCount > 0 && (
        <button type="button" onClick={reset} className="shop-link w-fit text-xs text-shop-muted">
          <X size={12} /> 필터 초기화
        </button>
      )}
    </div>
  )

  return (
    <>
      <section className="shop-paper border-b border-shop-line">
        <Container className="py-14 sm:py-20">
          <p className="shop-eyebrow animate-rise-1">Collection</p>
          <h1 className="shop-display animate-rise-2 mt-4 text-[clamp(2.75rem,6vw,5.5rem)] text-shop-ink">
            전체 <em>{products.length}</em>가지 물건
          </h1>
          <p className="animate-rise-3 mt-5 max-w-lg text-base text-shop-muted">
            입점 전 석 달을 직접 써 본 물건만 올립니다. 만든 사람의 이름을 함께 적어 둡니다.
          </p>
        </Container>
      </section>

      <Container className="grid gap-10 py-10 lg:grid-cols-12 lg:py-14">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-28">{filters}</div>
        </aside>

        <div className="lg:col-span-9">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-shop-line pb-4">
            <p className="text-sm text-shop-muted">
              <b className="text-shop-ink">{visible.length}</b>개의 물건
              {picked.length > 0 && <span className="ml-2">· {picked.join(', ')}</span>}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-shop-line px-4 text-sm lg:hidden"
              >
                <SlidersHorizontal size={15} /> 필터 {activeCount > 0 && <span className="font-mono text-xs">({activeCount})</span>}
              </button>
              <label className="flex h-10 items-center gap-2 rounded-full border border-shop-line px-4 text-sm">
                <span className="text-shop-muted">정렬</span>
                <select value={sort} onChange={(event) => setSort(event.target.value as Sort)} className="bg-transparent text-shop-ink outline-none">
                  {sorts.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {visible.length === 0 ? (
            <Reveal className="flex flex-col items-center gap-4 py-32 text-center">
              <p className="shop-display text-3xl text-shop-ink">조건에 맞는 물건이 없어요.</p>
              <p className="text-sm text-shop-muted">필터를 조금 풀어 보세요.</p>
              <button type="button" onClick={reset} className="shop-button-ghost mt-2">
                필터 초기화
              </button>
            </Reveal>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
              {visible.map((product, index) => (
                <ProductCard key={product.id} product={product} delay={(index % 3) * 60} eager={index < 6} />
              ))}
            </div>
          )}
        </div>
      </Container>

      {filtersOpen && (
        <div className="fixed inset-0 z-[100] flex lg:hidden" role="dialog" aria-modal aria-label="필터">
          <button type="button" className="animate-fade absolute inset-0 bg-shop-ink/40" onClick={() => setFiltersOpen(false)} aria-label="닫기" />
          <aside className="animate-rise relative mt-auto w-full rounded-t-3xl bg-shop-bg p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="shop-display text-2xl">필터</h2>
              <button type="button" onClick={() => setFiltersOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-shop-sunken" aria-label="필터 닫기">
                <X size={20} />
              </button>
            </div>
            {filters}
            <button type="button" onClick={() => setFiltersOpen(false)} className="shop-button mt-8 w-full">
              {visible.length}개 보기
            </button>
          </aside>
        </div>
      )}
    </>
  )
}
