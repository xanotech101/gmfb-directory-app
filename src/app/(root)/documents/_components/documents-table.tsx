/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { EllipsisVertical } from 'lucide-react'
import { Pagination, PaginationProps, useFooterText } from '@/components/pagination/pagination'
import { getRandomColor } from '@/lib/random-color'
import * as React from 'react'
import { DocumentDetails } from '@/app/(root)/documents/_components/document-details'

interface UserTableProps {
  data: any
  pagination: PaginationProps
}

export const DocumentsTable = ({ data, pagination }: UserTableProps) => {
  const { currentPage, totalItems, handlePageChange, itemsPerPage = 25 } = pagination
  const getFooterText = useFooterText(currentPage, totalItems, itemsPerPage)


  return (
    <>
      <div className="border overflow-hidden rounded-lg">
        <Table>
          <TableCaption className="sr-only">A list of users.</TableCaption>
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
                        border: doc?.created_by?.avatar ? 'none' : `2px solid ${getRandomColor(index).border}`,
                      }}
                    >
                      <AvatarImage src={doc?.created_by?.avatar} alt={`${doc.created_by.first_name} ${doc.created_by.last_name}`} />
                      <AvatarFallback
                        className="h-full w-full flex justify-center items-center"
                        style={{
                          backgroundColor: getRandomColor(index).background,
                          color: getRandomColor(index).text,
                        }}
                      >
                        {doc.created_by?.first_name[0]}{doc.created_by?.last_name[0]}
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
                  {doc.departments.length}
                </TableCell>
                <TableCell>
                  {doc.users.length}
                </TableCell>
                <TableCell>
                  {doc.files.length}
                </TableCell>
                <TableCell>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-8 flex items-center justify-center">
                        <EllipsisVertical size={16} className="flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto max-w-56">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                      }}>
                        <DocumentDetails id={doc.id} />
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
          {totalItems > itemsPerPage && (
            <Pagination
              totalItems={totalItems}
              currentPage={currentPage!}
              handlePageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>
        <span className="flex-1" />
      </div>
    </>
  )
}
