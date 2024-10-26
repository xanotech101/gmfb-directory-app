/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { post } from '@/lib/fetch'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
})

interface CreateEditRoleFormProps {
  type: 'create' | 'edit',
  onSuccess?: (message?: string) => void,
  onError?: (message?: string) => void,
  onCompleted?: () => void,
}

export const CreateEditRoleForm = ({ type, onSuccess, onError, onCompleted}: CreateEditRoleFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const createRole = useMutation({
    mutationKey: ['create-role'],
    mutationFn: async (payload: z.infer<typeof formSchema>) =>
      post(`/api/roles`, {
        isClient: true,
        body: payload,
      }),
    onSuccess: (data) => {
      console.log(data, 'response after submitting')
      onSuccess?.()
      toast.success('Role created successfully.')
    },
    onError: (error) => {
      onError?.()
      toast.error(error.message)
    },
    onSettled: () => {
      onCompleted?.()
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (type === 'create') {
      createRole.mutate(values);
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
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
               <textarea
                 rows={4}
                 {...field}
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#891C69] sm:text-sm sm:leading-6"
               />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
          isLoading={createRole.status === 'pending'}
        >
          <span className="capitalize mr-1">{type}</span> role
        </Button>
      </form>
    </Form>
  )
}
