/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import {
  CheckCircleIcon,
  ClockIcon,
  ExternalLinkIcon,
  FileIcon,
  RefreshCwIcon,
  Trash2Icon,
  ReceiptTextIcon,
} from 'lucide-react'
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
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConfirmAction } from '@/components/confirm-action/confirm-action'
import { toast } from '@/hooks/use-toast'
import { formatDate } from '@/lib/format-date'

export function DocumentDetails({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false)

  //todo: move to a hook so it can be reused
  const { data, isFetching, refetch } = useQuery<any>({
    queryKey: ['document-details', id],
    queryFn: async () =>
      get(`/api/documents/${id}`, {
        isClient: true,
      }),
    enabled: !!id,
  })

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

  const document = data?.data ?? {}

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="w-full text-sm text-left flex items-center gap-1">
          <ReceiptTextIcon className="size-4" />
          View
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
                      {document.files.map((file: any) => {
                        const fileName = file.url.split('/').pop() || 'Unnamed File'
                        return (
                          <Card className="overflow-hidden" key={file.id}>
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <FileIcon className="h-6 w-6 text-primary" />
                                <span className="font-medium truncate" title={fileName}>
                                  {fileName}
                                </span>
                              </div>
                              <div className="flex space-x-3">
                                <ConfirmAction
                                  trigger={
                                    <Button variant="ghost" className="p-0" title="Open file">
                                      <Trash2Icon className="h-4 w-4 text-red-600" />
                                      <span className="sr-only">Delete file</span>
                                    </Button>
                                  }
                                  title="Delete Document File"
                                  description="Are you sure you want to delete this file? This action cannot be undone."
                                  actionProps={{
                                    action: () =>
                                      deleteFile.mutateAsync({
                                        documentId: document.id,
                                        fileId: file.id,
                                      }),
                                    isLoading: deleteFile.isPending,
                                    buttonProps: {
                                      variant: 'destructive',
                                      children: 'Delete',
                                    },
                                  }}
                                />
                                <Button
                                  variant="ghost"
                                  className="p-0"
                                  onClick={() => window.open(file.url, '_blank')}
                                  title="Open file"
                                >
                                  <ExternalLinkIcon className="h-4 w-4" />
                                  <span className="sr-only">Open file</span>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
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
