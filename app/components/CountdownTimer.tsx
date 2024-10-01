'use client'

import { useState, useEffect } from 'react'

export default function CountdownTimer({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = new Date(endTime).getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft('Event ended')
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-md rounded px-4 py-2">
      <p className="text-sm font-bold">Time left: {timeLeft}</p>
    </div>
  )
}