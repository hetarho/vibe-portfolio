export type Page = 'studio' | 'shop' | 'quiz'

export const pageInfo: Record<Page, { label: string; number: string; path: string }> = {
  studio: { label: '브랜드 스튜디오', number: '01', path: '/' },
  shop: { label: '라이프 숍', number: '02', path: '/shop' },
  quiz: { label: '취향 퀴즈', number: '03', path: '/quiz' },
}

export function getPageFromPath(pathname: string): Page {
  if (pathname.startsWith('/shop')) return 'shop'
  if (pathname.startsWith('/quiz')) return 'quiz'
  return 'studio'
}
