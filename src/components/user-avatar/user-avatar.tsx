import { getRandomColor } from '@/lib/random-color'
import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
  firstName: string
  lastName: string
  className?: string
}

export const UserAvatar = ({ firstName, lastName, className }: UserAvatarProps) => {
  return (
    <Avatar
      className={cn(`size-8 flex-shrink-0 border-1 text-sm`, className)}
      style={{
        border: `1px solid ${getRandomColor().border}`,
      }}
    >
      <AvatarFallback
        className="h-full w-full flex justify-center items-center"
        style={{
          backgroundColor: getRandomColor().background,
          color: getRandomColor().text,
        }}
      >
        {firstName?.[0]}
        {lastName?.[0]}
      </AvatarFallback>
    </Avatar>
  )
}
