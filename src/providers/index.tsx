'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import * as React from 'react'
import { UserContextProvider } from '@/providers/user.provider'

export function Providers({ children }: { readonly children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            retryOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <UserContextProvider>
        {children}
      </UserContextProvider>
    </QueryClientProvider>
  )
}
