import { ConfirmAction } from '@/components/confirm-action/confirm-action'
import { toast } from '@/hooks/use-toast'
import { del } from '@/lib/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'
import React from 'react'

export const DeleteFolder = ({ folderId }: { folderId: string }) => {
  const queryClient = useQueryClient()

  const deleteFolder = useMutation({
    mutationKey: ['delete-folder'],
    mutationFn: async (folderId: string) =>
      del(`/api/folders/${folderId}`, {
        isClient: true,
      }),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'The folder has been deleted successfully',
      })
      queryClient.invalidateQueries({ queryKey: ['folders'] })
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
    <ConfirmAction
      trigger={
        <button className="w-full text-sm text-left flex items-center gap-1">
          <Trash2Icon className="size-4" />
          Delete Folder
        </button>
      }
      title="Delete Folder"
      description="Are you sure you want to delete this folder?"
      actionProps={{
        action: () => deleteFolder.mutateAsync(folderId),
        isLoading: deleteFolder.isPending,
        buttonProps: {
          variant: 'default',
          children: 'Delete Folder',
        },
      }}
    />
  )
}
