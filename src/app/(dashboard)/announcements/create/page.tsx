'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { MultiSelect } from '@/components/ui/multi-select'
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
import dynamic from 'next/dynamic'
import DOMPurify from 'dompurify'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { post } from '@/lib/fetch'

import 'react-quill/dist/quill.snow.css'
import { toast } from '@/hooks/use-toast'
import { useUser } from '@/providers/user.provider'
import { Switch } from '@/components/ui/switch'
import { useMemo } from 'react'
import { useDepartmentSearch } from '@/hooks/use-department-search'
import { useSearchUsers } from '@/hooks/use-user-search'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const formSchema = z.object({
  subject: z.string().min(2, {
    message: 'Subject must be at least 2 characters.',
  }),
  body: z.string().min(2, {
    message: 'Body must be at least 2 characters.',
  }),
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

export default function CreateAnnouncement() {
  const { user } = useUser()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      body: '',
      departments: [],
      users: [],
      send_to_all_departments: false,
      send_to_all_users: false,
    },
  })

  const { deptSearchString, setDeptSearchString, departments } = useDepartmentSearch()
  const { userSearchString, setUserSearchString, users } = useSearchUsers()

  const createAnnouncement = useMutation({
    mutationKey: ['create-department'],
    mutationFn: async (payload: Record<string, unknown>) =>
      post(`/api/announcements`, {
        isClient: true,
        body: {
          ...payload,
          body: DOMPurify.sanitize(payload.body as string),
          status: 'published',
        },
      }),
    onSuccess: () => {
      toast({
        title: 'Announcement created',
        description: 'The announcement has been successfully created',
      })
      router.push('/announcements')
    },
    onError: (error) => {
      toast({
        title: error?.message ?? 'An error occurred',
        description: 'An error occurred while creating the announcement',
        variant: 'destructive',
      })
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    createAnnouncement.mutate({
      ...data,
      metadata: {
        send_to_all_departments: data.send_to_all_departments,
        send_to_all_users: data.send_to_all_users,
      },
      users: data.send_to_all_users ? [] : data.users.map(({ value }) => value),
      departments: data.send_to_all_departments ? [] : data.departments.map(({ value }) => value),
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
    <div className="sm:px-6 lg:px-0">
      <div className="sm:flex sm:items-center">
        <div className="flex items-center justify-between sm:flex-auto ">
          <div className="flex flex-col">
            <h1 className="text-left font-semibold leading-6 text-gray-900">Create Announcement</h1>
            <p className="mt-2 text-center text-sm text-gray-700">
              Fill out the form below to create an announcement.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root bg-white p-6 shadow-sm border border-gray-200 overflow-hidden rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Announcement Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Description</FormLabel>
                  <FormControl>
                    <ReactQuill
                      value={field.value}
                      onChange={field.onChange}
                      className="text-gray-900"
                      placeholder="Write the details of your announcement here..."
                    />
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
                    <FormLabel>Send to all departments</FormLabel>
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
                      <FormLabel>
                        Select the department(s) to share the announcement with.
                      </FormLabel>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <Button type="submit" isLoading={createAnnouncement.isPending}>
              Create Announcement
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
