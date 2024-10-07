import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Define an interface for the workflow details
interface WorkflowDetails {
  id: number;
  name: string;
  status: string;
  conclusion: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  head_branch: string;
  head_sha: string;
  // Add any other properties you expect from the API
}

const WorkflowDetailPage = () => {
  const router = useRouter();
  const { runId, repo } = router.query;
  const [workflowDetails, setWorkflowDetails] = useState<WorkflowDetails | null>(null);

  useEffect(() => {
    if (runId && repo) {
      fetchWorkflowDetails();
    }
  }, [runId, repo]);

  const fetchWorkflowDetails = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      const response = await fetch(`https://api.github.com/repos/${repo}/actions/runs/${runId}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const data: WorkflowDetails = await response.json();
      setWorkflowDetails(data);
    } catch (error) {
      console.error('Error fetching workflow details:', error);
    }
  };

  if (!workflowDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Workflow Detail</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Run ID: {workflowDetails.id}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Repository: {repo as string}
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {workflowDetails.status}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Conclusion</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {workflowDetails.conclusion || 'N/A'}
              </dd>
            </div>
            {/* Add more details as needed */}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDetailPage;