"use client"

import { useState, useCallback } from 'react'
import Header from './Header'
import TopicSelector from './TopicSelector'
import ArticleViewer from './ArticleViewer'
import AgentChat from './AgentChat'
import AnalysisPanel from './AnalysisPanel'
import DataPanel from './DataPanel'
import { DashboardProvider } from '../context/DashboardContext'

export default function DashboardLayout() {
  const [leftPaneWidth, setLeftPaneWidth] = useState(25)
  const [middlePaneWidth, setMiddlePaneWidth] = useState(50)
  const [rightPaneWidth, setRightPaneWidth] = useState(25)
  const [isDraggingLeft, setIsDraggingLeft] = useState(false)
  const [isDraggingRight, setIsDraggingRight] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [currentTopic, setCurrentTopic] = useState('')
  const [currentArticle, setCurrentArticle] = useState('')
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)

  const handleMouseDown = useCallback((pane: 'left' | 'right') => {
    if (pane === 'left') {
      setIsDraggingLeft(true)
    } else {
      setIsDraggingRight(true)
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDraggingLeft(false)
    setIsDraggingRight(false)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDraggingLeft) {
      const newLeftWidth = (e.clientX / window.innerWidth) * 100
      const newMiddleWidth = middlePaneWidth + (leftPaneWidth - newLeftWidth)
      setLeftPaneWidth(Math.max(20, Math.min(40, newLeftWidth)))
      setMiddlePaneWidth(Math.max(30, Math.min(60, newMiddleWidth)))
    } else if (isDraggingRight) {
      const newRightWidth = ((window.innerWidth - e.clientX) / window.innerWidth) * 100
      const newMiddleWidth = middlePaneWidth + (rightPaneWidth - newRightWidth)
      setRightPaneWidth(Math.max(20, Math.min(40, newRightWidth)))
      setMiddlePaneWidth(Math.max(30, Math.min(60, newMiddleWidth)))
    }
  }, [isDraggingLeft, isDraggingRight, leftPaneWidth, middlePaneWidth, rightPaneWidth])

  const handleTopicClick = (topic: string) => {
    setCurrentPage('topic')
    setCurrentTopic(topic)
    setCurrentArticle("Dolor Sit Amet")
  }

  const handleArticleClick = (articleTitle: string) => {
    setCurrentArticle(articleTitle)
  }

  const handleProFeatureClick = () => {
    setShowUpgradeDialog(true)
  }

  return (
    <DashboardProvider value={{
      currentPage,
      setCurrentPage,
      currentTopic,
      setCurrentTopic,
      currentArticle,
      setCurrentArticle,
      showUpgradeDialog,
      setShowUpgradeDialog,
      handleTopicClick,
      handleArticleClick,
      handleProFeatureClick
    }}>
      <div className="flex flex-col h-screen" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <Header />
        <main className="flex flex-1 overflow-hidden">
          {currentPage === 'home' ? (
            <TopicSelector />
          ) : (
            <>
              <AgentChat
                width={leftPaneWidth}
              />
              <div
                className="w-1 bg-gray-200 cursor-col-resize hover:bg-gray-300 transition-colors"
                onMouseDown={() => handleMouseDown('left')}
              ></div>
              <ArticleViewer
                width={middlePaneWidth}
              />
              <div
                className="w-1 bg-gray-200 cursor-col-resize hover:bg-gray-300 transition-colors"
                onMouseDown={() => handleMouseDown('right')}
              ></div>
              <AnalysisPanel
                width={rightPaneWidth}
              />
            </>
          )}
        </main>
      </div>
    </DashboardProvider>
  )
}