import dynamic from 'next/dynamic'

const Dashboard = dynamic(() => import('@/components/app-page'), { ssr: false })

export default function HomePage() {
  return <Dashboard />
}