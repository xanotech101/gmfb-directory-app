'use client'
import { Fragment } from 'react'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { Package } from 'lucide-react'
import { FoldersTable } from './_components/folders-table'
import { CreateFolder } from './_components/dialog/create-folder'
import { useGetFolders } from './hooks/use-get-folders'

export default function Folders() {
  const { isFetching, folders } = useGetFolders()
  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Folders</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all folders</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <CreateFolder />
        </div>
      </div>
      <Show as="div" className="mt-8 flow-root">
        <Show.If condition={isFetching} as={Fragment}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </Show.If>
        <Show.If
          condition={folders.length === 0}
          as={EmptyState}
          icon={Package}
          title="No Folders Found"
          description="Get started by creating a new folder."
          className="w-full"
        />
        <Show.If condition={folders.length > 0} as={FoldersTable} data={folders} />
      </Show>
    </>
  )
}
