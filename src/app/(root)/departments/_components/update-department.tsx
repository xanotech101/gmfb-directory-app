/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'
import { DepartmentForm } from '@/app/(root)/departments/_components/department-form'
import { put } from '@/lib/fetch'

interface UpdateDepartmentProps {
  id: string
  name: string
  hod: Record<string, string> | undefined
  onUpdate: () => void
}

export const UpdateDepartment = ({ id, name, hod, onUpdate }: UpdateDepartmentProps) => {
  const [open, setOpen] = useState(false)

  const updateDepartment = useMutation({
    mutationKey: ['update-department'],
    mutationFn: async ({ name, hod_id }: { name: string, hod_id?: string }) =>
      put(`/api/departments/${id}`, {
        isClient: true,
        body: { name, hod_id },
      }),
    onSuccess: () => {
      toast({
        title: 'Department updated successfully.',
        variant: 'default',
      })
      onUpdate()
      setOpen(false)
    },
    onError: (error) => {
      toast({
        title: error?.message ?? 'Department update failed.',
        variant: 'destructive',
      })
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full text-left">Update</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]" onPointerDownOutside={(e) => e.preventDefault() }>
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Update Department
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Fill in the form below to create a new department
          </DialogDescription>
        </DialogHeader>
        <DepartmentForm
          onSubmit={updateDepartment}
          defaultValues={{
            name,
            hod: hod ? [{ label: `${hod.first_name} ${hod.last_name}`, value: hod.id }] : [],
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
