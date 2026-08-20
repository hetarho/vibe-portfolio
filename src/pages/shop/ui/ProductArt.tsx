import type { CSSProperties } from 'react'
import type { Product } from '../model/product'

export function ProductArt({ product }: { product: Product }) {
  return (
    <div
      className={`product-art art-${product.shape}`}
      style={{ '--product-bg': product.color, '--product-accent': product.accent } as CSSProperties}
    >
      <img src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" />
      <span className="art-shadow" />
      <span className="art-object" />
      <span className="art-detail" />
    </div>
  )
}
