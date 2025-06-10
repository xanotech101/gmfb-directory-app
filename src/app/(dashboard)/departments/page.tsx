/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { parseAsFloat, parseAsString, useQueryStates } from 'nuqs'
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

  const canEditDepartments = hasPermission('can_update_department')
  const canViewDepartments = hasPermission('can_view_departments')
  const canCreateDepartments = hasPermission('can_create_department')
  const canDeleteDepartment = hasPermission('can_delete_department')
  const canViewDepartment = hasPermission('can_view_department')

  const [filters, setFilters] = useQueryStates(
    {
      page: parseAsFloat.withDefault(1),
      search: parseAsString.withDefault(''),
    },
    {
      history: 'push',
    },
  )

  const { isLoading, data } = useQuery<any>({
    queryKey: ['departments', filters.page, filters.search],
    queryFn: async () =>
      get(`/api/departments?page=${filters.page}&search=${filters.search}`, {
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
        <Show.If condition={isLoading} as={Skeleton} className="h-[200px] w-full rounded-xl" />
        <Show.If
          condition={!canViewDepartments}
          className="bg-white w-full"
          as={EmptyState}
          icon={Package}
          title="Permission Denied"
          description="You do not have permission to view departments."
        />
        <Show.If
          condition={data}
          as={DepartmentTable}
          data={data?.data?.items ?? []}
          pagination={{
            currentPage: filters.page,
            totalItems: data?.data?.meta?.total ?? 0,
            handlePageChange: (page) => setFilters((prev) => ({ ...prev, page })),
          }}
          filters={{
            onSearch: (searchString: string) => {
              setFilters((prev) => ({ ...prev, search: searchString, page: 1 }))
            },
            searchString: filters.search,
          }}
          permissions={{
            canEdit: canEditDepartments,
            canDelete: canDeleteDepartment,
            canView: canViewDepartment,
          }}
        />
      </Show>
    </>
  )
}
