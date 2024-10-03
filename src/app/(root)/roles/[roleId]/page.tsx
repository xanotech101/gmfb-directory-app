'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { PermissionCard } from './_components/permission-card'
export default function Permissions() {
  return (
    <div className="sm:px-6 lg:px-0">
      <div className="sm:flex sm:items-center">
        <div className="flex items-center justify-between sm:flex-auto ">
          <div className="flex flex-col">
            <h1 className="text-left font-semibold leading-6 text-gray-900">User</h1>
            <p className="mt-2 text-center text-sm text-gray-700">
              A list of all the roles permissions.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Button className="px-4 py-2 text-sm font-medium text-white bg-[#891C69] hover:bg-[#974D7B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#974D7B]">
              Save
            </Button>
            <Button className="px-4 py-2 ml-2 text-sm font-medium text-white bg-gray-400  hover:bg-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300">
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <PermissionCard />
      </div>
    </div>
  )
}
