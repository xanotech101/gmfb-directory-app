import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { post } from '@/lib/fetch'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import CircleLoader from 'react-spinners/ClipLoader'
interface OTPProps {
  show: boolean
  setShow(show: boolean): void
  formValues: { email: string; password: string }
}

export const OTP: React.FC<OTPProps> = ({ setShow, show, formValues }) => {
  const [otp, setOtp] = useState<string>('')
  const router = useRouter()

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async ({
      email,
      password,
      otp,
    }: {
      email: string
      password: string
      otp: string
    }) =>
      post(`/api/auth`, {
        isClient: true,
        body: { email, password, otp },
      }),
    onSuccess: () => {
      router.push('/dashboard')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleOTPSubmit = () => {
    const { email, password } = formValues
    login.mutate({
      email,
      password,
      otp,
    })
  }

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Enter OTP
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            A six-digit OTP has been sent to your email. Please enter it below to verify your
            account.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center w-full">
          <InputOTP maxLength={6} onChange={(otp: string) => setOtp(otp)}>
            <InputOTPGroup>
              {new Array(6).fill(0).map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <DialogFooter className="mt-6">
          <Button
            type="button"
            onClick={() => setShow(false)}
            className="w-full bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full bg-[#891C69] hover:bg-[#974D7B] focus:outline-none focus:ring-2 focus:ring-[#974D7B]"
            onClick={handleOTPSubmit}
            disabled={login.status === 'pending'}
          >
            {login.status === 'pending' && (
              <CircleLoader size={18} color="#fff" className="ml-2" />
            )}
            Verify OTP
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
