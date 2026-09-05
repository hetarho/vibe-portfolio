import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Check, CreditCard, Smartphone, Wallet } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { formatWon } from '@/shared/lib'
import { Photo, Reveal } from '@/shared/ui'
import { useCart } from '../model/cart'
import { Container, QtyStepper, shopBase } from './primitives'

const steps = ['주문 확인', '배송 정보', '결제'] as const
const payments = [
  { id: 'card', label: '신용 · 체크카드', icon: CreditCard },
  { id: 'pay', label: '간편결제', icon: Smartphone },
  { id: 'transfer', label: '무통장 입금', icon: Wallet },
] as const

export function ShopCheckoutPage() {
  const cart = useCart()
  const [step, setStep] = useState(0)
  const [payment, setPayment] = useState<(typeof payments)[number]['id']>('card')
  const [order, setOrder] = useState<{ number: string; total: number; count: number } | null>(null)

  const next = (event?: FormEvent) => {
    event?.preventDefault()
    if (step < 2) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setOrder({ number: `OH-${Date.now().toString().slice(-6)}`, total: cart.total, count: cart.count })
    cart.clear()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (order) {
    return (
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <span className="animate-pop grid size-16 place-items-center rounded-full bg-shop-ink text-shop-bg">
          <Check size={28} />
        </span>
        <p className="shop-eyebrow animate-rise-1 mt-8">Order {order.number}</p>
        <h1 className="shop-display animate-rise-2 mt-3 text-[clamp(2.5rem,5vw,4.5rem)] text-shop-ink">
          주문이 <em>완료</em>됐어요.
        </h1>
        <p className="animate-rise-3 mt-5 max-w-md text-base text-shop-muted">
          {order.count}개의 물건, {formatWon(order.total)}. 2~3일 안에 도착합니다. 물건이 도착하면 포장은 상자째로 다시
          쓸 수 있게 만들어 두었어요.
        </p>
        <div className="animate-rise-4 mt-10 flex gap-3">
          <Link to={shopBase} className="shop-button-ghost">
            홈으로
          </Link>
          <Link to={`${shopBase}/collection`} className="shop-button">
            계속 둘러보기 <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    )
  }

  if (cart.lines.length === 0) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <h1 className="shop-display text-4xl text-shop-ink">장바구니가 비어 있어요.</h1>
        <p className="mt-4 text-sm text-shop-muted">물건을 먼저 담아 주세요.</p>
        <Link to={`${shopBase}/collection`} className="shop-button mt-8">
          컬렉션 보기
        </Link>
      </Container>
    )
  }

  return (
    <Container className="py-10 lg:py-16">
      <Link to={`${shopBase}/collection`} className="shop-link text-xs text-shop-muted">
        <ArrowLeft size={12} /> 계속 쇼핑하기
      </Link>

      <ol className="mt-8 flex items-center gap-3 text-sm">
        {steps.map((label, index) => (
          <li key={label} className="flex items-center gap-3">
            <span
              className={`grid size-7 place-items-center rounded-full font-mono text-xs transition ${
                index < step ? 'bg-shop-ink text-shop-bg' : index === step ? 'bg-shop-accent text-shop-bg' : 'bg-shop-sunken text-shop-muted'
              }`}
            >
              {index < step ? <Check size={13} /> : index + 1}
            </span>
            <span className={index === step ? 'font-semibold text-shop-ink' : 'text-shop-muted'}>{label}</span>
            {index < steps.length - 1 && <span className="h-px w-8 bg-shop-line" />}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {step === 0 && (
            <Reveal>
              <h1 className="shop-display text-4xl text-shop-ink">주문할 물건을 확인해 주세요.</h1>
              <ul className="mt-8 divide-y divide-shop-line border-y border-shop-line">
                {cart.lines.map((line) => (
                  <li key={line.key} className="flex gap-5 py-5">
                    <Photo src={line.product.images[0]} alt="" frameClassName="size-24 rounded-xl" style={{ backgroundColor: line.product.tone }} />
                    <div className="flex flex-1 flex-col">
                      <p className="font-semibold text-shop-ink">{line.product.name}</p>
                      <p className="text-xs text-shop-muted">
                        {line.product.maker}
                        {line.option ? ` · ${line.option}` : ''}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <QtyStepper size="sm" value={line.qty} onChange={(qty) => cart.setQty(line.key, qty)} />
                        <p className="font-semibold text-shop-ink">{formatWon(line.product.price * line.qty)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => next()} className="shop-button mt-8 w-full sm:w-auto">
                배송 정보 입력 <ArrowRight size={16} />
              </button>
            </Reveal>
          )}

          {step === 1 && (
            <Reveal as="form" className="flex flex-col gap-8" onSubmit={next}>
              <h1 className="shop-display text-4xl text-shop-ink">어디로 보내드릴까요?</h1>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-semibold">받는 분</span>
                  <input required className="shop-field" placeholder="이름" />
                </label>
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-semibold">연락처</span>
                  <input required type="tel" className="shop-field" placeholder="010-0000-0000" />
                </label>
                <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                  <span className="font-semibold">이메일</span>
                  <input required type="email" className="shop-field" placeholder="you@example.com" />
                </label>
                <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                  <span className="font-semibold">주소</span>
                  <input required className="shop-field" placeholder="도로명 주소" />
                </label>
                <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                  <span className="sr-only">상세 주소</span>
                  <input className="shop-field" placeholder="상세 주소 (동·호수)" />
                </label>
                <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                  <span className="font-semibold">배송 메모</span>
                  <input className="shop-field" placeholder="부재 시 문 앞에 두어 주세요" />
                </label>
              </div>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button type="button" onClick={() => setStep(0)} className="shop-button-ghost">
                  <ArrowLeft size={16} /> 이전
                </button>
                <button type="submit" className="shop-button">
                  결제 방법 선택 <ArrowRight size={16} />
                </button>
              </div>
            </Reveal>
          )}

          {step === 2 && (
            <Reveal as="form" className="flex flex-col gap-8" onSubmit={next}>
              <h1 className="shop-display text-4xl text-shop-ink">어떻게 결제할까요?</h1>
              <div className="grid gap-3 sm:grid-cols-3">
                {payments.map((method) => {
                  const Icon = method.icon
                  const on = payment === method.id
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPayment(method.id)}
                      aria-pressed={on}
                      className={`flex flex-col items-start gap-3 rounded-2xl border p-5 text-left text-sm transition ${
                        on ? 'border-shop-ink bg-shop-surface' : 'border-shop-line hover:border-shop-ink'
                      }`}
                    >
                      <Icon size={20} className={on ? 'text-shop-accent' : 'text-shop-muted'} />
                      <span className="font-semibold">{method.label}</span>
                    </button>
                  )
                })}
              </div>
              {payment === 'card' && (
                <div className="grid gap-4 rounded-2xl bg-shop-surface p-6 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                    <span className="font-semibold">카드 번호</span>
                    <input required inputMode="numeric" className="shop-field font-mono" placeholder="0000 0000 0000 0000" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="font-semibold">유효기간</span>
                    <input required className="shop-field font-mono" placeholder="MM / YY" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="font-semibold">CVC</span>
                    <input required inputMode="numeric" className="shop-field font-mono" placeholder="123" />
                  </label>
                </div>
              )}
              {payment === 'pay' && <p className="rounded-2xl bg-shop-surface p-6 text-sm text-shop-muted">결제 버튼을 누르면 간편결제 앱으로 이동합니다.</p>}
              {payment === 'transfer' && <p className="rounded-2xl bg-shop-surface p-6 text-sm text-shop-muted">주문 후 안내되는 계좌로 24시간 안에 입금해 주세요.</p>}
              <label className="flex items-start gap-3 text-sm text-shop-muted">
                <input required type="checkbox" className="mt-1 size-4 accent-shop-accent" />
                주문 내용을 확인했고, 결제에 동의합니다.
              </label>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button type="button" onClick={() => setStep(1)} className="shop-button-ghost">
                  <ArrowLeft size={16} /> 이전
                </button>
                <button type="submit" className="shop-button">
                  {formatWon(cart.total)} 결제하기
                </button>
              </div>
            </Reveal>
          )}
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-28 rounded-3xl bg-shop-surface p-7">
            <h2 className="shop-display text-2xl text-shop-ink">주문 요약</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {cart.lines.map((line) => (
                <li key={line.key} className="flex justify-between gap-4 text-shop-muted">
                  <span>
                    {line.product.name}
                    {line.option ? ` (${line.option})` : ''} × {line.qty}
                  </span>
                  <span className="shrink-0 text-shop-ink">{formatWon(line.product.price * line.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 flex flex-col gap-2 border-t border-shop-line pt-5 text-sm">
              <div className="flex justify-between text-shop-muted">
                <dt>소계</dt>
                <dd>{formatWon(cart.subtotal)}</dd>
              </div>
              <div className="flex justify-between text-shop-muted">
                <dt>배송</dt>
                <dd>{cart.shipping === 0 ? '무료' : formatWon(cart.shipping)}</dd>
              </div>
              <div className="mt-2 flex justify-between text-lg font-semibold text-shop-ink">
                <dt>합계</dt>
                <dd>{formatWon(cart.total)}</dd>
              </div>
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-shop-muted">
              깨지기 쉬운 물건은 재생 펄프 완충재로 포장합니다. 상자는 그대로 다시 쓸 수 있어요.
            </p>
          </div>
        </aside>
      </div>
    </Container>
  )
}
