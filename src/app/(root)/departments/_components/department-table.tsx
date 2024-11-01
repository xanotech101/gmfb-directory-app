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
import { getRandomColor } from '@/lib/random-color'


interface DepartmentTableProps {
  data: any
  pagination: {
    currentPage: number
    totalItems: number
    handlePageChange: (page: number) => void
    itemsPerPage?: number
  }
}

export const DepartmentTable = ({ data, pagination }: DepartmentTableProps) => {
  const { currentPage, totalItems, handlePageChange, itemsPerPage= 50 } = pagination

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
            <TableHead>HOD</TableHead>
            <TableHead>No of Users</TableHead>
            <TableHead className="sr-only">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((d: any, index: number) => (
            <TableRow key={d.id}>
              <TableCell>{d.name}</TableCell>
              <TableCell>
                {d.hod ? (
                  <div className="flex items-start">
                    <div className="size-8 flex-shrink-0">
                      <Avatar className="size-8">
                        <AvatarImage src={d.hod.avatar} alt="profile image" />
                        <AvatarFallback
                          className="h-full w-full flex justify-center items-center"
                          style={{
                            backgroundColor: getRandomColor(index).background,
                            color: getRandomColor(index).text,
                          }}
                        >
                          {d.hod.first_name[0]}
                          {d.hod.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-2">
                      <div className="font-medium text-gray-900">
                        {d.hod?.first_name}
                        {d.hod?.last_name}
                      </div>
                      <div className="mt-0 text-gray-500">{d.hod.email}</div>
                    </div>
                  </div>
                ) : (
                  'N/A'
                )}
              </TableCell>
              <TableCell>{d?.users_count ?? '--'}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-8 flex items-center justify-center">
                      <EllipsisVertical size={16} className="flex-shrink-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-auto max-w-56">
                    <DropdownMenuItem>View Users</DropdownMenuItem>
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
