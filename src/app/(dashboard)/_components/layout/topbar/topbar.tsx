import React from 'react'
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
import { post } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserAvatar } from '@/components/user-avatar/user-avatar'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarTrigger,
  MenubarMenu,
} from '@/components/ui/menubar'
import { Badge } from '@/components/ui/badge'
import { Power, UserCircle } from 'lucide-react'
import { useBreadcrumbs } from '@/providers/breadcrumb.provider'

export const Topbar = ({ setSidebarOpen }: { setSidebarOpen(open: boolean): void }) => {
  const router = useRouter()
  const { user } = useUser()
  const { breadcrumbs } = useBreadcrumbs([])

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
            <div className="relative flex-1">
              <Breadcrumb className="items-center h-full flex">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    {breadcrumbs.length === 0 ? (
                      <BreadcrumbPage className="text-gray-900">Home</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild className="hover:text-gray-900 transition-all">
                        <Link href="/dashboard">Home</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {breadcrumbs.map((breadcrumb, index) => {
                    const landindex = breadcrumbs.length - 1
                    return (
                      <React.Fragment key={index}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          {landindex === index ? (
                            <BreadcrumbPage className="text-gray-900">
                              {breadcrumb.label}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink asChild className="hover:text-gray-900 transition-all">
                              <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    )
                  })}
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
              <Menubar className="relative">
                <MenubarMenu>
                  <MenubarTrigger className="-m-1.5 flex items-center p-1.5 border-transparent outline-0 outline !bg-white cursor-pointer">
                    <span className="sr-only">Open user menu</span>
                    <UserAvatar firstName={user?.first_name} lastName={user?.last_name} />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="ml-1.5 text-sm font-semibold leading-6 text-gray-900"
                      >
                        {user?.first_name} {user?.last_name}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 size-5 text-gray-400 hover:text-[#891C69]"
                      />
                    </span>
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem className="flex flex-col items-start">
                      <p>
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-gray-600 truncate max-w-52">{user?.email}</p>
                      <Badge className="mt-3" variant="green">
                        {user?.role?.name}
                      </Badge>
                    </MenubarItem>
                    <MenubarSeparator />

                    <MenubarItem>
                      <Link href="settings" className="flex items-center gap-2">
                        <UserCircle className="size-4" />
                        Your Profile
                      </Link>
                    </MenubarItem>

                    <MenubarItem>
                      <button
                        onClick={() =>
                          post('/api/auth/logout', { isClient: true }).finally(() =>
                            router.push('/login'),
                          )
                        }
                        className="flex items-center gap-2 w-full"
                      >
                        <Power className="size-4" />
                        Logout
                      </button>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
