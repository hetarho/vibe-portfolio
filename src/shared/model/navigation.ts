export type Page = 'studio' | 'shop' | 'quiz'

export const pageInfo: Record<Page, { label: string; number: string }> = {
  studio: { label: '브랜드 스튜디오', number: '01' },
  shop: { label: '라이프 숍', number: '02' },
  quiz: { label: '취향 퀴즈', number: '03' },
}

export function getPageFromHash(): Page {
  const hash = window.location.hash.replace('#/', '')
  return hash === 'shop' || hash === 'quiz' ? hash : 'studio'
}
