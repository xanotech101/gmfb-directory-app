/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { BuildingIcon, CalendarIcon, FilesIcon, UserCircle } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'
import { Show } from 'react-smart-conditional'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useUser } from '@/providers/user.provider'
import { Skeleton } from '@/components/ui/skeleton'

export const Documents = () => {
  const { hasPermission } = useUser()
  const canViewDocuments = hasPermission('can_view_documents')

  const { data, isFetching } = useQuery<any>({
    queryKey: ['dashboard-documents'],
    queryFn: async () =>
      get(`/api/documents?page=${1}&limit=${3}`, {
        isClient: true,
      }),
    enabled: canViewDocuments,
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Card className="flex flex-col rounded-md">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">
          Latest Documents
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
          condition={!canViewDocuments}
          as={EmptyState}
          className="h-full"
          title="Permission Denied"
          description="You do not have permission to view documents."
        />
        <Show.If
          condition={data?.data?.items?.length > 0}
          as="ul"
          role="list"
          className="flex flex-col gap-3"
        >
          {data?.data?.items?.slice(0, 4)?.map((doc: any) => (
            <li key={doc.id} className="border border-gray-200 rounded-md p-5">
              <h3 className="text-sm/6 font-semibold text-gray-900 line-clamp-2 capitalize">
                {doc.subject}
              </h3>
              <div className="flex items-center space-x-4 mt-2">
                <span className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {formatDate(doc.created_at)}
                </span>
                <span className="flex items-center text-sm text-muted-foreground">
                  <UserCircle className="mr-1 h-4 w-4" />
                  {doc.metadata?.send_to_all_departments ? 'All' : doc.departments?.length} user(s)
                </span>
                <span className="flex items-center text-sm text-muted-foreground">
                  <FilesIcon className="mr-1 h-4 w-4" />
                  {doc.files?.length} file(s)
                </span>
                <span className="flex items-center text-sm text-muted-foreground">
                  <BuildingIcon className="mr-1 h-4 w-4" />
                  {doc.metadata?.send_to_all_departments ? 'All' : doc.departments?.length}{' '}
                  department(s)
                </span>
              </div>
              <p className="flex-none text-xs text-muted-foreground font-normal mt-4">
                {doc.created_at && (
                  <time dateTime={doc.created_at}>
                    {formatDistanceToNow(parseISO(doc.created_at), { addSuffix: true })}
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
          title="No Documents"
          description="There are no documents to display."
        />
      </Show>
      {data && data?.data?.items?.length > 0 && (
        <CardFooter className="mt-auto">
          <Link href="/documents" className="w-full">
            <Button className="w-full" variant="outline">
              View All
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}
