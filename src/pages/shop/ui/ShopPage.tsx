import { useState } from 'react'
import { ArrowDown, ArrowRight, Heart, Plus, Search, ShoppingBag, X } from 'lucide-react'
import { products } from '../model/products'
import { CartDrawer } from './CartDrawer'
import { ProductArt } from './ProductArt'

export function ShopPage() {
  const [category, setCategory] = useState('전체')
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<number[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [liked, setLiked] = useState<number[]>([])

  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === '전체' || product.category === category
    return matchesCategory && product.name.includes(query)
  })

  const cartProducts = cart
    .map((id) => products.find((product) => product.id === id))
    .filter((product) => product !== undefined)

  const addToCart = (id: number) => {
    setCart((items) => [...items, id])
    setCartOpen(true)
  }

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <div className="shop-nav">
          <span>OHAU</span>
          <nav><button>SHOP</button><button>STORIES</button><button>ABOUT</button></nav>
          <div>
            <button aria-label="검색" onClick={() => setSearchOpen(!searchOpen)}><Search size={19} /></button>
            <button className="bag-button" aria-label={`장바구니 ${cart.length}개`} onClick={() => setCartOpen(true)}>
              <ShoppingBag size={19} /><span>{cart.length}</span>
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="search-bar">
            <Search size={19} />
            <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="어떤 물건을 찾고 있나요?" />
            <button onClick={() => { setSearchOpen(false); setQuery('') }} aria-label="검색 닫기"><X size={19} /></button>
          </div>
        )}

        <div className="shop-hero-content">
          <div>
            <span>SPRING, 2026</span>
            <h1>매일의 모양을<br /><em>조금 더 다정하게.</em></h1>
            <p>오래 곁에 두고 싶은 물건을 소개합니다.<br />쓰임과 아름다움 사이, 오하우의 새로운 컬렉션.</p>
            <button onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}>
              컬렉션 보기 <ArrowDown size={16} />
            </button>
          </div>
          <div className="hero-product-photo">
            <img src="/images/shop-hero.jpg" alt="하얀 세라믹 테이블웨어" />
            <div className="photo-note"><span>NEW COLLECTION</span><strong>Soft<br />Objects</strong><small>01 — 06</small></div>
          </div>
        </div>
      </section>

      <section className="shop-marquee" aria-hidden="true">
        <div>THOUGHTFUL OBJECTS FOR SLOW LIVING <span>✦</span> THOUGHTFUL OBJECTS FOR SLOW LIVING <span>✦</span></div>
      </section>

      <section className="product-section" id="products">
        <div className="product-heading">
          <div><span>CURATED FOR YOU</span><h2>이번 주의 물건</h2></div>
          <p>일상에 자연스럽게 스며드는<br />6가지 작은 변화를 만나보세요.</p>
        </div>
        <div className="category-row">
          {['전체', '리빙', '키친', '패브릭'].map((item) => (
            <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>
          ))}
          <span>{visibleProducts.length} ITEMS</span>
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                {product.isNew && <span className="new-badge">NEW</span>}
                <button
                  className={liked.includes(product.id) ? 'like liked' : 'like'}
                  onClick={() => setLiked((items) => items.includes(product.id) ? items.filter((id) => id !== product.id) : [...items, product.id])}
                  aria-label="찜하기"
                ><Heart size={18} fill="currentColor" /></button>
                <ProductArt product={product} />
                <button className="quick-add" onClick={() => addToCart(product.id)}><Plus size={17} /> 장바구니 담기</button>
              </div>
              <div className="product-info">
                <div><span>{product.category}</span><h3>{product.name}</h3></div>
                <strong>{product.price.toLocaleString()}원</strong>
              </div>
              <a className="product-credit" href={product.sourceUrl} target="_blank" rel="noreferrer">
                Photo by {product.photographer} / Unsplash
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="shop-story">
        <div className="story-visual">
          <img src="/images/shop-story.jpg" alt="드라이플라워를 꽂은 조형적인 세라믹 화병" loading="lazy" />
          <span>O</span><p>objects<br />with a story</p>
          <a href="https://unsplash.com/photos/white-ceramic-vase-with-flowers-ogqEE42qdK0" target="_blank" rel="noreferrer">
            Photo by Anh Lam / Unsplash
          </a>
        </div>
        <div className="story-copy">
          <span>OUR STORY</span><h2>천천히 골라,<br />오래 쓰는 마음.</h2>
          <p>유행보다 쓰임을, 화려함보다 손에 닿는 감각을 생각합니다. 오하우는 시간이 지날수록 더 좋아지는 물건을 찾습니다.</p>
          <button>오하우 이야기 <ArrowRight size={16} /></button>
        </div>
      </section>

      <footer className="shop-footer">
        <b>OHAU</b><p>매일의 모양을 조금 더 다정하게.</p>
        <div><span>Instagram</span><span>Contact</span><span>Terms</span></div><small>© 2026 OHAU OBJECTS</small>
      </footer>

      {cartOpen && (
        <CartDrawer
          products={cartProducts}
          onClose={() => setCartOpen(false)}
          onRemove={(index) => setCart((items) => items.filter((_, itemIndex) => itemIndex !== index))}
        />
      )}
    </main>
  )
}
