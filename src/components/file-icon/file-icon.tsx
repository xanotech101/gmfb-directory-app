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
      return <FileImage className="h-12 w-12 text-blue-500" />
    } else if (type.startsWith('video/')) {
      return <FileVideo className="h-12 w-12 text-purple-500" />
    } else if (type.includes('text') || type.includes('document')) {
      return <FileText className="h-12 w-12 text-green-500" />
    } else {
      return <File className="h-12 w-12 text-gray-500" />
    }
  }

  return type.startsWith('image/') ? (
    <Image
      className="w-12 h-12 object-cover rounded-lg"
      width={48}
      height={48}
      {...props}
      alt={props.alt ?? 'File Icon'}
      src={imageUrl}
    />
  ) : (
    <>{getFileIcon()}</>
  )
}
