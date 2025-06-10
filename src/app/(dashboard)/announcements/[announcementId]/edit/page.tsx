/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useMutation } from '@tanstack/react-query'
import { put } from '@/lib/fetch'
import { toast } from '@/hooks/use-toast'
import { useParams } from 'next/navigation'
import { useGetAnnouncement } from '../../hooks/use-get-announcement'
import { AnnouncementForm } from '../../_components/form/announcement-form'
import { useBreadcrumbs } from '@/providers/breadcrumb.provider'

export default function EditAnnouncement() {
  const { announcementId } = useParams<{ announcementId: string }>()
  const { data: announcement, isLoading, isError } = useGetAnnouncement(announcementId)
  useBreadcrumbs([
    { label: 'Announcements', href: '/announcements' },
    { label: 'Edit Announcement', href: '#' },
  ])

  const updateAnnouncement = useMutation({
    mutationKey: ['update-announcement'],
    mutationFn: async (payload: Record<string, unknown>) =>
      put(`/api/announcements/${announcementId}`, {
        isClient: true,
        body: payload,
      }),
    onSuccess: () => {
      toast({
        title: 'Announcement updated',
        description: 'The announcement has been successfully updated',
      })
    },
    onError: (error) => {
      toast({
        title: error?.message ?? 'An error occurred',
        description: 'An error occurred while updating the announcement',
        variant: 'destructive',
      })
    },
  })

  if (isLoading) {
    return <p>Loading document...</p>
  }

  if (isError) {
    return <p>Error loading document details.</p>
  }

  return (
    <>
      <h1 className="text-base font-semibold leading-6 text-gray-900">Edit Announcement</h1>
      <p className="mt-1 text-sm text-gray-700">Update the announcement details below.</p>
      <AnnouncementForm
        defaultValues={{
          subject: announcement.subject,
          body: announcement.body,
          users: announcement.users.map(
            (user: { id: string; first_name: string; last_name: string }) => ({
              label: user.first_name + ' ' + user.last_name,
              value: user.id,
            }),
          ),
          departments: announcement.departments.map((dept: { id: string; name: string }) => ({
            label: dept.name,
            value: dept.id,
          })),
          send_to_all_users: announcement.metadata?.send_to_all_users || false,
          send_to_all_departments: announcement.metadata?.send_to_all_departments || false,
        }}
        onSubmit={updateAnnouncement.mutateAsync}
      />
    </>
  )
}
