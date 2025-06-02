/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

export const useGetFolders = () => {
  const { isFetching, data } = useQuery<any>({
    queryKey: ['folders'],
    queryFn: async () =>
      get('/api/folders', {
        isClient: true,
      }),
  })

  return {
    isFetching,
    data,
  }
}
