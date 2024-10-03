'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function RestPassword() {
  const router = useRouter()
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src="https://groomingmfb.com/wp-content/uploads/2021/10/GMFB-Logo.png"
            alt="Grooming Microfinance Bank"
            className="mx-auto sticky"
            height={150}
            width={150}
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
              <Label htmlFor="password">Email address</Label>
              <Input id="password" type="password" />
            </div>
            <div>
              <Label htmlFor="confirm_password">Password</Label>
              <Input id="confirm_password" type="password" />
            </div>
            <Button type="submit" className="w-full bg-[#891C69] hover:bg-[#974D7B]">
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
