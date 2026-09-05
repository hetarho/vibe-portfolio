import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { FREE_SHIPPING_FROM, SHIPPING_FEE, findProduct, type Product } from './products'

export type CartLine = {
  key: string
  product: Product
  option?: string
  qty: number
}

type CartState = {
  lines: CartLine[]
  count: number
  subtotal: number
  shipping: number
  total: number
  isOpen: boolean
  wishlist: string[]
  add: (productId: string, option?: string, qty?: number) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  open: () => void
  close: () => void
  toggleWish: (productId: string) => void
  isWished: (productId: string) => boolean
}

const CartContext = createContext<CartState | null>(null)

/** 장바구니·위시리스트. ShopLayout 아래 모든 페이지가 함께 쓴다 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])

  const add = useCallback((productId: string, option?: string, qty = 1) => {
    const product = findProduct(productId)
    if (!product) return
    const key = option ? `${productId}:${option}` : productId
    setLines((items) => {
      const existing = items.find((line) => line.key === key)
      if (existing) return items.map((line) => (line.key === key ? { ...line, qty: line.qty + qty } : line))
      return [...items, { key, product, option, qty }]
    })
    setOpen(true)
  }, [])

  const setQty = useCallback((key: string, qty: number) => {
    setLines((items) =>
      qty <= 0 ? items.filter((line) => line.key !== key) : items.map((line) => (line.key === key ? { ...line, qty } : line)),
    )
  }, [])

  const remove = useCallback((key: string) => setLines((items) => items.filter((line) => line.key !== key)), [])
  const clear = useCallback(() => setLines([]), [])
  const toggleWish = useCallback(
    (productId: string) =>
      setWishlist((items) => (items.includes(productId) ? items.filter((id) => id !== productId) : [...items, productId])),
    [],
  )

  const value = useMemo<CartState>(() => {
    const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0)
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      isOpen,
      wishlist,
      add,
      setQty,
      remove,
      clear,
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggleWish,
      isWished: (productId) => wishlist.includes(productId),
    }
  }, [lines, isOpen, wishlist, add, setQty, remove, clear, toggleWish])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart는 CartProvider 안에서만 쓸 수 있습니다')
  return context
}
