/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
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
import { EllipsisVertical } from 'lucide-react'
import { Pagination, PaginationProps, useFooterText } from '@/components/pagination/pagination'
import { getRandomColor } from '@/lib/random-color'
import * as React from 'react'
import { AnnouncementDetails } from './announcement-details'

interface AnnouncementsTableProps {
  data: any
  pagination: PaginationProps
}

export const AnnouncementsTable = ({ data, pagination }: AnnouncementsTableProps) => {
  const { currentPage, totalItems, handlePageChange } = pagination
  const getFooterText = useFooterText(currentPage, totalItems)

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
              <TableHead className="sr-only">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {data.map((announcement: any, index: number) => (
              <TableRow key={announcement.id}>
                <TableCell>
                  <div className="flex items-basline">
                    <Avatar
                      className="size-8 flex-shrink-0 border-2 text-sm"
                      style={{
                        border: announcement?.created_by?.avatar
                          ? 'none'
                          : `2px solid ${getRandomColor(index).border}`,
                      }}
                    >
                      <AvatarImage
                        src={announcement?.created_by?.avatar}
                        alt={`${announcement.created_by.first_name} ${announcement.created_by.last_name}`}
                      />
                      <AvatarFallback
                        className="h-full w-full flex justify-center items-center"
                        style={{
                          backgroundColor: getRandomColor(index).background,
                          color: getRandomColor(index).text,
                        }}
                      >
                        {announcement.created_by_user?.first_name?.[0]}
                        {announcement.created_by_user?.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <div className="font-medium text-gray-900">
                        {announcement?.created_by_user?.first_name}{' '}
                        {announcement?.created_by_user?.last_name}
                      </div>
                      <div className="mt-0 text-gray-500">
                        {announcement?.created_by_user?.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-[40%]">{announcement?.subject}</TableCell>
                <TableCell>
                  {announcement.metadata.send_to_all_departments
                    ? 'All'
                    : announcement.departments?.length}
                </TableCell>
                <TableCell>
                  {announcement.metadata.send_to_all_users ? 'All' : announcement.users?.length}
                </TableCell>
                <TableCell>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-8 flex items-center justify-center">
                        <EllipsisVertical size={16} className="flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuContent className="w-auto max-w-56 overflow-auto">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                          }}
                        >
                          <AnnouncementDetails id={announcement.id} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenuPortal>
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
