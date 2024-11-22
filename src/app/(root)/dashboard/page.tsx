'use client'
import { Analytics } from './_components/analytics'
import { Announcements } from './_components/announcements'
import { useUser } from '@/providers/user.provider'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function Dashboard() {
  const { user } = useUser()
  return (
    <>
      {user?.is_default_password && (
        <Alert className="mb-12 bg-orange-50 border-orange-100 border-2 p-4 px-6">
          <div className="flex">
            <ExclamationTriangleIcon className="size-7 text-orange-500 mt-1" />
            <div className="ml-5">
              <p className="text-lg font-semibold">Update your password</p>
              <p className="mt-1 text-gray-600 text-base">You are yet to change your password form the default
                password
              </p>
              <Link href="/settings">
                <Button variant="outline" className="bg-white border-gray-200 mt-5">
                  Change Password
                </Button>
              </Link>
            </div>
          </div>
        </Alert>
      )}
      <Analytics />
      <div className="grid grid-cols-1 md:grid-cols-2 flex-grow mt-8 gap-4">
        <Announcements />
        <Announcements />
        {/*<Documents />*/}
      </div>
    </>
  )
}
