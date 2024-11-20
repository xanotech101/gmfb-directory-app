/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CalendarIcon, FileIcon, Users, Building } from 'lucide-react'

export default function DocumentCard({ doc }: { doc: any }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Card key={doc.id} className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span className="text-lg font-semibold truncate">{doc.subject}</span>
          <Badge className="capitalize" variant={doc.status === 'published' ? 'green' : 'yellow'}>
            {doc.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={doc.created_by.avatar || undefined}
              alt={`${doc.created_by.first_name} ${doc.created_by.last_name}`}
            />
            <AvatarFallback>{doc.created_by.first_name[0]}{doc.created_by.last_name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="text-sm font-medium">{doc.created_by.first_name} {doc.created_by.last_name}</p>
            <p className="text-xs text-muted-foreground">Created by</p>
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Created: {formatDate(doc.created_at)}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          Users: {doc.users.length}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Building className="mr-2 h-4 w-4" />
          Departments: {doc.departments.length}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <FileIcon className="mr-2 h-4 w-4" />
          Files: {doc.files.length}
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>{doc.subject}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Created By</h4>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={doc.created_by.avatar || undefined}
                        alt={`${doc.created_by.first_name} ${doc.created_by.last_name}`}
                      />
                      <AvatarFallback>{doc.created_by.first_name[0]}{doc.created_by.last_name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{doc.created_by.first_name} {doc.created_by.last_name}</p>
                      <p className="text-xs text-muted-foreground">{doc.created_by.email}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Dates</h4>
                  <p>Created: {formatDate(doc.created_at)}</p>
                  <p>Updated: {formatDate(doc.updated_at)}</p>
                </div>
                <div>
                  <h4 className="font-semibold flex items-center mb-2">
                    <Users className="h-4 w-4 mr-2" />
                    Associated Users
                  </h4>
                  <ul className="space-y-2">
                    {doc.users.map((user: any) => (
                      <li key={user.id} className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatar || undefined} alt={`${user.first_name} ${user.last_name}`} />
                          <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">{user.first_name} {user.last_name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold flex items-center mb-2">
                    <Building className="h-4 w-4 mr-2" />
                    Associated Departments
                  </h4>
                  {doc.departments.length > 0 ? (
                    <ul className="space-y-1">
                      {doc.departments?.map((dept: any) => (
                        <li key={dept.id} className="text-sm">{dept.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No departments associated</p>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold flex items-center mb-2">
                    <FileIcon className="h-4 w-4 mr-2" />
                    Files
                  </h4>
                  <ul className="space-y-2">
                    {doc.files?.map((file: any) => (
                      <li key={file.id} className="flex items-center space-x-2">
                        <FileIcon className="h-4 w-4" />
                        <a href={file.url} target="_blank" rel="noopener noreferrer"
                           className="text-sm text-primary hover:underline">
                          {file.type} file
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}