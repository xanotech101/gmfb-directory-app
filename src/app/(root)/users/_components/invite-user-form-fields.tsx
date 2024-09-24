import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'

export const InviteUserFormFields = () => {
  return (
    <>
      <div>
        <Label htmlFor="first_name">First Name</Label>
        <Input id="first_name" defaultValue="Pedro Duarte" />
      </div>
      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input id="last_name" defaultValue="Pedro Duarte" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" defaultValue="Pedro Duarte" />
      </div>
      <div>
        <Label htmlFor="email">Gender</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="email" className="text-sm text-gray-700">
          Role
        </Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}
