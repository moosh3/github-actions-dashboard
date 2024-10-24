"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2, GitBranch, GitCommit, MoreHorizontal, RefreshCcw } from "lucide-react"
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Mock data for the Workflow Runs chart
const workflowRunsData = [
  { name: "Mon", success: 4, failure: 1 },
  { name: "Tue", success: 5, failure: 0 },
  { name: "Wed", success: 3, failure: 2 },
  { name: "Thu", success: 6, failure: 1 },
  { name: "Fri", success: 4, failure: 0 },
  { name: "Sat", success: 2, failure: 1 },
  { name: "Sun", success: 3, failure: 0 },
]

// Mock data for the Workflow Frequency chart
const workflowFrequencyData = [
  { name: "Build", frequency: 45 },
  { name: "Test", frequency: 30 },
  { name: "Deploy", frequency: 15 },
  { name: "Lint", frequency: 25 },
  { name: "E2E Tests", frequency: 10 },
]

// Mock data for recent actions
const recentActions = [
  { id: 1, name: "Build and Test", status: "success", branch: "main", commit: "abc123", time: "2 minutes ago" },
  { id: 2, name: "Deploy to Staging", status: "running", branch: "develop", commit: "def456", time: "10 minutes ago" },
  { id: 3, name: "Lint Code", status: "failure", branch: "feature/new-ui", commit: "ghi789", time: "1 hour ago" },
  { id: 4, name: "Run E2E Tests", status: "success", branch: "main", commit: "jkl012", time: "2 hours ago" },
  { id: 5, name: "Build Docker Image", status: "success", branch: "release/v1.2", commit: "mno345", time: "3 hours ago" },
]

// Mock data for repositories
const repositories = [
  { id: "1", name: "main-app" },
  { id: "2", name: "api-service" },
  { id: "3", name: "frontend-client" },
  { id: "4", name: "data-processor" },
]

type GitHubActionsDashboardProps = {
  repoId: string
}

export default function WorkflowList({ repoId }: GitHubActionsDashboardProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [filter, setFilter] = useState("all")
  const [selectedRepo, setSelectedRepo] = useState(repositories[0].id)

  const filteredActions = recentActions.filter(action => {
    if (filter === "all") return true
    return action.status === filter
  })

  // Function to generate GitHub commit URL
  const getCommitUrl = (repo: string, commit: string) => {
    return `https://github.com/your-org/${repo}/commit/${commit}`
  }

  const getRepoNameById = (id: string) => {
    const repo = repositories.find(repo => repo.id === id)
    return repo ? repo.name : "Unknown Repository"
  }

  const repoName = getRepoNameById(repoId)

  return (
    <div className="flex h-screen">
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/repositories/${repoId}`}>{repoName}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <br />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-xs text-muted-foreground">+2.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
                <RefreshCcw className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3m 24s</div>
                <p className="text-xs text-muted-foreground">-12s from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
                <GitBranch className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 new this month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Runs (Last 7 Days)</CardTitle>
                <CardDescription>A breakdown of successful vs. failed runs</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    success: {
                      label: "Successful Runs",
                      color: "hsl(var(--chart-1))",
                    },
                    failure: {
                      label: "Failed Runs",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={workflowRunsData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="success" stackId="a" fill="var(--color-success)" />
                      <Bar dataKey="failure" stackId="a" fill="var(--color-failure)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workflow Frequency</CardTitle>
                <CardDescription>Number of runs per workflow</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    frequency: {
                      label: "Run Frequency",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={workflowFrequencyData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="frequency" fill="var(--color-frequency)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Workflows</CardTitle>
              <CardDescription>
                Overview of the most recent Workflow Runs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failure">Failure</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Commit</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActions.map((action) => (
                    <TableRow key={action.id}>
                      <TableCell className="font-medium">
                        <a
                          onClick={() => router.push(`/workflows/${action.id}?repoId=${repoId}&workflowId=${action.id}&workflowName=${action.name}`)}
                          className="text-blue-500 hover:underline cursor-pointer"
                        >
                          {action.name}
                        </a>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          action.status === 'success' ? 'bg-green-100 text-green-800' :
                          action.status === 'failure' ? 'bg-red-100  text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {action.status}
                        </span>
                      </TableCell>
                      <TableCell><Link href={`/workflows/${action.id}`} className="text-blue-500 hover:underline">
                          {action.branch}
                        </Link></TableCell>
                      <TableCell>
                        <a
                          href={getCommitUrl(repositories.find(repo => repo.id === selectedRepo)?.name || '', action.commit)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-500 hover:underline"
                        >
                          <GitCommit className="h-4 w-4 mr-1" />
                          {action.commit.slice(0, 7)}
                        </a>
                      </TableCell>
                      <TableCell>{action.time}</TableCell>
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
                              <Link href={`/workflows/${action.id}`}>View details</Link>
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
    </div>
  )
}
