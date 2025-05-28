import { FileText, FileImage, FileVideo, File as FileIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface FilePreviewProps {
  file: File | string
  type: string
}

const FilePreview = ({ file, type }: FilePreviewProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (typeof file === 'string') {
      setImageUrl(file)
    } else {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [type, file])

  const getFileIcon = () => {
    if (type.startsWith('image/')) {
      return <FileImage className="h-12 w-12 text-blue-500" />
    } else if (type.startsWith('video/')) {
      return <FileVideo className="h-12 w-12 text-purple-500" />
    } else if (type.includes('text') || type.includes('document')) {
      return <FileText className="h-12 w-12 text-green-500" />
    } else {
      return <FileIcon className="h-12 w-12 text-gray-500" />
    }
  }

  const getFileName = (file: string | File) => {
    if (typeof file === 'string') {
      return file.split('/').pop() || file
    }
    return file.name
  }

  return (
    <div title={getFileName(file)} className="flex items-center flex-col">
      {type.startsWith('image/') && imageUrl ? (
        <Image
          src={imageUrl}
          alt={typeof file === 'string' ? file : file.name}
          className="w-12 h-12 object-cover rounded-lg mb-2"
          width={48}
          height={48}
        />
      ) : (
        <div className="mb-2">{getFileIcon()}</div>
      )}

      <p className="text-sm font-medium text-gray-900 text-center truncate w-full">
        {getFileName(file)}
      </p>
    </div>
  )
}

export default FilePreview
