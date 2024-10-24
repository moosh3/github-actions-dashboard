import AuthWrapper from '@/components/auth-wrapper'
import WorkflowDetails from '@/components/workflow-details'

export default function WorkflowsPage({ params }: { params: { repoId: string, workflowId: string, workflowName: string } }) {
  return (
    <AuthWrapper>
      <WorkflowDetails repoId={params.repoId} workflowId={params.workflowId} workflowName={params.workflowName} />
    </AuthWrapper>
  )
}
