import { useState } from 'react'
import { ArrowDown, ArrowRight, X } from 'lucide-react'
import '../styles.css'

/** onNext — 푸터의 NEXT PROJECT. 다음 작품으로 넘기는 것만 라우터에 맡긴다 */
export function StudioPage({ onNext }: { onNext: () => void }) {
  const [showContact, setShowContact] = useState(false)

  return (
    <main className="studio-page">
      <section className="studio-hero">
        <div className="studio-kicker"><span /> 브랜드가 더 선명해지는 순간</div>
        <h1>WE SHAPE<br /><em>BRAND</em> MOMENTS.</h1>
        <div className="hero-bottom">
          <p>좋은 브랜드는 설명보다 먼저 느껴집니다.<br />우리는 그 첫인상을 설계합니다.</p>
          <button className="round-arrow" onClick={() => document.querySelector('#studio-work')?.scrollIntoView({ behavior: 'smooth' })} aria-label="프로젝트 보기">
            <ArrowDown size={24} />
          </button>
        </div>
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="hero-grid" />
      </section>

      <section className="studio-intro">
        <div className="section-index">( ABOUT US )</div>
        <p>전략에서 인터페이스까지,<br />브랜드의 모든 접점을 하나의<br /><em>인상적인 경험</em>으로 만듭니다.</p>
        <div className="studio-stats">
          <div><strong>42</strong><span>PROJECTS</span></div>
          <div><strong>8</strong><span>YEARS</span></div>
          <div><strong>17</strong><span>AWARDS</span></div>
        </div>
      </section>

      <section className="studio-work" id="studio-work">
        <div className="work-heading">
          <div className="section-index">( SELECTED WORK )</div>
          <h2>MADE TO<br />BE <em>FELT.</em></h2>
          <span>2024 — 2026</span>
        </div>

        <div className="project-grid">
          <article className="project-card project-large">
            <div className="project-visual visual-a"><span className="bloom" /><b>morrow</b></div>
            <div className="project-caption"><span>01 / MORROW</span><span>BRAND · DIGITAL</span><span>2026</span></div>
          </article>
          <article className="project-card project-small">
            <div className="project-visual visual-b"><div className="arch" /><b>ONDO</b></div>
            <div className="project-caption"><span>02 / ONDO</span><span>IDENTITY</span><span>2025</span></div>
          </article>
          <article className="project-card project-wide">
            <div className="project-visual visual-c"><div className="chrome-ball" /><b>FORM / 07</b></div>
            <div className="project-caption"><span>03 / FORM</span><span>CAMPAIGN · WEB</span><span>2025</span></div>
          </article>
        </div>
      </section>

      <section className="studio-services">
        <div className="section-index">( WHAT WE DO )</div>
        {['Brand Strategy', 'Visual Identity', 'Digital Experience', 'Creative Direction'].map((service, index) => (
          <div className="service-row" key={service}>
            <span>0{index + 1}</span><h3>{service}</h3><ArrowRight />
          </div>
        ))}
      </section>

      <section className="studio-cta">
        <p>HAVE A PROJECT IN MIND?</p>
        <h2>LET&apos;S MAKE<br /><em>SOMETHING</em> MATTER.</h2>
        <button onClick={() => setShowContact(true)}>프로젝트 문의하기 <ArrowRight size={18} /></button>
      </section>

      <footer className="studio-footer">
        <b>VIBE®</b>
        <span>SEOUL, KOREA<br />37.5665° N, 126.9780° E</span>
        <span>INSTAGRAM &nbsp; BEHANCE<br />© 2026 VIBE STUDIO</span>
        <button onClick={onNext}>NEXT PROJECT <ArrowRight size={16} /></button>
      </footer>

      {showContact && (
        <div className="modal-backdrop" onClick={() => setShowContact(false)}>
          <div className="contact-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowContact(false)} aria-label="문의 닫기"><X /></button>
            <span>START A PROJECT</span>
            <h3>좋은 이야기를<br />들려주세요.</h3>
            <input aria-label="이름" placeholder="이름 / 회사명" />
            <input aria-label="이메일" placeholder="이메일" type="email" />
            <textarea aria-label="프로젝트 내용" placeholder="어떤 프로젝트를 준비하고 계신가요?" />
            <button className="modal-submit" onClick={() => setShowContact(false)}>문의 보내기 <ArrowRight size={18} /></button>
          </div>
        </div>
      )}
    </main>
  )
}
