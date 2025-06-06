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
import { EditRole } from './form/edit-role'

interface RoleTableProps {
  data: any
  onEditSuccess: () => void
}

export const RoleTable = ({ data, onEditSuccess }: RoleTableProps) => {
  return (
    <div className="border overflow-hidden rounded-lg">
      <Table className="rounded-lg overflow-hidden shadow-sm">
        <TableCaption className="sr-only">A list of your recent invoices.</TableCaption>
        <TableHeader className="bg-neutral-100">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead className="sr-only">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {data?.map((r: any) => (
            <TableRow key={r.id}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.description}</TableCell>
              <TableCell>{r.permissions.length}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-8 flex items-center justify-center">
                      <EllipsisVertical size={16} className="flex-shrink-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-auto max-w-56">
                    <DropdownMenuItem
                      className={cn(r.is_default && 'opacity-50 cursor-not-allowed')}
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                      }}
                    >
                      {r.is_default ? (
                        'Edit role'
                      ) : (
                        <EditRole defaultValues={r} onSuccess={onEditSuccess} roleId={r.id} />
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/roles/${r.id}`}>Manage Permissions</Link>
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
