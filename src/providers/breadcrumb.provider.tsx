import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface Breadcrumb {
  label: string
  href: string
}

interface BreadcrumbsContextValue {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void
}

const BreadcrumbsContext = createContext<BreadcrumbsContextValue | undefined>(undefined)

export const BreadcrumbsProvider = ({ children }: { children: ReactNode }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])

  return (
    <BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbsContext.Provider>
  )
}

export const useBreadcrumbs = (defaultBreadcrumbs: Breadcrumb[]) => {
  const context = useContext(BreadcrumbsContext)

  if (!context) {
    throw new Error('useBreadcrumbs must be used within a BreadcrumbsProvider')
  }

  const { breadcrumbs, setBreadcrumbs } = context

  useEffect(() => {
    setBreadcrumbs(defaultBreadcrumbs)

    return () => setBreadcrumbs([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBreadcrumbs])

  return { breadcrumbs }
}
