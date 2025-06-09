/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

export function useGetAnnouncement(announcementId: string) {
  const { data, isFetching, refetch, isError, isLoading } = useQuery<any>({
    queryKey: ['announcement-details', announcementId],
    queryFn: async () =>
      get(`/api/announcements/${announcementId}`, {
        isClient: true,
      }),
    enabled: !!announcementId,
  })

  return {
    isFetching,
    data: data?.data ?? {},
    refetch,
    isError,
    isLoading,
  }
}
