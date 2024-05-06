import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
//   FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState, useTransition } from "react";
import { useAuth } from "@/provider/AuthProvider";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const formSchema = z.object({
  username: z.string().min(8, {
    message: "Username must be at least 8 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {login} = useAuth()

  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setErrorMessage(null)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    startTransition(() => {
    //   const formData = new FormData();
    //   formData.append("username", values.username);
    //   formData.append("password", values.password);

    //   const res = fetch(`http://localhost:8000/api/v1/auth/login`, {
    //     method: "POST",
    //     body: formData,
    //   });
    //   res.then(data => data.json())
    // //   .then(data => console.log(data))
    //   .then(data => {
    //     console.log(data)
    //     if (data.access_token) {
    //         // console.log(data.access_token)
    //         setUserAccessToken(data.access_token)
    //         navigate("/")
    //     }

    //     if (data?.detail === 'LOGIN_BAD_CREDENTIALS') {
    //         setIsLoginFailed(true)
    //     }
    // })
    login(values.username, values.password)?.then(res => {
        if (res?.message == "success") {
                    navigate("/")
                } else if (res?.message == "LOGIN_USER_NOT_VERIFIED") {
                    setErrorMessage('Please verify your account.')
                } else if (res?.message == "LOGIN_BAD_CREDENTIALS") {
                    setErrorMessage('Wrong username / password!')
                } else {
                    setErrorMessage('Login failed!')
                }
    })



      })
  }

  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {errorMessage? 
        <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
      {errorMessage}
      </AlertDescription>
    </Alert> : <></>}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                {/* <FormLabel>Password</FormLabel> */}
                {/* <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
              </div>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center">
                {/* <FormLabel>Password</FormLabel> */}
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
