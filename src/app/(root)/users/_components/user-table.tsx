/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { EllipsisVertical } from 'lucide-react'
import { Pagination } from '@/components/pagination/pagination'
import { Badge } from '@/components/ui/badge'
import { getRandomColor } from '@/lib/random-color'
import { UserDetailsModal } from './user-details-modal'

const itemsPerPage = 50

interface UserTableProps {
  data: any
  pagination: {
    currentPage: number
    totalItems: number
    handlePageChange: (page: number) => void
  }
}

export const UserTable = ({ data, pagination }: UserTableProps) => {
  const { currentPage, totalItems, handlePageChange } = pagination

  function getFooterText() {
    if (totalItems > 0) {
      const start = (currentPage - 1) * itemsPerPage + 1
      const end = Math.min(currentPage * itemsPerPage, totalItems)
      return `Showing ${start}-${end} of ${totalItems} results`
    }
    return null
  }

  return (
    <div>
      <Table>
        <TableCaption className="sr-only">A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Departments</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="sr-only">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
                      <Badge variant={user.status === 'active' ? 'green' : 'red'} className="ml-2">
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
                      <Badge>
                        +{user.departments?.length - 2} more
                      </Badge>
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
                  <DropdownMenuContent className="w-auto max-w-56">
                    <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                    }}>
                      <UserDetailsModal user={user} />
                    </DropdownMenuItem>
                    {/*<DropdownMenuItem>Edit Profile</DropdownMenuItem>*/}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t px-3 py-5">
        <div className="text-[14px] text-gray-500 flex-1">{getFooterText()}</div>
        <div className="text-center flex-1 flex justify-center">
          {totalItems > itemsPerPage && (
            <Pagination
              totalItems={totalItems}
              currentPage={currentPage!}
              handlePageClick={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>
        <span className="flex-1" />
      </div>
    </div>
  )
}
