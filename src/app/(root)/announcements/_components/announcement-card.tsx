'use client'
import React, { useState } from 'react'
import Image from 'next/image'

const announcements = [
  {
    title: 'Announcement 1',
    subject: 'Easy Notification',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Announcement 2',
    subject: 'Easy Notification',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Announcement 3',
    subject: 'Easy Notification',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Announcement 4',
    subject: 'Easy Notification',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
]
export const AnnouncementCard = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleReadMore = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const maxChars = 100

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 mx-4 sm:mx-6 lg:mx-0">
      {announcements.map((announcement, index) => {
        const isExpanded = expandedIndex === index
        const displayedBody = isExpanded
          ? announcement.body
          : announcement.body.length > maxChars
          ? announcement.body.slice(0, maxChars) + '...'
          : announcement.body

        return (
          <div key={index} className="rounded bg-[#F6F6F6] px-4">
            <div className="flex items-center justify-between py-4 px-2 text-sm font-semibold pb-2">
              <span className="text-indigo-500">{announcement.title}</span>
              <div className="flex h-8 shrink-0 items-center">
                <Image
                  alt="Your Company"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <div className="flex items-center py-8 px-2 text-[18px] pb-2 font-semibold">
              <span className="text-center">{announcement.subject}</span>
            </div>
            <div className="flex items-center px-2 text-sm pb-4">
              <span>{displayedBody}</span>
            </div>
            <div className="flex items-center px-2 text-sm pb-2">
              {announcement.body.length > maxChars && (
                <button
                  className="text-indigo-500 text-sm hover:underline font-semibold"
                  onClick={() => toggleReadMore(index)}
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
