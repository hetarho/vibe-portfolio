import { useCallback, useState } from 'react'
import { QUIZ_PROBLEMS } from './problems'

/** 풀이 화면에서 스스로 매기는 점수 */
export type Grade = 'got' | 'unsure' | 'missed'

export type Note = {
  /** 문제 화면에서 직접 써 본 답안 */
  draft: string
  grade: Grade | null
}

export type NoteMap = Record<number, Note>

const STORAGE_KEY = 'lesson:java-exam-retake:notes'

const EMPTY: Note = { draft: '', grade: null }

function isGrade(value: unknown): value is Grade {
  return value === 'got' || value === 'unsure' || value === 'missed'
}

export function readNotes(): NoteMap {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}

    const result: NoteMap = {}
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      const no = Number(key)
      if (!Number.isInteger(no) || !value || typeof value !== 'object') continue
      const note = value as Record<string, unknown>
      result[no] = {
        draft: typeof note.draft === 'string' ? note.draft : '',
        grade: isGrade(note.grade) ? note.grade : null,
      }
    }
    return result
  } catch {
    return {}
  }
}

function writeNotes(notes: NoteMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch {
    /* 저장이 막혀 있어도 수업 진행에는 영향이 없다 */
  }
}

/**
 * 한 문제의 답안 초안과 자가 채점 결과.
 * 슬라이드는 넘길 때마다 새로 그려지므로 상태를 localStorage에 둔다.
 * 그래야 문제 화면에서 쓴 답을 다음 화면인 풀이에서 그대로 꺼내 비교할 수 있고,
 * 마지막 정리 화면에서 틀린 문제만 모아 볼 수 있다.
 */
export function useNote(no: number) {
  const [note, setNote] = useState<Note>(() => readNotes()[no] ?? EMPTY)

  const update = useCallback(
    (patch: Partial<Note>) => {
      setNote((current) => {
        const next = { ...current, ...patch }
        const all = readNotes()
        all[no] = next
        writeNotes(all)
        return next
      })
    },
    [no],
  )

  const setDraft = useCallback((draft: string) => update({ draft }), [update])
  const setGrade = useCallback((grade: Grade) => update({ grade }), [update])

  return { note, setDraft, setGrade }
}

export type Summary = {
  got: number[]
  unsure: number[]
  missed: number[]
  untouched: number[]
  graded: number
  total: number
}

/** 정리 화면에서 쓰는 전체 현황. 화면에 들어올 때 한 번 읽는다. */
export function useSummary(): { summary: Summary; reset: () => void } {
  const [notes, setNotes] = useState<NoteMap>(readNotes)

  const summary: Summary = {
    got: [],
    unsure: [],
    missed: [],
    untouched: [],
    graded: 0,
    total: QUIZ_PROBLEMS.length,
  }

  for (const problem of QUIZ_PROBLEMS) {
    const grade = notes[problem.no]?.grade ?? null
    if (grade === 'got') summary.got.push(problem.no)
    else if (grade === 'unsure') summary.unsure.push(problem.no)
    else if (grade === 'missed') summary.missed.push(problem.no)
    else summary.untouched.push(problem.no)
  }
  summary.graded = summary.got.length + summary.unsure.length + summary.missed.length

  const reset = useCallback(() => {
    writeNotes({})
    setNotes({})
  }, [])

  return { summary, reset }
}
