"use client";
import React, { useState } from "react";

const roles = [
  {
    name: "customer",
    permissions: [
      'Can View Business Performance Metrics',
      'Can Edit Business Performance Metrics',
      'Can Delete Business Performance Metrics',
      'Can View Customer Data',
    ],
  },
  {
    name: "user",
    permissions: [
      'Can View Business Performance Metrics',
      'Can Edit Business Performance Metrics',
      'Can Delete Business Performance Metrics',
      'Can View Customer Data',
      'Can Edit Customer Data',
      'Can Delete Customer Data',
      'Can View Sales Data',
      'Can Edit Sales Data',
      'Can Delete Sales Data',
    ],
  },
  {
    name: "user",
    permissions: [
      'Can View Business Performance Metrics',
      'Can Edit Business Performance Metrics',
      'Can Delete Business Performance Metrics',
      'Can View Customer Data',
      'Can Edit Customer Data',
      'Can Delete Customer Data',
      'Can View Sales Data',
      'Can Edit Sales Data',
      'Can Delete Sales Data',
    ],
  },
]
export default function Permissions() {
  const [selectedPermissions, setSelectedPermissions] = useState<{ [role: string]: string[] }>({});

  const handleCheckboxChange = (role: string, permission: string) => {
    setSelectedPermissions(prevState => {
      const rolePermissions = prevState[role] || [];
      if (rolePermissions.includes(permission)) {
        return {
          ...prevState,
          [role]: rolePermissions.filter(p => p !== permission),
        };
      } else {
        return {
          ...prevState,
          [role]: [...rolePermissions, permission],
        };
      }
    });
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-center font-semibold leading-6 text-gray-900">
            Hi, User
          </h1>
          <p className="mt-2 text-center text-sm text-gray-700">
            A list of all the roles permissions.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mx-4 sm:mx-6 lg:mx-8">
        {roles.map((role, index) => (
          <div key={index} className="rounded bg-[#F6F6F680] border border-gray-200">
            <h1 className="text-center font-semibold leading-6 bg-gray-100 p-4 text-gray-900">
              {role.name}
            </h1>
            <ul className="list-none mt-2 py-4 px-6">
              {role.permissions.map((permission, idx) => (
                <li key={idx} className="border-b-[0.5px] border-gray-200 p-2 text-sm mt-4 pb-2">
                  <input
                    type="checkbox"
                    checked={selectedPermissions[role.name]?.includes(permission) || false}
                    onChange={() => handleCheckboxChange(role.name, permission)}
                    className="border border-gray-200 mr-4"
                  />
                  <span>{permission}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
}
