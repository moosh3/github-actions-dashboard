import useSWR from 'swr'

import { restAPI } from '@/utils'

export function useWorkflowRun(owner: string, repo: string, runId: number) {
    const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
    const { data, error, isLoading } = useSWR(`${restAPI}/api/workflows/runs/${runId}`, fetcher)
   
    return {
      workflowRun: data,
      isLoading,
      isError: error
    }
}
  