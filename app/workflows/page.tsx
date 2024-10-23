import AuthWrapper from '@/components/auth-wrapper'
import GitHubActionsDashboard from '@/components/github-actions-dashboard'

export default function WorkflowsPage() {
  return (
    <AuthWrapper>
      <GitHubActionsDashboard />
    </AuthWrapper>
  )
}