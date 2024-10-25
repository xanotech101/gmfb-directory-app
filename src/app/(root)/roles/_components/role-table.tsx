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
import { EditRole } from '@/app/(root)/roles/_components/edit-role'
import Link from 'next/link'
import React from 'react'

interface RoleTableProps {
  data: any
}

export const RoleTable = ({ data }: RoleTableProps) => {
  console.log(data, 'users')
  return (
    <Table>
      <TableCaption className="sr-only">A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Permissions</TableHead>
          <TableHead className="sr-only">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
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
                  <EditRole />
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

  )
}
