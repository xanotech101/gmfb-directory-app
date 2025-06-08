import React, { ComponentProps, useState } from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'

interface SearchInputProps extends ComponentProps<typeof Input> {
  onSearch: (value: string) => void
  debounce?: boolean
  debounceTime?: number
}

export const SearchInput = ({
  onSearch,
  debounce,
  debounceTime = 900,
  ...props
}: SearchInputProps) => {
  const [value, setValue] = useState(props.value)
  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearch(value)
  }, debounceTime)

  return (
    <div className="w-auto mb-4 relative max-w-xs">
      <Input
        {...props}
        className="pl-8"
        type="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          if (debounce) {
            debouncedSearch(e.target.value)
          }
        }}
      />
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
        <Search size={16} />
      </span>
    </div>
  )
}
