import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'
import { PowerIcon } from 'lucide-react'
import { post } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import { UserAvatar } from '@/components/user-avatar/user-avatar'
import { ConfirmAction } from '@/components/confirm-action/confirm-action'

export const DesktopSidebar = ({
  navigation,
}: {
  navigation: {
    name: string
    href: string
    icon: ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, 'ref'> & {
        title?: string
        titleId?: string
      } & RefAttributes<SVGSVGElement>
    >
    current: boolean
  }[]
}) => {
  const router = useRouter()
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-gray-50">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white pb-4">
        <div className="flex h-16 shrink-0 items-center justify-start px-6">
          <Image
            className="object-cover"
            src="/logo.png"
            alt="Grooming Microfinance Bank"
            height={70}
            width={130}
            priority
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li className="px-6">
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                        {
                          'bg-gray-50 text-[#891C69]': item.current,
                          'text-gray-700 hover:bg-gray-50 hover:text-[#891C69]': !item.current,
                        },
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className={cn('h-6 w-6 shrink-0', {
                          'text-[#891C69]': item.current,
                          'text-gray-400 group-hover:text-[#891C69]': !item.current,
                        })}
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto bg-gray-50/50 py-2 mx-2 px-3 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <UserAvatar firstName="John" lastName="Doe" />
                <span className="text-sm font-medium leading-6 text-gray-900">John Doe</span>
              </div>
              <ConfirmAction
                trigger={
                  <button className="group -mx-2 flex gap-x-2 p-2 text-sm font-semibold leading-6 bg-transparent rounded-lg hover:text-[#891C69] text-gray-500 items-center cursor-pointer">
                    <PowerIcon aria-hidden="true" className="size-5 shrink-0" />
                    <span aria-label="Logout" className="sr-only">
                      Logout
                    </span>
                  </button>
                }
                title="Logout"
                description="Are you sure you want to logout?"
                actionProps={{
                  action: () =>
                    post('/api/auth/logout', { isClient: true }).finally(() =>
                      router.push('/login'),
                    ),
                  isLoading: false,
                  buttonProps: {
                    variant: 'default',
                    children: 'Logout',
                  },
                }}
              />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
