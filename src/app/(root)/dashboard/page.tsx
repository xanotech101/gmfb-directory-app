'use client'
import { Analytics } from './_components/analytics'
import { Announcements } from './_components/announcements'
import { useUser } from '@/providers/user.provider'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Documents } from './_components/documents'

export default function Dashboard() {
  const { user } = useUser()
  return (
    <>
      {user?.is_default_password && (
        <Alert className="mb-12 bg-brand/5 border-brand/10 border-2 p-4 px-6">
          <div className="flex">
            <ExclamationTriangleIcon className="size-8 text-[#891C69] mt-1" />
            <div className="ml-5">
              <p className="text-base font-semibold">Update your password</p>
              <p className="mt-1 text-gray-600 text-[14px]">You are yet to change your password form the default
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
        <Documents />
      </div>
    </>
  )
}
