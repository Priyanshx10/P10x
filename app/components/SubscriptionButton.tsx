'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'

export default function SubscriptionButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubscribe = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })
      const { sessionId } = await response.json()
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={isLoading}
      className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mb-8"
    >
      {isLoading ? 'Processing...' : 'Upgrade to Premium'}
    </button>
  )
}