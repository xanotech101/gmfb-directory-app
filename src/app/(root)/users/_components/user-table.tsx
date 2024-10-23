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
import { Pagination } from '@/components/pagination/pagination'
import AvatarGroup from '@/components/ui/avatar-group'
import { Badge } from '@/components/ui/badge'
import { getRandomColor } from '@/lib/random-color'

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

  // handle empty state here please

  return (
    <div>
      <Table>
        <TableCaption className="sr-only">A list of your recent invoices.</TableCaption>
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
                <div className="flex items-center">
                  <Avatar
                    className="size-10 flex-shrink-0 border-2"
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
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      {user.first_name} {user.last_name}
                      <Badge variant={user.status === 'active' ? 'green' : 'red'} className="ml-2">
                        {user.status}
                      </Badge>
                    </div>
                    <div className="mt-1 text-gray-500">{user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {user.departments?.length > 0 ? (
                  <AvatarGroup
                    max={2}
                    content={user.departments.map((d: any) => ({
                      name: d.name,
                    }))}
                  />
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
                    <DropdownMenuItem>View profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Profile</DropdownMenuItem>
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
        <span className="flex-1"></span>
      </div>
    </div>
  )
}
