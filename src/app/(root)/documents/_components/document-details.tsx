/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import {
  BuildingIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  PaperclipIcon,
  RefreshCwIcon,
  UserIcon,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import { FileCard } from './file-card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export function DocumentDetails({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const { data, isFetching } = useQuery<any>({
    queryKey: ['document-details', id],
    queryFn: async () =>
      get(`/api/documents/${id}`, {
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

  const document = data?.data ?? {}
  console.log('document', document)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="w-full text-sm">View details</button>
      </SheetTrigger>
      <SheetContent className="max-w-[80%] md:max-w-[40%] bg-white text-[14px]" aria-describedby={undefined}>
        {isFetching ? <div>Loading...</div> : (
          <>
            <SheetHeader className="space-y-4">
              <SheetTitle className="text-xl font-bold">{document.subject}</SheetTitle>
              <SheetDescription className="flex items-center text-[14px]">
                <UserIcon className="mr-2 h-4 w-4" />
                {document.created_by?.first_name} {document.created_by?.last_name}
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-180px)] mt-6 pr-4">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <UserIcon className="mr-2 h-5 w-5" /> Recipients
                  </h3>
                  <p className="text-muted-foreground">
                    {document.users?.map((user: any) => `${user.first_name} ${user.last_name}`).join(', ')}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center text-[14px]">
                    <BuildingIcon className="mr-2 h-5 w-5" /> Departments
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {document.departments?.map((dept: any) => (
                      <Badge key={dept.id}>
                        {dept.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center text-[14px]">
                    <CalendarIcon className="mr-2 h-5 w-5" /> Details
                  </h3>
                  <div className="bg-muted rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-primary" />
                        <span className="font-medium">Status</span>
                      </div>
                      <Badge variant={document.status === 'published' ? 'green' : 'yellow'}>
                        {document.status}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="h-5 w-5 text-primary" />
                        <span className="font-medium">Created</span>
                      </div>
                      <span className="text-sm">{formatDate(document.created_at)}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RefreshCwIcon className="h-5 w-5 text-primary" />
                        <span className="font-medium">Updated</span>
                      </div>
                      <span className="text-sm">{formatDate(document.updated_at)}</span>
                    </div>
                  </div>
                </div>

                {document.files?.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center text-[14px]">
                      <PaperclipIcon className="mr-2 h-5 w-5" /> Attached Files
                    </h3>
                    <div className="space-y-2">
                      {document.files.map((file: any) => (
                        <FileCard key={file.id} file={file} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </>
        )}

      </SheetContent>
    </Sheet>
  )
}

