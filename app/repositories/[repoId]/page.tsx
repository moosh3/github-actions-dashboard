import WorkflowList from '@/components/workflow-list'

export default function DashboardPage({ params }: { params: { repoId: string } }) {
  return (
    <main>
      <WorkflowList repoId={params.repoId} />
    </main>
  )
}