import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

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
  //   role_id: z.string().min(1, {
  //     message: 'Please select a role.',
  //   }),
  gender: z.string().min(1, {
    message: 'Please select your gender.',
  }),
  //   departments: z.array(z.string()).optional().default([]),
})

export const InviteUserFormFields = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      //   role_id: '',
      //   departments: [],
    },
  })
  return (
    <>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit((v) => console.log('v', v))}>
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
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
                <FormLabel>Last name</FormLabel>
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <div>
                <Label htmlFor="email">Gender</Label>
                <Select {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue className="text-sm" placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </form>
      </Form>
    </>
  )
}
