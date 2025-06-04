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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MultiSelect } from '@/components/ui/multi-select'
import { useState } from 'react'
import { useDepartmentSearch } from '@/hooks/use-department-search'
import { Building } from 'lucide-react'
import { patch } from '@/lib/fetch'
import { toast } from '@/hooks/use-toast'

const formSchema = z.object({
  departments: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
})

interface ManageDepartmentsProps {
  user: {
    id: string
    departments: Record<string, string>[]
    first_name: string
    last_name: string
  }
}

export const ManageDepartments = ({ user }: ManageDepartmentsProps) => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const { deptSearchString, setDeptSearchString, departments } = useDepartmentSearch()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departments:
        user.departments?.map((d: any) => ({
          label: d.name,
          value: d.id,
        })) ?? [],
    },
  })

  const manageDepartments = useMutation({
    mutationKey: ['manage-departments'],
    mutationFn: async (payload: z.infer<typeof formSchema>) =>
      patch(`/api/users/${user.id}/departments`, {
        isClient: true,
        body: {
          departments: payload.departments.map((d: any) => d.value),
        },
      }),
    onSuccess: async () => {
      toast({
        title: 'Success',
        description: 'Updated departments successfully',
      })
      await queryClient.invalidateQueries({ queryKey: ['users'] })
      setOpen(false)
    },
    onError: (error) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error?.message ?? 'An error occurred',
      })
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) =>
    manageDepartments.mutateAsync({ departments: values.departments })

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <button className="w-full text-sm text-left flex items-center gap-1">
          <Building className="size-4" />
          Manage Departments
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900 ">
            Manage Departments
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700 !mt-1">
            Update departments for{' '}
            <strong>
              {user.first_name} {user.last_name}
            </strong>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="departments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <MultiSelect
                      modalPopover={true}
                      options={departments}
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
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              className="w-full"
              isLoading={manageDepartments.status === 'pending'}
            >
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
