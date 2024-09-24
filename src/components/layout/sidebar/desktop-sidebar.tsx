import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ExitIcon } from '@radix-ui/react-icons'
import { RefAttributes, SVGProps } from 'react'

export const DesktopSidebar = ({
  navigation,
}: {
  navigation: {
    name: string
    href: string
    icon: React.ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, 'ref'> & {
        title?: string
        titleId?: string
      } & RefAttributes<SVGSVGElement>
    >
    current: boolean
  }[]
}) => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Image
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="h-8 w-auto"
            width={32}
            height={32}
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                        {
                          'bg-gray-50 text-indigo-600': item.current,
                          'text-gray-700 hover:bg-gray-50 hover:text-indigo-600': !item.current,
                        },
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className={cn('h-6 w-6 shrink-0', {
                          'text-indigo-600': item.current,
                          'text-gray-400 group-hover:text-indigo-600': !item.current,
                        })}
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <a
                href="#"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              >
                <ExitIcon
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                />
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
