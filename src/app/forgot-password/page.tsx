'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ForgotPassword() {
  const router = useRouter()

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
            height={40}
            width={40}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault()
              router.push('/dashboard')
            }}
          >
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input id="email" />
            </div>
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
