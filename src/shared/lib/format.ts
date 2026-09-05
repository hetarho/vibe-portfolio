/** 12345 -> "12,345" */
export const formatNumber = (value: number) => value.toLocaleString('ko-KR')

/** 12345 -> "12,345원" */
export const formatWon = (value: number) => `${formatNumber(value)}원`
