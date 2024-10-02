'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PreviewAnnouncement } from './_components/preview-announcement'
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

const departments = [
  {
    value: 'Marketing',
    label: 'Marketing',
  },
  {
    value: 'Information Technology',
    label: 'Information Technology',
  },
  {
    value: 'Human Resources',
    label: 'Human Resources',
  },
  {
    value: 'Sales',
    label: 'Sales',
  },
  {
    value: 'Agents',
    label: 'Agents',
  },
]

const users = [
  {
    value: 'John Doe',
    label: 'John Doe',
  },
  {
    value: 'John Smith',
    label: 'John Smith',
  },
  {
    value: 'Dan Doe',
    label: 'Dan Doe',
  },
  {
    value: 'Jane Doe',
    label: 'Jane Doe',
  },
  {
    value: 'Will Doe',
    label: 'Will Doe',
  },
]

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  subject: z.string().min(2, {
    message: 'Subject must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  departments: z.array(z.string().min(1)).min(1).nonempty({
    message: 'Please select at least one department.',
  }),
  users: z.array(z.string().min(1)).min(1).nonempty({
    message: 'Please select at least one user.',
  }),
})

export default function CreateAnnouncement() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      subject: '',
      description: '',
      departments: [],
      users: [],
    },
  })

  const formData = form.watch()

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="sm:px-6 lg:px-0">
      <div className="sm:flex sm:items-center">
        <div className="flex items-center justify-between sm:flex-auto ">
          <div className="flex flex-col">
            <h1 className="text-left font-semibold leading-6 text-gray-900">Create Announcement</h1>
            <p className="mt-2 text-center text-sm text-gray-700">
              A form to create a new announcement.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <PreviewAnnouncement
              announcementData={{
                title: formData.title,
                subject: formData.subject,
                body: formData.description,
                departments: formData.departments,
                users: formData.users,
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Announcement Title" {...field} />
                  </FormControl>
                  <FormDescription>This is the title of the announcement.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Subject" {...field} />
                  </FormControl>
                  <FormDescription>What is the subject of the announcement?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <ReactQuill
                      value={field.value}
                      onChange={field.onChange}
                      className="text-gray-900"
                      placeholder="Write the details of your announcement here..."
                    />
                  </FormControl>
                  <FormDescription>This is the body of your announcement.</FormDescription>
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
                      options={departments}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select options"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
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
                  <FormLabel>User</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={users}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select options"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Select the user(s) to share the announcement with.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
