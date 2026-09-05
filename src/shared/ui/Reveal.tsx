import { useEffect, useRef, useState, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** 등장 지연(ms). 형제 요소를 순서대로 띄울 때 쓴다 */
  delay?: number
  /** scale: 살짝 커지며 등장 (사진 블록용). 기본은 아래에서 떠오르기 */
  variant?: 'rise' | 'scale'
  as?: ElementType
  className?: string
  style?: CSSProperties
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'style' | 'children'>

/**
 * 뷰포트에 들어오면 한 번 등장하는 래퍼. 스타일은 app/styles/base.css의 .reveal이 소유한다.
 * 포트폴리오 사이트 3종이 함께 쓴다.
 */
export function Reveal({ children, delay = 0, variant = 'rise', as: Tag = 'div', className = '', style, ...rest }: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const base = variant === 'scale' ? 'reveal-scale' : 'reveal'
  return (
    <Tag
      {...rest}
      ref={ref}
      className={`${base} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
