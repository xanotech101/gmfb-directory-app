import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface OTPProps {
  onClose: () => void
}

export const OTP: React.FC<OTPProps> = ({ onClose }) => {
  const [otp, setOtp] = useState(Array(6).fill(''))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    if (value.match(/^[0-9]{0,1}$/)) {
      // Allow only numbers
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Enter OTP
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            A six-digit OTP has been sent to your email. Please enter it below to verify your
            account.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 mt-4">
          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-[#891C69] focus:border-[#891C69] solid"
              />
            ))}
          </div>
        </form>

        <DialogFooter className="mt-6">
          <Button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full bg-[#891C69] hover:bg-[#974D7B] focus:outline-none focus:ring-2 focus:ring-[#974D7B]"
          >
            Verify OTP
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
