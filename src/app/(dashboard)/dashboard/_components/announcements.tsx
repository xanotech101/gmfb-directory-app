/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import DOMPurify from 'dompurify'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { BuildingIcon, CalendarIcon, FileIcon, UserCircleIcon } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'
import { Show } from 'react-smart-conditional'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useUser } from '@/providers/user.provider'
import { Skeleton } from '@/components/ui/skeleton'

export const Announcements = () => {
  const { hasPermission } = useUser()
  const canViewAnnouncements = hasPermission('can_view_announcements')

  const { data, isFetching } = useQuery<any>({
    queryKey: ['dashboard-announcements'],
    queryFn: async () =>
      get(`/api/announcements?page=${1}&limit=${3}`, {
        isClient: true,
      }),
    enabled: canViewAnnouncements,
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">
          Latest Announcements
        </CardTitle>
      </CardHeader>
      <Show
        as={CardContent}
        className={cn('relative flex-grow', {
          'h-[200px]': !data?.data?.items?.length,
        })}
      >
        <Show.If condition={isFetching} className="h-full">
          <Skeleton className="h-full w-full rounded-xl" />
        </Show.If>
        <Show.If
          condition={!canViewAnnouncements}
          as={EmptyState}
          className="h-full"
          title="Permission Denied"
          description="You do not have permission to view announcements."
        />
        <Show.If
          condition={data?.data?.items?.length > 0}
          as="ul"
          role="list"
          className="divide-y divide-gray-100"
        >
          {data?.data?.items?.slice(0, 4)?.map((a: any) => (
            <li key={a.id} className="gap-x-4 py-5">
              <div className="flex-auto">
                <div className="flex items-baseline justify-between gap-x-4">
                  <p className="text-sm/6 font-semibold text-gray-900">{a.subject}</p>
                </div>
                <div
                  className="mt-1 line-clamp-2 text-sm/6 text-gray-600"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(a?.body ?? '') }}
                />
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <span className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {formatDate(a.created_at)}
                </span>
                <span className="flex items-center text-sm text-muted-foreground">
                  <UserCircleIcon className="mr-1 h-4 w-4" />
                  {a.metadata?.send_to_all_departments ? 'All' : a.departments?.length} user(s)
                </span>
                <span className="flex items-center text-sm text-muted-foreground">
                  <FileIcon className="mr-1 h-4 w-4" />
                  {a.files?.length} file(s)
                </span>
                <span className="flex items-center text-sm text-muted-foreground">
                  <BuildingIcon className="mr-1 h-4 w-4" />
                  {a.metadata?.send_to_all_departments ? 'All' : a.departments?.length}{' '}
                  department(s)
                </span>
              </div>
              <p className="flex-none text-xs text-muted-foreground font-normal mt-4">
                {a.created_at && (
                  <time dateTime={a.created_at}>
                    {formatDistanceToNow(parseISO(a.created_at), { addSuffix: true })}
                  </time>
                )}
              </p>
            </li>
          ))}
        </Show.If>
        <Show.If
          condition={data?.data?.items?.length === 0}
          as={EmptyState}
          className="h-[180px]"
          title="No Announcements"
          description="There are no announcements to display."
        />
      </Show>

      {data && data?.data?.items?.length > 0 && (
        <CardFooter className="mt-auto">
          <Link href="/announcements" className="w-full">
            <Button className="w-full" variant="outline">
              View All
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}
