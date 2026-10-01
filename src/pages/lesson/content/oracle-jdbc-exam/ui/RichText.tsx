/**
 * 문제집 원문의 `코드`와 **강조** 표기를 화면용으로 그린다.
 * 원문을 손대지 않고 그대로 넣기 위해 마크다운 두 가지만 읽는다.
 * 코드 조각의 바탕은 sunken이라 raised·accentSoft 면 위에 얹는다.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)

  return (
    <>
      {parts.map((part, index) => {
        if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={index}
              className="rounded-control bg-surface-sunken px-1.5 py-0.5 font-mono font-semibold text-content-strong wrap-anywhere"
            >
              {part.slice(1, -1)}
            </code>
          )
        }
        if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-bold text-content-strong">
              {part.slice(2, -2)}
            </strong>
          )
        }
        return part
      })}
    </>
  )
}
