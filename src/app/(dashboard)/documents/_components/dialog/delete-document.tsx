import { ConfirmAction } from '@/components/confirm-action/confirm-action'
import { toast } from '@/hooks/use-toast'
import { del } from '@/lib/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'

export const DeleteDocumentDialog = ({ docId }: { docId: string }) => {
  const queryClient = useQueryClient()

  const deleteDocument = useMutation({
    mutationKey: ['delete-document'],
    mutationFn: async () => del(`/api/documents/${docId}`, { isClient: true }),
    onSuccess: () => {
      toast({
        title: 'Document deleted successfully',
        description: 'The document has been deleted successfully.',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: ['documents'] })
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
    <ConfirmAction
      trigger={
        <button className="w-full text-sm text-left flex items-center gap-1">
          <Trash2Icon className="size-4" />
          Delete Document
        </button>
      }
      title="Delete Document"
      description={`Are you sure you want to delete the document? This action cannot be undone.`}
      actionProps={{
        action: () => deleteDocument.mutateAsync(),
        isLoading: deleteDocument.isPending,
        buttonProps: {
          variant: 'destructive',
          children: 'Delete',
        },
      }}
    />
  )
}
