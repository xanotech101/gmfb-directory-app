/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseMutationResult } from '@tanstack/react-query'
import { MultiSelect } from '@/components/ui/multi-select'
import { useDepartmentSearch } from '@/app/(root)/hooks/use-department-search'
import { useState } from 'react'

const formSchema = z.object({
  departments: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })),
})

interface ManageDepartmentsProps {
  manageDepartments: UseMutationResult<any, unknown, any, unknown>
  user: {
    id: string
    departments: Record<string, string>[]
    first_name: string
    last_name: string
  }
}


export const ManageDepartments = ({ user, manageDepartments }: ManageDepartmentsProps) => {
  const [open, setOpen] = useState(false)
  const { deptSearchString, setDeptSearchString,  departments} = useDepartmentSearch()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departments: user.departments?.map((d: any) => ({
        label: d.name,
        value: d.id,
      })) ?? [],
    },
  })



  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    return manageDepartments.mutateAsync({
      userId: user.id,
      departments: values.departments
    }).then(() => {
      setOpen(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <button>Manage Departments</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
            Manage Departments
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Update departments for {user.first_name} {user.last_name}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="departments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <MultiSelect
                      modalPopover={true}
                      options={departments.data?.data?.items?.map((d: any) => ({
                        label: d.name,
                        value: d.id,
                      })) ?? []}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select departments"
                      variant="inverted"
                      animation={2}
                      maxCount={5}
                      filterValue={deptSearchString}
                      onFilterChange={setDeptSearchString}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" onClick={() => {
              form.handleSubmit(onSubmit)()
            }} className="w-full" isLoading={manageDepartments.status === 'pending'}>
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
