/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'

export function useDepartmentSearch() {
  const [searchString, setSearchString] = useState('')
  const [debouncedSearchString] = useDebounce(searchString, 500)

  const departments = useQuery<any>({
    queryKey: ['search-departments', debouncedSearchString],
    queryFn: async () =>
      get(`/api/departments?search=${debouncedSearchString}`, {
        isClient: true,
      }),
  })

  return {
    deptSearchString: searchString,
    setDeptSearchString: setSearchString,
    departments,
  }
}
