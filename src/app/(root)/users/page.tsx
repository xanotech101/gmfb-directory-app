'use client'

import { InviteUser } from './_components/invite-user'
import { UserTable } from './_components/user-table'

export default function Users() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <InviteUser />
        </div>
      </div>
      <div className="mt-8 flow-root">
        <UserTable />
      </div>
    </div>
  )
}
