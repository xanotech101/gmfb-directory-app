/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'
import { CreateEditRoleForm } from '@/app/(root)/roles/_components/create-edit-role/create-edit-role-form'
import { useState } from 'react'

type  CreateRoleModalProps =  Omit<React.ComponentProps<typeof CreateEditRoleForm>, 'type'>

export const CreateRoleModal = (props: CreateRoleModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className=" bg-[#891C69] hover:bg-[#974D7B]">Create Role</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Create Role
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Add the details of the new role you want to create.
          </DialogDescription>
        </DialogHeader>
        <CreateEditRoleForm
          type="create"
          {...props}
          onSuccess={() => {
            setIsOpen(false);
            if(props.onSuccess) props.onSuccess()
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
