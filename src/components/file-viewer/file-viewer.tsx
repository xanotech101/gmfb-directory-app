import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { View } from 'lucide-react'

interface FileViewerProps {
  type: string
  url: string
  title: string
}

export const FileViewer = ({ url, title, type }: FileViewerProps) => {
  let viewerUrl = url
  if (
    type === 'application/msword' ||
    type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`
  } else {
    viewerUrl = `${url}#toolbar=0&navpanes=0&scrollbar=0`
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0 !bg-transparent" title="Open file">
          <View className="h-4 w-4" />
          <span className="sr-only">Open file</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-7xl h-[90vh] bg-white p-0"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="w-full h-full flex items-center justify-center p-8 ">
          <div className="w-full h-full relative">
            <iframe
              src={viewerUrl}
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
