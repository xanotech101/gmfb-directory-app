'use client'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import { FolderTable } from './_components/folder-table'
import { CreateFolder } from './_components/dialog/create-folder'
import { useGetFolders } from './hooks/use-get-folders'
import { useUser } from '@/providers/user.provider'
import { useQueryState } from 'nuqs'
import { useBreadcrumbs } from '@/providers/breadcrumb.provider'

export default function Folders() {
  const { hasPermission } = useUser()
  useBreadcrumbs([{ label: 'Folders', href: '#' }])

  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    history: 'push',
  })

  const { isLoading, folders } = useGetFolders(search)

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
        <Show.If condition={isLoading} as={Skeleton} className="h-[200px] w-full rounded-xl" />
        <Show.If
          condition={folders}
          as={FolderTable}
          data={folders}
          permissions={{
            canDelete: canDeleteFolders,
            canEdit: canUpdateFolders,
          }}
          filters={{
            onSearch: (searchString: string) => setSearch(searchString),
            searchString: search,
          }}
        />
      </Show>
    </>
  )
}
