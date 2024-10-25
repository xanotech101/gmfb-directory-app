import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { RefAttributes, SVGProps } from 'react'
import { LogOut } from 'lucide-react'

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
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-zinc-50">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center justify-start">
          <Image
            src="https://groomingmfb.com/wp-content/uploads/2021/10/GMFB-Logo.png"
            alt="Grooming Microfinance Bank"
            className="sticky"
            height={120}
            width={120}
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
            <li className="mt-auto">
              <a
                href="#"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-[#891C69]"
              >
                <LogOut
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-[#891C69]"
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
