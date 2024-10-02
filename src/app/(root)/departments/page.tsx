'use client'
import React from 'react'
import { CreateDepartment } from './_components/create-department'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const departments = [
  {
    id: 2,
    name: 'Admin',
    slug: 'admin',
    no_of_users: '5',
    hod: {
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@mail.com',
    },
  },
  {
    id: 4,
    name: 'Finance',
    slug: 'finance',
    no_of_users: '5',
    hod: {
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      id: 77,
      first_name: 'John',
      last_name: 'Doe',
      email: 'finance@mail.com',
    },
  },
  {
    id: 5,
    name: 'HR',
    slug: 'hr',
    no_of_users: '5',
    hod: {
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      id: 30,
      first_name: 'John',
      last_name: 'Doe',
      email: 'finance@mail.com',
    },
  },
  {
    id: 8,
    name: 'IT',
    slug: 'it',
    no_of_users: '5',
    hod: {
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      id: 30,
      first_name: 'John',
      last_name: 'Doe',
      email: 'finance@mail.com',
    },
  },
  {
    id: 3,
    name: 'Marketing',
    slug: 'marketing',
    no_of_users: '5',
    hod: {
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      id: 5,
      first_name: 'John',
      last_name: 'Doe',
      email: 'finance@mail.com',
    },
  },
  {
    id: 30,
    name: 'Operations',
    slug: 'operations',
    no_of_users: '5',
    hod: {
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      id: 2,
      first_name: 'John',
      last_name: 'Doe',
      email: 'finance@mail.com',
    },
  },
  {
    id: 22,
    name: 'Sales',
    slug: 'sales',
    no_of_users: '5',
    hod: {
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      id: 3,
      first_name: 'John',
      last_name: 'Doe',
      email: 'finance@mail.com',
    },
  },
]

export default function Departments() {
  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Departments</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all the departments</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <CreateDepartment />
        </div>
      </div>

      <div className="mt-8">
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
            {departments.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-11 w-11 flex-shrink-0">
                      <Avatar>
                        <AvatarImage src={d.hod.avatar} alt="profile image" />
                        <AvatarFallback className="h-full w-full bg-blue-500 border border-blue-200 flex items-center justify-center">
                          {d.hod.first_name[0]}
                          {d.hod.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {d.hod.first_name}
                        {d.hod.last_name}
                      </div>
                      <div className="mt-1 text-gray-500">{d.hod.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{d.no_of_users}</TableCell>
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
      </div>
    </>
  )
}
