/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { Fragment } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Show } from 'react-smart-conditional'
import DOMPurify from 'dompurify'
import { AnnouncementDetails } from '@/app/(root)/announcements/_components/announcement-details'


export function AnnouncementCard({announcement}: {announcement: any}) {
  const formatUsers = () => {
    return announcement?.users?.map((a: any) => `${a.first_name} ${a.last_name}`).join(', ')
  }
  return (
    <Card className="p-0 divide-y divide-gray-200 relative flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="py-4 px-5">
        <CardTitle>
          <div className="flex justify-between items-start">
            <span className="text-lg font-semibold truncate w-[60%]">{announcement?.subject}</span>
            <Badge className="capitalize" variant={announcement.status === 'published' ? 'green' : 'yellow'}>{announcement.status}</Badge>
          </div>
          <p className="mt-2 text-[13px] text-muted-foreground font-normal">Posted By {announcement?.created_by_user?.first_name} {announcement?.created_by_user?.last_name}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0 relative flex-grow">
        <ul className="divide-y divide-gray-50">
          <li className="py-2 px-5 text-[13px]">
            <p className="mb-0.5 text-muted-foreground">Body</p>
            <div className="break-words line-clamp-3" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(announcement?.body ?? '') }} />
          </li>
          <li className="py-2 px-5 text-[13px]">
            <p className="mb-0.5 text-muted-foreground">Departments</p>
            <Show>
              <Show.If condition={(announcement?.departments?.length ?? 0) > 0} className="flex flex-wrap gap-1.5">
                {announcement?.departments?.map((a: any) => `${a.name}`).join(', ')}
              </Show.If>
              <Show.Else as="p" className="text-sm">
                No departments added
              </Show.Else>
            </Show>
          </li>
          <li className="py-2 px-5 text-[13px]">
            <p className="mb-0.5 text-muted-foreground">Users</p>
            <Show as={Fragment}>
              <Show.If condition={(announcement?.users?.length ?? 0) > 0}>
                {formatUsers()}
              </Show.If>
              <Show.Else as="p">
                No users added
              </Show.Else>
            </Show>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="py-3.5 mt-auto px-5">
        <AnnouncementDetails id={announcement.id} />
      </CardFooter>
    </Card>
  )
}
