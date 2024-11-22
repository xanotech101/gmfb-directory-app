/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import AvatarGroup from '@/components/ui/avatar-group'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Show } from 'react-smart-conditional'
import DOMPurify from 'dompurify'


export function AnnouncementCard({announcement}: {announcement: any}   ) {
  return (
    <Card className="p-0 divide-y divide-gray-200 relative flex flex-col">
      <CardHeader className="pb-4 px-5">
        <CardTitle className="flex justify-between items-start">
          <span className="text-lg font-semibold truncate w-[60%]">{announcement?.subject}</span>
          <Badge className="capitalize" variant={announcement.status === 'published' ? 'green' : 'yellow'}>{announcement.status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0 relative flex-grow">
        <ul className="divide-y divide-gray-50">
          <li className="py-2 px-5">
            <p className="mb-0.5 text-sm text-muted-foreground">Body</p>
            <div className="break-words text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(announcement?.body ?? '') }} />
          </li>
          <li className="py-2 px-5">
            <p className="mb-0.5 text-sm text-muted-foreground">Departments</p>
            <Show>
              <Show.If condition={(announcement?.departments?.length ?? 0) > 0} className="flex flex-wrap gap-1.5">
                {announcement?.departments?.map((a: any) => (
                  <Badge key={a?.name}>{a.name}</Badge>
                ))}
              </Show.If>
              <Show.Else as="p" className="text-sm">
                No departments added
              </Show.Else>
            </Show>
          </li>
          <li className="py-2 px-5">
            <p className="mb-0.5 text-sm text-muted-foreground">Users</p>
            <Show>
              <Show.If condition={(announcement?.users?.length ?? 0) > 0}>
                <AvatarGroup
                  size={34}
                  fontSize={14}
                  max={5}
                  content={announcement?.users?.map((a: any) => ({ name: `${a.first_name} ${a.last_name}` }))}
                />
              </Show.If>
              <Show.Else as="p" className="text-sm">
                No users added
              </Show.Else>
            </Show>
          </li>
          <li className="py-2 px-5">
            <p className="mb-0.5 text-sm text-muted-foreground">Created By</p>
            <p className="text-sm"> {announcement?.created_by_user?.first_name} {announcement?.created_by_user?.last_name}</p>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="py-3.5 mt-auto px-5">
        <Button variant="outline" className="w-full">View details</Button>
      </CardFooter>
    </Card>
  )
}
