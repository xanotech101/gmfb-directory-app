'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Password } from '../settings/password'
import { useUser } from '@/providers/user.provider'

export default function Account() {
  const { user } = useUser()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold leading-6 text-gray-900">Account Settings</h1>
        <p className="mt-2 text-sm text-gray-700">Update your profile and password</p>
      </div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-zinc-200 py-3 mb-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when {"you're"} done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1 py-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  className="focus:outline-none focus:ring-0 read-only:focus:ring-0 focus:border-inherit"
                  id="name"
                  readOnly
                  value={`${user?.first_name || ''} ${user?.last_name || ''}`}
                />
              </div>
              <div className="space-y-1 py-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  className="focus:outline-none focus:ring-0 read-only:focus:ring-0 focus:border-inherit"
                  id="username"
                  readOnly
                  value={user?.username || ''}
                />
              </div>
              <div className="space-y-1 py-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  className="focus:outline-none focus:ring-0 read-only:focus:ring-0 focus:border-inherit"
                  id="username"
                  readOnly
                  value={user?.phone_number || ''}
                />
              </div>
              <div className="space-y-1 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="focus:outline-none focus:ring-0 read-only:focus:ring-0 focus:border-inherit"
                  id="email"
                  readOnly
                  value={user?.email || ''}
                />
              </div>
              <div className="space-y-1 py-2">
                <Label htmlFor="account_creation">Account Creation</Label>
                <Input
                  className="focus:outline-none focus:ring-0 read-only:focus:ring-0 focus:border-inherit"
                  id="account_creation"
                  readOnly
                  value={
                    user?.created_at
                      ? new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                          hour12: true,
                        }).format(new Date(user.created_at))
                      : ''
                  }
                />
              </div>
              <div className="space-y-1 py-2">
                <Label htmlFor="account_creation">Gender</Label>
                <Input
                  className="focus:outline-none focus:ring-0 read-only:focus:ring-0 focus:border-inherit"
                  id="gender"
                  readOnly
                  value={user?.gender || ''}
                />
              </div>
              <div className="space-y-1 py-2">
                <Label htmlFor="birth_date">Birth Date</Label>
                <Input
                  className="focus:outline-none focus:ring-0 read-only:focus:ring-0 focus:border-inherit"
                  id="birth_date"
                  readOnly
                  value={user?.birth_date || ''}
                />
              </div>
              <div className="space-y-1 py-2">
                <Label htmlFor="account_creation">Age</Label>
                <Input
                  className="focus:outline-none focus:ring-0 read-only:focus:ring-0 focus:border-inherit"
                  id="age"
                  readOnly
                  value={user?.age || ''}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Password />
        </TabsContent>
      </Tabs>
    </div>
  )
}
