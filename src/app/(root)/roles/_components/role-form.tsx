/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { UseMutationResult } from '@tanstack/react-query'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name is required',
  }),
  description: z.string().min(2, {
    message: 'Description is required',
  }),
})

interface RoleFormProps {
  roleAction: UseMutationResult<unknown, Error, z.infer<typeof formSchema>, unknown>
  defaultValues?: z.infer<typeof formSchema>
}

export const RoleForm = ({ roleAction, defaultValues }: RoleFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    roleAction.mutate(data)
  }

  const errors = form.formState.errors

  return (
    <Form {...form}>
      <form className="space-y-8">
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
              {errors.description && <FormMessage>{errors.description.message}</FormMessage>}
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          isLoading={roleAction.status === 'pending'}
          onClick={() => form.handleSubmit(onSubmit)()}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
