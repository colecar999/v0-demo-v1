import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { useDashboard } from '../context/DashboardContext'

interface AgentChatProps {
  width: number
}

export default function AgentChat({ width }: AgentChatProps) {
  const { currentTopic } = useDashboard()
  const [messages, setMessages] = useState([
    { sender: 'user', text: 'Lorem ipsum?' },
    { sender: 'agent', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  ])

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { sender: 'user', text: message }])
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'agent', text: 'This is a dummy response from the agent.' }])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(e.currentTarget.value)
      e.currentTarget.value = ''
    }
  }

  return (
    <div style={{ width: `${width}%` }} className="border-r overflow-y-auto flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Agent</h2>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start space-x-2 ${message.sender === 'user' ? 'justify-end' : ''}`}>
            {message.sender === 'agent' && <div className="w-8 h-8 bg-blue-500 rounded-full flex-shrink-0"></div>}
            <div className={`rounded-lg p-2 ${message.sender === 'user' ? 'bg-gray-100' : 'bg-blue-100'}`}>
              <p>{message.text}</p>
            </div>
            {message.sender === 'user' && <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>}
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <Input 
          type="text" 
          placeholder={`Message ${currentTopic}AI`} 
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}