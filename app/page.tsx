import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function Home() {
  const { userId } = auth()

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Routine Builder</h1>
      {userId ? (
        <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Go to Dashboard
        </Link>
      ) : (
        <Link href="/sign-in" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Sign In
        </Link>
      )}
    </div>
  )
}