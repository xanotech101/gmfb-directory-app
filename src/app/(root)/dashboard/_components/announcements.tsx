/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import DOMPurify from 'dompurify'
import { getRandomColor } from '@/lib/random-color'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Avatar } from '@/components/ui/avatar'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { Package } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'
import React from 'react'
import { Show } from 'react-smart-conditional'
import Link from 'next/link'

export const Announcements = () => {
  const { data } = useQuery<any>({
    queryKey: ['dashboard-announcements'],
    queryFn: async () =>
      get(`/api/announcements?page=${1}&limit=${4}`, {
        isClient: true,
      }),
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">
          Latest Announcements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Show>
          <Show.If condition={data}>
            <ul role="list" className="divide-y divide-gray-100">
              {data?.data?.items?.slice(0,4)?.map((a: any) => (
                <li key={a.id} className="flex gap-x-4 py-5">
                  <div className="flex-auto">
                    <div className="flex items-baseline justify-between gap-x-4">
                      <p className="text-sm/6 font-semibold text-gray-900">{a.subject}</p>
                      <p className="flex-none text-xs text-muted-foreground font-normal">
                        {a.created_at && <time
                          dateTime={a.created_at}>{formatDistanceToNow(parseISO(a.created_at), { addSuffix: true })}</time>}
                      </p>
                    </div>
                    <div className="mt-1 line-clamp-2 text-sm/6 text-gray-600"
                         dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(a?.body ?? '') }} />
                    <div className="space-x-2 mt-4 items-center hidden">
                      <Avatar
                        className="size-8 flex-shrink-0 border-2 text-xs"
                        style={{
                          border: a.created_by_user?.avatar ? 'none' : `2px solid ${getRandomColor(0).border}`,
                        }}
                      >
                        <AvatarImage src={a?.created_by_user?.avatar} alt="user's avatar" />
                        <AvatarFallback
                          className="h-full w-full flex justify-center items-center"
                          style={{
                            backgroundColor: getRandomColor(0).background,
                            color: getRandomColor(0).text,
                          }}
                        >
                          {a?.created_by_user.first_name?.[0]}
                          {a?.created_by_user.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{a?.created_by_user.first_name} {a?.created_by_user.last_name}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Show.If>
          <Show.If condition={data?.data?.items?.length === 0}>
            <EmptyState
              icon={Package}
              title="No Announcements"
              description="Get started by creating a new announcement."
            />
          </Show.If>
        </Show>
      </CardContent>

      {data && data?.data?.items?.length > 0 && (
        <CardFooter>
          <Link href="/announcements" className="w-full">
            <Button className="w-full" variant="outline">View All</Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}