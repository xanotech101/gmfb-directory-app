/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext } from 'react'
import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'

interface UserContextValue {
  user: any
  refetchUser: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>
}

const UserContext = createContext<UserContextValue>({
  user: null,
  refetchUser: () => Promise.resolve({} as any),
})

export const UserContextProvider = ({children}: {children: ReactNode}) => {
  const { data, refetch: refetchUser } = useQuery<any>({
    queryKey: ['profile'],
    queryFn: async () =>
      get("/api/users/profile", {
        isClient: true,
      }),
  })

  return (
    <UserContext.Provider value={{user: data?.data, refetchUser}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }

  return context;
};