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
  department: string
  body: string
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

  const maxChars = 100
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
        <div className="p-4">
          <div className="flex items-center py-4 px-2 text-sm font-semibold pb-2">
            <DialogHeader>
              <DialogTitle className="text-indigo-600 font-bold">
                {announcementData.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-700">
                {announcementData.department}
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="flex items-center py-8 px-2 text-[18px] pb-2 font-semibold">
            <span className="text-center">{announcementData.subject}</span>
          </div>
          <div className="flex items-center px-2 text-sm pb-2">
            <div>{displayedBody.replace(/<\/?[^>]+(>|$)/g, '')}</div>
          </div>
          <div className="flex items-center pb-4 px-2 text-sm pb-2">
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
      </DialogContent>
    </Dialog>
  )
}
