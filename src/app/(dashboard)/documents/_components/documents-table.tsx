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
import { EllipsisVertical, SquarePenIcon } from 'lucide-react'
import { Pagination, PaginationProps, useFooterText } from '@/components/pagination/pagination'
import Link from 'next/link'
import { DocumentDetails } from './dialog/document-details'
import { UserAvatar } from '@/components/user-avatar/user-avatar'
import { DeleteDocumentDialog } from './dialog/delete-document'
import { SearchInput } from '@/components/search-input/search-input'
import { EmptyState } from '@/components/ui/empty-state'

interface DocumentsTableProps {
  data: any
  pagination: PaginationProps
  filters: {
    onSearch: (searchString: string) => void
    searchString: string
  }
  permissions: {
    canDeleteDocument?: boolean
  }
}

export const DocumentsTable = ({
  data,
  pagination,
  permissions,
  filters: { onSearch, searchString },
}: DocumentsTableProps) => {
  const { currentPage, totalItems, handlePageChange } = pagination
  const getFooterText = useFooterText(currentPage, totalItems)

  return (
    <>
      <SearchInput
        value={searchString}
        onSearch={onSearch}
        debounce
        placeholder="Search by subject or created by"
        aria-label="Search users by subject or created by"
      />

      <div className="border overflow-hidden rounded-lg">
        <Table>
          <TableCaption className="sr-only">A list of documents.</TableCaption>
          <TableHeader className="bg-neutral-100">
            <TableRow>
              <TableHead>Created By</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Departments</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Files</TableHead>
              <TableHead className="sr-only">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {data.map((doc: any, index: number) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-basline">
                    <UserAvatar
                      firstName={doc?.created_by?.first_name}
                      lastName={doc?.created_by?.last_name}
                    />
                    <div className="ml-2">
                      <div className="font-medium text-gray-900">
                        {doc?.created_by?.first_name} {doc?.created_by?.last_name}
                      </div>
                      <div className="mt-0 text-gray-500">{doc?.created_by?.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-[40%]">{doc?.subject}</TableCell>
                <TableCell>
                  {doc.metadata.send_to_all_departments ? 'All' : doc.departments?.length}
                </TableCell>
                <TableCell>{doc.metadata.send_to_all_users ? 'All' : doc.users?.length}</TableCell>
                <TableCell>{doc.files.length}</TableCell>
                <TableCell>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-8 flex items-center justify-center">
                        <EllipsisVertical size={16} className="flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto max-w-56">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                        <DocumentDetails
                          id={doc.id}
                          canDeleteDocument={permissions.canDeleteDocument}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href={`/documents/${doc.id}/edit`}
                          className="w-full text-sm text-left flex items-center gap-1"
                        >
                          <SquarePenIcon className="size-4" />
                          Edit Document
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                        <DeleteDocumentDialog docId={doc.id} />
                      </DropdownMenuItem>
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
          title="No Documents"
          description="Looks like you don't have any documents yet. Create some documents to get started."
          className="w-full bg-white mt-2"
        />
      )}
      <div className="flex items-center justify-between px-3 py-5 rounded-b-lg mt-4">
        <div className="text-[14px] text-gray-500 flex-1">{getFooterText}</div>
        <div className="text-center flex-1 flex justify-center">
          <Pagination
            totalItems={totalItems}
            currentPage={currentPage!}
            handlePageChange={handlePageChange}
          />
        </div>
        <span className="flex-1" />
      </div>
    </>
  )
}
