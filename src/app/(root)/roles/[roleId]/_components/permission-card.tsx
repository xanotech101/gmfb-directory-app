'use client'
import React, { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

const roles = [
  {
    name: 'Customer',
    permissions: [
      'Can View Business Metrics',
      'Can Edit Business Metrics',
      'Can Delete Business Metrics',
      'Can View Customer Data',
    ],
  },
  {
    name: 'Member',
    permissions: [
      'Can View Business Metrics',
      'Can Edit Business Metrics',
      'Can Delete Business Metrics',
      'Can View Customer Data',
    ],
  },
  {
    name: 'User',
    permissions: [
      'Can View Business Metrics',
      'Can Edit Business Metrics',
      'Can Delete Business Metrics',
      'Can View Customer Data',
      'Can Edit Customer Data',
      'Can Delete Customer Data',
      'Can View Sales Data',
      'Can Edit Sales Data',
      'Can Delete Sales Data',
    ],
  },
  {
    name: 'Admin',
    permissions: [
      'Can View Business Metrics',
      'Can Edit Business Metrics',
      'Can Delete Business Metrics',
      'Can View Customer Data',
      'Can Edit Customer Data',
      'Can Delete Customer Data',
      'Can View Sales Data',
      'Can Edit Sales Data',
      'Can Delete Sales Data',
    ],
  },
]

export const PermissionCard = () => {
  const [selectedPermissions, setSelectedPermissions] = useState<{ [role: string]: string[] }>({})

  const handlePermissionCheckboxChange = (role: string, permission: string) => {
    setSelectedPermissions((prevState) => {
      const rolePermissions = prevState[role] || []
      if (rolePermissions.includes(permission)) {
        return {
          ...prevState,
          [role]: rolePermissions.filter((p) => p !== permission),
        }
      } else {
        return {
          ...prevState,
          [role]: [...rolePermissions, permission],
        }
      }
    })
  }
  const handleRoleCheckboxChange = (roleName: string, isChecked: boolean) => {
    setSelectedPermissions((prevSelectedPermissions) => {
      const updatedPermissions = { ...prevSelectedPermissions }

      if (isChecked) {
        updatedPermissions[roleName] =
          roles.find((role) => role.name === roleName)?.permissions || []
      } else {
        updatedPermissions[roleName] = []
      }

      return updatedPermissions
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 mx-4 sm:mx-6 lg:mx-0">
      {roles.map((role, index) => (
        <div key={index} className="rounded border border-gray-200">
          <ul className="list-none">
            <li className="flex items-center border-b-[0.5px] border-gray-200 bg-[#F6F6F6] py-4 px-2 text-sm font-semibold pb-2">
              <Checkbox
                checked={selectedPermissions[role.name]?.length === role.permissions.length}
                onCheckedChange={(checked: boolean) => handleRoleCheckboxChange(role.name, checked)}
                className="mr-2"
              />
              <span>{role.name}</span>
            </li>
            {role.permissions.map((permission, idx) => (
              <li
                key={idx}
                className="flex items-center border-b-[0.5px] border-gray-200 p-2 text-sm mt-4 pb-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
              >
                <Checkbox
                  checked={selectedPermissions[role.name]?.includes(permission) || false}
                  onCheckedChange={() => handlePermissionCheckboxChange(role.name, permission)}
                  className="mr-2"
                />
                <span>{permission}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
