'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Login() {
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
            Sign in to your account
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
              <Input id="email" defaultValue="Pedro Duarte" />
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
          </form>
        </div>
      </div>
    </>
  )
}
