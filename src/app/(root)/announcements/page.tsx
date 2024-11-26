/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { Fragment } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import { useQueryState } from 'nuqs'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { Package } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AnnouncementsTable } from './_components/announcement-table'
import { useUser } from '@/providers/user.provider'


export default function Announcements() {
  const {hasPermission} = useUser()
  const canCreateAnnouncements = hasPermission('can_create_announcements')
  const canViewAnnouncements = hasPermission('can_view_announcements')
  const router = useRouter()
  const [currentPage, setCurrentPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => Number(value),
  })
  const { isFetching, data } = useQuery<any>({
    queryKey: ['announcements', currentPage],
    queryFn: async () =>
      get(`/api/announcements?page=${currentPage}&limit=${25}`, {
        isClient: true,
      }),
  })

  return (
    <>
      <div className="sm:px-6 lg:px-0">
        <div className="sm:flex sm:items-center">
          <div className="flex items-center justify-between sm:flex-auto ">
            <div className="flex flex-col">
              <h1 className="text-left font-semibold leading-6 text-gray-900">Announcements</h1>
              <p className="mt-2 text-center text-sm text-gray-700">
                A list of all the announcements available to you.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              {canCreateAnnouncements && (
                <Link href="/announcements/create">
                  <Button>Create Announcement</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <Show as="div" className="mt-8">
        <Show.If condition={isFetching} as={Fragment}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </Show.If>
        <Show.If condition={!canViewAnnouncements} className="bg-white">
          <EmptyState
            icon={Package}
            title="Permission Denied"
            description="You do not have permission to view departments."
            className="w-full"
          />
        </Show.If>
        <Show.If condition={data} as={Fragment}>
          <Show as={Fragment}>
            <Show.If condition={data?.data?.items?.length > 0} as={Fragment}>
              <AnnouncementsTable
                data={data?.data?.items ?? []}
                pagination={{
                  currentPage,
                  totalItems: data?.data?.meta?.total ?? 0,
                  handlePageChange: setCurrentPage,
                }}
              />
            </Show.If>
            <Show.Else className="bg-white">
              <EmptyState
                icon={Package}
                title="No Announcements"
                description="Get started by creating a new announcement."
                actionLabel="Add Announcement"
                onAction={() => router.push('/announcements/create')}
                className="w-full"
              />
            </Show.Else>
          </Show>
        </Show.If>
      </Show>
    </>
  )
}
