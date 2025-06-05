'use client'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { Package } from 'lucide-react'
import { FolderTable } from './_components/folder-table'
import { CreateFolder } from './_components/dialog/create-folder'
import { useGetFolders } from './hooks/use-get-folders'
import { useUser } from '@/providers/user.provider'

export default function Folders() {
  const { hasPermission } = useUser()
  const { isFetching, folders } = useGetFolders()

  const canCreateFolders = hasPermission('can_create_folder')
  const canUpdateFolders = hasPermission('can_update_folder')
  const canDeleteFolders = hasPermission('can_delete_folder')

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Folders</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all folders</p>
        </div>
        {canCreateFolders && (
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <CreateFolder />
          </div>
        )}
      </div>
      <Show as="div" className="mt-8 flow-root">
        <Show.If condition={isFetching} as={Skeleton} className="h-[200px] w-full rounded-xl" />
        <Show.If
          condition={folders.length === 0}
          as={EmptyState}
          icon={Package}
          title="No Folders Found"
          description="Get started by creating a new folder."
          className="w-full bg-white"
        />
        <Show.If
          condition={folders.length > 0}
          as={FolderTable}
          data={folders}
          canUpdateFolders={canUpdateFolders}
          canDeleteFolder={canDeleteFolders}
        />
      </Show>
    </>
  )
}
