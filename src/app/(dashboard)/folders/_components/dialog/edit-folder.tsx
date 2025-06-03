/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentPropsWithoutRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { put } from '@/lib/fetch'
import { toast } from '@/hooks/use-toast'
import { FolderForm } from '../form/folder-form'
import { SquarePenIcon } from 'lucide-react'

interface UpdateFolderProps
  extends Omit<ComponentPropsWithoutRef<typeof FolderForm>, 'formAction'> {
  folderId: string
}

export const EditFolder = ({ defaultValues, folderId }: UpdateFolderProps) => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const editFolder = useMutation({
    mutationKey: ['edit-folder'],
    mutationFn: async (payload: { name: string }) =>
      put(`/api/folders/${folderId}`, {
        isClient: true,
        body: payload,
      }),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'The folder has been updated successfully',
      })
      queryClient.invalidateQueries({ queryKey: ['folders'] })
      setIsOpen(false)
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message ?? 'An error occurred',
        variant: 'destructive',
      })
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex gap-1 items-center">
          <SquarePenIcon className="size-4" />
          Edit Folder
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Edit Folder
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Change the details of the folder.
          </DialogDescription>
        </DialogHeader>
        <FolderForm formAction={editFolder} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  )
}
