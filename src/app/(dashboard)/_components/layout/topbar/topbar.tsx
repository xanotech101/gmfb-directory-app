import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useUser } from '@/providers/user.provider'
import { Avatar } from '@/components/ui/avatar'
import { getRandomColor } from '@/lib/random-color'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { post } from '@/lib/fetch'
import { useRouter } from 'next/navigation'

const userNavigation = [{ name: 'Your profile', href: 'settings' }]

export const Topbar = ({ setSidebarOpen }: { setSidebarOpen(open: boolean): void }) => {
  const router = useRouter()
  const { user } = useUser()

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex h-16 items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex-1 items-center">
              <Breadcrumb className="opacity-0">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/public" className="hover:text-[#891C69]">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components" className="hover:text-[#891C69]">
                      Components
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-[#891C69]">
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6 hidden" />
              </button>

              {/* Separator */}
              <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <Avatar
                    className="size-7 flex-shrink-0 border-2 text-sm"
                    style={{
                      border: user?.avatar ? 'none' : `2px solid ${getRandomColor(0).border}`,
                    }}
                  >
                    <AvatarImage src={user?.avatar} alt="user's avatar" />
                    <AvatarFallback
                      className="h-full w-full flex justify-center items-center"
                      style={{
                        backgroundColor: getRandomColor(0).background,
                        color: getRandomColor(0).text,
                      }}
                    >
                      {user?.first_name[0]}
                      {user?.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      aria-hidden="true"
                      className="ml-1.5 text-sm font-semibold leading-6 text-gray-900"
                    >
                      {user?.first_name} {user?.last_name}
                    </span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="ml-2 h-5 w-5 text-gray-400 hover:text-[#891C69]"
                    />
                  </span>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                  <MenuItem>
                    <button
                      onClick={() =>
                        post('/api/auth/logout', { isClient: true }).finally(() =>
                          router.push('/login'),
                        )
                      }
                      className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50 w-full text-left"
                    >
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
