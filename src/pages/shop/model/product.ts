export type Product = {
  id: number
  name: string
  category: '리빙' | '키친' | '패브릭'
  price: number
  color: string
  accent: string
  shape: 'lamp' | 'vase' | 'chair' | 'cup' | 'tray' | 'fabric'
  image: string
  imageAlt: string
  photographer: string
  sourceUrl: string
  isNew?: boolean
}
