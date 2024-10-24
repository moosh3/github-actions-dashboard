'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Home() {
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log("Session status:", status)
    console.log("Session data:", session)
  }, [session, status])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="mb-8 w-full max-w-xs">
        <Image
          src="/logo.png"
          alt="GitHub Actions Dashboard Banner"
          width={300}
          height={120}
          layout="responsive"
          priority
        />
      </div>
      <h1 className="text-4xl font-bold mb-6">Welcome to GitHub Actions Dashboard</h1>
      {session ? (
        <div className="flex flex-col items-center gap-4">
          <p>Signed in as {session.user?.email}</p>
          <Link href="/dashboard" className="mt-4">
            <Button>View Dashboard</Button>
          </Link>
          <Button variant="outline" onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <Button onClick={() => signIn("github")}>Sign in with GitHub</Button>
      )}
    </main>
  )
}