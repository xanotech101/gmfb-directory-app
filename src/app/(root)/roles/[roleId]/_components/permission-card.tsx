'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { CheckedState } from '@radix-ui/react-checkbox'

interface PermissionCardProps {
  scope: string
  scopePermissions: Record<string, string>[]
  selectedPermissions: string[]
  setSelectedPermissions(permissions: string[]): void
}

export const PermissionCard = ({ scope, scopePermissions, selectedPermissions = [], setSelectedPermissions }: PermissionCardProps) => {

  const handleCheckAll = (isChecked: boolean) => {
    if(isChecked) {
      setSelectedPermissions(scopePermissions.map((p) => p.id))
    } else {
      setSelectedPermissions([])
    }
  }

  const handleCheckSingle = (isChecked: CheckedState, permissionId: string) => {
    if(isChecked === true) {
     setSelectedPermissions([...selectedPermissions, permissionId])
    } else {
      setSelectedPermissions(selectedPermissions.filter((id) => id !== permissionId))
    }
  }

  return (
    <Card className="overflow-hidden rounded-md">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center text-sm bg-gray-50 p-6 py-3 border-b">
          <Checkbox
            defaultChecked={selectedPermissions.length === scopePermissions.length}
            checked={selectedPermissions.length === scopePermissions.length}
            onCheckedChange={(checked: boolean) => handleCheckAll(checked)}
            className="mr-2"
          />
          <span className="capitalize">{scope}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-none divide-y divide-gray-200">
          {scopePermissions.map((permission, idx) => (
            <li
              key={idx}
              className="flex items-center py-4 text-sm whitespace-nowrap"
            >
              <Checkbox
                checked={selectedPermissions.includes(permission.id)}
                onCheckedChange={(checked) => handleCheckSingle(checked, permission.id)}
                className="mr-2"
              />
              <span className="text-gray-600">{permission.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
