import AuthWrapper from '@/components/auth-wrapper'
import WorkflowDetails from '@/components/workflow-details'

export default function WorkflowPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | number }
}) {
  const owner = searchParams.owner as string
  const repo = searchParams.repo as string
  const workflowId = searchParams.workflowId as number

  return (
    <AuthWrapper>
      <WorkflowDetails 
        owner={owner} 
        repo={repo} 
        workflowId={workflowId} 
      />
    </AuthWrapper>
  )
}
