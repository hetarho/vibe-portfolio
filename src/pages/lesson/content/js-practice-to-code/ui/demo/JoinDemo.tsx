import { useRef, useState } from 'react'
import { cx } from '../../../../deck'
import { DemoButton, DemoFrame, fieldClass } from './kit'

type Note = { text: string; ok: boolean } | null
type Field = 'id' | 'pwd' | 'pwd2' | 'name'

function NoteText({ note }: { note: Note }) {
  if (!note) return null
  return <span className={cx('text-deck-caption font-semibold', note.ok ? 'text-positive' : 'text-critical')}>{note.text}</span>
}

/**
 * Practice3 완성본 · 칠 때마다 아이디를, 칸에서 나갈 때 비밀번호를, 버튼에서 전부를 확인한다.
 * 알림창을 닫은 뒤에 칸을 비우고 커서를 옮기는 순서는 정답 파일과 같다.
 */
export function JoinDemo() {
  const [values, setValues] = useState<Record<Field, string>>({ id: '', pwd: '', pwd2: '', name: '' })
  const [idNote, setIdNote] = useState<Note>(null)
  const [pwdNote, setPwdNote] = useState<Note>(null)
  const [alert, setAlert] = useState<{ message: string; then: () => void } | null>(null)
  const refs = {
    id: useRef<HTMLInputElement>(null),
    pwd: useRef<HTMLInputElement>(null),
    pwd2: useRef<HTMLInputElement>(null),
    name: useRef<HTMLInputElement>(null),
  }

  const set = (field: Field, value: string) => setValues((prev) => ({ ...prev, [field]: value }))

  const checkId = (id: string) => {
    if (id === '') setIdNote(null)
    else if (id === 'user01') setIdNote({ text: '이미 존재하는 아이디입니다.', ok: false })
    else setIdNote({ text: '사용 가능한 아이디입니다.', ok: true })
  }

  const checkPwd = () => {
    if (values.pwd === values.pwd2) setPwdNote({ text: '비밀번호가 일치합니다.', ok: true })
    else setPwdNote({ text: '비밀번호가 일치하지 않습니다.', ok: false })
  }

  /** 알리고, 닫으면 (필요하면 칸을 비우고) 그 칸에 커서를 둔다 */
  const stop = (message: string, field: Field, clear = false) =>
    setAlert({
      message,
      then: () => {
        if (clear) set(field, '')
        refs[field].current?.focus()
      },
    })

  const join = () => {
    if (values.id === '') return stop('아이디를 입력해주세요', 'id')
    if (values.pwd === '') return stop('비밀번호를 입력해주세요', 'pwd')
    if (values.pwd2 === '') return stop('비밀번호 확인을 입력해주세요', 'pwd2')
    if (values.name === '') return stop('이름을 입력해주세요', 'name')
    if (values.id === 'user01') return stop('사용할 수 없는 아이디입니다', 'id', true)
    if (values.pwd !== values.pwd2) return stop('비밀번호가 일치하지 않습니다', 'pwd2', true)
    setAlert({
      message: `${values.name}님, 회원가입이 성공적으로 완료되었습니다^^`,
      then: () => {
        setValues({ id: '', pwd: '', pwd2: '', name: '' })
        setIdNote(null)
        setPwdNote(null)
      },
    })
  }

  const closeAlert = () => {
    const next = alert?.then
    setAlert(null)
    next?.()
  }

  return (
    <DemoFrame title="Practice3" alert={alert ? { message: alert.message, onClose: closeAlert } : null}>
      <div className="flex flex-col gap-3 rounded-card bg-surface-raised px-4 py-4 shadow-raised">
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-36 shrink-0 text-deck-caption font-semibold text-content-secondary">아이디</span>
          <input
            ref={refs.id}
            className={`${fieldClass} w-56`}
            value={values.id}
            onChange={(e) => set('id', e.target.value)}
            onKeyUp={(e) => checkId(e.currentTarget.value)}
          />
          <NoteText note={idNote} />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-36 shrink-0 text-deck-caption font-semibold text-content-secondary">비밀번호</span>
          <input ref={refs.pwd} type="password" className={`${fieldClass} w-56`} value={values.pwd} onChange={(e) => set('pwd', e.target.value)} />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-36 shrink-0 text-deck-caption font-semibold text-content-secondary">비밀번호 확인</span>
          <input
            ref={refs.pwd2}
            type="password"
            className={`${fieldClass} w-56`}
            value={values.pwd2}
            onChange={(e) => set('pwd2', e.target.value)}
            onBlur={checkPwd}
          />
          <NoteText note={pwdNote} />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-36 shrink-0 text-deck-caption font-semibold text-content-secondary">이름</span>
          <input ref={refs.name} className={`${fieldClass} w-56`} value={values.name} onChange={(e) => set('name', e.target.value)} />
        </div>
        <div className="flex">
          <DemoButton onClick={join}>회원가입</DemoButton>
        </div>
      </div>
    </DemoFrame>
  )
}
