'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { post } from '@/lib/fetch'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Image from 'next/image'

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
    onSuccess: () => {
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Password</FormLabel>
                      <div className="flex items-center justify-end">
                        <Button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          variant="link"
                          className="font-semibold text-[#891C69] hover:text-[#974D7B] text-sm p-0 h-auto"
                        >
                          Forgot password?
                        </Button>
                      </div>
                    </div>
                    <FormControl>
                      <Input placeholder="...." type="password" {...field} />
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
      <OTP setShow={setShowOTP} show={showOTP} formValues={form.getValues()} />
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-[425px] bg-[#fff]">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold leading-6 text-gray-900 text-center">
              Forgot Password?
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-700">
              <div className="flex flex-col items-center text-center">
                <Image src="/password.png" alt="Password Reset" width={150} height={150} />
                <p className="mt-1 text-base">
                  Please reach out to the admin to reset your password.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
