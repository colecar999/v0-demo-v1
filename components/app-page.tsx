"use client"

import { useState, useCallback, useEffect } from 'react'
import { Bell, ChevronDown, Search, Upload, PlusCircle, Crown, X, MessageSquare, Globe, Video, FileText, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import KnowledgeGraph from '../components/KnowledgeGraph'
import Timeline from '../components/Timeline'
import WorldMap from '../components/WorldMap'

type FileType = 'Video' | 'Document' | 'Web'
type Contributor = 'SmallFrank450' | 'R3s3archLuvr777' | 'NotVeryTrustworthy'

interface File {
  name: string
  type: FileType
}

interface Folder {
  name: string
  files: File[]
}

interface ContributorData {
  name: Contributor
  folders: Folder[]
}

const initialData: ContributorData[] = [
  {
    name: 'SmallFrank450',
    folders: [
      {
        name: 'Folder 1',
        files: [
          { name: 'Video 1', type: 'Video' },
          { name: 'Document 1', type: 'Document' },
          { name: 'Web 1', type: 'Web' },
          { name: 'Video 2', type: 'Video' },
          { name: 'Document 2', type: 'Document' },
        ]
      },
      {
        name: 'Folder 2',
        files: [
          { name: 'Web 2', type: 'Web' },
          { name: 'Video 3', type: 'Video' },
          { name: 'Document 3', type: 'Document' },
          { name: 'Web 3', type: 'Web' },
          { name: 'Video 4', type: 'Video' },
        ]
      },
    ]
  },
  {
    name: 'R3s3archLuvr777',
    folders: [
      {
        name: 'Folder 1',
        files: [
          { name: 'Document 1', type: 'Document' },
          { name: 'Web 1', type: 'Web' },
          { name: 'Video 1', type: 'Video' },
          { name: 'Document 2', type: 'Document' },
          { name: 'Web 2', type: 'Web' },
        ]
      },
    ]
  },
  {
    name: 'NotVeryTrustworthy',
    folders: [
      {
        name: 'Folder 1',
        files: [
          { name: 'Web 1', type: 'Web' },
          { name: 'Video 1', type: 'Video' },
          { name: 'Document 1', type: 'Document' },
          { name: 'Web 2', type: 'Web' },
          { name: 'Video 2', type: 'Video' },
        ]
      },
    ]
  },
]

export function Page() {
  const [leftPaneWidth, setLeftPaneWidth] = useState(66.67)
  const [isDragging, setIsDragging] = useState(false)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [currentTopic, setCurrentTopic] = useState('')
  const [currentMainTab, setCurrentMainTab] = useState('home')
  const [currentAnalysisTab, setCurrentAnalysisTab] = useState('knowledge-graph')
  const [selectedTypes, setSelectedTypes] = useState<FileType[]>(['Video', 'Document', 'Web'])
  const [selectedContributors, setSelectedContributors] = useState<Contributor[]>(['SmallFrank450', 'R3s3archLuvr777', 'NotVeryTrustworthy'])
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null)
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  useEffect(() => {
    // Initialize all checkboxes to be checked
    const allItems = new Set<string>()
    initialData.forEach(contributor => {
      allItems.add(contributor.name)
      contributor.folders.forEach(folder => {
        allItems.add(`${contributor.name}-${folder.name}`)
        folder.files.forEach(file => {
          allItems.add(`${contributor.name}-${folder.name}-${file.name}`)
        })
      })
    })
    setCheckedItems(allItems)
  }, [])

  const handleMouseDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      const newWidth = (e.clientX / window.innerWidth) * 100
      setLeftPaneWidth(Math.max(20, Math.min(80, newWidth)))
    }
  }, [isDragging])

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

  const handleProFeatureClick = () => {
    setShowUpgradeDialog(true)
  }

  const handleTopicClick = (topic: string) => {
    setCurrentPage('topic')
    setCurrentTopic(topic)
  }

  const handleEventClick = (eventId: number) => {
    setCurrentMainTab('analysis')
    setCurrentAnalysisTab('timeline')
  }

  const handlePlaceClick = (placeId: number) => {
    setCurrentMainTab('analysis')
    setCurrentAnalysisTab('map')
  }

  const handleTypeChange = (type: FileType) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const handleContributorChange = (contributor: Contributor) => {
    setSelectedContributors(prev =>
      prev.includes(contributor) ? prev.filter(c => c !== contributor) : [...prev, contributor]
    )
  }

  const handleCheckboxChange = (id: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const isChecked = (id: string) => checkedItems.has(id)

  const isGreyedOut = (contributor: Contributor, folder?: string, file?: File) => {
    if (!selectedContributors.includes(contributor)) return true
    if (file && !selectedTypes.includes(file.type)) return true
    return false
  }

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case 'Video':
        return <Video className="h-4 w-4" />
      case 'Document':
        return <FileText className="h-4 w-4" />
      case 'Web':
        return <Globe className="h-4 w-4" />
    }
  }

  const getContributorMenuText = () => {
    if (selectedContributors.length === 3) return 'All'
    if (selectedContributors.length > 1) return 'Multiple'
    return selectedContributors[0] || 'None'
  }

  return (
    <div className="flex flex-col h-screen" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
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
      <main className="flex flex-1 overflow-hidden">
        {currentPage === 'home' ? (
          <>
            <div style={{ width: `${leftPaneWidth}%` }} className="p-4 border-r overflow-y-auto">
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
            <div
              className="w-1 bg-gray-200 cursor-col-resize hover:bg-gray-300 transition-colors"
              onMouseDown={handleMouseDown}
            ></div>
            <div style={{ width: `${100 - leftPaneWidth}%` }} className="p-4">
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
        ) : (
          <>
            <div style={{ width: `${leftPaneWidth}%` }} className="border-r overflow-y-auto flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">Agent</h2>
              </div>
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <div className="flex items-start space-x-2 justify-end">
                  <div className="bg-gray-100 rounded-lg p-2">
                    <p>Lorem ipsum?</p>
                  </div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <div className="bg-blue-100 rounded-lg p-2">
                    <p>
                      Lorem ipsum <a href="#" className="text-blue-600 hover:underline" onClick={() => handleEventClick(1)}>dolor sit amet<sup>1</sup></a>, consectetur adipiscing elit, sed do <a href="#" className="text-blue-600 hover:underline" onClick={() => handlePlaceClick(2)}>eiusmod tempor incididunt<sup>2</sup></a> ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t">
                <Input type="text" placeholder={`Message ${currentTopic}AI`} />
              </div>
            </div>
            <div
              className="w-1 bg-gray-200 cursor-col-resize hover:bg-gray-300 transition-colors"
              onMouseDown={handleMouseDown}
            ></div>
            <div style={{ width: `${100 - leftPaneWidth}%` }} className="p-4 overflow-y-auto">
              <Tabs value={currentMainTab} onValueChange={setCurrentMainTab}>
                <TabsList>
                  <TabsTrigger value="home">Home</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="data">Data</TabsTrigger>
                </TabsList>
                <TabsContent value="home">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <h2 className="text-2xl font-bold">{currentTopic}</h2>
                        <p className="text-gray-500">Topic Home</p>
                      </div>
                    </div>
                    <p>Welcome to the topic's home page. Here you can find a description of the topic and some other info, as well as links to socials to discuss the topic with your community.</p>
                    <div className="flex space-x-4">
                      <a href="#" className="text-blue-500 hover:underline">
                        <MessageSquare className="h-6 w-6" />
                      </a>
                      <a href="#" className="text-blue-500 hover:underline">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="mt-8 space-y-4">
                    <Button variant="outline" onClick={handleProFeatureClick} className="w-full justify-center hover:bg-gray-100">
                      <Upload className="mr-2 h-4 w-4" /> Upload Data
                    </Button>
                    <Button className="w-full justify-center">
                      <Crown className="mr-2 h-4 w-4" /> Upgrade to Pro
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="analysis">
                  <Tabs value={currentAnalysisTab} onValueChange={setCurrentAnalysisTab}>
                    <TabsList>
                      <TabsTrigger value="knowledge-graph">Knowledge Graph</TabsTrigger>
                      <TabsTrigger value="timeline">Timeline</TabsTrigger>
                      <TabsTrigger value="map">Map</TabsTrigger>
                      <TabsTrigger value="sources">Sources</TabsTrigger>
                    </TabsList>
                    <TabsContent value="knowledge-graph">
                      <div className="border rounded-lg p-4 mt-4">
                        <h3 className="text-lg font-semibold mb-2">Interactive Knowledge Graph</h3>
                        <KnowledgeGraph onEventClick={handleEventClick} onPlaceClick={handlePlaceClick} />
                      </div>
                    </TabsContent>
                    <TabsContent value="timeline">
                      <div className="border rounded-lg p-4 mt-4">
                        <h3 className="text-lg font-semibold mb-2">Interactive Annotated Timeline</h3>
                        <Timeline />
                      </div>
                    </TabsContent>
                    <TabsContent value="map">
                      <div className="border rounded-lg p-4 mt-4">
                        <h3 className="text-lg font-semibold mb-2">Interactive Global Map</h3>
                        <WorldMap />
                      </div>
                    </TabsContent>
                    <TabsContent value="sources">
                      <div className="border rounded-lg p-4 mt-4">
                        <h3 className="text-lg font-semibold mb-2">Sources</h3>
                        <ul className="list-decimal list-inside">
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Consectetur adipiscing elit</li>
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </TabsContent>
                <TabsContent value="data">
                  <div className="border rounded-lg p-4 mt-4">
                    <div className="flex space-x-4 mb-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            Type: {selectedTypes.length === 3 ? 'All' : selectedTypes.join(', ')}
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuCheckboxItem
                            checked={selectedTypes.includes('Video')}
                            onCheckedChange={() => handleTypeChange('Video')}
                          >
                            Video
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={selectedTypes.includes('Document')}
                            onCheckedChange={() => handleTypeChange('Document')}
                          >
                            Document
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={selectedTypes.includes('Web')}
                            onCheckedChange={() => handleTypeChange('Web')}
                          >
                            Web
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            Contributor: {getContributorMenuText()}
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuCheckboxItem
                            checked={selectedContributors.includes('SmallFrank450')}
                            onCheckedChange={() => handleContributorChange('SmallFrank450')}
                          >
                            SmallFrank450
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={selectedContributors.includes('R3s3archLuvr777')}
                            onCheckedChange={() => handleContributorChange('R3s3archLuvr777')}
                          >
                            R3s3archLuvr777
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={selectedContributors.includes('NotVeryTrustworthy')}
                            onCheckedChange={() => handleContributorChange('NotVeryTrustworthy')}
                          >
                            NotVeryTrustworthy
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="grid grid-cols-3 gap-4 border rounded-lg">
                      <div className="border-r p-4">
                        <h3 className="font-bold mb-2">Contributor</h3>
                        {initialData.map(contributor => (
                          <div
                            key={contributor.name}
                            className={`flex items-center space-x-2 mb-2 ${
                              isGreyedOut(contributor.name) ? 'opacity-50' : ''
                            } ${selectedContributor === contributor.name ? 'bg-blue-100' : ''}`}
                            onClick={() => setSelectedContributor(contributor.name)}
                          >
                            <Checkbox
                              id={contributor.name}
                              checked={isChecked(contributor.name)}
                              onCheckedChange={() => handleCheckboxChange(contributor.name)}
                              disabled={isGreyedOut(contributor.name)}
                            />
                            <label
                              htmlFor={contributor.name}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-grow"
                            >
                              {contributor.name}
                            </label>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        ))}
                      </div>
                      <div className="border-r p-4">
                        <h3 className="font-bold mb-2">Folder</h3>
                        {selectedContributor && initialData.find(c => c.name === selectedContributor)?.folders.map(folder => (
                          <div
                            key={`${selectedContributor}-${folder.name}`}
                            className={`flex items-center space-x-2 mb-2 ${
                              isGreyedOut(selectedContributor) ? 'opacity-50' : ''
                            } ${selectedFolder === folder.name ? 'bg-blue-100' : ''}`}
                            onClick={() => setSelectedFolder(folder.name)}
                          >
                            <Checkbox
                              id={`${selectedContributor}-${folder.name}`}
                              checked={isChecked(`${selectedContributor}-${folder.name}`)}
                              onCheckedChange={() => handleCheckboxChange(`${selectedContributor}-${folder.name}`)}
                              disabled={isGreyedOut(selectedContributor)}
                            />
                            <label
                              htmlFor={`${selectedContributor}-${folder.name}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-grow"
                            >
                              {folder.name}
                            </label>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        ))}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-2">File</h3>
                        {selectedContributor && selectedFolder && 
                          initialData.find(c => c.name === selectedContributor)?.folders.find(f => f.name === selectedFolder)?.files.map(file => (
                            <div
                              key={`${selectedContributor}-${selectedFolder}-${file.name}`}
                              className={`flex items-center space-x-2 mb-2 ${
                                isGreyedOut(selectedContributor, selectedFolder, file) ? 'opacity-50' : ''
                              }`}
                            >
                              <Checkbox
                                id={`${selectedContributor}-${selectedFolder}-${file.name}`}
                                checked={isChecked(`${selectedContributor}-${selectedFolder}-${file.name}`)}
                                onCheckedChange={() => handleCheckboxChange(`${selectedContributor}-${selectedFolder}-${file.name}`)}
                                disabled={isGreyedOut(selectedContributor, selectedFolder, file)}
                              />
                              {getFileIcon(file.type)}
                              <label
                                htmlFor={`${selectedContributor}-${selectedFolder}-${file.name}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {file.name}
                              </label>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </main>
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade to Pro</DialogTitle>
            <DialogDescription>
              This feature is only available for Pro users. Upgrade now to access all features!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
              Not now
            </Button>
            <Button onClick={() => setShowUpgradeDialog(false)}>
              Upgrade to Pro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}