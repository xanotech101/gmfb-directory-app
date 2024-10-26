
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export const EditRoleModal = () => {
  return (
    <Dialog>
      <DialogTrigger onClick={(e) => e.stopPropagation()}>
        Edit Role
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Edit Role
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Fill the form to update this role
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-8 mt-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3 text-sm text-gray-700"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#891C69] sm:text-sm sm:leading-6"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
