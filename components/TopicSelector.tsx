'use client';

import { Button } from "@/components/ui/button"
import { Upload, PlusCircle, Crown } from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'

export default function TopicSelector() {
  const { handleTopicClick, handleProFeatureClick } = useDashboard()

  const trendingTopics = [
    "Quantum Computing Advancements",
    "Climate Change Mitigation Strategies",
    "Artificial Intelligence Ethics",
    "Neuroscience and Consciousness",
    "Sustainable Energy Technologies",
    "Genetic Engineering Breakthroughs",
    "Space Exploration and Colonization",
    "Cybersecurity in the Digital Age",
    "Nanotechnology Applications",
    "Global Pandemic Response Tactics"
  ]

  return (
    <>
      <div className="w-3/4 p-4 border-r overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Trending Topics</h2>
        <ul className="space-y-2">
          {trendingTopics.map((topic, index) => (
            <li key={index} className="flex items-center space-x-2 p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
              <span className="font-bold text-gray-700">{index + 1}.</span>
              <a href="#" className="text-blue-600 hover:underline" onClick={() => handleTopicClick(topic)}>{topic}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/4 p-4">
        <div className="flex flex-col space-y-4">
          <Button variant="outline" onClick={handleProFeatureClick} className="justify-start hover:bg-gray-100">
            <Upload className="mr-2 h-4 w-4" /> Upload Data
          </Button>
          <Button variant="outline" onClick={handleProFeatureClick} className="justify-start hover:bg-gray-100">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Topic
          </Button>
          <Button className="justify-start">
            <Crown className="mr-2 h-4 w-4" /> Upgrade to Pro
          </Button>
        </div>
      </div>
    </>
  )
}