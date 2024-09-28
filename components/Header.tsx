"use client"

import { Bell, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDashboard } from '../context/DashboardContext'

export default function Header() {
  const { currentPage, setCurrentPage, currentTopic, handleTopicClick } = useDashboard()

  const trendingTopics = [
    "Quantum Computing Advancements",
    "Climate Change Mitigation Strategies",
    "Artificial Intelligence Ethics",
    "Neuroscience and Consciousness",
    "Sustainable Energy Technologies",
  ]

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <span className="ml-2 text-xl font-bold">Gnosi.ai</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {currentPage === 'home' ? 'Select Topic' : `Selected: ${currentTopic}`} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {trendingTopics.map((topic, index) => (
              <DropdownMenuItem key={index} onSelect={() => handleTopicClick(topic)}>
                {topic}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input type="search" placeholder="Search topics..." className="w-64" />
      </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Bell className="h-6 w-6 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Notification 1</DropdownMenuItem>
            <DropdownMenuItem>Notification 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="ml-2">
                <div className="font-medium">BigHank9000</div>
                <div className="text-sm text-gray-500">researcher</div>
              </div>
              <ChevronDown className="ml-2 h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Account</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}