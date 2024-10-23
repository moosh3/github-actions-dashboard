"use client"

import { useState } from "react"
import { GitCommit, MoreHorizontal, RefreshCcw } from "lucide-react"
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mock data for user's workflow history
const userWorkflows = [
  { id: 1, name: "Update Documentation", status: "success", branch: "docs/update", commit: "abc123", time: "2 hours ago", repository: "main-app" },
  { id: 2, name: "Fix Login Bug", status: "failure", branch: "bugfix/login", commit: "def456", time: "1 day ago", repository: "auth-service" },
  { id: 3, name: "Add New Feature", status: "success", branch: "feature/new-ui", commit: "ghi789", time: "2 days ago", repository: "frontend-client" },
  { id: 4, name: "Refactor API", status: "running", branch: "refactor/api", commit: "jkl012", time: "3 days ago", repository: "api-service" },
  { id: 5, name: "Update Dependencies", status: "success", branch: "chore/dependencies", commit: "mno345", time: "4 days ago", repository: "shared-lib" },
  { id: 6, name: "Implement User Analytics", status: "success", branch: "feature/user-analytics", commit: "pqr678", time: "5 days ago", repository: "analytics-service" },
  { id: 7, name: "Optimize Database Queries", status: "running", branch: "perf/db-optimization", commit: "stu901", time: "6 days ago", repository: "database-service" },
  { id: 8, name: "Add Unit Tests", status: "failure", branch: "test/add-unit-tests", commit: "vwx234", time: "1 week ago", repository: "test-suite" },
  { id: 9, name: "Update CI/CD Pipeline", status: "success", branch: "devops/update-pipeline", commit: "yza567", time: "1 week ago", repository: "ci-cd-config" },
  { id: 10, name: "Implement Dark Mode", status: "success", branch: "feature/dark-mode", commit: "bcd890", time: "8 days ago", repository: "frontend-client" },
  { id: 11, name: "Fix Security Vulnerability", status: "success", branch: "security/patch-auth", commit: "efg123", time: "9 days ago", repository: "auth-service" },
  { id: 12, name: "Refactor State Management", status: "running", branch: "refactor/state", commit: "hij456", time: "10 days ago", repository: "frontend-client" },
  { id: 13, name: "Implement Caching Layer", status: "success", branch: "feature/caching", commit: "klm789", time: "11 days ago", repository: "api-service" },
  { id: 14, name: "Update Third-party Libraries", status: "failure", branch: "chore/update-libs", commit: "nop012", time: "12 days ago", repository: "shared-lib" },
  { id: 15, name: "Add Accessibility Features", status: "success", branch: "feature/a11y", commit: "qrs345", time: "2 weeks ago", repository: "frontend-client" }
]

// Get unique repositories from the workflow data
const repositories = Array.from(new Set(userWorkflows.map(workflow => workflow.repository)))

export default function UserWorkflowHistory() {
  const router = useRouter()
  const { data: session } = useSession()
  const [timePeriod, setTimePeriod] = useState("7d")
  const [statusFilter, setStatusFilter] = useState("all")
  const [repoFilter, setRepoFilter] = useState("all")

  const filteredWorkflows = userWorkflows.filter(workflow => {
    const statusMatch = statusFilter === "all" || workflow.status === statusFilter
    const repoMatch = repoFilter === "all" || workflow.repository === repoFilter
    return statusMatch && repoMatch
  })

  // Function to generate GitHub commit URL
  const getCommitUrl = (repo: string, commit: string) => {
    return `https://github.com/your-org/${repo}/commit/${commit}`
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Workflow History</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/workflows")}>Back to Dashboard</Button>
          {session?.user?.image && (
            <Avatar>
              <AvatarImage src={session.user.image} alt={session.user.name || "User avatar"} />
              <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failure">Failure</SelectItem>
              <SelectItem value="running">Running</SelectItem>
            </SelectContent>
          </Select>
          <Select value={repoFilter} onValueChange={setRepoFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by repository" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Repositories</SelectItem>
              {repositories.map(repo => (
                <SelectItem key={repo} value={repo}>{repo}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Recent Workflows</CardTitle>
          <CardDescription>Overview of your most recent GitHub Actions across all repositories</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Repository</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Commit</TableHead>
                <TableHead>Time</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkflows.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell className="font-medium">
                    <Link href={`/workflows/${workflow.id}`} className="text-blue-500 hover:underline">
                      {workflow.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      workflow.status === 'success' ? 'bg-green-100 text-green-800' :
                      workflow.status === 'failure' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {workflow.status}
                    </span>
                  </TableCell>
                  <TableCell>{workflow.repository}</TableCell>
                  <TableCell>{workflow.branch}</TableCell>
                  <TableCell>
                    <a
                      href={getCommitUrl(workflow.repository, workflow.commit)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-500 hover:underline"
                    >
                      <GitCommit className="h-4 w-4 mr-1" />
                      {workflow.commit.slice(0, 7)}
                    </a>
                  </TableCell>
                  <TableCell>{workflow.time}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link href={`/workflows/${workflow.id}`}>View details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>View logs</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Re-run</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
