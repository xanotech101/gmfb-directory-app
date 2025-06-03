import { Card, CardContent } from '@/components/ui/card'
import { SquareArrowOutUpRight, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ConfirmAction } from '@/components/confirm-action/confirm-action'
import { useState } from 'react'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { FileIcon } from '@/components/file-icon/file-icon'

interface FileCardProps {
  file: {
    id: string
    url: string
    type: string
  }
}

interface FileCardProps {
  handleDelete?: UseMutateAsyncFunction<
    unknown,
    Error,
    { documentId: string; fileId: string },
    unknown
  >
  file: {
    id: string
    url: string
    type: string
  }
  documentId: string
}

export function FileCard({ file, handleDelete, documentId }: FileCardProps) {
  const fileName = file.url.split('/').pop() || 'Unnamed File'
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <Card className="overflow-hidden" key={file.id}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 truncate mr-4">
          <FileIcon type={file.type} imageUrl={file.url} />
          <span className="font-medium truncate" title={fileName}>
            {fileName}
          </span>
        </div>
        <div className="flex space-x-3">
          {handleDelete && (
            <ConfirmAction
              trigger={
                <Button variant="ghost" className="p-0 !bg-transparent" title="Open file">
                  <Trash2Icon className="h-4 w-4 text-red-600" />
                  <span className="sr-only">Delete file</span>
                </Button>
              }
              title="Delete Document File"
              description="Are you sure you want to delete this file? This action cannot be undone."
              actionProps={{
                action: async () => {
                  setIsDeleting(true)
                  await handleDelete({
                    documentId,
                    fileId: file.id,
                  }).finally(() => setIsDeleting(false))
                },
                isLoading: isDeleting,
                buttonProps: {
                  variant: 'destructive',
                  children: 'Delete',
                },
              }}
            />
          )}
          <Button
            variant="ghost"
            className="p-0 !bg-transparent"
            onClick={() => window.open(file.url, '_blank')}
            title="Open file"
          >
            <SquareArrowOutUpRight className="h-4 w-4" />
            <span className="sr-only">Open file</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
