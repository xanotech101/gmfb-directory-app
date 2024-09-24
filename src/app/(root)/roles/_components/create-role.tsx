import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const CreateRole = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Role</Button>
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
        <form className="space-y-8 mt-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3 text-sm text-gray-700"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" className="w-full">
            Create role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
