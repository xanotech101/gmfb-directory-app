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
import { DepartmentTable } from '@/app/(root)/departments/_components/department-table'
export default function Announcements() {
  const [currentPage, setCurrentPage] = useQueryState('page', {
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

  console.log(data)
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
                <Button className="bg-[#891C69] hover:bg-[#974D7B]">Create Announcement</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Show as="div" className="mt-8">
        <Show.If condition={isFetching}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </Show.If>
        <Show.If condition={!!data} className="mt-8 grid grid-cols-3 gap-4">
          {(data?.data?.items ?? []).map((item: any, index: number) => (
            <AnnouncementCard key={index} announcement={item}  />
          ))}
        </Show.If>
      </Show>
    </>
  )
}
