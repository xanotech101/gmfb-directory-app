import * as z from 'zod'

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 5MB
export const formSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
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
