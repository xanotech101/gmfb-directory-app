import { ConfirmAction } from '@/components/confirm-action/confirm-action'
import { toast } from '@/hooks/use-toast'
import { del } from '@/lib/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'

export const DeleteUser = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient()

  const deleteUser = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async () =>
      del(`/api/users/${userId}`, {
        isClient: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error?.message ?? 'An error occurred',
      })
    },
  })
  return (
    <ConfirmAction
      trigger={
        <button className="w-full text-sm flex items-center gap-1">
          <Trash2Icon className="size-4" />
          Delete User
        </button>
      }
      title="Delete User"
      description="Are you sure you want to delete this user? This action cannot be undone."
      actionProps={{
        action: () => deleteUser.mutateAsync(),
        isLoading: deleteUser.isPending,
        buttonProps: {
          variant: 'destructive',
          children: 'Delete',
        },
      }}
    />
  )
}
