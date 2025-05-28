import React, { useState, useRef } from 'react'
import { Upload } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { cx } from 'class-variance-authority'

export interface FileItem {
  id: string
  file: File | string
  type: string
}

interface FilePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
}

const FilePicker: React.FC<FilePickerProps> = ({ setFiles, ...props }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles: FileItem[] = Array.from(selectedFiles).map((file) => ({
      id: uuidv4(),
      file,
      type: file.type,
    }))

    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div
      className={cx(
        'rounded-lg border border-dashed border-gray-900/25 px-6 py-16 text-center transition-all duration-200 cursor-pointer bg-gray-50',
        {
          'border-blue-500 bg-blue-50': isDragOver,
          'border-gray-300 hover:border-gray-400 hover:bg-gray-50': !isDragOver,
        },
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <svg
        className="mx-auto size-12 text-gray-300"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        data-slot="icon"
      >
        <path
          fill-rule="evenodd"
          d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to browse</p>
      <p className="text-sm text-gray-500">{props.placeholder}</p>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileInputChange}
        {...props}
      />
    </div>
  )
}

export default FilePicker
