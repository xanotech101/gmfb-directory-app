/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import React, { ComponentProps, useState } from 'react'

interface ConfirmActionProps {
  trigger: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  actionProps: {
    action(): Promise<unknown>
    isLoading: boolean
    buttonProps: ComponentProps<typeof Button>
  }
}

export const ConfirmAction = ({ trigger, title, description, actionProps }: ConfirmActionProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => setOpen(false)}
            disabled={actionProps.isLoading}
          >
            Cancel
          </Button>
          <Button
            {...actionProps.buttonProps}
            onClick={() => {
              actionProps.action().then(() => {
                setOpen(false)
              })
            }}
            isLoading={actionProps.isLoading}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
