/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { get } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Show } from 'react-smart-conditional'
import { FileCard } from '../../documents/_components/file-card'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { useBreadcrumbs } from '@/providers/breadcrumb.provider'

export default function FolderDetails() {
  const { folderId } = useParams<{ folderId: string }>()
  useBreadcrumbs([
    { label: 'Folders', href: '/folders' },
    { label: 'Folder Details', href: '#' },
  ])

  const folder = useQuery<any>({
    queryKey: ['folders', folderId],
    queryFn: async () =>
      get(`/api/folders/${folderId}`, {
        isClient: true,
      }),
    enabled: !!folderId,
  })

  const files = useQuery<any>({
    queryKey: ['folder-files', folderId],
    queryFn: async () =>
      get(`/api/folders/${folderId}/files`, {
        isClient: true,
      }),
    enabled: !!folderId,
  })

  return (
    <>
      {folder.isFetching ? (
        <Skeleton className="h-[20px] w-40 rounded-lg" />
      ) : (
        <h1 className="text-base font-semibold leading-6 text-gray-900 capitalize">
          {folder.data?.data?.name || 'Folder Details'}
        </h1>
      )}

      <Show>
        <Show.If condition={files.isFetching} as="div" className="grid grid-cols-4 gap-4 mt-4">
          {new Array(8).fill(null).map((_, index) => (
            <Skeleton key={index} className="h-[150px] w-full rounded-lg" />
          ))}
        </Show.If>
        <Show.If
          condition={files.data?.data?.meta?.total > 0}
          as="ul"
          className="grid grid-cols-4 gap-4 mt-8"
        >
          {files?.data?.data?.items?.map((file: any) => (
            <FileCard
              key={file.id}
              file={{
                id: file.id,
                type: file.type,
                url: file.url,
              }}
              documentId={file.document_id}
            />
          ))}
        </Show.If>
        <Show.If
          condition={files?.data?.data?.meta?.total === 0}
          className="bg-white w-full"
          as={EmptyState}
          title="No Files Found"
          description="This folder is empty."
        />
        <Show.Else>
          <p className="mt-4">An error occured while fetching files.</p>
        </Show.Else>
      </Show>
    </>
  )
}
