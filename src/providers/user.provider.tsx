/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/fetch'

interface UserContextValue {
  user: any
}

const UserContext = createContext<UserContextValue>({
  user: null,
})

export const UserContextProvider = ({children}: {children: ReactNode}) => {
  const { data } = useQuery<any>({
    queryKey: ['profile'],
    queryFn: async () =>
      get("/api/users/profile", {
        isClient: true,
      }),
  })

  return (
    <UserContext.Provider value={{user: data?.data}}>
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