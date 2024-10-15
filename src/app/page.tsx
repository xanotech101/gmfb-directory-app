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
// import { useRouter } from 'next/navigation'
import { OTP } from '@/components/otp/otp'
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      email: '',
    },
  })
  // const router = useRouter()

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
        <OTP setShow={setShowOTP} show={showOTP} />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src="https://groomingmfb.com/wp-content/uploads/2021/10/GMFB-Logo.png"
            alt="Grooming Microfinance Bank"
            className="mx-auto sticky"
            height={150}
            width={150}
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
                      <Input placeholder="email" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="...." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#891C69] hover:bg-[#974D7B]">
                Sign in
              </Button>
            </form>
          </Form>
          {/* <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault()
              sendOTP()
            }}
          >
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" defaultValue="pedroduarte@gmail.com" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="font-semibold text-[#891C69] hover:text-[#974D7B] text-sm">
                  Forgot password?
                </a>
              </div>
              <Input id="password" type="password" defaultValue="Pedro Duarte" />
            </div>
            <Button type="submit" className="w-full bg-[#891C69] hover:bg-[#974D7B]">
              Sign in
            </Button>
          </form> */}
        </div>
      </div>
    </>
  )
}
