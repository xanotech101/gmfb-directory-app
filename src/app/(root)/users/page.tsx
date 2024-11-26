/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { InviteUser } from './_components/invite-user'
import { UserTable } from './_components/user-table'
import { get, patch } from '@/lib/fetch'
import { useQueryState } from 'nuqs'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import React, { Fragment } from 'react'
import { EmptyState } from '@/components/ui/empty-state'
import { Package } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useUser } from '@/providers/user.provider'

export default function Users() {
  const {hasPermission} = useUser()
  const canViewUsers = hasPermission('can_view_users')
  const canInviteUser = hasPermission('can_invite_user')
  const [currentPage, setCurrentPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => Number(value),
  })

  const { isFetching, data, refetch } = useQuery<any>({
    queryKey: ['users', currentPage],
    queryFn: async () =>
      get(`/api/users?page=${currentPage}&limit=${25}`, {
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
        variant: "destructive",
        description: error?.message ?? 'An error occurred',
      })
    }
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
            <InviteUser onCompleted={() => {
              if (currentPage === 1) {
                return refetch()
              } else {
                return setCurrentPage(1)
              }
            }}
            />
          )}
        </div>
      </div>
      <Show as="div" className="mt-8">
        <Show.If condition={isFetching} as={Fragment}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </Show.If>
        <Show.If condition={!canViewUsers} className="bg-white">
          <EmptyState
            icon={Package}
            title="Permission Denied"
            description="You do not have permission to view users."
            className="w-full"
          />
        </Show.If>
        <Show.If condition={data} as={Fragment}>
          <Show as={Fragment}>
            <Show.If condition={data?.data?.items?.length === 0} as={Fragment}>
              <EmptyState
                icon={Package}
                title="No Users"
                description="Get started by creating a new document."
                className="w-full"
              />
            </Show.If>
            <Show.Else as={Fragment}>
              <UserTable
                data={data?.data?.items ?? []}
                pagination={{
                  currentPage,
                  totalItems: data?.data?.meta?.total ?? 0,
                  handlePageChange: setCurrentPage,
                }}
                resetPassword={resetPassword}
                manageDepartments={manageDepartments}
              />
            </Show.Else>
          </Show>
        </Show.If>
      </Show>
    </>
  )
}
