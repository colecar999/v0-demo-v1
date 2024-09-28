'use client'

import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface Node extends d3.SimulationNodeDatum {
  id: number
  type: 'hub' | 'event' | 'place'
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: Node
  target: Node
}

interface KnowledgeGraphProps {
  onEventClick: (eventId: number) => void
  onPlaceClick: (placeId: number) => void
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ onEventClick, onPlaceClick }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return

    const updateGraph = () => {
      const svg = d3.select(svgRef.current)
      svg.selectAll("*").remove() // Clear previous content

      const width = containerRef.current?.clientWidth ?? 0
      const height = 400

      svg.attr('width', width)
        .attr('height', height)

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
        { source: nodes[0], target: nodes[1] },
        { source: nodes[1], target: nodes[2] },
        { source: nodes[2], target: nodes[3] },
        { source: nodes[0], target: nodes[2] },
        { source: nodes[0], target: nodes[4] },
        { source: nodes[0], target: nodes[5] },
        { source: nodes[0], target: nodes[6] },
        { source: nodes[0], target: nodes[7] },
        { source: nodes[1], target: nodes[8] },
        { source: nodes[1], target: nodes[9] },
        { source: nodes[1], target: nodes[10] },
        { source: nodes[2], target: nodes[11] },
        { source: nodes[2], target: nodes[12] },
        { source: nodes[2], target: nodes[13] },
        { source: nodes[2], target: nodes[14] },
        { source: nodes[3], target: nodes[11] },
        { source: nodes[3], target: nodes[12] },
        { source: nodes[3], target: nodes[13] },
      ]

      const simulation = d3.forceSimulation<Node, Link>(nodes)
        .force('link', d3.forceLink<Node, Link>(links).id((d) => d.id))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('center', d3.forceCenter(width / 2, height / 2))

      const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)

      const node = svg.append('g')
        .selectAll<SVGCircleElement, Node>('circle')
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
          .attr('x1', (d) => (d.source as Node).x!)
          .attr('y1', (d) => (d.source as Node).y!)
          .attr('x2', (d) => (d.target as Node).x!)
          .attr('y2', (d) => (d.target as Node).y!)

        node
          .attr('cx', (d) => d.x!)
          .attr('cy', (d) => d.y!)
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

      function drag(simulation: d3.Simulation<Node, Link>) {
        function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          event.subject.fx = event.subject.x
          event.subject.fy = event.subject.y
        }

        function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
          event.subject.fx = event.x
          event.subject.fy = event.y
        }

        function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
          if (!event.active) simulation.alphaTarget(0)
          event.subject.fx = null
          event.subject.fy = null
        }

        return d3.drag<SVGCircleElement, Node, Node>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      }
    }

    updateGraph()

    const resizeObserver = new ResizeObserver(() => {
      updateGraph()
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [onEventClick, onPlaceClick])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '400px' }}>
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default KnowledgeGraph
