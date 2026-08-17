import { useCallback, useState } from 'react'

const STORAGE_KEY = 'lesson:vibe-coding-workshop:ideas'

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

function write(list: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    /* 저장 실패해도 강의 진행에는 영향이 없다 */
  }
}

/**
 * S2에서 받아 적은 참가자 아이디어를 S16(주제 선택)에서 다시 꺼내 쓰기 위해
 * localStorage에 보관한다. 슬라이드는 활성화될 때만 마운트되므로 마운트 시점에 읽는다.
 */
export function useIdeas() {
  const [ideas, setIdeas] = useState<string[]>(read)

  const add = useCallback((value: string) => {
    const text = value.trim()
    if (!text) return
    setIdeas((list) => {
      const next = [...list, text]
      write(next)
      return next
    })
  }, [])

  const remove = useCallback((index: number) => {
    setIdeas((list) => {
      const next = list.filter((_, itemIndex) => itemIndex !== index)
      write(next)
      return next
    })
  }, [])

  return { ideas, add, remove }
}
