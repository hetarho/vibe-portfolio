import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { pageInfo } from '@/shared/config/portfolio'
import { Photo, Reveal } from '@/shared/ui'
import type { Project } from '../model/projects'

export const studioBase = pageInfo.studio.path

/** 사이트 공통 좌우 여백 */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[110rem] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
}

export function SectionHead({
  eyebrow,
  title,
  aside,
}: {
  eyebrow: string
  title: ReactNode
  aside?: ReactNode
}) {
  return (
    <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="studio-eyebrow">{eyebrow}</p>
        <h2 className="studio-display mt-4 text-[clamp(2.5rem,5.5vw,5.5rem)] text-studio-ink">{title}</h2>
      </div>
      {aside && <div className="text-sm text-studio-muted">{aside}</div>}
    </Reveal>
  )
}

export function ProjectCard({
  project,
  ratio = 'aspect-[4/5]',
  delay = 0,
  eager = false,
}: {
  project: Project
  ratio?: string
  delay?: number
  eager?: boolean
}) {
  return (
    <Reveal delay={delay} variant="scale">
      <Link
        to={`${studioBase}/work/$slug`}
        params={{ slug: project.slug }}
        className="studio-card group block"
        aria-label={`${project.title} 프로젝트 보기`}
      >
        <Photo
          src={project.cover}
          alt={`${project.title} 커버`}
          loading={eager ? 'eager' : 'lazy'}
          frameClassName={`${ratio} rounded-sm bg-studio-raised`}
          className="grayscale-[20%] transition group-hover:grayscale-0"
        />
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="studio-display-wide text-2xl text-studio-ink">{project.title}</h3>
            <p className="mt-1.5 text-sm text-studio-muted">{project.tagline}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5 pt-1 text-right">
            <span className="font-mono text-[11px] text-studio-muted">{project.year}</span>
            <ArrowUpRight
              size={18}
              className="text-studio-muted transition duration-500 ease-site group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-studio-accent"
            />
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export function PillLink({ to, children, params }: { to: string; children: ReactNode; params?: Record<string, string> }) {
  return (
    <Link
      to={to}
      params={params}
      className="group inline-flex h-12 items-center gap-3 rounded-full border border-studio-line pl-6 pr-2 text-sm font-medium text-studio-ink transition hover:border-studio-ink"
    >
      {children}
      <span className="grid size-8 place-items-center rounded-full bg-studio-ink text-studio-bg transition duration-500 ease-site group-hover:bg-studio-accent">
        <ArrowUpRight size={15} />
      </span>
    </Link>
  )
}
