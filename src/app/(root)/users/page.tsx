/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useQuery } from '@tanstack/react-query'
import { InviteUser } from './_components/invite-user'
import { UserTable } from './_components/user-table'
import { get } from '@/lib/fetch'
import { useQueryState } from 'nuqs'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'

export default function Users() {
  const [currentPage, setCurrentPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => Number(value),
  })

  const { isFetching, data } = useQuery<any>({
    queryKey: ['users', currentPage],
    queryFn: async () =>
      get(`/api/users?page=${currentPage}&limit=${50}`, {
        isClient: true,
      }),
  })

  console.log(data?.data?.meta)

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <InviteUser />
        </div>
      </div>
      <Show as="div" className="mt-8 flow-root">
        <Show.If condition={isFetching}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </Show.If>
        <Show.If condition={data}>
          <UserTable
            data={data?.data?.items ?? []}
            pagination={{
              currentPage,
              totalItems: data?.data?.meta?.total ?? 0,
              handlePageChange: (page) => setCurrentPage(page),
            }}
          />
        </Show.If>
      </Show>
    </div>
  )
}
