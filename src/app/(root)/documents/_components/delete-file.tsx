/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { del } from '@/lib/fetch'
import { toast } from '@/hooks/use-toast'

import { useState } from 'react'

export const DeleteFile = ({ onSuccess, onError, trigger, fileId, documentId }: any) => {
  const [open, setOpen] = useState(false)

  const deleteFile = useMutation({
    mutationKey: ['delete-document-file'],
    mutationFn: async () =>
      del(`/api/documents/${documentId}/files/${fileId}`, {
        isClient: true,
      }),
    onSuccess: () => {
      setOpen(false)
      toast({
        title: 'File deleted successfully',
        description: 'The file has been deleted successfully.',
        variant: 'default',
      })
      onSuccess?.('')
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            This action will permanently delete this file and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => setOpen(false)}
            disabled={deleteFile.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteFile.mutate()}
            isLoading={deleteFile.isPending}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
