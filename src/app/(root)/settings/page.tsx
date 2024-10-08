'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-Label'
import { useState } from 'react'

export default function Settings() {
  const [activeSection, setActiveSection] = useState<'account' | 'password'>('account')

  const [profile, setProfile] = useState({
    username: 'JohnDoe',
    phone: '123-456-7890',
    email: 'johndoe@example.com',
    created_at: '2020-05-01',
    gender: 'Male',
    birth_date: '1990-01-01',
    age: 34,
  })

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile Updated', profile)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Password Updated', passwords)
  }

  return (
    <div className="mx-auto">
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveSection('account')}
          className={`px-4 py-2 rounded ${
            activeSection === 'account' ? 'bg-[#891C69] text-white' : 'bg-gray-200'
          }`}
        >
          Your Account Information
        </button>
        <button
          onClick={() => setActiveSection('password')}
          className={`px-4 py-2 rounded ${
            activeSection === 'password' ? 'bg-[#891C69] text-white' : 'bg-gray-200'
          }`}
        >
          Change Your Password
        </button>
      </div>

      {activeSection === 'account' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="username">
                Username
              </Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={profile.username}
                onChange={handleProfileChange}
                className="w-full p-2 border-b rounded"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone
              </Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full p-2 border-b rounded"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full p-2 border-b rounded"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="created_at">
                Account Creation
              </Label>
              <Input
                type="text"
                name="created_at"
                id="created_at"
                value={profile.created_at}
                readOnly
                className="w-full p-2 border-b rounded bg-gray-100"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="gender">
                Gender
              </Label>
              <Input
                type="text"
                name="gender"
                id="gender"
                value={profile.gender}
                onChange={handleProfileChange}
                className="w-full p-2 border-b rounded"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="birth_date">
                Birth Date
              </Label>
              <Input
                type="date"
                name="birth_date"
                id="birth_date"
                value={profile.birth_date}
                onChange={handleProfileChange}
                className="w-full p-2 border-b rounded"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="age">
                Age
              </Label>
              <Input
                type="number"
                name="age"
                id="age"
                value={profile.age}
                readOnly
                className="w-full p-2 border-b rounded bg-gray-100"
              />
            </div>

            <Button type="submit" className="bg-[#891C69] hover:bg-[#974D7B]">
              Save Changes
            </Button>
          </form>
        </div>
      )}

      {activeSection === 'password' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="currentPassword">
                Current Password
              </Label>
              <Input
                type="password"
                name="currentPassword"
                id="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border-b rounded"
                required
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="newPassword">
                New Password
              </Label>
              <Input
                type="password"
                name="newPassword"
                id="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border-b rounded"
                required
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                Confirm New Password
              </Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border-b rounded"
                required
              />
            </div>

            <Button type="submit" className="bg-[#891C69] hover:bg-[#974D7B]">
              Change Password
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
