'use client'

import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'

const WorldMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!svgRef.current || !mapContainerRef.current) return

    const updateMap = () => {
      const width = mapContainerRef.current!.clientWidth
      const height = 400 // Adjust this value to fit within the panel

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height)

      svg.selectAll("*").remove() // Clear previous content

      const projection = d3.geoMercator()
        .scale(width / 6)
        .translate([width / 2, height / 1.5])

      const path = d3.geoPath().projection(projection)

      const g = svg.append('g')

      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.5, 8])
        .on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
          g.attr('transform', event.transform.toString())
        })

      if (svg.node()) {
        svg.call(zoom as unknown as (selection: d3.Selection<SVGSVGElement, unknown, null, undefined>) => void);
      }

      d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then((data: any) => {
        const countries = feature(data, data.objects.countries)

        g.selectAll('path')
          .data(countries.features)
          .enter()
          .append('path')
          .attr('d', path as any)
          .attr('fill', '#69b3a2')
          .attr('stroke', '#fff')

        const locations = [
          { name: 'New York', coordinates: [-74.006, 40.7128] as [number, number] },
          { name: 'London', coordinates: [-0.1276, 51.5074] as [number, number] },
          { name: 'Tokyo', coordinates: [139.6917, 35.6895] as [number, number] },
          { name: 'Sydney', coordinates: [151.2093, -33.8688] as [number, number] },
          { name: 'Rio de Janeiro', coordinates: [-43.1729, -22.9068] as [number, number] },
        ]

        g.selectAll('circle')
          .data(locations)
          .enter()
          .append('circle')
          .attr('cx', (d) => projection(d.coordinates)![0])
          .attr('cy', (d) => projection(d.coordinates)![1])
          .attr('r', 5)
          .attr('fill', 'red')

        g.selectAll('text')
          .data(locations)
          .enter()
          .append('text')
          .attr('x', (d) => projection(d.coordinates)![0] + 10)
          .attr('y', (d) => projection(d.coordinates)![1])
          .text((d) => d.name)
          .attr('font-size', '10px')
      })

      // Add zoom controls
      const zoomIn = () => {
        zoom.scaleBy(svg.transition().duration(750) as any, 1.5)
      }

      const zoomOut = () => {
        zoom.scaleBy(svg.transition().duration(750) as any, 1 / 1.5)
      }

      const resetZoom = () => {
        svg.transition().duration(750).call(zoom.transform as any, d3.zoomIdentity)
      }

      const controls = d3.select(mapContainerRef.current)
        .append('div')
        .style('position', 'absolute')
        .style('top', '10px')
        .style('left', '10px')

      controls.append('button')
        .text('+')
        .on('click', zoomIn)
        .style('margin-right', '5px')

      controls.append('button')
        .text('-')
        .on('click', zoomOut)
        .style('margin-right', '5px')

      controls.append('button')
        .text('Reset')
        .on('click', resetZoom)

    }

    updateMap()

    const resizeObserver = new ResizeObserver(() => {
      updateMap()
    })

    resizeObserver.observe(mapContainerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div ref={mapContainerRef} style={{ position: 'relative', width: '100%', height: '400px' }}>
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default WorldMap