/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { EllipsisVertical, ReceiptTextIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getRandomColor } from '@/lib/random-color'
import { EditFolder } from './dialog/edit-folder'
import Link from 'next/link'
import { DeleteFolder } from './dialog/delete-folder'

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
              <TableCell>{folder?.files_count ?? 0}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-8 flex items-center justify-center">
                      <EllipsisVertical size={16} className="flex-shrink-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-auto max-w-56">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                      <EditFolder defaultValues={folder} folderId={folder.id} />
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                      <DeleteFolder folderId={folder.id} />
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                      <Link
                        href={`/folders/${folder.id}`}
                        className="w-full text-sm text-left flex items-center gap-1"
                      >
                        <ReceiptTextIcon className="size-4" />
                        View Details
                      </Link>
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
