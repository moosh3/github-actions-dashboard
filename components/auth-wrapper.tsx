'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    router.push("/")
    return null
  }

  return <>{children}</>
}