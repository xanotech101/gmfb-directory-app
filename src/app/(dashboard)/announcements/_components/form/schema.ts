import * as z from 'zod'

export const formSchema = z.object({
  subject: z.string().min(2, {
    message: 'Subject must be at least 2 characters.',
  }),
  body: z.string().min(2, {
    message: 'Body must be at least 2 characters.',
  }),
  departments: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional()
    .default([]),
  users: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional()
    .default([]),
  send_to_all_departments: z.boolean().optional(),
  send_to_all_users: z.boolean().optional(),
})

export type FormValues = z.infer<typeof formSchema>
