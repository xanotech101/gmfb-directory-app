/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useMutation } from '@tanstack/react-query'
import { post } from '@/lib/fetch'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { DocumentForm } from '../_components/form/document-form'

export default function CreateDocument() {
  const router = useRouter()

  const createDocument = useMutation({
    mutationKey: ['create-document'],
    mutationFn: async (payload: Record<string, unknown>) =>
      post(`/api/documents`, {
        isClient: true,
        body: payload,
      }),
    onSuccess: () => {
      toast({
        title: 'Document created',
        description: 'The document has been successfully created',
      })
      router.push('/documents')
    },
    onError: (error) => {
      toast({
        title: error?.message ?? 'An error occurred',
        description: 'An error occurred while creating the document',
        variant: 'destructive',
      })
    },
  })

  return (
    <>
      <h1 className="text-base font-semibold leading-6 text-gray-900">Create Documents</h1>
      <p className="mt-1 text-sm text-gray-700">Share documents with your team members.</p>
      <DocumentForm onSubmit={createDocument.mutateAsync} />
    </>
  )
}
