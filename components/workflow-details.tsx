"use client"

import { useState } from "react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ArrowLeft, ChevronDown, RefreshCcw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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

const pipelineExecutions = [
  { id: 1, date: "Jul 11 15:41:31.000", duration: "36.0 s", commit: "Merge pull request", author: "Alice Johnson" },
  { id: 2, date: "Jul 11 15:31:30.000", duration: "29.0 s", commit: "Merge pull request", author: "Bob Smith" },
  { id: 3, date: "Jul 11 15:21:29.000", duration: "32.5 s", commit: "Update dependencies", author: "Charlie Brown" },
  { id: 4, date: "Jul 11 15:11:28.000", duration: "30.2 s", commit: "Fix test cases", author: "Diana Prince" },
  { id: 5, date: "Jul 11 15:01:27.000", duration: "28.7 s", commit: "Refactor code", author: "Ethan Hunt" },
]

export default function WorkflowDetails({ id }: { id: string }) {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/workflows">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Workflow Details: {id}</h1>
        </div>
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

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={executionsData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="success" stackId="a" fill="#4ade80" />
                <Bar dataKey="error" stackId="a" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failure Rate</CardTitle>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={executionsData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Line type="monotone" dataKey="error" stroke="#f87171" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Build Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={durationData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Line type="monotone" dataKey="max" stroke="#3b82f6" />
                <Line type="monotone" dataKey="p50" stroke="#10b981" />
                <Line type="monotone" dataKey="p95" stroke="#f59e0b" />
              </LineChart>
            </ResponsiveContainer>
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
                <TableHead>Date</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Commit</TableHead>
                <TableHead>Author</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pipelineExecutions.map((execution) => (
                <TableRow key={execution.id}>
                  <TableCell>{execution.date}</TableCell>
                  <TableCell>main</TableCell>
                  <TableCell>{execution.duration}</TableCell>
                  <TableCell>{execution.commit}</TableCell>
                  <TableCell>{execution.author}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}