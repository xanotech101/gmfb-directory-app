'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { OTP } from '@/components/otp/otp'
import { ForgetPassword } from '@/components/forgot-password/forgot-password'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { post } from '@/lib/fetch'
import { toast } from 'sonner'

const formSchema = z.object({
  password: z.string().min(8, {
    message: 'Invalid password.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})

export default function Login() {
  const [showOTP, setShowOTP] = useState<boolean>(false)
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<{ email: string; password: string } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      email: '',
    },
  })

  const generateOTP = useMutation({
    mutationKey: ['generate-otp'],
    mutationFn: async (email: string) =>
      post(`/api/otp`, {
        isClient: true,
        body: { email, type: 'login' },
      }),
    onSuccess: (_, variables) => {
      setFormValues({ email: variables, password: form.getValues('password') })
      setShowOTP(true)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    generateOTP.mutate(values.email)
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <OTP setShow={setShowOTP} show={showOTP} formValues={formValues!} />
        <ForgetPassword setShow={setShowForgotPassword} show={showForgotPassword} />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src="https://groomingmfb.com/wp-content/uploads/2021/10/GMFB-Logo.png"
            alt="Grooming Microfinance Bank"
            className="mx-auto sticky"
            width={150}
            height={150}
            priority
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    <div className="flex items-center justify-end">
                      <a
                        href="#"
                        onClick={() => setShowForgotPassword(true)}
                        className="font-semibold text-[#891C69] hover:text-[#974D7B] text-sm"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="...." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="inline-flex w-full items-center justify-center bg-[#891C69] hover:bg-[#974D7B]"
                isLoading={generateOTP.status === 'pending'}
              >
                Sign in
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
