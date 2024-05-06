import UpdatePasswordForm from "@/components/UpdatePasswordForm"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useAuth } from "@/provider/AuthProvider"

const UserSetting = () => {

const {currentUser} = useAuth()

  return (
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 space-y-2">
                    <div className="font-semibold">Username:</div><div className="">{currentUser?.username}</div>
                    <div className="font-semibold">Email:</div><div className="">{currentUser?.email}</div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Update Password</CardTitle>
                {/* <CardDescription>
                  The directory within your project, in which your plugins are
                  located.
                </CardDescription> */}
              </CardHeader>
              <CardContent>
                <UpdatePasswordForm />
              </CardContent>
              {/* <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter> */}
            </Card>
          </div>

  )
}

export default UserSetting