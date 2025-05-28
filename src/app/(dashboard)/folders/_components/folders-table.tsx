/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EllipsisVertical } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getRandomColor } from '@/lib/random-color'
import { EditFolder } from './form/edit-folder'

export const FoldersTable = ({ data }: any) => {
  return (
    <div className="border overflow-hidden rounded-lg">
      <Table className="rounded-lg overflow-hidden shadow-sm">
        <TableCaption className="sr-only">A list of your folders.</TableCaption>
        <TableHeader className="bg-neutral-100">
          <TableRow>
            <TableHead>Created By</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Files</TableHead>
            <TableHead className="sr-only">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {data?.map((folder: any, index: number) => (
            <TableRow key={folder.id}>
              <TableCell>
                <div className="flex items-basline">
                  <Avatar
                    className="size-8 flex-shrink-0 border-2 text-sm"
                    style={{
                      border: folder?.created_by?.avatar
                        ? 'none'
                        : `2px solid ${getRandomColor(index).border}`,
                    }}
                  >
                    <AvatarImage
                      src={folder?.created_by?.avatar}
                      alt={`${folder.created_by.first_name} ${folder.created_by.last_name}`}
                    />
                    <AvatarFallback
                      className="h-full w-full flex justify-center items-center"
                      style={{
                        backgroundColor: getRandomColor(index).background,
                        color: getRandomColor(index).text,
                      }}
                    >
                      {folder.created_by?.first_name[0]}
                      {folder.created_by?.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-2">
                    <div className="font-medium text-gray-900">
                      {folder?.created_by?.first_name} {folder?.created_by?.last_name}
                    </div>
                    <div className="mt-0 text-gray-500">{folder?.created_by?.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{folder.name}</TableCell>
              <TableCell>{0}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-8 flex items-center justify-center">
                      <EllipsisVertical size={16} className="flex-shrink-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-auto max-w-56">
                    <DropdownMenuItem
                      className={cn(folder.is_default && 'opacity-50 cursor-not-allowed')}
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                      }}
                    >
                      {<EditFolder defaultValues={folder} folderId={folder.id} />}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
