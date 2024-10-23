import WorkflowDetails from '@/components/workflow-details'

export default function WorkflowDetailsPage({ params }: { params: { id: string } }) {
  return <WorkflowDetails id={params.id} />
}