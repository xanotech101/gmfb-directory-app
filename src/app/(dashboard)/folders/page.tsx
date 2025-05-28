'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from 'react'
import { get } from '@/lib/fetch'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { EmptyState } from '@/components/ui/empty-state'
import { Package } from 'lucide-react'
import { FoldersTable } from './_components/folders-table'
import { CreateFolder } from './_components/form/create-folder'

export default function Roles() {
  const { isFetching, data } = useQuery<any>({
    queryKey: ['folders'],
    queryFn: async () =>
      get('/api/folders', {
        isClient: true,
      }),
  })

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Folders</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all folders</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <CreateFolder />
        </div>
      </div>
      <Show as="div" className="mt-8 flow-root">
        <Show.If condition={isFetching} as={Fragment}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </Show.If>
        <Show.If
          condition={data?.data?.items?.length === 0}
          as={EmptyState}
          icon={Package}
          title="No Documents"
          description="Get started by creating a new document."
          className="w-full"
        />
        <Show.If condition={data} as={Fragment}>
          <FoldersTable data={data?.data ?? []} />
        </Show.If>
      </Show>
    </>
  )
}
