"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Password } from '../settings/password'
import React from 'react'

export default function Settings() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold leading-6 text-gray-900">Account Settings</h1>
        <p className="mt-2 text-sm text-gray-700">Update your profile and password</p>
      </div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-zinc-200 py-3 mb-2">
          <TabsTrigger value="account">
            Account
          </TabsTrigger>
          <TabsTrigger value="password">
            Password
          </TabsTrigger>
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
                  className="focus:outline-none focus:border-[#891C69]"
                  id="name"
                  defaultValue="Pedro Duarte"
                />
              </div>
              <div className="space-y-1 py-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  className="focus:outline-none focus:border-[#891C69]"
                  id="username"
                  defaultValue="@peduarte"
                />
              </div>
              <div className="space-y-1 py-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  className="focus:outline-none focus:border-[#891C69]"
                  id="username"
                  defaultValue="08101194855"
                />
              </div>
              <div className="space-y-1 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="focus:outline-none focus:border-[#891C69]"
                  id="email"
                  defaultValue="peduarte@gmail.com"
                />
              </div>
              <div className="space-y-1 py-2">
                <Label htmlFor="account_creation">Account Creation</Label>
                <Input
                  className="focus:outline-none focus:border-[#891C69]"
                  id="account_creation"
                  readOnly
                  defaultValue="Oct 27, 2019, 9:54:41 PM"
                />
              </div>
              <div className="space-y-1 py-2">
                <Label htmlFor="account_creation">Gender</Label>
                <Input
                  className="focus:outline-none focus:border-[#891C69]"
                  id="gender"
                  defaultValue="Male"
                />
              </div>
              <div className="space-y-1 py-2">
                <Label htmlFor="birth_date">Birth Date</Label>
                <Input
                  className="focus:outline-none focus:border-[#891C69]"
                  id="birth_date"
                  readOnly
                  defaultValue="Oct 27, 2019"
                />
              </div>
              <div className="space-y-1 py-2">
                <Label htmlFor="account_creation">Age</Label>
                <Input
                  className="focus:outline-none focus:border-[#891C69]"
                  id="age"
                  defaultValue="34"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Password />
        </TabsContent>
      </Tabs>
    </>
  )
}
