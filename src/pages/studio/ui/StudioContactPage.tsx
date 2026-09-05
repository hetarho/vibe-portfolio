import { ArrowUpRight, Check } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Reveal } from '@/shared/ui'
import { Container } from './primitives'

const budgets = ['3천만 원 미만', '3천만 ~ 8천만 원', '8천만 ~ 2억 원', '2억 원 이상']
const needs = ['Brand Identity', 'Website', 'Campaign', 'Packaging', 'Spatial', '아직 모르겠어요']

export function StudioContactPage() {
  const [sent, setSent] = useState(false)
  const [picked, setPicked] = useState<string[]>([])
  const [budget, setBudget] = useState<string | null>(null)

  const toggle = (need: string) =>
    setPicked((items) => (items.includes(need) ? items.filter((item) => item !== need) : [...items, need]))

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className="pt-36 pb-32 sm:pt-44">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="studio-eyebrow animate-rise-1">( Contact )</p>
            <h1 className="studio-display animate-rise-2 mt-5 text-[clamp(3rem,7vw,7.5rem)] text-studio-ink">
              Tell us the <span className="studio-serif text-studio-accent">story</span>.
            </h1>
            <p className="animate-rise-3 mt-8 max-w-md text-lg leading-relaxed text-studio-muted">
              아직 정리되지 않아도 괜찮습니다. 지금 어디에 있고 어디로 가고 싶은지만 알려주세요. 이틀 안에 답합니다.
            </p>
            <dl className="animate-rise-4 mt-12 grid grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="studio-eyebrow">New business</dt>
                <dd className="mt-2">
                  <a href="mailto:hello@morrow.studio" className="studio-link text-studio-ink">
                    hello@morrow.studio
                  </a>
                </dd>
              </div>
              <div>
                <dt className="studio-eyebrow">Careers</dt>
                <dd className="mt-2">
                  <a href="mailto:join@morrow.studio" className="studio-link text-studio-ink">
                    join@morrow.studio
                  </a>
                </dd>
              </div>
              <div>
                <dt className="studio-eyebrow">Seoul</dt>
                <dd className="mt-2 text-studio-muted">한남대로 27길 12, 3F</dd>
              </div>
              <div>
                <dt className="studio-eyebrow">Copenhagen</dt>
                <dd className="mt-2 text-studio-muted">Refshalevej 163A</dd>
              </div>
            </dl>
          </div>

          <Reveal delay={150} className="lg:col-span-6 lg:col-start-7">
            {sent ? (
              <div className="animate-pop flex min-h-[32rem] flex-col justify-center rounded-sm bg-studio-surface p-10">
                <span className="grid size-14 place-items-center rounded-full bg-studio-accent text-studio-bg">
                  <Check size={26} />
                </span>
                <h2 className="studio-display mt-8 text-5xl text-studio-ink">고맙습니다.</h2>
                <p className="mt-4 text-lg text-studio-muted">이야기를 잘 받았습니다. 이틀 안에 답장을 드릴게요.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false)
                    setPicked([])
                    setBudget(null)
                  }}
                  className="studio-link mt-10 w-fit text-sm text-studio-muted"
                >
                  다른 이야기 보내기
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-10 rounded-sm bg-studio-surface p-8 sm:p-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="flex flex-col gap-1">
                    <span className="studio-eyebrow">Name</span>
                    <input required className="studio-field" placeholder="이름" />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="studio-eyebrow">Company</span>
                    <input className="studio-field" placeholder="회사 / 브랜드" />
                  </label>
                  <label className="flex flex-col gap-1 sm:col-span-2">
                    <span className="studio-eyebrow">Email</span>
                    <input required type="email" className="studio-field" placeholder="you@company.com" />
                  </label>
                </div>

                <fieldset>
                  <legend className="studio-eyebrow">What do you need?</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {needs.map((need) => {
                      const on = picked.includes(need)
                      return (
                        <button
                          key={need}
                          type="button"
                          onClick={() => toggle(need)}
                          aria-pressed={on}
                          className={`h-10 rounded-full border px-4 text-sm transition ${
                            on
                              ? 'border-studio-accent bg-studio-accent text-studio-bg'
                              : 'border-studio-line text-studio-muted hover:border-studio-ink hover:text-studio-ink'
                          }`}
                        >
                          {need}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="studio-eyebrow">Budget</legend>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {budgets.map((item) => {
                      const on = budget === item
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setBudget(item)}
                          aria-pressed={on}
                          className={`flex h-12 items-center justify-between rounded-sm border px-4 text-sm transition ${
                            on ? 'border-studio-ink bg-studio-ink text-studio-bg' : 'border-studio-line text-studio-muted hover:border-studio-ink'
                          }`}
                        >
                          {item}
                          {on && <Check size={16} />}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <label className="flex flex-col gap-1">
                  <span className="studio-eyebrow">The story</span>
                  <textarea
                    required
                    rows={5}
                    className="studio-field resize-none"
                    placeholder="지금 어디에 있고, 어디로 가고 싶은가요?"
                  />
                </label>

                <button
                  type="submit"
                  className="group inline-flex h-14 items-center justify-between rounded-full bg-studio-ink pl-7 pr-2 text-base font-semibold text-studio-bg transition hover:bg-studio-accent"
                >
                  Send the story
                  <span className="grid size-10 place-items-center rounded-full bg-studio-bg text-studio-ink">
                    <ArrowUpRight size={18} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
