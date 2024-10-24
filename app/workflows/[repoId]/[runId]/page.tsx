import AuthWrapper from '@/components/auth-wrapper'
import WorkflowRun from '@/components/workflow-run'

export default function WorkflowRunPage({ params }: { params: { repoId: string, runId: string } }) {
  return (
    <AuthWrapper>
      <WorkflowRun runId={params.runId} repoId={params.repoId} />
    </AuthWrapper>
  )
}
