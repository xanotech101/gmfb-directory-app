import { FileImage, FileText, FileVideo, File } from 'lucide-react'
import Image from 'next/image'
import React, { ComponentProps } from 'react'

interface FileIconProps extends Partial<ComponentProps<typeof Image>> {
  type: string
  imageUrl: string
}

export const FileIcon = ({ type, imageUrl, ...props }: FileIconProps) => {
  const getFileIcon = () => {
    if (type.startsWith('image/')) {
      return <FileImage className="size-10 text-blue-500 flex-shrink-0" />
    } else if (type.startsWith('video/')) {
      return <FileVideo className="size-10 text-purple-500 flex-shrink-0" />
    } else if (type.includes('text') || type.includes('document')) {
      return <FileText className="size-10 text-green-500 flex-shrink-0" />
    } else {
      return <File className="size-10 text-gray-500 flex-shrink-0" />
    }
  }

  return type.startsWith('image/') ? (
    <Image
      className="size-10 object-cover rounded-lg flex-shrink-0"
      width={40}
      height={40}
      {...props}
      alt={props.alt ?? 'File Icon'}
      src={imageUrl}
    />
  ) : (
    <>{getFileIcon()}</>
  )
}
