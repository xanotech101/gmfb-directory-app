import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { post } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useUser } from '@/providers/user.provider'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { FC } from 'react'


const otpSchema = z.object({
  otp: z.string().min(6, { message: 'OTP must be 6 digits.' }).max(6, { message: 'OTP must be 6 digits.' }),
})
interface OTPProps {
  show: boolean
  setShow(show: boolean): void
  formValues: { email: string; password: string }
}

export const OTP: FC<OTPProps> = ({ setShow, show, formValues }) => {
  const router = useRouter()
  const { refetchUser } = useUser()

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  })

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async ({ email, password, otp, }: {
      email: string
      password: string
      otp: string
    }) =>
      post(`/api/auth`, {
        isClient: true,
        body: { email, password, otp },
      }),
    onSuccess: () => {
      refetchUser()
      router.push('/dashboard')
    },
    onError: (error) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error.message ?? 'An error occurred',
      })
    },
    onSettled: () => {
      setShow(false)
    }
  })

  const onSubmit = async (values: z.infer<typeof otpSchema>) => {
    const { email, password } = formValues
    login.mutate({
      email,
      password,
      otp: values.otp,
    })
  }

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="sm:max-w-[425px] bg-white" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Enter OTP
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            A six-digit OTP has been sent to your email. Please enter it below to verify your
            account.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter OTP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-6">
              <Button
                type="submit"
                className="w-full"
                isLoading={login.status === 'pending'}
              >
                Verify OTP
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
