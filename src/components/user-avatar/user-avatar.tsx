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
      className={cn(`size-7 flex-shrink-0 border-2 text-sm`, className)}
      style={{
        border: `2px solid ${getRandomColor().border}`,
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
