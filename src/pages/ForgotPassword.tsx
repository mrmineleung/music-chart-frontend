

import ForgotPasswordForm from "@/components/ForgotPasswordForm"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Button variant="link" className="m-0 p-0 place-self-start" onClick={() => navigate(-1)}>
            <ChevronLeft className="w-6 h-6"/>Back
            </Button>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to reset your password
            </p>
          </div>
          {/* <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Forgot Password
            </Button>
          </div> */}
          <ForgotPasswordForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:flex lg:items-center lg:justify-center">
      <div className="text-5xl font-extrabold top-5">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-sriracha-regular">
                mucha
              </span>
            </div>
        {/* <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </div>
  )
}

export default ForgotPassword
