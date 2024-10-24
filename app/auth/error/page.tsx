'use client'

//import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
//import { Suspense } from 'react'

export default function AuthError() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">Authentication Error</h1>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}