import type { Product } from './product'

export const products: Product[] = [
  {
    id: 1, name: '오브제 플로어 램프', category: '리빙', price: 89000, color: '#d8bda3', accent: '#8f5c3d', shape: 'lamp', isNew: true,
    image: '/images/product-lamp.jpg', imageAlt: '따뜻한 빛을 내는 미니멀 플로어 램프', photographer: 'mk. s',
    sourceUrl: 'https://unsplash.com/photos/a-lamp-sitting-next-to-a-couch-in-a-room-3LdrBCdUqVA',
  },
  {
    id: 2, name: '소일 화병 02', category: '리빙', price: 46000, color: '#d7d1c4', accent: '#777064', shape: 'vase',
    image: '/images/product-vase.jpg', imageAlt: '내추럴 패브릭 위에 놓인 무광 세라믹 화병', photographer: 'WARION Taipei',
    sourceUrl: 'https://unsplash.com/photos/minimalist-photography-of-two-white-ceramic-vases-8QIAj5tHDdc',
  },
  {
    id: 3, name: '페블 라운지 체어', category: '리빙', price: 248000, color: '#b9c3a3', accent: '#576246', shape: 'chair', isNew: true,
    image: '/images/product-chair.jpg', imageAlt: '컬러풀한 공간에 놓인 초록색 라운지 체어', photographer: 'Fujiphilm',
    sourceUrl: 'https://unsplash.com/photos/green-chair-in-a-colorful-room-with-plants-8HEGITOFEuw',
  },
  {
    id: 4, name: '데일리 머그 세트', category: '키친', price: 32000, color: '#d8c9ba', accent: '#8c7867', shape: 'cup',
    image: '/images/product-mug.jpg', imageAlt: '트레이 위의 러스틱 세라믹 머그 세트', photographer: 'Mary Potoplyak',
    sourceUrl: 'https://unsplash.com/photos/Iy5snvY2ZfA',
  },
  {
    id: 5, name: '우드 리추얼 트레이', category: '키친', price: 54000, color: '#caa579', accent: '#724a2d', shape: 'tray',
    image: '/images/product-tray.jpg', imageAlt: '캔들과 작은 식물을 올린 우드 트레이', photographer: 'Adil Murshed',
    sourceUrl: 'https://unsplash.com/photos/decorations-on-a-wooden-tray-with-a-candle-and-plant-2DBvJvSEhiE',
  },
  {
    id: 6, name: '고요 니트 블랭킷', category: '패브릭', price: 72000, color: '#c4c9c3', accent: '#69716e', shape: 'fabric',
    image: '/images/product-blanket.jpg', imageAlt: '암체어 위에 자연스럽게 놓인 머스터드 니트 블랭킷', photographer: 'Lori B',
    sourceUrl: 'https://unsplash.com/photos/a-chair-with-a-blanket-on-top-of-it-2ZE8REkSCaE',
  },
]
