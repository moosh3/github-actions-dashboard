'use client'

import { SessionProvider } from "next-auth/react"
import { useEffect } from "react"

export function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      console.log('Fetch request:', args)
      try {
        const response = await originalFetch(...args)
        console.log('Fetch response:', response)
        return response
      } catch (error) {
        console.error('Fetch error:', error)
        throw error
      }
    }

    return () => {
      window.fetch = originalFetch
    }
  }, [])

  return <SessionProvider>{children}</SessionProvider>
}