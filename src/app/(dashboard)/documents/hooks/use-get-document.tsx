/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

export function useGetDocument(documentId: string) {
  const { data, isFetching, refetch, isError, isLoading } = useQuery<any>({
    queryKey: ['document-details', documentId],
    queryFn: async () =>
      get(`/api/documents/${documentId}`, {
        isClient: true,
      }),
    enabled: !!documentId,
  })

  return {
    isFetching,
    data: data?.data ?? {},
    refetch,
    isError,
    isLoading,
  }
}
