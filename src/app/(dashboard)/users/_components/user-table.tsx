/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Badge } from '@/components/ui/badge'
import { getRandomColor } from '@/lib/random-color'
import { UserDetailsModal } from './user-details-modal'
import { UseMutationResult } from '@tanstack/react-query'
import { ManageDepartments } from './manage-departments'

interface UserTableProps {
  data: any
  pagination: PaginationProps
  resetPassword: UseMutationResult<any, unknown, string, unknown>
  manageDepartments: UseMutationResult<any, unknown, any, unknown>
}

export const UserTable = ({
  data,
  pagination,
  resetPassword,
  manageDepartments,
}: UserTableProps) => {
  const { currentPage, totalItems, handlePageChange, itemsPerPage = 25 } = pagination
  const getFooterText = useFooterText(currentPage, totalItems, itemsPerPage)

  return (
    <>
      <div className="border overflow-hidden rounded-lg">
        <Table>
          <TableCaption className="sr-only">A list of users.</TableCaption>
          <TableHeader className="bg-neutral-100">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Departments</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="sr-only">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {data.map((user: any, index: number) => (
              <TableRow key={user.email}>
                <TableCell>
                  <div className="flex items-basline">
                    <Avatar
                      className="size-8 flex-shrink-0 border-2 text-sm"
                      style={{
                        border: user?.avatar ? 'none' : `2px solid ${getRandomColor(index).border}`,
                      }}
                    >
                      <AvatarImage src={user.avatar} alt="user's avatar" />
                      <AvatarFallback
                        className="h-full w-full flex justify-center items-center"
                        style={{
                          backgroundColor: getRandomColor(index).background,
                          color: getRandomColor(index).text,
                        }}
                      >
                        {user.first_name[0]}
                        {user.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <div className="font-medium text-gray-900">
                        {user.first_name} {user.last_name}
                        <Badge
                          variant={user.status === 'active' ? 'green' : 'red'}
                          className="ml-2"
                        >
                          {user.status}
                        </Badge>
                      </div>
                      <div className="mt-0 text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-[40%]">
                  {user.departments?.length > 0 ? (
                    <div className="flex">
                      <div className="flex flex-wrap gap-1">
                        {user.departments?.slice(0, 2)?.map((d: any) => (
                          <Badge key={d.id} className="mr-1">
                            {d.name}
                          </Badge>
                        ))}
                      </div>
                      {user.departments?.length > 2 && (
                        <Badge>+{user.departments?.length - 2} more</Badge>
                      )}
                    </div>
                  ) : (
                    'No departments'
                  )}
                </TableCell>
                <TableCell>{user.role?.name}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-8 flex items-center justify-center">
                        <EllipsisVertical size={16} className="flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto max-w-56 text-[13px]">
                      <DropdownMenuItem
                        className="text-[13px]"
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                        }}
                      >
                        <UserDetailsModal user={user} />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[13px]">
                        <button onClick={() => resetPassword.mutate(user.id)}>
                          Reset Password
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-[13px]"
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                        }}
                      >
                        <ManageDepartments user={user} manageDepartments={manageDepartments} />
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
