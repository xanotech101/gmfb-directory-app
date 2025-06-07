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
      return <FileImage className="size-8 text-blue-500 flex-shrink-0" />
    } else if (type.startsWith('video/')) {
      return <FileVideo className="size-8 text-purple-500 flex-shrink-0" />
    } else if (type.includes('text') || type.includes('document')) {
      return <FileText className="size-8 text-green-500 flex-shrink-0" />
    } else {
      return <File className="size-8 text-gray-500 flex-shrink-0" />
    }
  }

  return type.startsWith('image/') ? (
    <Image
      className="size-8 object-cover rounded-lg flex-shrink-0"
      width={32}
      height={32}
      {...props}
      alt={props.alt ?? 'File Icon'}
      src={imageUrl}
    />
  ) : (
    <>{getFileIcon()}</>
  )
}
