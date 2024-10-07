'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface WorkflowRun {
  id: number;
  name: string;
  status: string;
  conclusion: string;
  created_at: string;
  updated_at: string;
  html_url: string;
}

const TelemetryDashboard: React.FC = () => {
  const [workflowRuns, setWorkflowRuns] = useState<WorkflowRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [repos, setRepos] = useState<{ id: number; name: string }[]>([]);
  const [totalRuns, setTotalRuns] = useState(0);
  const [failedRuns, setFailedRuns] = useState(0);
  const [succeededRuns, setSucceededRuns] = useState(0);

  const fetchRepositories = async () => {
    try {
      const token = process.env.GITHUB_TOKEN;
      const response = await fetch('https://api.github.com/user/repos', {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }
      const data = await response.json();
      const formattedRepos = data.map((repo: any) => ({
        id: repo.id,
        name: repo.full_name
      }));
      setRepos(formattedRepos);
    } catch (err) {
      setError('Error fetching repositories');
    }
  };

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        const fetchedRepos = await fetchRepositories();
        if (Array.isArray(fetchedRepos)) {
          setRepos(fetchedRepos);
        } else {
          console.error('Fetched repositories are not in the expected format');
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    loadRepositories();
  }, []);

  const DEFAULT_REPO = 'moosh3/narrataive';

  const fetchWorkflowRuns = async () => {
    const repoToFetch = selectedRepo || DEFAULT_REPO;

    try {
    const token = process.env.GITHUB_TOKEN;
      const response = await fetch(`https://api.github.com/repos/${repoToFetch}/actions/runs`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch workflow runs');
      }
      const data = await response.json();
      const formattedRuns = data.workflow_runs.map((run: any) => ({
        id: run.id,
        name: run.name,
        status: run.status,
        conclusion: run.conclusion,
        created_at: run.created_at,
        updated_at: run.updated_at,
        html_url: run.html_url,
        repository: run.repository.full_name
      }));
      setWorkflowRuns(formattedRuns);
      setIsLoading(false);
    } catch (err) {
      setError('Error fetching workflow runs');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const total = workflowRuns.length;
    const failed = workflowRuns.filter(run => run.conclusion === 'failure').length;
    const succeeded = workflowRuns.filter(run => run.conclusion === 'success').length;
    
    setTotalRuns(total);
    setFailedRuns(failed);
    setSucceededRuns(succeeded);
  }, [workflowRuns]);

  const getStatusColor = (status: WorkflowRun['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failure':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-yellow-100 text-yellow-800';
      case 'queued':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Recent Workflow Runs</h1>
      <div className="mb-4 w-1/4">
        <select
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) => setSelectedRepo(e.target.value)}
          value={selectedRepo!}
        >
          <option value="">Select a repository</option>
          {repos.map((repo) => (
            <option key={repo.id} value={repo.name}>
              {repo.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Workflows</h3>
          <p className="text-3xl font-bold text-gray-900">{totalRuns}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Failed Workflows</h3>
          <p className="text-3xl font-bold text-red-600">{failedRuns}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Succeeded Workflows</h3>
          <p className="text-3xl font-bold text-green-600">{succeededRuns}</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Conclusion</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Updated At</th>
              <th className="px-4 py-2 text-left">Repository</th>
            </tr>
          </thead>
          <tbody>
            {workflowRuns.map((run) => (
              <tr key={run.id} className="border-t border-gray-300">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link 
                    href={{
                      pathname: '/workflow',
                      query: { runId: run.id, repo: selectedRepo },
                    }}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {run.id}
                  </Link>
                </td>
                <td className="px-4 py-2">{run.name}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(run.status)}`}>
                    {run.status}
                  </span>
                </td>
                <td className="px-4 py-2">{run.conclusion || 'N/A'}</td>
                <td className="px-4 py-2">{new Date(run.created_at).toLocaleString()}</td>
                <td className="px-4 py-2">{new Date(run.updated_at).toLocaleString()}</td>
                <td className="px-4 py-2">narrataive</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TelemetryDashboard;