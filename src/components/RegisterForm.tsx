import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { useAuth } from "@/provider/AuthProvider";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email format.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const RegisterForm = () => {
  const API_URL = process.env.BACKEND_API;

  const [isPending, startTransition] = useTransition();
  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {register} = useAuth()

  // const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsRegisterSuccess(false)
    setErrorMessage(null)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    startTransition(() => {

    register(values.email, values.password)?.then(res => {
        if (res?.message == "success") {
                    setIsRegisterSuccess(true)
                    fetch(`${API_URL}auth/request-verify-token`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({email: values.email}),
                    });
                } else if (res?.message == "REGISTER_USER_ALREADY_EXISTS") {
                  setErrorMessage('User already exists!')
                } else {
                  setErrorMessage('Fail to register!')
                }
                return
    })



      })
  }

  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isRegisterSuccess? 
          <Alert>
        <AlertDescription>
        Verification email sent. Please check your email inbox and verify your account!
        </AlertDescription>
      </Alert>
         : <></>}
        {errorMessage? 
        <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
      {errorMessage}
      </AlertDescription>
    </Alert> : <></>}
        <FormField
          control={form.control}
          name="email"
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
                {/* <FormLabel>Password</FormLabel> */}
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          Sign up
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
