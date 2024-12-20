import AuthWrapper from '@/components/auth-wrapper'
import WorkflowRun from '@/components/workflow-run'

export default function WorkflowPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | number }
}) {
  const owner = searchParams.owner as string
  const repo = searchParams.repo as string
  const runId = searchParams.runId as number

  return (
    <AuthWrapper>
      <WorkflowRun 
        owner={owner} 
        repo={repo} 
        runId={runId} 
      />
    </AuthWrapper>
  )
}
