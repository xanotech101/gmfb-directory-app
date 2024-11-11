"use client"
import { Analytics } from './_components/analytics'
import { Announcements } from './_components/announcements'
import { Documents } from './_components/documents'

export default function Dashboard() {
  return (
    <>
      <Analytics />
      <div className="grid grid-cols-1 md:grid-cols-2 flex-grow mt-8 gap-4">
        <Announcements />
        <Documents />
      </div>
    </>
  )
}
