/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import { parseAsFloat, parseAsString, useQueryStates } from 'nuqs'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { Plus } from 'lucide-react'
import { AnnouncementsTable } from './_components/announcement-table'
import { useUser } from '@/providers/user.provider'
import { useBreadcrumbs } from '@/providers/breadcrumb.provider'

export default function Announcements() {
  const { hasPermission } = useUser()
  useBreadcrumbs([{ label: 'Announcements', href: '#' }])

  const canViewAnnouncement = hasPermission('can_view_announcement')
  const canCreateAnnouncements = hasPermission('can_create_announcement')
  const canViewAnnouncements = hasPermission('can_view_announcements')
  const canEditAnnouncement = hasPermission('can_update_announcement')
  const canDeleteAnnouncement = hasPermission('can_delete_announcement')

  const [filters, setFilters] = useQueryStates(
    {
      page: parseAsFloat.withDefault(1),
      search: parseAsString.withDefault(''),
    },
    {
      history: 'push',
    },
  )
  const { isFetching, data } = useQuery<any>({
    queryKey: ['announcements', filters.page, filters.search],
    queryFn: async () =>
      get(`/api/announcements?page=${filters.page}&search=${filters.search}`, {
        isClient: true,
      }),
    enabled: canViewAnnouncements,
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
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Announcement
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <Show as="div" className="mt-8">
        <Show.If condition={isFetching} as={Skeleton} className="h-[200px] w-full rounded-xl" />
        <Show.If
          condition={!canViewAnnouncements}
          className="bg-white w-full"
          as={EmptyState}
          title="Permission Denied"
          description="You do not have permission to view announcements."
        />
        <Show.If
          condition={data}
          as={AnnouncementsTable}
          data={data?.data?.items ?? []}
          pagination={{
            currentPage: filters.page,
            totalItems: data?.data?.meta?.total ?? 0,
            handlePageChange: (page: number) => {
              setFilters((prev) => ({ ...prev, page }))
            },
          }}
          filters={{
            onSearch: (searchString: string) => {
              setFilters((prev) => ({ ...prev, search: searchString, page: 1 }))
            },
            searchString: filters.search,
          }}
          permissions={{
            canEdit: canEditAnnouncement,
            canView: canViewAnnouncement,
            canDelete: canDeleteAnnouncement,
          }}
        />
      </Show>
    </>
  )
}
