'use client'

import React, { useEffect, useRef } from 'react'
import { Timeline as VisTimeline } from 'vis-timeline/standalone'
import 'vis-timeline/styles/vis-timeline-graph2d.css'

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear previous content
    containerRef.current.innerHTML = ''

    const items = [
      { id: 1, content: 'Event 1', start: '2023-01-01' },
      { id: 2, content: 'Event 2', start: '2023-03-15' },
      { id: 3, content: 'Event 3', start: '2023-06-01' },
      { id: 4, content: 'Event 4', start: '2023-09-20' },
      { id: 5, content: 'Event 5', start: '2023-12-31' },
    ]

    const options = {
      width: '100%',
      height: '400px',
      start: '2023-01-01',
      end: '2024-01-01',
    }

    new VisTimeline(containerRef.current, items, options)
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '400px' }}></div>
}

export default Timeline