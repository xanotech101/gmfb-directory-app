/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { EllipsisVertical, SquarePenIcon, Trash2Icon } from 'lucide-react'
import { Pagination, PaginationProps, useFooterText } from '@/components/pagination/pagination'
import { getRandomColor } from '@/lib/random-color'
import * as React from 'react'
import Link from 'next/link'
import { DocumentDetails } from './document-details'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { del } from '@/lib/fetch'
import { toast } from '@/hooks/use-toast'
import { ConfirmAction } from '@/components/confirm-action/confirm-action'

interface DocumentsTableProps {
  data: any
  pagination: PaginationProps
}

export const DocumentsTable = ({ data, pagination }: DocumentsTableProps) => {
  const queryClient = useQueryClient()
  const { currentPage, totalItems, handlePageChange } = pagination
  const getFooterText = useFooterText(currentPage, totalItems)

  const preventBubble = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const deleteDocument = useMutation({
    mutationKey: ['delete-document'],
    mutationFn: async (documentId: string) =>
      del(`/api/documents/${documentId}`, { isClient: true }),
    onSuccess: () => {
      toast({
        title: 'Document deleted successfully',
        description: 'The document has been deleted successfully.',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },

    onError: (error) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error.message ?? 'An error occurred',
      })
    },
  })

  return (
    <>
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
                    <Avatar
                      className="size-8 flex-shrink-0 border-2 text-sm"
                      style={{
                        border: doc?.created_by?.avatar
                          ? 'none'
                          : `2px solid ${getRandomColor(index).border}`,
                      }}
                    >
                      <AvatarImage
                        src={doc?.created_by?.avatar}
                        alt={`${doc.created_by.first_name} ${doc.created_by.last_name}`}
                      />
                      <AvatarFallback
                        className="h-full w-full flex justify-center items-center"
                        style={{
                          backgroundColor: getRandomColor(index).background,
                          color: getRandomColor(index).text,
                        }}
                      >
                        {doc.created_by?.first_name[0]}
                        {doc.created_by?.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
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
                      <DropdownMenuItem onClick={preventBubble}>
                        <DocumentDetails id={doc.id} />
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
                      <DropdownMenuItem onClick={preventBubble}>
                        <ConfirmAction
                          trigger={
                            <button className="w-full text-sm text-left flex items-center gap-1">
                              <Trash2Icon className="size-4" />
                              Delete Document
                            </button>
                          }
                          title="Delete Document"
                          description={`Are you sure you want to delete the document? This action cannot be undone.`}
                          actionProps={{
                            action: () => deleteDocument.mutateAsync(doc.id),
                            isLoading: deleteDocument.isPending,
                            buttonProps: {
                              variant: 'destructive',
                              children: 'Delete',
                            },
                          }}
                        />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
