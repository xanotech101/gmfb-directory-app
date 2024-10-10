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
    <div className="max-w-4xl mx-auto py-4">
      <div className="flex flex-col items-start mb-4">
        <h1 className="text-left font-semibold leading-6 text-gray-900">Profile</h1>
      </div>

      <div className="flex items-center space-x-4 mb-6">
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
          <h2 className="text-left font-semibold leading-6 text-gray-900">{profile.username}</h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="block text-sm font-medium">Username</Label>
          <p className="text-sm text-gray-500">{profile.username}</p>
        </div>

        <div>
          <Label className="block text-sm font-medium">Email</Label>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>

        <div>
          <Label className="block text-sm font-medium">Phone</Label>
          <p className="text-sm text-gray-500">{profile.phone}</p>
        </div>

        <div>
          <Label className="block text-sm font-medium">Gender</Label>
          <p className="text-sm text-gray-500">{profile.gender}</p>
        </div>

        <div>
          <Label className="block text-sm font-medium">Birth Date</Label>
          <p className="text-sm text-gray-500">
            {new Date(profile.birth_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Edit Button */}
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
