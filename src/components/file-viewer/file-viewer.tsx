import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { View } from 'lucide-react'

interface FileViewerProps {
  type: string
  url: string
  title: string
}

export const FileViewer = ({ type, url, title }: FileViewerProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0 !bg-transparent" title="Open file">
          <View className="h-4 w-4" />
          <span className="sr-only">Open file</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-4xl h-[80vh] bg-white p-0"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="w-full h-full flex items-center justify-center p-8 ">
          <div className="w-full h-full relative">
            <iframe
              src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
              className="absolute inset-0 w-full h-full border border-gray-300 rounded-md"
              title={title}
              allow="fullscreen"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
