/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { CheckCircleIcon, ClockIcon, ReceiptTextIcon, RefreshCwIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useGetAnnouncement } from '../../hooks/use-get-announcement'
import { formatDate } from '@/lib/format-date'

export function AnnouncementDetails({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const { data: announcement } = useGetAnnouncement(id)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="w-full text-sm text-left flex items-center gap-1">
          <ReceiptTextIcon className="size-4" />
          View details
        </button>
      </SheetTrigger>
      <SheetContent
        className="max-w-[80%] md:max-w-[40%] bg-white text-[14px]"
        aria-describedby={undefined}
      >
        <SheetHeader className="space-y-4">
          <SheetTitle className="text-xl font-bold">{announcement.subject}</SheetTitle>
          <SheetDescription className="flex items-center text-[14px]">
            Created By:{' '}
            <span className="text-gray-900 ml-2">
              {announcement.created_by_user?.first_name} {announcement.created_by_user?.last_name}
            </span>
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-180px)] mt-6 pr-4">
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold mb-2 flex items-center text-[14px]">Body</h3>
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: announcement.body }} />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center text-[14px]">Users</h3>
              <p className="text-muted-foreground">
                {announcement.metadata?.send_to_all_users && (
                  <span className="text-muted-foreground">All users</span>
                )}
              </p>
              <p className="text-muted-foreground">
                {announcement.users
                  ?.map((user: any) => `${user?.first_name} ${user?.last_name}`)
                  .join(', ')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center text-[14px]">Departments</h3>
              <div className="flex flex-wrap gap-2">
                {announcement.metadata?.send_to_all_departments && (
                  <span className="text-muted-foreground">All departments</span>
                )}
                {announcement.departments?.map((dept: any) => (
                  <Badge key={dept.id}>{dept?.name}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center text-[14px]">Details</h3>
              <div className="bg-gray-50/70 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-primary" />
                    <span className="font-medium">Status</span>
                  </div>
                  <Badge variant={announcement?.status === 'published' ? 'green' : 'yellow'}>
                    {announcement?.status}
                  </Badge>
                </div>
                <Separator className="bg-gray-200/70" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5 text-primary" />
                    <span className="font-medium">Created</span>
                  </div>
                  <span className="text-sm">{formatDate(announcement?.created_at)}</span>
                </div>
                <Separator className="bg-gray-200/70" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <RefreshCwIcon className="h-5 w-5 text-primary" />
                    <span className="font-medium">Updated</span>
                  </div>
                  <span className="text-sm">{formatDate(announcement?.updated_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
