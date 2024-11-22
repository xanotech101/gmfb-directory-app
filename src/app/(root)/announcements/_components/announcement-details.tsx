/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'

export function AnnouncementDetails({ id }: {id: string}) {
  const [isOpen, setIsOpen] = useState(false)

  const anouncement = useQuery<any>({
    queryKey: ['announcement-details', id],
    queryFn: async () =>
      get(`/api/announcements/${id}`, {
        isClient: true,
      }),
    enabled: !!id
  })

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        View Users
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-white">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            render content here
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}

