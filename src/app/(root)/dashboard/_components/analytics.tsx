/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { BellAlertIcon, DocumentDuplicateIcon, UserGroupIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import { Show } from 'react-smart-conditional'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const Analytics = () => {
  const { data, isFetching } = useQuery<any>({
    queryKey: ['analytics'],
    queryFn: async () =>
      get(`/api/analytics`, {
        isClient: true,
      }),
  })

  return (
    <Show>
      <Show.If condition={isFetching} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4 mx-4 sm:mx-6 lg:mx-0">
        {new Array(4).fill(null).map((_, i) => (
          <Skeleton className="h-[100px] w-full rounded-xl" key={i} />
        ))}
      </Show.If>
      <Show.If condition={data} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4 mx-4 sm:mx-6 lg:mx-0">
        <Metric label="Departments" href="departments" value={data?.data?.departments} Icon={UsersIcon} />
        <Metric label="Documents" href="documents" value={data?.data?.documents ?? 0} Icon={DocumentDuplicateIcon} />
        <Metric label="Users" href="users" value={data?.data?.users} Icon={UserGroupIcon} />
        <Metric label="Announcements" href="announcements" value={data?.data?.announcements} Icon={BellAlertIcon} />
      </Show.If>
    </Show>
  )
}

const Metric = ({ label, value, href, Icon }: { label: string; value: number, href: string, Icon: any }) => (
  <Card className="h-auto p-4 border hover:border-[#891C69]">
    <Link href={`/${href}`} className="block">
      <CardHeader className="flex items-center justify-between flex-row p-0">
        <CardDescription>{label}</CardDescription>
        <Icon
          aria-hidden="true"
          className="size-6 shrink-0 text-muted-foreground"
          color="gray-100"
        />
      </CardHeader>
      <CardTitle className="mt-0.5 text-xl lg:text-2xl">{value}</CardTitle>
    </Link>
  </Card>
)
