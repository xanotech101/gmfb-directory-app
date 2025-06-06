/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { post } from '@/lib/fetch'
import { toast } from '@/hooks/use-toast'
import { RoleForm } from './role-form'
import { Plus } from 'lucide-react'

interface CreateRoleProps {
  onSuccess: () => void
}

export const CreateRole = ({ onSuccess }: CreateRoleProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const createRole = useMutation({
    mutationKey: ['create-role'],
    mutationFn: async (payload: { name: string; description: string }) =>
      post(`/api/roles`, {
        isClient: true,
        body: payload,
      }),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'The role has been created successfully',
      })
      onSuccess()
      setIsOpen(false)
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message ?? 'An error occurred',
        variant: 'destructive',
      })
    },
  })
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
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
        <RoleForm roleAction={createRole} />
      </DialogContent>
    </Dialog>
  )
}
