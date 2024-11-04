/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import AvatarGroup from "@/components/ui/avatar-group"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Badge
} from "@/components/ui/badge"
import { Show } from 'react-smart-conditional'
import DOMPurify from 'dompurify';

export function AnnouncementCard({announcement}: {announcement: any}   ) {
  return (
    <Card className="p-0 divide-y divide-gray-200">
      <CardHeader className="pb-4">
        <CardTitle>{announcement?.subject}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ul className="divide-y divide-gray-200">
          <li className="py-3 px-6">
            <p className="mb-1 text-sm text-muted-foreground">Body</p>
            <div className="break-words text-sm" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(announcement?.body ?? '')}}/>
          </li>
          <li className="py-3 px-6">
            <p className="mb-1 text-sm text-muted-foreground">Departments</p>
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
          <li className="py-3 px-6">
            <p className="mb-1 text-sm text-muted-foreground">Users</p>
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
          <li className="py-3 px-6">
            <p className="mb-1 text-sm text-muted-foreground">Status</p>
            <span className="d-inline-flex mb-1">
              <Badge className="capitalize"
                     variant={announcement.status === 'draft' ? "yellow" : "green"}>{announcement.status}</Badge>
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="hidden">
        <Button variant="outline">View details</Button>
      </CardFooter>
    </Card>
  )
}
