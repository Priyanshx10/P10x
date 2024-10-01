'use client'

import { useUser } from '@clerk/nextjs'

export default function ProgressDashboard() {
  const { user } = useUser()

  if (!user?.publicMetadata.isPremium) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8">
        <p className="font-bold">Premium Feature</p>
        <p>Upgrade to premium to access the progress dashboard.</p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Progress Dashboard</h2>
      {/* TODO: Implement progress tracking and visualization */}
      <p>Your progress will be displayed here.</p>
    </div>
  )
}