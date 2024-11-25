/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { Fragment } from 'react'
import { CreateDepartment } from './_components/create-department'
import { useQueryState } from 'nuqs'
import { get } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import { DepartmentTable } from './_components/department-table'
import { EmptyState } from '@/components/ui/empty-state'
import { Package } from 'lucide-react'

export default function Departments() {
  const [currentPage, setCurrentPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => Number(value),
  })

  const { isFetching, data, refetch } = useQuery<any>({
    queryKey: ['departments', currentPage],
    queryFn: async () =>
      get(`/api/departments?page=${currentPage}&limit=${25}`, {
        isClient: true,
      }),
  })

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Departments</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all the departments</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <CreateDepartment onSuccess={refetch} />
        </div>
      </div>
      <Show as="div" className="mt-8 flow-root">
        <Show.If condition={isFetching} as={Fragment}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </Show.If>
        <Show.If condition={data} as={Fragment}>
          <Show as={Fragment}>
            <Show.If condition={data?.data?.items?.length > 0} as={Fragment}>
              <DepartmentTable
                data={data?.data?.items ?? []}
                pagination={{
                  currentPage,
                  totalItems: data?.data?.meta?.total ?? 0,
                  itemsPerPage: 25,
                  handlePageChange: (page) => setCurrentPage(page),
                }}
              />
            </Show.If>
            <Show.Else as={Fragment}>
              <EmptyState
                icon={Package}
                title="No Documents"
                description="Get started by creating a new document."
                className="w-full"
              />
            </Show.Else>
          </Show>
        </Show.If>
      </Show>
    </>
  )
}
