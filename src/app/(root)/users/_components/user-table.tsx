/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
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
import { useMutation } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import { toast } from 'sonner'
import { Pagination } from '@/components/pagination/pagination'
import { useRouter } from 'next/navigation'

export const UserTable = () => {
  const router = useRouter()
  const [usersData, setUsersData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState<number | null>(null)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 4

  useEffect(() => {
    const pageFromQuery = new URLSearchParams(window.location.search).get('page')
    const pageNumber = pageFromQuery ? parseInt(pageFromQuery) : 1
    setCurrentPage(pageNumber)
  }, [])

  const users = useMutation({
    mutationKey: ['users', currentPage],
    mutationFn: async () =>
      get(`/api/users?page=${currentPage}&limit=${itemsPerPage}`, {
        isClient: true,
      }),
    onSuccess: (response: any) => {
      setUsersData(response.data.items)
      setTotalItems(response.data.meta.total)
    },
    onError: (error: any) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    if (currentPage !== null) {
      users.mutate()
    }
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    router.push(`?page=${page}`)
  }

  function getFooterText() {
    if (totalItems > 0) {
      const start = (currentPage! - 1) * itemsPerPage + 1
      const end = Math.min(currentPage! * itemsPerPage, totalItems)
      return `Showing ${start}-${end} of ${totalItems} results`
    }
    return null
  }

  return (
    <div>
      <Table>
        <TableCaption className="sr-only">A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="sr-only">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.map((user) => (
            <TableRow key={user.email}>
              <TableCell>
                <div className="flex items-center">
                  <div className="h-11 w-11 flex-shrink-0">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt="" />
                      <AvatarFallback className="h-full w-full bg-[#891C69] flex text-white items-center justify-center">
                        {user.first_name[0]}
                        {user.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      {user.first_name} {user.last_name}
                    </div>
                    <div className="mt-1 text-gray-500">{user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {user.departments && user.departments.length > 0
                  ? user.departments.map((d: any, index: number) => (
                      <span key={index}>
                        {d.name}
                        {index < user.departments.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  : 'No departments'}
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {user.status}
                </span>
              </TableCell>
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

      {totalItems > itemsPerPage && (
        <div className="flex items-center justify-between  border-t px-3 py-5">
          <div className="text-[14px] text-gray-500 flex-1">{getFooterText()}</div>
          <div className="text-center flex-1 flex justify-center">
            <Pagination
              totalItems={totalItems}
              currentPage={currentPage!}
              handlePageClick={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
          </div>
          <span className="flex-1"></span>
        </div>
      )}
    </div>
  )
}
