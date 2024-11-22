/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import Link from 'next/link'
import { AnnouncementCard } from './_components/announcement-card'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import { useQueryState } from 'nuqs'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { Package } from 'lucide-react'
import { useRouter } from 'next/navigation'


export default function Announcements() {
  const router = useRouter()
  const [currentPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => Number(value),
  })
  const { isFetching, data } = useQuery<any>({
    queryKey: ['announcements', currentPage],
    queryFn: async () =>
      get(`/api/announcements?page=${currentPage}&limit=${50}`, {
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
              <Link href="/announcements/create">
                <Button>Create Announcement</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Show as="div" className="mt-8">
        <Show.If condition={isFetching}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </Show.If>
        <Show.If condition={!!data}>
          <Show.If condition={data?.data?.items?.length === 0} className="bg-white">
            <EmptyState
              icon={Package}
              title="No Announcements"
              description="Get started by creating a new announcement."
              actionLabel="Add Announcement"
              onAction={() => router.push('/announcements/create')}
              className="w-full"
            />
          </Show.If>
          <Show.Else className="mt-8 grid grid-cols-3 gap-4">
            {(data?.data?.items ?? []).map((item: any, index: number) => (
              <AnnouncementCard key={index} announcement={item}  />
            ))}
          </Show.Else>
        </Show.If>
      </Show>
    </>
  )
}
