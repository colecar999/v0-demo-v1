import { createContext, useContext } from 'react'

interface DashboardContextType {
  currentPage: string
  setCurrentPage: (page: string) => void
  currentTopic: string
  setCurrentTopic: (topic: string) => void
  currentArticle: string
  setCurrentArticle: (article: string) => void
  showUpgradeDialog: boolean
  setShowUpgradeDialog: (show: boolean) => void
  handleTopicClick: (topic: string) => void
  handleArticleClick: (article: string) => void
  handleProFeatureClick: () => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export const DashboardProvider = DashboardContext.Provider

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}