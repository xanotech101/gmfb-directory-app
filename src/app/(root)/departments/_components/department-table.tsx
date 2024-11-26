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
import { Pagination, PaginationProps, useFooterText } from '@/components/pagination/pagination'
import { getRandomColor } from '@/lib/random-color'
import { DepartmentUsers } from './department-users'
import { UpdateDepartment } from './update-department'

interface DepartmentTableProps {
  data: any
  pagination: PaginationProps
  onUpdate(): void
}

export const DepartmentTable = ({ data, pagination, onUpdate }: DepartmentTableProps) => {
  const { currentPage, totalItems, handlePageChange, itemsPerPage = 25 } = pagination
  const getFooterText = useFooterText(currentPage, totalItems, itemsPerPage)

  return (
    <>
      <div className="border overflow-hidden rounded-lg">
        <Table className="rounded-lg overflow-hidden shadow-sm">
          <TableCaption className="sr-only">A list of your recent invoices.</TableCaption>
          <TableHeader className="bg-neutral-100">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>HOD</TableHead>
              <TableHead>No of Users</TableHead>
              <TableHead className="sr-only">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {data.map((d: any, index: number) => (
              <TableRow key={d.id}>
                <TableCell>{d.name}</TableCell>
                <TableCell>
                  {d.hod ? (
                    <div className="flex items-start">
                      <div className="size-9 flex-shrink-0">
                        <Avatar
                          className="size-8 text-sm"
                          style={{ border: d?.hod?.avatar ? 'none' : `2px solid ${getRandomColor(index).border}` }}
                        >
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
                          {d.hod?.first_name} {d.hod?.last_name}
                        </div>
                        <div className="mt-0 text-gray-500">{d.hod.email}</div>
                      </div>
                    </div>
                  ) : (
                    'Not selected'
                  )}
                </TableCell>
                <TableCell>{d?.users_count ?? '--'}</TableCell>
                <TableCell>
                  <DropdownMenu modal>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-8 flex items-center justify-center">
                        <EllipsisVertical size={16} className="flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto max-w-56">
                      <DropdownMenuItem className="text-[13px]" onClick={(e) => e.preventDefault()}>
                        <DepartmentUsers name={d.name} id={d.id} />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[13px]" onClick={(e) => e.preventDefault()}>
                        <UpdateDepartment
                          id={d.id}
                          name={d.name}
                          hod={d.hod}
                          onUpdate={onUpdate}
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
