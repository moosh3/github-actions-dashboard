'use client'

import { useRouter } from 'next/compat/router'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';

const WorkflowDetailPage = () => {
  const searchParams = useSearchParams();
  const runId = searchParams.get('runId');
  const repo = searchParams.get('repo');
  const [workflowDetails, setWorkflowDetails] = useState(null);

  useEffect(() => {
    if (!runId || !repo) {
      return;
    }
    fetchWorkflowDetails();
  }, [runId, repo]);

  const fetchWorkflowDetails = async () => {
    try {
      const token = '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'; //process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      const response = await fetch(`https://api.github.com/repos/${repo}/actions/runs/${runId}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const data = await response.json();
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
            Repository: {repo}
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
                {workflowDetails.conclusion}
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