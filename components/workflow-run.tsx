"use client"

import { useState } from "react"
import { CheckCircle2, Clock, FileDown, FileText, Info, XCircle } from "lucide-react"
import { format } from "date-fns"

import { useWorkflowRun } from "@/lib/hooks"
import { Artifact, Job, TaskStep } from "@/types"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for demonstration
const workflowRun = {
  id: "1234567890",
  name: "CI/CD Pipeline",
  status: "completed",
  conclusion: "success",
  createdAt: "2023-04-15T10:00:00Z",
  updatedAt: "2023-04-15T10:15:00Z",
  runNumber: 42,
  runAttempt: 1,
  triggeredBy: {
    login: "octocat",
    avatarUrl: "https://github.com/octocat.png",
  },
  jobs: [
    {
      id: "job1",
      name: "Build",
      status: "completed",
      conclusion: "success",
      startedAt: "2023-04-15T10:01:00Z",
      completedAt: "2023-04-15T10:10:00Z",
      steps: [
        { name: "Checkout", conclusion: "success", number: 1 },
        { name: "Setup Node.js", conclusion: "success", number: 2 },
        { name: "Install dependencies", conclusion: "success", number: 3 },
        { name: "Run tests", conclusion: "success", number: 4 },
        { name: "Build project", conclusion: "success", number: 5 },
      ],
    },
    {
      id: "job2",
      name: "Deploy",
      status: "completed",
      conclusion: "success",
      startedAt: "2023-04-15T10:11:00Z",
      completedAt: "2023-04-15T10:15:00Z",
      steps: [
        { name: "Checkout", conclusion: "success", number: 1 },
        { name: "Configure AWS credentials", conclusion: "success", number: 2 },
        { name: "Deploy to S3", conclusion: "success", number: 3 },
      ],
    },
  ],
  artifacts: [
    { name: "dist", size: 1024000, expired: false },
    { name: "coverage", size: 512000, expired: false },
  ],
}

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    completed: { color: "bg-green-500", icon: CheckCircle2 },
    failed: { color: "bg-red-500", icon: XCircle },
    in_progress: { color: "bg-yellow-500", icon: Clock },
  }[status] || { color: "bg-gray-500", icon: Info }

  return (
    <Badge variant="outline" className={`${statusConfig.color} text-white`}>
      <statusConfig.icon className="mr-1 h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export default function WorkflowRun({ runId, repoId }: { runId: string; repoId: string }) {
  const [activeTab, setActiveTab] = useState("jobs")
  const { workflowRun, isLoading, isError } = useWorkflowRun(runId, repoId)

  return (
    <div className="container mx-auto py-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{workflowRun.name}</CardTitle>
              <CardDescription>
                Run #{workflowRun.runNumber} • Attempt #{workflowRun.runAttempt}
              </CardDescription>
            </div>
            <StatusBadge status={workflowRun.status} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={workflowRun.triggeredBy.avatarUrl} alt={workflowRun.triggeredBy.login} />
              <AvatarFallback>{workflowRun.triggeredBy.login.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Triggered by {workflowRun.triggeredBy.login}</p>
              <p className="text-xs text-gray-500">
                Started: {format(new Date(workflowRun.createdAt), "PPpp")}
              </p>
              <p className="text-xs text-gray-500">
                Finished: {format(new Date(workflowRun.updatedAt), "PPpp")}
              </p>
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
              <TabsTrigger value="runner">Runner</TabsTrigger>
            </TabsList>
            <TabsContent value="jobs">
              {workflowRun.jobs.map((job: Job) => (
                <Collapsible key={job.id} className="mb-4">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span>{job.name}</span>
                      <StatusBadge status={job.status} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Step</TableHead>
                          <TableHead className="w-24">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {job.steps.map((step: TaskStep) => (
                          <TableRow key={step.number}>
                            <TableCell>{step.number}</TableCell>
                            <TableCell>{step.name}</TableCell>
                            <TableCell>
                              <StatusBadge status={step.conclusion} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mt-2 flex justify-end space-x-2">
                      <Button size="sm" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        View Logs
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </TabsContent>
            <TabsContent value="artifacts">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-24">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflowRun.artifacts.map((artifact: Artifact) => (
                    <TableRow key={artifact.name}>
                      <TableCell>{artifact.name}</TableCell>
                      <TableCell>{(artifact.size / 1024 / 1024).toFixed(2)} MB</TableCell>
                      <TableCell>
                        <Badge variant={artifact.expired ? "destructive" : "default"}>
                          {artifact.expired ? "Expired" : "Available"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" disabled={artifact.expired}>
                          <FileDown className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="runner">
              <Card>
                <CardHeader>
                  <CardTitle>Runner Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Runner: GitHub-hosted runner</p>
                  <p>OS: ubuntu-latest</p>
                  <p>Specification: 2-core CPU, 7 GB of RAM, 14 GB of SSD space</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Full Logs
          </Button>
          <Button variant="outline">
            <Info className="mr-2 h-4 w-4" />
            Run Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}