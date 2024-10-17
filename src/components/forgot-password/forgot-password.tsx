import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

interface ForgetPassword {
  show: boolean
  setShow(show: boolean): void
}

export const ForgetPassword: React.FC<ForgetPassword> = ({ show, setShow }) => {
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Forgot Password?
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Please contact support for assistance on how to reset your password.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center w-full mt-4">
          <div className="text-sm text-gray-600 space-y-2">
            {' '}
            <p className="font-semibold">
              Support Email: <span className="text-[#891C69]">support@example.com</span>
            </p>
            <p className="font-semibold">
              Phone: <span className="text-[#891C69]">+1 (800) 123-4567</span>
            </p>
            <p>
              Support Hours: <span className="italic">Mon-Fri, 9 AM - 5 PM EST</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
