import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from 'lucide-react'
import { quizQuestions, type QuizValue } from '../model/questions'
import '../styles.css'

export function QuizPage() {
  const [started, setStarted] = useState(false)
  const [question, setQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizValue[]>([])
  const [result, setResult] = useState<QuizValue | null>(null)
  const [copied, setCopied] = useState(false)

  const choose = (value: QuizValue) => {
    const next = [...answers, value]
    setAnswers(next)
    if (question === quizQuestions.length - 1) {
      const explorerCount = next.filter((answer) => answer === 'explorer').length
      setResult(explorerCount >= next.length / 2 ? 'explorer' : 'dreamer')
    } else {
      setQuestion((current) => current + 1)
    }
  }

  const reset = () => {
    setStarted(false)
    setQuestion(0)
    setAnswers([])
    setResult(null)
    setCopied(false)
  }

  const copyResult = async () => {
    await navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
  }

  if (result) {
    const isExplorer = result === 'explorer'
    return (
      <main className={`quiz-page result-page result-${result}`}>
        <div className="quiz-brand">MOOD.zip <span>나를 발견하는 가장 가벼운 방법</span></div>
        <section className="result-card">
          <div className="result-top"><span>YOUR MOOD IS</span><small>RESULT 0{isExplorer ? '7' : '3'}</small></div>
          <div className="result-visual">
            <div className="result-planet"><div className="planet-ring" /><span>{isExplorer ? '⚡' : '✦'}</span></div>
            <span className="float-word word-a">CURIOUS</span>
            <span className="float-word word-b">{isExplorer ? 'BOLD' : 'SENSITIVE'}</span>
            <span className="float-word word-c">FREE</span>
          </div>
          <div className="result-copy">
            <span>당신은</span>
            <h1>{isExplorer ? '호기심 많은\n도시 탐험가' : '감각적인\n낭만 수집가'}</h1>
            <p>{isExplorer
              ? '새로운 길과 낯선 장면에 마음이 뛰어요. 계획에 없던 발견을 즐기고, 일상을 나만의 모험으로 만드는 사람이에요.'
              : '스쳐 가는 장면의 분위기를 오래 기억해요. 작은 아름다움을 발견하고, 평범한 하루를 특별한 이야기로 만드는 사람이에요.'}</p>
            <div className="result-tags"><span>#{isExplorer ? '일단해봐' : '감성충전'}</span><span>#{isExplorer ? '새로운경험' : '나만의취향'}</span><span>#마이웨이</span></div>
          </div>
          <div className="result-actions">
            <button onClick={reset}><RotateCcw size={17} /> 다시 하기</button>
            <button onClick={copyResult}><Check size={17} /> {copied ? '복사 완료!' : '결과 링크 복사'}</button>
          </div>
        </section>
      </main>
    )
  }

  if (started) {
    const current = quizQuestions[question]
    return (
      <main className="quiz-page question-page">
        <div className="quiz-brand">MOOD.zip <span>나를 발견하는 가장 가벼운 방법</span></div>
        <section className="question-shell">
          <div className="question-meta">
            <button disabled={question === 0} onClick={() => { setQuestion((value) => value - 1); setAnswers((items) => items.slice(0, -1)) }} aria-label="이전 질문">
              <ArrowLeft size={19} />
            </button>
            <div>
              <span>Q{question + 1}</span>
              <div className="progress"><i style={{ width: `${((question + 1) / quizQuestions.length) * 100}%` }} /></div>
              <small>{question + 1} / {quizQuestions.length}</small>
            </div>
            <span>{current.eyebrow}</span>
          </div>
          <div className="question-content">
            <span>둘 중 더 가까운 쪽을 골라주세요.</span>
            <h1>{current.question}</h1>
            <div className="answer-grid">
              {current.options.map((option, index) => (
                <button key={option.value} onClick={() => choose(option.value)}>
                  <span>{option.emoji}</span><small>OPTION {String.fromCharCode(65 + index)}</small>
                  <strong>{option.label}</strong><ArrowRight size={21} />
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="quiz-page quiz-landing">
      <div className="quiz-brand">MOOD.zip <span>나를 발견하는 가장 가벼운 방법</span></div>
      <section className="quiz-intro">
        <div className="quiz-copy">
          <span className="quiz-label"><Sparkles size={15} /> 4문항 · 약 1분</span>
          <h1>요즘의 나는<br />어떤 <em>무드</em>일까?</h1>
          <p>별것 아닌 선택에 진짜 취향이 숨어 있어요.<br />지금 마음이 가는 답을 골라보세요.</p>
          <button onClick={() => setStarted(true)}>테스트 시작하기 <ArrowRight size={19} /></button>
          <small>12,482명이 자신의 무드를 발견했어요.</small>
        </div>
        <div className="quiz-art" aria-hidden="true">
          <div className="sticker sticker-one">WHAT&apos;S<br />YOUR<br /><b>MOOD?</b></div>
          <div className="sticker sticker-two">BE<br />HONEST!</div>
          <div className="purple-flower"><i /><i /><i /><i /><i /><span>☺</span></div>
          <div className="lime-star">✦</div><div className="blue-pill">FEEL IT</div>
          <div className="smile-orbit">☻</div><div className="spark spark-a">✦</div><div className="spark spark-b">✦</div>
        </div>
      </section>
      <div className="quiz-ticker"><div>NO RIGHT ANSWERS <span>★</span> JUST YOUR MOOD <span>★</span> TRUST YOUR FIRST FEELING <span>★</span> NO RIGHT ANSWERS <span>★</span></div></div>
    </main>
  )
}
