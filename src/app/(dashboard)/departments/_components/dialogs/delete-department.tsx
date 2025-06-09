import { ConfirmAction } from '@/components/confirm-action/confirm-action'
import { toast } from '@/hooks/use-toast'
import { del } from '@/lib/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'

export const DeleteDepartment = ({ departmentId }: { departmentId: string }) => {
  const queryClient = useQueryClient()

  const deleteDepartment = useMutation({
    mutationKey: ['delete-department'],
    mutationFn: async () => del(`/api/departments/${departmentId}`, { isClient: true }),
    onSuccess: () => {
      toast({
        title: 'Department deleted successfully',
        description: 'The department has been deleted successfully.',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: ['departments'] })
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
          Delete Department
        </button>
      }
      title="Delete Department"
      description={`Are you sure you want to delete the department? This action cannot be undone.`}
      actionProps={{
        action: () => deleteDepartment.mutateAsync(),
        isLoading: deleteDepartment.isPending,
        buttonProps: {
          variant: 'destructive',
          children: 'Delete',
        },
      }}
    />
  )
}
