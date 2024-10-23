'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function SignIn() {
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    try {
      const result = await signIn("github", { 
        callbackUrl: "/workflows",
        redirect: false
      })
      console.log('Sign-in result:', result)
      if (result?.error) {
        setError(result.error)
      }
    } catch (e) {
      console.error('Sign-in error:', e)
      setError('An unexpected error occurred')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">Sign In</h1>
      <Button onClick={handleSignIn}>
        Sign in with GitHub
      </Button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}