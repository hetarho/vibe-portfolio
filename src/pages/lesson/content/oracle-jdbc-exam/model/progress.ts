import { useCallback, useState } from 'react'
import { PROBLEMS } from './problems'
import { ACADEMY_PROBLEMS } from './academy-problems'
import { UNITS } from './units'

/** 정답을 연 뒤 스스로 매기는 점수 */
export type Grade = 'got' | 'unsure' | 'missed'

export type Note = {
  /** 정답을 열기 전에 직접 써 본 답 */
  draft: string
  grade: Grade | null
}

export type NoteMap = Record<number, Note>

const STORAGE_KEY = 'lesson:oracle-jdbc-exam:notes'

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
    /* 저장이 막혀 있어도 문제를 푸는 데는 지장이 없다 */
  }
}

/**
 * 한 문제의 답안 초안과 자가 채점 결과.
 * 슬라이드는 넘길 때마다 새로 그려지므로 상태를 localStorage에 둔다.
 * 그래야 다른 문제를 보고 돌아와도 쓴 답이 남고, 정리 화면에서 단원별로 모아 볼 수 있다.
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

export type UnitSummary = {
  key: string
  title: string
  total: number
  got: number[]
  unsure: number[]
  missed: number[]
}

export type Summary = {
  units: UnitSummary[]
  graded: number
  got: number
  unsure: number
  missed: number
  total: number
  /** 못 썼다 + 애매하다, 번호순 */
  again: number[]
}

function summarize(notes: NoteMap): Summary {
  const units: UnitSummary[] = UNITS.map((unit) => ({
    key: unit.key,
    title: unit.title,
    total: 0,
    got: [],
    unsure: [],
    missed: [],
  }))
  units.push(
    { key: '학원 JDBC', title: '학원 제공 JDBC 예시', total: 0, got: [], unsure: [], missed: [] },
    { key: '학원 SQL', title: '학원 제공 SQL 예시', total: 0, got: [], unsure: [], missed: [] },
  )

  for (const problem of [...PROBLEMS, ...ACADEMY_PROBLEMS]) {
    const key = 'source' in problem ? `학원 ${problem.section}` : problem.unit
    const unit = units.find((item) => item.key === key)
    if (!unit) continue
    unit.total += 1
    const grade = notes[problem.no]?.grade ?? null
    if (grade) unit[grade].push(problem.no)
  }

  const got = units.reduce((sum, unit) => sum + unit.got.length, 0)
  const unsure = units.reduce((sum, unit) => sum + unit.unsure.length, 0)
  const missed = units.reduce((sum, unit) => sum + unit.missed.length, 0)
  const again = units.flatMap((unit) => [...unit.missed, ...unit.unsure]).sort((a, b) => a - b)

  return { units, graded: got + unsure + missed, got, unsure, missed, total: PROBLEMS.length + ACADEMY_PROBLEMS.length, again }
}

/** 정리 화면에서 쓰는 전체 현황. 화면에 들어올 때 한 번 읽는다. */
export function useSummary(): { summary: Summary; reset: () => void } {
  const [notes, setNotes] = useState<NoteMap>(readNotes)

  const reset = useCallback(() => {
    writeNotes({})
    setNotes({})
  }, [])

  return { summary: summarize(notes), reset }
}
