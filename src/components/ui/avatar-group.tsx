import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getRandomColor } from '@/lib/random-color'

interface Content {
  name: string
  image?: string
}

interface AvatarGroupProps {
  content?: Content[]
  max?: number
  size?: number
  fontSize?: number
}

export default function AvatarGroup({ content = [], max = 5, size, fontSize }: AvatarGroupProps) {
  const displayUsers = content.slice(0, max)
  const remainingUsers = Math.max(content.length - max, 0)
  const lastIndex = content.length - 1

  return (
    <TooltipProvider>
      <div className="flex -space-x-2">
        {displayUsers.map((c, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Avatar
                className="hover:z-10"
                style={{
                  width: size ? `${size}px` : undefined,
                  height: size ? `${size}px` : undefined,
                  border: c?.image ? 'none' : `2px solid ${getRandomColor().border}`,
                }}
              >
                <AvatarImage src={c.image} alt={c.name} />
                <AvatarFallback
                  className="uppercase flex items-center justify-center"
                  style={{
                    backgroundColor: getRandomColor().background,
                    color: getRandomColor().text,
                    fontSize: `${fontSize}px`,
                  }}
                >
                  {c.name
                    .split(' ')
                    .splice(0, 2)
                    .map((name) => name[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{c.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        {remainingUsers > 0 && (
          <Avatar
            className="hover:z-10"
            style={{
              width: size ? `${size}px` : undefined,
              height: size ? `${size}px` : undefined,
              border: `2px solid ${getRandomColor().border}`,
            }}
          >
            <AvatarFallback
              style={{
                backgroundColor: getRandomColor().background,
                color: getRandomColor().text,
                border: `1px solid ${getRandomColor().border}`,
                fontSize: `${fontSize}px`,
              }}
            >
              +{remainingUsers}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </TooltipProvider>
  )
}
