/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { post } from '@/lib/fetch'
import { toast } from '@/hooks/use-toast'
import { DepartmentForm } from '../form/department-form'

export const CreateDepartment = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const createDepartment = useMutation({
    mutationKey: ['create-department'],
    mutationFn: async ({ name, hod_id }: { name: string; hod_id?: string }) =>
      post(`/api/departments`, {
        isClient: true,
        body: { name, hod_id },
      }),
    onSuccess: () => {
      toast({
        title: 'Department created successfully.',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      setOpen(false)
    },
    onError: (error) => {
      toast({
        title: error?.message ?? 'Department creation failed.',
        variant: 'destructive',
      })
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Department</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] bg-[#fff]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Update department
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Fill the form to update department
          </DialogDescription>
        </DialogHeader>
        <DepartmentForm onSubmit={createDepartment} />
      </DialogContent>
    </Dialog>
  )
}
