import { useEffect, useState } from 'react'

/** 화면을 threshold(px) 이상 내렸는지. 사이트 헤더가 배경을 얻는 시점에 쓴다 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}
