import { useEffect, useState } from 'react'
import { FileIcon } from '../file-icon/file-icon'

interface FilePreviewProps {
  file: File | string
  type: string
}

const FilePreview = ({ file, type }: FilePreviewProps) => {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (typeof file === 'string') {
      setImageUrl(file)
    } else {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [type, file])

  const getFileName = (file: string | File) => {
    if (typeof file === 'string') {
      return file.split('/').pop() || file
    }
    return file.name
  }

  return (
    <div title={getFileName(file)} className="flex items-center flex-col">
      <FileIcon type={type} imageUrl={imageUrl} />
      <p className="text-sm font-medium text-gray-900 text-center break-all line-clamp-1">
        {getFileName(file)}
      </p>
    </div>
  )
}

export default FilePreview
