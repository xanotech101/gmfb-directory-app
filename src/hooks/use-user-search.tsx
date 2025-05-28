/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'

export function useSearchUsers() {
  const [searchString, setSearchString] = useState('')
  const [debouncedSearchString] = useDebounce(searchString, 500)

  const users = useQuery<any>({
    queryKey: ['users', debouncedSearchString],
    queryFn: async () =>
      get(`/api/users?search=${debouncedSearchString}`, {
        isClient: true,
      }),
  })

  return {
    userSearchString: searchString,
    setUserSearchString: setSearchString,
    users,
  }
}
