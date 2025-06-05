/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
import { EllipsisVertical, Search } from 'lucide-react'
import { Pagination, PaginationProps, useFooterText } from '@/components/pagination/pagination'
import { Badge } from '@/components/ui/badge'
import { getRandomColor } from '@/lib/random-color'
import { UserDetails } from './dialog/user-details'
import { ManageDepartments } from './dialog/manage-departments'
import { Input } from '@/components/ui/input'
import { EmptyState } from '@/components/ui/empty-state'
import { ResetPassword } from './dialog/reset-password'
import { DeleteUser } from './dialog/delete-user'

interface UserTableProps {
  data: any
  pagination: PaginationProps
  filters: {
    onSearch: (searchString: string) => void
    searchString?: string
  }
  canUpdateUser: boolean
  canDeleteUser: boolean
}

export const UserTable = ({
  data,
  pagination,
  filters: { onSearch, searchString = '' },
  canUpdateUser,
  canDeleteUser,
}: UserTableProps) => {
  const [search, setSearch] = useState(searchString)
  const { currentPage, totalItems, handlePageChange, itemsPerPage } = pagination
  const getFooterText = useFooterText(currentPage, totalItems, itemsPerPage)

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearch(value)
  }, 900)

  return (
    <>
      <div className="w-auto mb-4 relative max-w-xs">
        <Input
          className="pl-8"
          aria-label="Search users by name or email"
          placeholder="Search by name or email"
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            debouncedSearch(e.target.value)
          }}
        />
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
          <Search size={16} />
        </span>
      </div>
      {data.length === 0 ? (
        <EmptyState
          title="No Users"
          description="Looks like you don't have any users yet. Invite some users to get started."
          className="w-full bg-white"
        />
      ) : (
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
                            border: user?.avatar
                              ? 'none'
                              : `2px solid ${getRandomColor(index).border}`,
                          }}
                        >
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
                          <Button
                            variant="outline"
                            className="w-8 flex items-center justify-center"
                          >
                            <EllipsisVertical size={16} className="flex-shrink-0" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-auto max-w-56">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                            <UserDetails user={user} />
                          </DropdownMenuItem>
                          {canUpdateUser && (
                            <>
                              <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                                <ResetPassword userId={user.id} />
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                                <ManageDepartments user={user} />
                              </DropdownMenuItem>
                            </>
                          )}
                          {canDeleteUser && (
                            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                              <DeleteUser userId={user.id} />
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
          <div className="flex items-center justify-between px-3 py-5 rounded-b-lg mt-4">
            <div className="text-[14px] text-gray-500 flex-1">{getFooterText}</div>
            <div className="text-center flex-1 flex justify-center">
              <Pagination
                totalItems={totalItems}
                currentPage={currentPage!}
                handlePageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
              />
            </div>
            <span className="flex-1" />
          </div>
        </>
      )}
    </>
  )
}
