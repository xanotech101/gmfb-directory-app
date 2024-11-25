'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from 'react'
import { get } from '@/lib/fetch'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import { RoleTable } from './_components/role-table'
import { useQuery } from '@tanstack/react-query'
import { CreateRoleModal } from '@/app/(root)/roles/_components/create-edit-role/create-role-modal'

export default function Roles() {
  const { isFetching, data, refetch } = useQuery<any>({
    queryKey: ['roles'],
    queryFn: async () =>
      get("/api/roles", {
        isClient: true,
      }),
  })

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Roles</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the roles
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <CreateRoleModal
            onSuccess={() => refetch()}
          />
        </div>
      </div>
      <Show as="div" className="mt-8 flow-root">
        <Show.If condition={isFetching} as={Fragment}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </Show.If>
        <Show.If condition={data}>
          <RoleTable data={data?.data ?? []} />
        </Show.If>
      </Show>
    </>
  )
}
