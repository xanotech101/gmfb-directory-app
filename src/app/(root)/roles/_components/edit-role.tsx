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

export const EditRole = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-transparent font-normal shadow-none text-sm text-[#000000] flex justify-start px-2 hover:bg-[#F6F6F6]">
          Edit Role
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Edit Role
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Update the details of the role you want to edit.
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#891C69] sm:text-sm sm:leading-6"
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" className="w-full bg-[#891C69] hover:bg-[#974D7B]">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
