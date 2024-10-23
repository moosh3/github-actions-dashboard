'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">Authentication Error</h1>
      <p className="mb-4">An error occurred during authentication: {error}</p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}