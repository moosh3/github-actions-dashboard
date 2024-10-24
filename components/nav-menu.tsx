"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from "next-auth/react"
import { Home, GitFork, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavMenu() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const navItems = [
    ...(session ? [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
      { name: 'Repositories', href: '/repositories', icon: GitFork },
      { name: 'User', href: '/user', icon: User },
    ] : [])
  ]

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/dashboard')
  }

  return (
    <nav className="flex items-center justify-between mb-4 bg-background p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
      {session?.user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User avatar"} />
              <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  )
}

function UserAvatar() {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User avatar"} />
      <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
    </Avatar>
  )
}