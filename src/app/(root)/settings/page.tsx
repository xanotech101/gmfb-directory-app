import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Settings() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2 h-[45px]">
        <TabsTrigger className="h-[35px]" value="account">
          Account
        </TabsTrigger>
        <TabsTrigger className="h-[35px]" value="password">
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when {"you're"} done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                className="focus:outline-none focus:border-[#891C69]"
                id="name"
                defaultValue="Pedro Duarte"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                className="focus:outline-none focus:border-[#891C69]"
                id="username"
                defaultValue="@peduarte"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                className="focus:outline-none focus:border-[#891C69]"
                id="username"
                defaultValue="08101194855"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                className="focus:outline-none focus:border-[#891C69]"
                id="email"
                defaultValue="peduarte@gmail.com"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="account_creation">Account Creation</Label>
              <Input
                className="focus:outline-none focus:border-[#891C69]"
                id="account_creation"
                readOnly
                defaultValue="Oct 27, 2019, 9:54:41 PM"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="account_creation">Gender</Label>
              <Input
                className="focus:outline-none focus:border-[#891C69]"
                id="gender"
                defaultValue="Male"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="birth_date">Birth Date</Label>
              <Input
                className="focus:outline-none focus:border-[#891C69]"
                id="birth_date"
                readOnly
                defaultValue="Oct 27, 2019"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="account_creation">Age</Label>
              <Input
                className="focus:outline-none focus:border-[#891C69]"
                id="age"
                defaultValue="34"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, {"you'll"} be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input
                className="focus:outline-none focus:border-[#891C69]"
                id="current"
                type="password"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input
                className="focus:outline-none focus:border-[#891C69]"
                id="new"
                type="password"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Confirm password</Label>
              <Input
                className="focus:outline-none focus:border-[#891C69]"
                id="confirm"
                type="password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
