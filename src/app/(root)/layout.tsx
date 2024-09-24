'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  BellAlertIcon,
  BellIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ExitIcon } from '@radix-ui/react-icons'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Departments', href: '/departments', icon: UsersIcon, current: false },
  {
    name: 'Documents',
    href: '/documents',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Users', href: 'users', icon: UsersIcon, current: false },
  {
    name: 'Announcements',
    href: '/announcements',
    icon: BellAlertIcon,
  },
  {
    name: 'Roles',
    href: '/roles',
    icon: Cog6ToothIcon,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Cog6ToothIcon,
  },
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isActive = (href: string) => {
    console.log(pathname, href)
    return pathname === href
  }

  return (
    <>
      <div>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
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
                                  'bg-gray-50 text-indigo-600': isActive(item.href),
                                },
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={cn('h-6 w-6 shrink-0', {
                                  'text-indigo-600': isActive(item.href),
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
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
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
                              'bg-gray-50 text-indigo-600': isActive(item.href),
                              'text-gray-700 hover:bg-gray-50 hover:text-indigo-600': !isActive(
                                item.href,
                              ),
                            },
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={cn('h-6 w-6 shrink-0', {
                              'text-indigo-600': isActive(item.href),
                              'text-gray-400 group-hover:text-indigo-600': !isActive(item.href),
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

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
            <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
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
                <div className="relative flex flex-1 items-center">
                  <h2>Dashboard</h2>
                </div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                  </button>

                  {/* Separator */}
                  <div
                    aria-hidden="true"
                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                  />

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative">
                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        alt="logo"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="h-8 w-8 rounded-full bg-gray-50"
                        width={32}
                        height={32}
                      />
                      <span className="hidden lg:flex lg:items-center">
                        <span
                          aria-hidden="true"
                          className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        >
                          Tom Cook
                        </span>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="ml-2 h-5 w-5 text-gray-400"
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
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}
