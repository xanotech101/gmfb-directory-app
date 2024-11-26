/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { Fragment } from 'react'
import { useQueryState } from 'nuqs'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { Package } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DocumentsTable } from './_components/documents-table'
import { useUser } from '@/providers/user.provider'

export default function Documents() {
  const {hasPermission} = useUser()
  const canViewDocuments = hasPermission('can_view_documents')
  const canCreateDocuments = hasPermission('can_create_documents')

  const [currentPage, setCurrentPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => Number(value),
  })

  const { isFetching, data } = useQuery<any>({
    queryKey: ['documents', currentPage],
    queryFn: async () =>
      get(`/api/documents?page=${currentPage}&limit=${25}`, {
        isClient: true,
      }),
    enabled: canViewDocuments,
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
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {canCreateDocuments && (
            <Link href="/documents/create">
              <Button>Create Document</Button>
            </Link>
          )}
        </div>
      </div>
      <Show as="div" className="mt-8">
        <Show.If condition={isFetching} as={Fragment}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </Show.If>
        <Show.If condition={!canViewDocuments} className="bg-white">
          <EmptyState
            icon={Package}
            title="Permission Denied"
            description="You do not have permission to view documents."
            className="w-full"
          />
        </Show.If>
        <Show.If condition={data} as={Fragment}>
          <Show as={Fragment}>
            <Show.If condition={data?.data?.items?.length === 0} className="bg-white">
              <EmptyState
                icon={Package}
                title="No Documents"
                description="Get started by creating a new document."
                className="w-full"
              />
            </Show.If>
            <Show.Else as={Fragment}>
              <DocumentsTable
                data={data?.data?.items ?? []}
                pagination={{
                  currentPage,
                  totalItems: data?.data?.meta?.total ?? 0,
                  handlePageChange: setCurrentPage,
                }}
              />
            </Show.Else>
          </Show>
        </Show.If>
      </Show>
    </>
  )
}