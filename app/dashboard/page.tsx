import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import EventCalendar from '../components/EventCalendar'
import EventForm from '../components/EventForm'
import HabitForm from '../components/HabitForm'
import ProgressDashboard from '../components/ProgressDashboard'
import SubscriptionButton from '../components/SubscriptionButton'
import React from 'react'

export default async function Dashboard() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const user = await clerkClient.users.getUser(userId)
  const isPremium = user.publicMetadata.isPremium as boolean

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
      {!isPremium && <SubscriptionButton userId={userId} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <EventCalendar />
          <EventForm />
          <HabitForm />
        </div>
        <div>
          <ProgressDashboard />
        </div>
      </div>
    </div>
  )
}