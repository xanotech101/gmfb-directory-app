/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { PlusCircle, Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import { MultiSelect } from '@/components/ui/multi-select'

const MAX_FILE_SIZE = 5000000 // 5MB

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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  // todo: move to a re-useable hook
  const [deptSearchString, setDeptSearchString] = useState('')
  const [debouncedDeptSearchString] = useDebounce(deptSearchString, 500)
  const departments = useQuery<any>({
    queryKey: ['search-departments', debouncedDeptSearchString],
    queryFn: async () =>
      get(`/api/departments?search=${debouncedDeptSearchString}&limit=5`, {
        isClient: true,
      }),
  })

  const [userSearchString, setUserSearchString] = useState('')
  const [debouncedUserSearchString] = useDebounce(userSearchString, 500)
  const users = useQuery<any>({
    queryKey: ['users', debouncedUserSearchString],
    queryFn: async () =>
      get(`/api/users?search=${debouncedUserSearchString}`, {
        isClient: true,
      }),
  })

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
                className="mt-2"
                onClick={() => append({ file: new File([], '') })}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Another File
              </Button>
            </div>
            <Button type="submit">Share Documents</Button>
          </form>
        </Form>
      </div>
    </>
  )
}

