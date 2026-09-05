import { Link } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Photo, Reveal } from '@/shared/ui'
import { categoryTiles, editorial, heroImages, promises, stories } from '../model/content'
import { products } from '../model/products'
import { Container, ProductCard, SectionHead, shopBase } from './primitives'

const featured = products.filter((product) => product.featured).slice(0, 8)

export function ShopHomePage() {
  return (
    <>
      {/* 히어로 */}
      <section className="shop-paper">
        <Container className="grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:py-20">
          <div className="lg:col-span-5">
            <p className="shop-eyebrow animate-rise-1">Autumn / Winter 2026</p>
            <h1 className="shop-display animate-rise-2 mt-5 text-[clamp(3rem,6.5vw,6.5rem)] text-shop-ink">
              매일의 모양을
              <br />
              <em>조금 더 다정하게.</em>
            </h1>
            <p className="animate-rise-3 mt-8 max-w-md text-base leading-relaxed text-shop-muted sm:text-lg">
              오래 곁에 두고 싶은 물건을 소개합니다. 쓰임과 아름다움 사이, 만든 사람의 이름이 붙은 열여섯 가지 오브제.
            </p>
            <div className="animate-rise-4 mt-10 flex flex-wrap items-center gap-3">
              <Link to={`${shopBase}/collection`} className="shop-button">
                컬렉션 보기 <ArrowRight size={16} />
              </Link>
              <Link to={`${shopBase}/about`} className="shop-button-ghost">
                오하우 이야기
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <Reveal variant="scale">
              <Photo
                src={heroImages.main}
                alt="흰 화병을 안은 사람"
                loading="eager"
                frameClassName="aspect-[4/5] rounded-[2rem] bg-shop-sunken sm:aspect-[5/4] lg:aspect-[4/3]"
                className="animate-kenburns"
              />
            </Reveal>
            <Reveal variant="scale" delay={200} className="absolute -bottom-8 -left-4 hidden w-[38%] sm:block lg:-left-10">
              <Photo src={heroImages.alt} alt="린넨 위의 화병들" loading="eager" frameClassName="aspect-[4/5] rounded-[1.5rem] bg-shop-sunken shadow-2xl" />
            </Reveal>
            <div className="absolute right-5 top-5 rounded-full bg-shop-surface/90 px-4 py-2 text-xs font-semibold text-shop-ink shadow-lg backdrop-blur">
              New · Soil Vase Trio
            </div>
          </div>
        </Container>
      </section>

      {/* 카테고리 */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHead eyebrow="Browse" title="무엇을 찾고 있나요?" />
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {categoryTiles.map((tile, index) => (
              <Reveal key={tile.category} delay={index * 70}>
                <Link
                  to={`${shopBase}/collection`}
                  search={{ category: tile.category }}
                  className="shop-card group relative block overflow-hidden rounded-2xl"
                  aria-label={`${tile.title} 컬렉션`}
                >
                  <Photo src={tile.image} alt="" frameClassName="aspect-[4/5] bg-shop-sunken" />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-shop-ink/60 via-transparent p-5 text-shop-bg">
                    <p className="shop-display text-2xl sm:text-3xl">{tile.title}</p>
                    <p className="mt-1 text-xs text-shop-bg/80">{tile.detail}</p>
                  </div>
                  <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-shop-bg/90 text-shop-ink opacity-0 transition group-hover:opacity-100">
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 이번 주의 물건 */}
      <section className="pb-24">
        <Container>
          <SectionHead
            eyebrow="Curated for you"
            title={
              <>
                이번 주의 <em>물건</em>
              </>
            }
            aside={
              <Link to={`${shopBase}/collection`} className="shop-link text-shop-ink">
                전체 {products.length}개 보기 <ArrowRight size={14} />
              </Link>
            }
          />
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {featured.map((product, index) => (
              <ProductCard key={product.id} product={product} delay={(index % 4) * 60} eager={index < 4} />
            ))}
          </div>
        </Container>
      </section>

      {/* 에디토리얼 */}
      <section className="px-2 sm:px-4">
        <Reveal variant="scale" className="relative overflow-hidden rounded-[2rem]">
          <Photo src={editorial.image} alt="" frameClassName="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]" />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-shop-ink/70 via-shop-ink/10 to-transparent p-6 sm:p-12 lg:p-16">
            <div className="max-w-xl text-shop-bg">
              <p className="shop-eyebrow text-shop-bg/70">{editorial.eyebrow}</p>
              <h2 className="shop-display mt-3 text-[clamp(2.25rem,5vw,4.5rem)]">{editorial.title}</h2>
              <p className="mt-5 text-sm leading-relaxed text-shop-bg/85 sm:text-base">{editorial.body}</p>
              <Link to={`${shopBase}/collection`} search={{ category: '패브릭' }} className="shop-button-ghost mt-8 border-shop-bg/40 text-shop-bg hover:border-shop-bg hover:bg-shop-bg hover:text-shop-ink">
                패브릭 컬렉션 <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 약속 */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {promises.map((promise, index) => (
              <Reveal key={promise.title} delay={index * 90} className="rounded-3xl bg-shop-surface p-8 shadow-sm">
                <span className="shop-display text-4xl text-shop-accent">0{index + 1}</span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-shop-ink">{promise.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-shop-muted">{promise.detail}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 저널 */}
      <section className="pb-28">
        <Container>
          <SectionHead
            eyebrow="Journal"
            title="물건보다 조금 긴 이야기"
            aside={
              <Link to={`${shopBase}/journal`} className="shop-link text-shop-ink">
                저널 전체 <ArrowRight size={14} />
              </Link>
            }
          />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {stories.map((story, index) => (
              <Reveal key={story.slug} delay={index * 80}>
                <Link to={`${shopBase}/journal/$slug`} params={{ slug: story.slug }} className="shop-card group block">
                  <Photo src={story.cover} alt="" frameClassName="aspect-[4/3] rounded-2xl bg-shop-sunken" />
                  <p className="shop-eyebrow mt-5">
                    {story.category} · {story.date}
                  </p>
                  <h3 className="shop-display mt-2 text-2xl text-shop-ink transition group-hover:text-shop-accent">{story.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
