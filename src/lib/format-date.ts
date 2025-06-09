import { format, isValid } from 'date-fns'

export const formatDate = (dateString: string) => {
  // check if it is a valid date string
  const date = new Date(dateString)
  if (!isValid(date)) {
    return ''
  }
  return format(date, 'PPpp')
}
