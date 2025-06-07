/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { CheckCircleIcon, ClockIcon, RefreshCwIcon, ReceiptTextIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useMutation, useQuery } from '@tanstack/react-query'
import { del, get } from '@/lib/fetch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { toast } from '@/hooks/use-toast'
import { formatDate } from '@/lib/format-date'
import { useGetDocument } from '../../hooks/use-get-document'
import { FileCard } from '../file-card'

interface DocumentDetailsProps {
  id: string
  canDeleteDocument?: boolean
}

export function DocumentDetails({ id, canDeleteDocument }: DocumentDetailsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { data: document, isFetching, refetch } = useGetDocument(id)

  const deleteFile = useMutation({
    mutationKey: ['delete-document-file'],
    mutationFn: async ({ documentId, fileId }: { documentId: string; fileId: string }) =>
      del(`/api/documents/${documentId}/files/${fileId}`, {
        isClient: true,
      }),
    onSuccess: () => {
      toast({
        title: 'File deleted successfully',
        description: 'The file has been deleted successfully.',
        variant: 'default',
      })
      refetch()
    },
    onError: (error) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error.message ?? 'An error occurred',
      })
    },
  })

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="w-full text-sm text-left flex items-center gap-1">
          <ReceiptTextIcon className="size-4" />
          View Details
        </button>
      </SheetTrigger>
      <SheetContent
        className="max-w-[80%] md:max-w-[40%] bg-white text-[14px]"
        aria-describedby={undefined}
      >
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <>
            <SheetHeader className="space-y-4">
              <SheetTitle className="text-xl font-bold">{document.subject}</SheetTitle>
              <SheetDescription className="flex items-center text-[14px]">
                Created By:{' '}
                <span className="text-gray-900 ml-2">
                  {document.created_by?.first_name} {document.created_by?.last_name}
                </span>
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-180px)] mt-6 pr-4">
              <div className="space-y-8">
                <div>
                  <h3 className="text-[14px] font-semibold mb-2 flex items-center">Users</h3>
                  <p className="text-muted-foreground">
                    {document.metadata.send_to_all_users && (
                      <span className="text-muted-foreground">All users</span>
                    )}
                  </p>
                  <p className="text-muted-foreground">
                    {document.users
                      ?.map((user: any) => `${user.first_name} ${user.last_name}`)
                      .join(', ')}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center text-[14px]">Departments</h3>
                  <div className="flex flex-wrap gap-2">
                    {document.metadata.send_to_all_departments && (
                      <span className="text-muted-foreground">All departments</span>
                    )}
                    {document.departments?.map((dept: any) => (
                      <Badge key={dept.id}>{dept.name}</Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center text-[14px]">Details</h3>
                  <div className="bg-gray-50/70 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-primary" />
                        <span className="font-medium">Status</span>
                      </div>
                      <Badge variant={document.status === 'published' ? 'green' : 'yellow'}>
                        {document.status}
                      </Badge>
                    </div>
                    <Separator className="bg-gray-200/70" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="h-5 w-5 text-primary" />
                        <span className="font-medium">Created</span>
                      </div>
                      <span className="text-sm">{formatDate(document.created_at)}</span>
                    </div>
                    <Separator className="bg-gray-200/70" />
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
                      Attached Files
                    </h3>
                    <div className="space-y-2">
                      {document.files.map((file: any) => (
                        <FileCard
                          file={file}
                          key={file.id}
                          documentId={id}
                          handleDelete={deleteFile.mutateAsync}
                          canDeleteDocument={canDeleteDocument}
                        />
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
