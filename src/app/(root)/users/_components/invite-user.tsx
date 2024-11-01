/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { get, post } from '@/lib/fetch'
import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { MultiSelect } from '@/components/ui/multi-select'
import { toast } from 'sonner'

const formSchema = z.object({
  first_name: z.string().min(1, {
    message: 'Please enter a valid first name.',
  }),
  last_name: z.string().min(1, {
    message: 'Please enter a valid last name.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  role_id: z.string().min(1, {
    message: 'Please select a role.',
  }),
  gender: z.string().min(1, {
    message: 'Please select your gender.',
  }),
  departments: z.array(z.string()).optional().default([]),
})

interface InviteUserProps {
  onSuccess?: (message?: string) => void,
  onError?: (message?: string) => void,
  onCompleted?: (message?: string) => void,
}

export const InviteUser = ({onSuccess, onError, onCompleted}: InviteUserProps) => {
  const [open, setOpen] = React.useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      role_id: '',
      gender: '',
      departments: [],
    },
  })

  // todo: move to a re-useable hook as it is used somewhere else also
  const roles = useQuery<any>({
    queryKey: ['roles'],
    queryFn: async () =>
      get("/api/roles", {
        isClient: true,
      }),
  })

  const [deptSearchString, setDeptSearchString] = useState('')
  const [debouncedDeptSearchString] = useDebounce(deptSearchString, 500)
  const departments = useQuery<any>({
    queryKey: ['search-departments', debouncedDeptSearchString],
    queryFn: async () =>
      get(`/api/departments?search=${debouncedDeptSearchString}&limit=5`, {
        isClient: true,
      }),
  })

  const inviteUser = useMutation({
    mutationKey: ['invite-user'],
    mutationFn: async (payload: z.infer<typeof formSchema>) =>
      post(`/api/users`, {
        isClient: true,
        body: payload,
      }),
    onSuccess: () => {
      onSuccess?.()
      setOpen(false)
      toast.success('Invite sent successfully.')
    },
    onError: (error) => {
      console.log(error)
      onError?.()
      toast.error(error.message)
    },
    onSettled: () => {
      onCompleted?.()
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => inviteUser.mutate(values)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Invite User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Invite User
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Add the details of the user you want to invite here.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue className="text-sm" placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles?.data?.data?.map((r: any) => (
                          <SelectItem value={r.id} key={r.id}>{r.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue className="text-sm" placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" isLoading={inviteUser.status === 'pending'}>
              Invite User
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
