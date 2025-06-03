/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { post } from '@/lib/fetch'
import { toast } from '@/hooks/use-toast'
import { FolderForm } from '../form/folder-form'
import { Plus } from 'lucide-react'

export const CreateFolder = () => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const createFolder = useMutation({
    mutationKey: ['create-folder'],
    mutationFn: async (payload: { name: string }) =>
      post(`/api/folders`, {
        isClient: true,
        body: payload,
      }),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'The folder has been created successfully',
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
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Folder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Create Folder
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Add the details of the new folder you want to create.
          </DialogDescription>
        </DialogHeader>
        <FolderForm formAction={createFolder} />
      </DialogContent>
    </Dialog>
  )
}
