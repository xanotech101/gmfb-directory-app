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
import { EllipsisVertical } from 'lucide-react'
import { Pagination, PaginationProps, useFooterText } from '@/components/pagination/pagination'
import { DepartmentUsers } from './dialogs/department-users'
import { UpdateDepartment } from './dialogs/update-department'
import { UserAvatar } from '@/components/user-avatar/user-avatar'
import { SearchInput } from '@/components/search-input/search-input'
import { EmptyState } from '@/components/ui/empty-state'
import { DeleteDepartment } from './dialogs/delete-department'

interface DepartmentTableProps {
  data: any
  pagination: PaginationProps
  filters: {
    onSearch: (searchString: string) => void
    searchString: string
  }
  permissions: {
    canEdit: boolean
    canDelete: boolean
  }
}

export const DepartmentTable = ({
  data,
  pagination,
  filters: { onSearch, searchString },
  permissions: { canEdit, canDelete },
}: DepartmentTableProps) => {
  const { currentPage, totalItems, handlePageChange } = pagination
  const getFooterText = useFooterText(currentPage, totalItems)

  console.log('DepartmentTable data:', data)

  return (
    <>
      <SearchInput
        value={searchString}
        onSearch={onSearch}
        debounce
        placeholder="Search by name"
        aria-label="Search users by name"
      />
      <div className="border overflow-hidden rounded-lg">
        <Table className="rounded-lg overflow-hidden shadow-sm">
          <TableCaption className="sr-only">
            A list of all the departments in the system. You can view, edit, and manage users in
            each department.
          </TableCaption>
          <TableHeader className="bg-neutral-100">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>HOD</TableHead>
              <TableHead>No of Users</TableHead>
              <TableHead className="sr-only">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {data.map((d: any) => (
              <TableRow key={d.id}>
                <TableCell>{d.name}</TableCell>
                <TableCell>
                  {d.hod ? (
                    <div className="flex items-start">
                      <UserAvatar firstName={d.hod.first_name} lastName={d.hod.last_name} />
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
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                        <DepartmentUsers name={d.name} id={d.id} />
                      </DropdownMenuItem>
                      {canEdit && (
                        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                          <UpdateDepartment id={d.id} name={d.name} hod={d.hod} />
                        </DropdownMenuItem>
                      )}
                      {canDelete && (
                        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                          <DeleteDepartment departmentId={d.id} />
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
      {data.length === 0 && (
        <EmptyState
          className="mt-2 bg-white"
          title="No Departments Found"
          description="There are no departments available. You can create a new department to get started."
        />
      )}
      <Pagination
        totalItems={totalItems}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  )
}
