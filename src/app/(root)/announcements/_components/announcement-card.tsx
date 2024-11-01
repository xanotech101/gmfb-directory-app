/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react"
import AvatarGroup from "@/components/ui/avatar-group"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Badge
} from "@/components/ui/badge"
import { Show } from 'react-smart-conditional'



export function AnnouncementCard({announcement}: {announcement: any}   ) {
  return (
    <Card className="p-0">
      <CardHeader className="pb-4">
        <CardTitle>{announcement?.subject}</CardTitle>
        <CardDescription>
          {announcement?.body}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ul>
          <li className="py-3 px-6">
            <p className="mb-1 text-sm text-muted-foreground">Departments</p>
            <Show>
              <Show.If condition={(announcement?.departments?.length ?? 0) > 0} className="flex flex-wrap gap-1.5">
                {announcement?.departments?.map((d: any) => (
                  <Badge key={d?.name}>{d.name}</Badge>
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
                  content={announcement?.users?.map((u: any) => ({ name: `${u.first_name} ${u.last_name}` }))}
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
              <Badge variant="green">Published</Badge>
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
