/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import { Badge } from '@/components/ui/badge'
import { BuildingIcon, CalendarIcon, CheckCircleIcon, ClockIcon, RefreshCwIcon, UserIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function AnnouncementDetails({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const { data } = useQuery<any>({
    queryKey: ['announcement-details', id],
    queryFn: async () =>
      get(`/api/announcements/${id}`, {
        isClient: true,
      }),
    enabled: !!id,
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const announcement = data?.data ?? {}

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="w-full text-sm">View details</button>
      </SheetTrigger>
      <SheetContent className="max-w-[80%] md:max-w-[40%] bg-white text-[14px]" aria-describedby={undefined}>
        <SheetHeader className="space-y-4">
          <SheetTitle className="text-xl font-bold">{announcement.subject}</SheetTitle>
          <SheetDescription className="flex items-center text-[14px]">
            <UserIcon className="mr-2 h-4 w-4" />
            {announcement.created_by_user?.first_name} {announcement.created_by_user?.last_name}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-180px)] mt-6 pr-4">
          <div className="space-y-8">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: announcement.body }} />
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center text-[14px]">
                <UserIcon className="mr-2 h-5 w-5" /> Users
              </h3>
              <p className="text-muted-foreground">
                {announcement.users?.map((user: any) => `${user?.first_name} ${user?.last_name}`).join(', ')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center text-[14px]">
                <BuildingIcon className="mr-2 h-5 w-5" /> Departments
              </h3>
              <div className="flex flex-wrap gap-2">
                {announcement.departments?.map((dept: any) => (
                  <Badge key={dept.id}>
                    {dept?.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center text-[14px]">
                <CalendarIcon className="mr-2 h-5 w-5" /> Details
              </h3>
              <div className="bg-neutral-100 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-primary" />
                    <span className="font-medium">Status</span>
                  </div>
                  <Badge variant={announcement?.status === 'published' ? 'green' : 'yellow'}>
                    {announcement?.status}
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5 text-primary" />
                    <span className="font-medium">Created</span>
                  </div>
                  <span className="text-sm">{formatDate(announcement?.created_at)}</span>
                </div>
                <Separator />
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

