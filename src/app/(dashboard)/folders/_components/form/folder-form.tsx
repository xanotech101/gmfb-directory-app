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
import { UseMutationResult } from '@tanstack/react-query'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name is required',
  }),
})

interface FolderFormProps {
  formAction: UseMutationResult<unknown, Error, z.infer<typeof formSchema>, unknown>
  defaultValues?: z.infer<typeof formSchema>
}

export const FolderForm = ({ formAction, defaultValues }: FolderFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    formAction.mutate(data)
  }

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
        <Button
          type="submit"
          className="w-full"
          isLoading={formAction.status === 'pending'}
          onClick={(e) => {
            e.preventDefault()
            form.handleSubmit(onSubmit)()
          }}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
