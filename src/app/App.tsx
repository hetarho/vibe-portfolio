import { useEffect, useState } from 'react'
import { QuizPage } from '@/pages/quiz'
import { ShopPage } from '@/pages/shop'
import { StudioPage } from '@/pages/studio'
import { getPageFromHash, type Page } from '@/shared/model/navigation'
import { PortfolioHeader } from '@/widgets/portfolio-header'

export function App() {
  const [page, setPage] = useState<Page>(getPageFromHash)

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const changePage = (nextPage: Page) => {
    window.location.hash = `/${nextPage}`
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`app app-${page}`}>
      <PortfolioHeader page={page} onChange={changePage} />
      {page === 'studio' && <StudioPage onNavigate={changePage} />}
      {page === 'shop' && <ShopPage />}
      {page === 'quiz' && <QuizPage />}
    </div>
  )
}
