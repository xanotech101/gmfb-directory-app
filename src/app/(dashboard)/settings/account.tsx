'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useUser } from '@/providers/user.provider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function Account() {
  const { user } = useUser()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when {'you\'re'} done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col space-y-6">
          <div>
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              disabled
              defaultValue={user?.first_name}
            />
          </div>
          <div>
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              disabled
              defaultValue={user?.last_name}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              disabled
              defaultValue={user?.email}
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Select defaultValue="male" disabled>
              <SelectTrigger className="w-full">
                <SelectValue className="text-sm" placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Role</Label>
            <Select value={user?.role?.name} disabled>
              <SelectTrigger className="w-full">
                <SelectValue className="text-sm" placeholder="Select Role" />
              </SelectTrigger>
              {user?.role?.name && (
                <SelectContent>
                  <SelectItem value={user.role.name}>{user.role.name}</SelectItem>
                </SelectContent>
              )}
            </Select>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
