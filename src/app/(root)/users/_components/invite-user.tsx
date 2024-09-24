import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { InviteUserFormFields } from './invite-user-form-fields'

export const InviteUser = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Invite User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Invite User
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Add the details of the user you want to invite here.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col space-y-6">
          <InviteUserFormFields />
          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
