import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Package, type LucideIcon } from 'lucide-react'

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export function EmptyState({
  icon: Icon = Package,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex h-[300px] shrink-0 items-center justify-center rounded-md border border-dashed',
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Icon className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        {actionLabel && (onAction || actionHref) && (
          <Button
            className="mt-4"
            onClick={onAction}
            {...(actionHref ? { as: 'a', href: actionHref } : {})}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
