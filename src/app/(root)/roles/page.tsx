'use client'
import React from 'react'
import { CreateRole } from './_components/create-role'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

const roles = [
  {
    type: 'Administrator',
    number_of_users: '5',
    permissions: ['All Access', 'Moderator'],
    date_added: new Date(),
  },
]

export default function Roles() {
  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Roles</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the roles in your account including their type, number of users,
            permissions and date added.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <CreateRole />
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
                    Slug
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Permissions
                  </th>
                  <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {roles.map((role) => (
                  <tr key={role.type}>
                    <td className="whitespace-nowrap px-3 text-sm sm:pl-0">
                      <div className="font-medium text-gray-900">{role.type}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3 text-sm">
                      <div className="font-medium text-gray-900">{role.type}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3 text-sm">
                      <div className="font-medium text-gray-900">5</div>
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
                          <DropdownMenuItem>Edit Role</DropdownMenuItem>
                          <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
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
