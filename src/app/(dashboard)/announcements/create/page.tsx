'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import DOMPurify from 'dompurify'
import { useMutation } from '@tanstack/react-query'
import { post } from '@/lib/fetch'
import { toast } from '@/hooks/use-toast'
import { AnnouncementForm } from '../_components/form/announcement-form'

export default function CreateAnnouncement() {
  const createAnnouncement = useMutation({
    mutationKey: ['create-department'],
    mutationFn: async (payload: Record<string, unknown>) =>
      post(`/api/announcements`, {
        isClient: true,
        body: {
          ...payload,
          body: DOMPurify.sanitize(payload.body as string),
        },
      }),
    onSuccess: () => {
      toast({
        title: 'Announcement created',
        description: 'The announcement has been successfully created',
      })
    },
    onError: (error) => {
      toast({
        title: error?.message ?? 'An error occurred',
        description: 'An error occurred while creating the announcement',
        variant: 'destructive',
      })
    },
  })

  return (
    <>
      <h1 className="text-base font-semibold leading-6 text-gray-900">Create Announcement</h1>
      <p className="mt-2 text-sm text-gray-700">
        Fill out the form below to create an announcement.
      </p>
      <AnnouncementForm onSubmit={createAnnouncement.mutateAsync} />
    </>
  )
}
