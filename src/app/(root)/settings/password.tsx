"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { patch } from '@/lib/fetch'
import { toast } from 'sonner'
import { useUser } from '@/providers/user.provider'

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(100, { message: "Password must not exceed 100 characters" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" });


export function Password() {
  const {refetchUser} = useUser()
  const formSchema = z
    .object({
      old_password: z.string(),
      password: passwordSchema,
      confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"], // path of error
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
      old_password: '',
    },
  })

  const changePassword = useMutation({
    mutationKey: ['change-password'],
    mutationFn: async (payload: z.infer<typeof formSchema>) =>
      patch(`/api/users/change-password`, {
        isClient: true,
        body: payload,
      }),
    onSuccess: () => {
      form.reset()
      toast.success("Password changed successfully")
      refetchUser()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    changePassword.mutate(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. Make sure to use a strong password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="old_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="......." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="......." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="......." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              isLoading={changePassword.status === 'pending'}
            >
              Save password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
