'use client'
import React from 'react'
import Link from 'next/link'
import { AnnouncementCard } from './_components/announcement-card'
import { Button } from '@/components/ui/button'
export default function Permissions() {
  return (
    <div className="sm:px-6 lg:px-0">
      <div className="sm:flex sm:items-center">
        <div className="flex items-center justify-between sm:flex-auto ">
          <div className="flex flex-col">
            <h1 className="text-left font-semibold leading-6 text-gray-900">Announcements</h1>
            <p className="mt-2 text-center text-sm text-gray-700">
              A list of all the announcements available to you.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link href="/announcements/create">
              <Button>Create Announcement</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <AnnouncementCard />
      </div>
    </div>
  )
}
