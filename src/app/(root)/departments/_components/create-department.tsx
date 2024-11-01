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
import { useMutation } from '@tanstack/react-query'
import {  post } from '@/lib/fetch'
import { toast } from 'sonner'


const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Subject must be at least 2 characters.',
  }),
  hod: z.array(z.string().min(1)).optional(),
})

export const CreateDepartment = ({onSuccess}: {onSuccess?(): void}) => {
  const [open, setOpen] = React.useState(false)
  const [userSearchString, setUserSearchString] = useState('tommmmmmmm')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      hod: []
    },
  })

  // const { isFetching, data } = useQuery<any>({
  //   queryKey: ['users', userSearchString],
  //   queryFn: async () =>
  //     get(`/api/users?search=${userSearchString}`, {
  //       isClient: true,
  //     }),
  // })

  const createDepartment = useMutation({
    mutationKey: ['create-department'],
    mutationFn: async (name: string, hod_id?: string) =>
      post(`/api/departments`, {
        isClient: true,
        body: { name },
      }),
    onSuccess: (data: any) => {
      toast.success(data?.message ?? 'Department created successfully.')
      setOpen(false)
      onSuccess && onSuccess?.()
    },
    onError: (error) => {
      toast.error('Unable to create department')
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createDepartment.mutate(values.name)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter department name" {...field} />
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
