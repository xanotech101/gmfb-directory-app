/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EllipsisVertical, ReceiptTextIcon } from 'lucide-react'
import { EditFolder } from './dialog/edit-folder'
import Link from 'next/link'
import { DeleteFolder } from './dialog/delete-folder'
import { UserAvatar } from '@/components/user-avatar/user-avatar'
import { EmptyState } from '@/components/ui/empty-state'
import { SearchInput } from '@/components/search-input/search-input'

interface FolderTableProps {
  data: any[]
  filters: {
    onSearch: (searchString: string) => void
    searchString: string
  }
  permissions: {
    canDelete: boolean
    canEdit: boolean
  }
}

export const FolderTable = ({
  data,
  filters: { onSearch, searchString },
  permissions: { canDelete, canEdit },
}: FolderTableProps) => {
  return (
    <>
      <SearchInput
        value={searchString}
        onSearch={onSearch}
        debounce
        placeholder="Search by name"
        aria-label="Search users by name"
      />
      <div className="border overflow-hidden rounded-lg">
        <Table className="rounded-lg overflow-hidden shadow-sm">
          <TableCaption className="sr-only">A list of your folders.</TableCaption>
          <TableHeader className="bg-neutral-100">
            <TableRow>
              <TableHead>Created By</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Files</TableHead>
              <TableHead className="sr-only">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {data?.map((folder: any, index: number) => (
              <TableRow key={folder.id}>
                <TableCell>
                  <div className="flex items-basline">
                    <UserAvatar
                      firstName={folder?.created_by?.first_name}
                      lastName={folder?.created_by?.last_name}
                    />
                    <div className="ml-2">
                      <div className="font-medium text-gray-900">
                        {folder?.created_by?.first_name} {folder?.created_by?.last_name}
                      </div>
                      <div className="mt-0 text-gray-500">{folder?.created_by?.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{folder.name}</TableCell>
                <TableCell>{folder?.files_count ?? 0}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-8 flex items-center justify-center">
                        <EllipsisVertical size={16} className="flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto max-w-56">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                        <Link
                          href={`/folders/${folder.id}`}
                          className="w-full text-sm text-left flex items-center gap-1"
                        >
                          <ReceiptTextIcon className="size-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      {canEdit && (
                        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                          <EditFolder defaultValues={folder} folderId={folder.id} />
                        </DropdownMenuItem>
                      )}
                      {canDelete && (
                        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                          <DeleteFolder folderId={folder.id} />
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {data.length === 0 && (
        <EmptyState
          title="No Folders Found"
          description="Get started by creating a new folder."
          className="w-full bg-white mt-2"
        />
      )}
    </>
  )
}
