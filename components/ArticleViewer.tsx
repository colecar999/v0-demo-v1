'use client';

import { useDashboard } from '../context/DashboardContext'
import Article from './Article'

interface ArticleViewerProps {
  width: number
}

export default function ArticleViewer({ width }: ArticleViewerProps) {
  const { currentArticle, handleArticleClick } = useDashboard()

  const handleSourceClick = () => {
    // Implement logic to show sources in analysis panel
  }

  return (
    <div style={{ width: `${width}%` }} className="border-r overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Articles</h2>
        <Article
          title={currentArticle}
          onArticleClick={handleArticleClick}
          onSourceClick={handleSourceClick}
        />
      </div>
    </div>
  )
}