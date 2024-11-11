import * as React from 'react'
import { mergeRefs } from 'react-merge-refs'
import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', ...props }, ref) => {
  const [inputType, setInputType] = useState(type)
  const localRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative">
      <input
        type={inputType}
        ref={mergeRefs([localRef, ref])}
        className={cn(
          'flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
      {type === 'password' && (
        <button
          type="button"
          className="absolute top-1/4 right-3 text-xs bg-gray-200/50 p-1 rounded"
          onClick={() => {
            setInputType((prev => prev === 'password' ? 'text' : 'password'))
            localRef?.current?.focus()
          }}
        >
          {inputType === 'password' ? 'Show' : 'Hide'}
        </button>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
