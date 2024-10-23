import AuthWrapper from '@/components/auth-wrapper'
import WorkflowDetails from '@/components/workflow-details'

export default function WorkflowDetailsPage({ params }: { params: { id: string } }) {
  return (
    <AuthWrapper>
      <WorkflowDetails id={params.id} />
    </AuthWrapper>
  )
}