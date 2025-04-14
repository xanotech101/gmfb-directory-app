/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { MultiSelect } from '@/components/ui/multi-select'
import { useSearchUsers } from '@/app/(root)/hooks/use-user-search'
import { UseMutationResult } from '@tanstack/react-query'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Subject must be at least 2 characters.',
  }),
  hod: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
})

interface DepartmentFormProps {
  onSubmit: UseMutationResult<any, unknown, any, unknown>
  defaultValues?: z.infer<typeof formSchema>
}

export const DepartmentForm = ({ onSubmit, defaultValues }: DepartmentFormProps) => {
  const { userSearchString, setUserSearchString, users } = useSearchUsers()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      hod: defaultValues?.hod ?? [],
    },
  })

  const submitForm = async (values: z.infer<typeof formSchema>) => {
    onSubmit.mutate({ name: values.name, hod_id: values?.hod?.[0]?.value })
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter department name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hod</FormLabel>
              <FormControl>
                <MultiSelect
                  options={
                    users.data?.data?.items?.map((u: any) => ({
                      label: `${u.first_name} ${u.last_name}`,
                      value: u.id,
                    })) ?? []
                  }
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  modalPopover
                  placeholder="Select hod"
                  variant="inverted"
                  animation={2}
                  maxCount={1}
                  filterValue={userSearchString}
                  onFilterChange={setUserSearchString}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          onClick={form.handleSubmit(submitForm)}
          isLoading={onSubmit?.status === 'pending'}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
