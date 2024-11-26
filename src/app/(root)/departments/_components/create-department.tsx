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
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { get, post } from '@/lib/fetch'
import { useDebounce } from 'use-debounce'
import { MultiSelect } from '@/components/ui/multi-select'
import { toast } from '@/hooks/use-toast'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Subject must be at least 2 characters.',
  }),
  hod: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).min(1).optional()
})

export const CreateDepartment = ({ onSuccess }: { onSuccess?(): void }) => {
  const [open, setOpen] = useState(false)

  const [userSearchString, setUserSearchString] = useState('')
  const [debouncedUserSearchString] = useDebounce(userSearchString, 500)
  const users = useQuery<any>({
    queryKey: ['users', debouncedUserSearchString],
    queryFn: async () =>
      get(`/api/users?search=${debouncedUserSearchString}`, {
        isClient: true,
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      hod: [],
    },
  })
  const createDepartment = useMutation({
    mutationKey: ['create-department'],
    mutationFn: async ({name, hod_id}: {name: string, hod_id?: string}) =>
      post(`/api/departments`, {
        isClient: true,
        body: { name, hod_id },
      }),
    onSuccess: () => {
      toast({
        title: 'Department created successfully.',
        variant: 'default',
      })
      setOpen(false)
      onSuccess?.()
    },
    onError: (error) => {
      toast({
        title: error?.message ?? 'Department created successfully.',
        variant: 'destructive',
      })
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createDepartment.mutate({name: values.name, hod_id: values?.hod?.[0]?.value})
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      form.reset()
      setOpen(open)
    }}>
      <DialogTrigger asChild>
        <Button>Create Department</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Create a new department
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Fill in the form below to create a new department
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name <span className="text-red-600">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter department name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hod</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={users.data?.data?.items?.map((u: any) => ({
                        label: `${u.first_name} ${u.last_name}`,
                        value: u.id,
                      })) ?? []}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select hod"
                      variant="inverted"
                      animation={2}
                      maxCount={1}
                      filterValue={userSearchString}
                      onFilterChange={setUserSearchString}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" isLoading={createDepartment.status === 'pending'}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
