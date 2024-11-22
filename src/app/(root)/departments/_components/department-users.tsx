/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import React, { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useInfiniteQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'
import { getRandomColor } from '@/lib/random-color'
import { useDebounce } from 'use-debounce'

type User = {
  id: string
  user_id: string
  department_id: string
  created_at: string
  updated_at: string
  user: {
    first_name: string
    last_name: string
    email: string
    avatar: string | null
  }
}

type ApiResponse = {
  success: boolean
  message: string
  data: {
    items: User[]
    meta: {
      total: number
      page: number
      limit: number
    }
  }
  code: number
}

interface DepartmentUsersProps {
  name: string
  id: string
}

export function DepartmentUsers({ name, id }: DepartmentUsersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [userSearchString, setUserSearchString] = useState('')
  const [debouncedSearchSearchString] = useDebounce(userSearchString, 500)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch } = useInfiniteQuery<ApiResponse>({
    queryKey: ['department-users', id, debouncedSearchSearchString],
    queryFn: ({ pageParam }) => get(`/api/departments/${id}/users?page=${pageParam}&search=${debouncedSearchSearchString}`, { isClient: true }),
    getNextPageParam: (lastPage) => {
      const { page, total, limit } = lastPage.data.meta
      const totalPages = Math.ceil(total / limit)
      return page < totalPages ? page + 1 : undefined
    },
    initialPageParam: 1,
    enabled: !!id,
  })

  const users = data?.pages?.[0]?.data?.items ?? []

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        View Users
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-white">
        <SheetHeader>
          <SheetTitle>{name} Department Users</SheetTitle>
          <SheetDescription>
            List of users in the {name} Department
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <Input
            type="search"
            placeholder="Search users..."
            value={userSearchString}
            className="mb-8"
            onChange={(e) => setUserSearchString(e.target.value)}
          />
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="divide-y divide-gray-200">
              {users?.map((user, i) => (
                <div key={user?.user_id} className="flex items-center space-x-4 py-4">
                  <Avatar
                    className="size-8 flex-shrink-0 border-2"
                    style={{
                      border: user?.user?.avatar ? 'none' : `2px solid ${getRandomColor(0).border}`,
                    }}
                  >
                    <AvatarImage src={user?.user?.avatar ?? undefined} alt="user's avatar" />
                    <AvatarFallback
                      className="h-full w-full flex justify-center items-center"
                      style={{
                        backgroundColor: getRandomColor(i).background,
                        color: getRandomColor(i).text,
                      }}
                    >
                      {user?.user?.first_name[0]}
                      {user?.user?.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{user?.user?.first_name} {user?.user?.last_name}</p>
                    <p className="text-sm text-muted-foreground">{user?.user?.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
