import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { cn } from '@/lib/utils'
import {
  BellAlertIcon,
  UsersIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const analytics = [
  {
    name: 'Departments',
    total: 50,
    icon: UsersIcon,
    increase: '+20% from last month',
    href: '/departments',
  },
  {
    name: 'Documents',
    total: 123,
    icon: DocumentDuplicateIcon,
    increase: '+20% from last month',
    href: '/documents',
  },
  {
    name: 'Users',
    total: 623,
    icon: UserGroupIcon,
    increase: '+20% from last month',
    href: '/users',
  },
  {
    name: 'Announcements',
    total: 65,
    icon: BellAlertIcon,
    increase: '+20% from last month',
    href: '/announcements',
  },
]

const announcements = [
  {
    title: 'Announcement 1',
    subject: 'Easy Notification',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    departments: ['Marketing', 'Human Resources', 'Sales'],
    users: ['Jon Doe', 'Jane Doe', 'Smith Doe'],
  },
  {
    title: 'Announcement 2',
    subject: 'Easy Notification',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    departments: ['Marketing', 'Human Resources', 'Sales'],
    users: ['Jon Doe', 'Jane Doe', 'Smith Doe'],
  },
  {
    title: 'Announcement 3',
    subject: 'Easy Notification',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    departments: ['Marketing', 'Human Resources', 'Sales'],
    users: ['Jon Doe', 'Jane Doe', 'Smith Doe'],
  },
  {
    title: 'Announcement 4',
    subject: 'Easy Notification',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    departments: ['Marketing', 'Human Resources', 'Sales'],
    users: ['Jon Doe', 'Jane Doe', 'Smith Doe'],
  },
]

const documents = [
  {
    id: 1,
    title: 'Design System',
    created_by: {
      first_name: 'Will',
      last_name: 'Smith',
      email: 'jondoe@mail.com',
      department: 'Design',
      avatar: undefined,
    },
    date: '2021-07-23',
    receipients: {
      departments: [
        {
          name: 'Design',
        },
      ],
      users: [
        {
          name: 'Jane Doe',
          avatar: 'https://randomuser.me/api/portraits',
        },
      ],
    },
  },
  {
    id: 1,
    title: 'Design System',
    created_by: {
      first_name: 'Ben',
      last_name: 'Doe',
      email: 'jondoe@mail.com',
      department: 'Design',
      avatar: undefined,
    },
    date: '2021-07-23',
    receipients: {
      departments: [
        {
          name: 'Design',
        },
      ],
      users: [
        {
          name: 'Jane Doe',
          avatar: 'https://randomuser.me/api/portraits',
        },
      ],
    },
  },
  {
    id: 1,
    title: 'Design System',
    created_by: {
      first_name: 'Travis',
      last_name: 'Doe',
      email: 'jondoe@mail.com',
      department: 'Design',
      avatar: undefined,
    },
    date: '2021-07-23',
    receipients: {
      departments: [
        {
          name: 'Design',
        },
      ],
      users: [
        {
          name: 'Jane Doe',
          avatar: 'https://randomuser.me/api/portraits',
        },
      ],
    },
  },
  {
    id: 1,
    title: 'Design System',
    created_by: {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jondoe@mail.com',
      department: 'Design',
      avatar: undefined,
    },
    date: '2021-07-23',
    receipients: {
      departments: [
        {
          name: 'Design',
        },
      ],
      users: [
        {
          name: 'Jane Doe',
          avatar: 'https://randomuser.me/api/portraits',
        },
      ],
    },
  },
  {
    id: 1,
    title: 'Design System',
    created_by: {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jondoe@mail.com',
      department: 'Design',
      avatar: undefined,
    },
    date: '2021-07-23',
    receipients: {
      departments: [
        {
          name: 'Design',
        },
      ],
      users: [
        {
          name: 'Jane Doe',
          avatar: 'https://randomuser.me/api/portraits',
        },
      ],
    },
  },
  {
    id: 1,
    title: 'Design System',
    created_by: {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jondoe@mail.com',
      department: 'Design',
      avatar: undefined,
    },
    date: '2021-07-23',
    receipients: {
      departments: [
        {
          name: 'Design',
        },
      ],
      users: [
        {
          name: 'Jane Doe',
          avatar: 'https://randomuser.me/api/portraits',
        },
      ],
    },
  },
]

export default function Dashboard() {
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4 mx-4 sm:mx-6 lg:mx-0">
          {analytics.map((item, index) => (
            <Link key={index} href={item.href} className="block">
              <div className="h-auto p-4 border hover:border-[#891C69] shadow-md rounded-md overflow-hidden flex flex-col justify-between cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.name}</span>
                  <item.icon
                    aria-hidden="true"
                    className={cn('h-6 w-6 shrink-0', {
                      'text-[#891C69]': false,
                      'text-gray-400': true,
                    })}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-xl font-bold">{item.total}</h2>
                  <p className="text-sm text-gray-500">{item.increase}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[58%_42%] flex-grow mt-4 gap-4 mx-4 sm:mx-6 lg:mx-0">
          <div className="border shadow rounded-md h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-y-hidden p-4">
            <h3 className="text-lg font-bold mb-2">Announcements</h3>
            {announcements.length > 0 ? (
              <>
                {announcements.slice(-4).map((announcement, index) => (
                  <div key={index} className="border-b pb-2 my-4 last:mb-0">
                    <h4 className="font-semibold text-[#891C69]">{announcement.title}</h4>
                    <p className="text-sm text-gray-600">{announcement.subject}</p>
                    <p
                      className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap"
                      title={announcement.body}
                    >
                      {announcement.body.split(' ').slice(0, 10).join(' ')}...
                    </p>
                  </div>
                ))}
                <div className="mt-4 text-right">
                  <Link
                    href="/announcements"
                    className="text-[#891C69] font-semibold hover:underline"
                  >
                    View All
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-gray-500">No announcements available.</p>
            )}
          </div>
          <div className="border shadow rounded-md h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-y-hidden p-4 lg:mr-4">
            <h3 className="text-lg font-bold mb-2">Documents</h3>
            {documents.length > 0 ? (
              <>
                {documents.slice(-5).map((document) => (
                  <div key={document.id} className="flex items-center pb-2 my-4 last:mb-0">
                    <div className="flex-shrink-0 mr-4">
                      <Avatar>
                        <AvatarImage
                          src={document.created_by.avatar}
                          alt="profile image"
                          className="rounded-full"
                        />
                        <AvatarFallback className="h-[40px] w-[40px] bg-[#891C69] border border-[#974D7B] rounded-full flex items-center justify-center text-white">
                          {document.created_by.first_name[0]}
                          {document.created_by.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold">{document.title}</h4>
                      <p className="text-sm text-gray-600">
                        {document.created_by.first_name} {document.created_by.last_name} |{' '}
                        {document.date}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="mt-8 text-right">
                  <Link href="/documents" className="text-[#891C69] font-semibold hover:underline">
                    View All
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-gray-500">No documents available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
