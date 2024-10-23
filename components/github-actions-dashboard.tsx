"use client"

import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { AlertCircle, CheckCircle2, GitBranch, GitCommit, MoreHorizontal, RefreshCcw } from "lucide-react"
import Link from "next/link"

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
import { Input } from "@/components/ui/input"
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

// Mock data for the chart
const chartData = [
  { name: "Mon", success: 4, failure: 1 },
  { name: "Tue", success: 5, failure: 0 },
  { name: "Wed", success: 3, failure: 2 },
  { name: "Thu", success: 6, failure: 1 },
  { name: "Fri", success: 4, failure: 0 },
  { name: "Sat", success: 2, failure: 1 },
  { name: "Sun", success: 3, failure: 0 },
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

export default function GitHubActionsDashboard() {
  const [filter, setFilter] = useState("all")
  const [selectedRepo, setSelectedRepo] = useState(repositories[0].id)

  const filteredActions = recentActions.filter(action => {
    if (filter === "all") return true
    return action.status === filter
  })

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-4 mb-6">
        <h1 className="text-3xl font-bold">GitHub Actions Dashboard</h1>
        <Select value={selectedRepo} onValueChange={setSelectedRepo}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select repository" />
          </SelectTrigger>
          <SelectContent>
            {repositories.map((repo) => (
              <SelectItem key={repo.id} value={repo.id}>
                {repo.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
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

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Workflow Runs (Last 7 Days)</CardTitle>
          <CardDescription>A breakdown of successful vs. failed runs</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="success" stackId="a" fill="#4ade80" />
              <Bar dataKey="failure" stackId="a" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Actions</CardTitle>
          <CardDescription>
            <div className="flex justify-between items-center">
              <span>Overview of the most recent GitHub Actions</span>
              <div className="flex space-x-2">
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
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                    <Link href={`/workflows/${action.id}`} className="text-blue-500 hover:underline">
                      {action.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      action.status === 'success' ? 'bg-green-100 text-green-800' :
                      action.status === 'failure' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {action.status}
                    </span>
                  </TableCell>
                  <TableCell>{action.branch}</TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      <GitCommit className="h-4 w-4 mr-1" />
                      {action.commit.slice(0, 7)}
                    </span>
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
                        <DropdownMenuItem>View details</DropdownMenuItem>
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