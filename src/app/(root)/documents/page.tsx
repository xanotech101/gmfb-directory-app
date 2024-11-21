/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { Fragment } from 'react'
import { useQueryState } from 'nuqs'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import DocumentCard from './_components/document-card'
import { EmptyState } from '@/components/ui/empty-state'
import { Package } from 'lucide-react'

export default function Documents() {
  const [currentPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => Number(value),
  })
  const { isFetching, data } = useQuery<any>({
    queryKey: ['documents', currentPage],
    queryFn: async () =>
      get(`/api/documents?page=${currentPage}&limit=${50}`, {
        isClient: true,
      }),
  })

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Documents</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all documents created and shared within the organization.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
      </div>

      <Show as="div" className="mt-8">
        <Show.If condition={isFetching} as={Fragment}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </Show.If>
        <Show.If condition={!!data} className="mt-8 grid grid-cols-3 gap-4">
          <Show className="col-span-3 bg-white">
            <Show.If condition={data?.data?.items?.length === 0} as={Fragment}>
              <EmptyState
                icon={Package}
                title="No Documents"
                description="Get started by creating a new document."
                className="w-full"
              />
            </Show.If>
            <Show.Else as={Fragment}>
              {(data?.data?.items ?? []).map((item: any, index: number) => (
                <DocumentCard key={index} doc={item} />
              ))}
            </Show.Else>
          </Show>
        </Show.If>
      </Show>
    </>
  )
}