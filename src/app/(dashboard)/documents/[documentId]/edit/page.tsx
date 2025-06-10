/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useMutation } from '@tanstack/react-query'
import { put } from '@/lib/fetch'
import { toast } from '@/hooks/use-toast'
import { useRouter, useParams } from 'next/navigation'
import { DocumentForm } from '../../_components/form/document-form'
import { useGetDocument } from '../../hooks/use-get-document'
import { useBreadcrumbs } from '@/providers/breadcrumb.provider'

export default function EditDocument() {
  const router = useRouter()
  useBreadcrumbs([
    { label: 'Documents', href: '/documents' },
    { label: 'Edit Document', href: '#' },
  ])
  const { documentId } = useParams<{ documentId: string }>()
  const { data: document, isLoading, isError } = useGetDocument(documentId)

  const updateDocument = useMutation({
    mutationKey: ['update-document'],
    mutationFn: async (payload: Record<string, unknown>) =>
      put(`/api/documents/${documentId}`, {
        isClient: true,
        body: payload,
      }),
    onSuccess: () => {
      toast({
        title: 'Document updated',
        description: 'The document has been successfully updated',
      })
      router.push('/documents')
    },
    onError: (error) => {
      toast({
        title: error?.message ?? 'An error occurred',
        description: 'An error occurred while updating the document',
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
      <h1 className="text-base font-semibold leading-6 text-gray-900">Edit Document</h1>
      <p className="mt-1 text-sm text-gray-700">Update the document details below.</p>
      <DocumentForm
        defaultValues={{
          subject: document.subject,
          files: document.files?.map((file: any) => ({
            ...file,
            file: file.url,
            folder_id: file.folder?.id || null,
          })),
          users: document.users.map(
            (user: { id: string; first_name: string; last_name: string }) => ({
              label: user.first_name + ' ' + user.last_name,
              value: user.id,
            }),
          ),
          departments: document.departments.map((dept: { id: string; name: string }) => ({
            label: dept.name,
            value: dept.id,
          })),
          send_to_all_users: document.metadata?.send_to_all_users || false,
          send_to_all_departments: document.metadata?.send_to_all_departments || false,
        }}
        onSubmit={updateDocument.mutateAsync}
      />
    </>
  )
}
