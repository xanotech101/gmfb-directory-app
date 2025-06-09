import { ConfirmAction } from '@/components/confirm-action/confirm-action'
import { toast } from '@/hooks/use-toast'
import { del } from '@/lib/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'

export const DeleteAnnouncement = ({ announcementId }: { announcementId: string }) => {
  const queryClient = useQueryClient()

  const deleteAnnouncement = useMutation({
    mutationKey: ['delete-announcement'],
    mutationFn: async () => del(`/api/announcements/${announcementId}`, { isClient: true }),
    onSuccess: () => {
      toast({
        title: 'Announcement deleted successfully',
        description: 'The announcement has been deleted successfully.',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: ['announcements'] })
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
          Delete Announcement
        </button>
      }
      title="Delete Announcement"
      description={`Are you sure you want to delete the announcement? This action cannot be undone.`}
      actionProps={{
        action: () => deleteAnnouncement.mutateAsync(),
        isLoading: deleteAnnouncement.isPending,
        buttonProps: {
          variant: 'destructive',
          children: 'Delete',
        },
      }}
    />
  )
}
