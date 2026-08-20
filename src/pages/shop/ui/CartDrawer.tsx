import { ArrowRight, Minus, ShoppingBag, X } from 'lucide-react'
import type { Product } from '../model/product'
import { ProductArt } from './ProductArt'

type Props = {
  products: Product[]
  onClose: () => void
  onRemove: (index: number) => void
}

export function CartDrawer({ products, onClose, onRemove }: Props) {
  const total = products.reduce((sum, product) => sum + product.price, 0)

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="cart-title">
          <h2>장바구니 <span>{products.length}</span></h2>
          <button onClick={onClose} aria-label="장바구니 닫기"><X /></button>
        </div>

        {products.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={40} />
            <p>아직 담긴 물건이 없어요.</p>
            <button onClick={onClose}>쇼핑 계속하기</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {products.map((product, index) => (
                <div className="cart-item" key={`${product.id}-${index}`}>
                  <ProductArt product={product} />
                  <div><span>{product.category}</span><h3>{product.name}</h3><strong>{product.price.toLocaleString()}원</strong></div>
                  <button onClick={() => onRemove(index)} aria-label={`${product.name} 제거`}><Minus size={16} /></button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>합계</span><strong>{total.toLocaleString()}원</strong></div>
              <small>50,000원 이상 구매 시 무료배송</small>
              <button onClick={onClose}>구매하기 <ArrowRight size={18} /></button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
