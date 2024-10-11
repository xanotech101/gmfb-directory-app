'use client'
import { useRouter } from 'next/navigation'
import { AvatarFallback, Avatar, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'

export default function Profile() {
  const router = useRouter()

  const profile = {
    username: 'JohnDoe',
    first_name: 'John',
    last_name: 'Doe',
    role: 'Team Manager',
    location: 'Leeds, United Kingdom',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    gender: 'Male',
    birth_date: '1995-03-10',
    avatar: 'https://randomuser.me/api/portraits',
  }

  const handleEditProfile = () => {
    router.push('/settings')
  }

  return (
    <div className="w-full py-4">
      <div className="flex flex-col items-start mb-4">
        <h1 className="text-left font-semibold leading-6 text-gray-900">My Profile</h1>
      </div>

      <div className="flex items-center space-x-4 mb-6 p-4 border border-gray-200 rounded-md">
        <div className="h-20 w-20 flex-shrink-0">
          <Avatar className="rounded-full h-20 w-20">
            <AvatarImage
              src={profile.avatar}
              alt="profile image"
              className="rounded-full h-20 w-20"
            />
            <AvatarFallback className="h-full w-full bg-[#891C69] border border-[#974D7B] rounded-full flex items-center justify-center text-white">
              {profile.first_name[0]}
              {profile.last_name[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h2 className="text-left font-500 leading-6 mb-2 text-gray-900">
            {profile.first_name} {''} {profile.last_name}
          </h2>
          <p className="text-sm text-gray-500">{profile.role}</p>
          <p className="text-sm text-gray-500">{profile.location}</p>
        </div>
      </div>

      <div className="space-x-4 mb-6 p-4 border border-gray-200 rounded-md">
        <div className="w-full">
          <div className="flex flex-col items-start mb-4">
            <h1 className="text-left font-semibold leading-6 text-gray-900">
              Personal Information
            </h1>
          </div>
          <div className="w-2/3 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm text-gray-500">First Name</Label>
                <p className="text-[16px] font-medium">{profile.first_name}</p>
              </div>

              <div>
                <Label className="block text-sm text-gray-500">Last Name</Label>
                <p className="text-[16px] font-medium">{profile.last_name}</p>
              </div>

              <div>
                <Label className="block text-sm text-gray-500">Username</Label>
                <p className="text-[16px] font-medium">{profile.username}</p>
              </div>

              <div>
                <Label className="block text-sm text-gray-500">Email Address</Label>
                <p className="text-[16px] font-medium">{profile.email}</p>
              </div>

              <div>
                <Label className="block text-sm text-gray-500">Phone</Label>
                <p className="text-[16px] font-medium">{profile.phone}</p>
              </div>

              <div>
                <Label className="block text-sm text-gray-500">Gender</Label>
                <p className="text-[16px] font-medium">{profile.gender}</p>
              </div>

              <div>
                <Label className="block text-sm text-gray-500">Birth Date</Label>
                <p className="text-[16px] font-medium">
                  {new Date(profile.birth_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleEditProfile}
          className="px-4 py-2 bg-[#891C69] text-white rounded hover:bg-[#a14f7f]"
        >
          Edit Profile
        </button>
      </div>
    </div>
  )
}
