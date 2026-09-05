import { useState, type ImgHTMLAttributes } from 'react'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  /** 사진이 채울 상자의 클래스. 배경색을 주면 로드 전에 그 면이 보인다 */
  frameClassName?: string
}

/** 로드되면 부드럽게 떠오르는 사진. 상자(frame)가 크기와 비율을 결정한다 */
export function Photo({ frameClassName = '', className = '', alt = '', loading = 'lazy', ...rest }: Props) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`relative overflow-hidden ${frameClassName}`}>
      <img
        {...rest}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`img-fade ${loaded ? 'is-loaded' : ''} size-full object-cover ${className}`}
      />
    </div>
  )
}
