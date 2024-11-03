"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, GitBranch, GitCommit, MoreHorizontal } from "lucide-react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"

// Mock data for workflow runs
const workflowRuns = [
  { id: 1, name: "Build and Test", repository: "main-app", branch: "main", commit: "abc123", status: "success", duration: "3m 24s", startTime: "2023-07-15 10:30:00" },
  { id: 2, name: "Deploy to Staging", repository: "main-app", branch: "develop", commit: "def456", status: "failure", duration: "2m 15s", startTime: "2023-07-15 11:45:00" },
  { id: 3, name: "Run E2E Tests", repository: "frontend-client", branch: "feature/new-ui", commit: "ghi789", status: "running", duration: "5m 02s", startTime: "2023-07-15 13:20:00" },
  { id: 4, name: "Lint Code", repository: "api-service", branch: "main", commit: "jkl012", status: "success", duration: "1m 47s", startTime: "2023-07-15 14:10:00" },
  { id: 5, name: "Build Docker Image", repository: "data-processor", branch: "release/v1.2", commit: "mno345", status: "success", duration: "4m 33s", startTime: "2023-07-15 15:30:00" },
  { id: 6, name: "Security Scan", repository: "main-app", branch: "security-patch", commit: "pqr678", status: "running", duration: "8m 12s", startTime: "2023-07-15 16:45:00" },
  { id: 7, name: "Performance Tests", repository: "api-service", branch: "optimize", commit: "stu901", status: "success", duration: "10m 5s", startTime: "2023-07-15 17:30:00" },
  { id: 8, name: "Database Migration", repository: "data-processor", branch: "db-update", commit: "vwx234", status: "failure", duration: "1m 55s", startTime: "2023-07-15 18:15:00" },
  { id: 9, name: "Code Coverage", repository: "frontend-client", branch: "test-improvements", commit: "yza567", status: "success", duration: "2m 40s", startTime: "2023-07-15 19:00:00" },
  { id: 10, name: "Accessibility Tests", repository: "frontend-client", branch: "a11y-enhancements", commit: "bcd890", status: "running", duration: "4m 20s", startTime: "2023-07-15 20:30:00" },
  { id: 11, name: "Dependency Update", repository: "main-app", branch: "deps-update", commit: "efg123", status: "success", duration: "1m 30s", startTime: "2023-07-15 21:45:00" },
  { id: 12, name: "Integration Tests", repository: "api-service", branch: "feature/new-endpoint", commit: "hij456", status: "failure", duration: "6m 10s", startTime: "2023-07-15 22:30:00" },
  { id: 13, name: "Stress Tests", repository: "data-processor", branch: "performance", commit: "klm789", status: "running", duration: "15m 0s", startTime: "2023-07-15 23:15:00" },
  { id: 14, name: "Localization Build", repository: "frontend-client", branch: "i18n-update", commit: "nop012", status: "success", duration: "3m 50s", startTime: "2023-07-16 00:30:00" },
  { id: 15, name: "API Documentation", repository: "api-service", branch: "docs-update", commit: "qrs345", status: "success", duration: "2m 25s", startTime: "2023-07-16 01:45:00" },
]

export default function WorkflowDashboard() {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("24h")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRuns = workflowRuns.filter(run => {
    if (statusFilter !== "all" && run.status !== statusFilter) return false
    if (searchTerm && !run.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !run.repository.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Workflow Runs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failure">Failure</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              type="text"
              placeholder="Search workflows or repositories"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px]"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workflow</TableHead>
                <TableHead>Repository</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Commit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRuns.map((run) => (
                <TableRow key={run.id}>
                  <TableCell className="font-medium">
                  <Link 
                    href={{
                    pathname: `/workflows/`,
                    query: {
                        repoId: run.repository,
                        workflowId: run.id,
                        workflowName: run.name
                    }
                    }}
                    className="text-blue-500 hover:underline"
                >
                    {run.name}
                </Link>
                  </TableCell>
                  <TableCell>{run.repository}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <GitBranch className="mr-2 h-4 w-4" />
                      {run.branch}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <GitCommit className="mr-2 h-4 w-4" />
                      {run.commit.slice(0, 7)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      run.status === 'success' ? 'bg-green-100 text-green-800' :
                      run.status === 'failure' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {run.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {run.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      {run.startTime}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/workflows/${run.id}`)}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>View logs</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Re-run workflow</DropdownMenuItem>
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