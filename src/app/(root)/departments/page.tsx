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

const departments = [
  {
    name: 'Admin',
    slug: 'admin',
    no_of_users: '5',
    dept_head: 'John Doe',
  },
  {
    name: 'Finance',
    slug: 'finance',
    no_of_users: '5',
    dept_head: 'John Doe',
  },
  {
    name: 'HR',
    slug: 'hr',
    no_of_users: '5',
    dept_head: 'John Doe',
  },
  {
    name: 'IT',
    slug: 'it',
    no_of_users: '5',
    dept_head: 'John Doe',
  },
  {
    name: 'Marketing',
    slug: 'marketing',
    no_of_users: '5',
    dept_head: 'John Doe',
  },
  {
    name: 'Operations',
    slug: 'operations',
    no_of_users: '5',
    dept_head: 'John Doe',
  },
  {
    name: 'Sales',
    slug: 'sales',
    no_of_users: '5',
    dept_head: 'John Doe',
  },
]

export default function Departments() {
  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Departments</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all the departments organization</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <CreateDepartment />
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    HOD
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    No of Users
                  </th>
                  <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {departments.map((dept) => (
                  <tr key={dept.slug}>
                    <td className="whitespace-nowrap px-3 text-sm sm:pl-0">
                      <div className="font-medium text-gray-900">{dept.name}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3 text-sm">
                      <div className="font-medium text-gray-900">{dept.dept_head}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3 text-sm">
                      <div className="font-medium text-gray-900">{dept.no_of_users}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Invite User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
