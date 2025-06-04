import { ConfirmAction } from '@/components/confirm-action/confirm-action'
import { toast } from '@/hooks/use-toast'
import { patch } from '@/lib/fetch'
import { useMutation } from '@tanstack/react-query'
import { KeyRoundIcon } from 'lucide-react'
import React from 'react'

export const ResetPassword = ({ userId }: { userId: string }) => {
  const resetPassword = useMutation({
    mutationKey: ['reset-password'],
    mutationFn: async () =>
      patch(`/api/users/${userId}/reset-password`, {
        isClient: true,
      }),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Password reset link sent to user',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error.message ?? 'An error occurred',
      })
    },
  })
  return (
    <ConfirmAction
      trigger={
        <button className="w-full text-sm text-left flex items-center gap-1">
          <KeyRoundIcon className="size-4" />
          Reset Password
        </button>
      }
      title="Reset Password"
      description="Are you sure you want to reset this user's password?"
      actionProps={{
        action: () => resetPassword.mutateAsync(),
        isLoading: resetPassword.isPending,
        buttonProps: {
          variant: 'default',
          children: 'Reset Password',
        },
      }}
    />
  )
}
