"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from 'next/image';

interface Role {
  type: string;
  number_of_users: string;
  permissions: string[];
  date_added: Date;
}

const roles = [
  {
    type: "Administrator",
    number_of_users: "5",
    permissions: ["All Access", "Moderator"],
    date_added: new Date(),
  },
  // More roles...
];

export default function Roles() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRRole] = useState<Role | null>(null);

  const toggleModal = (role: Role) => {
    setSelectedRRole(role);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRRole(null);
  };

  const newRoleModal =
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create a new Role
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Create Role</DialogTitle>
          <DialogDescription className="text-sm text-gray-700">
            Add the details of the user you want to invite here. Click save when {"you're"} done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-sm text-gray-700">
              Role Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3 text-sm text-gray-700"
            />
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg px-4">
            <div>
              <Switch
              // checked={field.value}
              // onCheckedChange={field.onChange}
              />
            </div>
            <div className="space-y-0.5">
              <Label className="text-base font-semibold leading-6 text-gray-900">
                All Access
              </Label>
              <p>
                This is a placeholder for the description.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg px-4">
            <div>
              <Switch
              // checked={field.value}
              // onCheckedChange={field.onChange}
              />
            </div>
            <div className="space-y-0.5">
              <Label className="text-base font-semibold leading-6 text-gray-900">
                Payouts & Transactions
              </Label>
              <p>
                This is a placeholder for the description.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  const editRoleModal = (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent
        className="w-[200px] right-0 sm:max-w-none"
        style={{ position: 'absolute', right: 0 }}
      >
        <Button>Admin</Button>
        <Button>Inactive</Button>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {isModalOpen && editRoleModal}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Roles
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the roles in your account including their type, number of users,
            permissions and date added.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {newRoleModal}
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Role Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    No Of Users
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Permissions
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date Added
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {roles.map((role) => (
                  <tr key={role.type}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="">
                          <div className="font-medium text-gray-900">
                            {role.type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{role.number_of_users}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission, index) => (
                          <span
                            key={index}
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${permission === "All Access"
                              ? "bg-green-50 text-green-700 ring-green-600/20"
                              : permission === "Moderator"
                                ? "bg-[#FFECE5] text-[#AD3307] ring-[#AD3307]/20"
                                : "bg-gray-100 text-gray-700 ring-gray-300/20"
                              }`}
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">
                        {new Date(role.date_added).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        {new Date(role.date_added).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={() => toggleModal(role)}
                        className="text-indigo-600 hover:text-indigo-900 text-[20px] sm:text-[20px]"
                      >
                        <Image
                          width={20}
                          height={20}
                          alt=""
                          className="ml-[5px] rounded z-0 object-cover"
                          src='/dots-v.svg'
                        />
                        <span className="sr-only">, {selectedRole?.type}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
