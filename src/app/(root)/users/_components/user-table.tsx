import React from 'react'
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

const people = [
  {
    first_name: 'Lindsay',
    last_name: 'Waston',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    gender: 'male',
    role: 'Member',
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]

export const UserTable = () => {
  return (
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
        {people.map((p) => (
          <TableRow key={p.email}>
            <TableCell>
              <div className="flex items-center">
                <div className="h-11 w-11 flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={p.avatar} alt="" />
                    <AvatarFallback className="h-full w-full bg-blue-500 border border-blue-200 flex items-center justify-center">
                      {p.first_name[0]}
                      {p.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">
                    {p.first_name}
                    {p.last_name}
                  </div>
                  <div className="mt-1 text-gray-500">{p.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{p.department}</TableCell>
            <TableCell>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Active
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
  )
}
