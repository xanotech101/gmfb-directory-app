'use client'

import { useState } from 'react'
import {
  BellAlertIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import { DesktopSidebar } from '@/components/layout/sidebar/desktop-sidebar'
import { Topbar } from '@/components/layout/topbar/topbar'
import { MobileSidebar } from '@/components/layout/sidebar/mobile-sidebar'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Departments', href: '/departments', icon: UserGroupIcon, current: false },
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
    icon: UserIcon,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Cog6ToothIcon,
  },
]

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isActive = (href: string) => {
    console.log(pathname, href)
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
      </div>
    </div>
  )
}
