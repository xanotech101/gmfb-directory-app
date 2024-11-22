/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { PlusCircle, Trash2 } from 'lucide-react'
import React from 'react'
import { MultiSelect } from '@/components/ui/multi-select'
import { useDepartmentSearch } from '@/app/(root)/hooks/use-department-search'
import { useUserSearch } from '@/app/(root)/hooks/use-user-search'
import { toast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { post } from '@/lib/fetch'
import { useRouter } from 'next/navigation'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 10MB

const formSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  files: z.array(z.object({
    file: z.custom<File>()
      .refine((file) => file instanceof File, 'Please select a file')
      .refine((file) => file.size <= MAX_FILE_SIZE, `File size should be less than 5MB`),
  })).min(1, 'At least one file is required'),
  departments: z.array(z.string().min(1)).optional().default([]),
  users: z.array(z.string().min(1)).optional().default([]),
})

type FormValues = z.infer<typeof formSchema>

export default function CreateDocument() {
  const [isUploadingFile, setIsUploadingFile] = React.useState(false)
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      files: [{ file: new File([], '') }],
      departments: [],
      users: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'files',
    control: form.control,
  })

  const { deptSearchString, setDeptSearchString,  departments} = useDepartmentSearch()
  const { userSearchString, setUserSearchString, users} = useUserSearch()

  const createDocument = useMutation({
    mutationKey: ['create-department'],
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

  const uploadFiles = async (files: File[]) => {
    setIsUploadingFile(true)
    try {
      const promises = files.map((file) => {
        const formData = new FormData()
        formData.append('file', file)
        return fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
      })

      const response = await Promise.all(promises)

      if (!response.every((res) => res.ok)) {
        toast({
          title: 'Failed to upload files',
          duration: 5000,
          variant: 'destructive'
        })
        throw new Error('Failed to upload files')
      }

      return await Promise.all(response.map((res) => res.json()))

    } catch (error) {
      throw error
    } finally {
      setIsUploadingFile(false)
    }
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const files = data.files
    const filteredFiles = files.filter(({ file }) => file?.size > 0)
    const uploadedFiles = await uploadFiles(filteredFiles.map(({ file }) => file))
    createDocument.mutate({
      ...data,
      status: 'published',
      files: uploadedFiles.map((file) => {
        return {
          url: file?.data?.url,
          type: file.data?.mimeType,
        }
      }),
    })
  }

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Create Documents</h1>
          <p className="mt-2 text-sm text-gray-700">
            Share documents with your team members.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root bg-white p-4 shadow-sm border border-gray-200 overflow-hidden rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the subject" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={departments.data?.data?.items?.map((d: any) => ({
                        label: d.name,
                        value: d.id,
                      })) ?? []}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select departments"
                      variant="inverted"
                      animation={2}
                      maxCount={5}
                      filterValue={deptSearchString}
                      onFilterChange={setDeptSearchString}
                    />
                  </FormControl>
                  <FormDescription>
                    Select the department(s) to share the announcement with.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="users"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Users</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={users.data?.data?.items?.map((u: any) => ({
                        label: `${u.first_name} ${u.last_name}`,
                        value: u.id,
                      })) ?? []}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select users"
                      variant="inverted"
                      animation={2}
                      maxCount={6}
                      filterValue={userSearchString}
                      onFilterChange={setUserSearchString}
                    />
                  </FormControl>
                  <FormDescription>
                    Select the user(s) to share the announcement with.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <div className="grid grid-cols-4 gap-5">
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`files.${index}.file`}
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>{`File ${index + 1}`}</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  onChange(file)
                                }
                              }}
                              {...rest}
                            />
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => remove(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove file</span>
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={fields.length >= 5}
                className="mt-2"
                onClick={() => append({ file: new File([], '') })}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Another File
              </Button>
            </div>
            <Button type="submit" isLoading={isUploadingFile || createDocument.isPending}>
              Create Document
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}

