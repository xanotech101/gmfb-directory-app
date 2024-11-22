'use client'

import { Toaster } from '@/components/ui/toaster'
import { ReactNode, useState } from 'react'
import {
  BellAlertIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import { DesktopSidebar } from './_components/layout/sidebar/desktop-sidebar'
import { Topbar } from './_components/layout/topbar/topbar'
import { MobileSidebar } from './_components/layout/sidebar/mobile-sidebar'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Departments', href: '/departments', icon: UserGroupIcon, current: false },
  {
    name: 'Documents',
    href: '/documents',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Users', href: '/users', icon: UsersIcon, current: false },
  {
    name: 'Announcements',
    href: '/announcements',
    icon: BellAlertIcon,
  },
  {
    name: 'Roles',
    href: '/roles',
    icon: UserIcon,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Cog6ToothIcon,
  },
]

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <div>
      <MobileSidebar
        setSidebarOpen={() => setSidebarOpen(true)}
        sidebarOpen={sidebarOpen}
        navigation={navigation.map((nav) => ({ ...nav, current: isActive(nav.href) }))}
      />
      <DesktopSidebar
        navigation={navigation.map((nav) => ({ ...nav, current: isActive(nav.href) }))}
      />
      <div className="lg:pl-72">
        <Topbar setSidebarOpen={() => setSidebarOpen(true)} />
        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
        <Toaster />
      </div>
    </div>
  )
}
