'use client'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface AnnouncementData {
  title: string
  subject: string
  body: string
  departments: string[]
  users: string[]
}

export const PreviewAnnouncement = ({
  announcementData,
}: {
  announcementData: AnnouncementData
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleReadMore = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const maxChars = 150
  const isExpanded = expandedIndex === 0
  const displayedBody = isExpanded
    ? announcementData.body || ''
    : (announcementData.body?.length ?? 0) > maxChars
    ? (announcementData.body?.slice(0, maxChars) || '') + '...'
    : announcementData.body || ''

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Preview</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <div className="p-2">
          <div className="flex items-center w-full py-4 px-2 text-sm font-semibold pb-2">
            <DialogHeader>
              <DialogTitle className="text-indigo-600 font-bold">
                {announcementData.title}
              </DialogTitle>
            </DialogHeader>
          </div>
          <div className="flex items-center py-4 px-2 text-[18px] pb-2 font-semibold">
            <span className="text-center">{announcementData.subject}</span>
          </div>
          <div className="flex items-center px-2 text-sm pb-2">
            <div>{displayedBody.replace(/<\/?[^>]+(>|$)/g, '')}</div>
          </div>
          <div className="flex items-center px-2 text-sm">
            {announcementData.body && announcementData.body.length > maxChars && (
              <button
                className="text-indigo-500 text-sm hover:underline font-semibold"
                onClick={() => toggleReadMore(0)}
              >
                {isExpanded ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
        </div>
        <div className="w-full p-2">
          <div className="px-2 text-sm pb-2">
            <div className="text-[#000] font-semibold">Departments to share with:</div>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2">
            {announcementData.departments.map((department, index) => {
              return (
                <DialogDescription
                  key={index}
                  className="flex items-center justify-center text-sm text-center py-[2px] bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 rounded-full"
                >
                  {department}
                </DialogDescription>
              )
            })}
          </div>
        </div>
        <div className="w-full p-2">
          <div className="px-2 text-sm pb-2">
            <div className="text-[#000] font-semibold">Users to share with:</div>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2">
            {announcementData.users.map((department, index) => {
              return (
                <DialogDescription
                  key={index}
                  className="flex items-center justify-center text-sm text-center py-[2px] bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20 rounded-full"
                >
                  {department}
                </DialogDescription>
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
