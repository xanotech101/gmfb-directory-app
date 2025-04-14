/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentPropsWithoutRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { RoleForm } from '@/app/(root)/roles/_components/role-form'
import { useMutation } from '@tanstack/react-query'
import { put } from '@/lib/fetch'
import { toast } from '@/hooks/use-toast'


interface CreateRoleProps extends Omit<ComponentPropsWithoutRef<typeof RoleForm>, 'roleAction'> {
  onSuccess: () => void
  roleId: string
}

export const EditRole = ({onSuccess, defaultValues, roleId}: CreateRoleProps ) => {
  const [isOpen, setIsOpen] = useState(false)

  const editRole = useMutation({
    mutationKey: ['edit-role'],
    mutationFn: async (payload: {name: string, description: string}) =>
      put(`/api/roles/${roleId}`, {
        isClient: true,
        body: payload,
      }),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'The role has been updated successfully',
      })
      onSuccess()
      setIsOpen(false)
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message ?? 'An error occurred',
        variant: "destructive"
      })
    }
  })
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button>Edit Role</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Edit Role
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Change the details of the role.
          </DialogDescription>
        </DialogHeader>
        <RoleForm roleAction={editRole} defaultValues={defaultValues}  />
      </DialogContent>
    </Dialog>
  )
}
