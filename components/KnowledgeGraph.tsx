'use client'

import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface Node {
  id: number
  type: 'hub' | 'event' | 'place'
}

interface Link {
  source: number
  target: number
}

interface KnowledgeGraphProps {
  onEventClick: (eventId: number) => void
  onPlaceClick: (placeId: number) => void
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ onEventClick, onPlaceClick }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 600
    const height = 400

    const nodes: Node[] = [
      { id: 1, type: 'hub' },
      { id: 2, type: 'hub' },
      { id: 3, type: 'hub' },
      { id: 4, type: 'hub' },
      { id: 5, type: 'event' },
      { id: 6, type: 'event' },
      { id: 7, type: 'place' },
      { id: 8, type: 'place' },
      { id: 9, type: 'event' },
      { id: 10, type: 'place' },
      { id: 11, type: 'event' },
      { id: 12, type: 'place' },
      { id: 13, type: 'event' },
      { id: 14, type: 'place' },
      { id: 15, type: 'event' },
    ]

    const links: Link[] = [
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 4 },
      { source: 1, target: 3 },
      { source: 1, target: 5 },
      { source: 1, target: 6 },
      { source: 1, target: 7 },
      { source: 1, target: 8 },
      { source: 2, target: 9 },
      { source: 2, target: 10 },
      { source: 2, target: 11 },
      { source: 3, target: 12 },
      { source: 3, target: 13 },
      { source: 3, target: 14 },
      { source: 3, target: 15 },
      { source: 4, target: 12 },
      { source: 4, target: 13 },
      { source: 4, target: 14 },
    ]

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(links).id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 8)
      .attr('fill', (d: Node) => {
        switch (d.type) {
          case 'hub': return '#69b3a2'
          case 'event': return '#4e79a7'
          case 'place': return '#e15759'
          default: return '#69b3a2'
        }
      })
      .call(drag(simulation) as any)

    node.on('click', (event: MouseEvent, d: Node) => {
      if (d.type === 'event') {
        onEventClick(d.id)
      } else if (d.type === 'place') {
        onPlaceClick(d.id)
      }
    })

    node.append('title')
      .text((d: Node) => `Node ${d.id} (${d.type})`)

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)
    })

    // Add legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - 100}, ${height - 60})`)

    legend.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 6)
      .style('fill', '#4e79a7')

    legend.append('circle')
      .attr('cx', 0)
      .attr('cy', 25)
      .attr('r', 6)
      .style('fill', '#e15759')

    legend.append('text')
      .attr('x', 15)
      .attr('y', 4)
      .text('Event')
      .style('font-size', '12px')
      .attr('alignment-baseline', 'middle')

    legend.append('text')
      .attr('x', 15)
      .attr('y', 29)
      .text('Location')
      .style('font-size', '12px')
      .attr('alignment-baseline', 'middle')

    function drag(simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      function dragged(event: any) {
        event.subject.fx = event.x
        event.subject.fy = event.y
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    }
  }, [onEventClick, onPlaceClick])

  return <svg ref={svgRef}></svg>
}

export default KnowledgeGraph