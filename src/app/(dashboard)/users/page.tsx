/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { InviteUser } from './_components/invite-user'
import { UserTable } from './_components/user-table'
import { del, get, patch } from '@/lib/fetch'
import { parseAsFloat, parseAsString, useQueryStates } from 'nuqs'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import React, { Fragment } from 'react'
import { EmptyState } from '@/components/ui/empty-state'
import { Package } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useUser } from '@/providers/user.provider'

export default function Users() {
  const { hasPermission } = useUser()

  const canViewUsers = hasPermission('can_view_users')
  const canInviteUser = hasPermission('can_invite_user')
  const [filters, setFilters] = useQueryStates(
    {
      page: parseAsFloat.withDefault(1),
      search: parseAsString.withDefault(''),
    },
    {
      history: 'push',
    },
  )

  const { isFetching, data, refetch } = useQuery<any>({
    queryKey: ['users', filters.page, filters.search],
    queryFn: async () =>
      get(`/api/users?page=${filters.page}&search=${filters.search}`, {
        isClient: true,
      }),
    enabled: canViewUsers,
  })

  const resetPassword = useMutation({
    mutationKey: ['reset-password'],
    mutationFn: async (userId: string) =>
      patch(`/api/users/${userId}/reset-password`, {
        isClient: true,
      }),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Password reset link sent to user',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error.message ?? 'An error occurred',
      })
    },
  })

  const manageDepartments = useMutation({
    mutationKey: ['manage-departments'],
    mutationFn: async (payload: any) =>
      patch(`/api/users/${payload.userId}/departments`, {
        isClient: true,
        body: {
          departments: payload.departments.map((d: any) => d.value),
        },
      }),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Updated departments successfully',
      })
      refetch()
    },
    onError: (error) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error?.message ?? 'An error occurred',
      })
    },
  })

  const deleteUser = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async (userId: string) =>
      del(`/api/users/${userId}`, {
        isClient: true,
      }),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      })
      refetch()
    },
    onError: (error) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error?.message ?? 'An error occurred',
      })
    },
  })

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {canInviteUser && (
            <InviteUser
              onCompleted={() => {
                if (filters.page === 1) {
                  return refetch()
                } else {
                  return setFilters((prev) => ({ ...prev, page: 1 }))
                }
              }}
            />
          )}
        </div>
      </div>
      <Show as="div" className="mt-8">
        <Show.If condition={isFetching} as={Skeleton} className="h-[200px] w-full rounded-xl" />
        <Show.If
          condition={!canViewUsers}
          as={EmptyState}
          className="bg-white w-full"
          icon={Package}
          title="Permission Denied"
          description="You do not have permission to view users."
        />
        <Show.If
          condition={data}
          as={UserTable}
          data={data?.data?.items ?? []}
          pagination={{
            currentPage: filters.page,
            totalItems: data?.data?.meta?.total ?? 0,
            handlePageChange: (page: number) => {
              setFilters((prev) => ({ ...prev, page }))
            },
          }}
          resetPassword={resetPassword}
          manageDepartments={manageDepartments}
          deleteUser={deleteUser}
          filters={{
            onSearch: (searchString: string) => {
              setFilters((prev) => ({ ...prev, search: searchString, page: 1 }))
            },
            searchString: filters.search,
          }}
        />
        {/* todo: maybe render error state here */}
      </Show>
    </>
  )
}
