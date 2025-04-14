/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FileIcon, PlusCircle, Trash2 } from 'lucide-react'
import React, { useMemo } from 'react'
import { MultiSelect } from '@/components/ui/multi-select'
import { useDepartmentSearch } from '@/app/(root)/hooks/use-department-search'
import { useSearchUsers } from '@/app/(root)/hooks/use-user-search'
import { toast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { post } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import { useUser } from '@/providers/user.provider'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const formSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  files: z
    .array(
      z.object({
        file: z
          .custom<File>()
          .refine((file) => file instanceof File, 'Please select a file')
          .refine((file) => file.size <= MAX_FILE_SIZE, `File size should be less than 5MB`),
      }),
    )
    .min(1, 'At least one file is required'),
  departments: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional()
    .default([]),
  users: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional()
    .default([]),
  send_to_all_departments: z.boolean().optional(),
  send_to_all_users: z.boolean().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function CreateDocument() {
  const { user } = useUser()
  const [isUploadingFile, setIsUploadingFile] = React.useState(false)
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      files: [{ file: new File([], '') }],
      departments: [],
      users: [],
      send_to_all_departments: false,
      send_to_all_users: false,
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'files',
    control: form.control,
  })

  const { deptSearchString, setDeptSearchString, departments } = useDepartmentSearch()
  const { userSearchString, setUserSearchString, users } = useSearchUsers()

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

  //   @todo: move this to a reuseable hook
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
          variant: 'destructive',
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
      subject: data.subject,
      metadata: {
        send_to_all_departments: data.send_to_all_departments,
        send_to_all_users: data.send_to_all_users,
      },
      status: 'published',
      users: data.send_to_all_users ? [] : data.users.map(({ value }) => value),
      departments: data.send_to_all_departments ? [] : data.departments.map(({ value }) => value),
      files: uploadedFiles.map((file) => {
        return {
          url: file?.data?.url,
          type: file.data?.mimeType,
        }
      }),
    })
  }

  const usersOptions = useMemo(() => {
    return users.data?.data?.items
      ?.filter((u: any) => u.id !== user?.id)
      ?.map((u: any) => ({
        label: `${u.first_name} ${u.last_name}`,
        value: u.id,
      }))
  }, [users.data, user?.id])

  const { send_to_all_departments, send_to_all_users } = form.watch()

  return (
    <div className="grid grid-cols-5 lg:grid-cols-5">
      <div className="col-span-full">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Create Documents</h1>
            <p className="mt-1 text-sm text-gray-700">Share documents with your team members.</p>
          </div>
        </div>
        <div className="mt-8 flow-root bg-white p-4 shadow-sm border border-gray-200 overflow-hidden rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <div className="border p-4 rounded-lg space-y-4">
                <FormField
                  control={form.control}
                  name="send_to_all_departments"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Send to all departments</FormLabel>
                        <FormDescription>Toggle on to share with all departments</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                            if (checked) {
                              form.setValue('departments', [])
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {!send_to_all_departments && (
                  <FormField
                    control={form.control}
                    name="departments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Department(s)</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={
                              departments.data?.data?.items?.map((d: any) => ({
                                label: d.name,
                                value: d.id,
                              })) ?? []
                            }
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
                )}
              </div>

              <div className="border p-4 rounded-lg space-y-4">
                <FormField
                  control={form.control}
                  name="send_to_all_users"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Send to all users</FormLabel>
                        <FormDescription>Toggle on to share with all users</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                            if (checked) {
                              form.setValue('departments', [])
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {!send_to_all_users && (
                  <FormField
                    control={form.control}
                    name="users"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select User(s)</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={usersOptions ?? []}
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
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium flex flex-col mb-0">
                    Attachments
                    <FormDescription className="mt-0 pt-0">
                      Allowed file types: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB each)
                    </FormDescription>
                  </Label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {fields.map((field, index) => (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`files.${index}.file`}
                      render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="flex items-center justify-between">
                            <span>{`File ${index + 1}`}</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="border rounded-md overflow-hidden bg-background">
                                <label
                                  htmlFor={`file-input-${index}`}
                                  className="flex items-center cursor-pointer"
                                >
                                  <div className="bg-muted px-3 py-2 border-r">
                                    <FileIcon className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <span
                                    className={`px-3 py-2 text-sm truncate flex-1 ${
                                      !value ? 'text-muted-foreground' : ''
                                    }`}
                                  >
                                    {value ? value.name : 'Choose file'}
                                  </span>
                                </label>
                                <input
                                  id={`file-input-${index}`}
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                      if (file.size > 10 * 1024 * 1024) {
                                        alert('File size exceeds 10MB limit')
                                        return
                                      }
                                      onChange(file)
                                    }
                                  }}
                                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                                  {...rest}
                                />
                              </div>
                              {index > 0 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="absolute -right-2 -top-2 h-6 w-6 rounded-full border shadow-sm"
                                  onClick={() => remove(index)}
                                >
                                  <Trash2 className="h-3 w-3" />
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
                  onClick={() => append({ file: new File([], '') })}
                  className="mt-2"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Another File
                </Button>
              </div>
              <Button type="submit" isLoading={isUploadingFile || createDocument.isPending}>
                Create Document
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
