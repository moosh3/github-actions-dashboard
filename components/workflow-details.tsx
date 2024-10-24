"use client"

import { useState } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ArrowLeft, ChevronDown, RefreshCcw, ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
//import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

// Mock data for charts
const executionsData = [
  { day: "Tue 5", success: 25, error: 2 },
  { day: "Wed 6", success: 22, error: 1 },
  { day: "Thu 7", success: 28, error: 0 },
  { day: "Fri 8", success: 23, error: 3 },
  { day: "Sat 9", success: 15, error: 1 },
  { day: "Sun 10", success: 17, error: 0 },
  { day: "Mon 11", success: 26, error: 4 },
]

const durationData = [
  { day: "Tue 5", max: 12, p50: 8, p95: 10 },
  { day: "Wed 6", max: 14, p50: 7, p95: 11 },
  { day: "Thu 7", max: 13, p50: 9, p95: 12 },
  { day: "Fri 8", max: 15, p50: 8, p95: 13 },
  { day: "Sat 9", max: 11, p50: 7, p95: 9 },
  { day: "Sun 10", max: 12, p50: 8, p95: 10 },
  { day: "Mon 11", max: 14, p50: 9, p95: 12 },
]

// Mock data for demonstration
const workflowRuns = [
  {
    id: "1",
    name: "CI/CD Pipeline",
    status: "completed",
    conclusion: "success",
    createdAt: "2023-04-15T10:00:00Z",
    runNumber: 42,
  },
  {
    id: "2",
    name: "Nightly Tests",
    status: "completed",
    conclusion: "failure",
    createdAt: "2023-04-14T22:00:00Z",
    runNumber: 41,
  },
  {
    id: "3",
    name: "Deploy to Production",
    status: "in_progress",
    conclusion: null,
    createdAt: "2023-04-15T11:30:00Z",
    runNumber: 43,
  },
]
// Mock data for repositories
const repositories = [
  { id: "1", name: "main-app" },
  { id: "2", name: "api-service" },
  { id: "3", name: "frontend-client" },
  { id: "4", name: "data-processor" },
]

export default function WorkflowDetails({ repoId, workflowId, workflowName }: { repoId: string, workflowId: string, workflowName: string }) {
  //const router = useRouter()
  const { data: session } = useSession()
  const [timeRange, setTimeRange] = useState("7d")
  
  const getRepoNameById = (id: string) => {
    const repo = repositories.find(repo => repo.id === id)
    return repo ? repo.name : "Unknown Repository"
  }

  const repoName = getRepoNameById(repoId)

  return (
    
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
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
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/workflows/${workflowId}`}>build-and-push</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <br />
        
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Past 1 Day</SelectItem>
              <SelectItem value="7d">Past 1 Week</SelectItem>
              <SelectItem value="30d">Past 30 Days</SelectItem>
              <SelectItem value="90d">Past 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
      <Card>
          <CardHeader>
            <CardTitle>Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                success: {
                  label: "Successful Executions",
                  color: "hsl(var(--chart-1))",
                },
                error: {
                  label: "Failed Executions",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={executionsData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="success" stackId="a" fill="var(--color-success)" />
                  <Bar dataKey="error" stackId="a" fill="var(--color-error)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                max: {
                  label: "Max Duration",
                  color: "hsl(var(--chart-3))",
                },
                p95: {
                  label: "95th Percentile",
                  color: "hsl(var(--chart-4))",
                },
                p50: {
                  label: "Median",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={durationData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="max" stroke="var(--color-max)" />
                  <Line type="monotone" dataKey="p95" stroke="var(--color-p95)" />
                  <Line type="monotone" dataKey="p50" stroke="var(--color-p50)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Workflow Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>P50 Duration</TableHead>
                <TableHead>P95 Duration</TableHead>
                <TableHead>Exec Time %</TableHead>
                <TableHead>Failure %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">build</TableCell>
                <TableCell>35.2 s</TableCell>
                <TableCell>1 min 25 s</TableCell>
                <TableCell>100%</TableCell>
                <TableCell>4.7%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">lint</TableCell>
                <TableCell>35.2 s</TableCell>
                <TableCell>25 s</TableCell>
                <TableCell>80%</TableCell>
                <TableCell>0.7%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">publish</TableCell>
                <TableCell>35.2 s</TableCell>
                <TableCell>12 min 25 s</TableCell>
                <TableCell>100%</TableCell>
                <TableCell>49.7%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Workflow Runs</CardTitle>
        </CardHeader>
        <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Run</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <Button variant="ghost" className="h-8 w-full justify-start">
                  Created
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workflowRuns.map((run) => (
              <TableRow key={run.id}>
                <TableCell className="font-medium">
                  <Link href={`/workflows/${repoId}/runs/${run.id}`} className="text-blue-600 hover:underline">
                    #{run.runNumber}
                  </Link>
                </TableCell>
                <TableCell>{run.name}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    run.status === 'completed'
                      ? run.conclusion === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {run.status === 'completed' ? run.conclusion : 'In Progress'}
                  </div>
                </TableCell>
                <TableCell>{new Date(run.createdAt).toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Link href={`/workflow-run/${run.id}`}>View details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Download logs</DropdownMenuItem>
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