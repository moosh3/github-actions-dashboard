import useSWR from 'swr'

import { graphQLAPI } from '@/utils'

export function useWorkflow(workflowID: string, repoName: string) {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`${graphQLAPI}/api/workflows/${workflowID}`, fetcher)
   
    return {
      workflow: data,
      isLoading,
      isError: error
    }
}

