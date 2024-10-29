import useSWR from 'swr'

import { graphQLAPI, restAPI } from '@/utils'

export function useWorkflow(workflowID: string, repoName: string) {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`${graphQLAPI}/api/workflows/${workflowID}`, fetcher)
   
    return {
      workflow: data,
      isLoading,
      isError: error
    }
}

export function useWorkflowRun(runId: string, repoId: string) {
    const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
    const { data, error, isLoading } = useSWR(`${restAPI}/api/workflows/runs/${runId}`, fetcher)
   
    return {
      workflowRun: data,
      isLoading,
      isError: error
    }
}
  