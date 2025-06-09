/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

export const useGetFolders = (search = '') => {
  const { isLoading, data } = useQuery<any>({
    queryKey: ['folders', search],
    queryFn: async () =>
      get(`/api/folders?search=${search}`, {
        isClient: true,
      }),
  })

  return {
    isLoading,
    folders: data?.data || [],
  }
}
