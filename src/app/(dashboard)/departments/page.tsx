/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { useQueryState } from 'nuqs'
import { get } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import { DepartmentTable } from './_components/department-table'
import { EmptyState } from '@/components/ui/empty-state'
import { Package } from 'lucide-react'
import { useUser } from '@/providers/user.provider'
import { CreateDepartment } from './_components/dialogs/create-department'

export default function Departments() {
  const { hasPermission } = useUser()
  const canViewDepartments = hasPermission('can_view_departments')
  const canCreateDepartments = hasPermission('can_create_department')

  const [currentPage, setCurrentPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => Number(value),
  })

  const { isFetching, data } = useQuery<any>({
    queryKey: ['departments', currentPage],
    queryFn: async () =>
      get(`/api/departments?page=${currentPage}`, {
        isClient: true,
      }),
    enabled: canViewDepartments,
  })

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Departments</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all the departments</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {canCreateDepartments && <CreateDepartment />}
        </div>
      </div>
      <Show as="div" className="mt-8 flow-root">
        <Show.If condition={isFetching} as={Skeleton} className="h-[200px] w-full rounded-xl" />
        <Show.If
          condition={!canViewDepartments}
          className="bg-white w-full"
          as={EmptyState}
          icon={Package}
          title="Permission Denied"
          description="You do not have permission to view departments."
        />
        <Show.If
          condition={data?.data?.items?.length > 0}
          as={DepartmentTable}
          data={data?.data?.items ?? []}
          pagination={{
            currentPage,
            totalItems: data?.data?.meta?.total ?? 0,
            handlePageChange: (page) => setCurrentPage(page),
          }}
        />
        <Show.Else
          className="bg-white w-full"
          as={EmptyState}
          icon={Package}
          title="No Departments"
          description="Get started by creating a new department."
        />
      </Show>
    </>
  )
}
