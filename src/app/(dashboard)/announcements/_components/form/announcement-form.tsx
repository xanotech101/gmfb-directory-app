import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { FormValues, formSchema } from './schema'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDepartmentSearch } from '@/hooks/use-department-search'
import { useSearchUsers } from '@/hooks/use-user-search'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { MultiSelect } from '@/components/ui/multi-select'
import { Button } from '@/components/ui/button'

interface AnnouncementFormProps {
  onSubmit: UseMutateAsyncFunction<unknown, Error, Record<string, unknown>, unknown>
  defaultValues?: Partial<FormValues>
}
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export const AnnouncementForm = ({ onSubmit, defaultValues }: AnnouncementFormProps) => {
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(defaultValues ?? {}),
    },
  })

  const { deptSearchString, setDeptSearchString, departments } = useDepartmentSearch()
  const { userSearchString, setUserSearchString, users } = useSearchUsers()

  const submitForm: SubmitHandler<FormValues> = async (data) => {
    await onSubmit({
      ...data,
      metadata: {
        send_to_all_departments: data.send_to_all_departments,
        send_to_all_users: data.send_to_all_users,
      },
      users: data.send_to_all_users ? [] : data.users.map(({ value }) => value),
      departments: data.send_to_all_departments ? [] : data.departments.map(({ value }) => value),
      status: 'published',
    }).then(() => {
      router.push('/announcements')
    })
  }

  const { send_to_all_departments, send_to_all_users } = form.watch()

  return (
    <div className="mt-8 flow-root bg-white p-6 shadow-sm border border-gray-200 overflow-hidden rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-8">
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
                    <FormLabel>Select the department(s) to share the document with.</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={departments}
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
                        options={users}
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
          <Button type="submit" isLoading={form.formState.isSubmitting}>
            {defaultValues ? 'Update Announcement' : 'Create Announcement'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
