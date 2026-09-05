import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Photo, Reveal } from '@/shared/ui'
import { makers, promises } from '../model/content'
import { Container, shopBase } from './primitives'

const photos = ['/images/shop/kitchen.jpg', '/images/shop/vase-set-3.jpg', '/images/shop/linen-2.jpg']

export function ShopAboutPage() {
  return (
    <>
      <section className="shop-paper">
        <Container className="grid gap-10 py-16 lg:grid-cols-12 lg:items-end lg:py-24">
          <div className="lg:col-span-7">
            <p className="shop-eyebrow animate-rise-1">About OHAU</p>
            <h1 className="shop-display animate-rise-2 mt-4 text-[clamp(2.75rem,6vw,6rem)] text-shop-ink">
              천천히 골라,
              <br />
              <em>오래 쓰는</em> 마음.
            </h1>
          </div>
          <p className="animate-rise-3 text-lg leading-relaxed text-shop-muted lg:col-span-5">
            오하우는 2021년 마포의 작은 가게에서 시작했습니다. 팔 물건이 아니라 오래 쓸 물건을 찾다가, 만든 사람들을
            직접 만나러 다니게 됐습니다. 지금은 여덟 공방의 물건을 소개합니다.
          </p>
        </Container>
      </section>

      <section className="px-2 sm:px-4">
        <div className="grid gap-4 md:grid-cols-12">
          <Reveal variant="scale" className="md:col-span-7">
            <Photo src={photos[0]} alt="오하우 매장 부엌" loading="eager" frameClassName="aspect-[4/3] rounded-[1.75rem]" />
          </Reveal>
          <Reveal variant="scale" delay={100} className="md:col-span-5">
            <Photo src={photos[1]} alt="화병" frameClassName="aspect-[4/3] h-full rounded-[1.75rem] md:aspect-auto" />
          </Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="shop-eyebrow">What we promise</p>
            <h2 className="shop-display mt-3 text-4xl text-shop-ink">세 가지 약속</h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-3xl bg-shop-line lg:col-span-8">
            {promises.map((promise, index) => (
              <Reveal key={promise.title} delay={index * 80} className="grid gap-4 bg-shop-bg p-8 sm:grid-cols-12 sm:items-baseline">
                <span className="shop-display text-3xl text-shop-accent sm:col-span-2">0{index + 1}</span>
                <h3 className="text-xl font-semibold tracking-tight text-shop-ink sm:col-span-4">{promise.title}</h3>
                <p className="text-sm leading-relaxed text-shop-muted sm:col-span-6">{promise.detail}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-shop-surface py-24 sm:py-32">
        <Container>
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="shop-eyebrow">Makers</p>
              <h2 className="shop-display mt-3 text-4xl text-shop-ink">
                여덟 곳의 <em>공방</em>
              </h2>
            </div>
            <Link to={`${shopBase}/journal`} className="shop-link text-sm text-shop-ink">
              공방 이야기 읽기 <ArrowRight size={14} />
            </Link>
          </Reveal>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-shop-line sm:grid-cols-2 lg:grid-cols-4">
            {makers.map((maker, index) => (
              <Reveal key={maker.name} as="li" delay={(index % 4) * 60} className="bg-shop-surface p-6">
                <p className="text-lg font-semibold tracking-tight text-shop-ink">{maker.name}</p>
                <p className="mt-1 text-sm text-shop-muted">
                  {maker.place} · {maker.craft}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal variant="scale" className="lg:col-span-6">
            <Photo src={photos[2]} alt="린넨" frameClassName="aspect-[4/3] rounded-[1.75rem] bg-shop-sunken" />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
            <p className="shop-eyebrow">Visit</p>
            <h2 className="shop-display mt-3 text-4xl text-shop-ink">성미산 아래 가게</h2>
            <p className="mt-6 text-base leading-relaxed text-shop-muted">
              서울 마포구 성미산로 23. 화요일부터 일요일, 낮 12시에서 저녁 8시까지 열어 둡니다. 물건을 만져 보고, 차
              한 잔 마시고 가세요. 사지 않아도 됩니다.
            </p>
            <Link to={`${shopBase}/collection`} className="shop-button mt-8">
              온라인 컬렉션 <ArrowRight size={16} />
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
