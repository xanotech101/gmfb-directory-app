import { getRandomColor } from '@/lib/random-color'
import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'

interface UserAvatarProps {
  firstName: string
  lastName: string
}

export const UserAvatar = ({ firstName, lastName }: UserAvatarProps) => {
  return (
    <Avatar
      className="size-7 flex-shrink-0 border-2 text-sm"
      style={{
        border: `2px solid ${getRandomColor(0).border}`,
      }}
    >
      <AvatarFallback
        className="h-full w-full flex justify-center items-center"
        style={{
          backgroundColor: getRandomColor(0).background,
          color: getRandomColor(0).text,
        }}
      >
        {firstName?.[0]}
        {lastName?.[0]}
      </AvatarFallback>
    </Avatar>
  )
}
