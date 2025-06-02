/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import { useUser } from '@/providers/user.provider'

export function useSearchUsers() {
  const { user } = useUser()
  const [searchString, setSearchString] = useState('')
  const [debouncedSearchString] = useDebounce(searchString, 500)

  const { data } = useQuery<any>({
    queryKey: ['users', debouncedSearchString],
    queryFn: async () =>
      get(`/api/users?search=${debouncedSearchString}`, {
        isClient: true,
      }),
  })

  return {
    userSearchString: searchString,
    setUserSearchString: setSearchString,
    users: useMemo(
      () =>
        (data?.data?.items ?? [])
          .filter((u: any) => u.id !== user?.id)
          .map((u: any) => ({
            ...u,
            label: `${u.first_name} ${u.last_name}`,
            value: u.id,
          })),
      [data, user?.id],
    ),
  }
}
