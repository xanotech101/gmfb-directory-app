/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import React, { useState } from 'react'
import { MultiSelect } from '@/components/ui/multi-select'
import { toast } from '@/hooks/use-toast'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useDepartmentSearch } from '../../../../../hooks/use-department-search'
import { useSearchUsers } from '../../../../../hooks/use-user-search'
import { formSchema, type FormValues } from './schema'
import FilePicker, { type FileItem } from '@/components/file-picker/file-picker'
import FilePreview from '@/components/file-preview/file-preview'
import { Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetFolders } from '@/app/(dashboard)/folders/hooks/use-get-folders'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface FileWithItemFolder extends FileItem {
  folder_id?: string
}
interface DocumentFormProps {
  onSubmit: UseMutateAsyncFunction<unknown, Error, Record<string, unknown>, unknown>
  defaultValues?: Partial<FormValues> & {
    files?: FileWithItemFolder[]
  }
}

export function DocumentForm({ defaultValues, onSubmit }: DocumentFormProps) {
  const router = useRouter()
  const { folders } = useGetFolders()
  const { deptSearchString, setDeptSearchString, departments } = useDepartmentSearch()
  const { userSearchString, setUserSearchString, users } = useSearchUsers()
  const [isUploadingFile, setIsUploadingFile] = useState(false)
  const [files, setFiles] = useState<FileWithItemFolder[]>(defaultValues?.files ?? [])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(defaultValues ?? {}),
    },
  })

  //   @todo: move this to a reuseable hook
  const uploadFiles = async (files: { file: File; folder_id?: string }[]) => {
    setIsUploadingFile(true)
    try {
      const promises = files.map((file) => {
        const formData = new FormData()
        formData.append('file', file.file)
        formData.append('folder_id', file.folder_id ?? '')
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

  const submitForm: SubmitHandler<FormValues> = async (data) => {
    const filesToUpload = files
      .filter((file) => file.file instanceof File)
      .map((file) => ({ file: file.file as File, folder_id: file.folder_id }))

    const urlFiles = files
      .filter((file) => typeof file.file === 'string')
      .map((file) => ({ url: file.file, type: file.type, folder_id: file.folder_id || null }))

    const uploadedFiles = await uploadFiles(filesToUpload)
    await onSubmit({
      subject: data.subject,
      metadata: {
        send_to_all_departments: data.send_to_all_departments,
        send_to_all_users: data.send_to_all_users,
      },
      status: 'published',
      users: data.send_to_all_users ? [] : data.users.map(({ value }) => value),
      departments: data.send_to_all_departments ? [] : data.departments.map(({ value }) => value),
      files: uploadedFiles
        .map((file) => {
          return {
            url: file?.data?.url,
            type: file.data?.mimeType,
            folder_id: file.folder_id || null,
          }
        })
        .concat(urlFiles),
    }).then(() => {
      router.push('/documents')
    })
  }

  const { send_to_all_departments, send_to_all_users } = form.watch()

  return (
    <div className="mt-8 flow-root bg-white p-6 shadow-sm border border-gray-200 overflow-hidden rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">
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
                    <FormLabel className="mb-0">Send to all departments</FormLabel>
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
                    <FormLabel>Select the department(s) to share the document with.</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={departments.map((d: any) => ({
                          label: d.name,
                          value: d.id,
                        }))}
                        onValueChange={field.onChange}
                        defaultValue={defaultValues?.departments ?? []}
                        placeholder="Select departments"
                        variant="inverted"
                        maxCount={6}
                        filterValue={deptSearchString}
                        onFilterChange={setDeptSearchString}
                      />
                    </FormControl>
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
                    <FormLabel className="mb-0">Send to all users</FormLabel>
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
                    <FormLabel>Select the user(s) to share the announcement with.</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={users}
                        onValueChange={field.onChange}
                        defaultValue={defaultValues?.users ?? []}
                        placeholder="Select users"
                        variant="inverted"
                        maxCount={6}
                        filterValue={userSearchString}
                        onFilterChange={setUserSearchString}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <div>
            <Label className="text-base font-medium hidden" htmlFor="files">
              Attachments
            </Label>
            <div className="grid grid-cols-6 gap-4 mb-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="relative border p-4 rounded-lg bg-gray-50 flex flex-col items-center gap-3"
                >
                  <div className="border p-2 rounded-lg bg-white">
                    <FilePreview file={file.file} type={file.type} />
                  </div>
                  <Select
                    onValueChange={(value) => {
                      setFiles((prev) =>
                        prev.map((f) => (f.id === file.id ? { ...f, folder_id: value } : f)),
                      )
                    }}
                    defaultValue={file.folder_id}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select a folder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Folders</SelectLabel>
                        {folders?.map((folder: { id: string; name: string }) => (
                          <SelectItem key={folder.id} value={folder.id}>
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-5 -right-3 z-10 m-0 !bg-transparent"
                    onClick={() => setFiles((prev) => prev.filter((f) => f.id !== file.id))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <FilePicker
              setFiles={setFiles}
              id="files"
              placeholder="Allowed file types: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB each)"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            />
          </div>
          <Button type="submit" isLoading={isUploadingFile || form.formState.isSubmitting}>
            {defaultValues ? 'Update Document' : 'Create Document'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
