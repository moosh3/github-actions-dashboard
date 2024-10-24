"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GitFork, Search, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  

type Repository = {
  id: number
  name: string
  description: string
  stars: number
  forks: number
  language: string
}

const mockRepositories: Repository[] = [
  { id: 1, name: "next.js", description: "The React Framework", stars: 98000, forks: 22000, language: "JavaScript" },
  { id: 2, name: "react", description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.", stars: 190000, forks: 39000, language: "JavaScript" },
  { id: 3, name: "vercel", description: "Develop. Preview. Ship.", stars: 8700, forks: 950, language: "TypeScript" },
  { id: 4, name: "swr", description: "React Hooks for Data Fetching", stars: 25000, forks: 950, language: "TypeScript" },
  { id: 5, name: "tailwindcss", description: "A utility-first CSS framework for rapid UI development.", stars: 62000, forks: 3200, language: "CSS" },
]

export default function RepositoryList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [repositories, setRepositories] = useState<Repository[]>(mockRepositories)
  const router = useRouter()

  const filteredRepositories = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRepoClick = (repoId: number) => {
    router.push(`/repositories/${repoId}`)
  }

  return (
    <div className="container mx-auto py-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/repositories">Repositories</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      <br />
      <div className="flex mb-6">
        <Input
          type="text"
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Button>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRepositories.map((repo) => (
          <Card 
            key={repo.id} 
            className="cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => handleRepoClick(repo.id)}
          >
            <CardHeader>
              <CardTitle>{repo.name}</CardTitle>
              <CardDescription>{repo.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  <span className="mr-4">{repo.stars}</span>
                  <GitFork className="h-4 w-4 mr-1" />
                  <span>{repo.forks}</span>
                </div>
                <span className="text-sm text-muted-foreground">{repo.language}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}