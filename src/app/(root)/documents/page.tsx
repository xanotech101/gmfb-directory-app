'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const documents = [
  {
    id: 1,
    title: 'Design System',
    created_by: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'jondoe@mail.com',
      department: 'Design',
      avatar: undefined,
    },
    date: '2021-07-23',
    receipients: {
      departments: [
        {
          name: 'Design',
        },
      ],
      users: [
        {
          name: 'Jane Doe',
          avatar: 'https://randomuser.me/api/portraits',
        },
      ],
    },
  },
]

export default function Documents() {
  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Documents</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all documents created and shared within the organization.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
      </div>
      <div className="mt-8">
        <Table>
          <TableCaption className="sr-only">A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Receipients</TableHead>
              <TableHead className="sr-only">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((document) => (
              <TableRow key={document.id}>
                <TableCell>
                  <p>{document.title}</p>
                  <p>Created: {document.date}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-11 w-11 flex-shrink-0">
                      <Avatar>
                        <AvatarImage src={document.created_by.avatar} alt="profile image" />
                        <AvatarFallback className="h-full w-full bg-blue-500 border border-blue-200 flex items-center justify-center">
                          {document.created_by.first_name[0]}
                          {document.created_by.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {document.created_by.first_name}
                        {document.created_by.last_name}
                      </div>
                      <div className="mt-1 text-gray-500">{document.created_by.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>$250.00</TableCell>
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
      </div>
    </>
  )
}
