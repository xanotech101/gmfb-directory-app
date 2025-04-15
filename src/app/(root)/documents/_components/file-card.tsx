import { Card, CardContent } from '@/components/ui/card'
import { DeleteIcon, ExternalLinkIcon, FileIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileCardProps {
  file: {
    id: string
    url: string
    type: string
  }
}

export function FileCard({ file }: FileCardProps) {
  const fileName = file.url.split('/').pop() || 'Unnamed File'

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileIcon className="h-6 w-6 text-primary" />
          <span className="font-medium truncate" title={fileName}>
            {fileName}
          </span>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => window.open(file.url, '_blank')}
            title="Open file"
          >
            <Trash2Icon className="h-4 w-4 text-red-600" />
            <span className="sr-only">Delete file</span>
          </Button>
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => window.open(file.url, '_blank')}
            title="Open file"
          >
            <ExternalLinkIcon className="h-4 w-4" />
            <span className="sr-only">Open file</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
