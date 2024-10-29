import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { NavMenu } from '@/components/nav-menu'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GitHub Actions Dashboard',
  description: 'Admin dashboard for GitHub Actions overview',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto px-4 py-8">
          <Providers>
            <NavMenu />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}