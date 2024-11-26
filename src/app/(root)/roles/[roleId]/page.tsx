/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { PermissionCard } from './_components/permission-card'
import { useMutation, useQuery } from '@tanstack/react-query'
import { get, patch } from '@/lib/fetch'
import { Show } from 'react-smart-conditional'
import { useParams, useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/hooks/use-toast'

export default function Permissions() {
  const params = useParams()
  const router = useRouter()
  const [selectedPermissions, setSelectedPermissions] = React.useState<Record<string, string[]>>({})

  const { isFetching, data } = useQuery<any>({
    queryKey: ['permissions'],
    queryFn: async () =>
      get('/api/permissions', {
        isClient: true,
      }),
  })

  const { data: roleData, refetch } = useQuery<any>({
    queryKey: ['role', params?.roleId],
    queryFn: async () =>
      get(`/api/roles/${params.roleId}`, {
        isClient: true,
      }),
    enabled: !!params?.roleId,
  })

  useEffect(() => {
    if (roleData?.data) {
      const permissions = roleData?.data?.permissions ?? [] as Record<string, string>[]
      const permissionsByScope = permissions.reduce((acc:any, permission: any) => {
        if (!acc[permission.scope]) {
          acc[permission.scope] = []
        }
        acc[permission.scope].push(permission.id)
        return acc
      }, {} as Record<string, string[]>)
      setSelectedPermissions(permissionsByScope)
    }
  }, [roleData?.data])

  const updatePermissions = useMutation({
    mutationKey: ['update-permissions'],
    mutationFn: async () =>
      patch(`/api/roles/${params.roleId}/permissions`, {
        isClient: true,
        body: {permissions: Object.values(selectedPermissions).flat()},
      }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Permissions Updated Successfully.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message ?? "Something went wrong.",
      })
    },
    onSettled: () => {
      refetch()
    }
  })

  return (
    <div className="sm:px-6 lg:px-0">
      <div className="sm:flex sm:items-center">
        <div className="flex items-center justify-between sm:flex-auto ">
          <div className="flex flex-col">
            <h1 className="text-left font-semibold leading-6 text-gray-900 capitalize">{roleData?.data?.name}</h1>
            <p className="mt-2 text-center text-sm text-gray-700">
              {roleData?.data?.description}
            </p>
          </div>
          <div className="flex items-center justify-between space-x-3">
            {roleData && data && (
              <Button
                  onClick={() => updatePermissions.mutate()}
                  disabled={updatePermissions.isPending}
                  isLoading={updatePermissions.isPending}
              >
                Save
              </Button>
            )}
            <Button
              variant="outline"
              onClick={router.back}
              disabled={updatePermissions.isPending}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <Show className="mt-8 flow-root">
        <Show.If condition={data} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4 mx-4 sm:mx-6 lg:mx-0">
          {Object.keys(data?.data ?? {}).map((key) => {
            const permissions = data?.data?.[key] ?? [] as Record<string, string>[]
            return (
              <PermissionCard
                key={key}
                scope={key}
                scopePermissions={permissions}
                selectedPermissions={selectedPermissions[key]}
                setSelectedPermissions={(permissions: string[]) => setSelectedPermissions((prev) => ({ ...prev, [key]: permissions }))}
              />
            )
          })}
        </Show.If>
        <Show.If condition={isFetching} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4 mx-4 sm:mx-6 lg:mx-0">
          {new Array(4).fill(null).map((_, idx) => (
            <Skeleton key={idx} className="h-80" />
          ))}
        </Show.If>
      </Show>
    </div>
  )
}
