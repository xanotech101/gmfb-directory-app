/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { BuildingIcon, CalendarIcon, FileIcon, Package, UsersIcon } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'
import React, { Fragment } from 'react'
import { Show } from 'react-smart-conditional'
import Link from 'next/link'

export const Documents = () => {
  const { data, isFetching } = useQuery<any>({
    queryKey: ['dashboard-documents'],
    queryFn: async () =>
      get(`/api/documents?page=${1}&limit=${4}`, {
        isClient: true,
      }),
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
          Latest Documents
        </CardTitle>
      </CardHeader>
      <Show as={CardContent} className="relative flex-grow">
        <Show.If condition={data} as="ul" role="list" className="divide-y divide-gray-100">
          {data?.data?.items?.slice(0, 4)?.map((doc: any) => (
            <li key={doc.id} className="gap-x-4 py-5">
              <div className="flex-auto">
                <div className="flex items-baseline justify-between gap-x-4">
                  <p className="text-sm/6 font-semibold text-gray-900">{doc.subject}</p>
                  <p className="flex-none text-xs text-muted-foreground font-normal">
                    {doc.created_at && <time
                      dateTime={doc.created_at}>{formatDistanceToNow(parseISO(doc.created_at), { addSuffix: true })}</time>}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                  <span className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {formatDate(doc.created_at)}
                  </span>
                <span className="flex items-center text-sm text-muted-foreground">
                    <UsersIcon className="mr-1 h-4 w-4" />
                  {doc.users?.length} users
                  </span>
                <span className="flex items-center text-sm text-muted-foreground">
                    <FileIcon className="mr-1 h-4 w-4" />
                  {doc.files?.length} files
                  </span>
                <span className="flex items-center text-sm text-muted-foreground">
                    <BuildingIcon className="mr-1 h-4 w-4" />
                  {doc.departments?.length} departments
                  </span>
              </div>
            </li>
          ))}
        </Show.If>
        <Show.If condition={data?.data?.items?.length === 0} as={Fragment}>
          <EmptyState
            icon={Package}
            title="No Announcements"
            description="Get started by creating a new announcement."
          />
        </Show.If>
      </Show>
      {data && data?.data?.items?.length > 0 && (
        <CardFooter className="mt-auto">
          <Link href="/documents" className="w-full">
            <Button className="w-full" variant="outline">View All</Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}