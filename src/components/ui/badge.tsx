import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'text-gray-900 ring-inset bg-gray-50 ring-gray-500/10',
        green: 'text-green-900  ring-inset bg-green-50 ring-green-600/20',
        blue: 'bg-blue-50 text-blue-900 ring-blue-600/20',
        yellow: 'text-yellow-900  ring-inset bg-yellow-50 ring-yellow-600/20',
        red: 'text-red-900 ring-inset bg-red-50 ring-red-600/10',
        indigo: 'bg-indigo-50 text-indigo-900  ring-inset ring-indigo-700/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
