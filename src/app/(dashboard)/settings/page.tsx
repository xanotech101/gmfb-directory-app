'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Password } from '../settings/password'
import { Account } from './account'

export default function Page() {
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
          <Account />
        </TabsContent>
        <TabsContent value="password">
          <Password />
        </TabsContent>
      </Tabs>
    </div>
  )
}
