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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MultiSelect } from '@/components/ui/multi-select'
import { UseMutationResult } from '@tanstack/react-query'
import { useSearchUsers } from '@/hooks/use-user-search'
import { formSchema, FormValues } from './schema'

interface DepartmentFormProps {
  onSubmit: UseMutationResult<any, unknown, any, unknown>
  defaultValues?: FormValues
}

export const DepartmentForm = ({ onSubmit, defaultValues }: DepartmentFormProps) => {
  const { userSearchString, setUserSearchString, users } = useSearchUsers()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      hod: defaultValues?.hod ?? [],
    },
  })

  const submitForm = async (values: FormValues) => {
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
                  options={users}
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
