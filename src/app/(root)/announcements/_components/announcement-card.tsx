'use client'
import React, { useState } from 'react'

const announcements = [
  {
    title: 'Announcement 1',
    subject: 'Easy Notification',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    departments: ['Marketing', 'Human Resources', 'Sales'],
    users: ['Jon Doe', 'Jane Doe', 'Smith Doe'],
  },
  {
    title: 'Announcement 2',
    subject: 'Easy Notification',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    departments: ['Marketing', 'Human Resources', 'Sales'],
    users: ['Jon Doe', 'Jane Doe', 'Smith Doe'],
  },
  {
    title: 'Announcement 3',
    subject: 'Easy Notification',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    departments: ['Marketing', 'Human Resources', 'Sales'],
    users: ['Jon Doe', 'Jane Doe', 'Smith Doe'],
  },
  {
    title: 'Announcement 4',
    subject: 'Easy Notification',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    departments: ['Marketing', 'Human Resources', 'Sales'],
    users: ['Jon Doe', 'Jane Doe', 'Smith Doe'],
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
          <div key={index} className="rounded-lg bg-[#F6F6F6] px-4">
            <div className="flex items-center justify-between py-4 px-2 text-sm font-semibold pb-2">
              <span className="text-[#891C69]">{announcement.title}</span>
            </div>
            <div className="flex items-center py-8 px-2 text-[18px] pb-2 font-semibold">
              <span className="text-center">{announcement.subject}</span>
            </div>
            <div className="flex items-center px-2 text-sm pb-4 text-gray-700">
              <span>{displayedBody}</span>
            </div>
            <div className="flex items-center px-2 text-sm pb-2">
              {announcement.body.length > maxChars && (
                <button
                  className="text-[#891C69] text-sm hover:underline font-semibold"
                  onClick={() => toggleReadMore(index)}
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
            <div className="w-full p-2">
              <div className="text-sm pb-2">
                <div className="text-[#000] font-semibold">Departments to share with:</div>
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                {announcement.departments.map((department, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center text-sm text-start py-[2px] bg-transparent text-gray-700"
                    >
                      <span className="text-start">{department}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="w-full p-2">
              <div className="text-sm pb-2">
                <div className="text-[#000] font-semibold">Users to share with:</div>
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                {announcement.users.map((user, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center text-sm text-start py-[2px] bg-transparent text-[#891C69]"
                    >
                      <span className="text-start">{user}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
