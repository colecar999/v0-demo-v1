import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MessageSquare, Crown } from 'lucide-react'
import KnowledgeGraph from './KnowledgeGraph'
import Timeline from './Timeline'
import WorldMap from './WorldMap'
import DataPanel from './DataPanel'
import { useDashboard } from '../context/DashboardContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AnalysisPanelProps {
  width: number
}

export default function AnalysisPanel({ width }: AnalysisPanelProps) {
  const { currentTopic, handleProFeatureClick } = useDashboard()
  const [currentMainTab, setCurrentMainTab] = useState('home')
  const [currentAnalysisTab, setCurrentAnalysisTab] = useState('knowledge-graph')
  const [currentSources, setCurrentSources] = useState<string[]>([
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
  ])
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)

  const handleUpgradeClick = () => {
    setShowUpgradeDialog(true)
  }

  return (
    <div style={{ width: `${width}%` }} className="p-4 overflow-y-auto">
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
              <Crown className="mr-2 h-4 w-4" /> Upload Data
            </Button>
            <Button onClick={handleUpgradeClick} className="w-full justify-center">
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
                <KnowledgeGraph onEventClick={() => {}} onPlaceClick={() => {}} />
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
                  {currentSources.map((source, index) => (
                    <li key={index}>{source}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="data">
          <DataPanel />
        </TabsContent>
      </Tabs>

      <Dialog open={showComingSoonDialog} onOpenChange={setShowComingSoonDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Coming Soon!</DialogTitle>
            <DialogDescription>
              This feature is not yet available. Stay tuned for updates!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowComingSoonDialog(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Coming Soon!</DialogTitle>
            <DialogDescription>
              This feature is not yet available. Stay tuned for updates!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowUpgradeDialog(false)}>OK</Button>
            <Button onClick={() => setShowUpgradeDialog(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}