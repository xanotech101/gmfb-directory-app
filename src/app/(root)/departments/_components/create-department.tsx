import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InviteUserFormFields } from '../../users/_components/invite-user-form-fields'

export const CreateDepartment = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Department</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Create a new department
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Fill in the form below to create a new department
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-8 mt-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3 text-sm text-gray-700"
            />
          </div>
          <hr />
          <InviteUserFormFields />
          <Button type="submit" className="w-full">
            Create Department
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
