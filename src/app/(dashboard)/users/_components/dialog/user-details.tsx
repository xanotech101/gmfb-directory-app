/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/format-date'
import { UserCircle } from 'lucide-react'
import { UserAvatar } from '@/components/user-avatar/user-avatar'

const randomIndex = Math.floor(Math.random())

export function UserDetails({ user }: { user: any }) {
  if (!user) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-sm text-left flex items-center gap-1">
          <UserCircle className="size-4" />
          View Profile
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Detailed information about {user.first_name} {user.last_name}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4 [&_.scrollbar]:hidden">
          <div className="flex flex-col items-center space-y-4 pb-4">
            <UserAvatar firstName={user.first_name} lastName={user.last_name} />
            <div className="text-center">
              <h3 className="text-lg font-semibold">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Badge variant={user.status === 'active' ? 'green' : 'red'}>{user.status}</Badge>
          </div>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Personal Information</h4>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>Gender:</div>
                <div className="capitalize">{user.gender}</div>
                <div>Verified:</div>
                <div>{user.is_verified ? 'Yes' : 'No'}</div>
                <div>Default Password:</div>
                <div>{user.is_default_password ? 'Yes' : 'No'}</div>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium">Role & Departments</h4>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>Role:</div>
                <div>{user.role?.name}</div>
                <div>Departments:</div>
                <div>
                  {user.departments?.map((dept: any) => (
                    <Badge key={dept.id} variant="default" className="mr-1 mb-1">
                      {dept.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium">Dates</h4>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>Created:</div>
                <div>{formatDate(user.created_at)}</div>
                <div>Updated:</div>
                <div>{formatDate(user.updated_at)}</div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
